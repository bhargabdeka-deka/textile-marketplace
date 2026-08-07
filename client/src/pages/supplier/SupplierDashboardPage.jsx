/**
 * src/pages/supplier/SupplierDashboardPage.jsx
 *
 * Supplier dashboard for managing incoming orders and overview statistics.
 * Shopify Seller/Merchant Dashboard Aesthetic with status filters & timelines.
 */

import { useEffect, useState } from 'react';
import {
  ShoppingCart,
  Package,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Truck,
  Building2,
  Users,
  ChevronDown,
  CheckCircle2,
  Clock,
  Filter,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useOrderStore from '@/store/orderStore';
import useProductStore from '@/store/productStore';
import { formatCurrency, formatDate, optimizeCloudinaryUrl } from '@/utils/formatters';
import Loading from '@/components/ui/Loading';

const STEPS = ['Pending', 'Accepted', 'Preparing', 'Ready for Dispatch', 'Completed'];

function SupplierDashboardPage() {
  const { supplierOrders, fetchSupplierOrders, updateOrderStatus, isLoading: ordersLoading } = useOrderStore();
  const { myProducts, fetchMyProducts, productLoading } = useProductStore();
  
  // Interactive status filter
  const [selectedFilter, setSelectedFilter] = useState('All'); // 'All', 'Pending', 'Preparing', 'Ready for Dispatch', 'Completed'

  useEffect(() => {
    fetchSupplierOrders();
    fetchMyProducts();
  }, [fetchSupplierOrders, fetchMyProducts]);

  if ((ordersLoading || productLoading) && supplierOrders.length === 0 && myProducts.length === 0) {
    return <Loading variant="page" message="Loading wholesale merchant portal..." />;
  }

  const STATUSES = ['Pending', 'Accepted', 'Preparing', 'Ready for Dispatch', 'Completed'];

  // Statistics Computations
  const pendingOrders = supplierOrders.filter(o => o.status === 'Pending');
  const completedOrders = supplierOrders.filter(o => o.status === 'Completed');
  const revenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const activeListings = myProducts.filter(p => p.isActive).length;
  const lowStockProducts = myProducts.filter(p => p.stock < 50);

  // Apply filter to supplier orders
  const filteredOrders = supplierOrders.filter((order) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Pending') return order.status === 'Pending';
    if (selectedFilter === 'Preparing') return order.status === 'Preparing';
    if (selectedFilter === 'Ready for Dispatch') return order.status === 'Ready for Dispatch';
    if (selectedFilter === 'Completed') return order.status === 'Completed';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 min-h-screen space-y-6 text-gray-900 font-sans">
      
      {/* ── 1. Header Area (Shopify / B2B Merchant style) ────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-blue-600 mb-1">
            <Building2 size={14} className="text-blue-500" />
            <span className="font-semibold uppercase tracking-wider text-blue-600">Merchant Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-0.5">
            Supplier Portal
          </h1>
          <p className="text-sm font-normal text-gray-500 mt-1">
            Manage wholesale mill catalog, monitor incoming orders, and track fulfillment metrics.
          </p>
        </div>
        
        <Link 
          to="/supplier/products" 
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-all self-start sm:self-auto"
        >
          Manage Catalog
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* ── 2. Statistics & KPI Grid ─────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Revenue</span>
            <TrendingUp size={16} className="text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            {formatCurrency(revenue)}
          </p>
          <p className="text-xs font-medium text-emerald-600 mt-1">
            Completed orders revenue
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Active Catalog</span>
            <Package size={16} className="text-blue-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            {activeListings}
          </p>
          <p className="text-xs font-medium text-gray-500 mt-1">Live fabric listings</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Pending Orders</span>
            <ShoppingCart size={16} className="text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            {pendingOrders.length}
          </p>
          <p className="text-xs font-medium text-amber-600 mt-1">Requires review</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Low Stock Warnings</span>
            <AlertTriangle size={16} className="text-rose-500" />
          </div>
          <p className={`text-2xl sm:text-3xl font-bold ${lowStockProducts.length > 0 ? 'text-rose-600' : 'text-gray-900'}`}>
            {lowStockProducts.length}
          </p>
          <p className="text-xs font-medium text-gray-500 mt-1">Fabrics under 50m</p>
        </div>

      </div>

      {/* ── 3. Low Stock Inventory Alerts Banner ─────────────────────── */}
      {lowStockProducts.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-3">
          <div className="flex items-center gap-2 text-rose-800">
            <AlertTriangle size={16} />
            <h2 className="text-sm font-bold uppercase tracking-wider">Inventory Replenishment Alert</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lowStockProducts.map(p => (
              <div
                key={p._id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-rose-100 shadow-sm text-sm"
              >
                <span className="font-semibold text-gray-800 truncate pr-3">{p.title}</span>
                <span className="text-[11px] font-bold bg-rose-50 text-rose-700 px-2.5 py-1 rounded-md border border-rose-200 shrink-0">
                  {p.stock}m remaining
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 4. Incoming B2B Purchase Orders (Shopify Merchant style) ───── */}
      <div className="space-y-5">
        
        {/* Interactive Filter Menu */}
        <div className="flex items-center justify-between flex-wrap gap-3 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <span className="text-sm font-bold uppercase tracking-wider text-gray-600">Filter Incoming:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Pending', 'Preparing', 'Ready for Dispatch', 'Completed'].map((f) => (
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

        {filteredOrders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-3">
              <ShoppingCart size={24} className="text-gray-400" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              No orders found
            </h3>
            <p className="text-sm text-gray-500 max-w-sm">
              No orders match the selected filter status.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredOrders.map((order) => {
              const orderIdSnippet = order._id.slice(-6).toUpperCase();
              const dateString = formatDate(order.createdAt);
              const shipAddress = order.shippingAddress;
              const currentStepIndex = STEPS.indexOf(order.status);
              const isCancelled = order.status === 'Cancelled';

              return (
                <div
                  key={order._id}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-5"
                >
                  
                  {/* Order Top Summary */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-100 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold uppercase bg-gray-100 text-gray-700 border border-gray-200">
                          Order #{orderIdSnippet}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          {dateString}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 pt-1">
                        <Users size={16} className="text-gray-400" />
                        <p className="text-sm font-bold text-gray-900">
                          Buyer: {order.buyer?.name}
                          <span className="text-xs text-gray-500 font-medium ml-1.5">
                            ({order.buyer?.email})
                          </span>
                        </p>
                      </div>

                      {shipAddress && (
                        <p className="text-xs text-gray-500 leading-normal pt-1">
                          <span className="font-semibold text-gray-700">Shipping: </span> 
                          {shipAddress.street}, {shipAddress.city}, {shipAddress.state} {shipAddress.pincode}
                        </p>
                      )}
                    </div>

                    {/* Order Status Select & Total Box */}
                    <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200 shrink-0 mt-2 lg:mt-0">
                      <div>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Subtotal</p>
                        <p className="font-bold text-sm text-blue-600">
                          {formatCurrency(order.totalAmount)}
                        </p>
                      </div>
                      
                      <div className="w-px h-10 bg-gray-200" />

                      <div className="space-y-1">
                        <label htmlFor={`status-select-${order._id}`} className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                          Fulfillment Status
                        </label>
                        <div className="relative inline-block w-full">
                          <select
                            id={`status-select-${order._id}`}
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className="appearance-none w-full pl-3 pr-8 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 bg-white text-gray-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer shadow-sm"
                          >
                            {STATUSES.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Progress Timeline (Step Tracker) */}
                  {!isCancelled ? (
                    <div className="py-2">
                      <div className="relative flex justify-between items-center w-full max-w-2xl mx-auto">
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 z-0 rounded-full" />
                        <div
                          className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 z-0 transition-all duration-300 rounded-full"
                          style={{
                            width: `${currentStepIndex >= 0 ? (currentStepIndex / (STEPS.length - 1)) * 100 : 0}%`
                          }}
                        />

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
                      <AlertTriangle size={16} />
                      <p>This procurement order has been cancelled.</p>
                    </div>
                  )}

                  {/* Fabric Item Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-gray-200 shrink-0">
                          {item.product?.images?.[0] ? (
                            <img src={optimizeCloudinaryUrl(item.product.images[0], 150)} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                              <Package size={16} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-gray-900 truncate">
                            {item.product?.title || 'Wholesale Fabric Spec'}
                          </p>
                          <p className="text-xs text-gray-500 font-medium mt-1">
                            {item.quantity} meters &times; {formatCurrency(item.price)}
                          </p>
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

    </div>
  );
}

export default SupplierDashboardPage;
