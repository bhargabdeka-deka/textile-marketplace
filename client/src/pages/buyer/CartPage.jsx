/**
 * src/pages/buyer/CartPage.jsx
 *
 * Shopping cart page for buyers. Shopify / Amazon Aesthetic.
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
    return <Loading variant="page" message="Loading shopping cart..." />;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        
        {/* Page title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Your Cart
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Review your wholesale fabric selections before initiating secure checkout.
          </p>
        </div>

        {items.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Looks like you haven't added any fabrics to your cart yet."
            actionText="Browse Marketplace"
            actionLink="/products"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* ── Cart Item Lists ────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const supplierName = item.product.supplier?.companyName || item.product.supplier?.name || 'Verified Mill';
                
                return (
                  <div
                    key={item.product._id}
                    className="flex flex-col sm:flex-row gap-5 p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    
                    {/* Item Thumbnail */}
                    <Link
                      to={`/products/${item.product._id}`}
                      className="shrink-0 w-28 h-28 rounded-xl overflow-hidden bg-gray-50 border border-gray-200"
                    >
                      {item.product.images?.[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ShoppingBag size={22} />
                        </div>
                      )}
                    </Link>

                    {/* Details Box */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="space-y-1">
                        <Link
                          to={`/products/${item.product._id}`}
                          className="font-bold text-sm sm:text-base text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-xs font-semibold text-gray-500">
                          Supplier: <span className="text-gray-800 font-bold">{supplierName}</span>
                        </p>
                      </div>

                      {/* Controls Box */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                            className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="px-3 text-xs font-extrabold text-gray-900">
                            {item.quantity} m
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                            className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Pricing & Remove Actions */}
                        <div className="text-right">
                          <p className="font-extrabold text-sm sm:text-base text-gray-900">
                            {formatCurrency(item.priceAtAdd * item.quantity)}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product._id)}
                            className="text-[11px] font-bold inline-flex items-center gap-1 mt-1.5 text-red-600 hover:text-red-700 transition-colors"
                          >
                            <Trash2 size={13} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

            {/* ── Cart Summary Side Card ─────────────────────────────── */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 pb-3 border-b border-gray-100">
                  Order Summary
                </h3>
                
                <div className="space-y-3.5 text-xs sm:text-sm font-medium">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                    <span className="text-gray-900 font-bold">{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-emerald-600 font-bold">Calculated at Checkout</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-baseline">
                  <span className="text-sm font-extrabold text-gray-900">Estimated Total</span>
                  <span className="text-lg font-black text-blue-600">{formatCurrency(totalPrice)}</span>
                </div>

                <Link
                  to="/buyer/checkout"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm"
                >
                  Proceed to Checkout
                  <ArrowRight size={15} />
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
