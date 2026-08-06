/**
 * src/pages/common/MarketplacePage.jsx
 *
 * Public marketplace — browse, search, and filter all active products.
 * SaaS Premium Styling.
 */

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, Sparkles, AlertCircle } from 'lucide-react';
import useProductStore from '@/store/productStore';
import ProductCard from '@/components/ui/ProductCard';
import Skeleton from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import productService from '@/services/product.service';

const SORT_OPTIONS = [
  { value: 'newest',     label: 'Newest First' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc',   label: 'Name: A–Z' },
];

function MarketplacePage() {
  const {
    products, total, currentPage, totalPages, isLoading, filters,
    setFilter, resetFilters, fetchProducts, setPage,
  } = useProductStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch]   = useState(filters.search || '');
  const [showFilters, setShowFilters]   = useState(false);
  const [categories, setCategories]     = useState([]);
  
  // AI Search states
  const [isAISearch, setIsAISearch]     = useState(false);
  const [aiQuery, setAiQuery]           = useState('');
  
  const handleAISubmit = () => {
    if (aiQuery.trim()) {
      useProductStore.getState().aiSearch(aiQuery);
    }
  };

  useEffect(() => {
    productService.getCategories()
      .then((res) => setCategories(res.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setFilter({ category: cat });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchProducts();
  }, [filters, currentPage, fetchProducts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.search) {
        setFilter({ search: localSearch });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCategoryChange = (cat) => {
    setFilter({ category: cat });
    const params = new URLSearchParams(searchParams);
    if (cat) params.set('category', cat); else params.delete('category');
    setSearchParams(params, { replace: true });
  };

  const handleReset = () => {
    setLocalSearch('');
    resetFilters();
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters =
    filters.search || filters.category || filters.minPrice ||
    filters.maxPrice || filters.inStock;

  return (
    <div className="bg-[var(--color-bg)] min-h-[85vh]">
      {/* ── Hero bar ──────────────────────────────────────────────────── */}
      <div className="relative py-16 px-4 bg-black text-white border-b border-[#333] overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-brand-secondary)] opacity-10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Textile Marketplace
          </h1>
          <p className="text-[#a1a1aa] font-medium mb-10 max-w-lg">
            {total > 0 ? `Explore ${total.toLocaleString()} premium textiles from verified suppliers.` : 'Discover premium textiles for your next project.'}
          </p>

          {/* Search bar */}
          <div className="relative w-full max-w-3xl">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer z-10" onClick={() => setIsAISearch(!isAISearch)} title="Toggle AI Search">
              {isAISearch ? (
                <Sparkles size={20} className="text-[#0070F3] animate-pulse" />
              ) : (
                <Search size={20} className="text-gray-400" />
              )}
            </div>
            
            <div className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${isAISearch ? 'shadow-[0_0_0_2px_rgba(0,112,243,0.5),0_10px_30px_rgba(0,112,243,0.15)]' : 'shadow-xl'}`}>
              {isAISearch && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#0070F3]/10 to-transparent pointer-events-none" />
              )}
              <input
                id="marketplace-search"
                type="search"
                value={isAISearch ? aiQuery : localSearch}
                onChange={(e) => {
                  if (isAISearch) setAiQuery(e.target.value);
                  else setLocalSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && isAISearch && aiQuery.trim()) {
                    handleAISubmit();
                  }
                }}
                placeholder={isAISearch ? "E.g., Find me breathable cotton for summer shirts..." : "Search fabrics, categories, suppliers…"}
                className={`w-full pl-12 pr-28 py-5 text-base outline-none transition-all duration-300 ${isAISearch ? 'bg-[#111] text-white placeholder-gray-500' : 'bg-white text-black placeholder-gray-400'}`}
              />
            </div>
            
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
              {isAISearch ? (
                <button
                  onClick={handleAISubmit}
                  className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors bg-[#0070F3] text-white hover:bg-[#0050d4] shadow-sm"
                >
                  <Sparkles size={14} /> AI Search
                </button>
              ) : (
                <button
                  onClick={() => setIsAISearch(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  <Sparkles size={14} /> Ask AI
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-colors ${
                showFilters 
                  ? 'border-black bg-black text-white shadow-md' 
                  : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#0070F3]" />
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-[var(--color-muted)] hover:text-black transition-colors"
              >
                <X size={16} />
                Clear
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={filters.sort}
              onChange={(e) => setFilter({ sort: e.target.value })}
              className="appearance-none pl-4 pr-10 py-2.5 rounded-xl text-sm font-bold border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] outline-none hover:bg-gray-50 cursor-pointer shadow-sm transition-colors"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronLeft size={14} className="rotate-[-90deg] text-gray-400" />
            </div>
          </div>
        </div>

        {/* Filter panel (Glassmorphism inspired) */}
        {showFilters && (
          <div className="mb-8 p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category */}
            <div>
              <label className="block text-xs font-bold mb-3 uppercase tracking-wider text-[var(--color-muted)]">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm font-medium border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] outline-none focus:border-black transition-colors"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Min price */}
            <div>
              <label className="block text-xs font-bold mb-3 uppercase tracking-wider text-[var(--color-muted)]">
                Min Price (₹/m)
              </label>
              <input
                type="number"
                min={0}
                value={filters.minPrice}
                onChange={(e) => setFilter({ minPrice: e.target.value })}
                placeholder="0"
                className="w-full px-4 py-3 rounded-xl text-sm font-medium border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] outline-none focus:border-black transition-colors"
              />
            </div>

            {/* Max price */}
            <div>
              <label className="block text-xs font-bold mb-3 uppercase tracking-wider text-[var(--color-muted)]">
                Max Price (₹/m)
              </label>
              <input
                type="number"
                min={0}
                value={filters.maxPrice}
                onChange={(e) => setFilter({ maxPrice: e.target.value })}
                placeholder="Any"
                className="w-full px-4 py-3 rounded-xl text-sm font-medium border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] outline-none focus:border-black transition-colors"
              />
            </div>

            {/* Availability */}
            <div className="flex flex-col justify-center">
              <label className="block text-xs font-bold mb-3 uppercase tracking-wider text-[var(--color-muted)]">
                Availability
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-gray-100 transition-colors">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilter({ inStock: e.target.checked })}
                    className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded cursor-pointer checked:bg-black checked:border-black transition-colors"
                  />
                  <div className="absolute pointer-events-none text-white opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all duration-200">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                </div>
                <span className="text-sm font-bold text-[var(--color-text)]">In stock only</span>
              </label>
            </div>
          </div>
        )}

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.category && (
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-gray-200 shadow-sm text-black">
                {filters.category}
                <button onClick={() => handleCategoryChange('')} className="text-gray-400 hover:text-black"><X size={14} /></button>
              </span>
            )}
            {filters.minPrice && (
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-gray-200 shadow-sm text-black">
                Min ₹{filters.minPrice}
                <button onClick={() => setFilter({ minPrice: '' })} className="text-gray-400 hover:text-black"><X size={14} /></button>
              </span>
            )}
            {filters.maxPrice && (
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-gray-200 shadow-sm text-black">
                Max ₹{filters.maxPrice}
                <button onClick={() => setFilter({ maxPrice: '' })} className="text-gray-400 hover:text-black"><X size={14} /></button>
              </span>
            )}
            {filters.inStock && (
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-gray-200 shadow-sm text-black">
                In stock
                <button onClick={() => setFilter({ inStock: false })} className="text-gray-400 hover:text-black"><X size={14} /></button>
              </span>
            )}
          </div>
        )}

        {/* ── Product Grid ──────────────────────────────────────────── */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} type="product-card" />)}
          </div>
        ) : products.length === 0 ? (
          <div className="py-12">
            <EmptyState 
              icon={Search}
              title="No products found"
              description="We couldn't find anything matching your criteria."
              actionText={hasActiveFilters ? "Clear all filters" : null}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* ── Pagination ────────────────────────────────────────────── */}
        {totalPages > 1 && !isLoading && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] disabled:opacity-40 hover:bg-gray-50 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-1 mx-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && arr[idx - 1] !== p - 1) acc.push('...');
                  acc.push(p);
                  return acc;
                }, [])
                .map((item, i) =>
                  item === '...' ? (
                    <span key={`ellipsis-${i}`} className="px-2 text-sm font-bold text-gray-400">…</span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => setPage(item)}
                      className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                        item === currentPage 
                          ? 'bg-black text-white shadow-md' 
                          : 'bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-gray-100'
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
            </div>

            <button
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] disabled:opacity-40 hover:bg-gray-50 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarketplacePage;
