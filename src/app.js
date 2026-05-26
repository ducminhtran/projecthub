
// ══════════════════════════════════════════════════
//  RELATION RESOLVERS (Phase 2 — ID-based)
// ══════════════════════════════════════════════════
function resolveProject(id)  { return projects.find(p=>p.id===id)||null; }
function resolveMember(id)   { return members.find(m=>m.id===id)||null; }
function resolveStage(id)    { return catalog.stages.find(s=>s.id===id)||null; }
function resolvePriority(id) { return catalog.priorities.find(p=>p.id===id)||null; }
function resolveModule(id)   { return catalog.modules.find(m=>m.id===id)||null; }
function resolveIssueType(id){ return catalog.issueTypes.find(t=>t.id===id)||null; }
function resolveIssueStatus(id){ return catalog.issueStatuses.find(s=>s.id===id)||null; }
function resolveConfirmStatus(id){ return catalog.confirmStatuses.find(s=>s.id===id)||null; }
function resolvePosition(id) { return catalog.positions.find(p=>p.id===id)||null; }

// Shortcut display helpers
function projName(id)    { return resolveProject(id)?.name  || '—'; }
function projColor(id)   { return resolveProject(id)?.color || '#888'; }
function projShortName(id) { return resolveProject(id)?.short || resolveProject(id)?.name?.slice(0,3) || '—'; }
function memberName(id)  { return resolveMember(id)?.name   || '—'; }
function memberColor(id) { return resolveMember(id)?.color  || '#888'; }
function stageName(id)   { return resolveStage(id)?.name    || ''; }
function stageColor(id)  { return resolveStage(id)?.color   || '#888'; }
function priorityName(id){ return resolvePriority(id)?.name || ''; }
function priorityColor(id){ return resolvePriority(id)?.color|| '#888'; }
function positionName(id){ return resolvePosition(id)?.name || '—'; }

// ══════════════════════════════
//  CATALOG DATA
// ══════════════════════════════
let catalog = {
  stages: [
    {id:'s1',name:'Pending',    color:'#94a3b8',desc:'Chờ bắt đầu'},
    {id:'s2',name:'In progress',color:'#3b82f6',desc:'Đang thực hiện'},
    {id:'s3',name:'Backlog',    color:'#a855f7',desc:'Trong danh sách chờ'},
    {id:'s4',name:'Done',       color:'#22c55e',desc:'Đã hoàn thành'},
  ],
  priorities: [
    {id:'p1',name:'Urgent', color:'#ef4444',desc:'Khẩn cấp – xử lý ngay'},
    {id:'p2',name:'High',   color:'#f97316',desc:'Ưu tiên cao'},
    {id:'p3',name:'Medium', color:'#eab308',desc:'Ưu tiên trung bình'},
    {id:'p4',name:'Low',    color:'#22c55e',desc:'Ưu tiên thấp'},
  ],
  departments: [
    {id:'d1',name:'Finance',          color:'#3b82f6',desc:'Tài chính – Kế toán'},
    {id:'d2',name:'IT',               color:'#8b5cf6',desc:'Công nghệ thông tin'},
    {id:'d3',name:'HR',               color:'#ec4899',desc:'Nhân sự'},
    {id:'d4',name:'Marketting',       color:'#f97316',desc:'Marketing – Truyền thông'},
    {id:'d5',name:'Operations',       color:'#14b8a6',desc:'Vận hành'},
    {id:'d6',name:'Sales',            color:'#22c55e',desc:'Kinh doanh – Bán hàng'},
    {id:'d7',name:'Customer Service', color:'#f59e0b',desc:'Chăm sóc khách hàng'},
  ],
  positions: [
    {id:'pos1', name:'PM',     color:'#2563eb', desc:'Project Manager – Quản lý dự án'},
    {id:'pos2', name:'Lead',   color:'#7c3aed', desc:'Tech Lead / Team Lead'},
    {id:'pos3', name:'Member', color:'#16a34a', desc:'Thành viên nhóm'},
    {id:'pos4', name:'QA',     color:'#d97706', desc:'Kiểm thử chất lượng'},
    {id:'pos5', name:'Design', color:'#db2777', desc:'Thiết kế UI/UX'},
  ],
  modules: [
    {id:'mod1', name:'KT',  fullName:'Kế toán',          color:'#3b82f6'},
    {id:'mod2', name:'HR',  fullName:'Nhân sự',           color:'#ec4899'},
    {id:'mod3', name:'ERP', fullName:'Hoạch định nguồn lực',color:'#8b5cf6'},
    {id:'mod4', name:'CRM', fullName:'Quản lý khách hàng', color:'#f97316'},
    {id:'mod5', name:'MES', fullName:'Sản xuất',          color:'#14b8a6'},
    {id:'mod6', name:'WEB', fullName:'Website / Portal',  color:'#2563eb'},
  ],
  issueTypes: [
    {id:'it1', name:'Lỗi',              color:'#ef4444', desc:'Bug – lỗi hệ thống'},
    {id:'it2', name:'Yêu cầu bổ sung',  color:'#7c3aed', desc:'Enhancement request'},
    {id:'it3', name:'Hiệu năng',        color:'#f97316', desc:'Performance issue'},
    {id:'it4', name:'Bảo mật',          color:'#dc2626', desc:'Security vulnerability'},
  ],
  issueStatuses: [
    {id:'is1', name:'Mở',              color:'#ef4444', desc:'Issue mới, chưa xử lý'},
    {id:'is2', name:'Đang xử lý',      color:'#f97316', desc:'Đang trong quá trình xử lý'},
    {id:'is3', name:'Đã giải quyết',   color:'#16a34a', desc:'Đã fix/hoàn thành'},
    {id:'is4', name:'Đã đóng',         color:'#64748b', desc:'Đã đóng, không xử lý thêm'},
  ],
  confirmStatuses: [
    {id:'cs1', name:'Chưa xác nhận',   color:'#94a3b8', desc:'Chưa có người kiểm tra'},
    {id:'cs2', name:'Đang kiểm tra',   color:'#f97316', desc:'Đang trong quá trình kiểm tra'},
    {id:'cs3', name:'Đã hoàn thành',   color:'#16a34a', desc:'Đã kiểm tra và xác nhận hoàn thành'},
    {id:'cs4', name:'Cancel yêu cầu', color:'#64748b', desc:'Yêu cầu bị hủy'},
  ],
};

