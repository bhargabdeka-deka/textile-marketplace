import React from 'react';

/**
 * Reusable Card Component — Stripe/Apple/Linear Enterprise Design System.
 */
export function Card({ children, interactive = false, className = '', ...props }) {
  const baseClass = 'bg-white rounded-2xl border border-[#E5E7EB] shadow-xs';
  const interactiveClass = interactive ? 'hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300 transition-all duration-150 cursor-pointer' : '';
  
  return (
    <div
      className={`${baseClass} ${interactiveClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 border-b border-[#EEF2F7] ${className}`} {...props}>
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
    <div className={`px-6 py-4 border-t border-[#EEF2F7] bg-[#FAFBFC] rounded-b-2xl ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Card;
