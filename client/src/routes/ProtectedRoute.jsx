/**
 * src/routes/ProtectedRoute.jsx
 *
 * Route guard for authentication and role-based access control.
 */

import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

function ProtectedRoute({ allowedRoles = [] }) {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    // If buyer tries to access supplier route, redirect to their dashboard
    if (user.role === 'buyer') {
      return <Navigate to="/buyer/dashboard" replace />;
    }
    // If supplier tries to access buyer route, redirect to their dashboard
    if (user.role === 'supplier') {
      return <Navigate to="/supplier/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
