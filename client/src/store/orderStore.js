/**
 * src/store/orderStore.js
 *
 * Zustand store for orders state.
 */

import { create } from 'zustand';
import orderService from '@/services/order.service';
import useCartStore from '@/store/cartStore';
import toast from 'react-hot-toast';

const useOrderStore = create((set, get) => ({
  buyerOrders: [],
  supplierOrders: [],
  isLoading: false,

  fetchBuyerOrders: async () => {
    set({ isLoading: true });
    try {
      const res = await orderService.getBuyerOrders();
      set({ buyerOrders: res.data || [], isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      toast.error(err.response?.data?.message || err.message || 'Failed to fetch orders');
    }
  },

  fetchSupplierOrders: async () => {
    set({ isLoading: true });
    try {
      const res = await orderService.getSupplierOrders();
      set({ supplierOrders: res.data || [], isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      toast.error(err.response?.data?.message || err.message || 'Failed to fetch orders');
    }
  },

  placeOrder: async (shippingAddress) => {
    try {
      await orderService.placeOrder(shippingAddress);
      toast.success('Order placed successfully');
      // Clear cart locally
      useCartStore.getState().clearCart();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to place order');
      throw err;
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      const res = await orderService.updateOrderStatus(orderId, status);
      set((state) => ({
        supplierOrders: state.supplierOrders.map((o) =>
          o._id === orderId ? res.data : o
        ),
      }));
      toast.success('Order status updated');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to update order status');
    }
  },
}));

export default useOrderStore;
