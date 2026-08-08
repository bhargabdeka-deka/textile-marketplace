import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Traditional Indian Woven Loom Emblem & Brand Logo
 * Inspired by Fabcurate's organic textile heritage identity.
 */
function Logo({ size = 'md', className = '', showSubtitle = true, link = true }) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const iconDimensions = isSm ? 'w-7 h-7' : isLg ? 'w-11 h-11' : 'w-9 h-9';
  const titleSize = isSm ? 'text-base' : isLg ? 'text-2xl' : 'text-xl';
  const subtitleSize = isSm ? 'text-[9px]' : 'text-[10px]';

  const LogoContent = (
    <div className={`inline-flex items-center gap-3 group ${className}`}>
      {/* ── Woven Loom Thread Grid SVG Emblem ──────────────────────────── */}
      <div className={`${iconDimensions} shrink-0 flex items-center justify-center relative`}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer Loom Frame */}
          <rect x="4" y="4" width="40" height="40" rx="8" stroke="#7B8B30" strokeWidth="2.5" strokeDasharray="6 3" />
          {/* Vertical Warp Threads */}
          <path d="M14 6V42M24 6V42M34 6V42" stroke="#7B8B30" strokeWidth="1.75" strokeLinecap="round" opacity="0.85" />
          {/* Horizontal Weft Threads */}
          <path d="M6 14H42M6 24H42M6 34H42" stroke="#7B8B30" strokeWidth="1.75" strokeLinecap="round" opacity="0.85" />
          {/* Central Woven Emblem Badge */}
          <rect x="18" y="18" width="12" height="12" rx="3" fill="#7B8B30" />
          <path d="M22 21H26M24 21V27" stroke="#FAF8F5" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* ── Brand Typography ────────────────────────────────────────────── */}
      <div className="flex flex-col">
        <span className={`${titleSize} font-bold tracking-tight text-[#1C1917] font-serif-display leading-none group-hover:text-[#7B8B30] transition-colors`}>
          TEXTILE<span className="text-[#7B8B30]">HUB</span>
        </span>
        {showSubtitle && (
          <span className={`${subtitleSize} font-semibold tracking-widest text-[#8C6D35] uppercase mt-1 leading-none`}>
            Indian Textile Heritage
          </span>
        )}
      </div>
    </div>
  );

  if (!link) return LogoContent;

  return (
    <Link to="/" className="focus:outline-none shrink-0">
      {LogoContent}
    </Link>
  );
}

export default Logo;
