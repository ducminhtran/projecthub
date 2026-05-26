// ── ISSUES VIEW ──

function issueStatusBadge(s,color){
  const cat = color ? {name:s,color} : (catalog.issueStatuses&&catalog.issueStatuses.find(x=>x.name===s));
  if(cat) return `<span style="background:${hexToRgba(cat.color,.12)};color:${cat.color};padding:2px 8px;border-radius:999px;font-size:11px;font-weight:500;white-space:nowrap">${cat.name}</span>`;
  const st=ISSUE_STATUS[s]||{label:s||'—',color:'#888',bg:'#f1f5f9'};
  return `<span style="background:${st.bg};color:${st.color};padding:2px 8px;border-radius:999px;font-size:11px;font-weight:500;white-space:nowrap">${st.label}</span>`;
}

function confirmStatusBadge(s,color){
  if(!s) return '<span style="color:var(--text3);font-size:11px">—</span>';
  const cat = color ? {name:s,color} : (catalog.confirmStatuses&&catalog.confirmStatuses.find(x=>x.name===s));
  if(cat) return `<span style="background:${hexToRgba(cat.color,.12)};color:${cat.color};padding:2px 8px;border-radius:999px;font-size:11px;font-weight:500;white-space:nowrap">${cat.name}</span>`;
  return `<span style="background:#f1f5f9;color:#888;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:500">${s}</span>`;
}

function issueTypeBadge(t,color){
  const cat = color ? {name:t,color} : catalog.issueTypes.find(x=>x.name===t);
  if(cat) return `<span style="background:${hexToRgba(cat.color,.12)};color:${cat.color};padding:2px 8px;border-radius:999px;font-size:11px;font-weight:500;white-space:nowrap">${cat.name}</span>`;
  const tp=ISSUE_TYPE[t]||{label:t,color:'#888',bg:'#f1f5f9'};
  return `<span style="background:${tp.bg};color:${tp.color};padding:2px 7px;border-radius:999px;font-size:11px;font-weight:500;white-space:nowrap">${tp.label}</span>`;
}

function moduleBadge(m){
  const cat = catalog.modules.find(x=>x.name===m);
  if(cat) return `<span style="background:${hexToRgba(cat.color,.12)};color:${cat.color};padding:2px 8px;border-radius:999px;font-size:11px;font-weight:600;white-space:nowrap" title="${cat.fullName||cat.name}">${cat.name}</span>`;
  return `<span style="background:#f1f5f9;color:#888;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:500">${m||'—'}</span>`;
}

