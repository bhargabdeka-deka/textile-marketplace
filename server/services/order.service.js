/**
 * services/order.service.js
 *
 * Business logic for orders.
 */

const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

const createOrder = async (buyerId, shippingAddress) => {
  const cart = await Cart.findOne({ user: buyerId }).populate('items.product');
  
  if (!cart || cart.items.length === 0) {
    const err = new Error('Cart is empty');
    err.statusCode = 400;
    throw err;
  }

  // Split items by supplier
  const supplierItems = {};
  
  cart.items.forEach(item => {
    const supplierId = item.product.supplier.toString();
    if (!supplierItems[supplierId]) {
      supplierItems[supplierId] = [];
    }
    supplierItems[supplierId].push({
      product: item.product._id,
      quantity: item.quantity,
      price: item.priceAtAdd,
    });
  });

  const orders = [];

  for (const [supplierId, items] of Object.entries(supplierItems)) {
    const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    
    const order = await Order.create({
      buyer: buyerId,
      supplier: supplierId,
      items,
      totalAmount,
      shippingAddress,
      status: 'Pending',
    });
    
    orders.push(order);
  }

  // Empty cart
  cart.items = [];
  await cart.save();

  return orders;
};

const getBuyerOrders = async (buyerId) => {
  return await Order.find({ buyer: buyerId })
    .populate('supplier', 'name companyName email phone')
    .populate('items.product', 'title images')
    .sort({ createdAt: -1 });
};

const getSupplierOrders = async (supplierId) => {
  return await Order.find({ supplier: supplierId })
    .populate('buyer', 'name email phone')
    .populate('items.product', 'title images')
    .sort({ createdAt: -1 });
};

const updateOrderStatus = async (orderId, supplierId, status) => {
  const order = await Order.findById(orderId);
  if (!order) {
    const err = new Error('Order not found');
    err.statusCode = 404;
    throw err;
  }
  
  if (order.supplier.toString() !== supplierId.toString()) {
    const err = new Error('Not authorised to update this order');
    err.statusCode = 403;
    throw err;
  }
  
  const validStatuses = ['Pending', 'Accepted', 'Preparing', 'Ready for Dispatch', 'Completed'];
  if (!validStatuses.includes(status)) {
    const err = new Error('Invalid status');
    err.statusCode = 400;
    throw err;
  }
  
  order.status = status;
  await order.save();
  return order;
};

module.exports = {
  createOrder,
  getBuyerOrders,
  getSupplierOrders,
  updateOrderStatus
};
