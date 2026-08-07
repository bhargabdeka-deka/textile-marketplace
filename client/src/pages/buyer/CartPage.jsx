/**
 * src/pages/buyer/CartPage.jsx
 *
 * Shopping cart page for buyers. SaaS Premium Styling.
 */

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import useCartStore from '@/store/cartStore';
import { formatCurrency } from '@/utils/formatters';
import Loading from '@/components/ui/Loading';
import EmptyState from '@/components/ui/EmptyState';

function CartPage() {
  const { items, isLoading, fetchCart, updateQuantity, removeItem, totalPrice, totalItems } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (isLoading && items.length === 0) {
    return <Loading variant="page" message="Loading your cart..." />;
  }

  return (
    <div className="bg-[var(--color-bg)] min-h-[85vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--color-text)] mb-10">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Looks like you haven't added any fabrics to your cart yet."
            actionText="Browse Marketplace"
            actionLink="/products"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.product._id} className="flex flex-col sm:flex-row gap-6 p-6 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow">
                  <Link to={`/products/${item.product._id}`} className="shrink-0 w-32 h-32 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                    {item.product.images?.[0] ? (
                      <img src={item.product.images[0]} alt={item.product.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ShoppingBag size={24} />
                      </div>
                    )}
                  </Link>
                  <div className="flex flex-col flex-grow justify-between">
                    <div>
                      <Link to={`/products/${item.product._id}`} className="font-extrabold text-lg hover:text-[#0070F3] transition-colors line-clamp-2 text-[var(--color-text)]">
                        {item.product.title}
                      </Link>
                      <p className="text-sm font-medium text-[var(--color-muted)] mt-1">
                        Sold by: <span className="text-[var(--color-text)]">{item.product.supplier?.companyName || item.product.supplier?.name}</span>
                      </p>
                    </div>
                    <div className="flex items-end justify-between mt-6 sm:mt-0">
                      <div className="flex items-center border border-[var(--color-border)] rounded-xl overflow-hidden bg-[var(--color-bg)]">
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          className="px-4 py-2 text-[var(--color-muted)] hover:text-black hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 text-sm font-extrabold border-x border-[var(--color-border)] text-[var(--color-text)] bg-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          className="px-4 py-2 text-[var(--color-muted)] hover:text-black hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-extrabold text-xl text-[var(--color-text)] tracking-tight">
                          {formatCurrency(item.priceAtAdd * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeItem(item.product._id)}
                          className="text-xs font-bold flex items-center justify-end gap-1 mt-2 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm">
                <h3 className="text-xl font-extrabold mb-6 text-[var(--color-text)]">
                  Order Summary
                </h3>
                <div className="space-y-4 mb-6 pb-6 border-b border-[var(--color-border)]">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-[var(--color-muted)]">Subtotal ({totalItems} items)</span>
                    <span className="text-[var(--color-text)]">{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-[var(--color-muted)]">Shipping Estimate</span>
                    <span className="text-[var(--color-text)]">Calculated at checkout</span>
                  </div>
                </div>
                <div className="flex justify-between text-lg font-extrabold mb-8 tracking-tight text-[var(--color-text)]">
                  <span>Total</span>
                  <span className="text-[#0070F3]">{formatCurrency(totalPrice)}</span>
                </div>
                <Link
                  to="/buyer/checkout"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white bg-black hover:bg-gray-800 transition-colors shadow-md"
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
