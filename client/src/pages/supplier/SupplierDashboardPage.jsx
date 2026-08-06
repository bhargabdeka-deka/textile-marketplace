/**
 * src/pages/supplier/SupplierDashboardPage.jsx
 *
 * Supplier dashboard for managing incoming orders and overview statistics.
 * SaaS Premium Styling.
 */

import { useEffect } from 'react';
import { ShoppingCart, Package, TrendingUp, AlertTriangle, ArrowRight, Truck } from 'lucide-react';
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
    return <Loading variant="page" message="Loading your dashboard..." />;
  }

  const STATUSES = ['Pending', 'Accepted', 'Preparing', 'Ready for Dispatch', 'Completed'];

  // Statistics
  const pendingOrders = supplierOrders.filter(o => o.status === 'Pending');
  const completedOrders = supplierOrders.filter(o => o.status === 'Completed');
  const revenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const activeListings = myProducts.filter(p => p.isActive).length;
  const lowStockProducts = myProducts.filter(p => p.stock < 50);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[85vh]">
      <div className="mb-10 flex flex-col md:flex-row gap-6 md:items-end justify-between">
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-text)]">
            Supplier Dashboard
          </h1>
          <p className="mt-3 text-lg font-medium text-[var(--color-muted)]">
            Manage your catalogue, incoming orders, and track revenue.
          </p>
        </div>
        
        <Link 
          to="/supplier/products" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white text-sm font-bold shadow-md hover:bg-gray-800 transition-colors"
        >
          Manage Catalogue <ArrowRight size={16} />
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="rounded-3xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500 opacity-5 rounded-bl-full transition-transform group-hover:scale-110" />
          <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
            <TrendingUp size={20} className="text-black" />
          </div>
          <p className="text-4xl font-extrabold text-[var(--color-text)] tracking-tight">{formatCurrency(revenue)}</p>
          <p className="text-sm font-bold text-[var(--color-muted)] mt-1">Total Revenue</p>
        </div>
        
        <div className="rounded-3xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 opacity-5 rounded-bl-full transition-transform group-hover:scale-110" />
          <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
            <Package size={20} className="text-black" />
          </div>
          <p className="text-4xl font-extrabold text-[var(--color-text)] tracking-tight">{activeListings}</p>
          <p className="text-sm font-bold text-[var(--color-muted)] mt-1">Active Listings</p>
        </div>
        
        <div className="rounded-3xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500 opacity-5 rounded-bl-full transition-transform group-hover:scale-110" />
          <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
            <ShoppingCart size={20} className="text-black" />
          </div>
          <p className="text-4xl font-extrabold text-[var(--color-text)] tracking-tight">{pendingOrders.length}</p>
          <p className="text-sm font-bold text-[var(--color-muted)] mt-1">Pending Orders</p>
        </div>
        
        <div className="rounded-3xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500 opacity-5 rounded-bl-full transition-transform group-hover:scale-110" />
          <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-4 shadow-sm">
            <AlertTriangle size={20} className="text-red-600" />
          </div>
          <p className="text-4xl font-extrabold text-red-600 tracking-tight">{lowStockProducts.length}</p>
          <p className="text-sm font-bold text-[var(--color-muted)] mt-1">Low Stock Alerts</p>
        </div>
      </div>

      {/* Inventory Alerts */}
      {lowStockProducts.length > 0 && (
        <div className="mb-12 p-6 rounded-3xl bg-red-50/50 border border-red-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <h2 className="text-xl font-extrabold text-red-900">Inventory Alerts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lowStockProducts.map(p => (
              <div key={p._id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-red-100 shadow-sm">
                <span className="font-bold text-[15px] text-gray-800">{p.title}</span>
                <span className="text-xs font-extrabold bg-red-100 text-red-700 px-3 py-1 rounded-md">
                  {p.stock}m left
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Orders */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
            <Truck size={20} className="text-black" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--color-text)]">
            Incoming Orders
          </h2>
        </div>

        {supplierOrders.length === 0 ? (
          <div className="rounded-3xl p-12 text-center bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm flex flex-col items-center">
             <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <ShoppingCart size={24} className="text-gray-400" />
            </div>
            <p className="text-lg font-bold text-[var(--color-text)] mb-2">You have no orders yet.</p>
            <p className="text-sm font-medium text-[var(--color-muted)] max-w-sm">
              Keep your catalogue updated to attract more buyers.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {supplierOrders.map((order) => (
              <div key={order._id} className="rounded-3xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-[var(--color-border)] pb-6 mb-6 gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-md text-[10px] font-extrabold bg-gray-100 text-gray-500 uppercase tracking-wider">
                        Order #{order._id.slice(-6)}
                      </span>
                      <span className="text-sm font-bold text-[var(--color-muted)]">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                    <p className="font-extrabold text-lg text-[var(--color-text)] mt-2">
                      {order.buyer?.name} <span className="text-sm font-medium text-gray-400 ml-2">({order.buyer?.email})</span>
                    </p>
                    <p className="text-sm font-medium text-[var(--color-muted)] mt-1 max-w-md">
                      <span className="font-bold text-gray-500">Ship to:</span> {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}
                    </p>
                  </div>
                  <div className="flex gap-6 items-center bg-[var(--color-bg)] p-4 rounded-2xl border border-[var(--color-border)]">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">Total</p>
                      <p className="font-extrabold text-xl text-[#0070F3]">{formatCurrency(order.totalAmount)}</p>
                    </div>
                    <div className="w-px h-10 bg-[var(--color-border)]" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">Status</p>
                      <div className="relative">
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className="appearance-none pl-3 pr-8 py-2 rounded-xl text-sm font-bold border border-gray-300 bg-white text-black outline-none focus:border-black shadow-sm cursor-pointer transition-colors"
                        >
                          {STATUSES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center p-4 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)]">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-gray-200 shrink-0">
                        {item.product?.images?.[0] ? (
                          <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center"><Package size={16} className="text-gray-400" /></div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-[15px] text-[var(--color-text)]">
                          {item.product?.title || 'Unknown Product'}
                        </p>
                        <p className="text-sm font-medium text-[var(--color-muted)] mt-0.5">
                          Qty: <span className="text-[var(--color-text)] font-semibold">{item.quantity} m</span> &times; {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SupplierDashboardPage;
