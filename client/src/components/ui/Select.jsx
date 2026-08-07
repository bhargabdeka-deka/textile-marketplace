import React from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Reusable Select Component — Stripe Checkout Design System.
 */
const Select = React.forwardRef(({
  label,
  error,
  helperText,
  options = [],
  className = '',
  id,
  placeholder = 'Select an option',
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const isError = Boolean(error);

  const baseSelectStyle = 'w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#111827] outline-none transition-all duration-150 shadow-xs appearance-none';
  const normalBorder = 'border-[#E5E7EB] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 hover:border-gray-300';
  const errorBorder = 'border-[#DC2626] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/15 hover:border-[#DC2626]';
  
  const borderClass = isError ? errorBorder : normalBorder;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-[#111827]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={`${baseSelectStyle} ${borderClass} ${className}`}
          {...props}
        >
          <option value="" disabled className="text-[#6B7280]">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]">
          <ChevronDown size={16} />
        </div>
      </div>
      {error ? (
        <p className="text-xs font-medium text-[#DC2626] mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#6B7280] mt-1">{helperText}</p>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
