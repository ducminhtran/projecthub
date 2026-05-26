// ── DASHBOARD VIEW ──

function renderDashboard(){
  document.getElementById('s-total').textContent=tasks.length;
  document.getElementById('s-inprog').textContent=tasks.filter(t=>stageName(t.stage_id)==='In progress').length;
  document.getElementById('s-done').textContent=tasks.filter(t=>stageName(t.stage_id)==='Done').length;
  document.getElementById('s-urgent').textContent=tasks.filter(t=>priorityName(t.priority_id)==='Urgent').length;
  const top=tasks.filter(t=>['Urgent','Critical'].includes(priorityName(t.priority_id))||stageName(t.stage_id)==='In progress').slice(0,8);
  document.getElementById('dash-tb').innerHTML=top.map(t=>`<tr onclick="openDP(${t.id})">
    <td style="font-weight:500;max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${t.name}</td>
    <td style="font-size:11px;color:var(--text3)">${projName(t.project_id)}</td>
    <td><div style="display:flex;align-items:center;gap:5px">${avEl(memberName(t.assignee_id),memberColor(t.assignee_id))}<span style="font-size:12px">${memberName(t.assignee_id)}</span></div></td>
    <td style="min-width:110px">${progBar(t.progress)}</td>
  </tr>`).join('');
  document.getElementById('dash-stage').innerHTML=catalog.stages.map(s=>{
    const cnt=tasks.filter(t=>t.stage_id===s.id).length;
    const pct=tasks.length?Math.round(cnt/tasks.length*100):0;
    return `<div class="bar-item"><span class="bar-lbl" style="display:flex;align-items:center;gap:5px"><span style="width:8px;height:8px;border-radius:50%;background:${s.color};display:inline-block;flex-shrink:0"></span>${s.name}</span><div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${s.color}"></div></div><span class="bar-val">${cnt}</span></div>`;
  }).join('');
  document.getElementById('dash-proj').innerHTML=projects.filter(p=>p.status==='open').map(p=>{
    const pt=tasks.filter(t=>t.project_id===p.id);
    const a=avg(pt.map(t=>t.progress));
    return `<div class="bar-item"><span class="bar-lbl" style="font-size:10px">${p.name.slice(0,18)}</span><div class="bar-track"><div class="bar-fill" style="width:${a}%;background:${p.color}"></div></div><span class="bar-val">${a}%</span></div>`;
  }).join('');
}
