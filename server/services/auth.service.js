/**
 * services/auth.service.js
 *
 * Business logic for authentication.
 */

const User = require('../models/user.model');
const { generateToken } = require('../utils/token');

const register = async (userData) => {
  const { name, email, password, role, companyName } = userData;

  if (!name || !email || !password) {
    const err = new Error('Please provide name, email, and password');
    err.statusCode = 400;
    throw err;
  }

  if (role === 'supplier' && !companyName) {
    const err = new Error('Company name is required for suppliers');
    err.statusCode = 400;
    throw err;
  }

  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (userExists) {
    const err = new Error('An account with this email already exists');
    err.statusCode = 400;
    throw err;
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    role: role || 'buyer',
    companyName: role === 'supplier' ? companyName : undefined,
  });

  const token = generateToken(user._id);

  // Return user object without password
  const userObj = user.toObject();
  delete userObj.password;

  return { user: userObj, token };
};

const login = async (email, password) => {
  if (!email || !password) {
    const err = new Error('Please provide email and password');
    err.statusCode = 400;
    throw err;
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  const token = generateToken(user._id);

  const userObj = user.toObject();
  delete userObj.password;

  return { user: userObj, token };
};

module.exports = { register, login };
