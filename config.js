/**
 * config.js — Cấu hình toàn ứng dụng
 * ĐÂY LÀ NƠI DUY NHẤT cần điền GAS_URL
 */
const APP_CONFIG = {
  GAS_URL:       'https://script.google.com/macros/s/AKfycby-X4xIjkf5x2qyGLiAznwaOIR0VXLTr8fKn8bM8nwtPkMZXL781iP-clcPOAyjcbGk/exec',
  SESSION_KEY:   'ph_session',
  SESSION_HOURS: 8,
  APP_URL:       './index.html',
  LOGIN_URL:     './login.html',
  POLL_INTERVAL: 30000,
  SAVE_DEBOUNCE: 1500,
};

window.GAS_URL    = APP_CONFIG.GAS_URL;
window.APP_CONFIG = APP_CONFIG;