// PROJECTS
let projects = [];
let projNextId = 5;

// TASKS
let tasks = [];
let nextTaskId = 14;
let filteredTasks = [...tasks];
let editingTaskId = null;
let detailTaskId = null;
let calY = 2025, calM = 2;
let filterOpen = false;
let confirmCb = null;
let currentProjFilter = null;

// ══════════════════════════════
//  HELPERS
// ══════════════════════════════
const AVATARS = {
  'Person A':{bg:'#3b82f6',i:'PA'},'Person B':{bg:'#a855f7',i:'PB'},
  'Person C':{bg:'#22c55e',i:'PC'},'Person D':{bg:'#f97316',i:'PD'},
  'Person E':{bg:'#ef4444',i:'PE'},'Person F':{bg:'#eab308',i:'PF'},
};

function pBadge(p){
  const cat=catalog.priorities.find(x=>x.name===p)||{color:'#888'};
  const bg=hexToRgba(cat.color,.12);
  return `<span class="badge" style="background:${bg};color:${cat.color}">${p}</span>`;
}
function sBadge(s){
  const cat=catalog.stages.find(x=>x.name===s)||{color:'#888'};
  const bg=hexToRgba(cat.color,.12);
  return `<span class="badge" style="background:${bg};color:${cat.color}">${s}</span>`;
}
function hexToRgba(hex,a){
  hex=hex.replace('#','');
  if(hex.length===3) hex=hex.split('').map(c=>c+c).join('');
  const r=parseInt(hex.slice(0,2),16),g=parseInt(hex.slice(2,4),16),b=parseInt(hex.slice(4,6),16);
  return `rgba(${r},${g},${b},${a})`;
}
function progBar(pct,h='6px'){
  pct=+pct;
  const stageColor=pct>=100?'#22c55e':'var(--accent)';
  return `<div class="prog-wrap"><div class="prog-track" style="height:${h}"><div class="prog-fill" style="width:${pct}%;height:100%;background:${stageColor}"></div></div><span class="prog-pct">${pct}%</span></div>`;
}
function avEl(person,size=22){
  const a=AVATARS[person]||{bg:'#888',i:(person||'?').slice(0,2).toUpperCase()};
  return `<div class="avatar" style="background:${a.bg};width:${size}px;height:${size}px;font-size:${Math.floor(size*.42)}px">${a.i}</div>`;
}
function toast(msg){
  const el=document.getElementById('toast');
  el.textContent=msg;el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'),2500);
}
function unique(arr,k){return[...new Set(arr.map(x=>x[k]))]}
function avg(arr){return arr.length?Math.round(arr.reduce((a,b)=>a+b,0)/arr.length):0}
function projColor(name){
  const p=projects.find(x=>x.name===name);
  return p?p.color:'#888';
}

// ══════════════════════════════
//  CONFIRM DIALOG
// ══════════════════════════════
function confirm2(title,msg,btnLabel='Xóa'){
  return new Promise(resolve=>{
    confirmCb=resolve;
    document.getElementById('confirm-title').textContent=title;
    document.getElementById('confirm-msg').textContent=msg;
    document.getElementById('confirm-ok-btn').textContent=btnLabel;
    document.getElementById('confirm-ov').classList.add('open');
  });
}
function confirmResolve(val){
  document.getElementById('confirm-ov').classList.remove('open');
  if(confirmCb) confirmCb(val);
  confirmCb=null;
}

// ══════════════════════════════
//  NAV
// ══════════════════════════════
const TITLES={dashboard:'Tổng quan',tasks:'Task Manager',issues:'Issue Manager',board:'Display Board',calendar:'Calendar',gantt:'Gantt Chart',planner:'Daily Planner',report:'Report',resource:'Thành viên dự án',projects:'Quản lý dự án','proj-detail':'Thông tin dự án',settings:'Cài đặt & Thiết lập'};

document.querySelectorAll('#main-nav .nav-item').forEach(el=>{
  el.addEventListener('click',()=>showView(el.dataset.view));
});

