// ── PROJECTS VIEW ──

function toggleSbProjects(){
  sbProjOpen = !sbProjOpen;
  const list = document.getElementById('sb-proj-list');
  const arrow = document.getElementById('sb-proj-arrow');
  const toggle = document.getElementById('sb-proj-toggle');
  if(sbProjOpen){
    list.style.display = 'block';
    arrow.style.transform = 'rotate(90deg)';
    toggle.style.color = 'var(--text)';
  } else {
    list.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
    toggle.style.color = 'var(--text3)';
  }
}

function renderSidebarProjects(){
  const open = projects.filter(p=>p.status==='open');
  document.getElementById('sb-proj-total').textContent = open.length;
  const el = document.getElementById('sb-projects');
  const curView = (document.querySelector('.view.active')||{}).id||'';
  const isOverview = curView === 'view-projects';
  el.innerHTML =
    `<div class="nav-item proj-sb-item ${isOverview && !currentProjFilter ? 'active' : ''}" onclick="goAllProjects(this)">
      <span class="nav-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ><path d="M2 5a2 2 0 012-2h3l2 2h5a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2V5z"/></svg></span>
      <span style="flex:1">Dự án</span>
      <span class="proj-badge">${open.length}</span>
    </div>` +
    open.map(p=>`
    <div class="nav-item proj-sb-item ${currentProjFilter===p.name?'active':''}" onclick="filterByProject('${p.id}',this)" style="padding-left:14px">
      ${p.logo?`<img src="${p.logo}" style="width:16px;height:16px;object-fit:contain;border-radius:3px;flex-shrink:0" onerror="this.outerHTML='<div style=width:16px;height:16px;border-radius:3px;background:'+ p.color +';flex-shrink:0></div>'"/>`:`<div style="width:8px;height:8px;border-radius:50%;background:${p.color};flex-shrink:0;margin:0 4px"></div>`}
      <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${p.name}</span>
      <span class="proj-badge">${tasks.filter(t=>t.project_id===p.id).length}</span>
    </div>`).join('');
}

function goAllProjects(el){
  currentProjFilter = null;
  document.querySelectorAll('.proj-sb-item').forEach(x=>x.classList.remove('active'));
  if(el) el.classList.add('active');
  showView('projects');
}

function filterByProject(name, el){
  currentProjFilter = projId;
  document.getElementById('f-proj').value = name;
  applyFilters();
  document.querySelectorAll('.proj-sb-item').forEach(x=>x.classList.remove('active'));
  if(el) el.classList.add('active');
  showView('tasks');
  const p = projects.find(x=>x.name===name);
  if(p) document.getElementById('breadcrumb').innerHTML =
    `<span style="color:var(--text2)">Task Manager</span><span style="color:var(--text3);margin:0 5px">›</span><b style="color:${p.color}">${name}</b>`;
}

function renderProjectsOverview(){
  renderProjOverviewCards();
}

function switchProjOverviewTab(tab){
  projOverviewTab = tab;
  const activeStyle = 'padding:8px 16px;font-size:13px;cursor:pointer;color:var(--accent);border-bottom:2px solid var(--accent);font-weight:500;margin-bottom:-1px';
  const inactiveStyle = 'padding:8px 16px;font-size:13px;cursor:pointer;color:var(--text2);border-bottom:2px solid transparent;margin-bottom:-1px';
  const ptO=document.getElementById('ptab-open'); if(ptO) ptO.style.cssText = tab==='open' ? activeStyle : inactiveStyle;
  const ptC=document.getElementById('ptab-closed'); if(ptC) ptC.style.cssText = tab==='closed' ? activeStyle : inactiveStyle;
  renderProjOverviewCards();
}

