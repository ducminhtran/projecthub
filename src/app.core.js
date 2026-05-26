
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


let projOverviewTab = 'open';


// ── PROJECTS OVERVIEW PAGE ──


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

// ══════════════════════════════
//  RENDER: DASHBOARD
// ══════════════════════════════

// ══════════════════════════════
//  RENDER: TASKS
// ══════════════════════════════

// ══════════════════════════════
//  RENDER: BOARD
// ══════════════════════════════
let boardTab = 'stage'; // 'stage' | 'member'


// ── DRAG & DROP ──
let dragTaskId = null;


// ══════════════════════════════
//  RENDER: CALENDAR
// ══════════════════════════════
const MN=['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];

// ══════════════════════════════
//  RENDER: GANTT
// ══════════════════════════════

// ══════════════════════════════
//  RENDER: PLANNER
// ══════════════════════════════

// ══════════════════════════════
//  RENDER: REPORT
// ══════════════════════════════

// ══════════════════════════════
//  RENDER: SETTINGS
// ══════════════════════════════
document.querySelectorAll('.settings-nav-item').forEach(el=>{
  el.addEventListener('click',()=>openSettingsSection(el.dataset.sec));
});

// ── CATEGORY TABLE ──

// ── PROJECTS ──


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

// ══════════════════════════════
//  DETAIL PANEL (TASK)
// ══════════════════════════════

// ══════════════════════════════
//  TASK MODAL
// ══════════════════════════════

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


// ── RENDER RESOURCE ──

// ── MEMBER MODAL ──

// ── REBUILD PERSON DROPDOWNS from members ──


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

function projShortName(projName){
  const p=projects.find(x=>x.name===projName);
  return p?p.short:p.code
}


// ── ISSUE MODAL ──


// ══════════════════════════════
//  ISSUE → TASK LINK
// ══════════════════════════════


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
