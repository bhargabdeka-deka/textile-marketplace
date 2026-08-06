/**
 * controllers/user.controller.js
 *
 * User profile operations.
 */

const User = require('../models/user.model');
const { success } = require('../utils/apiResponse');

const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(success(user, 'Profile retrieved'));
};

const updateProfile = async (req, res) => {
  const { name, companyName, address } = req.body;
  
  const user = await User.findById(req.user._id);
  if (name) user.name = name;
  if (companyName && user.role === 'supplier') user.companyName = companyName;
  if (address) {
    user.address = { ...user.address, ...address };
  }
  
  await user.save();
  res.json(success(user, 'Profile updated'));
};

module.exports = { getProfile, updateProfile };
