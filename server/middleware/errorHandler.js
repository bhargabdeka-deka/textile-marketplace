/**
 * middleware/errorHandler.js
 *
 * Global Express error-handling middleware.
 * Must be registered LAST in app.js (after all routes).
 *
 * Catches both synchronous throws and async errors forwarded
 * via `next(err)` or via the `express-async-errors` patch.
 */

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || err.status || (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose Duplicate Key error (e.g., duplicate email)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0] || 'email';
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} is already registered`;
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((val) => val.message).join(', ');
  }

  // Handle JWT Errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid authentication token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication token has expired';
  }

  const isDev = process.env.NODE_ENV === 'development';

  // Log error details for server debugging
  if (isDev) {
    console.error(`[ERROR ${statusCode}] ${req.method} ${req.originalUrl} — ${message}`);
    if (err.stack) console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(isDev && { stack: err.stack }),
  });
};

module.exports = errorHandler;
