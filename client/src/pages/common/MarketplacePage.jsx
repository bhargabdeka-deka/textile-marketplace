/**
 * src/pages/common/MarketplacePage.jsx
 *
 * Public marketplace — browse, search, and filter all active products.
 * SaaS Premium Light Styling.
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
    <div className="bg-[#FAFBFC] min-h-[85vh] text-[#111827] font-sans">
      {/* ── Hero bar (Light B2B Marketplace Search Header) ────────────────────────── */}
      <div className="py-8 px-4 sm:px-6 bg-white border-b border-[#E5E7EB] shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-1.5 text-[#111827]">
            Wholesale Fabric & Textile Directory
          </h1>
          <p className="text-sm text-[#6B7280] font-normal mb-6 max-w-md">
            {total > 0 ? `Browse ${total.toLocaleString()} verified fabric listings directly from audited mills.` : 'Direct mill-to-buyer wholesale marketplace.'}
          </p>

          {/* Search bar */}
          <div className="relative w-full max-w-2xl">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 cursor-pointer z-10" onClick={() => setIsAISearch(!isAISearch)} title="Toggle AI Search">
              {isAISearch ? (
                <Sparkles size={16} className="text-[#2563EB]" />
              ) : (
                <Search size={16} className="text-[#6B7280]" />
              )}
            </div>
            
            <div className="relative rounded-xl overflow-hidden border border-[#E5E7EB] bg-white focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/15 transition-all shadow-xs">
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
                placeholder={isAISearch ? "E.g., Find me breathable 200+ GSM cotton for summer shirts..." : "Search by fabric name, weave, GSM, or supplier..."}
                className="w-full pl-10 pr-28 py-3 text-sm outline-none bg-white text-[#111827] placeholder-[#6B7280]"
              />
            </div>
            
            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
              {isAISearch ? (
                <button
                  onClick={handleAISubmit}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                >
                  <Sparkles size={13} /> AI Search
                </button>
              ) : (
                <button
                  onClick={() => setIsAISearch(true)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors bg-[#FAFBFC] text-[#374151] hover:text-[#111827] hover:bg-gray-100 border border-[#E5E7EB]"
                >
                  <Sparkles size={13} className="text-[#2563EB]" /> Ask AI
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors ${
                showFilters 
                  ? 'border-[#111827] bg-[#111827] text-white' 
                  : 'border-[#E5E7EB] bg-white text-[#374151] hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal size={14} />
              Filters
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
              >
                <X size={14} />
                Clear Filters
              </button>
            )}

            <span className="text-xs text-[#6B7280] ml-2 font-medium hidden sm:inline">
              Showing <span className="font-semibold text-[#111827]">{products.length}</span> of {total} fabrics
            </span>
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={filters.sort}
              onChange={(e) => setFilter({ sort: e.target.value })}
              className="appearance-none pl-3.5 pr-8 py-2 rounded-xl text-xs font-medium border border-[#E5E7EB] bg-white text-[#111827] outline-none hover:bg-gray-50 cursor-pointer shadow-xs transition-colors"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]">
              <ChevronLeft size={13} className="rotate-[-90deg]" />
            </div>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="mb-6 p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            {/* Category */}
            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#111827]">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-sm font-medium border border-[#E5E7EB] bg-[#FAFBFC] text-[#111827] outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Min price */}
            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#111827]">
                Min Price (₹/m)
              </label>
              <input
                type="number"
                min={0}
                value={filters.minPrice}
                onChange={(e) => setFilter({ minPrice: e.target.value })}
                placeholder="0"
                className="w-full px-3.5 py-2 rounded-xl text-sm font-medium border border-[#E5E7EB] bg-[#FAFBFC] text-[#111827] outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
              />
            </div>

            {/* Max price */}
            <div>
              <label className="block text-xs font-medium mb-1.5 text-[#111827]">
                Max Price (₹/m)
              </label>
              <input
                type="number"
                min={0}
                value={filters.maxPrice}
                onChange={(e) => setFilter({ maxPrice: e.target.value })}
                placeholder="Any"
                className="w-full px-3.5 py-2 rounded-xl text-sm font-medium border border-[#E5E7EB] bg-[#FAFBFC] text-[#111827] outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
              />
            </div>

            {/* Availability */}
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => setFilter({ inStock: e.target.checked })}
                  className="w-4 h-4 text-[#2563EB] rounded border-[#E5E7EB] cursor-pointer focus:ring-[#2563EB]"
                />
                <span className="text-sm font-medium text-[#111827]">In stock only</span>
              </label>
            </div>
          </div>
        )}

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.category && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-white border border-[#E5E7EB] text-[#111827] shadow-xs">
                Category: {filters.category}
                <button onClick={() => handleCategoryChange('')} className="text-[#6B7280] hover:text-[#111827]"><X size={13} /></button>
              </span>
            )}
            {filters.minPrice && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-white border border-[#E5E7EB] text-[#111827] shadow-xs">
                Min ₹{filters.minPrice}
                <button onClick={() => setFilter({ minPrice: '' })} className="text-[#6B7280] hover:text-[#111827]"><X size={13} /></button>
              </span>
            )}
            {filters.maxPrice && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-white border border-[#E5E7EB] text-[#111827] shadow-xs">
                Max ₹{filters.maxPrice}
                <button onClick={() => setFilter({ maxPrice: '' })} className="text-[#6B7280] hover:text-[#111827]"><X size={13} /></button>
              </span>
            )}
            {filters.inStock && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-white border border-[#E5E7EB] text-[#111827] shadow-xs">
                In stock only
                <button onClick={() => setFilter({ inStock: false })} className="text-[#6B7280] hover:text-[#111827]"><X size={13} /></button>
              </span>
            )}
          </div>
        )}

        {/* ── Product Grid ──────────────────────────────────────────── */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} type="product-card" />)}
          </div>
        ) : products.length === 0 ? (
          <div className="py-12">
            <EmptyState 
              icon={Search}
              title="No fabrics found"
              description="No wholesale listings matched your selected filters."
              actionText={hasActiveFilters ? "Clear all filters" : null}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* ── Pagination ────────────────────────────────────────────── */}
        {totalPages > 1 && !isLoading && (
          <div className="flex items-center justify-center gap-1.5 mt-10">
            <button
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-[#E5E7EB] bg-white text-[#374151] disabled:opacity-40 hover:bg-gray-50 transition-colors shadow-xs"
              aria-label="Previous page"
            >
              <ChevronLeft size={14} />
            </button>

            <div className="flex items-center gap-1 mx-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && arr[idx - 1] !== p - 1) acc.push('...');
                  acc.push(p);
                  return acc;
                }, [])
                .map((item, i) =>
                  item === '...' ? (
                    <span key={`ellipsis-${i}`} className="px-1.5 text-xs text-[#6B7280]">…</span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => setPage(item)}
                      className={`w-8 h-8 rounded-xl text-xs font-medium transition-all shadow-xs ${
                        item === currentPage 
                          ? 'bg-[#2563EB] text-white border-transparent' 
                          : 'bg-white text-[#374151] border border-[#E5E7EB] hover:bg-gray-50'
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
              className="p-2 rounded-xl border border-[#E5E7EB] bg-white text-[#374151] disabled:opacity-40 hover:bg-gray-50 transition-colors shadow-xs"
              aria-label="Next page"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarketplacePage;