function showView(name){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+name).classList.add('active');
  document.querySelectorAll('#main-nav .nav-item').forEach(n=>n.classList.toggle('active',n.dataset.view===name));
  document.getElementById('nav-resource')?.classList.toggle('active', name==='resource');
  document.getElementById('nav-proj-all')?.classList.toggle('active', name==='projects');
  document.getElementById('breadcrumb').innerHTML=`<b>${TITLES[name]||name}</b>`;
  closeDP();
  // Show/hide header buttons
  const isSettings = name==='settings';
  const isProjDetail = name==='proj-detail';
  const isResource = name==='resource';
  const isIssues = name==='issues';
  const hdrRight = document.getElementById('header')?.querySelector('.hdr-right');
  if(hdrRight) hdrRight.style.display=(isSettings||isProjDetail||isResource||isIssues)?'none':'flex';
  const renders={dashboard:renderDashboard,tasks:renderTasks,issues:renderIssues,board:renderBoard,calendar:renderCalendar,gantt:renderGantt,planner:renderPlanner,report:renderReport,resource:renderResource,projects:renderProjectsOverview,'proj-detail':function(){},settings:renderSettings};
  if(renders[name]) renders[name]();
}

// ══════════════════════════════
//  SIDEBAR PROJECTS
// ══════════════════════════════
let sbProjOpen = true;

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

let projOverviewTab = 'open';

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

// ── PROJECTS OVERVIEW PAGE ──
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

