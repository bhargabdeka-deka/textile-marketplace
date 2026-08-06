/**
 * routes/product.routes.js
 *
 * Product catalogue API routes.
 *
 * Public (no auth):
 *   GET  /api/products              — browse with search, filter, pagination
 *   GET  /api/products/categories   — list valid categories
 *   GET  /api/products/:id          — single product detail
 *
 * Supplier only (auth + role):
 *   GET    /api/products/my-products   — supplier's own listings
 *   POST   /api/products               — create product (multipart)
 *   PUT    /api/products/:id           — update own product (multipart)
 *   DELETE /api/products/:id           — delete own product
 */

const express    = require('express');
const router     = express.Router();
const { protect, authorise } = require('../middleware/auth');
const upload     = require('../middleware/upload');

const {
  getProducts,
  getCategories,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
} = require('../controllers/product.controller');

// ── Public Routes ─────────────────────────────────────────────────────────────
router.get('/categories', getCategories);
router.get('/',           getProducts);

// ── Supplier Protected Routes ─────────────────────────────────────────────────
// NOTE: /my-products must be defined BEFORE /:id to avoid being caught as an ID
router.get(
  '/my-products',
  protect,
  authorise('supplier', 'admin'),
  getMyProducts
);

router.post(
  '/',
  protect,
  authorise('supplier'),
  upload.array('images', 8),
  createProduct
);

// ── Parameterised Routes ──────────────────────────────────────────────────────
router.get('/:id', getProductById);

router.put(
  '/:id',
  protect,
  authorise('supplier', 'admin'),
  upload.array('images', 8),
  updateProduct
);

router.delete(
  '/:id',
  protect,
  authorise('supplier', 'admin'),
  deleteProduct
);

module.exports = router;
