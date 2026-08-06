/**
 * src/services/auth.service.js
 *
 * API call wrappers for authentication endpoints.
 * All functions use the shared Axios instance.
 */

import api from './axiosInstance';

const authService = {
  /**
   * register — create a new user account
   * @param {{ name, email, password, role, companyName }} data
   */
  register: async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  /**
   * login — authenticate and receive token
   * @param {{ email, password }} credentials
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  /**
   * logout — invalidate session server-side
   */
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  /**
   * getMe — fetch current user profile
   */
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export default authService;
