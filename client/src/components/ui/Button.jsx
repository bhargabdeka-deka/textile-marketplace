import React from 'react';

/**
 * Reusable Button Component — Shopify/Stripe Design System.
 * 
 * Props:
 *  - variant: 'primary' | 'brand' | 'secondary' | 'ghost' | 'danger'
 *  - size: 'sm' | 'md' | 'lg'
 *  - isLoading: boolean
 *  - disabled: boolean
 *  - icon: ReactNode
 */

const VARIANTS = {
  primary: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] focus:ring-[#2563EB]',
  brand: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] focus:ring-[#2563EB]',
  secondary: 'bg-white text-[#111827] border border-[#E5E7EB] hover:bg-gray-50 focus:ring-gray-200',
  ghost: 'bg-transparent text-[#6B7280] hover:bg-gray-100 hover:text-[#111827] focus:ring-gray-200 shadow-none border border-transparent',
  danger: 'bg-[#DC2626] text-white hover:bg-red-700 focus:ring-red-600',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon,
  className = '',
  type = 'button',
  ...props
}, ref) => {
  const variantClass = VARIANTS[variant] || VARIANTS.primary;
  const sizeClass = SIZES[size] || SIZES.md;
  const baseClass = 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors shadow-xs disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1';

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-1" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