// ══════════════════════════════
//  FILTER
// ══════════════════════════════
function rebuildFilterDropdowns(){
  const fp=document.getElementById('f-proj');
  const fpr=document.getElementById('f-priority');
  const fs=document.getElementById('f-stage');
  const fpv=fp.value,fprv=fpr.value,fsv=fs.value;
  fp.innerHTML='<option value="">Tất cả dự án</option>'+projects.filter(p=>p.status==='open').map(p=>`<option>${p.name}</option>`).join('');
  fpr.innerHTML='<option value="">Tất cả ưu tiên</option>'+catalog.priorities.map(d=>`<option>${d.name}</option>`).join('');
  fs.innerHTML='<option value="">Tất cả trạng thái</option>'+catalog.stages.map(d=>`<option>${d.name}</option>`).join('');
  fp.value=fpv;fpr.value=fprv;fs.value=fsv;
}
function toggleFilter(){filterOpen=!filterOpen;document.getElementById('filter-bar').classList.toggle('open',filterOpen)}
function clearFilters(){
  currentProjFilter = null;
  document.getElementById('f-proj').value = '';
  ['f-search','f-priority','f-stage','f-person'].forEach(id=>document.getElementById(id).value='');
  applyFilters();
  renderSidebarProjects();
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

// ══════════════════════════════
//  RENDER: DASHBOARD
// ══════════════════════════════
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

// ══════════════════════════════
//  RENDER: TASKS
// ══════════════════════════════
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

// ══════════════════════════════
//  RENDER: BOARD
// ══════════════════════════════
let boardTab = 'stage'; // 'stage' | 'member'

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

// ── DRAG & DROP ──
let dragTaskId = null;

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

// ══════════════════════════════
//  RENDER: CALENDAR
// ══════════════════════════════
const MN=['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
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

// ══════════════════════════════
//  RENDER: GANTT
// ══════════════════════════════
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

// ══════════════════════════════
//  RENDER: PLANNER
// ══════════════════════════════
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

// ══════════════════════════════
//  RENDER: REPORT
// ══════════════════════════════
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

// ══════════════════════════════
//  RENDER: SETTINGS
// ══════════════════════════════
function renderSettings(){
  renderCategoryTable('stages');
  renderCategoryTable('priorities');
  renderCategoryTable('positions');
  renderCategoryTable('modules');
  renderCategoryTable('issueTypes');
  renderCategoryTable('issueStatuses');
  renderCategoryTable('confirmStatuses');
  rebuildTaskModalDropdowns();
}
function openSettingsSection(sec){
  if(sec === 'projects') sec = 'stages';
  document.querySelectorAll('.settings-nav-item').forEach(el=>el.classList.toggle('active',el.dataset.sec===sec));
  document.querySelectorAll('.settings-section').forEach(el=>el.classList.toggle('active',el.id==='sec-'+sec));
}
document.querySelectorAll('.settings-nav-item').forEach(el=>{
  el.addEventListener('click',()=>openSettingsSection(el.dataset.sec));
});

// ── CATEGORY TABLE ──
function renderCategoryTable(key){
  const tbody=document.getElementById(key+'-tbody');
  if(!tbody)return;
  if(key==='modules'){
    tbody.innerHTML=catalog.modules.map(item=>`<tr>
      <td><div style="display:flex;align-items:center;gap:8px"><input type="color" value="${item.color}" onchange="updateCatColor('modules','${item.id}',this.value)" style="width:28px;height:28px;padding:2px;border:1px solid var(--border2);border-radius:50%;cursor:pointer"><div class="color-dot" style="background:${item.color}"></div></div></td>
      <td><input value="${item.name}" onchange="updateCat('modules','${item.id}','name',this.value)" style="border:none;background:transparent;font-family:var(--font);font-size:13px;font-weight:600;color:var(--text);width:80px;padding:2px 4px;border-radius:var(--radius);text-transform:uppercase" onfocus="this.style.background='var(--bg2)'" onblur="this.style.background='transparent'" /></td>
      <td><input value="${item.fullName||''}" onchange="updateCat('modules','${item.id}','fullName',this.value)" style="border:none;background:transparent;font-family:var(--font);font-size:12px;color:var(--text2);width:100%;padding:2px 4px;border-radius:var(--radius)" onfocus="this.style.background='var(--bg2)'" onblur="this.style.background='transparent'" placeholder="Tên đầy đủ..." /></td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteCat('modules','${item.id}')">Xóa</button></td>
    </tr>`).join('');
    return;
  }
  tbody.innerHTML=catalog[key].map((item,i)=>`<tr>
    <td><div style="display:flex;align-items:center;gap:8px"><input type="color" value="${item.color}" onchange="updateCatColor('${key}','${item.id}',this.value)" style="width:28px;height:28px;padding:2px;border:1px solid var(--border2);border-radius:50%;cursor:pointer"><div class="color-dot" style="background:${item.color}"></div></div></td>
    <td><input value="${item.name}" onchange="updateCat('${key}','${item.id}','name',this.value)" style="border:none;background:transparent;font-family:var(--font);font-size:13px;color:var(--text);width:140px;padding:2px 4px;border-radius:var(--radius)" onfocus="this.style.background='var(--bg2)'" onblur="this.style.background='transparent'" /></td>
    <td><input value="${item.desc||''}" onchange="updateCat('${key}','${item.id}','desc',this.value)" style="border:none;background:transparent;font-family:var(--font);font-size:12px;color:var(--text2);width:100%;padding:2px 4px;border-radius:var(--radius)" onfocus="this.style.background='var(--bg2)'" onblur="this.style.background='transparent'" placeholder="Mô tả..." /></td>
    <td><button class="btn btn-sm btn-danger" onclick="deleteCat('${key}','${item.id}')">Xóa</button></td>
  </tr>`).join('');
}
function addCategory(key){
  const singular={stages:'stage',priorities:'priority',departments:'department',positions:'position',modules:'module',issueTypes:'issueType',issueStatuses:'issueStatus',confirmStatuses:'confirmStatus'}[key];
  if(!singular){ console.error('Unknown category key:', key); return; }
  const nameIn=document.getElementById(`new-${singular}-name`);
  const colorIn=document.getElementById(`new-${singular}-color`);
  const descIn=document.getElementById(`new-${singular}-desc`);
  if(!nameIn){ console.error('Input not found: new-'+singular+'-name'); return; }
  const name=(nameIn.value||'').trim();
  if(!name){ nameIn.focus(); return; }
  const newItem = {id:key+Date.now(),name,color:colorIn?colorIn.value:'#888',desc:descIn?descIn.value:''};
  if(key==='modules'){
    const fnIn = document.getElementById('new-module-fullname');
    newItem.fullName = fnIn ? fnIn.value.trim() : '';
    if(fnIn) fnIn.value='';
  }
  catalog[key].push(newItem);
  nameIn.value=''; if(descIn) descIn.value='';
  renderCategoryTable(key);
  rebuildFilterDropdowns();
  rebuildTaskModalDropdowns();
  if(key==='positions') rebuildMemberModalDropdowns();
  if(key==='modules'||key==='issueTypes'||key==='issueStatuses'||key==='confirmStatuses') rebuildIssueModalDropdowns();
  renderSidebarProjects();
  scheduleAutoSave();
  toast('Đã thêm!');
}
function updateCat(key,id,field,val){
  const item=catalog[key].find(x=>x.id===id);
  if(item){
    item[field]=val;
    rebuildFilterDropdowns();
    rebuildTaskModalDropdowns();
    if(key==='positions') rebuildMemberModalDropdowns();
  }
}
function updateCatColor(key,id,val){
  const item=catalog[key].find(x=>x.id===id);
  if(item){item.color=val;renderCategoryTable(key);}
}
async function deleteCat(key,id){
  const item=catalog[key].find(x=>x.id===id);if(!item)return;
  const ok=await confirm2('Xóa danh mục',`Bạn có chắc muốn xóa "${item.name}"? Các task đang dùng sẽ không bị ảnh hưởng.`);
  if(!ok)return;
  catalog[key]=catalog[key].filter(x=>x.id!==id);
  renderCategoryTable(key);
  rebuildFilterDropdowns();
  rebuildTaskModalDropdowns();
  if(key==='positions') rebuildMemberModalDropdowns();
  if(key==='modules'||key==='issueTypes'||key==='issueStatuses'||key==='confirmStatuses') rebuildIssueModalDropdowns();
  scheduleAutoSave();
  toast('Đã xóa!');
}

// ── PROJECTS ──
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

// ── BLOCKS (Notion-like notes) ──
function renderBlocks(p){
  return (p.blocks||[]).map(b=>renderBlock(p.id,b)).join('');
}
function renderBlock(projId,b){
  return `<div class="block-row" id="blk-${b.id}">
    <span class="block-handle" title="Kéo để di chuyển">⠿</span>
    <div class="block-content">
      <textarea class="block-text ${b.type}" rows="1" placeholder="${b.type==='text'?'Nhập nội dung...':b.type.replace('heading','Heading ').replace('quote','Trích dẫn...').replace('callout','Callout...')}"
        oninput="autoResize(this);saveBlock('${projId}','${b.id}',this.value)"
        onkeydown="blockKeydown(event,'${projId}','${b.id}')">${b.content||''}</textarea>
    </div>
    <button onclick="deleteBlock('${projId}','${b.id}')" style="background:none;border:none;cursor:pointer;color:var(--text3);padding:2px 4px;border-radius:3px;font-size:14px;opacity:0;transition:opacity .15s" class="blk-del-btn" onmouseenter="this.style.opacity=1" onmouseleave="this.style.opacity=0"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ><path d="M4 4l8 8M12 4l-8 8"/></svg></button>
  </div>`;
}
function addBlock(projId,type){
  const p=projects.find(x=>x.id===projId);if(!p)return;
  if(!p.blocks)p.blocks=[];
  const b={id:'b'+Date.now(),type,content:''};
  p.blocks.push(b);
  const area=document.getElementById('blocks-'+projId);
  const div=document.createElement('div');div.innerHTML=renderBlock(projId,b);
  area.appendChild(div.firstElementChild);
  const ta=area.lastElementChild.querySelector('textarea');
  if(ta){ta.focus();autoResize(ta);}
}
function saveBlock(projId,blockId,val){
  const p=projects.find(x=>x.id===projId);if(!p)return;
  const b=(p.blocks||[]).find(x=>x.id===blockId);
  if(b)b.content=val;
}
function deleteBlock(projId,blockId){
  const p=projects.find(x=>x.id===projId);if(!p)return;
  p.blocks=(p.blocks||[]).filter(x=>x.id!==blockId);
  const el=document.getElementById('blk-'+blockId);if(el)el.remove();
}
function blockKeydown(e,projId,blockId){
  if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();addBlock(projId,'text');}
}
function autoResize(ta){ta.style.height='auto';ta.style.height=ta.scrollHeight+'px';}

// ── PROJECT MODAL ──
let editingProjId=null;
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
    data.id='proj'+projNextId++;data.blocks=[];
    projects.push(data);
    toast('Đã tạo dự án mới!');
  }
    closeProjModal();renderSidebarProjects();rebuildFilterDropdowns();rebuildTaskModalDropdowns();if(document.getElementById('proj-overview-cards')) renderProjOverviewCards();scheduleAutoSave();

}