function renderProjOverviewCards(){
  const list = projects.filter(p=>p.status===projOverviewTab);
  const el = document.getElementById('proj-overview-cards');
  if(!el) return;
  if(list.length === 0){
    el.innerHTML = `<div style="text-align:center;padding:60px 0;color:var(--text3);font-size:13px">Không có dự án nào ${projOverviewTab==='closed'?'đã đóng':'đang mở'}.</div>`;
    return;
  }
  el.innerHTML = `
    <div style="display:grid;grid-template-columns:32px 1fr 120px 160px 80px 80px 80px 160px;gap:0;font-size:11px;font-weight:500;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;padding:0 16px 8px;border-bottom:1px solid var(--border);margin-bottom:4px">
      <div></div>
      <div>Tên dự án</div>
      <div>Mã</div>
      <div>Quản lý</div>
      <div>Tasks</div>
      <div>Hoàn thành</div>
      <div style="min-width:120px">Tiến độ</div>
      <div style="text-align:right">Thao tác</div>
    </div>` +
  list.map(p=>{
    const pt = tasks.filter(t=>t.project_id===p.id);
    const avgProg = pt.length ? Math.round(pt.reduce((a,t)=>a+t.progress,0)/pt.length) : 0;
    const done = pt.filter(t=>stageName(t.stage_id)==='Done').length;
    const inprog = pt.filter(t=>stageName(t.stage_id)==='In progress').length;
    const statusBadge = p.status==='open'
      ? `<span style="display:inline-flex;align-items:center;gap:4px;font-size:10px;background:#f0fdf4;color:#16a34a;padding:2px 8px;border-radius:99px;font-weight:500">Đang mở</span>`
      : `<span style="display:inline-flex;align-items:center;gap:4px;font-size:10px;background:#f8fafc;color:#94a3b8;padding:2px 8px;border-radius:99px;font-weight:500">Đã đóng</span>`;
    return `<div style="display:grid;grid-template-columns:32px 1fr 120px 160px 80px 80px 80px 160px;gap:0;align-items:center;padding:11px 16px;border-bottom:1px solid var(--border);transition:background .1s;cursor:default" onmouseenter="this.style.background='var(--bg2)'" onmouseleave="this.style.background=''">
      <div>${projLogoEl(p,28)}</div>
      <div>
        <div style="font-weight:600;font-size:13px;margin-bottom:2px">${p.name}</div>
        <div style="font-size:11px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:240px">${p.desc||'—'}</div>
      </div>
      <div style="font-size:11px;color:var(--text3);font-weight:500;letter-spacing:.04em">${p.code}</div>
      <div style="font-size:12px;color:var(--text2)">${p.pm||'—'}</div>
      <div style="font-size:13px;font-weight:600">${pt.length}</div>
      <div style="font-size:12px;color:var(--text2)">${done}/${pt.length}</div>
      <div style="min-width:100px">${progBar(avgProg)}</div>
      <div style="display:flex;gap:6px;justify-content:flex-end">
        <button class="btn btn-sm" onclick="goProjectDetail('${p.id}')" title="Xem thông tin dự án" style="gap:4px">
          📋 Thông tin
        </button>
        <button class="btn btn-sm btn-primary" onclick="filterByProjectFromOverview('${p.id}')" title="Xem Task Manager" style="gap:4px">
          ☑️ Tasks
        </button>
        <button class="btn btn-sm" onclick="filterIssuesByProject('${p.id}')" title="Xem Issues" style="gap:4px;background:#fff7ed;color:#f97316;border-color:#fed7aa">
          🐛 Issues
        </button>
      </div>
    </div>`;
  }).join('');
}

function filterByProjectFromOverview(projId){
  currentProjFilter = projId;
  document.getElementById('f-proj').value = name;
  applyFilters();
  // highlight sidebar item
  document.querySelectorAll('.proj-sb-item').forEach(x=>x.classList.remove('active'));
  const sideItems = document.querySelectorAll('.proj-sb-item');
  sideItems.forEach(x=>{ if(x.textContent.includes(name)) x.classList.add('active'); });
  showView('tasks');
  const p = projects.find(x=>x.name===name);
  if(p) document.getElementById('breadcrumb').innerHTML =
    `<span style="color:var(--text2)">Task Manager</span><span style="color:var(--text3);margin:0 5px">›</span><b style="color:${p.color}">${name}</b>`;
}

function goProjectDetail(id){
  const p = projects.find(x=>x.id===id);
  if(!p) return;
  showView('proj-detail');
  // breadcrumb
  document.getElementById('vpd-breadcrumb').innerHTML =
    `<span onclick="backToProjList()" style="cursor:pointer;color:var(--text2)">Quản lý dự án</span>
     <span style="margin:0 5px;color:var(--text3)">›</span>
     <b style="color:${p.color}">${p.name}</b>`;
  document.getElementById('vpd-content').innerHTML = '';
  renderProjDetailContent(p, 'vpd-content');
}

function backToProjList(){
  showView('projects');
}

