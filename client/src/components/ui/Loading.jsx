/**
 * src/components/ui/Loading.jsx
 *
 * Reusable loading spinner component.
 * Three display modes:
 *  - "spinner" (default) — animated ring
 *  - "page"              — full viewport overlay
 *  - "inline"            — small inline indicator
 */

import { motion } from 'framer-motion';

const SIZE_MAP = {
  sm: { ring: 18, border: 2 },
  md: { ring: 32, border: 2.5 },
  lg: { ring: 48, border: 3 },
};

function Spinner({ size = 'md', color = 'var(--color-brand-secondary)' }) {
  const { ring, border } = SIZE_MAP[size] || SIZE_MAP.md;

  return (
    <motion.div
      aria-label="Loading"
      role="status"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
      style={{
        width: ring,
        height: ring,
        borderRadius: '50%',
        border: `${border}px solid var(--color-border)`,
        borderTopColor: color,
        flexShrink: 0,
      }}
    />
  );
}

function Loading({ variant = 'spinner', size = 'md', message, color }) {
  if (variant === 'page') {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-[var(--color-surface)]/80 backdrop-blur-md"
        aria-live="polite"
        aria-label={message || 'Loading page'}
      >
        <Spinner size="lg" color={color} />
        {message && (
          <p className="text-sm font-medium text-[var(--color-text-secondary)]">
            {message}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <span className="inline-flex items-center gap-2" aria-label={message || 'Loading'}>
        <Spinner size="sm" color={color} />
        {message && <span className="text-sm font-medium text-[var(--color-text-secondary)]">{message}</span>}
      </span>
    );
  }

  // Default: centered spinner
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12" aria-live="polite">
      <Spinner size={size} color={color} />
      {message && (
        <p className="text-sm font-medium text-[var(--color-text-secondary)]">
          {message}
        </p>
      )}
    </div>
  );
}

export default Loading;
