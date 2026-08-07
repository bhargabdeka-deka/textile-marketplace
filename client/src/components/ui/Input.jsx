import React from 'react';

/**
 * Reusable Input & Textarea Component — Stripe Checkout Design System.
 */
const Input = React.forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  type = 'text',
  multiline = false,
  rows = 4,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const isError = Boolean(error);

  const baseInputStyle = 'w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#111827] placeholder-[#6B7280] outline-none transition-all duration-150 shadow-xs';
  const normalBorder = 'border-[#E5E7EB] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 hover:border-gray-300';
  const errorBorder = 'border-[#DC2626] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/15 hover:border-[#DC2626]';
  
  const borderClass = isError ? errorBorder : normalBorder;
  const iconPadding = Icon ? 'pl-10' : '';

  const Component = multiline ? 'textarea' : 'input';

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-[#111827]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && !multiline && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none">
            <Icon size={16} />
          </div>
        )}
        <Component
          ref={ref}
          id={inputId}
          type={multiline ? undefined : type}
          rows={multiline ? rows : undefined}
          className={`${baseInputStyle} ${borderClass} ${iconPadding} ${className}`}
          {...props}
        />
      </div>
      {error ? (
        <p className="text-xs font-medium text-[#DC2626] mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#6B7280] mt-1">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
