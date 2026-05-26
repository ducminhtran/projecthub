// ── CALENDAR VIEW ──

function renderCalendar(){
  document.getElementById('cal-lbl').textContent=`${MN[calM]}, ${calY}`;
  const fd=new Date(calY,calM,1).getDay(),off=fd===0?6:fd-1,tot=new Date(calY,calM+1,0).getDate(),today=new Date();
  let h=['T2','T3','T4','T5','T6','T7','CN'].map(d=>`<div class="cal-dh">${d}</div>`).join('');
  for(let i=0;i<off;i++)h+=`<div class="cal-cell other"></div>`;
  for(let d=1;d<=tot;d++){
    const ds=`${calY}-${String(calM+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const it=today.getDate()===d&&today.getMonth()===calM&&today.getFullYear()===calY;
    const dt=filteredTasks.filter(t=>t.due===ds||t.start===ds);
    h+=`<div class="cal-cell${it?' today-cell':''}"><div class="cal-dn">${d}</div>
      ${dt.slice(0,3).map(t=>{return`<div class="cal-chip" style="background:${hexToRgba(priorityColor(t.priority_id),.12)};color:${priorityColor(t.priority_id)}" title="${t.name}" onclick="openDP(${t.id})">${t.name}</div>`;}).join('')}
      ${dt.length>3?`<div style="font-size:9px;color:var(--text3)">+${dt.length-3} more</div>`:''}</div>`;
  }
  const rem=(off+tot)%7;if(rem>0)for(let i=0;i<7-rem;i++)h+=`<div class="cal-cell other"></div>`;
  document.getElementById('cal-root').innerHTML=h;
}

function prevMonth(){calM--;if(calM<0){calM=11;calY--;}renderCalendar()}

function nextMonth(){calM++;if(calM>11){calM=0;calY++;}renderCalendar()}