// ══════════════════════════════
//  DETAIL PANEL (TASK)
// ══════════════════════════════
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

// ══════════════════════════════
//  TASK MODAL
// ══════════════════════════════
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
  } else {data.id=nextTaskId++;tasks.push(data);toast('Đã thêm task!');}
  applyFilters();closeTaskModal();renderSidebarProjects();
  scheduleAutoSave();
  const cur=document.querySelector('.view.active').id.replace('view-','');
  showView(cur);
}

// ══════════════════════════════
//  EXPORT CSV
// ══════════════════════════════
function exportCSV(){
  const hdr=['ID','Tên Task','Dự án','Bộ phận','Trạng thái','Ưu tiên','Phụ trách','Bắt đầu','Deadline','Tiến độ(%)','Giờ','Mô tả'];
  const rows=tasks.map(t=>[t.id,t.name,projName(t.project_id),'',stageName(t.stage_id),priorityName(t.priority_id),memberName(t.assignee_id),t.start,t.due,t.progress,t.hours,t.desc||''].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(','));
  const csv=[hdr.join(','),...rows].join('\n');
  const a=document.createElement('a');
  a.href='data:text/csv;charset=utf-8,\uFEFF'+encodeURIComponent(csv);
  a.download='ProjectHub_Tasks.csv';a.click();toast('Đã xuất CSV!');
}

// ══════════════════════════════
//  EVENTS
// ══════════════════════════════
document.getElementById('modal-ov').addEventListener('click',e=>{if(e.target===document.getElementById('modal-ov'))closeTaskModal();});
document.getElementById('proj-modal-ov').addEventListener('click',e=>{if(e.target===document.getElementById('proj-modal-ov'))closeProjModal();});
document.getElementById('member-modal-ov').addEventListener('click',e=>{if(e.target===document.getElementById('member-modal-ov'))closeMemberModal();});
document.getElementById('issue-modal-ov').addEventListener('click',e=>{if(e.target===document.getElementById('issue-modal-ov'))closeIssueModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeTaskModal();closeProjModal();if(typeof closeMemberModal==='function')closeMemberModal();if(typeof closeIssueModal==='function')closeIssueModal();closeDP();}});




// ══════════════════════════════
//  MEMBERS DATA
// ══════════════════════════════
let members = [];
let memberNextId = 7;
let editingMemberId = null;

function memberInitials(name){
  return name.split(' ').filter(Boolean).map(w=>w[0]).join('').slice(0,2).toUpperCase();
}

// ── RENDER RESOURCE ──
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

// ── MEMBER MODAL ──
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

// ── REBUILD PERSON DROPDOWNS from members ──
function rebuildPersonDropdowns(){
  members.forEach(m=>{ AVATARS[m.name] = {bg:m.color, i:memberInitials(m.name)}; });
  const opts = members.map(m=>`<option value="${m.name}">${m.name}</option>`).join('');
  const sel = document.getElementById('fi-person');
  const fsel = document.getElementById('f-person');
  if(sel){ const v=sel.value; sel.innerHTML=opts; sel.value=v; }
  if(fsel){ const v=fsel.value; fsel.innerHTML='<option value="">Tất cả thành viên</option>'+opts; fsel.value=v; }
}



// ══════════════════════════════
//  ISSUES DATA & FUNCTIONS
// ══════════════════════════════
let issues = [];
let issueNextId = 4;
let editingIssueId = null;
let issueProjectFilter = '';

