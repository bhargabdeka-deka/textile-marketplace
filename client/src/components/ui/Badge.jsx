import React from 'react';

/**
 * Reusable Badge & Tag Component — Stripe/Linear Design System.
 * 
 * Props:
 *  - variant: 'neutral' | 'brand' | 'success' | 'warning' | 'error'
 *  - icon: ReactNode
 */
export function Badge({ children, variant = 'neutral', icon, className = '', ...props }) {
  return (
    <span className={`ui-badge ui-badge-${variant} ${className}`} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

export function Tag({ children, icon, className = '', ...props }) {
  return (
    <span className={`ui-tag ${className}`} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

export default Badge;
