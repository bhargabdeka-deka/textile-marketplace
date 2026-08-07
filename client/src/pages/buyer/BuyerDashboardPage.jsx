/**
 * src/pages/buyer/BuyerDashboardPage.jsx
 *
 * Buyer dashboard showing order history, profile, and recommendations.
 * SaaS Premium Styling.
 */

import { useEffect } from 'react';
import { ShoppingBag, Package, User, Star, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import useOrderStore from '@/store/orderStore';
import useAuthStore from '@/store/authStore';
import useProductStore from '@/store/productStore';
import { formatCurrency, formatDate, getImageUrl } from '@/utils/formatters';
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
    return <Loading variant="page" message="Loading your dashboard..." />;
  }

  const currentOrders = buyerOrders.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled');
  const pastOrders = buyerOrders.filter(o => o.status === 'Completed' || o.status === 'Cancelled');
  const recommendations = products.slice(0, 4);

  const OrderList = ({ orders, title, emptyMessage, icon: Icon }) => (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
          <Icon size={20} className="text-black" />
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-[var(--color-text)]">
          {title}
        </h2>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-3xl p-12 text-center bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Package size={24} className="text-gray-400" />
          </div>
          <p className="text-lg font-bold text-[var(--color-text)] mb-2">{emptyMessage}</p>
          <p className="text-sm font-medium text-[var(--color-muted)] max-w-sm">
            When you place an order, it will appear here. Start exploring the marketplace to find what you need.
          </p>
          <Link to="/products" className="mt-6 px-6 py-3 rounded-xl bg-black text-white text-sm font-bold shadow-md hover:bg-gray-800 transition-colors">
            Browse Marketplace
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="rounded-3xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-[var(--color-border)] pb-6 mb-6 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                    <ShoppingBag size={20} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
                      Ordered {formatDate(order.createdAt)}
                    </p>
                    <p className="font-extrabold text-lg text-[var(--color-text)]">
                      {order.supplier?.companyName || order.supplier?.name}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">Total Amount</p>
                    <p className="font-extrabold text-xl text-[var(--color-text)]">{formatCurrency(order.totalAmount)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">Status</p>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 text-gray-800 border border-gray-200 shadow-sm">
                      {order.status === 'Completed' && <CheckCircle size={14} className="text-green-600" />}
                      {order.status !== 'Completed' && <Clock size={14} className="text-blue-600" />}
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-5 items-center p-4 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] transition-colors hover:bg-gray-50">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-gray-200 shrink-0">
                      {item.product?.images?.[0] ? (
                        <img src={getImageUrl(item.product.images[0])} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><Package size={20} className="text-gray-400" /></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <Link to={`/products/${item.product?._id}`} className="font-bold text-[15px] text-[var(--color-text)] hover:text-[#0070F3] transition-colors">
                        {item.product?.title || 'Unknown Product'}
                      </Link>
                      <p className="text-sm font-medium text-[var(--color-muted)] mt-1">
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
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      {/* Header Area */}
      <div className="mb-10 flex flex-col md:flex-row gap-6 md:items-end justify-between">
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-text)]">
            Buyer Dashboard
          </h1>
          <p className="mt-3 text-lg font-medium text-[var(--color-muted)]">
            Welcome back, <span className="text-[var(--color-text)]">{user?.name}</span>.
          </p>
        </div>
        
        {/* Profile Summary Card */}
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center shadow-md">
            <User size={20} />
          </div>
          <div>
            <p className="font-extrabold text-[var(--color-text)]">{user?.name}</p>
            <p className="text-xs font-medium text-[var(--color-muted)]">{user?.email}</p>
            <p className="text-[10px] uppercase tracking-wider font-bold mt-1.5 px-2 py-0.5 rounded bg-gray-100 text-gray-600 inline-block">
              Buyer Account
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="rounded-3xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 opacity-5 rounded-bl-full transition-transform group-hover:scale-110" />
          <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
            <Package size={20} className="text-black" />
          </div>
          <p className="text-4xl font-extrabold text-[var(--color-text)] tracking-tight">{currentOrders.length}</p>
          <p className="text-sm font-bold text-[var(--color-muted)] mt-1">Active Orders</p>
        </div>
        <div className="rounded-3xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500 opacity-5 rounded-bl-full transition-transform group-hover:scale-110" />
          <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
            <ShoppingBag size={20} className="text-black" />
          </div>
          <p className="text-4xl font-extrabold text-[var(--color-text)] tracking-tight">{pastOrders.length}</p>
          <p className="text-sm font-bold text-[var(--color-muted)] mt-1">Past Orders</p>
        </div>
      </div>

      {/* Main Content Area */}
      <OrderList orders={currentOrders} title="Active Orders" emptyMessage="No active orders." icon={Clock} />
      <OrderList orders={pastOrders} title="Order History" emptyMessage="Your order history is empty." icon={CheckCircle} />

      {recommendations.length > 0 && (
        <div className="pt-12 border-t border-[var(--color-border)] mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0070F3]/10 flex items-center justify-center">
                <Star size={20} className="text-[#0070F3]" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--color-text)]">
                Recommended for You
              </h2>
            </div>
            <Link to="/products" className="text-sm font-bold text-[#0070F3] hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
