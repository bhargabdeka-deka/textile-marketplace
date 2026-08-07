/**
 * src/layouts/AuthLayout.jsx
 *
 * Distraction-free authentication layout — Vercel / Stripe vibe.
 */

import { Outlet, Link } from 'react-router-dom';
import { Package } from 'lucide-react';

function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 relative overflow-hidden font-sans">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-transparent pointer-events-none" />

      <div className="w-full max-w-[420px] relative z-10 space-y-6">
        
        {/* Brand Logo Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2.5 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-600 text-white transition-transform duration-200 group-hover:scale-105 shadow-md">
              <Package size={20} strokeWidth={2} />
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900">
              Textile<span className="text-blue-600">Hub</span>
            </span>
          </Link>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">
            B2B Textile Sourcing Platform
          </p>
        </div>

        {/* Central Auth Card Container */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xl shadow-gray-200/50">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default AuthLayout;
