import React from 'react';

/**
 * Reusable Card Component — Stripe/Apple/Linear Design System.
 */
export function Card({ children, interactive = false, className = '', ...props }) {
  return (
    <div
      className={`ui-card ${interactive ? 'ui-card-interactive' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`p-6 border-b border-[var(--color-border)] ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '', ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`p-6 border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] rounded-b-[var(--radius-xl)] ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Card;
