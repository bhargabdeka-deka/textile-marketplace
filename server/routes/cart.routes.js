/**
 * routes/cart.routes.js
 *
 * Shopping cart API routes.
 */

const express = require('express');
const router = express.Router();
const { protect, authorise } = require('../middleware/auth');

const {
  getCart,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart
} = require('../controllers/cart.controller');

router.use(protect);
router.use(authorise('buyer'));

router.get('/', getCart);
router.post('/', addItem);
router.put('/:itemId', updateItemQuantity);
router.delete('/:itemId', removeItem);
router.delete('/', clearCart);

module.exports = router;
