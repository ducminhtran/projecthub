// ── MEMBERS VIEW ──

function memberInitials(name){
  return name.split(' ').filter(Boolean).map(w=>w[0]).join('').slice(0,2).toUpperCase();
}

function renderResource(){
  const posF = document.getElementById('res-pos-filter');
  if(!posF) return;
  const posV = posF.value;
  posF.innerHTML = '<option value="">Tất cả vị trí</option>' + catalog.positions.map(p=>`<option>${p.name}</option>`).join('');
  posF.value = posV;

  const search = (document.getElementById('res-search').value||'').toLowerCase();
  const filtered = members.filter(m=>
    (!search || m.name.toLowerCase().includes(search) || m.email.toLowerCase().includes(search)) &&
    (!posF.value || m.position === posF.value)
  );

  // Stats
  document.getElementById('res-stats').innerHTML = [
    ['Tổng thành viên', members.length, '', 'Trong hệ thống'],
    ...catalog.positions.slice(0,3).map(p=>{
      const cnt = members.filter(m=>m.position===p.name).length;
      return [p.name, cnt, p.color, p.desc];
    })
  ].map(([l,v,c,s])=>`<div class="stat-card"><div class="stat-lbl">${l}</div><div class="stat-val" style="${c?'color:'+c:''}">${v}</div><div class="stat-sub">${s||''}</div></div>`).join('');

  const grid = document.getElementById('members-grid');
  if(filtered.length === 0){
    grid.innerHTML = `<div style="text-align:center;padding:48px 0;color:var(--text3)">Không tìm thấy thành viên nào.</div>`;
    return;
  }

  // Build list with header row
  const openProjects = projects.filter(p=>p.status==='open');

  const headerRow = `<div style="display:grid;grid-template-columns:36px 220px 200px 120px 1fr 120px;gap:0;align-items:center;padding:8px 16px;font-size:11px;font-weight:500;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid var(--border);background:var(--bg2)">
    <div></div>
    <div>Họ và tên</div>
    <div>Email</div>
    <div>Vị trí</div>
    <div>Dự án đang tham gia</div>
    <div style="text-align:right">Thao tác</div>
  </div>`;

  const rows = filtered.map(m=>{
    const pos = catalog.positions.find(p=>p.name===m.position)||{color:'#888',name:m.position||'—'};
    // Projects this member has open tasks in
    const memberProjects = openProjects.filter(p=>
      tasks.some(t=>t.assignee_id===m.id && t.project_id===p.id && stageName(t.stage_id)!=='Done')
    );
    const projTags = memberProjects.length
      ? memberProjects.map(p=>`<span style="display:inline-flex;align-items:center;gap:4px;background:${hexToRgba(p.color,.1)};color:${p.color};border:1px solid ${hexToRgba(p.color,.25)};padding:2px 9px;border-radius:999px;font-size:11px;font-weight:500;white-space:nowrap;cursor:pointer" onclick="filterByProject('${p.name}',null)">${p.name}</span>`).join('')
      : `<span style="font-size:11px;color:var(--text3)">—</span>`;
    const taskCnt = tasks.filter(t=>t.assignee_id===m.id && stageName(t.stage_id)!=='Done').length;

    return `<div style="display:grid;grid-template-columns:36px 220px 200px 120px 1fr 120px;gap:0;align-items:center;padding:10px 16px;border-bottom:1px solid var(--border);transition:background .1s" onmouseenter="this.style.background='var(--bg2)'" onmouseleave="this.style.background=''">
      <div><div class="avatar" style="background:${m.color};width:28px;height:28px;font-size:10px;font-weight:700">${memberInitials(m.name)}</div></div>
      <div>
        <div style="font-weight:600;font-size:13px">${m.name}</div>
        <div style="font-size:11px;color:var(--text3);margin-top:1px">${taskCnt} task đang mở</div>
      </div>
      <div style="font-size:12px;color:var(--text2)">${m.email||'—'}</div>
      <div><span class="pos-badge" style="background:${hexToRgba(pos.color,.12)};color:${pos.color}">${pos.name}</span></div>
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">${projTags}</div>
      <div style="display:flex;gap:6px;justify-content:flex-end">
        <button class="btn btn-sm" onclick="openEditMember('${m.id}')">✏️ Sửa</button>
        <button class="btn btn-sm btn-danger" onclick="deleteMember('${m.id}')"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ><path d="M3 5h10m-7 0V3h4v2M6 5v7m4-7v7M4 5l1 9h6l1-9"/></svg></button>
      </div>
    </div>`;
  }).join('');

  grid.innerHTML = headerRow + rows;
}

