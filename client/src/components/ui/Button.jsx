import React from 'react';

/**
 * Reusable Button Component — Stripe/Vercel Design System.
 * 
 * Props:
 *  - variant: 'primary' | 'brand' | 'secondary' | 'ghost' | 'danger'
 *  - size: 'sm' | 'md' | 'lg'
 *  - isLoading: boolean
 *  - disabled: boolean
 *  - icon: ReactNode
 */
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
  const variantClass = `ui-button-${variant}`;
  const sizeClass = `ui-button-${size}`;

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={`ui-button ${variantClass} ${sizeClass} ${className}`}
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