function renderIssueTableHTML(list, showProj=true){
  if(!list.length) return '<div style="padding:32px;text-align:center;color:var(--text3)">Không có issue nào.</div>';
  const header = `<table style="width:100%;border-collapse:collapse;font-size:12px;min-width:${showProj?1200:1100}px">
    <thead><tr style="background:var(--bg2)">
      <th style="padding:8px 10px;border-bottom:1px solid var(--border);text-align:left;font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;width:44px">STT</th>
      ${showProj?'<th style="padding:8px 10px;border-bottom:1px solid var(--border);text-align:left;font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;width:64px">Dự án</th>':''}
      <th style="padding:8px 10px;border-bottom:1px solid var(--border);text-align:left;font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">Phân hệ</th>
      <th style="padding:8px 10px;border-bottom:1px solid var(--border);text-align:left;font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">Chức năng</th>
      <th style="padding:8px 10px;border-bottom:1px solid var(--border);text-align:left;font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;min-width:180px">Mô tả Issue</th>
      <th style="padding:8px 10px;border-bottom:1px solid var(--border);text-align:left;font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">Ngày log</th>
      <th style="padding:8px 10px;border-bottom:1px solid var(--border);text-align:left;font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">Loại</th>
      <th style="padding:8px 10px;border-bottom:1px solid var(--border);text-align:left;font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">Người phụ trách</th>
      <th style="padding:8px 10px;border-bottom:1px solid var(--border);text-align:left;font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">PIC xử lý</th>
      <th style="padding:8px 10px;border-bottom:1px solid var(--border);text-align:left;font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">Tình trạng</th>
      <th style="padding:8px 10px;border-bottom:1px solid var(--border);text-align:left;font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">Ngày HT</th>
      <th style="padding:8px 10px;border-bottom:1px solid var(--border);text-align:left;font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">Người KT</th>
      <th style="padding:8px 10px;border-bottom:1px solid var(--border);text-align:left;font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">Ngày XN</th>
      <th style="padding:8px 10px;border-bottom:1px solid var(--border);text-align:left;font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">TT Xác nhận</th>
      <th style="padding:8px 10px;border-bottom:1px solid var(--border);text-align:left;font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em">Ghi chú</th>
      <th style="padding:8px 10px;border-bottom:1px solid var(--border);width:70px"></th>
    </tr></thead><tbody>`;
  const rows = list.map((iss,idx)=>{
    const sc=projColorFor(iss.project);
    const sh=projShort(iss.project);
    return `<tr style="border-bottom:1px solid var(--border);cursor:pointer" onmouseenter="this.style.background='var(--bg2)'" onmouseleave="this.style.background=''">
      <td style="padding:8px 10px;color:var(--text3);font-size:12px">${idx+1}</td>
      ${showProj?`<td style="padding:8px 10px"><span style="background:${hexToRgba(sc,.12)};color:${sc};padding:2px 8px;border-radius:999px;font-size:11px;font-weight:600">${sh}</span></td>`:''}
      <td style="padding:8px 10px">${moduleBadge(iss.module)}</td>
      <td style="padding:8px 10px;font-size:12px;font-weight:500">${iss.feature||'—'}</td>
      <td style="padding:8px 10px;font-size:12px;max-width:200px">${iss.desc||'—'}</td>
      <td style="padding:8px 10px;font-size:11px;color:var(--text3)">${iss.logDate||'—'}</td>
      <td style="padding:8px 10px">${issueTypeBadge(iss.type)}</td>
      <td style="padding:8px 10px;font-size:12px">${iss.owner||'—'}</td>
      <td style="padding:8px 10px;font-size:12px">${iss.pic||'—'}</td>
      <td style="padding:8px 10px">${issueStatusBadge(iss.status)}</td>
      <td style="padding:8px 10px;font-size:11px;color:var(--text3)">${iss.doneDate||'—'}</td>
      <td style="padding:8px 10px;font-size:12px">${iss.tester||'—'}</td>
      <td style="padding:8px 10px;font-size:11px;color:var(--text3)">${iss.confirmDate||'—'}</td>
      <td style="padding:8px 10px">${confirmStatusBadge(iss.confirmStatus)}</td>
      <td style="padding:8px 10px;font-size:11px;color:var(--text2);max-width:120px">${iss.note||'—'}</td>
      <td style="padding:8px 10px">
        <div style="display:flex;gap:4px">
          <button class="btn btn-sm" onclick="openEditIssue('${iss.id}')" style="padding:2px 7px"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ><path d="M11 2l3 3-8 8H3v-3l8-8z"/></svg></button>
          <button class="btn btn-sm btn-danger" onclick="deleteIssue('${iss.id}')" style="padding:2px 7px"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ><path d="M3 5h10m-7 0V3h4v2M6 5v7m4-7v7M4 5l1 9h6l1-9"/></svg></button>
        </div>
      </td>
    </tr>`;
  }).join('');
  return header + rows + '</tbody></table>';
}

