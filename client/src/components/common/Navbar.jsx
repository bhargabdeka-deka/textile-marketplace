/**
 * src/components/common/Navbar.jsx
 *
 * Traditional Indian Textile Aesthetic Top Navigation Bar.
 * Inspired by Fabcurate's organic heritage color palette & loom emblem.
 */

import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, ShoppingCart, LogOut, LayoutDashboard } from 'lucide-react';
import useAuthStore from '@/store/authStore';
import useCartStore from '@/store/cartStore';
import Logo from './Logo';

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
    <header className="sticky top-0 z-50 bg-[#FAF8F5] border-b border-[#E7E2D7] text-[#1C1917] shadow-xs transition-colors duration-150">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">

          {/* ── Traditional Loom Brand Logo ─────────────────────────────── */}
          <Logo size="md" />

          {/* ── Desktop Navigation Links ────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    isActive 
                      ? 'text-[#7B8B30] bg-[#7B8B30]/10 border border-[#7B8B30]/20' 
                      : 'text-[#57534E] hover:text-[#1C1917] hover:bg-white border border-transparent'
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
                    className="relative p-2.5 rounded-xl text-[#57534E] hover:text-[#1C1917] hover:bg-white transition-colors border border-transparent"
                    aria-label={`Cart with ${totalItems} items`}
                  >
                    <ShoppingCart size={20} />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[11px] font-bold text-white bg-[#7B8B30] rounded-full shadow-xs border-2 border-[#FAF8F5]">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}
                
                <Link
                  to={user?.role === 'supplier' ? '/supplier/dashboard' : '/buyer/dashboard'}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-[#F3EFE6] text-[#1C1917] border border-[#E7E2D7] transition-colors shadow-xs"
                >
                  <LayoutDashboard size={15} className="text-[#7B8B30]" />
                  Dashboard
                </Link>

                <button
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#78716C] hover:text-[#1C1917] hover:bg-white transition-colors"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#57534E] hover:text-[#1C1917] hover:bg-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#7B8B30] text-white hover:bg-[#6B7A28] transition-colors shadow-xs"
                >
                  <ShoppingBag size={15} />
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
                className="relative p-2 rounded-lg text-[#1C1917] hover:bg-white"
                aria-label={`Cart with ${totalItems} items`}
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[11px] font-bold text-white bg-[#7B8B30] rounded-full shadow-xs border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            <button
              className="p-2 rounded-lg text-[#1C1917] hover:bg-white transition-colors"
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
              className="md:hidden overflow-hidden bg-[#FAF8F5] text-[#1C1917] rounded-xl shadow-lg border border-[#E7E2D7] my-2 p-3 absolute left-4 right-4 z-50"
            >
              <div className="space-y-2">
                {NAV_LINKS.map(({ label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-[#7B8B30]/10 text-[#7B8B30]'
                          : 'text-[#57534E] hover:bg-white'
                      }`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </NavLink>
                ))}

                <div className="pt-3 mt-3 border-t border-[#E7E2D7] space-y-2">
                  {!isAuthenticated ? (
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        to="/login"
                        className="flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border border-[#E7E2D7] bg-white text-[#1C1917] shadow-xs"
                        onClick={() => setMobileOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#7B8B30] text-white shadow-xs"
                        onClick={() => setMobileOpen(false)}
                      >
                        Get Started
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to={user?.role === 'supplier' ? '/supplier/dashboard' : '/buyer/dashboard'}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-white text-[#1C1917] border border-[#E7E2D7] shadow-xs"
                        onClick={() => setMobileOpen(false)}
                      >
                        <LayoutDashboard size={16} className="text-[#7B8B30]" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => { logout(); setMobileOpen(false); }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border border-red-200 text-red-700 bg-red-50"
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
