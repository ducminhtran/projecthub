/**
 * router.js — Dynamic random hash router
 *
 * Mỗi lần navigate tạo hash ngẫu nhiên 16 ký tự.
 * Mapping hash → view lưu trong sessionStorage.
 * Back/Forward vẫn hoạt động nhờ history.state.
 *
 * URL: #a3f2bc91e8479d2c  (khác mỗi lần, không đoán được)
 */

(function() {

const VALID_VIEWS = [
  'dashboard','tasks','issues','board','calendar',
  'gantt','planner','report','projects','resource','settings'
];

// ── State ─────────────────────────────────────────
var _currentView  = 'dashboard';
var _origShowView = null;
var _navigating   = false;

// Session map: hash → view (reset khi đóng tab)
var _sessionMap = {};
try {
  _sessionMap = JSON.parse(sessionStorage.getItem('_rhm') || '{}');
} catch(e) { _sessionMap = {}; }

function saveMap() {
  try { sessionStorage.setItem('_rhm', JSON.stringify(_sessionMap)); } catch(e) {}
}

// ── Helpers ───────────────────────────────────────

// Tạo hash ngẫu nhiên 16 ký tự hex
function randomHash() {
  var arr = new Uint8Array(8);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(function(b) {
    return b.toString(16).padStart(2,'0');
  }).join('');
}

// Tạo hash mới cho view, lưu mapping
function newHashForView(view) {
  var h = randomHash();
  _sessionMap[h] = view;
  saveMap();
  return h;
}

// Decode hash → view
function decodeHash(hash) {
  return _sessionMap[hash] || null;
}

// Lấy hash hiện tại từ URL
function currentHash() {
  return window.location.hash.replace(/^#/, '');
}

// ── Init ──────────────────────────────────────────
function initRouter() {
  _origShowView = window.showView;

  // Override showView
  window.showView = function(name) {
    if (!VALID_VIEWS.includes(name)) name = 'dashboard';

    // Gọi showView gốc
    _origShowView(name);

    // Tạo hash mới ngẫu nhiên mỗi lần navigate
    if (!_navigating) {
      var h = newHashForView(name);
      history.pushState({ view: name, hash: h }, '', '#' + h);
    }

    // Update store
    if (window.__store__) window.__store__.setState('currentView', name);
    _currentView = name;
    document.title = 'ProjectHub';
  };

  // Back / Forward — dùng state.view (không dùng hash decode)
  window.addEventListener('popstate', function(e) {
    var view = 'dashboard';
    if (e.state && e.state.view) {
      view = e.state.view;
    } else {
      // Fallback: decode từ sessionStorage
      view = decodeHash(currentHash()) || 'dashboard';
    }
    if (view !== _currentView) {
      _navigating = true;
      window.showView(view);
      _navigating = false;
    }
  });

  // Load lần đầu — tạo hash ngẫu nhiên cho dashboard
  var initView = 'dashboard';
  var existingHash = currentHash();
  if (existingHash && _sessionMap[existingHash]) {
    initView = _sessionMap[existingHash];
  }

  setTimeout(function() {
    var h = newHashForView(initView);
    _navigating = true;
    window.showView(initView);
    history.replaceState({ view: initView, hash: h }, '', '#' + h);
    _navigating = false;
  }, 150);

  console.log('[Router] Dynamic hash ready ✅');
}

// ── Public API ────────────────────────────────────
window.__router__ = {
  init:           initRouter,
  navigate:       function(view) { window.showView(view); },
  getCurrentView: function() { return _currentView; },
  decode:         function(hash) { return decodeHash(hash || currentHash()); },
  getMap:         function() { return Object.assign({}, _sessionMap); },
};

window.__router__init = initRouter;

})();