function renderProjCards(){
  renderProjOverviewCards();
  const el = document.getElementById('proj-cards');
  if(!el) return;
  el.innerHTML=projects.map(p=>`
    <div class="proj-card" onclick="openProjDetail('${p.id}')">
      <div class="proj-card-banner" style="background:${p.color}"></div>
      <div class="proj-card-body">
        <div class="proj-card-code">${p.code}</div>
        <div class="proj-card-name">${p.name}</div>
        <div style="font-size:11.5px;color:var(--text2);margin-bottom:10px;line-height:1.4">${p.desc||''}</div>
        <div class="proj-card-meta">
          <span class="proj-status-badge ${p.status==='open'?'proj-open':'proj-closed'}">${p.status==='open'?'Đang mở':'Đã đóng'}</span>
          <span style="font-size:11px;color:var(--text3);margin-left:auto">${tasks.filter(t=>t.project_id===p.id).length} tasks</span>
        </div>
      </div>
    </div>`).join('');
}

function openProjDetail(id){
  const p=projects.find(x=>x.id===id);if(!p)return;
  const plv=document.getElementById('proj-list-view'); if(plv) plv.style.display='none';
  const pdv=document.getElementById('proj-detail-view'); if(pdv) pdv.style.display='block';
  renderProjDetailContent(p);
}

function backToProjects(){
  const plv2=document.getElementById('proj-list-view'); if(plv2) plv2.style.display='';
  const pdv2=document.getElementById('proj-detail-view'); if(pdv2) pdv2.style.display='none';
}

function renderProjDetailContent(p, containerId){
  const cid = containerId || 'proj-detail-content';
  const pt=tasks.filter(t=>t.project_id===p.id);
  const avgProg=avg(pt.map(t=>t.progress));
  document.getElementById(cid).innerHTML=`
    <div style="display:flex;align-items:flex-start;gap:16px;margin-bottom:20px">
      <div style="width:6px;background:${p.color};border-radius:3px;align-self:stretch;flex-shrink:0"></div>
      <div style="flex:1">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
          <div style="font-size:22px;font-weight:700">${p.name}</div>
          <span class="proj-status-badge ${p.status==='open'?'proj-open':'proj-closed'}" style="cursor:pointer" onclick="toggleProjStatus('${p.id}')">${p.status==='open'?'Đang mở':'Đã đóng'}</span>
        </div>
        <div style="font-size:12px;color:var(--text3);font-weight:500;letter-spacing:.05em;text-transform:uppercase">${p.code}${p.short&&p.short!==p.code?` · Viết tắt: <b>${p.short}</b>`:''}</div>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-sm" onclick="openEditProjModal('${p.id}')"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ><path d="M11 2l3 3-8 8H3v-3l8-8z"/></svg> Chỉnh sửa</button>
        <button class="btn btn-sm btn-danger" onclick="deleteProject('${p.id}')"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ><path d="M3 5h10m-7 0V3h4v2M6 5v7m4-7v7M4 5l1 9h6l1-9"/></svg> Xóa</button>
      </div>
    </div>

    <!-- TABS -->
    <div class="tabs">
      <div class="tab active" onclick="switchProjTab(this,'info')">Thông tin</div>
      <div class="tab" onclick="switchProjTab(this,'notes')">Ghi chú</div>
      <div class="tab" onclick="switchProjTab(this,'tasks-tab')">☑️ Tasks (${pt.length})</div>
      <div class="tab" onclick="switchProjTab(this,'issues-tab')">🐛 Issues (${issues.filter(x=>x.project_id===p.id).length})</div>
    </div>

    <div class="tab-pane active" id="ptab-info">
      <div class="info-fields">
        <div class="info-field"><div class="info-field-label">Quản lý dự án</div><input class="info-field-input" value="${p.pm||''}" onchange="updateProjField('${p.id}','pm',this.value)" placeholder="—"/></div>
        <div class="info-field"><div class="info-field-label">Tiến độ chung</div><div style="margin-top:4px">${progBar(avgProg,'8px')}</div></div>
        <div class="info-field"><div class="info-field-label">Ngày bắt đầu</div><input class="info-field-input" type="date" value="${p.start||''}" onchange="updateProjField('${p.id}','start',this.value)"/></div>
        <div class="info-field"><div class="info-field-label">Ngày kết thúc dự kiến</div><input class="info-field-input" type="date" value="${p.end||''}" onchange="updateProjField('${p.id}','end',this.value)"/></div>
        <div class="info-field" style="grid-column:1/-1"><div class="info-field-label">Mô tả dự án</div><textarea class="info-field-input" style="min-height:60px;resize:vertical;line-height:1.5" onchange="updateProjField('${p.id}','desc',this.value)" placeholder="Mô tả...">${p.desc||''}</textarea></div>
        <div class="info-field"><div class="info-field-label">Màu chủ đề</div><input type="color" value="${p.color}" onchange="updateProjField('${p.id}','color',this.value);renderProjCards();renderSidebarProjects()" style="width:100%;height:36px;padding:3px;border:none;cursor:pointer;border-radius:var(--radius-md)"/></div>
        <div class="info-field"><div class="info-field-label">Tổng số Task</div><div style="font-size:22px;font-weight:700;color:var(--text);margin-top:2px">${pt.length}</div></div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:4px">
        ${catalog.stages.map(s=>{const cnt=pt.filter(t=>t.stage_id===s.id).length;return`<div class="stat-card" style="padding:12px 14px"><div class="stat-lbl" style="font-size:10px">${s.name}</div><div class="stat-val" style="font-size:20px;color:${s.color}">${cnt}</div></div>`;}).join('')}
      </div>
    </div>

    <div class="tab-pane" id="ptab-notes">
      <div style="margin-bottom:10px;display:flex;gap:6px;flex-wrap:wrap" class="block-toolbar">
        <button class="block-type-btn" onclick="addBlock('${p.id}','text')">¶ Text</button>
        <button class="block-type-btn" onclick="addBlock('${p.id}','heading1')">H1</button>
        <button class="block-type-btn" onclick="addBlock('${p.id}','heading2')">H2</button>
        <button class="block-type-btn" onclick="addBlock('${p.id}','heading3')">H3</button>
        <button class="block-type-btn" onclick="addBlock('${p.id}','quote')">❝ Quote</button>
        <button class="block-type-btn" onclick="addBlock('${p.id}','callout')">📌 Callout</button>
      </div>
      <div class="blocks-area" id="blocks-${p.id}">${renderBlocks(p)}</div>
    </div>

    <div class="tab-pane" id="ptab-tasks-tab">
      <div style="margin-bottom:12px;display:flex;justify-content:flex-end">
        <button class="btn btn-primary btn-sm" onclick="openTaskModalForProject('${p.id}')"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ><path d="M8 3v10M3 8h10"/></svg> Thêm Task</button>
      </div>
      <div class="tbl-wrap"><table><thead><tr><th>Tên Task</th><th>Trạng thái</th><th>Ưu tiên</th><th>Phụ trách</th><th>Tiến độ</th></tr></thead>
      <tbody>${pt.map(t=>`<tr onclick="openDP(${t.id})">\
        <td style="font-weight:500">${t.name}</td><td>${sBadge(stageName(t.stage_id),stageColor(t.stage_id))}</td><td>${pBadge(priorityName(t.priority_id),priorityColor(t.priority_id))}</td>\
        <td><div style="display:flex;align-items:center;gap:5px">${avEl(memberName(t.assignee_id),memberColor(t.assignee_id))}<span style="font-size:12px">${memberName(t.assignee_id)}</span></div></td>\
        <td style="min-width:120px">${progBar(t.progress)}</td></tr>`).join('')}</tbody></table></div>
    </div>
    <div class="tab-pane" id="ptab-issues-tab">
      <div style="margin-bottom:12px;display:flex;justify-content:flex-end">
        <button class="btn btn-primary btn-sm" onclick="openIssueModalForProject('${p.id}')"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ><path d="M8 3v10M3 8h10"/></svg> Thêm Issue</button>
      </div>
      <div class="tbl-wrap" style="overflow-x:auto">${renderIssueTableHTML(issues.filter(x=>x.project_id===p.id),false)}</div>
    </div>
  `;
}

