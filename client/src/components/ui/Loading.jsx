/**
 * src/components/ui/Loading.jsx
 *
 * Reusable loading spinner component.
 * Three display modes:
 *  - "spinner" (default) — animated ring
 *  - "page"              — full viewport overlay
 *  - "inline"            — small inline indicator
 *
 * Props:
 *  - variant:  'spinner' | 'page' | 'inline'
 *  - size:     'sm' | 'md' | 'lg'
 *  - message:  optional loading text
 *  - color:    CSS color string (defaults to brand primary)
 */

import { motion } from 'framer-motion';

const SIZE_MAP = {
  sm: { ring: 20, border: 2 },
  md: { ring: 36, border: 3 },
  lg: { ring: 56, border: 4 },
};

function Spinner({ size = 'md', color = 'var(--color-brand-primary)' }) {
  const { ring, border } = SIZE_MAP[size] || SIZE_MAP.md;

  return (
    <motion.div
      aria-label="Loading"
      role="status"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
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
        className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4"
        style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)' }}
        aria-live="polite"
        aria-label={message || 'Loading page'}
      >
        <Spinner size="lg" color={color} />
        {message && (
          <p className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>
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
        {message && <span className="text-sm" style={{ color: 'var(--color-muted)' }}>{message}</span>}
      </span>
    );
  }

  // Default: centered spinner
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12" aria-live="polite">
      <Spinner size={size} color={color} />
      {message && (
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Loading;
