/**
 * router.js — Hash-based Router với obfuscated paths
 *
 * URL: ducminhtran.github.io/projecthub/#18a5566e805d  (= dashboard)
 * Hash 12 ký tự hex ngẫu nhiên — không ai đoán được route thật
 */

(function() {

// ── Route maps ────────────────────────────────────
// Hash 12 ký tự — SHA256(salt + routeName)[:12]
// Salt: 23b96600a751cfd4 — KHÔNG thay đổi sau khi deploy
const ROUTE_TO_HASH = {
  'dashboard': '18a5566e805d',
  'tasks':     '95f4acfcc364',
  'issues':    '25cd7054b45e',
  'board':     'a14533171fcd',
  'calendar':  'df03e6a8e74c',
  'gantt':     '775f784e1237',
  'planner':   '6f37cf664309',
  'report':    '0538ca578ce8',
  'projects':  '78078996d5e5',
  'resource':  'f716bb297e01',
  'settings':  '9e93ba8a8804',
};

const HASH_TO_ROUTE = {};
Object.keys(ROUTE_TO_HASH).forEach(function(route) {
  HASH_TO_ROUTE[ROUTE_TO_HASH[route]] = route;
});

const TITLES = {
  'dashboard': 'Tổng quan',       'tasks':    'Task Manager',
  'issues':    'Issue Manager',   'board':    'Display Board',
  'calendar':  'Calendar',        'gantt':    'Gantt Chart',
  'planner':   'Daily Planner',   'report':   'Report',
  'projects':  'Quản lý dự án',   'resource': 'Thành viên dự án',
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

function fromHash() {
  var hash = window.location.hash.replace(/^#/, '');
  return HASH_TO_ROUTE[hash] || 'dashboard';
}

// ── Init ──────────────────────────────────────────
function initRouter() {
  _origShowView = window.showView;

  // Override showView → update URL hash
  window.showView = function(name) {
    _origShowView(name);

    if (!_navigating) {
      var newHash = '#' + toHash(name);
      if (window.location.hash !== newHash) {
        history.pushState({ view: name }, '', newHash);
      }
    }

    if (window.__store__) window.__store__.setState('currentView', name);
    _currentView = name;
    document.title = 'ProjectHub';
  };

  // Back / Forward
  window.addEventListener('popstate', function(e) {
    var view = (e.state && e.state.view) ? e.state.view : fromHash();
    if (view !== _currentView) {
      _navigating = true;
      window.showView(view);
      _navigating = false;
    }
  });

  // Xử lý URL hiện tại khi load
  var initView = fromHash();
  setTimeout(function() {
    _navigating = true;
    window.showView(initView);
    history.replaceState({ view: initView }, '', '#' + toHash(initView));
    _navigating = false;
  }, 150);

  console.log('[Router] Ready — hash obfuscated ✅');
}

// ── Public API ────────────────────────────────────
window.__router__ = {
  init:           initRouter,
  navigate:       function(view) { window.showView(view); },
  getCurrentView: function() { return _currentView; },
  getHash:        function(view) { return toHash(view || _currentView); },
  decode:         function(hash) { return HASH_TO_ROUTE[hash] || null; },
};

window.__router__init = initRouter;

})();
