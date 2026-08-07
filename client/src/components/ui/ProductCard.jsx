/**
 * src/components/ui/ProductCard.jsx
 *
 * Amazon Business / Alibaba B2B Product Card.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Edit2,
  Trash2,
  Package,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Heart,
  ArrowUpRight,
  Building2
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

function ProductCard({ product, onEdit, onDelete, showActions = false }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    _id,
    title,
    category,
    pricePerMeter,
    minOrderQuantity,
    stock,
    images,
    supplier,
    isActive = true,
    fabric,
    gsm,
  } = product || {};

  const primaryImage = images && images.length > 0 ? images[0] : null;
  const supplierName = supplier?.companyName || supplier?.name || 'Verified Mill';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden"
    >
      {/* ── 1. Image Showcase Header ───────────────────────────────────── */}
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
        <Link to={`/products/${_id}`} className="block w-full h-full">
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
              <Package size={36} strokeWidth={1.5} className="opacity-40" />
              <span className="text-xs font-semibold">No Image Preview</span>
            </div>
          )}
        </Link>

        {/* Category Badge (Top Left) */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-700">
          {category}
        </span>

        {/* Favorite Heart Button (Top Right Placeholder) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite((prev) => !prev);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm backdrop-blur-md ${
            isFavorite
              ? 'bg-rose-500 text-white scale-110'
              : 'bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 hover:scale-110'
          }`}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart size={15} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2} />
        </button>

        {/* Status Badges */}
        {!isActive && (
          <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500 text-white shadow-sm">
            Inactive Listing
          </span>
        )}
        {isActive && stock === 0 && (
          <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500 text-white shadow-sm">
            Out of Stock
          </span>
        )}
      </div>

      {/* ── 2. Card Content Body ───────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">
        
        {/* Supplier Info & Verified Badge (Alibaba Style) */}
        <div className="flex items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-1.5 min-w-0 text-slate-600 dark:text-slate-400 font-medium">
            <Building2 size={13} className="shrink-0 text-slate-400" />
            <span className="truncate font-semibold text-slate-900 dark:text-slate-200">
              {supplierName}
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 shrink-0">
            <ShieldCheck size={12} className="shrink-0 text-emerald-500" />
            <span>Verified</span>
          </div>
        </div>

        {/* Product Title */}
        <Link
          to={`/products/${_id}`}
          className="font-bold text-sm sm:text-[15px] leading-snug line-clamp-2 text-slate-900 dark:text-white transition-colors group-hover:text-[#0070F3]"
        >
          {title}
        </Link>

        {/* Specification Chips */}
        <div className="flex flex-wrap gap-1.5 text-[11px] font-medium text-slate-600 dark:text-slate-400">
          {fabric && (
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700">
              {fabric}
            </span>
          )}
          {gsm && (
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700">
              {gsm} GSM
            </span>
          )}
        </div>

        {/* ── 3. Pricing & MOQ Box (Amazon Business Style) ─────────────── */}
        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">
                {formatCurrency(pricePerMeter)}
              </span>
              <span className="text-xs font-semibold text-slate-500">/ meter</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              MOQ: <span className="text-slate-900 dark:text-slate-200 font-bold">{minOrderQuantity} m</span>
            </p>
          </div>

          {/* Stock Indicator */}
          <div className="flex items-center gap-1 text-xs font-bold shrink-0">
            {stock > 0 ? (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 rounded text-[11px]">
                <CheckCircle2 size={13} />
                In Stock ({stock}m)
              </span>
            ) : (
              <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2 py-1 rounded text-[11px]">
                <XCircle size={13} />
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* ── 4. Quick Action Buttons ──────────────────────────────────── */}
        <div className="pt-2 flex items-center gap-2">
          {!showActions ? (
            <Link
              to={`/products/${_id}`}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-extrabold bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm"
            >
              <span>View Details</span>
              <ArrowUpRight size={14} />
            </Link>
          ) : (
            <div className="w-full flex gap-2">
              <button
                type="button"
                onClick={() => onEdit && onEdit(product)}
                className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 transition-all"
                aria-label={`Edit ${title}`}
              >
                <Edit2 size={13} />
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete && onDelete(product)}
                className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl text-xs font-bold bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 transition-all"
                aria-label={`Delete ${title}`}
              >
                <Trash2 size={13} />
                Delete
              </button>
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}

export default ProductCard;
