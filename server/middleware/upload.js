/**
 * middleware/upload.js
 *
 * Multer file upload middleware with Cloudinary storage integration.
 * Uploads product images directly to Cloudinary and returns HTTPS URLs.
 */

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// ─── Cloudinary Storage Configuration ───────────────────────────────────────
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'textile-marketplace/products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
  },
});

// ─── Max file size from env or default to 10 MB ───────────────────────────────
const MAX_SIZE_MB = parseInt(process.env.MAX_FILE_SIZE_MB || '10', 10);

// ─── Export reusable upload handler ─────────────────────────────────────────
const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 },
});

module.exports = upload;