const ISSUE_STATUS = {
  open:       {label:'🔴 Mở',       color:'#ef4444', bg:'#fef2f2'},
  inprogress: {label:'🟡 Đang xử lý',color:'#f97316', bg:'#fff7ed'},
  resolved:   {label:'🟢 Đã giải quyết',color:'#16a34a',bg:'#f0fdf4'},
  closed:     {label:'Đã đóng',  color:'#64748b', bg:'#f8fafc'},
};
const ISSUE_TYPE = {
  bug:     {label:'🐛 Lỗi',              color:'#ef4444',bg:'#fef2f2'},
  request: {label:'📋 Yêu cầu bổ sung', color:'#7c3aed',bg:'#faf5ff'},
};

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
function projShort(projId){
  const p=projects.find(x=>x.id===projId);
  return p?(p.short||p.code?.split('-')[0]||'—'):'—';
}
function projShortName(projName){
  const p=projects.find(x=>x.name===projName);
  return p?p.short:p.code
}
function projCode(projName){
  const p=projects.find(x=>x.name===projName);
  return p?p.code:p.short
}
function projColorFor(projId){
  return projColor(projId);
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

// ── ISSUE MODAL ──
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



// ══════════════════════════════
//  ISSUE → TASK LINK
// ══════════════════════════════
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
      id: nextTaskId++,
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


function projLogoEl(p, size=28) {
  if(p.logo) {
    return `<img src="${p.logo}" style="width:${size}px;height:${size}px;object-fit:contain;border-radius:6px;border:1px solid var(--border)" onerror="this.style.display='none';this.nextSibling.style.display='flex'" /><div style="display:none;width:${size}px;height:${size}px;border-radius:6px;background:${p.color};align-items:center;justify-content:center;font-size:${Math.floor(size*0.38)}px;font-weight:700;color:#fff">${p.short||p.name.slice(0,2).toUpperCase()}</div>`;
  }
  return `<div style="width:${size}px;height:${size}px;border-radius:6px;background:${p.color};display:flex;align-items:center;justify-content:center;font-size:${Math.floor(size*0.38)}px;font-weight:700;color:#fff;flex-shrink:0">${p.short||p.name.slice(0,2).toUpperCase()}</div>`;
}


// ╔══════════════════════════════════════════════════════╗
// ║         GOOGLE SHEETS INTEGRATION                   ║
// ╚══════════════════════════════════════════════════════╝

// ▶ DÁN URL APPS SCRIPT CỦA BẠN VÀO ĐÂY
// GAS_URL defined in index.html

let gsReady = false;   // đã load từ Sheets xong chưa
let gsSaving = false;  // đang save không
let gsSaveQueue = null; // debounce save

// ── Hiển thị trạng thái sync ──

function hideLoadingScreen(msg) {
  const el = document.getElementById('loading-screen');
  if (!el || el.style.display === 'none') return;
  const msgEl = document.getElementById('loading-msg');
  if (msg && msgEl && !msg.includes('Lỗi') && !msg.includes('Chưa')) {
    msgEl.textContent = msg;
  }
  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => { el.style.display = 'none'; }, 350);
  }, 200);
}

function showSyncStatus(status, msg) {
  let el = document.getElementById('sync-status');
  if (!el) return;
  const icons = { loading: '⟳', saving: '↑', saved: '✓', error: '✕', offline: '○' };
  const colors = { loading:'#888', saving:'#2383e2', saved:'#0f7b6c', error:'#e03e3e', offline:'#888' };
  el.innerHTML = `<span style="color:${colors[status]}">${icons[status]}</span> ${msg}`;
}

// ── Load tất cả data từ Sheets ──
async function loadFromSheets() {
  if (!GAS_URL || GAS_URL.includes('YOUR_DEPLOYMENT_ID')) {
    showSyncStatus('offline', 'Chế độ offline — chưa kết nối Sheets');
    return false;
  }
  showSyncStatus('loading', '↓ Đang tải từ Sheets...');
  try {
    document.getElementById('loading-msg')?.textContent && (document.getElementById('loading-msg').textContent = 'Đang lấy dữ liệu');
    const res = await fetch(GAS_URL + '?all=true', {
      redirect: 'follow',
      mode: 'cors',
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    if (!json.ok) throw new Error(json.error);
    const d = json.data;

    // Áp dụng dữ liệu nếu có
    projects = d.projects || [];
    tasks = (d.tasks||[]).map(t=>({...t, id:Number(t.id)||t.id, progress:Number(t.progress)||0, hours:Number(t.hours)||8}));
    filteredTasks = [...tasks];
    issues = (d.issues||[]).map(i=>({...i, id:String(i.id)}));
    members = d.members || [];

    // Catalogs
    if (d.stages           && d.stages.length)           catalog.stages = d.stages;
    if (d.priorities       && d.priorities.length)       catalog.priorities = d.priorities;
    if (d.positions        && d.positions.length)        catalog.positions = d.positions;
    if (d.modules          && d.modules.length)          catalog.modules = d.modules;
    if (d.issueTypes       && d.issueTypes.length)       catalog.issueTypes = d.issueTypes;
    if (d.issueStatuses    && d.issueStatuses.length)    catalog.issueStatuses = d.issueStatuses;
    if (d.confirmStatuses  && d.confirmStatuses.length)  catalog.confirmStatuses = d.confirmStatuses;

    // Cập nhật nextId
    if (tasks.length)   nextTaskId = Math.max(...tasks.map(t=>Number(t.id)||0)) + 1;
    if (issues.length)  issueNextId = Math.max(...issues.map(x=>Number(String(x.id).replace(/\D/g,''))||0)) + 1;
    if (members.length) memberNextId = Math.max(...members.map(x=>Number(String(x.id).replace(/\D/g,''))||0)) + 1;
    if (projects.length) projNextId = Math.max(...projects.map(x=>Number(String(x.id).replace(/\D/g,''))||0)) + 1;

    gsReady = true;
    showSyncStatus('saved', `Đồng bộ lúc ${new Date().toLocaleTimeString('vi-VN')}`);
    hideLoadingScreen('Đã tải xong!');

    // Re-render
    rebuildFilterDropdowns();
    rebuildTaskModalDropdowns();
    rebuildPersonDropdowns();
    renderSidebarProjects();
    const cur = document.querySelector('.view.active');
    if (cur) {
      const nm = cur.id.replace('view-','');
      const renders = {dashboard:renderDashboard,tasks:renderTasks,board:renderBoard,
        calendar:renderCalendar,gantt:renderGantt,planner:renderPlanner,
        report:renderReport,resource:renderResource,projects:renderProjectsOverview};
      if (renders[nm]) renders[nm]();
    }
    return true;
  } catch(err) {
    console.error('Sheets load error:', err);
    const errMsg = err.message || 'Lỗi không xác định';
    console.error('loadFromSheets error:', errMsg);
    const _lmErr=document.getElementById('loading-msg');
    if(_lmErr) _lmErr.innerHTML='<span style="color:#e03e3e;font-size:13px">⚠ Lỗi kết nối Sheets</span><br><span style="font-size:11.5px;color:rgba(55,53,47,0.45);margin-top:4px;display:block">'+errMsg+'</span>';
    showSyncStatus('error', 'Lỗi: ' + errMsg);
    return false;
  }
}

// ── Lưu 1 sheet cụ thể ──
async function saveSheet(sheetKey, data) {
  if (!GAS_URL || GAS_URL.includes('YOUR_DEPLOYMENT_ID')) return;
  try {
    await fetch(GAS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'save', sheet: sheetKey, rows: data }),
    });
  } catch(err) {
    console.error('Save error:', err, sheetKey);
  }
}

