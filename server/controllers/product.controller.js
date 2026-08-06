/**
 * controllers/product.controller.js
 *
 * HTTP handler layer for product endpoints.
 * Delegates all business logic to productService.
 * Uses apiResponse helpers for consistent JSON shape.
 *
 * All async errors propagate to the global errorHandler via
 * express-async-errors (already required in app.js).
 */

const productService          = require('../services/product.service');
const { success, paginated }  = require('../utils/apiResponse');
const Product                 = require('../models/product.model');

/**
 * GET /api/products
 * Public — browse, search, and filter products.
 *
 * Query params:
 *   search, category, minPrice, maxPrice, inStock,
 *   page, limit, sort
 */
const getProducts = async (req, res) => {
  const filters = {
    search:   req.query.search,
    category: req.query.category,
    minPrice: req.query.minPrice,
    maxPrice: req.query.maxPrice,
    inStock:  req.query.inStock,
  };

  const options = {
    page:  req.query.page  || 1,
    limit: req.query.limit || 12,
    sort:  req.query.sort,
  };

  const { products, total, page, limit } = await productService.findProducts(
    filters,
    options
  );

  res.json(paginated(products, { page, limit, total }));
};

/**
 * GET /api/products/categories
 * Public — return the list of valid categories.
 */
const getCategories = async (req, res) => {
  res.json(success(Product.CATEGORIES, 'Categories fetched'));
};

/**
 * GET /api/products/:id
 * Public — get a single product with supplier details.
 */
const getProductById = async (req, res) => {
  const product = await productService.findProductById(req.params.id);
  res.json(success(product, 'Product fetched'));
};

/**
 * POST /api/products
 * Supplier only — create a new product listing.
 * Accepts multipart/form-data for image uploads.
 */
const createProduct = async (req, res) => {
  const imageFiles = req.files || [];

  const product = await productService.createProduct(
    req.user._id,
    req.body,
    imageFiles
  );

  res.status(201).json(success(product, 'Product created successfully'));
};

/**
 * PUT /api/products/:id
 * Supplier only — update own product.
 * Accepts multipart/form-data for image uploads.
 */
const updateProduct = async (req, res) => {
  const imageFiles = req.files || [];

  const product = await productService.updateProduct(
    req.params.id,
    req.user._id,
    req.body,
    imageFiles
  );

  res.json(success(product, 'Product updated successfully'));
};

/**
 * DELETE /api/products/:id
 * Supplier or Admin — delete a product.
 */
const deleteProduct = async (req, res) => {
  await productService.deleteProduct(req.params.id, req.user._id, req.user.role);
  res.json(success(null, 'Product deleted successfully'));
};

/**
 * GET /api/products/my-products
 * Supplier only — list all products belonging to the authenticated supplier,
 * including inactive ones.
 */
const getMyProducts = async (req, res) => {
  const options = {
    page:  req.query.page  || 1,
    limit: req.query.limit || 20,
    sort:  req.query.sort,
  };

  const { products, total, page, limit } = await productService.getSupplierProducts(
    req.user._id,
    options
  );

  res.json(paginated(products, { page, limit, total }));
};

module.exports = {
  getProducts,
  getCategories,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
};
