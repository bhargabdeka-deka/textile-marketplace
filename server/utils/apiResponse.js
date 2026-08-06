/**
 * utils/apiResponse.js
 *
 * Utility helpers to produce consistent API response shapes.
 *
 * Usage:
 *   res.status(200).json(success(data, 'Products fetched'));
 *   res.status(400).json(error('Validation failed', errors));
 */

/**
 * success — standard successful response envelope
 * @param {*} data       - Response payload
 * @param {string} message - Human-readable message
 * @param {object} meta  - Optional pagination / metadata
 */
const success = (data = null, message = 'Success', meta = {}) => ({
  success: true,
  message,
  data,
  ...(Object.keys(meta).length > 0 && { meta }),
});

/**
 * error — standard error response envelope
 * @param {string} message - Error description
 * @param {*} errors       - Validation errors or additional info
 */
const error = (message = 'Something went wrong', errors = null) => ({
  success: false,
  message,
  ...(errors && { errors }),
});

/**
 * paginated — wraps list responses with pagination metadata
 */
const paginated = (data, { page, limit, total }) => ({
  success: true,
  message: 'Success',
  data,
  meta: {
    page: Number(page),
    limit: Number(limit),
    total,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page * limit < total,
    hasPrevPage: page > 1,
  },
});

module.exports = { success, error, paginated };
