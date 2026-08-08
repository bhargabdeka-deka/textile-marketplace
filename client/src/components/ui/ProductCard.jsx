/**
 * src/components/ui/ProductCard.jsx
 *
 * Traditional Indian B2B Textile Product Card — Fabcurate Inspired.
 * Includes fail-safe image error fallbacks for uploaded products.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Edit2,
  Trash2,
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
  const [imageError, setImageError] = useState(false);

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

  // Fallback high-resolution fabric image prioritizing print/pattern over material
  const getFallbackImage = () => {
    const text = `${title || ''} ${category || ''} ${fabric || ''}`.toLowerCase();
    if (text.includes('print') || text.includes('craft') || text.includes('ajrakh') || text.includes('block') || text.includes('printed')) {
      return '/images/printed_craft.png';
    }
    if (text.includes('silk') || text.includes('satin')) {
      return '/images/silk_satin.png';
    }
    if (text.includes('linen')) {
      return '/images/linen_fabric.png';
    }
    return '/images/cotton_fabric.png';
  };

  // Helper to format image URLs (supports Cloudinary, local server uploads, and absolute URLs)
  const getFormattedImageSrc = () => {
    if (imageError || !primaryImage) {
      return getFallbackImage();
    }
    // If image URL is a local relative upload path
    if (primaryImage.startsWith('/uploads/') || primaryImage.startsWith('uploads/')) {
      const backendBase = import.meta.env.VITE_API_URL
        ? import.meta.env.VITE_API_URL.replace('/api', '')
        : 'https://textile-marketplace-api.onrender.com';
      const cleanPath = primaryImage.startsWith('/') ? primaryImage : `/${primaryImage}`;
      return `${backendBase}${cleanPath}`;
    }
    // If image URL points to local localhost server from dev DB seeding
    if (primaryImage.includes('localhost:5000')) {
      return primaryImage.replace('http://localhost:5000', 'https://textile-marketplace-api.onrender.com');
    }
    return optimizeCloudinaryUrl(primaryImage, 600);
  };

  const imageSrc = getFormattedImageSrc();

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="group relative flex flex-col h-full bg-white rounded-2xl border border-[#E7E2D7] shadow-xs hover:shadow-md hover:border-[#7B8B30] transition-all duration-150 overflow-hidden"
    >
      {/* ── 1. Image Showcase Header ───────────────────────────────────── */}
      <div className="relative overflow-hidden aspect-[4/3] bg-[#FAF8F5] border-b border-[#E7E2D7]">
        <Link to={`/products/${_id}`} className="block w-full h-full">
          <img
            src={imageSrc}
            alt={title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </Link>

        {/* Category Badge (Top Left) */}
        {category && (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#1C1917] text-[#FAF8F5] shadow-sm">
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
              : 'bg-white/90 border border-[#E7E2D7] text-[#78716C] hover:text-[#1C1917]'
          }`}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart size={15} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2} />
        </button>

        {/* Status Badges */}
        {!isActive && (
          <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-red-700 text-white shadow-sm">
            Inactive Listing
          </span>
        )}
        {isActive && stock === 0 && (
          <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-700 text-white shadow-sm">
            Out of Stock
          </span>
        )}
      </div>

      {/* ── 2. Card Content Body ───────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        
        {/* Supplier Info & Verified Badge */}
        <div className="flex items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-1.5 min-w-0 text-[#78716C]">
            <Building2 size={14} className="shrink-0 text-[#7B8B30]" />
            <span className="truncate font-semibold text-[#1C1917] text-xs">
              {supplierName}
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-xs font-bold text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
            <ShieldCheck size={13} className="shrink-0 text-[#16A34A]" />
            <span>Audited</span>
          </div>
        </div>

        {/* Product Title */}
        <Link
          to={`/products/${_id}`}
          className="font-bold text-sm leading-snug line-clamp-2 text-[#1C1917] font-serif-display group-hover:text-[#7B8B30] transition-colors"
        >
          {title}
        </Link>

        {/* Specification Chips */}
        {(fabric || gsm) && (
          <div className="flex flex-wrap gap-1.5 text-xs text-[#78716C]">
            {fabric && (
              <span className="bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#E7E2D7] font-medium">
                {fabric}
              </span>
            )}
            {gsm && (
              <span className="bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#E7E2D7] font-medium">
                {gsm} GSM
              </span>
            )}
          </div>
        )}

        {/* ── 3. Pricing & MOQ Box ─────────────────────────────────────── */}
        <div className="mt-auto pt-3 border-t border-[#E7E2D7] flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#7B8B30]">
                {formatCurrency(pricePerMeter)}
              </span>
              <span className="text-xs text-[#78716C] font-medium">/ m</span>
            </div>
            <p className="text-xs text-[#78716C] mt-0.5">
              MOQ: <span className="text-[#1C1917] font-bold">{minOrderQuantity} m</span>
            </p>
          </div>

          {/* Stock Indicator */}
          <div className="flex items-center gap-1 text-xs shrink-0">
            {stock > 0 ? (
              <span className="flex items-center gap-1 text-[#16A34A] bg-emerald-50 px-2 py-1 rounded-md text-xs font-semibold">
                <CheckCircle2 size={12} />
                In Stock
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-700 bg-red-50 px-2 py-1 rounded-md text-xs font-semibold">
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
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#FAF8F5] border border-[#E7E2D7] hover:bg-[#7B8B30] hover:text-white text-[#1C1917] transition-all shadow-xs"
            >
              <span>View Specs & Swatch</span>
              <ArrowUpRight size={14} />
            </Link>
          ) : (
            <div className="w-full flex gap-2">
              <button
                type="button"
                onClick={() => onEdit && onEdit(product)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-[#FAF8F5] text-[#1C1917] border border-[#E7E2D7] transition-colors shadow-xs"
                aria-label={`Edit ${title}`}
              >
                <Edit2 size={14} className="text-[#7B8B30]" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete && onDelete(product)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-red-50 text-red-700 border border-[#E7E2D7] hover:border-red-200 transition-colors shadow-xs"
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
