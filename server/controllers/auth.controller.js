/**
 * controllers/auth.controller.js
 *
 * Controller for authentication operations.
 */

const authService = require('../services/auth.service');
const { success } = require('../utils/apiResponse');

const register = async (req, res) => {
  const data = await authService.register(req.body);
  res.status(201).json(success(data, 'User registered successfully', 201));
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const data = await authService.login(email, password);
  res.json(success(data, 'User logged in successfully'));
};

const logout = async (req, res) => {
  // Stateless JWT doesn't need server-side logout unless token blacklisting is implemented
  res.json(success(null, 'Logged out successfully'));
};

const getMe = async (req, res) => {
  res.json(success({ user: req.user }, 'User retrieved'));
};

module.exports = { register, login, logout, getMe };