function switchProjTab(el,key){
  const container = el.closest('.view') || document;
  container.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  container.querySelectorAll('.tab-pane').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('ptab-'+key).classList.add('active');
}

function updateProjField(id,field,val){
  const p=projects.find(x=>x.id===id);if(!p)return;
  p[field]=val;renderSidebarProjects();rebuildFilterDropdowns();rebuildTaskModalDropdowns();
  toast('Đã lưu!');
}

async function toggleProjStatus(id){
  const p=projects.find(x=>x.id===id);if(!p)return;
  p.status=p.status==='open'?'closed':'open';
  // re-render current view
  const cur=document.querySelector('.view.active');
  if(cur && cur.id==='view-proj-detail') renderProjDetailContent(p,'vpd-content');
  renderProjCards();renderSidebarProjects();rebuildFilterDropdowns();
  toast(`✅ Dự án ${p.status==='open'?'đã mở':'đã đóng'}!`);
}

async function deleteProject(id){
  const p=projects.find(x=>x.id===id);if(!p)return;
  const ok=await confirm2('Xóa dự án',`Xóa dự án "${p.name}"? Các task trong dự án sẽ không bị xóa.`);
  if(!ok)return;
  projects=projects.filter(x=>x.id!==id);
  backToProjList();renderProjCards();renderProjOverviewCards();renderSidebarProjects();rebuildFilterDropdowns();rebuildTaskModalDropdowns();
  scheduleAutoSave();
  toast('🗑️ Đã xóa dự án!');
}

