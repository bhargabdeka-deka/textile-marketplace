/**
 * middleware/notFound.js
 *
 * 404 middleware — catches any request that didn't match a route.
 * Must be registered AFTER all routes but BEFORE errorHandler.
 *
 * Forwards a 404 error to the global errorHandler so all error
 * responses follow the same JSON shape.
 */

const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = notFound;
