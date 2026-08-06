/**
 * src/components/common/Navbar.jsx
 *
 * Responsive top navigation bar - SaaS Premium Vibe
 */

import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Package, ShoppingCart } from 'lucide-react';
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
  const [scrolled,   setScrolled]   = useState(false);

  // Home page gets a transparent navbar until scrolled
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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

  const navClasses = `sticky top-0 z-50 transition-all duration-300 border-b ${
    scrolled
      ? 'bg-white/80 backdrop-blur-lg border-[var(--color-border)] shadow-sm'
      : isHome
        ? 'bg-transparent border-transparent text-white'
        : 'bg-white border-[var(--color-border)] text-[var(--color-text)]'
  }`;

  const linkColor = scrolled || !isHome ? 'text-[var(--color-muted)] hover:text-black' : 'text-gray-300 hover:text-white';
  const brandColor = scrolled || !isHome ? 'text-black' : 'text-white';

  return (
    <header className={navClasses}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Brand ──────────────────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${scrolled || !isHome ? 'bg-black text-white' : 'bg-white text-black'}`}>
              <Package size={18} />
            </div>
            <span className={`text-xl font-extrabold tracking-tight ${brandColor}`}>
              Textile<span className={scrolled || !isHome ? 'text-[var(--color-brand-secondary)]' : 'text-gray-400'}>Hub</span>
            </span>
          </Link>

          {/* ── Desktop Nav Links ───────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? (scrolled || !isHome ? 'text-black' : 'text-white')
                      : linkColor
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* ── Desktop CTAs ────────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {user?.role === 'buyer' && (
                  <Link to="/buyer/cart" className={`relative p-2 transition-colors ${linkColor}`}>
                    <ShoppingCart size={20} />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-[#0070F3] rounded-full shadow-sm">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}
                <Link
                  to={user?.role === 'supplier' ? '/supplier/dashboard' : '/buyer/dashboard'}
                  className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors duration-200 ${
                    scrolled || !isHome
                      ? 'bg-gray-100 hover:bg-gray-200 text-black'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className={`px-4 py-2 text-sm font-bold rounded-xl border transition-colors duration-200 ${
                    scrolled || !isHome
                      ? 'border-[var(--color-border)] text-gray-500 hover:text-black hover:bg-gray-50'
                      : 'border-white/20 text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-bold transition-colors duration-200 ${linkColor}`}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className={`px-5 py-2 text-sm font-bold rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm ${
                    scrolled || !isHome
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  <ShoppingBag size={16} />
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile Hamburger ────────────────────────────────────────── */}
          <button
            className={`md:hidden p-2 rounded-lg ${brandColor}`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ── Mobile Menu ─────────────────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="md:hidden overflow-hidden bg-white text-black rounded-b-2xl shadow-xl absolute top-16 left-0 right-0 border-b border-[var(--color-border)]"
            >
              <div className="px-4 py-6 space-y-4">
                {NAV_LINKS.map(({ label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className="block px-4 py-3 rounded-xl text-base font-bold bg-gray-50 hover:bg-gray-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </NavLink>
                ))}
                
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  {!isAuthenticated ? (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-3 text-sm font-bold text-center rounded-xl border border-gray-200 text-black"
                        onClick={() => setMobileOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-3 text-sm font-bold text-center rounded-xl bg-black text-white shadow-sm"
                        onClick={() => setMobileOpen(false)}
                      >
                        Get Started
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to={user?.role === 'supplier' ? '/supplier/dashboard' : '/buyer/dashboard'}
                        className="block px-4 py-3 text-sm font-bold text-center rounded-xl bg-gray-100 text-black"
                        onClick={() => setMobileOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => { logout(); setMobileOpen(false); }}
                        className="w-full block px-4 py-3 text-sm font-bold text-center rounded-xl border border-gray-200 text-gray-500"
                      >
                        Logout
                      </button>
                    </>
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
