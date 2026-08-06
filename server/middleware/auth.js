/**
 * middleware/auth.js
 *
 * JWT authentication middleware.
 * Reads the Bearer token from the Authorization header,
 * verifies it, and attaches the decoded user payload to req.user.
 *
 * protect     — blocks unauthenticated requests (401)
 * authorise   — blocks requests from users with wrong role (403)
 */

const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

/**
 * protect — verify JWT and attach req.user
 */
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401);
    return next(new Error('Not authorised, no token provided'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach full user document (minus password) to req.user
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401);
      return next(new Error('Not authorised, user not found'));
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401);
    next(new Error('Not authorised, token invalid or expired'));
  }
};

/**
 * authorise — role-based access control.
 * Must be used AFTER protect.
 * @param {...string} roles - Allowed roles (e.g. 'buyer', 'supplier', 'admin')
 */
const authorise = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    res.status(403);
    return next(
      new Error(`Role '${req.user?.role}' is not permitted to access this resource`)
    );
  }
  next();
};

module.exports = { protect, authorise };
