/**
 * services/cart.service.js
 *
 * Business logic for shopping cart operations.
 */

const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

const getCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate({
    path: 'items.product',
    select: 'title pricePerMeter minOrderQuantity stock images supplier',
    populate: {
      path: 'supplier',
      select: 'companyName name'
    }
  });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

const addItem = async (userId, data) => {
  const { productId, quantity } = data;
  
  const product = await Product.findById(productId);
  if (!product) {
    const err = new Error('Product not found');
    err.statusCode = 404;
    throw err;
  }
  if (!product.isActive) {
    const err = new Error('Product is not active');
    err.statusCode = 400;
    throw err;
  }
  
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  
  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
      priceAtAdd: product.pricePerMeter,
    });
  }
  
  await cart.save();
  return getCart(userId);
};

const updateItemQuantity = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    const err = new Error('Cart not found');
    err.statusCode = 404;
    throw err;
  }
  
  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
  if (itemIndex > -1) {
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    await cart.save();
  }
  
  return getCart(userId);
};

const removeItem = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });
  if (cart) {
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
  }
  return getCart(userId);
};

const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
  return getCart(userId);
};

module.exports = {
  getCart,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart
};