function openMemberModal(){
  editingMemberId = null;
  document.getElementById('member-modal-title').textContent = '+ Thêm thành viên';
  ['mfi-name','mfi-email','mfi-phone','mfi-note'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('mfi-color').value = '#2563eb';
  rebuildMemberModalDropdowns();
  const _mmov1=document.getElementById('member-modal-ov'); if(_mmov1) _mmov1.style.display = 'flex';
  setTimeout(()=>document.getElementById('mfi-name')?.focus(),100);
}

function openEditMember(id){
  const m = members.find(x=>x.id===id); if(!m) return;
  editingMemberId = id;
  document.getElementById('member-modal-title').textContent = '✏️ Chỉnh sửa thành viên';
  document.getElementById('mfi-name').value = m.name;
  document.getElementById('mfi-email').value = m.email;
  document.getElementById('mfi-phone').value = m.phone||'';
  document.getElementById('mfi-note').value = m.note||'';
  document.getElementById('mfi-color').value = m.color;
  rebuildMemberModalDropdowns();
  document.getElementById('mfi-position').value = m.position;
  const _mmov2=document.getElementById('member-modal-ov'); if(_mmov2) _mmov2.style.display = 'flex';
}

function closeMemberModal(){ const _mc_member_modal_ov=document.getElementById('member-modal-ov'); if(_mc_member_modal_ov) _mc_member_modal_ov.style.display='none'; }

function rebuildMemberModalDropdowns(){
  document.getElementById('mfi-position').innerHTML = catalog.positions.map(p=>`<option>${p.name}</option>`).join('');
}

async function deleteMember(id){
  const m = members.find(x=>x.id===id); if(!m) return;
  const ok = await confirm2('Xóa thành viên', `Xóa "${m.name}" khỏi hệ thống?`);
  if(!ok) return;
  members = members.filter(x=>x.id!==id);
  rebuildPersonDropdowns();
  renderResource();
  scheduleAutoSave();
  toast('Đã xóa thành viên!');
}

function saveMember(){
  const name = document.getElementById('mfi-name').value.trim();
  const email = document.getElementById('mfi-email').value.trim();
  if(!name){ document.getElementById('mfi-name').focus(); return; }
  if(!email){ document.getElementById('mfi-email').focus(); return; }
  const data = {
    name, email,
    position: document.getElementById('mfi-position').value,
    color: document.getElementById('mfi-color').value,
    phone: document.getElementById('mfi-phone').value,
    note: document.getElementById('mfi-note').value,
  };
  if(editingMemberId){
    const idx = members.findIndex(x=>x.id===editingMemberId);
    members[idx] = {...members[idx], ...data};
    toast('Đã cập nhật thành viên!');
  } else {
    data.id = 'm'+memberNextId++;
    members.push(data);
    toast('Đã thêm thành viên!');
  }
  closeMemberModal();
  rebuildPersonDropdowns();
  renderResource();
  scheduleAutoSave();
}

function rebuildPersonDropdowns(){
  members.forEach(m=>{ AVATARS[m.name] = {bg:m.color, i:memberInitials(m.name)}; });
  const opts = members.map(m=>`<option value="${m.name}">${m.name}</option>`).join('');
  const sel = document.getElementById('fi-person');
  const fsel = document.getElementById('f-person');
  if(sel){ const v=sel.value; sel.innerHTML=opts; sel.value=v; }
  if(fsel){ const v=fsel.value; fsel.innerHTML='<option value="">Tất cả thành viên</option>'+opts; fsel.value=v; }
}
