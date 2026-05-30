/**
 * config.js — Cấu hình toàn ứng dụng
 * Chỉ cần điền GAS_URL vào đây, không sửa file nào khác
 */
const APP_CONFIG = {
  // ── Deploy: Execute as Me | Anyone ─────────────
  GAS_URL: 'https://script.google.com/macros/s/AKfycbxKYOy5fMTfIiyxWfLBvwpOd2rRceYGh2m8QVooU7obOc6eKSzueMDKPRtU-n5bn3jC/exec',

  SESSION_KEY:   'ph_session',
  SESSION_HOURS: 8,
  APP_URL:       './index.html',
  LOGIN_URL:     './login.html',
  POLL_INTERVAL: 30000,
  SAVE_DEBOUNCE: 1500,
};

window.GAS_URL    = APP_CONFIG.GAS_URL;
window.APP_CONFIG = APP_CONFIG;
