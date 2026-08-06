/**
 * src/pages/buyer/CheckoutPage.jsx
 *
 * Checkout page for buyers. SaaS Premium Styling.
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import useOrderStore from '@/store/orderStore';
import useCartStore from '@/store/cartStore';
import { formatCurrency } from '@/utils/formatters';

const FIELD = (label, id, error) => (
  <div>
    <label htmlFor={id} className="block text-xs font-bold mb-2 uppercase tracking-wider text-[var(--color-muted)]">
      {label}
    </label>
    {error && <p className="text-[11px] font-bold text-red-500 mt-1">{error.message}</p>}
  </div>
);

const inputClass = 'w-full px-4 py-3 rounded-xl text-sm font-medium border transition-colors duration-200 outline-none focus:border-black';
const inputStyle = { borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' };

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
      <div className="flex flex-col items-center justify-center py-32 text-center px-4 bg-[var(--color-bg)] min-h-[85vh]">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <CheckCircle2 size={24} className="text-gray-400" />
        </div>
        <p className="text-2xl font-extrabold mb-3 text-[var(--color-text)]">Your cart is empty</p>
        <p className="text-sm font-medium text-[var(--color-muted)] mb-8">Add items to your cart before checking out.</p>
        <Link to="/products" className="px-6 py-3 rounded-xl bg-black text-white text-sm font-bold shadow-md hover:bg-gray-800 transition-colors">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-bg)] min-h-[85vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/buyer/cart" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-muted)] hover:text-black transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Cart
        </Link>
        
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--color-text)] mb-10">
          Checkout
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="rounded-3xl p-8 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm">
                <h2 className="text-xl font-extrabold mb-6 text-[var(--color-text)]">Shipping Details</h2>
                
                <div className="space-y-5">
                  <div>
                    {FIELD('Street Address *', 'street', errors.street)}
                    <input id="street" {...register('street', { required: 'Street is required' })} className={inputClass} style={inputStyle} placeholder="123 Textile Ave" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      {FIELD('City *', 'city', errors.city)}
                      <input id="city" {...register('city', { required: 'City is required' })} className={inputClass} style={inputStyle} placeholder="Surat" />
                    </div>
                    <div>
                      {FIELD('State *', 'state', errors.state)}
                      <input id="state" {...register('state', { required: 'State is required' })} className={inputClass} style={inputStyle} placeholder="Gujarat" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      {FIELD('Pincode *', 'pincode', errors.pincode)}
                      <input id="pincode" {...register('pincode', { required: 'Pincode is required' })} className={inputClass} style={inputStyle} placeholder="395002" />
                    </div>
                    <div>
                      {FIELD('Country *', 'country', errors.country)}
                      <input id="country" {...register('country', { required: 'Country is required' })} defaultValue="India" className={inputClass} style={inputStyle} />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          <div className="lg:col-span-5">
            <div className="sticky top-24 p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm">
              <h3 className="text-xl font-extrabold mb-6 text-[var(--color-text)]">
                Order Summary
              </h3>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-[var(--color-border)] max-h-[300px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.product._id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                      {item.product.images?.[0] && (
                        <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="font-bold text-[13px] text-[var(--color-text)] line-clamp-1">{item.product.title}</p>
                      <p className="text-xs font-medium text-[var(--color-muted)] mt-0.5">Qty: {item.quantity} m</p>
                    </div>
                    <div className="font-bold text-sm text-[var(--color-text)] flex items-center">
                      {formatCurrency(item.priceAtAdd * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-[var(--color-border)]">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-[var(--color-muted)]">Subtotal ({totalItems} items)</span>
                  <span className="text-[var(--color-text)]">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-[var(--color-muted)]">Shipping</span>
                  <span className="text-[var(--color-text)]">Free</span>
                </div>
              </div>
              
              <div className="flex justify-between text-lg font-extrabold mb-8 tracking-tight text-[var(--color-text)]">
                <span>Total to pay</span>
                <span className="text-[#0070F3]">{formatCurrency(totalPrice)}</span>
              </div>
              
              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white bg-black hover:bg-gray-800 transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Complete Order'}
              </button>
              <p className="text-center text-[10px] uppercase tracking-wider font-bold text-gray-400 mt-4">
                Secure SSL Encrypted Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
