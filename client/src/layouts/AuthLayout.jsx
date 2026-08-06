/**
 * src/layouts/AuthLayout.jsx
 *
 * Authentication layout — used for Login and Register pages.
 * Provides a centred, full-height card layout separate from the main app chrome.
 * No Navbar or Footer — keeps auth pages distraction-free.
 */

import { Outlet, Link } from 'react-router-dom';

function AuthLayout() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--color-brand-accent)' }}
    >
      <div className="w-full max-w-md">
        {/* Brand logo / wordmark */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-block"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-brand-primary)' }}
          >
            <span className="text-3xl font-bold">Textile</span>
            <span
              className="text-3xl font-bold"
              style={{ color: 'var(--color-brand-secondary)' }}
            >
              Hub
            </span>
          </Link>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-muted)' }}>
            B2B Textile Marketplace
          </p>
        </div>

        {/* Auth card */}
        <div
          className="rounded-2xl p-8"
          style={{
            backgroundColor: 'var(--color-surface)',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
