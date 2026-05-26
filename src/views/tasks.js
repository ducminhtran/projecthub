// ── TASKS VIEW ──

function progBar(pct,h='6px'){
  pct=+pct;
  const stageColor=pct>=100?'#22c55e':'var(--accent)';
  return `<div class="prog-wrap"><div class="prog-track" style="height:${h}"><div class="prog-fill" style="width:${pct}%;height:100%;background:${stageColor}"></div></div><span class="prog-pct">${pct}%</span></div>`;
}

function applyFilters(){
  const s=(document.getElementById('f-search').value||'').toLowerCase();
  const proj=document.getElementById('f-proj').value;
  const pri=document.getElementById('f-priority').value;
  const stage=document.getElementById('f-stage').value;
  const person=document.getElementById('f-person').value;
  filteredTasks=tasks.filter(t=>
    (!s||t.name.toLowerCase().includes(s)||projName(t.project_id).toLowerCase().includes(s))&&
    (!proj||t.project_id===proj)&&(!pri||t.priority_id===pri)&&
    (!stage||t.stage_id===stage)&&(!person||t.assignee_id===person)
  );
  const cur=document.querySelector('.view.active');
  if(!cur)return;
  const nm=cur.id.replace('view-','');
  const renders={dashboard:renderDashboard,tasks:renderTasks,issues:renderIssues,board:renderBoard,calendar:renderCalendar,planner:renderPlanner};
  if(renders[nm])renders[nm]();
}

function renderTasks(){
  document.getElementById('task-cnt').textContent=`${filteredTasks.length} task`;
  document.getElementById('task-tbody').innerHTML=filteredTasks.map(t=>`<tr onclick="openDP(${t.id})">
    <td style="font-weight:500;max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${t.name}</td>
    <td><div style="display:flex;align-items:center;gap:5px"><div style="width:8px;height:8px;border-radius:50%;background:${projColor(t.project_id)};flex-shrink:0"></div>${projShortName(t.project_id)}</div></td>
    <td>${sBadge(stageName(t.stage_id),stageColor(t.stage_id))}</td>
    <td>${pBadge(priorityName(t.priority_id),priorityColor(t.priority_id))}</td>
    <td><div style="display:flex;align-items:center;gap:5px">${avEl(memberName(t.assignee_id),memberColor(t.assignee_id))}<span style="font-size:12px">${memberName(t.assignee_id)}</span></div></td>
    <td style="font-size:11.5px;color:var(--text3)">${t.start||'—'}</td>
    <td style="font-size:11.5px;color:var(--text3)">${t.due||'—'}</td>
    <td style="min-width:120px">${progBar(t.progress)}</td>
    <td style="font-size:12px;color:var(--text2)">${t.hours}h</td>
  </tr>`).join('');
}

function openDP(id){
  const t=tasks.find(x=>x.id===id);if(!t)return;
  detailTaskId=id;
  document.getElementById('dp-title').textContent=t.name;
  document.getElementById('dp-sub').textContent=`${projName(t.project_id)} · ${resolveProject(t.project_id)?.code||''}`.trim();
  document.getElementById('dp-badges').innerHTML=`${pBadge(priorityName(t.priority_id),priorityColor(t.priority_id))} ${sBadge(stageName(t.stage_id),stageColor(t.stage_id))}`;
  const pct=+t.progress;
  const dpBar=document.getElementById('dp-bar'); if(dpBar) dpBar.style.cssText=`width:${pct}%;height:100%;border-radius:99px;background:${pct>=100?'#22c55e':'var(--accent)'}`;
  document.getElementById('dp-pct').textContent=pct+'%';
  document.getElementById('dp-start').textContent=t.start||'—';
  document.getElementById('dp-due').textContent=t.due||'—';
  document.getElementById('dp-person').innerHTML=`<div style="display:flex;align-items:center;gap:6px">${avEl(memberName(t.assignee_id),memberColor(t.assignee_id),20)}<span>${memberName(t.assignee_id)}</span></div>`;
  document.getElementById('dp-hours').textContent=t.hours+'h';
  document.getElementById('dp-desc').textContent=t.desc||'Chưa có mô tả.';
  document.getElementById('dp-edit-btn').onclick=()=>{closeDP();openEditTask(id);};
  document.getElementById('dp-del-btn').onclick=()=>deleteTask(id);
  document.getElementById('dp').classList.add('open');
}

function closeDP(){document.getElementById('dp').classList.remove('open');detailTaskId=null;}

async function deleteTask(id){
  const ok=await confirm2('Xóa task','Bạn có chắc muốn xóa task này?');
  if(!ok)return;
  tasks=tasks.filter(t=>t.id!==id);filteredTasks=filteredTasks.filter(t=>t.id!==id);
  scheduleAutoSave();
  closeDP();toast('🗑️ Đã xóa task!');
  const cur=document.querySelector('.view.active').id.replace('view-','');
  if(['dashboard','tasks','board','planner','report'].includes(cur))showView(cur);
  renderSidebarProjects();
}

