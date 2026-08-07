/**
 * middleware/upload.js
 *
 * Multer file upload middleware factory.
 * Provides pre-configured upload handlers for different use cases
 * (product images, documents, profile pictures, etc.).
 *
 * Storage: Local disk (uploads/ directory).
 */

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'textile-marketplace', // Folder name in Cloudinary
    allowed_formats: ['jpeg', 'jpg', 'png', 'webp', 'gif'],
    // transformation: [{ width: 800, height: 800, crop: 'limit' }], // Optional optimizations
  },
});

// File Type Filter
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif/;
  const isAllowed =
    allowed.test(path.extname(file.originalname).toLowerCase()) &&
    allowed.test(file.mimetype);

  if (isAllowed) {
    cb(null, true);
  } else {
    cb(new Error('Only images (JPEG, PNG, WebP, GIF) are allowed'));
  }
};

const MAX_SIZE_MB = parseInt(process.env.MAX_FILE_SIZE_MB || '10', 10);

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 },
});

module.exports = upload;
