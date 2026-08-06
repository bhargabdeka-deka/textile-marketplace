/**
 * src/hooks/useAuth.js
 *
 * Custom hook — convenient access to auth store with helper derived values.
 *
 * Usage:
 *   const { user, isAuthenticated, isBuyer, isSupplier } = useAuth();
 */

import useAuthStore from '@/store/authStore';

function useAuth() {
  const { user, token, isAuthenticated, isLoading, login, logout, setLoading } =
    useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    setLoading,

    // Derived role helpers
    isBuyer:    isAuthenticated && user?.role === 'buyer',
    isSupplier: isAuthenticated && user?.role === 'supplier',
    isAdmin:    isAuthenticated && user?.role === 'admin',
  };
}

export default useAuth;
