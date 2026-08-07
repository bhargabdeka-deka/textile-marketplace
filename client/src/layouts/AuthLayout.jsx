/**
 * src/layouts/AuthLayout.jsx
 *
 * Distraction-free authentication layout — Vercel / Stripe vibe.
 */

import { Outlet, Link } from 'react-router-dom';
import { Package } from 'lucide-react';

function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-950 relative overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0070F3]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-sky-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[420px] relative z-10 space-y-6">
        
        {/* Brand Logo Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2.5 group focus:outline-none">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white text-slate-950 transition-transform duration-200 group-hover:scale-105 shadow-md">
              <Package size={18} strokeWidth={2.2} />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              Textile<span className="text-[#0070F3]">Hub</span>
            </span>
          </Link>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
            B2B Textile Sourcing Platform
          </p>
        </div>

        {/* Central Auth Card Container */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default AuthLayout;
