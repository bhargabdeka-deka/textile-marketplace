import React from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Reusable Select Dropdown Component — Stripe/Linear Design System.
 */
const Select = React.forwardRef(({
  label,
  error,
  options = [],
  className = '',
  id,
  children,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const isError = Boolean(error);
  const errorClass = isError ? 'ui-select-error' : '';

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-wider"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={`ui-select appearance-none pr-10 ${errorClass} ${className}`}
          {...props}
        >
          {children || options.map((opt) => {
            const value = typeof opt === 'object' ? opt.value : opt;
            const optionLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={value} value={value}>
                {optionLabel}
              </option>
            );
          })}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none">
          <ChevronDown size={16} />
        </div>
      </div>
      {error && (
        <p className="text-xs font-medium text-[var(--color-error-text)] mt-1">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
