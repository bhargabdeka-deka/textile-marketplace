/**
 * models/product.model.js
 *
 * Mongoose schema for the Product collection.
 * Represents a textile product listed by a supplier.
 *
 * Indexes:
 *  - Text index on title + description for full-text search
 *  - Compound index on category + isActive for filtered browsing
 *  - Index on supplier for supplier-owned product queries
 */

const mongoose = require('mongoose');

const CATEGORIES = [
  'Cotton',
  'Silk',
  'Wool',
  'Linen',
  'Synthetic',
  'Denim',
  'Polyester',
  'Rayon',
  'Nylon',
  'Other',
];

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },

    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },

    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: CATEGORIES,
        message: `Category must be one of: ${CATEGORIES.join(', ')}`,
      },
    },

    fabric: {
      type: String,
      trim: true,
      maxlength: [100, 'Fabric name cannot exceed 100 characters'],
    },

    gsm: {
      type: Number,
      min: [1, 'GSM must be at least 1'],
      max: [2000, 'GSM cannot exceed 2000'],
    },

    pricePerMeter: {
      type: Number,
      required: [true, 'Price per meter is required'],
      min: [0.01, 'Price must be greater than 0'],
    },

    minOrderQuantity: {
      type: Number,
      required: [true, 'Minimum order quantity is required'],
      min: [1, 'Minimum order quantity must be at least 1'],
      default: 1,
    },

    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },

    images: {
      type: [String],
      validate: {
        validator: (arr) => arr.length <= 8,
        message: 'A product can have at most 8 images',
      },
      default: [],
    },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Supplier reference is required'],
    },

    tags: {
      type: [String],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    color: {
      type: String,
      trim: true,
    },

    width: {
      type: Number,
      min: [1, 'Width must be at least 1 cm'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Indexes ───────────────────────────────────────────────────────────────────
productSchema.index({ title: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ supplier: 1, isActive: 1 });
productSchema.index({ pricePerMeter: 1 });
productSchema.index({ stock: 1 });
productSchema.index({ createdAt: -1 });

// ── Virtual: inStock ──────────────────────────────────────────────────────────
productSchema.virtual('inStock').get(function () {
  return this.stock > 0;
});

// ── Static: categories list ───────────────────────────────────────────────────
productSchema.statics.CATEGORIES = CATEGORIES;

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
