// ── GANTT VIEW ──

function renderGantt(){
  const weeks=['W9','W10','W11','W12','W13','W14','W15','W16','W17','W18','W19','W20'];
  const WW=90;const list=filteredTasks.slice(0,18);
  document.getElementById('gantt-tl').innerHTML=weeks.map(w=>`<div class="wk-lbl">${w}</div>`).join('');
  document.getElementById('gantt-left').innerHTML=list.map(t=>`<div class="gantt-row gantt-rl"><div class="gantt-rn" title="${t.name}">${t.name}</div>${sBadge(stageName(t.stage_id),stageColor(t.stage_id))}<span style="font-size:11px;color:var(--text2);min-width:36px;text-align:right">${t.progress}%</span></div>`).join('');
  const pcat=name=>catalog.priorities.find(x=>x.name===name)||{color:'#3b82f6'};
  document.getElementById('gantt-bars').innerHTML=list.map((t,i)=>{
    const off=Math.min(i,4)*WW,wid=Math.max(1,Math.floor(t.progress/100*6)+1)*WW;
    return `<div class="gantt-br"><div class="gantt-bar" style="left:${off}px;width:${Math.min(wid,weeks.length*WW-off)}px;background:${priorityColor(t.priority_id)}" onclick="openDP(${t.id})" title="${t.name}">${t.name.slice(0,14)}</div></div>`;
  }).join('');
}
