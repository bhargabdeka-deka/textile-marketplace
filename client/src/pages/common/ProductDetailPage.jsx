/**
 * src/pages/common/ProductDetailPage.jsx
 *
 * Full product detail page — public, accessible to all users.
 * SaaS Premium Styling.
 */

import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, Package, CheckCircle, XCircle,
  User, Calendar, Tag, Layers, ShoppingCart, Info, Minus, Plus
} from 'lucide-react';
import useProductStore from '@/store/productStore';
import useCartStore from '@/store/cartStore';
import useAuthStore from '@/store/authStore';
import toast from 'react-hot-toast';
import Loading from '@/components/ui/Loading';
import { formatCurrency, formatDate, optimizeCloudinaryUrl } from '@/utils/formatters';

function ProductDetailPage() {
  const { id }                                    = useParams();
  const navigate                                  = useNavigate();
  const { currentProduct, productLoading, fetchProductById } = useProductStore();
  const { addItem }                               = useCartStore();
  const { isAuthenticated, user }                 = useAuthStore();
  const [activeImage, setActiveImage]             = useState(0);
  const [quantity, setQuantity]                   = useState(1);

  useEffect(() => {
    fetchProductById(id);
    setActiveImage(0);
    window.scrollTo(0, 0);
  }, [id, fetchProductById]);

  useEffect(() => {
    if (currentProduct) {
      setQuantity(currentProduct.minOrderQuantity || 1);
    }
  }, [currentProduct]);

  const handleAddToCart = async () => {
    if (!isAuthenticated || user?.role !== 'buyer') {
      toast.error('Please login as a buyer to add items to cart.');
      navigate('/login');
      return;
    }
    if (quantity < currentProduct.minOrderQuantity) {
      toast.error(`Minimum order quantity is ${currentProduct.minOrderQuantity}`);
      return;
    }
    if (quantity > currentProduct.stock) {
      toast.error(`Only ${currentProduct.stock} available in stock`);
      return;
    }
    await addItem(currentProduct, quantity);
  };

  if (productLoading) {
    return <Loading variant="page" message="Loading product…" />;
  }

  if (!currentProduct) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4 bg-gray-50 min-h-[85vh] font-sans">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-6">
          <Info size={32} className="text-gray-500" />
        </div>
        <p className="text-2xl font-bold mb-3 text-gray-900">
          Product not found
        </p>
        <p className="text-base font-medium text-gray-500 mb-8 max-w-sm">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/products"
          className="px-6 py-3.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors"
        >
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const {
    title, description, category, fabric, gsm, pricePerMeter,
    minOrderQuantity, stock, images, supplier, tags, color, width,
    isActive, createdAt,
  } = currentProduct;

  const specs = [
    { label: 'Category',       value: category },
    { label: 'Fabric',         value: fabric },
    { label: 'GSM',            value: gsm ? `${gsm} g/m²` : null },
    { label: 'Color',          value: color },
    { label: 'Width',          value: width ? `${width} cm` : null },
    { label: 'Min. Order',     value: `${minOrderQuantity} metres` },
    { label: 'Stock',          value: `${stock} metres` },
    { label: 'Listed on',      value: formatDate(createdAt) },
  ].filter((s) => s.value);

  return (
    <div className="bg-gray-50 min-h-[85vh] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Breadcrumb ─────────────────────────────────────────────── */}
        <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-gray-500 mb-10">
          <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link to="/products" className="hover:text-gray-900 transition-colors">Marketplace</Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link to={`/products?category=${category}`} className="hover:text-gray-900 transition-colors px-2.5 py-1 rounded-md bg-gray-200">{category}</Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="line-clamp-1 max-w-[200px] text-gray-900">{title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Left: Image Gallery ──────────────────────────────────── */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-white border border-gray-200 relative group shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  {images && images[activeImage] ? (
                    <img
                      src={optimizeCloudinaryUrl(images[activeImage], 1200)}
                      alt={`${title} image ${activeImage + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={64} className="text-gray-300" />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail strip */}
            {images && images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-200 border-2 ${
                      idx === activeImage
                        ? 'border-blue-600 opacity-100 shadow-sm'
                        : 'border-transparent opacity-60 hover:opacity-100 bg-white shadow-sm'
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={optimizeCloudinaryUrl(src, 200)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Product Info ──────────────────────────────────── */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-gray-900 text-white shadow-sm">
                {category}
              </span>
              {!isActive && (
                <span className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 shadow-sm">
                  Inactive
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
              {title}
            </h1>

            {/* Price */}
            <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-200">
              <span className="text-4xl lg:text-5xl font-extrabold tracking-tight text-blue-600">
                {formatCurrency(pricePerMeter)}
              </span>
              <span className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">per metre</span>
            </div>

            {/* Description */}
            <p className="text-base font-medium leading-relaxed text-gray-600 mb-8">
              {description}
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {specs.map(({ label, value }) => (
                <div key={label} className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">
                    {label}
                  </p>
                  <p className="text-sm font-bold text-gray-900 truncate" title={value}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/products?search=${encodeURIComponent(tag)}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors shadow-sm"
                  >
                    <Tag size={12} />
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* ── Add to Cart Action ──────────────────────────────────── */}
            <div className="mt-auto pt-6 border-t border-gray-200">
              {/* Stock status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {stock > 0 ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-[#16A34A] bg-emerald-50 border border-emerald-200">
                      <CheckCircle size={14} />
                      In Stock ({stock}m available)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-red-600 bg-red-50 border border-red-200">
                      <XCircle size={14} />
                      Out of Stock
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold text-gray-500">
                  MOQ: {minOrderQuantity}m
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center justify-between border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm h-[52px] w-full sm:w-36">
                  <button
                    onClick={() => setQuantity(Math.max(minOrderQuantity || 1, quantity - 1))}
                    disabled={quantity <= (minOrderQuantity || 1)}
                    className="px-4 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <input 
                    type="number" 
                    min={minOrderQuantity || 1} 
                    max={stock}
                    value={quantity}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= (minOrderQuantity || 1) && val <= stock) setQuantity(val);
                    }}
                    className="w-12 h-full text-center text-sm font-bold outline-none bg-transparent text-gray-900" 
                  />
                  <button
                    onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                    disabled={quantity >= stock}
                    className="px-4 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  disabled={stock <= 0}
                  className="flex-1 h-[52px] flex items-center justify-center gap-2 rounded-xl font-bold text-sm transition-all disabled:opacity-70 shadow-sm bg-blue-600 text-white hover:bg-blue-700 disabled:hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Supplier card */}
            {supplier && (
              <div className="mt-8 p-5 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {supplier.avatar ? (
                    <img src={optimizeCloudinaryUrl(supplier.avatar, 200)} alt={supplier.name} className="w-12 h-12 rounded-xl object-cover border border-gray-200 shadow-sm" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200 shadow-sm">
                      <User size={20} className="text-gray-400" />
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">
                      Verified Supplier
                    </p>
                    <p className="font-bold text-[15px] text-gray-900">
                      {supplier.companyName || supplier.name}
                    </p>
                    {supplier.address?.city && (
                      <p className="text-xs font-medium text-gray-500 mt-0.5">
                        {supplier.address.city}, {supplier.address.state || supplier.address.country}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
