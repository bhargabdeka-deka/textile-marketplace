/**
 * routes/ai.routes.js
 *
 * AI routes for the marketplace.
 */

const express = require('express');
const router = express.Router();

const { aiSearch } = require('../controllers/ai.controller');

router.post('/search', aiSearch);

module.exports = router;
