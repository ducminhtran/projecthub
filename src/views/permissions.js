// ── PERMISSIONS VIEW ──
// Phân quyền theo Vị trí × Chức năng × Thao tác
// Lưu trong catalog.positions[].permissions (JSON)
// Hoàn toàn config qua UI, không fix cứng trong code

// ── Định nghĩa chức năng & thao tác ──────────────
const FEATURES = [
  { id: 'dashboard', name: 'Tổng quan',         icon: '◻' },
  { id: 'tasks',     name: 'Task Manager',       icon: '◻' },
  { id: 'issues',    name: 'Issue Manager',      icon: '◻' },
  { id: 'board',     name: 'Display Board',      icon: '◻' },
  { id: 'calendar',  name: 'Calendar',           icon: '◻' },
  { id: 'gantt',     name: 'Gantt Chart',        icon: '◻' },
  { id: 'planner',   name: 'Daily Planner',      icon: '◻' },
  { id: 'report',    name: 'Report',             icon: '◻' },
  { id: 'projects',  name: 'Quản lý dự án',      icon: '◻' },
  { id: 'members',   name: 'Thành viên',         icon: '◻' },
  { id: 'settings',  name: 'Cài đặt',           icon: '◻' },
];

const ACTIONS = [
  { id: 'view',   name: 'Xem',        color: '#0f7b6c' },
  { id: 'create', name: 'Thêm mới',   color: '#2383e2' },
  { id: 'edit',   name: 'Chỉnh sửa', color: '#d9730d' },
  { id: 'delete', name: 'Xóa',        color: '#e03e3e' },
  { id: 'export', name: 'Xuất',       color: '#6940a5' },
  { id: 'import', name: 'Nhập',       color: '#e03e3e' },
];

// ── Get/Set permissions cho 1 position ───────────
function getPermissions(position) {
  try {
    if (!position.permissions) return {};
    if (typeof position.permissions === 'object') return position.permissions;
    return JSON.parse(position.permissions);
  } catch(e) { return {}; }
}

function hasPermission(position, feature, action) {
  const perms = getPermissions(position);
  return !!(perms[feature] && perms[feature][action]);
}

function setPermission(positionId, feature, action, value) {
  const pos = catalog.positions.find(p => p.id === positionId);
  if (!pos) return;
  const perms = getPermissions(pos);
  if (!perms[feature]) perms[feature] = {};
  perms[feature][action] = value;
  pos.permissions = perms;
  scheduleAutoSave();
}

function setFeatureAll(positionId, feature, value) {
  ACTIONS.forEach(a => setPermission(positionId, feature, a.id, value));
}

function setActionAll(positionId, action, value) {
  FEATURES.forEach(f => setPermission(positionId, f.id, action, value));
}

function setAll(positionId, value) {
  FEATURES.forEach(f => ACTIONS.forEach(a => setPermission(positionId, f.id, a.id, value)));
}

// ── Copy permissions từ position này sang position khác ──
function copyPermissions(fromId, toId) {
  const from = catalog.positions.find(p => p.id === fromId);
  const to   = catalog.positions.find(p => p.id === toId);
  if (!from || !to) return;
  to.permissions = JSON.parse(JSON.stringify(getPermissions(from)));
  renderPermissions();
  scheduleAutoSave();
  toast('Đã sao chép quyền!');
}

// ── Render ────────────────────────────────────────
function renderPermissions() {
  const el = document.getElementById('sec-permissions');
  if (!el) return;

  const positions = catalog.positions;
  if (!positions.length) {
    el.querySelector('#perm-content').innerHTML =
      '<div style="color:var(--text3);font-size:13px;padding:20px 0">Chưa có vị trí nào. Thêm vị trí trong mục <b>Vị trí</b> trước.</div>';
    return;
  }

  el.querySelector('#perm-content').innerHTML = positions.map(pos => renderPositionMatrix(pos)).join('');
}

