/**
 * router.js — Clean URL Router với obfuscated paths
 *
 * URL thật:    /e973  (không ai biết là "tasks")
 * Nội bộ:     showView('tasks')
 *
 * Cần file _redirects ở root:
 *   /*  /index.html  200
 */

(function() {

// ── Route maps (hash ↔ view) ──────────────────────
// Generated từ MD5(salt + routeName)[:4] — cố định, không đổi
const ROUTE_TO_HASH = {
  'dashboard': 'c064',
  'tasks':     'e973',
  'issues':    'ed4a',
  'board':     '89a5',
  'calendar':  '60f3',
  'gantt':     '0751',
  'planner':   'c520',
  'report':    'fdbb',
  'projects':  '0440',
  'resource':  '6a1b',
  'settings':  'e5ac',
};

const HASH_TO_ROUTE = {};
Object.keys(ROUTE_TO_HASH).forEach(function(route) {
  HASH_TO_ROUTE[ROUTE_TO_HASH[route]] = route;
});

const TITLES = {
  'dashboard': 'Tổng quan',
  'tasks':     'Task Manager',
  'issues':    'Issue Manager',
  'board':     'Display Board',
  'calendar':  'Calendar',
  'gantt':     'Gantt Chart',
  'planner':   'Daily Planner',
  'report':    'Report',
  'projects':  'Quản lý dự án',
  'resource':  'Thành viên dự án',
  'settings':  'Cài đặt & Thiết lập',
};

// ── State ─────────────────────────────────────────
var _currentView  = 'dashboard';
var _origShowView = null;
var _navigating   = false;

// ── Helpers ───────────────────────────────────────
function toHash(view) {
  return ROUTE_TO_HASH[view] || ROUTE_TO_HASH['dashboard'];
}

function fromPath() {
  // Lấy path từ URL, bỏ leading slash
  var path = window.location.pathname.replace(/^\//, '').split('/')[0];
  return HASH_TO_ROUTE[path] || 'dashboard';
}

// ── Init ──────────────────────────────────────────
function initRouter() {
  _origShowView = window.showView;

  // Override showView
  window.showView = function(name) {
    _origShowView(name);

    // Update URL (clean, không có #)
    if (!_navigating) {
      var newPath = '/' + toHash(name);
      if (window.location.pathname !== newPath) {
        history.pushState({ view: name }, '', newPath);
      }
    }

    // Update store
    if (window.__store__) window.__store__.setState('currentView', name);
    _currentView = name;

    // Update title (ẩn tên thật, chỉ hiện ProjectHub)
    document.title = 'ProjectHub';
  };

  // Back / Forward
  window.addEventListener('popstate', function(e) {
    var view = (e.state && e.state.view) ? e.state.view : fromPath();
    if (view !== _currentView) {
      _navigating = true;
      window.showView(view);
      _navigating = false;
    }
  });

  // Xử lý URL hiện tại khi load
  var initView = fromPath();
  setTimeout(function() {
    _navigating = true;
    window.showView(initView);
    // Set initial history state
    history.replaceState({ view: initView }, '', '/' + toHash(initView));
    _navigating = false;
  }, 150);

  console.log('[Router] Ready — path obfuscated ✅');
}

// ── Public API ────────────────────────────────────
window.__router__ = {
  init:           initRouter,
  navigate:       function(view) { window.showView(view); },
  getCurrentView: function() { return _currentView; },
  getHash:        function(view) { return toHash(view || _currentView); },
  decode:         function(hash) { return HASH_TO_ROUTE[hash] || null; },
  getMap:         function() { return Object.assign({}, ROUTE_TO_HASH); },
};

window.__router__init = initRouter;

})();
