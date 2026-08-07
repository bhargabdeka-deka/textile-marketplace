/**
 * src/pages/supplier/SupplierDashboardPage.jsx
 *
 * Supplier dashboard for managing incoming orders and overview statistics.
 * Shopify Seller/Merchant Dashboard Aesthetic.
 */

import { useEffect } from 'react';
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
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useOrderStore from '@/store/orderStore';
import useProductStore from '@/store/productStore';
import { formatCurrency, formatDate } from '@/utils/formatters';
import Loading from '@/components/ui/Loading';

function SupplierDashboardPage() {
  const { supplierOrders, fetchSupplierOrders, updateOrderStatus, isLoading: ordersLoading } = useOrderStore();
  const { myProducts, fetchMyProducts, productLoading } = useProductStore();

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-screen space-y-8">
      
      {/* ── 1. Header Area (Shopify Merchant style) ────────────────────── */}
      <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Building2 size={16} className="text-slate-400" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Merchant Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white mt-1">
            Supplier Portal
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Manage wholesale mill catalog, monitor incoming orders, and track fulfillment metrics.
          </p>
        </div>
        
        <Link 
          to="/supplier/products" 
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950 dark:bg-white hover:opacity-90 text-white dark:text-slate-950 text-xs font-extrabold shadow-sm transition-all"
        >
          Manage Catalog
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* ── 2. Statistics & KPI Grid ─────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Sales</span>
            <TrendingUp size={16} className="text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-2">
            {formatCurrency(revenue)}
          </p>
          <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
            <span>● from completed orders</span>
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Catalog</span>
            <Package size={16} className="text-blue-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-2">
            {activeListings}
          </p>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">GSM verified fabrics live</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Orders</span>
            <ShoppingCart size={16} className="text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-2">
            {pendingOrders.length}
          </p>
          <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 mt-1">Requires immediate review</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Inventory Warnings</span>
            <AlertTriangle size={16} className="text-rose-500" />
          </div>
          <p className={`text-2xl sm:text-3xl font-black mt-2 ${lowStockProducts.length > 0 ? 'text-rose-600' : 'text-slate-950 dark:text-white'}`}>
            {lowStockProducts.length}
          </p>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">Fabric stocks under 50m</p>
        </div>

      </div>

      {/* ── 3. Low Stock Inventory Alerts Banner ─────────────────────── */}
      {lowStockProducts.length > 0 && (
        <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/60 space-y-3">
          <div className="flex items-center gap-2 text-rose-800 dark:text-rose-400">
            <AlertTriangle size={16} />
            <h2 className="text-xs font-extrabold uppercase tracking-wider">Inventory Replenishment Alert</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {lowStockProducts.map(p => (
              <div
                key={p._id}
                className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-100/60 dark:border-rose-950 shadow-sm"
              >
                <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 truncate pr-4">{p.title}</span>
                <span className="text-[11px] font-extrabold bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-400 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900/60 shrink-0">
                  {p.stock}m remaining
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 4. Incoming B2B Purchase Orders (Shopify Merchant style) ───── */}
      <div className="space-y-4">
        
        <div className="flex items-center gap-2 pb-2">
          <Truck size={17} className="text-slate-500" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Incoming Orders List
          </h2>
        </div>

        {supplierOrders.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-10 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center mb-3">
              <ShoppingCart size={20} className="text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-1">
              No orders received yet
            </h3>
            <p className="text-xs text-slate-500 max-w-sm">
              Keep your wholesale catalog active and update GSM weave specifications to attract wholesale buyers.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {supplierOrders.map((order) => {
              const orderIdSnippet = order._id.slice(-6).toUpperCase();
              const dateString = formatDate(order.createdAt);
              const shipAddress = order.shippingAddress;

              return (
                <div
                  key={order._id}
                  className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4"
                >
                  
                  {/* Order Top Summary */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                          Order #{orderIdSnippet}
                        </span>
                        <span className="text-[11px] font-bold text-slate-500">
                          {dateString}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 pt-1">
                        <Users size={13} className="text-slate-400" />
                        <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                          Buyer: {order.buyer?.name}
                          <span className="text-[11px] text-slate-400 font-medium ml-1.5">
                            ({order.buyer?.email})
                          </span>
                        </p>
                      </div>

                      {shipAddress && (
                        <p className="text-[11px] font-medium text-slate-500 leading-relaxed pt-1">
                          <span className="font-bold text-slate-600 dark:text-slate-400">Shipping: </span> 
                          {shipAddress.street}, {shipAddress.city}, {shipAddress.state} {shipAddress.pincode}
                        </p>
                      )}
                    </div>

                    {/* Order Status Select & Total Box */}
                    <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 shrink-0">
                      <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Subtotal</p>
                        <p className="font-black text-sm text-[#0070F3] mt-0.5">
                          {formatCurrency(order.totalAmount)}
                        </p>
                      </div>
                      
                      <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />

                      <div className="space-y-0.5">
                        <label htmlFor={`status-select-${order._id}`} className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                          Fulfillment
                        </label>
                        <div className="relative inline-block">
                          <select
                            id={`status-select-${order._id}`}
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className="appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-slate-400 shadow-sm cursor-pointer transition-colors"
                          >
                            {STATUSES.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fabric Item Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-slate-200/85 shrink-0">
                          {item.product?.images?.[0] ? (
                            <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-950">
                              <Package size={16} className="text-slate-400" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-slate-900 dark:text-white truncate">
                            {item.product?.title || 'Wholesale Fabric Spec'}
                          </p>
                          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
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
