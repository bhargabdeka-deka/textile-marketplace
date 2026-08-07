import React from 'react';

/**
 * Reusable Input & Textarea Component — Stripe/Linear Design System.
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

  const baseInputClass = multiline ? 'ui-textarea' : 'ui-input';
  const errorClass = isError ? (multiline ? 'ui-textarea-error' : 'ui-input-error') : '';
  const iconPadding = Icon ? 'pl-10' : '';

  const Component = multiline ? 'textarea' : 'input';

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-wider"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && !multiline && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none">
            <Icon size={16} />
          </div>
        )}
        <Component
          ref={ref}
          id={inputId}
          type={multiline ? undefined : type}
          rows={multiline ? rows : undefined}
          className={`${baseInputClass} ${errorClass} ${iconPadding} ${className}`}
          {...props}
        />
      </div>
      {error ? (
        <p className="text-xs font-medium text-[var(--color-error-text)] mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[var(--color-text-muted)] mt-1">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
