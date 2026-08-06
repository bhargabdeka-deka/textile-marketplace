/**
 * utils/token.js
 *
 * JWT generation utility.
 */

const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  const idStr = userId ? userId.toString() : '';
  return jwt.sign({ id: idStr }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

module.exports = { generateToken };
