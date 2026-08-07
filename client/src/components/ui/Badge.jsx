import React from 'react';

/**
 * Reusable Badge & Tag Component — Enterprise Design System.
 * 
 * Props:
 *  - variant: 'neutral' | 'brand' | 'success' | 'warning' | 'error'
 *  - icon: ReactNode
 */

const VARIANTS = {
  neutral: 'bg-gray-100/70 text-[#374151] border-[#E5E7EB]',
  brand: 'bg-blue-50/70 text-[#2563EB] border-blue-100',
  success: 'bg-emerald-50/70 text-[#16A34A] border-emerald-100',
  warning: 'bg-amber-50/70 text-[#D97706] border-amber-100',
  error: 'bg-red-50/70 text-[#DC2626] border-red-100',
};

export function Badge({ children, variant = 'neutral', icon, className = '', ...props }) {
  const variantClass = VARIANTS[variant] || VARIANTS.neutral;
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantClass} ${className}`} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

export function Tag({ children, icon, className = '', ...props }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium bg-[#FAFBFC] text-[#6B7280] border border-[#E5E7EB] ${className}`} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

export default Badge;
