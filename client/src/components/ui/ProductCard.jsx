/**
 * src/components/ui/ProductCard.jsx
 *
 * Reusable product card - Premium SaaS styling.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Package, CheckCircle, XCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

function ProductCard({ product, onEdit, onDelete, showActions = false }) {
  const {
    _id,
    title,
    category,
    pricePerMeter,
    minOrderQuantity,
    stock,
    images,
    supplier,
    isActive,
    fabric,
    gsm,
  } = product;

  const primaryImage = images && images.length > 0 ? images[0] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col rounded-3xl overflow-hidden hover-lift bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* ── Image ─────────────────────────────────────────────────────── */}
      <Link to={`/products/${_id}`} className="block relative overflow-hidden aspect-[4/3] bg-[var(--color-bg)]">
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={40} className="text-[var(--color-muted)] opacity-30" />
          </div>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-black shadow-sm">
          {category}
        </span>

        {/* Stock badge */}
        {!isActive && (
          <span className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/90 backdrop-blur-md text-white shadow-sm">
            Inactive
          </span>
        )}
        {isActive && stock === 0 && (
          <span className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/90 backdrop-blur-md text-white shadow-sm">
            Out of Stock
          </span>
        )}
      </Link>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title */}
        <Link
          to={`/products/${_id}`}
          className="font-bold text-[15px] leading-snug line-clamp-2 text-[var(--color-text)] transition-colors group-hover:text-[var(--color-brand-secondary)]"
        >
          {title}
        </Link>

        {/* Meta row */}
        <div className="flex flex-wrap gap-2 text-xs font-medium text-[var(--color-muted)]">
          {fabric && <span className="bg-[var(--color-bg)] px-2 py-1 rounded-md">{fabric}</span>}
          {gsm && <span className="bg-[var(--color-bg)] px-2 py-1 rounded-md">{gsm} GSM</span>}
        </div>

        {/* Supplier */}
        {supplier && (
          <p className="text-xs text-[var(--color-muted)] font-medium">
            by <span className="text-[var(--color-text)]">{supplier.companyName || supplier.name}</span>
          </p>
        )}

        {/* Price + MOQ */}
        <div className="mt-auto pt-4 flex items-end justify-between gap-2 border-t border-[var(--color-border)]">
          <div>
            <p className="text-lg font-extrabold text-[var(--color-text)] tracking-tight">
              {formatCurrency(pricePerMeter)}<span className="text-xs font-semibold text-[var(--color-muted)]">/m</span>
            </p>
            <p className="text-[11px] font-medium text-[var(--color-muted)] mt-0.5">
              MOQ: {minOrderQuantity} m
            </p>
          </div>

          {/* Stock indicator */}
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            {stock > 0 ? (
              <CheckCircle size={14} className="text-[#0070F3]" />
            ) : (
              <XCircle size={14} className="text-red-400" />
            )}
            <span className="text-[var(--color-text)]">
              {stock > 0 ? `${stock} m` : 'Out of stock'}
            </span>
          </div>
        </div>

        {/* ── Supplier action buttons ────────────────────────────────── */}
        {showActions && (
          <div className="flex gap-2 pt-4 border-t border-[var(--color-border)]">
            <button
              onClick={() => onEdit && onEdit(product)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all bg-[var(--color-bg)] hover:bg-[var(--color-border)] text-[var(--color-text)]"
              aria-label={`Edit ${title}`}
            >
              <Edit2 size={14} />
              Edit
            </button>
            <button
              onClick={() => onDelete && onDelete(product)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all bg-red-50 hover:bg-red-100 text-red-600"
              aria-label={`Delete ${title}`}
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ProductCard;
