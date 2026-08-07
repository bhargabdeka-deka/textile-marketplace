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
import { formatCurrency, formatDate, optimizeCloudinaryUrl } from '@/utils/formatters';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 min-h-screen space-y-6 text-gray-900 font-sans">
      
      {/* ── 1. Header Dashboard Info ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-blue-600 mb-1">
            <ShoppingBag size={14} className="text-blue-500" />
            <span className="font-semibold uppercase tracking-wider text-blue-600">Procurement Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-0.5">
            Buyer Dashboard
          </h1>
          <p className="text-sm font-normal text-gray-500 mt-1">
            Track active mill orders, manage deliveries, and view wholesale invoice history.
          </p>
        </div>

        {/* Profile Card Summary */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 shadow-sm max-w-xs">
          <div className="w-10 h-10 rounded-lg bg-gray-900 text-white flex items-center justify-center shrink-0">
            <User size={18} />
          </div>
          <div className="min-w-0 pr-2">
            <p className="font-bold text-sm text-gray-900 truncate">
              {user?.name || 'Customer Account'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* ── 2. KPI Metrics ────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Active Shipments</span>
            <Clock size={16} />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            {currentOrders.length}
          </p>
          <p className="text-xs font-medium text-gray-500 mt-1">In fulfillment transit</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Completed Orders</span>
            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            {pastOrders.length}
          </p>
          <p className="text-xs font-medium text-gray-500 mt-1">Fulfilled successfully</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Investment</span>
            <CreditCard size={16} className="text-blue-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            {formatCurrency(totalSpend)}
          </p>
          <p className="text-xs font-medium text-gray-500 mt-1">Direct invoice spend</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Volume Sourced</span>
            <TrendingUp size={16} className="text-purple-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            {totalMetresPurchased} m
          </p>
          <p className="text-xs font-medium text-gray-500 mt-1">Metres delivered</p>
        </div>
      </div>

      {/* ── 3. Orders Page Section (Filter + Timeline Cards) ─────────────── */}
      <div className="space-y-5">
        
        {/* Interactive Filter Menu */}
        <div className="flex items-center justify-between flex-wrap gap-3 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <span className="text-sm font-bold uppercase tracking-wider text-gray-600">Filter Orders:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Pending', 'Active', 'Completed', 'Cancelled'].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setSelectedFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${
                  selectedFilter === f
                    ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Card Feed */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-3">
              <Package size={24} className="text-gray-400" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              No matching orders found
            </h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Refine your selected status filters or navigate to the marketplace to place a procurement request.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredOrders.map((order) => {
              const orderDate = formatDate(order.createdAt);
              const isCompleted = order.status === 'Completed';
              const isCancelled = order.status === 'Cancelled';
              
              // Calculate status stepper timeline parameters
              const currentStepIndex = STEPS.indexOf(order.status);

              return (
                <div
                  key={order._id}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-5"
                >
                  
                  {/* Order Title bar info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 border border-gray-200">
                        <ShoppingBag size={18} className="text-gray-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded-md text-gray-700 border border-gray-200">
                            Order #{order._id.slice(-6).toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500 font-medium">
                            {orderDate}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-gray-900">
                          Supplier: {order.supplier?.companyName || order.supplier?.name || 'Verified Mill'}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Invoice</p>
                        <p className="font-bold text-sm text-gray-900">
                          {formatCurrency(order.totalAmount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Status</p>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${
                          isCompleted
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : isCancelled
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
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
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 z-0 rounded-full" />
                        
                        {/* Active connection line */}
                        <div
                          className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 z-0 transition-all duration-300 rounded-full"
                          style={{
                            width: `${currentStepIndex >= 0 ? (currentStepIndex / (STEPS.length - 1)) * 100 : 0}%`
                          }}
                        />

                        {/* Visual timeline steps */}
                        {STEPS.map((step, idx) => {
                          const isDone = idx < currentStepIndex;
                          const isActive = idx === currentStepIndex;

                          return (
                            <div key={step} className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 text-[11px] font-bold transition-all ${
                                isDone
                                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                                  : isActive
                                    ? 'bg-blue-600 border-blue-600 text-white ring-4 ring-blue-50'
                                    : 'bg-white border-gray-200 text-gray-400'
                              }`}>
                                {isDone ? (
                                  <Check size={12} strokeWidth={3} />
                                ) : (
                                  <span>{idx + 1}</span>
                                )}
                              </div>
                              <span className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block ${
                                isActive ? 'text-blue-600' : isDone ? 'text-gray-700' : 'text-gray-400'
                              }`}>
                                {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-200 p-3 rounded-lg flex items-center gap-2.5 text-red-700 text-sm font-semibold">
                      <AlertCircle size={16} />
                      <p>This order has been cancelled and funds released from escrow.</p>
                    </div>
                  )}

                  {/* Fabrics ordered details list */}
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 gap-4 text-sm"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-gray-200 shrink-0">
                            {item.product?.images?.[0] ? (
                              <img src={optimizeCloudinaryUrl(item.product.images[0], 150)} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
                                <Package size={16} />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <Link
                              to={`/products/${item.product?._id}`}
                              className="font-bold text-sm text-gray-900 hover:text-blue-600 truncate block"
                            >
                              {item.product?.title || 'Unknown Fabric Specification'}
                            </Link>
                            <p className="text-xs text-gray-500 font-medium mt-1">
                              {item.quantity} meters &times; {formatCurrency(item.price)} / m
                            </p>
                          </div>
                        </div>
                        <div className="font-bold text-sm text-gray-900 shrink-0">
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
        <div className="pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Star size={18} className="text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">
                Recommended Fabrics
              </h2>
            </div>
            <Link
              to="/products"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
            >
              Browse All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
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
