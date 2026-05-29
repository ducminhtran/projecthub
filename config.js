/**
 * config.js — Cấu hình toàn ứng dụng
 * Chỉ cần điền 2 URL vào đây, không sửa file nào khác
 */
const APP_CONFIG = {

  // ── URL 1: Login (Anyone with Google account) ──────
  // Deploy setting: Execute as Me | Anyone with Google account
  // Dùng cho: popup đăng nhập Google
  LOGIN_URL: 'https://script.google.com/macros/s/AKfycbwwZY2A5exnmErnX_fMaftxqFY8GBuMyTE1TS-yBc9qu8OxYBUby8swKIUcLSnJdtRt/execc',
              
  // ── URL 2: Data (Anyone) ────────────────────────────
  // Deploy setting: Execute as Me | Anyone (không cần Google account)
  // Dùng cho: fetch() đọc/ghi data — CORS hoạt động
  // Tạo deployment mới: Apps Script → Deploy → New deployment → Anyone
  DATA_URL: 'https://script.google.com/macros/s/AKfycbxKYOy5fMTfIiyxWfLBvwpOd2rRceYGh2m8QVooU7obOc6eKSzueMDKPRtU-n5bn3jC/exec',
  
  // ── Session ────────────────────────────────────────
  SESSION_KEY:   'ph_session',
  SESSION_HOURS: 8,

  // ── App URLs ───────────────────────────────────────
  APP_URL:   './index.html',
  LOGIN_URL_PAGE: './login.html',

  // ── Polling ────────────────────────────────────────
  POLL_INTERVAL: 30000,
  SAVE_DEBOUNCE: 1500,
};

// app.js dùng GAS_URL để fetch data → dùng DATA_URL
window.GAS_URL    = APP_CONFIG.DATA_URL;
// login.html dùng LOGIN_URL để mở popup
window.LOGIN_URL  = APP_CONFIG.LOGIN_URL;
window.APP_CONFIG = APP_CONFIG;
