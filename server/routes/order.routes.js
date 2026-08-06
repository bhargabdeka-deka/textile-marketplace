/**
 * routes/order.routes.js
 *
 * Order management API routes.
 */

const express = require('express');
const router = express.Router();
const { protect, authorise } = require('../middleware/auth');

const {
  placeOrder,
  getBuyerOrders,
  getSupplierOrders,
  updateOrderStatus
} = require('../controllers/order.controller');

router.use(protect);

router.post('/', authorise('buyer'), placeOrder);
router.get('/buyer', authorise('buyer'), getBuyerOrders);
router.get('/supplier', authorise('supplier'), getSupplierOrders);
router.put('/:id/status', authorise('supplier'), updateOrderStatus);

module.exports = router;
