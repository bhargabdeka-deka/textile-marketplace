/**
 * services/product.service.js
 *
 * Business logic for product catalogue operations.
 * Controllers stay thin — all query building, ownership checks,
 * and data transformations happen here.
 */

const Product = require('../models/product.model');

/**
 * findProducts — paginated product list with search, filter, and sort.
 *
 * @param {object} filters
 *   - search:      {string}  Full-text search term
 *   - category:    {string}  Category name
 *   - minPrice:    {number}  Minimum price per meter
 *   - maxPrice:    {number}  Maximum price per meter
 *   - inStock:     {boolean} Only in-stock products
 *   - supplier:    {string}  ObjectId — filter by supplier
 *   - isActive:    {boolean} Default true; admin can pass false
 *
 * @param {object} options
 *   - page:  {number} 1-based page number (default 1)
 *   - limit: {number} Items per page (default 12, max 100)
 *   - sort:  {string} 'newest' | 'price_asc' | 'price_desc' | 'name_asc'
 */
const findProducts = async (filters = {}, options = {}) => {
  const {
    search,
    category,
    minPrice,
    maxPrice,
    inStock,
    supplier,
    isActive = true,
  } = filters;

  const page  = Math.max(1, parseInt(options.page)  || 1);
  const limit = Math.min(100, Math.max(1, parseInt(options.limit) || 12));
  const skip  = (page - 1) * limit;

  // ── Build query ─────────────────────────────────────────────────────────────
  const query = {};

  // Only show active products by default (admin can override)
  query.isActive = isActive;

  if (search) {
    query.$text = { $search: search };
  }

  if (category) {
    query.category = category;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    query.pricePerMeter = {};
    if (minPrice !== undefined) query.pricePerMeter.$gte = Number(minPrice);
    if (maxPrice !== undefined) query.pricePerMeter.$lte = Number(maxPrice);
  }

  if (inStock === 'true' || inStock === true) {
    query.stock = { $gt: 0 };
  }

  if (supplier) {
    query.supplier = supplier;
  }

  // ── Sort ────────────────────────────────────────────────────────────────────
  const sortMap = {
    newest:     { createdAt: -1 },
    price_asc:  { pricePerMeter: 1 },
    price_desc: { pricePerMeter: -1 },
    name_asc:   { title: 1 },
  };

  // When using text search, include relevance score sort
  let sortOption = sortMap[options.sort] || { createdAt: -1 };
  if (search && !options.sort) {
    sortOption = { score: { $meta: 'textScore' }, ...sortOption };
  }

  // ── Execute ─────────────────────────────────────────────────────────────────
  const [products, total] = await Promise.all([
    Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .populate('supplier', 'name companyName avatar'),
    Product.countDocuments(query),
  ]);

  return { products, total, page, limit };
};

/**
 * findProductById — fetch a single product.
 * Populates supplier info for the detail page.
 *
 * @param {string} id - Product ObjectId
 * @throws 404 if not found
 */
const findProductById = async (id) => {
  const product = await Product.findById(id).populate(
    'supplier',
    'name companyName avatar phone address createdAt'
  );

  if (!product) {
    const err = new Error('Product not found');
    err.statusCode = 404;
    throw err;
  }

  return product;
};

/**
 * createProduct — create a new product listing for a supplier.
 *
 * @param {string} supplierId   - Authenticated supplier's user ID
 * @param {object} data         - Product fields from request body
 * @param {Array}  imageFiles   - Multer file objects (optional)
 */
const createProduct = async (supplierId, data, imageFiles = []) => {
  const imagePaths = imageFiles.map(
    (file) => file.path || file.secure_url || file.url
  );

  const product = await Product.create({
    ...data,
    supplier: supplierId,
    images: imagePaths,
    tags: data.tags
      ? data.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [],
  });

  return product;
};

/**
 * updateProduct — update a supplier's own product.
 * Merges existing images with any newly uploaded ones.
 * Only the owning supplier (or admin) may update.
 *
 * @param {string} productId  - Product ObjectId
 * @param {string} supplierId - Authenticated user ID
 * @param {object} data       - Updated fields
 * @param {Array}  imageFiles - New multer file objects (optional)
 * @throws 404 if not found, 403 if not owner
 */
const updateProduct = async (productId, supplierId, data, imageFiles = []) => {
  const product = await Product.findById(productId);

  if (!product) {
    const err = new Error('Product not found');
    err.statusCode = 404;
    throw err;
  }

  if (product.supplier.toString() !== supplierId.toString()) {
    const err = new Error('Not authorised to update this product');
    err.statusCode = 403;
    throw err;
  }

  // Merge new images with existing ones, capping at 8
  const newImagePaths = imageFiles.map(
    (f) => f.path || f.secure_url || f.url
  );
  const updatedImages = [...product.images, ...newImagePaths].slice(0, 8);

  // Handle tags
  const tags = data.tags
    ? data.tags.split(',').map((t) => t.trim()).filter(Boolean)
    : product.tags;

  // Handle explicit image removal (supplier sends keepImages array)
  const keepImages = data.keepImages
    ? JSON.parse(data.keepImages)
    : product.images;

  const mergedImages = [
    ...keepImages.filter((img) => product.images.includes(img)),
    ...newImagePaths,
  ].slice(0, 8);

  Object.assign(product, {
    title:            data.title            ?? product.title,
    description:      data.description      ?? product.description,
    category:         data.category         ?? product.category,
    fabric:           data.fabric           ?? product.fabric,
    gsm:              data.gsm              != null ? Number(data.gsm)              : product.gsm,
    pricePerMeter:    data.pricePerMeter    != null ? Number(data.pricePerMeter)    : product.pricePerMeter,
    minOrderQuantity: data.minOrderQuantity != null ? Number(data.minOrderQuantity) : product.minOrderQuantity,
    stock:            data.stock            != null ? Number(data.stock)            : product.stock,
    color:            data.color            ?? product.color,
    width:            data.width            != null ? Number(data.width)            : product.width,
    isActive:         data.isActive         != null ? data.isActive === 'true' || data.isActive === true : product.isActive,
    images:           mergedImages,
    tags,
  });

  await product.save();
  return product;
};

/**
 * deleteProduct — soft-delete (sets isActive: false) or hard delete.
 * Only the owning supplier (or admin) may delete.
 *
 * @param {string} productId  - Product ObjectId
 * @param {string} supplierId - Authenticated user ID
 * @param {string} userRole   - 'supplier' | 'admin'
 */
const deleteProduct = async (productId, supplierId, userRole) => {
  const product = await Product.findById(productId);

  if (!product) {
    const err = new Error('Product not found');
    err.statusCode = 404;
    throw err;
  }

  const isOwner = product.supplier.toString() === supplierId.toString();
  const isAdmin = userRole === 'admin';

  if (!isOwner && !isAdmin) {
    const err = new Error('Not authorised to delete this product');
    err.statusCode = 403;
    throw err;
  }

  await Product.findByIdAndDelete(productId);
};

/**
 * getSupplierProducts — all products belonging to a supplier.
 * Includes inactive products (supplier sees everything they own).
 *
 * @param {string} supplierId
 * @param {object} options - page, limit, sort
 */
const getSupplierProducts = async (supplierId, options = {}) => {
  return findProducts({ supplier: supplierId, isActive: undefined }, options);
};

module.exports = {
  findProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSupplierProducts,
};
