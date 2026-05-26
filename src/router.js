/**
 * router.js — Hash-based Router
 * URL: /#/dashboard, /#/tasks, /#/projects
 * Wrap showView() để update URL. Back/Forward browser hoạt động.
 */

(function() {

const ROUTES = {
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

var _currentView  = 'dashboard';
var _origShowView = null;
var _navigating   = false;

function parseHash() {
  var hash = window.location.hash || '';
  var clean = hash.replace(/^#\//, '').replace(/^\//, '').split('/')[0];
  return (clean && ROUTES[clean]) ? clean : 'dashboard';
}

function initRouter() {
  // Lưu showView gốc
  _origShowView = window.showView;

  // Override showView
  window.showView = function(name) {
    // Gọi logic gốc
    _origShowView(name);

    // Update URL
    if (!_navigating) {
      var newHash = '#/' + name;
      if (window.location.hash !== newHash) {
        history.pushState(null, '', newHash);
      }
    }

    // Update store
    if (window.__store__) window.__store__.setState('currentView', name);
    _currentView = name;

    // Update title
    if (ROUTES[name]) document.title = ROUTES[name] + ' — ProjectHub';
  };

  // Back/Forward
  window.addEventListener('hashchange', function() {
    var view = parseHash();
    if (view !== _currentView) {
      _navigating = true;
      window.showView(view);
      _navigating = false;
    }
  });

  // Xử lý URL hiện tại
  var initView = parseHash();
  if (initView !== 'dashboard') {
    setTimeout(function() {
      _navigating = true;
      window.showView(initView);
      _navigating = false;
    }, 150);
  } else {
    history.replaceState(null, '', '#/dashboard');
  }

  console.log('[Router] Ready ✅ — current:', initView);
}

window.__router__ = {
  init: initRouter,
  navigate: function(view) { window.showView(view); },
  getCurrentView: function() { return _currentView; },
  getHash: parseHash,
};

// Alias cho index.html gọi
window.__router__init = initRouter;

})();
