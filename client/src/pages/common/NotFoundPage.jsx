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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gray-50 font-sans">
      {/* Animated 404 number */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="mb-8"
      >
        <span
          className="text-9xl font-black select-none text-blue-50"
          style={{
            WebkitTextStroke: `2px #2563EB`, // blue-600
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
        className="mb-6 p-4 rounded-2xl bg-blue-50"
      >
        <Search size={32} className="text-blue-600" />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-3 text-gray-900">
          Page Not Found
        </h1>
        <p className="text-sm max-w-sm mb-8 leading-relaxed text-gray-500 font-medium">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:bg-blue-700 bg-blue-600 text-white shadow-sm hover:scale-105"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;
