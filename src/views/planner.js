// ── PLANNER VIEW ──

function renderPlanner(){
  document.getElementById('plan-date').textContent=new Date().toLocaleDateString('vi-VN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  const active=filteredTasks.filter(t=>stageName(t.stage_id)!=='Done').slice(0,14);
  let total=0;
  document.getElementById('plan-rows').innerHTML=active.map(t=>{
    const h=+(t.hours*.5).toFixed(1);total+=h;
    return `<div class="trow"><span class="badge" style="background:${hexToRgba(priorityColor(t.priority_id),.12)};color:${priorityColor(t.priority_id)};font-size:10px;padding:1px 5px">${(priorityName(t.priority_id)||'')[0]}</span><span style="font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t.name}</span><span style="font-size:11px;color:var(--text2);text-align:right">${h}h</span></div>`;
  }).join('');
  document.getElementById('plan-h').textContent=total.toFixed(1);
  document.getElementById('mini-board').innerHTML=catalog.stages.map(s=>{
    const items=active.filter(t=>t.stage_id===s.id);
    return `<div><div class="mini-col-h" style="color:${s.color};border-color:${s.color}">${s.name} (${items.length})</div>${items.slice(0,4).map(t=>`<div class="mini-chip" style="background:${hexToRgba(s.color,.1)};color:${s.color}" onclick="openDP(${t.id})">${t.name.slice(0,22)}<br><span style="font-size:9.5px;opacity:.7">${priorityName(t.priority_id)}</span></div>`).join('')}</div>`;
  }).join('');
}
