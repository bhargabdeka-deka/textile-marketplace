/**
 * src/pages/buyer/BuyerDashboardPage.jsx
 *
 * Buyer dashboard showing order history, profile, and recommendations.
 * Shopify Customer Portal Aesthetic.
 */

import { useEffect } from 'react';
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
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useOrderStore from '@/store/orderStore';
import useAuthStore from '@/store/authStore';
import useProductStore from '@/store/productStore';
import { formatCurrency, formatDate } from '@/utils/formatters';
import Loading from '@/components/ui/Loading';
import ProductCard from '@/components/ui/ProductCard';

function BuyerDashboardPage() {
  const { user } = useAuthStore();
  const { buyerOrders, fetchBuyerOrders, isLoading: ordersLoading } = useOrderStore();
  const { products, fetchProducts, productLoading } = useProductStore();

  useEffect(() => {
    fetchBuyerOrders();
    fetchProducts();
  }, [fetchBuyerOrders, fetchProducts]);

  if ((ordersLoading || productLoading) && buyerOrders.length === 0) {
    return <Loading variant="page" message="Loading customer portal..." />;
  }

  const currentOrders = buyerOrders.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled');
  const pastOrders = buyerOrders.filter(o => o.status === 'Completed' || o.status === 'Cancelled');
  const recommendations = products.slice(0, 4);

  // Compute B2B financial metrics for dashboard statistics
  const totalSpend = buyerOrders
    .filter(o => o.status === 'Completed')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const totalMetresPurchased = buyerOrders
    .filter(o => o.status === 'Completed')
    .reduce((sum, o) => {
      const itemsSum = o.items.reduce((itemSum, item) => itemSum + (item.quantity || 0), 0);
      return sum + itemsSum;
    }, 0);

  // Order List Component (Shopify-style Order Rows)
  const OrderList = ({ orders, title, emptyMessage, icon: Icon, type }) => (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden mb-8">
      {/* Header section of list block */}
      <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Icon size={18} className="text-slate-500" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {title} ({orders.length})
          </h2>
        </div>
        {type === 'active' && orders.length > 0 && (
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        )}
      </div>

      {orders.length === 0 ? (
        <div className="p-8 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center mb-3">
            <Package size={20} className="text-slate-400" />
          </div>
          <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-1">
            {emptyMessage}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm">
            When you purchase fabrics, your shipment tracking and order status updates will be displayed here.
          </p>
          <Link
            to="/products"
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-extrabold shadow-sm hover:opacity-90 transition-all"
          >
            Browse Fabrics
            <ArrowRight size={13} />
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {orders.map((order) => {
            const orderDate = formatDate(order.createdAt);
            const isCompleted = order.status === 'Completed';
            const isCancelled = order.status === 'Cancelled';

            return (
              <div key={order._id} className="p-5 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                
                {/* Order Top Bar Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      <ShoppingBag size={17} className="text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Ordered {orderDate}
                      </p>
                      <h4 className="font-extrabold text-sm text-slate-950 dark:text-white mt-0.5">
                        {order.supplier?.companyName || order.supplier?.name || 'Verified Textile Mill'}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-left">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Value</p>
                      <p className="font-black text-sm text-slate-900 dark:text-white mt-0.5">
                        {formatCurrency(order.totalAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</p>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-extrabold border mt-0.5 ${
                        isCompleted
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/60'
                          : isCancelled
                            ? 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
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

                {/* Items in this order */}
                <div className="space-y-2.5">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-slate-200/80 shrink-0">
                        {item.product?.images?.[0] ? (
                          <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package size={16} className="text-slate-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/products/${item.product?._id}`}
                          className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-[#0070F3] truncate block"
                        >
                          {item.product?.title || 'Unknown Product Spec'}
                        </Link>
                        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.quantity} meters &times; {formatCurrency(item.price)} / meter
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
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-screen space-y-8">
      
      {/* ── Header Dashboard Info ─────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Buyer Dashboard
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Overview of your active wholesale sourcing and completed order dispatches.
          </p>
        </div>

        {/* Profile Details (Shopify Card style) */}
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

      {/* ── KPI Widgets (Shopify style Metrics) ────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Shipments</span>
            <Clock size={16} />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-2">
            {currentOrders.length}
          </p>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">Currently in processing / transit</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Completed Orders</span>
            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-2">
            {pastOrders.length}
          </p>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">Direct deliveries completed</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Investment</span>
            <CreditCard size={16} className="text-blue-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-2">
            {formatCurrency(totalSpend)}
          </p>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">Volume sourced value</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Volume Sourced</span>
            <TrendingUp size={16} className="text-violet-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-2">
            {totalMetresPurchased} m
          </p>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">Fabric quantity fulfilled</p>
        </div>

      </div>

      {/* ── Order Management Rows ──────────────────────────────────────── */}
      <div className="space-y-6">
        <OrderList orders={currentOrders} title="Active Procurement" emptyMessage="No active shipments." icon={Clock} type="active" />
        <OrderList orders={pastOrders} title="Procurement History" emptyMessage="Your order list is empty." icon={CheckCircle2} type="past" />
      </div>

      {/* ── Curated Fabric Recommendations ─────────────────────────────── */}
      {recommendations.length > 0 && (
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Star size={18} className="text-[#0070F3]" />
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                Recommended Wholesale Fabrics
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