function renderIssues(){
  const projSel = document.getElementById('f-issue-proj');
  if(!projSel) return;
  // rebuild dropdown
  const curV = projSel.value || issueProjectFilter;
  projSel.innerHTML = '<option value="">Tất cả dự án</option>' +
    projects.filter(p=>p.status==='open').map(p=>`<option value="${p.name}">${p.name}</option>`).join('');
  projSel.value = curV;
  issueProjectFilter = projSel.value;

  const list = issueProjectFilter
    ? issues.filter(x=>x.project_id===issueProjectFilter)
    : issues;

  const title = document.getElementById('issues-title');
  if(title) title.textContent = issueProjectFilter ? `Issue Manager – ${projName(issueProjectFilter)}` : 'Issue Manager';

  const tbody = document.getElementById('issues-tbody');
  if(!tbody) return;

  if(!list.length){
    tbody.innerHTML = `<tr><td colspan="17" style="padding:40px;text-align:center;color:var(--text3)">Không có issue nào.</td></tr>`;
    return;
  }
  tbody.innerHTML = list.map((iss,idx)=>{
    const sc=projColorFor(iss.project);
    const sh=projShort(iss.project);
    return `<tr style="border-bottom:1px solid var(--border)" onmouseenter="this.style.background='var(--bg2)'" onmouseleave="this.style.background=''">
      <td style="padding:8px 12px;text-align:center">
        <input type="checkbox" ${iss.issue_task_id?'checked':''} 
          onchange="toggleIssueTask('${iss.id}',this.checked,this)"
          title="${iss.taskId?'Task đã tạo – bỏ check để xóa task':'Tạo task từ issue này'}"
          style="width:16px;height:16px;cursor:pointer;accent-color:var(--accent)"/>
        ${iss.issue_task_id?`<div style='font-size:9px;color:var(--accent);margin-top:2px'>✓ Đã tạo task</div>`:''}
      </td>
      <td style="padding:8px 12px;color:var(--text3);font-size:12px">${idx+1}</td>
      <td style="padding:8px 12px">${projLogoEl(resolveProject(iss.project_id)||{short:'—',color:'#888'},28)}</td>
      <td style="padding:8px 12px">${moduleBadge(resolveModule(iss.module_id)?.name||'')}</td>
      <td style="padding:8px 12px;font-size:12px;font-weight:500">${iss.feature||'—'}</td>
      <td style="padding:8px 12px;font-size:12px">${iss.desc||'—'}</td>
      <td style="padding:8px 12px;font-size:11px;color:var(--text3)">${iss.logDate||'—'}</td>
      <td style="padding:8px 12px">${issueTypeBadge(resolveIssueType(iss.type_id)?.name||'',resolveIssueType(iss.type_id)?.color)}</td>
      <td style="padding:8px 12px;font-size:12px">${memberName(iss.owner_id)}</td>
      <td style="padding:8px 12px;font-size:12px">${memberName(iss.pic_id)}</td>
      <td style="padding:8px 12px">${issueStatusBadge(resolveIssueStatus(iss.status_id)?.name||'',resolveIssueStatus(iss.status_id)?.color)}</td>
      <td style="padding:8px 12px;font-size:11px;color:var(--text3)">${iss.done_date||'—'}</td>
      <td style="padding:8px 12px;font-size:12px">${memberName(iss.tester_id)}</td>
      <td style="padding:8px 12px;font-size:11px;color:var(--text3)">${iss.confirm_date||'—'}</td>
      <td style="padding:8px 12px">${confirmStatusBadge(resolveConfirmStatus(iss.confirm_status_id)?.name||'',resolveConfirmStatus(iss.confirm_status_id)?.color)}</td>
      <td style="padding:8px 12px;font-size:11px;color:var(--text2)">${iss.note||'—'}</td>
      <td style="padding:8px 12px">
        <div style="display:flex;gap:4px">
          <button class="btn btn-sm" onclick="openEditIssue('${iss.id}')" style="padding:2px 7px"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ><path d="M11 2l3 3-8 8H3v-3l8-8z"/></svg></button>
          <button class="btn btn-sm btn-danger" onclick="deleteIssue('${iss.id}')" style="padding:2px 7px"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ><path d="M3 5h10m-7 0V3h4v2M6 5v7m4-7v7M4 5l1 9h6l1-9"/></svg></button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function filterIssuesByProject(projId){
  issueProjectFilter = projId;
  showView('issues');
  const sel = document.getElementById('f-issue-proj');
  if(sel) sel.value = name;
}

function rebuildIssueModalDropdowns(){
  const projSel = document.getElementById('ifi-proj');
  if(projSel) projSel.innerHTML = '<option value="">— Chọn dự án —</option>' + projects.filter(p=>p.status==='open').map(p=>`<option value="${p.id}">${p.name}</option>`).join('');
  const modSel = document.getElementById('ifi-module');
  if(modSel) modSel.innerHTML = '<option value="">— Chọn phân hệ —</option>' + catalog.modules.map(m=>`<option value="${m.id}">${m.name} – ${m.fullName||''}</option>`).join('');
  const typeSel = document.getElementById('ifi-type');
  if(typeSel) typeSel.innerHTML = '<option value="">— Chọn loại —</option>' + catalog.issueTypes.map(t=>`<option value="${t.id}">${t.name}</option>`).join('');
  const statusSel = document.getElementById('ifi-status');
  if(statusSel) statusSel.innerHTML = '<option value="">— Chọn tình trạng —</option>' + catalog.issueStatuses.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
  const confirmStatusSel = document.getElementById('ifi-confirm-status');
  if(confirmStatusSel) confirmStatusSel.innerHTML = '<option value="">— Chọn tình trạng XN —</option>' + catalog.confirmStatuses.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
  const memberOpts = members.map(m=>`<option value="${m.id}">${m.name}</option>`).join('');
  const emptyOpt = '<option value="">— Chọn —</option>';
  ['ifi-owner','ifi-pic','ifi-tester'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.innerHTML = emptyOpt + memberOpts;
  });
}

function openIssueModal(){
  editingIssueId = null;
  document.getElementById('issue-modal-title').textContent = '🐛 Thêm Issue mới';
  ['ifi-module','ifi-feature','ifi-desc','ifi-note','ifi-log-date','ifi-done-date','ifi-confirm-date','ifi-confirm-status']
    .forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  const statusEl=document.getElementById('ifi-status'); if(statusEl&&catalog.issueStatuses.length) statusEl.value=catalog.issueStatuses[0].name;
  const csEl=document.getElementById('ifi-confirm-status'); if(csEl) csEl.value='';
  const typeEl=document.getElementById('ifi-type'); if(typeEl) typeEl.value='';
  rebuildIssueModalDropdowns();
  const ifip=document.getElementById('ifi-proj'); if(ifip && issueProjectFilter) ifip.value = issueProjectFilter;
  const _imov2=document.getElementById('issue-modal-ov'); if(_imov2) _imov2.style.display = 'flex';
  setTimeout(()=>document.getElementById('ifi-desc')?.focus(),100);
}

function openIssueModalForProject(projId){
  issueProjectFilter = projId;
  openIssueModal();
}

function openEditIssue(id){
  const iss = issues.find(x=>x.id===id); if(!iss) return;
  editingIssueId = id;
  document.getElementById('issue-modal-title').textContent = '✏️ Chỉnh sửa Issue';
  rebuildIssueModalDropdowns();
  document.getElementById('ifi-proj').value = iss.project_id||'';
  document.getElementById('ifi-module').value = iss.module_id||'';
  document.getElementById('ifi-feature').value = iss.feature||'';
  document.getElementById('ifi-desc').value = iss.desc||'';
  document.getElementById('ifi-log-date').value = iss.log_date||'';
  document.getElementById('ifi-type').value = iss.type_id||'';
  document.getElementById('ifi-owner').value = iss.owner_id||'';
  document.getElementById('ifi-pic').value = iss.pic_id||'';
  document.getElementById('ifi-status').value = iss.status_id||'';
  document.getElementById('ifi-done-date').value = iss.done_date||'';
  document.getElementById('ifi-tester').value = iss.tester_id||'';
  document.getElementById('ifi-confirm-date').value = iss.confirm_date||'';
  const csSel=document.getElementById('ifi-confirm-status'); if(csSel) csSel.value=iss.confirm_status_id||'';
  document.getElementById('ifi-note').value = iss.note||'';
  const _imov3=document.getElementById('issue-modal-ov'); if(_imov3) _imov3.style.display = 'flex';
}

function closeIssueModal(){ const _imov=document.getElementById('issue-modal-ov'); if(_imov) _imov.style.display = 'none'; }

function saveIssue(){
  const proj = document.getElementById('ifi-proj').value;
  const desc = document.getElementById('ifi-desc').value.trim();
  if(!proj||!desc){ toast('Vui lòng chọn dự án và nhập mô tả!'); return; }
  const data = {
    project_id:proj,
    module_id:document.getElementById('ifi-module').value,
    feature:document.getElementById('ifi-feature').value, desc,
    logDate:document.getElementById('ifi-log-date').value,
    type_id:document.getElementById('ifi-type').value,
    owner_id:document.getElementById('ifi-owner').value,
    pic_id:document.getElementById('ifi-pic').value,
    status_id:document.getElementById('ifi-status').value,
    done_date:document.getElementById('ifi-done-date').value,
    tester_id:document.getElementById('ifi-tester').value,
    confirm_date:document.getElementById('ifi-confirm-date').value,
    confirm_status_id:(document.getElementById('ifi-confirm-status')||{}).value||'',
    log_date:document.getElementById('ifi-log-date').value,
    note:document.getElementById('ifi-note').value,
  };
  if(editingIssueId){
    const idx=issues.findIndex(x=>x.id===editingIssueId);
    issues[idx]={...issues[idx],...data};
    toast('Đã cập nhật issue!');
  } else {
    data.id='i'+issueNextId++;
    issues.push(data);
    toast('Đã thêm issue!');
  }
  closeIssueModal();
  renderIssues();
  scheduleAutoSave();
}

async function deleteIssue(id){
  const ok=await confirm2('Xóa Issue','Bạn có chắc muốn xóa issue này?');
  if(!ok) return;
  // Also remove linked task if any
  const iss = issues.find(x=>x.id===id);
  if(iss && iss.issue_task_id){
    const ti = tasks.findIndex(t=>t.id===iss.issue_task_id);
    if(ti>=0){ tasks.splice(ti,1); filteredTasks=[...tasks]; }
  }
  issues=issues.filter(x=>x.id!==id);
  renderIssues();
  renderSidebarProjects();
  scheduleAutoSave();
  toast('Đã xóa issue!');
}
