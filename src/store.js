/**
 * store.js — Centralized State Management
 * Dùng Object.defineProperty để wrap global vars thành store-backed.
 * Code cũ (tasks, projects...) vẫn hoạt động bình thường.
 */

(function() {

// ── Internal store ────────────────────────────────
const _store = {
  projects: [], tasks: [], filteredTasks: [],
  issues: [], members: [], catalog: {},
  currentView: 'dashboard',
  currentProjFilter: null, issueProjectFilter: null,
  boardTab: 'stage', projOverviewTab: 'open',
  filterOpen: false, sbProjOpen: true,
  editingTaskId: null, detailTaskId: null,
  editingProjId: null, editingMemberId: null,
  editingIssueId: null, dragTaskId: null,
  gsReady: false, gsSaving: false, gsSaveQueue: null,
  lastSyncHash: '', isSyncing: false, pollInterval: null,
};

// ── Subscribers ───────────────────────────────────
const _subscribers = {};

function subscribe(key, cb) {
  if (!_subscribers[key]) _subscribers[key] = [];
  _subscribers[key].push(cb);
  return function() {
    _subscribers[key] = _subscribers[key].filter(function(f) { return f !== cb; });
  };
}

function notify(key, val) {
  (_subscribers[key] || []).forEach(function(cb) {
    try { cb(val); } catch(e) { console.error('[Store] subscriber error [' + key + ']:', e); }
  });
  (_subscribers['*'] || []).forEach(function(cb) {
    try { cb({ key: key, val: val }); } catch(e) {}
  });
}

function getState(key) {
  return key ? _store[key] : Object.assign({}, _store);
}

function setState(key, val) {
  _store[key] = Array.isArray(val) ? val.slice() : val;
  notify(key, _store[key]);
  return _store[key];
}

// ── Bind global vars to store ─────────────────────
const TRACKED_VARS = [
  'projects', 'tasks', 'filteredTasks', 'issues', 'members', 'catalog',
  'currentProjFilter', 'issueProjectFilter', 'boardTab', 'projOverviewTab',
  'filterOpen', 'sbProjOpen',
  'editingTaskId', 'detailTaskId', 'editingProjId', 'editingMemberId',
  'editingIssueId', 'dragTaskId',
  'gsReady', 'gsSaving', 'gsSaveQueue', 'lastSyncHash', 'isSyncing', 'pollInterval',
];

function bindGlobals() {
  TRACKED_VARS.forEach(function(key) {
    // Lấy giá trị hiện tại từ window nếu có
    if (key in window && window[key] !== undefined) {
      _store[key] = window[key];
    }
    try {
      Object.defineProperty(window, key, {
        get: function() { return _store[key]; },
        set: function(val) {
          _store[key] = Array.isArray(val) ? val.slice() : val;
          notify(key, _store[key]);
        },
        configurable: true,
        enumerable: true,
      });
    } catch(e) {
      // const vars không defineProperty được - bỏ qua
    }
  });
  console.log('[Store] Bound', TRACKED_VARS.length, 'vars to store ✅');
}

function debug() {
  console.group('[Store] Current State');
  console.log('projects:', _store.projects.length);
  console.log('tasks:', _store.tasks.length);
  console.log('issues:', _store.issues.length);
  console.log('members:', _store.members.length);
  console.log('view:', _store.currentView);
  console.groupEnd();
}

// Expose to window
window.__store__ = {
  getState: getState,
  setState: setState,
  subscribe: subscribe,
  bindGlobals: bindGlobals,
  debug: debug,
  _store: _store,
};

console.log('[Store] Ready ✅');

})();
