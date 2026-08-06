/**
 * src/pages/common/NotFoundPage.jsx
 *
 * 404 error page — shown when no route matches.
 * Features a Framer Motion animation and a link back to home.
 */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';

function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Animated 404 number */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="mb-8"
      >
        <span
          className="text-9xl font-bold select-none"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-brand-accent)',
            WebkitTextStroke: `2px var(--color-brand-primary)`,
          }}
        >
          404
        </span>
      </motion.div>

      {/* Icon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 p-4 rounded-2xl"
        style={{ backgroundColor: 'var(--color-brand-accent)' }}
      >
        <Search size={32} style={{ color: 'var(--color-brand-primary)' }} />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
        >
          Page Not Found
        </h1>
        <p className="text-sm max-w-sm mb-8 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: 'var(--color-brand-primary)',
            color: '#ffffff',
          }}
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;
