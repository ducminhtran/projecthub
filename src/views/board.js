// ── BOARD VIEW ──

function switchBoardTab(tab){
  boardTab = tab;
  document.getElementById('btab-stage').classList.toggle('active', tab==='stage');
  document.getElementById('btab-member').classList.toggle('active', tab==='member');
  renderBoard();
}

function renderBoard(){
  if(boardTab === 'stage') renderBoardByStage();
  else renderBoardByMember();
}

function makeCol(id, label, color, items, colType){
  return `<div class="board-col"
    data-col-id="${id}"
    data-col-type="${colType}"
    ondragover="onColDragOver(event)"
    ondragleave="onColDragLeave(event)"
    ondrop="onColDrop(event,'${id}','${colType}')">
    <div class="col-hdr" style="margin-bottom:10px">
      <span style="color:${color};font-size:12px;font-weight:600">${label}</span>
      <span class="col-cnt">${items.length}</span>
    </div>
    ${items.map(t=>makeTaskCard(t)).join('')}
    <div style="height:40px"></div>
  </div>`;
}

function makeTaskCard(t){
  return `<div class="task-card" 
    draggable="true"
    data-task-id="${t.id}"
    onclick="openDP(${t.id})"
    ondragstart="onCardDragStart(event,${t.id})"
    ondragend="onCardDragEnd(event)">
    <div class="tc-title">${t.name}</div>
    <div class="tc-sub" style="font-size:11px;color:var(--text3);margin-bottom:6px">${projName(t.project_id)}</div>
    ${progBar(t.progress)}
    <div style="display:flex;align-items:center;gap:6px;margin-top:7px">
      ${pBadge(priorityName(t.priority_id),priorityColor(t.priority_id))}
      <span style="margin-left:auto;display:flex;align-items:center;gap:4px">
        ${avEl(memberName(t.assignee_id),memberColor(t.assignee_id),18)}
        <span style="font-size:10px;color:var(--text3)">${memberName(t.assignee_id)}</span>
      </span>
    </div>
  </div>`;
}

function renderBoardByStage(){
  const root = document.getElementById('board-root');
  root.innerHTML = catalog.stages.map(s=>{
    const items = filteredTasks.filter(t=>t.stage_id===s.id);
    return makeCol(s.id, s.name, s.color, items, 'stage');
  }).join('');
}

function renderBoardByMember(){
  const root = document.getElementById('board-root');
  // Get unique members from current filtered tasks + members list
  const memberNames = [...new Set([
    ...members.map(m=>m.name),
    ...filteredTasks.map(t=>t.assignee_id).filter(Boolean)
  ])].filter(Boolean);
  root.innerHTML = memberNames.map(name=>{
    const m = members.find(x=>x.name===name)||{name,color:'#888'};
    const items = filteredTasks.filter(t=>t.assignee_id===m.id);
    return makeCol(name, name, m.color||'#888', items, 'member');
  }).join('');
}

function onCardDragStart(e, taskId){
  dragTaskId = taskId;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', taskId);
  // slight delay so card renders dragging state after dragstart
  setTimeout(()=>{
    const el = document.querySelector(`.task-card[data-task-id="${taskId}"]`);
    if(el) el.classList.add('dragging');
  }, 0);
}

function onCardDragEnd(e){
  document.querySelectorAll('.task-card.dragging').forEach(el=>el.classList.remove('dragging'));
  document.querySelectorAll('.board-col.drag-over').forEach(el=>el.classList.remove('drag-over'));
  dragTaskId = null;
}

function onColDragOver(e){
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  const col = e.currentTarget;
  col.classList.add('drag-over');
}

function onColDragLeave(e){
  // Only remove if leaving the col itself (not a child)
  if(!e.currentTarget.contains(e.relatedTarget)){
    e.currentTarget.classList.remove('drag-over');
  }
}

function onColDrop(e, colId, colType){
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  const taskId = parseInt(e.dataTransfer.getData('text/plain'));
  if(!taskId) return;
  const task = tasks.find(t=>t.id===taskId);
  if(!task) return;

  if(colType === 'stage'){
    if(task.stage === colId) return; // no change
    task.stage = colId;
    toast(`Đã chuyển "${task.name}" → ${colId}`);
  } else if(colType === 'member'){
    if(task.person === colId) return;
    task.person = colId;
    // Update AVATARS if needed
    const m = members.find(x=>x.name===colId);
    if(m) AVATARS[m.name] = {bg:m.color, i:memberInitials(m.name)};
    toast(`Đã giao "${task.name}" → ${colId}`);
  }

  // Re-render board keeping current tab
  renderBoard();
  scheduleAutoSave();
}