// ── Lưu tất cả data (debounced) ──
function scheduleAutoSave() {
  if (gsSaveQueue) clearTimeout(gsSaveQueue);
  showSyncStatus('saving', '↑ Đang lưu lên Sheets...');
  gsSaveQueue = setTimeout(async () => {
    if (!GAS_URL || GAS_URL.includes('YOUR_DEPLOYMENT_ID')) return;
    gsSaving = true;
    try {
      const payload = encodeURIComponent(JSON.stringify({
        projects, tasks, issues, members,
        stages: catalog.stages,
        priorities: catalog.priorities,
        positions: catalog.positions,
        modules: catalog.modules,
        issueTypes: catalog.issueTypes,
        issueStatuses: catalog.issueStatuses,
        confirmStatuses: catalog.confirmStatuses,
      }));
      const _res = await fetch(GAS_URL + '?action=saveAll&data=' + payload);
      const _json = await _res.json();
      console.log('AutoSave result:', _json);
      if(_json && _json.ok){
        lastSyncHash = dataHash({tasks, projects, issues, members});
        showSyncStatus('saved', `Đã lưu lúc ${new Date().toLocaleTimeString('vi-VN')}`);
      } else {
        console.error('Save failed:', _json);
        showSyncStatus('error', 'Lỗi lưu: ' + (_json&&_json.error||'unknown'));
      }
    } catch(err) {
      console.error('AutoSave error:', err);
      showSyncStatus('error', 'Lỗi lưu dữ liệu!');
    }
    gsSaving = false;
  }, 1500);
}

// ── Lưu thủ công (nút Sync) ──
async function manualSave() {
  if (gsSaveQueue) clearTimeout(gsSaveQueue);
  showSyncStatus('saving', '↑ Đang lưu lên Sheets...');
  gsSaving = true;
  try {
    const payload = encodeURIComponent(JSON.stringify({
      projects, tasks, issues, members,
      stages: catalog.stages,
      priorities: catalog.priorities,
      positions: catalog.positions,
      modules: catalog.modules,
      issueTypes: catalog.issueTypes,
      issueStatuses: catalog.issueStatuses,
      confirmStatuses: catalog.confirmStatuses,
    }));
    const _res = await fetch(GAS_URL + '?action=saveAll&data=' + payload);
    const _json = await _res.json();
    console.log('ManualSave result:', _json);
    if(_json && _json.ok){
      lastSyncHash = dataHash({tasks, projects, issues, members});
      toast('Đã lưu lên Google Sheets!');
      showSyncStatus('saved', `Đã lưu lúc ${new Date().toLocaleTimeString('vi-VN')}`);
    } else {
      showSyncStatus('error', 'Lỗi: ' + (_json&&_json.error||'unknown'));
    }
  } catch(err) {
    console.error('ManualSave error:', err);
    showSyncStatus('error', 'Lỗi kết nối!');
  }
  gsSaving = false;
}

// ══════════════════════════════════════════════════
//  SYNC 2 CHIỀU: POLLING từ Google Sheets
// ══════════════════════════════════════════════════
let pollInterval = null;
let lastSyncHash = '';   // hash để phát hiện thay đổi
let isSyncing = false;   // đang sync không

// Tạo hash đơn giản từ data để so sánh
function dataHash(data) {
  const str = JSON.stringify({
    tasks: data.tasks ? data.tasks.length : 0,
    projects: data.projects ? data.projects.length : 0,
    issues: data.issues ? data.issues.length : 0,
    members: data.members ? data.members.length : 0,
    tasksMod: data.tasks ? data.tasks.map(t=>t.progress+''+t.stage_id).join('') : '',
  });
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return String(h);
}

