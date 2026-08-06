/**
 * src/store/cartStore.js
 *
 * Zustand store for shopping cart state.
 * Syncs with the backend API.
 */

import { create } from 'zustand';
import cartService from '@/services/cart.service';
import toast from 'react-hot-toast';

const useCartStore = create((set, get) => ({
  items: [],
  isLoading: false,

  get totalItems() {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  get totalPrice() {
    return get().items.reduce(
      (sum, item) => sum + item.quantity * item.priceAtAdd,
      0
    );
  },

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const res = await cartService.getCart();
      set({ items: res.data?.items || [], isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      console.error(err);
    }
  },

  addItem: async (product, quantity = 1) => {
    try {
      const res = await cartService.addItem(product._id, quantity);
      set({ items: res.data?.items || [] });
      toast.success('Added to cart');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to add item to cart');
    }
  },

  updateQuantity: async (productId, quantity) => {
    if (quantity <= 0) {
      return get().removeItem(productId);
    }
    try {
      const res = await cartService.updateQuantity(productId, quantity);
      set({ items: res.data?.items || [] });
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to update quantity');
    }
  },

  removeItem: async (productId) => {
    try {
      const res = await cartService.removeItem(productId);
      set({ items: res.data?.items || [] });
      toast.success('Removed from cart');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to remove item');
    }
  },

  clearCart: async () => {
    try {
      const res = await cartService.clearCart();
      set({ items: [] });
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to clear cart');
    }
  },
}));

export default useCartStore;
