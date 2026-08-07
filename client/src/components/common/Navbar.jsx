/**
 * src/components/common/Navbar.jsx
 *
 * Responsive top navigation bar — Stripe / Vercel / Apple Design System.
 */

import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  // Home page gets a transparent header state until scrolled
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Is the light background active? (Either scrolled down, or on a non-home page)
  const isLightBg = scrolled || !isHome;

  // Header background & border styling
  const headerBgClass = isLightBg
    ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-sm'
    : 'bg-transparent border-b border-white/15 text-white';

  const linkBaseClass = isLightBg
    ? 'text-slate-800 font-bold hover:text-black hover:bg-slate-100'
    : 'text-slate-200 font-bold hover:text-white hover:bg-white/10';

  const activeLinkClass = isLightBg
    ? 'text-[#0070F3] font-bold bg-blue-50/90 border border-blue-100'
    : 'text-white font-bold bg-white/15 border border-white/20';

  const logoTitleColor = isLightBg ? 'text-slate-950' : 'text-white';

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${headerBgClass}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* ── Brand Logo ─────────────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group py-1 focus:outline-none">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${
              isLightBg
                ? 'bg-slate-950 text-white shadow-sm'
                : 'bg-white text-black shadow-md'
            }`}>
              <Package size={17} strokeWidth={2.2} />
            </div>
            <span className={`text-lg font-black tracking-tight ${logoTitleColor}`}>
              Textile<span className={isLightBg ? 'text-[#0070F3]' : 'text-sky-400'}>Hub</span>
            </span>
          </Link>

          {/* ── Desktop Navigation Links ────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1.5">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-lg text-sm transition-all duration-150 ${
                    isActive ? activeLinkClass : linkBaseClass
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* ── Desktop CTAs & Auth ─────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-2.5">
            {isAuthenticated ? (
              <>
                {user?.role === 'buyer' && (
                  <Link
                    to="/buyer/cart"
                    className={`relative p-2 rounded-lg transition-colors ${
                      isLightBg ? 'text-slate-800 hover:text-black hover:bg-slate-100' : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                    aria-label={`Cart with ${totalItems} items`}
                  >
                    <ShoppingCart size={19} />
                    {totalItems > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-extrabold text-white bg-[#0070F3] rounded-full shadow-sm">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}
                
                <Link
                  to={user?.role === 'supplier' ? '/supplier/dashboard' : '/buyer/dashboard'}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-extrabold transition-all duration-150 ${
                    isLightBg
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  <LayoutDashboard size={14} />
                  Dashboard
                </Link>

                <button
                  onClick={logout}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-150 ${
                    isLightBg
                      ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200'
                      : 'text-slate-200 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-3.5 py-2 rounded-lg text-xs font-extrabold transition-all duration-150 ${
                    isLightBg ? 'text-slate-800 hover:text-black hover:bg-slate-100' : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-extrabold transition-all duration-150 shadow-sm ${
                    isLightBg ? 'bg-slate-950 text-white hover:bg-slate-800' : 'bg-white text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  <ShoppingBag size={14} />
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
                className={`relative p-2 rounded-md ${isLightBg ? 'text-slate-900' : 'text-white'}`}
                aria-label={`Cart with ${totalItems} items`}
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center min-w-[16px] h-[16px] px-1 text-[9px] font-extrabold text-white bg-[#0070F3] rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            <button
              className={`p-2 rounded-lg transition-colors ${
                isLightBg ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown Menu ────────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-200 my-2 p-3"
            >
              <div className="space-y-1">
                {NAV_LINKS.map(({ label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `block px-3.5 py-2.5 rounded-lg text-sm font-extrabold transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-[#0070F3]'
                          : 'text-slate-800 hover:bg-slate-100 hover:text-black'
                      }`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </NavLink>
                ))}

                <div className="pt-3 mt-2 border-t border-slate-100 space-y-2">
                  {!isAuthenticated ? (
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/login"
                        className="flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-extrabold border border-slate-200 text-slate-900 hover:bg-slate-50"
                        onClick={() => setMobileOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-extrabold bg-slate-950 text-white hover:bg-slate-800"
                        onClick={() => setMobileOpen(false)}
                      >
                        Get Started
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to={user?.role === 'supplier' ? '/supplier/dashboard' : '/buyer/dashboard'}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-extrabold bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200"
                        onClick={() => setMobileOpen(false)}
                      >
                        <LayoutDashboard size={15} />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => { logout(); setMobileOpen(false); }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-extrabold border border-slate-200 text-rose-600 hover:bg-rose-50"
                      >
                        <LogOut size={15} />
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
