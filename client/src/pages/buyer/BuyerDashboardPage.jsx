/**
 * src/pages/buyer/BuyerDashboardPage.jsx
 *
 * Buyer dashboard showing order history, profile, and recommendations.
 * Shopify Customer Portal Aesthetic with interactive status filters & timelines.
 */

import { useEffect, useState } from 'react';
import {
  ShoppingBag,
  Package,
  User,
  Star,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  CreditCard,
  ChevronRight,
  Filter,
  Check,
  Truck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useOrderStore from '@/store/orderStore';
import useAuthStore from '@/store/authStore';
import useProductStore from '@/store/productStore';
import { formatCurrency, formatDate } from '@/utils/formatters';
import Loading from '@/components/ui/Loading';
import ProductCard from '@/components/ui/ProductCard';

const STEPS = ['Pending', 'Accepted', 'Preparing', 'Ready for Dispatch', 'Completed'];

function BuyerDashboardPage() {
  const { user } = useAuthStore();
  const { buyerOrders, fetchBuyerOrders, isLoading: ordersLoading } = useOrderStore();
  const { products, fetchProducts, productLoading } = useProductStore();
  
  // Interactive filters
  const [selectedFilter, setSelectedFilter] = useState('All'); // 'All', 'Pending', 'Active', 'Completed', 'Cancelled'

  useEffect(() => {
    fetchBuyerOrders();
    fetchProducts();
  }, [fetchBuyerOrders, fetchProducts]);

  if ((ordersLoading || productLoading) && buyerOrders.length === 0) {
    return <Loading variant="page" message="Loading customer portal..." />;
  }

  // Stats Calculations
  const currentOrders = buyerOrders.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled');
  const pastOrders = buyerOrders.filter(o => o.status === 'Completed' || o.status === 'Cancelled');
  const recommendations = products.slice(0, 4);

  const totalSpend = buyerOrders
    .filter(o => o.status === 'Completed')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const totalMetresPurchased = buyerOrders
    .filter(o => o.status === 'Completed')
    .reduce((sum, o) => {
      const itemsSum = o.items.reduce((itemSum, item) => itemSum + (item.quantity || 0), 0);
      return sum + itemsSum;
    }, 0);

  // Apply visual filters to the list of orders
  const filteredOrders = buyerOrders.filter((order) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Pending') return order.status === 'Pending';
    if (selectedFilter === 'Active') return order.status !== 'Completed' && order.status !== 'Cancelled';
    if (selectedFilter === 'Completed') return order.status === 'Completed';
    if (selectedFilter === 'Cancelled') return order.status === 'Cancelled';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-screen space-y-8">
      
      {/* ── 1. Header Dashboard Info ─────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag size={16} className="text-slate-400" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Procurement Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white mt-1">
            Buyer Dashboard
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Track active mill orders, manage deliveries, and view wholesale invoice history.
          </p>
        </div>

        {/* Profile Card Summary */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm max-w-sm">
          <div className="w-10 h-10 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center shadow-sm">
            <User size={18} />
          </div>
          <div className="min-w-0">
            <p className="font-extrabold text-xs text-slate-950 dark:text-white truncate">
              {user?.name || 'Customer Account'}
            </p>
            <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
              {user?.email}
            </p>
            <span className="inline-block text-[9px] uppercase tracking-wider font-extrabold mt-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Verified Buyer
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. KPI Metrics ────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Shipments</span>
            <Clock size={16} />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-2">
            {currentOrders.length}
          </p>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">In fulfillment transit</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Completed Orders</span>
            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-2">
            {pastOrders.length}
          </p>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">Fulfilled successfully</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Investment</span>
            <CreditCard size={16} className="text-blue-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-2">
            {formatCurrency(totalSpend)}
          </p>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">Direct invoice spend</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Volume Sourced</span>
            <TrendingUp size={16} className="text-violet-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-2">
            {totalMetresPurchased} m
          </p>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">Metres delivered</p>
        </div>
      </div>

      {/* ── 3. Orders Page Section (Filter + Timeline Cards) ─────────────── */}
      <div className="space-y-6">
        
        {/* Interactive Filter Menu */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Filter Orders:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['All', 'Pending', 'Active', 'Completed', 'Cancelled'].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setSelectedFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold border transition-all ${
                  selectedFilter === f
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-950 dark:border-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Card Feed */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center mb-3">
              <Package size={20} className="text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-1">
              No matching orders found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm">
              Refine your selected status filters or navigate to the marketplace to place a procurement request.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const orderDate = formatDate(order.createdAt);
              const isCompleted = order.status === 'Completed';
              const isCancelled = order.status === 'Cancelled';
              
              // Calculate status stepper timeline parameters
              const currentStepIndex = STEPS.indexOf(order.status);

              return (
                <div
                  key={order._id}
                  className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow space-y-6"
                >
                  
                  {/* Order Title bar info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-slate-700">
                        <ShoppingBag size={17} className="text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 border border-slate-200/60 dark:border-slate-700">
                            Order #{order._id.slice(-6).toUpperCase()}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400">
                            {orderDate}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-sm text-slate-950 dark:text-white mt-1">
                          Supplier: {order.supplier?.companyName || order.supplier?.name || 'Verified Mill'}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Invoice</p>
                        <p className="font-black text-sm text-slate-900 dark:text-white mt-0.5">
                          {formatCurrency(order.totalAmount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</p>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-extrabold border mt-0.5 ${
                          isCompleted
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/60'
                            : isCancelled
                              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900/60'
                              : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-sky-400 border-blue-200 dark:border-blue-900/60'
                        }`}>
                          {isCompleted && <CheckCircle2 size={12} />}
                          {!isCompleted && !isCancelled && <Clock size={12} />}
                          {isCancelled && <AlertCircle size={12} />}
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Progress Timeline (Step Tracker) */}
                  {!isCancelled ? (
                    <div className="py-2">
                      <div className="relative flex justify-between items-center w-full max-w-2xl mx-auto">
                        {/* Background connection line */}
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />
                        
                        {/* Active connection line */}
                        <div
                          className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-300"
                          style={{
                            width: `${currentStepIndex >= 0 ? (currentStepIndex / (STEPS.length - 1)) * 100 : 0}%`
                          }}
                        />

                        {/* Visual timeline steps */}
                        {STEPS.map((step, idx) => {
                          const isDone = idx < currentStepIndex;
                          const isActive = idx === currentStepIndex;
                          const isPending = idx > currentStepIndex;

                          return (
                            <div key={step} className="relative z-10 flex flex-col items-center gap-1.5">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                                isDone
                                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                                  : isActive
                                    ? 'bg-blue-500 border-blue-500 text-white ring-4 ring-blue-500/20 shadow-sm'
                                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-850 text-slate-400'
                              }`}>
                                {isDone ? (
                                  <Check size={12} strokeWidth={3} />
                                ) : (
                                  <span className="text-[10px] font-extrabold">{idx + 1}</span>
                                )}
                              </div>
                              <span className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block ${
                                isActive ? 'text-blue-500' : 'text-slate-400'
                              }`}>
                                {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-rose-50/70 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/60 p-4 rounded-xl flex items-center gap-3 text-rose-800 dark:text-rose-400">
                      <AlertCircle size={16} />
                      <p className="text-xs font-bold">This procurement order has been cancelled and refunded to escrow.</p>
                    </div>
                  )}

                  {/* Fabrics ordered details list */}
                  <div className="space-y-3 pt-2">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 gap-4"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-slate-200/80 shrink-0">
                            {item.product?.images?.[0] ? (
                              <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-950 text-slate-400">
                                <Package size={16} />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <Link
                              to={`/products/${item.product?._id}`}
                              className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-[#0070F3] truncate block"
                            >
                              {item.product?.title || 'Unknown Fabric Specification'}
                            </Link>
                            <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                              {item.quantity} meters &times; {formatCurrency(item.price)} / meter
                            </p>
                          </div>
                        </div>
                        <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white shrink-0">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Curated Recommendations */}
      {recommendations.length > 0 && (
        <div className="pt-8 border-t border-slate-200/85 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Star size={18} className="text-[#0070F3]" />
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                Recommended Fabrics
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs font-extrabold text-[#0070F3] hover:text-[#0059B2] flex items-center gap-0.5 transition-colors"
            >
              Browse All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default BuyerDashboardPage;
