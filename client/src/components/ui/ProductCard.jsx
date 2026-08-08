/**
 * src/components/ui/ProductCard.jsx
 *
 * Amazon Business / Stripe B2B Product Card.
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
import { formatCurrency, optimizeCloudinaryUrl } from '@/utils/formatters';

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

  // Fallback high-resolution fabric image based on category or title
  const getFallbackImage = () => {
    const cat = (category || title || '').toLowerCase();
    if (cat.includes('silk') || cat.includes('satin')) return '/images/silk_satin.png';
    if (cat.includes('linen')) return '/images/linen_fabric.png';
    if (cat.includes('print') || cat.includes('craft') || cat.includes('ajrakh')) return '/images/printed_craft.png';
    return '/images/cotton_fabric.png';
  };

  const imageSrc = primaryImage ? optimizeCloudinaryUrl(primaryImage, 600) : getFallbackImage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="group relative flex flex-col h-full bg-white rounded-2xl border border-[#E5E7EB] shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-150 overflow-hidden"
    >
      {/* ── 1. Image Showcase Header ───────────────────────────────────── */}
      <div className="relative overflow-hidden aspect-[4/3] bg-[#FAFBFC] border-b border-[#EEF2F7]">
        <Link to={`/products/${_id}`} className="block w-full h-full">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </Link>

        {/* Category Badge (Top Left) */}
        {category && (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#111827]/90 text-white shadow-sm">
            {category}
          </span>
        )}

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite((prev) => !prev);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${
            isFavorite
              ? 'bg-rose-50 border border-rose-200 text-rose-600'
              : 'bg-white/90 border border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
          }`}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart size={15} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2} />
        </button>

        {/* Status Badges */}
        {!isActive && (
          <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md text-xs font-medium bg-red-600 text-white shadow-sm">
            Inactive Listing
          </span>
        )}
        {isActive && stock === 0 && (
          <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-600 text-white shadow-sm">
            Out of Stock
          </span>
        )}
      </div>

      {/* ── 2. Card Content Body ───────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        
        {/* Supplier Info & Verified Badge */}
        <div className="flex items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-1.5 min-w-0 text-[#6B7280]">
            <Building2 size={14} className="shrink-0 text-[#6B7280]" />
            <span className="truncate font-medium text-[#374151] text-xs">
              {supplierName}
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-xs font-medium text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
            <ShieldCheck size={13} className="shrink-0 text-[#16A34A]" />
            <span>Verified</span>
          </div>
        </div>

        {/* Product Title */}
        <Link
          to={`/products/${_id}`}
          className="font-semibold text-sm leading-snug line-clamp-2 text-[#111827] hover:text-[#2563EB] transition-colors"
        >
          {title}
        </Link>

        {/* Specification Chips */}
        {(fabric || gsm) && (
          <div className="flex flex-wrap gap-1.5 text-xs text-[#6B7280]">
            {fabric && (
              <span className="bg-[#FAFBFC] px-2 py-0.5 rounded-md border border-[#E5E7EB]">
                {fabric}
              </span>
            )}
            {gsm && (
              <span className="bg-[#FAFBFC] px-2 py-0.5 rounded-md border border-[#E5E7EB]">
                {gsm} GSM
              </span>
            )}
          </div>
        )}

        {/* ── 3. Pricing & MOQ Box ─────────────────────────────────────── */}
        <div className="mt-auto pt-3 border-t border-[#EEF2F7] flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-semibold tracking-tight text-[#111827]">
                {formatCurrency(pricePerMeter)}
              </span>
              <span className="text-xs text-[#6B7280]">/ m</span>
            </div>
            <p className="text-xs text-[#6B7280] mt-0.5">
              MOQ: <span className="text-[#111827] font-medium">{minOrderQuantity} m</span>
            </p>
          </div>

          {/* Stock Indicator */}
          <div className="flex items-center gap-1 text-xs shrink-0">
            {stock > 0 ? (
              <span className="flex items-center gap-1 text-[#16A34A] bg-emerald-50 px-2 py-1 rounded-md text-xs font-medium">
                <CheckCircle2 size={12} />
                In Stock ({stock}m)
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-md text-xs font-medium">
                <XCircle size={12} />
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
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-medium bg-white border border-[#E5E7EB] hover:border-gray-300 hover:bg-gray-50 text-[#111827] transition-colors shadow-sm"
            >
              <span>View Details</span>
              <ArrowUpRight size={14} className="text-[#6B7280]" />
            </Link>
          ) : (
            <div className="w-full flex gap-2">
              <button
                type="button"
                onClick={() => onEdit && onEdit(product)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium bg-white hover:bg-gray-50 text-[#111827] border border-[#E5E7EB] transition-colors shadow-sm"
                aria-label={`Edit ${title}`}
              >
                <Edit2 size={14} className="text-[#6B7280]" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete && onDelete(product)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium bg-white hover:bg-red-50 text-red-600 border border-[#E5E7EB] hover:border-red-200 transition-colors shadow-sm"
                aria-label={`Delete ${title}`}
              >
                <Trash2 size={14} />
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
