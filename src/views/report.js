// ── REPORT VIEW ──

function renderReport(){
  const total=tasks.length,done=tasks.filter(t=>stageName(t.stage_id)==='Done').length,inprog=tasks.filter(t=>stageName(t.stage_id)==='In progress').length,urgent=tasks.filter(t=>priorityName(t.priority_id)==='Urgent').length;
  document.getElementById('r-stats').innerHTML=[['Tổng Task',total,'',''],['Hoàn thành',done,'#22c55e',''],['Đang thực hiện',inprog,'#3b82f6',''],['Khẩn cấp',urgent,'#ef4444','']].map(([l,v,c])=>`<div class="stat-card"><div class="stat-lbl">${l}</div><div class="stat-val" ${c?`style="color:${c}"`:''} >${v}</div></div>`).join('');
  document.getElementById('r-proj').innerHTML=projects.filter(p=>p.status==='open').map(p=>{
    const pt=tasks.filter(t=>t.project_id===p.id),a=avg(pt.map(t=>t.progress));
    return `<div class="bar-item"><span class="bar-lbl">${p.name.slice(0,18)}</span><div class="bar-track"><div class="bar-fill" style="width:${a}%;background:${p.color}"></div></div><span class="bar-val">${a}%</span></div>`;
  }).join('');
  document.getElementById('r-prio').innerHTML=catalog.priorities.map(p=>{
    const cnt=tasks.filter(t=>t.priority_id===p.id).length,pct=tasks.length?Math.round(cnt/tasks.length*100):0;
    return `<div class="bar-item"><span class="bar-lbl">${p.name}</span><div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${p.color}"></div></div><span class="bar-val">${cnt}</span></div>`;
  }).join('');
  document.getElementById('r-stage').innerHTML=catalog.stages.map(s=>{
    const cnt=tasks.filter(t=>t.stage_id===s.id).length;
    return `<div class="donut-item"><div class="donut-dot" style="background:${s.color}"></div><span style="flex:1">${s.name}</span><b>${cnt}</b><span style="font-size:11px;color:var(--text3);min-width:36px;text-align:right">${tasks.length?Math.round(cnt/tasks.length*100):0}%</span></div>`;
  }).join('');
  const depts=unique(tasks,'dept'),maxD=Math.max(...depts.map(d=>tasks.filter(t=>t.dept===d).length));
  document.getElementById('r-dept').innerHTML=depts.map(d=>{
    const cnt=tasks.filter(t=>t.dept===d).length,cat=catalog.departments.find(x=>x.name===d)||{color:'var(--accent)'};
    return `<div class="bar-item"><span class="bar-lbl">${d}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.round(cnt/maxD*100)}%;background:${cat.color}"></div></div><span class="bar-val">${cnt}</span></div>`;
  }).join('');
}
