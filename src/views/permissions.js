// ── PERMISSIONS VIEW ──
// Wrap trong block để tránh conflict biến toàn cục

{
const _FEATURES = [
  { id: 'dashboard', name: 'Tổng quan' },
  { id: 'tasks',     name: 'Task Manager' },
  { id: 'issues',    name: 'Issue Manager' },
  { id: 'board',     name: 'Display Board' },
  { id: 'calendar',  name: 'Calendar' },
  { id: 'gantt',     name: 'Gantt Chart' },
  { id: 'planner',   name: 'Daily Planner' },
  { id: 'report',    name: 'Report' },
  { id: 'projects',  name: 'Quản lý dự án' },
  { id: 'members',   name: 'Thành viên' },
  { id: 'settings',  name: 'Cài đặt' },
];

const _ACTIONS = [
  { id: 'view',   name: 'Xem',         color: '#0f7b6c' },
  { id: 'create', name: 'Thêm mới',    color: '#2383e2' },
  { id: 'edit',   name: 'Chỉnh sửa',  color: '#d9730d' },
  { id: 'delete', name: 'Xóa',         color: '#e03e3e' },
  { id: 'export', name: 'Xuất',        color: '#6940a5' },
  { id: 'import', name: 'Nhập',        color: '#e03e3e' },
];

function _getPermissions(position) {
  try {
    if (!position.permissions) return {};
    if (typeof position.permissions === 'object') return position.permissions;
    return JSON.parse(position.permissions);
  } catch(e) { return {}; }
}

// Expose ra global
window.setPermission = function(positionId, feature, action, value) {
  const pos = catalog.positions.find(p => p.id === positionId);
  if (!pos) return;
  const perms = _getPermissions(pos);
  if (!perms[feature]) perms[feature] = {};
  perms[feature][action] = value;
  pos.permissions = perms;
  scheduleAutoSave();
};

window.setFeatureAll = function(positionId, feature, value) {
  _ACTIONS.forEach(a => window.setPermission(positionId, feature, a.id, value));
};

window.setActionAll = function(positionId, action, value) {
  _FEATURES.forEach(f => window.setPermission(positionId, f.id, action, value));
};

window.setAll = function(positionId, value) {
  _FEATURES.forEach(f => _ACTIONS.forEach(a => window.setPermission(positionId, f.id, a.id, value)));
};

window.copyPermissions = function(fromId, toId) {
  const from = catalog.positions.find(p => p.id === fromId);
  const to   = catalog.positions.find(p => p.id === toId);
  if (!from || !to) return;
  to.permissions = JSON.parse(JSON.stringify(_getPermissions(from)));
  window.renderPermissions();
  scheduleAutoSave();
  toast('Đã sao chép quyền!');
};

window.renderPermissions = function() {
  const el = document.getElementById('perm-content');
  if (!el) return;

  const positions = catalog.positions;
  if (!positions.length) {
    el.innerHTML = '<div style="color:var(--text3);font-size:13px;padding:20px 0">Chưa có vị trí nào. Thêm vị trí trong mục <b>Vị trí</b> trước.</div>';
    return;
  }
  el.innerHTML = positions.map(pos => _renderMatrix(pos)).join('');
};

function _renderMatrix(pos) {
  const perms    = _getPermissions(pos);
  const posColor = pos.color || '#888';

  const actionHeaders = _ACTIONS.map(a =>
    `<th style="padding:6px 8px;text-align:center;font-size:10px;font-weight:600;color:${a.color};text-transform:uppercase;letter-spacing:.04em;min-width:68px;white-space:nowrap">${a.name}</th>`
  ).join('');

  const featureRows = _FEATURES.map(f => {
    const allChecked = _ACTIONS.every(a => perms[f.id]?.[a.id]);
    const checkboxes = _ACTIONS.map(a => {
      const checked = !!(perms[f.id]?.[a.id]);
      return `<td style="padding:6px 8px;text-align:center">
        <input type="checkbox" ${checked?'checked':''}
          onchange="setPermission('${pos.id}','${f.id}','${a.id}',this.checked)"
          style="width:15px;height:15px;cursor:pointer;accent-color:${a.color}"/>
      </td>`;
    }).join('');

    return `<tr onmouseenter="this.style.background='var(--bg2)'" onmouseleave="this.style.background=''">
      <td style="padding:7px 12px;font-size:13px;color:var(--text2);white-space:nowrap">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
          <input type="checkbox" ${allChecked?'checked':''}
            onchange="setFeatureAll('${pos.id}','${f.id}',this.checked);renderPermissions()"
            style="width:14px;height:14px;cursor:pointer;accent-color:var(--accent)"/>
          ${f.name}
        </label>
      </td>
      ${checkboxes}
    </tr>`;
  }).join('');

  return `<div style="margin-bottom:28px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="display:flex;align-items:center;gap:9px">
        <div style="width:10px;height:10px;border-radius:50%;background:${posColor};flex-shrink:0"></div>
        <span style="font-size:14px;font-weight:600">${pos.name}</span>
        <span style="font-size:11px;color:var(--text3)">${pos.desc||''}</span>
      </div>
      <div style="display:flex;gap:6px">
        <button class="btn btn-sm" onclick="setAll('${pos.id}',true);renderPermissions()" style="font-size:11.5px">Chọn tất cả</button>
        <button class="btn btn-sm" onclick="setAll('${pos.id}',false);renderPermissions()" style="font-size:11.5px">Bỏ tất cả</button>
        <select class="fi" onchange="if(this.value){copyPermissions(this.value,'${pos.id}');this.value=''}" style="font-size:11.5px;padding:3px 7px">
          <option value="">Sao chép từ...</option>
          ${catalog.positions.filter(p=>p.id!==pos.id).map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}
        </select>
      </div>
    </div>
    <div style="overflow-x:auto;border:1px solid var(--border);border-radius:8px;background:var(--bg)">
      <table style="width:100%;border-collapse:collapse">
        <thead><tr style="background:var(--bg2);border-bottom:1px solid var(--border)">
          <th style="padding:7px 12px;text-align:left;font-size:10.5px;font-weight:600;color:var(--text3);text-transform:uppercase;min-width:160px">Chức năng</th>
          ${actionHeaders}
        </tr></thead>
        <tbody>${featureRows}</tbody>
      </table>
    </div>
  </div>`;
}

window.can = function(feature, action) {
  try {
    const s = JSON.parse(localStorage.getItem('ph_session')||'{}');
    if (!s.permissions) return true;
    if (s.permissions.all) return true;
    return !!(s.permissions[feature]?.[action]);
  } catch(e) { return true; }
};

} // end block
