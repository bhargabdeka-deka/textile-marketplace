/**
 * src/services/order.service.js
 *
 * API call wrappers for order endpoints.
 */

import api from './axiosInstance';

const orderService = {
  placeOrder: async (shippingAddress) => {
    const response = await api.post('/orders', { shippingAddress });
    return response.data;
  },

  getBuyerOrders: async () => {
    const response = await api.get('/orders/buyer');
    return response.data;
  },

  getSupplierOrders: async () => {
    const response = await api.get('/orders/supplier');
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response.data;
  },
};

export default orderService;
