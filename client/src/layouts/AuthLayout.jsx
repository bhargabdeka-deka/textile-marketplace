/**
 * src/layouts/AuthLayout.jsx
 *
 * Traditional Indian Textile Aesthetic Auth Layout — Fabcurate Inspired.
 */

import { Outlet } from 'react-router-dom';
import Logo from '@/components/common/Logo';

function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#FAF8F5] relative overflow-hidden font-sans">
      {/* Background ambient warm lighting */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#7B8B30]/10 to-transparent pointer-events-none" />

      <div className="w-full max-w-[440px] relative z-10 space-y-6">
        
        {/* Brand Logo Header */}
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>

        {/* Central Auth Card Container */}
        <div className="bg-white border border-[#E7E2D7] rounded-2xl p-6 sm:p-8 shadow-sm">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default AuthLayout;
