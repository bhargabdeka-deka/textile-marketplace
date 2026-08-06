/**
 * controllers/order.controller.js
 *
 * HTTP handler layer for order endpoints.
 */

const orderService = require('../services/order.service');
const { success } = require('../utils/apiResponse');

const placeOrder = async (req, res) => {
  const { shippingAddress } = req.body;
  if (!shippingAddress) {
    return res.status(400).json(success(null, 'Shipping address is required', 400));
  }
  const orders = await orderService.createOrder(req.user._id, shippingAddress);
  res.status(201).json(success(orders, 'Order placed successfully'));
};

const getBuyerOrders = async (req, res) => {
  const orders = await orderService.getBuyerOrders(req.user._id);
  res.json(success(orders, 'Buyer orders fetched'));
};

const getSupplierOrders = async (req, res) => {
  const orders = await orderService.getSupplierOrders(req.user._id);
  res.json(success(orders, 'Supplier orders fetched'));
};

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await orderService.updateOrderStatus(req.params.id, req.user._id, status);
  res.json(success(order, 'Order status updated'));
};

module.exports = {
  placeOrder,
  getBuyerOrders,
  getSupplierOrders,
  updateOrderStatus
};
