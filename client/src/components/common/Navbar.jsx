/**
 * src/components/common/Navbar.jsx
 *
 * Responsive top navigation bar — Stripe / Vercel / Apple Design System.
 */

import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Package, ShoppingCart, LogOut, LayoutDashboard } from 'lucide-react';
import useAuthStore from '@/store/authStore';
import useCartStore from '@/store/cartStore';

const NAV_LINKS = [
  { label: 'Marketplace', to: '/products' },
];

function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { totalItems } = useCartStore();
  
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB] text-[#111827] shadow-xs transition-colors duration-150">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* ── Brand Logo ─────────────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group py-1 focus:outline-none">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#2563EB] text-white shadow-xs transition-colors">
              <Package size={18} strokeWidth={2} />
            </div>
            <span className="text-lg font-semibold tracking-tight text-[#111827]">
              Textile<span className="text-[#2563EB]">Hub</span>
            </span>
          </Link>

          {/* ── Desktop Navigation Links ────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive 
                      ? 'text-[#2563EB] bg-blue-50/60 border border-blue-100' 
                      : 'text-[#6B7280] hover:text-[#111827] hover:bg-gray-50 border border-transparent'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* ── Desktop CTAs & Auth ─────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {user?.role === 'buyer' && (
                  <Link
                    to="/buyer/cart"
                    className="relative p-2 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-gray-50 transition-colors border border-transparent"
                    aria-label={`Cart with ${totalItems} items`}
                  >
                    <ShoppingCart size={20} />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[11px] font-semibold text-white bg-[#2563EB] rounded-full shadow-xs border-2 border-white">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}
                
                <Link
                  to={user?.role === 'supplier' ? '/supplier/dashboard' : '/buyer/dashboard'}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium bg-[#FAFBFC] hover:bg-gray-100 text-[#111827] border border-[#E5E7EB] transition-colors shadow-xs"
                >
                  <LayoutDashboard size={16} className="text-[#6B7280]" />
                  Dashboard
                </Link>

                <button
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-[#6B7280] hover:text-[#111827] hover:bg-gray-50 border border-transparent transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-[#6B7280] hover:text-[#111827] hover:bg-gray-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors shadow-xs"
                >
                  <ShoppingBag size={16} />
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile Hamburger Button ─────────────────────────────────── */}
          <div className="flex md:hidden items-center gap-2">
            {isAuthenticated && user?.role === 'buyer' && (
              <Link
                to="/buyer/cart"
                className="relative p-2 rounded-lg text-[#111827] hover:bg-gray-50"
                aria-label={`Cart with ${totalItems} items`}
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[11px] font-semibold text-white bg-[#2563EB] rounded-full shadow-xs border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            <button
              className="p-2 rounded-lg text-[#111827] hover:bg-gray-50 transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown Menu ────────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="md:hidden overflow-hidden bg-white text-[#111827] rounded-xl shadow-lg border border-[#E5E7EB] my-2 p-3 absolute left-4 right-4 z-50"
            >
              <div className="space-y-2">
                {NAV_LINKS.map(({ label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50/60 text-[#2563EB]'
                          : 'text-[#374151] hover:bg-gray-50'
                      }`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </NavLink>
                ))}

                <div className="pt-3 mt-3 border-t border-[#EEF2F7] space-y-2">
                  {!isAuthenticated ? (
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        to="/login"
                        className="flex items-center justify-center py-2.5 px-4 rounded-xl text-sm font-medium border border-[#E5E7EB] text-[#111827] hover:bg-gray-50 shadow-xs"
                        onClick={() => setMobileOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center justify-center py-2.5 px-4 rounded-xl text-sm font-medium bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-xs"
                        onClick={() => setMobileOpen(false)}
                      >
                        Get Started
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to={user?.role === 'supplier' ? '/supplier/dashboard' : '/buyer/dashboard'}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium bg-[#FAFBFC] text-[#111827] hover:bg-gray-100 border border-[#E5E7EB] shadow-xs"
                        onClick={() => setMobileOpen(false)}
                      >
                        <LayoutDashboard size={16} className="text-[#6B7280]" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => { logout(); setMobileOpen(false); }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium border border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Navbar;
