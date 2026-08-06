/**
 * src/store/authStore.js
 *
 * Zustand store for authentication state.
 * Persists token and user to localStorage for session survival across refreshes.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * @typedef {Object} AuthState
 * @property {object|null} user           - Authenticated user object
 * @property {string|null} token          - JWT access token
 * @property {boolean}     isAuthenticated
 * @property {boolean}     isLoading      - API call in progress
 *
 * @property {Function} setUser           - Set user after login
 * @property {Function} setToken          - Set JWT token
 * @property {Function} logout            - Clear all auth state
 */

const useAuthStore = create(
  persist(
    (set) => ({
      // ── State ───────────────────────────────────────────────────────
      user:            null,
      token:           null,
      isAuthenticated: false,
      isLoading:       false,

      // ── Actions ─────────────────────────────────────────────────────
      setUser: (user) =>
        set({ user, isAuthenticated: !!user }),

      setToken: (token) =>
        set({ token }),

      setLoading: (isLoading) =>
        set({ isLoading }),

      /**
       * login — set user + token together after a successful API response
       */
      login: ({ user, token }) =>
        set({ user, token, isAuthenticated: true, isLoading: false }),

      /**
       * logout — clear all persisted auth state
       */
      logout: () =>
        set({ user: null, token: null, isAuthenticated: false, isLoading: false }),
    }),
    {
      name: 'textile-auth', // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist these fields — don't persist isLoading
      partialize: (state) => ({
        user:            state.user,
        token:           state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