function openNewProjModal(){
  editingProjId=null;
  ['pfi-name','pfi-code','pfi-short','pfi-desc','pfi-pm','pfi-logo'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  document.getElementById('pfi-color').value='#2563eb';
  document.getElementById('pfi-status').value='open';
  document.getElementById('pfi-start').value='';
  document.getElementById('pfi-end').value='';
  const _m_proj_modal_ov=document.getElementById('proj-modal-ov'); if(_m_proj_modal_ov) _m_proj_modal_ov.style.display='flex';
  setTimeout(()=>document.getElementById('pfi-code').focus(),100);
}

function openEditProjModal(id){
  const p=projects.find(x=>x.id===id);if(!p)return;
  editingProjId=id;
  document.getElementById('pfi-name').value=p.name;
  document.getElementById('pfi-code').value=p.code;
  const pfiShort=document.getElementById('pfi-short');if(pfiShort)pfiShort.value=p.short||'';
  const pfiLogo=document.getElementById('pfi-logo');if(pfiLogo)pfiLogo.value=p.logo||'';
  document.getElementById('pfi-desc').value=p.desc||'';
  document.getElementById('pfi-color').value=p.color;
  document.getElementById('pfi-status').value=p.status;
  document.getElementById('pfi-start').value=p.start||'';
  document.getElementById('pfi-end').value=p.end||'';
  document.getElementById('pfi-pm').value=p.pm_id||'';
  const _m_proj_modal_ov=document.getElementById('proj-modal-ov'); if(_m_proj_modal_ov) _m_proj_modal_ov.style.display='flex';
}

function closeProjModal(){const _mc_proj_modal_ov=document.getElementById('proj-modal-ov'); if(_mc_proj_modal_ov) _mc_proj_modal_ov.style.display='none';}

function saveProject(){
  const name=document.getElementById('pfi-name').value.trim();
  const code=document.getElementById('pfi-code').value.trim();
  if(!name||!code){toast('Vui lòng nhập tên và mã dự án!');return;}
  const pfiS=document.getElementById('pfi-short');const pfiL=document.getElementById('pfi-logo');const data={name,code,short:(pfiS?pfiS.value:code).toUpperCase()||code,logo:(pfiL?pfiL.value.trim():''),color:document.getElementById('pfi-color').value,status:document.getElementById('pfi-status').value,desc:document.getElementById('pfi-desc').value,start:document.getElementById('pfi-start').value,end:document.getElementById('pfi-end').value,pm_id:document.getElementById('pfi-pm').value};
  if(editingProjId){
    const p=projects.find(x=>x.id===editingProjId);
    Object.assign(p,data);
    const cur2=document.querySelector('.view.active');
    if(cur2 && cur2.id==='view-proj-detail') renderProjDetailContent(p,'vpd-content');
    toast('Đã cập nhật dự án!');
  } else {
    data.id=newProjId();data.blocks=[];
    projects.push(data);
    toast('Đã tạo dự án mới!');
  }
    closeProjModal();renderSidebarProjects();rebuildFilterDropdowns();rebuildTaskModalDropdowns();if(document.getElementById('proj-overview-cards')) renderProjOverviewCards();scheduleAutoSave();

}

function projShort(projId){
  const p=projects.find(x=>x.id===projId);
  return p?(p.short||p.code?.split('-')[0]||'—'):'—';
}

function projCode(projName){
  const p=projects.find(x=>x.name===projName);
  return p?p.code:p.short
}

function projColorFor(projId){
  return projColor(projId);
}

function projLogoEl(p, size=28) {
  if(p.logo) {
    return `<img src="${p.logo}" style="width:${size}px;height:${size}px;object-fit:contain;border-radius:6px;border:1px solid var(--border)" onerror="this.style.display='none';this.nextSibling.style.display='flex'" /><div style="display:none;width:${size}px;height:${size}px;border-radius:6px;background:${p.color};align-items:center;justify-content:center;font-size:${Math.floor(size*0.38)}px;font-weight:700;color:#fff">${p.short||p.name.slice(0,2).toUpperCase()}</div>`;
  }
  return `<div style="width:${size}px;height:${size}px;border-radius:6px;background:${p.color};display:flex;align-items:center;justify-content:center;font-size:${Math.floor(size*0.38)}px;font-weight:700;color:#fff;flex-shrink:0">${p.short||p.name.slice(0,2).toUpperCase()}</div>`;
}