function renderPositionMatrix(pos) {
  const perms = getPermissions(pos);
  const posColor = pos.color || '#888';

  // Header actions row
  const actionHeaders = ACTIONS.map(a =>
    `<th style="padding:6px 8px;text-align:center;font-size:10px;font-weight:600;
      color:${a.color};text-transform:uppercase;letter-spacing:.04em;min-width:64px;
      white-space:nowrap">
      ${a.name}
    </th>`
  ).join('');

  // Feature rows
  const featureRows = FEATURES.map(f => {
    const allChecked = ACTIONS.every(a => perms[f.id]?.[a.id]);
    const anyChecked = ACTIONS.some(a => perms[f.id]?.[a.id]);

    const checkboxes = ACTIONS.map(a => {
      const checked = !!(perms[f.id]?.[a.id]);
      return `<td style="padding:6px 8px;text-align:center">
        <input type="checkbox"
          ${checked ? 'checked' : ''}
          onchange="setPermission('${pos.id}','${f.id}','${a.id}',this.checked)"
          style="width:15px;height:15px;cursor:pointer;accent-color:${a.color}"
          title="${pos.name} — ${f.name} — ${a.name}"/>
      </td>`;
    }).join('');

    return `<tr onmouseenter="this.style.background='var(--bg2)'" onmouseleave="this.style.background=''">
      <td style="padding:7px 12px;font-size:13px;color:var(--text2);white-space:nowrap">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
          <input type="checkbox"
            ${allChecked ? 'checked' : ''}
            ${anyChecked && !allChecked ? 'indeterminate-style' : ''}
            onchange="setFeatureAll('${pos.id}','${f.id}',this.checked);renderPermissions()"
            style="width:14px;height:14px;cursor:pointer;accent-color:var(--accent)"
            title="Chọn tất cả — ${f.name}"/>
          ${f.name}
        </label>
      </td>
      ${checkboxes}
    </tr>`;
  }).join('');

  return `<div style="margin-bottom:28px">
    <!-- Position header -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="display:flex;align-items:center;gap:9px">
        <div style="width:10px;height:10px;border-radius:50%;background:${posColor};flex-shrink:0"></div>
        <span style="font-size:14px;font-weight:600;color:var(--text)">${pos.name}</span>
        <span style="font-size:11px;color:var(--text3)">${pos.desc || ''}</span>
      </div>
      <div style="display:flex;gap:6px">
        <button class="btn btn-sm" onclick="setAll('${pos.id}',true);renderPermissions()"
          style="font-size:11.5px">Chọn tất cả</button>
        <button class="btn btn-sm" onclick="setAll('${pos.id}',false);renderPermissions()"
          style="font-size:11.5px">Bỏ tất cả</button>
        <select class="fi" onchange="if(this.value){copyPermissions(this.value,'${pos.id}');this.value=''}"
          style="font-size:11.5px;padding:3px 7px" title="Sao chép quyền từ vị trí khác">
          <option value="">Sao chép từ...</option>
          ${catalog.positions.filter(p=>p.id!==pos.id).map(p=>
            `<option value="${p.id}">${p.name}</option>`
          ).join('')}
        </select>
      </div>
    </div>

    <!-- Matrix table -->
    <div style="overflow-x:auto;border:1px solid var(--border);border-radius:8px;background:var(--bg)">
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="background:var(--bg2);border-bottom:1px solid var(--border)">
            <th style="padding:7px 12px;text-align:left;font-size:10.5px;font-weight:600;
              color:var(--text3);text-transform:uppercase;letter-spacing:.04em;min-width:160px">
              Chức năng
            </th>
            ${actionHeaders}
          </tr>
        </thead>
        <tbody style="border-top:none">
          ${featureRows}
        </tbody>
      </table>
    </div>
  </div>`;
}

// ── Check permission cho current user ────────────
// Gọi từ các view để kiểm tra quyền
function can(feature, action) {
  try {
    const session = JSON.parse(localStorage.getItem('ph_session') || '{}');
    if (!session.permissions) return true; // dev mode
    if (session.permissions.all) return true; // admin all
    return !!(session.permissions[feature]?.[action]);
  } catch(e) { return true; }
}

// Guard UI elements dựa trên quyền
function applyPermissionGuards() {
  // Ẩn nút xóa nếu không có quyền delete
  document.querySelectorAll('[data-perm]').forEach(el => {
    const [feature, action] = el.dataset.perm.split(':');
    el.style.display = can(feature, action) ? '' : 'none';
  });
}