// Poll Sheets xem có thay đổi không
async function pollFromSheets(silent = true) {
  if (!GAS_URL || GAS_URL.includes('YOUR_DEPLOYMENT_ID')) return;
  if (isSyncing || gsSaving) return; // đang save thì không poll
  isSyncing = true;
  try {
    const res = await fetch(GAS_URL + '?all=true&t=' + Date.now(), {
      redirect: 'follow',
      mode: 'cors',
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    if (!json.ok) throw new Error(json.error);
    const d = json.data;

    // So sánh hash — chỉ cập nhật nếu data thực sự thay đổi
    const newHash = dataHash(d);
    if (newHash === lastSyncHash) {
      if (!silent) {
        showSyncStatus('saved', `Đã đồng bộ lúc ${new Date().toLocaleTimeString('vi-VN')}`);
        toast('Dữ liệu đã cập nhật mới nhất!');
      }
      isSyncing = false;
      return; // không có gì mới
    }

    // Có thay đổi → cập nhật
    lastSyncHash = newHash;

    projects = d.projects || [];
    tasks = (d.tasks||[]).map(t=>({...t, id:Number(t.id)||t.id, progress:Number(t.progress)||0, hours:Number(t.hours)||8}));
    filteredTasks = [...tasks];
    issues = (d.issues||[]).map(i=>({...i, id:String(i.id)}));
    members = d.members || [];
    if (d.stages     && d.stages.length)     catalog.stages = d.stages;
    if (d.priorities && d.priorities.length) catalog.priorities = d.priorities;
    if (d.positions  && d.positions.length)  catalog.positions = d.positions;
    if (d.modules    && d.modules.length)    catalog.modules = d.modules;
    if (d.issueTypes && d.issueTypes.length) catalog.issueTypes = d.issueTypes;
    if (d.issueStatuses   && d.issueStatuses.length)   catalog.issueStatuses = d.issueStatuses;
    if (d.confirmStatuses && d.confirmStatuses.length)  catalog.confirmStatuses = d.confirmStatuses;

    // Re-render view hiện tại
    rebuildFilterDropdowns();
    rebuildTaskModalDropdowns();
    rebuildPersonDropdowns();
    renderSidebarProjects();
    const cur = document.querySelector('.view.active');
    if (cur) {
      const nm = cur.id.replace('view-', '');
      const renders = {
        dashboard: renderDashboard, tasks: renderTasks, board: renderBoard,
        calendar: renderCalendar, gantt: renderGantt, planner: renderPlanner,
        report: renderReport, resource: renderResource, projects: renderProjectsOverview,
        issues: renderIssues, settings: renderSettings,
      };
      if (renders[nm]) renders[nm]();
    }

    showSyncStatus('saved', `↓ Đã nhận dữ liệu mới lúc ${new Date().toLocaleTimeString('vi-VN')}`);
    if (!silent) toast('Đã đồng bộ dữ liệu mới từ Sheets!');

  } catch(err) {
    if (!silent) showSyncStatus('error', 'Lỗi kết nối Sheets');
  }
  isSyncing = false;
}

// Bắt đầu auto-poll mỗi 30 giây
function startPolling(intervalSec = 30) {
  if (pollInterval) clearInterval(pollInterval);
  pollInterval = setInterval(() => pollFromSheets(true), intervalSec * 1000);
  console.log('Auto-poll Sheets mỗi', intervalSec, 'giây');
}

// Dừng polling (khi tab không active thì nghỉ để tiết kiệm quota)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearInterval(pollInterval);
  } else {
    // Tab active trở lại → poll ngay + khởi động lại
    pollFromSheets(true);
    startPolling(30);
  }
});


// ══════════════════════════════════════════════════
//  MOBILE SIDEBAR TOGGLE
// ══════════════════════════════════════════════════
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebar-overlay');
  if(!sb) return;
  const isOpen = sb.classList.contains('sidebar-open');
  if (isOpen) {
    closeSidebar();
  } else {
    sb.classList.add('sidebar-open');
    ov.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebar-overlay');
  if(sb) sb.classList.remove('sidebar-open');
  if(ov) ov.style.display = 'none';
  document.body.style.overflow = '';
}

// Đóng sidebar khi click nav item (mobile)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeSidebar();
    });
  });
});

// Đóng sidebar khi resize về desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeSidebar();
});

// ══════════════════════════════
//  INIT
// ══════════════════════════════

// Chạy các hàm không cần data trước
rebuildFilterDropdowns();
rebuildTaskModalDropdowns();
rebuildPersonDropdowns();

// Luôn load từ Sheets trước khi hiện app
(async function init() {
  if (GAS_URL && !GAS_URL.includes('YOUR_DEPLOYMENT_ID')) {
    // Có GAS_URL → load từ Sheets, chờ xong mới render
    const loaded = await loadFromSheets();
    if (loaded) {
      lastSyncHash = dataHash({tasks, projects, issues, members});
      startPolling(30);
    } else {
      // Lỗi kết nối → hiện thông báo 2 giây rồi vào app
      await new Promise(r => setTimeout(r, 2000));
      hideLoadingScreen();
    }
  } else {
    // Chưa cấu hình GAS_URL → vào app ngay
    showSyncStatus('offline', 'Chưa kết nối Google Sheets');
    hideLoadingScreen('Chưa cấu hình Google Sheets');
  }

  // Render sau khi có data
  renderSidebarProjects();
  renderDashboard();
})();