function rebuildTaskModalDropdowns(){
  const fip=document.getElementById('fi-proj');
  const fis=document.getElementById('fi-stage');
  const fipr=document.getElementById('fi-priority');
  const pv=fip.value,sv=fis.value,prv=fipr.value;
  fip.innerHTML=projects.filter(p=>p.status==='open').map(p=>`<option>${p.name}</option>`).join('');
    fis.innerHTML=catalog.stages.map(s=>`<option>${s.name}</option>`).join('');
  fipr.innerHTML=catalog.priorities.map(p=>`<option>${p.name}</option>`).join('');
  if(pv)fip.value=pv;if(sv)fis.value=sv;if(prv)fipr.value=prv;
}

function openTaskModal(){
  editingTaskId=null;
  rebuildTaskModalDropdowns();
  document.getElementById('modal-title').textContent='➕ Thêm Task mới';
  ['fi-name','fi-desc'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('fi-prog').value=0;document.getElementById('fi-prog-val').textContent='0%';
  document.getElementById('fi-hours').value=8;
  document.getElementById('fi-start').value='';document.getElementById('fi-due').value='';
  document.getElementById('modal-ov').classList.add('open');
  setTimeout(()=>document.getElementById('fi-name').focus(),100);
}

function openTaskModalForProject(projId){
  openTaskModal();
  document.getElementById('fi-proj').value=projName;
}

function openEditTask(id){
  const t=tasks.find(x=>x.id===id);if(!t)return;
  editingTaskId=id;
  rebuildTaskModalDropdowns();
  document.getElementById('modal-title').textContent='✏️ Chỉnh sửa Task';
  document.getElementById('fi-name').value=t.name;
  document.getElementById('fi-proj').value=t.project_id||'';
  document.getElementById('fi-stage').value=t.stage_id||'';
  document.getElementById('fi-priority').value=t.priority_id||'';
  document.getElementById('fi-person').value=t.assignee_id||'';
  document.getElementById('fi-start').value=t.start;
  document.getElementById('fi-due').value=t.due;
  document.getElementById('fi-prog').value=t.progress;
  document.getElementById('fi-prog-val').textContent=t.progress+'%';
  document.getElementById('fi-hours').value=t.hours;
  document.getElementById('fi-desc').value=t.desc||'';
  document.getElementById('modal-ov').classList.add('open');
}

function closeTaskModal(){document.getElementById('modal-ov').classList.remove('open');}

function saveTask(){
  const name=document.getElementById('fi-name').value.trim();
  if(!name){document.getElementById('fi-name').focus();return;}
  const data={name,project_id:document.getElementById('fi-proj').value,stage_id:document.getElementById('fi-stage').value,priority_id:document.getElementById('fi-priority').value,assignee_id:document.getElementById('fi-person').value,start:document.getElementById('fi-start').value,due:document.getElementById('fi-due').value,progress:+document.getElementById('fi-prog').value,hours:+document.getElementById('fi-hours').value||1,desc:document.getElementById('fi-desc').value};
  if(editingTaskId){
    const idx=tasks.findIndex(t=>t.id===editingTaskId);tasks[idx]={...tasks[idx],...data};toast('Đã cập nhật task!');
  } else {data.id=newTaskId();tasks.push(data);toast('Đã thêm task!');}
  applyFilters();closeTaskModal();renderSidebarProjects();
  scheduleAutoSave();
  const cur=document.querySelector('.view.active').id.replace('view-','');
  showView(cur);
}

function toggleIssueTask(issueId, checked, checkboxEl){
  const iss = issues.find(x=>x.id===issueId);
  if(!iss) return;

  if(checked){
    // Build task name: Check issue + Phân hệ + Chức năng
    const modulePart = resolveModule(iss.module_id)?.name || '';
    const featurePart = iss.feature || '';
    const taskName = ['Check issue', modulePart, featurePart].filter(Boolean).join(' – ');

    // Today's date as start date
    const today = new Date();
    const startDate = today.toISOString().split('T')[0];

    // Create task
    const newTask = {
      id: newTaskId(),
      name: taskName,
      project_id: iss.project_id,
      stage: '',
      priority: '',
      assignee_id: iss.pic_id || '',
      start: startDate,
      due: '',
      progress: 0,
      hours: 8,
      desc: `Task được tạo từ Issue #${issueId}: ${iss.desc||''}`,
    };
    tasks.push(newTask);
    filteredTasks = [...tasks];

    // Link issue -> task
    iss.issue_task_id = newTask.id;

    toast(`Đã tạo task "${taskName}"`);

    // Re-render current view
    renderIssues();
    renderSidebarProjects();
    scheduleAutoSave();

  } else {
    // Uncheck: remove linked task if exists
    if(iss.taskId){
      const taskIdx = tasks.findIndex(t=>t.id===iss.taskId);
      if(taskIdx >= 0){
        const taskName = tasks[taskIdx].name;
        tasks.splice(taskIdx, 1);
        filteredTasks = tasks.filter(t=>true);
        toast(`Đã xóa task "${taskName}"`);
      }
      iss.taskId = null;
    }
    renderIssues();
    renderSidebarProjects();
    scheduleAutoSave();
  }
}
