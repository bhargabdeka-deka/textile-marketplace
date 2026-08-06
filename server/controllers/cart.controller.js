/**
 * controllers/cart.controller.js
 *
 * HTTP handler layer for cart endpoints.
 */

const cartService = require('../services/cart.service');
const { success } = require('../utils/apiResponse');

const getCart = async (req, res) => {
  const cart = await cartService.getCart(req.user._id);
  res.json(success(cart, 'Cart fetched'));
};

const addItem = async (req, res) => {
  const cart = await cartService.addItem(req.user._id, req.body);
  res.status(201).json(success(cart, 'Item added to cart'));
};

const updateItemQuantity = async (req, res) => {
  const cart = await cartService.updateItemQuantity(req.user._id, req.params.itemId, req.body.quantity);
  res.json(success(cart, 'Cart updated'));
};

const removeItem = async (req, res) => {
  const cart = await cartService.removeItem(req.user._id, req.params.itemId);
  res.json(success(cart, 'Item removed from cart'));
};

const clearCart = async (req, res) => {
  const cart = await cartService.clearCart(req.user._id);
  res.json(success(cart, 'Cart cleared'));
};

module.exports = {
  getCart,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart
};
