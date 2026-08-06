/**
 * src/services/axiosInstance.js
 *
 * Pre-configured Axios instance for all API requests.
 *
 * Features:
 *  - Base URL points to the Express server (via Vite proxy in dev)
 *  - Request interceptor: attaches JWT from Zustand auth store
 *  - Response interceptor: handles 401 → logout, normalises error shape
 */

import axios from 'axios';
import useAuthStore from '@/store/authStore';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// ── Request Interceptor — attach JWT ──────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor — handle 401 ────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || '';

    // Only clear session on 401 if it's NOT an auth attempt (login or register)
    if (status === 401 && !url.includes('/auth/login') && !url.includes('/auth/register')) {
      useAuthStore.getState().logout();
    }

    const message =
      error.response?.data?.message || error.message || 'An unexpected error occurred';

    return Promise.reject(new Error(message));
  }
);

export default api;
