/**
 * src/pages/buyer/CheckoutPage.jsx
 *
 * Checkout page for buyers. Shopify / Amazon Checkout Aesthetic.
 */

import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import useOrderStore from '@/store/orderStore';
import useCartStore from '@/store/cartStore';
import { formatCurrency } from '@/utils/formatters';

const inputClass = 'w-full px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-slate-400 focus:bg-white dark:focus:bg-slate-900 transition-all';

function CheckoutPage() {
  const navigate = useNavigate();
  const { placeOrder } = useOrderStore();
  const { totalItems, totalPrice, items } = useCartStore();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  
  const onSubmit = async (data) => {
    try {
      await placeOrder(data);
      navigate('/buyer/dashboard');
    } catch (err) {
      // Error handled by store toast
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4 bg-slate-50 dark:bg-slate-950 min-h-screen">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-4">
          <CheckCircle2 size={22} className="text-slate-400" />
        </div>
        <p className="text-xl font-extrabold mb-1.5 text-slate-950 dark:text-white">Your cart is empty</p>
        <p className="text-xs text-slate-500 mb-6">Add items to your cart before checking out.</p>
        <Link to="/products" className="px-5 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-bold shadow-sm hover:opacity-90 transition-all">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-bg)] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-6">
        
        {/* Navigation back and header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link
              to="/buyer/cart"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Cart</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Secure Checkout
            </h1>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-500 uppercase tracking-wider bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shrink-0">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>SSL Encrypted Checkout</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── Left Column: Shipping Details Form (Cols 1-7) ─────────────── */}
          <div className="lg:col-span-7">
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                  Shipping Destination
                </h2>
                
                {/* Street Address */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="street" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Street Address *
                    </label>
                    {errors.street && <span className="text-[10px] font-bold text-rose-600">{errors.street.message}</span>}
                  </div>
                  <input
                    id="street"
                    {...register('street', { required: 'Street is required' })}
                    className={inputClass}
                    placeholder="123 Textile Ave, Phase 2"
                  />
                </div>
                
                {/* City & State Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="city" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        City *
                      </label>
                      {errors.city && <span className="text-[10px] font-bold text-rose-600">{errors.city.message}</span>}
                    </div>
                    <input
                      id="city"
                      {...register('city', { required: 'City is required' })}
                      className={inputClass}
                      placeholder="Surat"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="state" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        State *
                      </label>
                      {errors.state && <span className="text-[10px] font-bold text-rose-600">{errors.state.message}</span>}
                    </div>
                    <input
                      id="state"
                      {...register('state', { required: 'State is required' })}
                      className={inputClass}
                      placeholder="Gujarat"
                    />
                  </div>
                </div>
                
                {/* Pincode & Country Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="pincode" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Pincode *
                      </label>
                      {errors.pincode && <span className="text-[10px] font-bold text-rose-600">{errors.pincode.message}</span>}
                    </div>
                    <input
                      id="pincode"
                      {...register('pincode', { required: 'Pincode is required' })}
                      className={inputClass}
                      placeholder="395002"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="country" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Country *
                      </label>
                      {errors.country && <span className="text-[10px] font-bold text-rose-600">{errors.country.message}</span>}
                    </div>
                    <input
                      id="country"
                      {...register('country', { required: 'Country is required' })}
                      defaultValue="India"
                      className={inputClass}
                    />
                  </div>
                </div>

              </div>
            </form>
          </div>
          
          {/* ── Right Column: Order Summary & Placement (Cols 8-12) ────────── */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
              
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Order Items ({totalItems})
              </h3>
              
              {/* Product thumbnails list */}
              <div className="space-y-3.5 max-h-[250px] overflow-y-auto pr-2 divide-y divide-slate-100 dark:divide-slate-800">
                {items.map((item, idx) => (
                  <div key={item.product._id} className={`flex gap-3.5 ${idx > 0 ? 'pt-3.5' : ''}`}>
                    <div className="w-14 h-14 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                      {item.product.images?.[0] ? (
                        <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <CheckCircle2 size={16} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <p className="font-bold text-xs text-slate-950 dark:text-white truncate">
                        {item.product.title}
                      </p>
                      <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                        Qty: {item.quantity} m
                      </p>
                    </div>
                    <div className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center shrink-0">
                      {formatCurrency(item.priceAtAdd * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Calculations block */}
              <div className="space-y-3 border-t border-slate-150 dark:border-slate-800 pt-4 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal ({totalItems} items)</span>
                  <span className="text-slate-900 dark:text-white font-bold">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Shipping Spec</span>
                  <span className="text-emerald-600 font-bold">Free Shipping</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-extrabold text-slate-950 dark:text-white">Amount to Pay</span>
                <span className="text-lg font-black text-[#0070F3]">{formatCurrency(totalPrice)}</span>
              </div>
              
              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:opacity-90 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Fulfilling escrow...' : 'Complete Purchase Order'}
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
