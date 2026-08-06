/**
 * app.js
 *
 * Express application factory.
 * Separating the app from server.js (the HTTP listener) is a best practice
 * that makes the app testable without binding to a port.
 *
 * Middleware order matters:
 *  1. Security headers (helmet)
 *  2. CORS
 *  3. Request logging (morgan)
 *  4. Body parsers
 *  5. Static files
 *  6. API routes
 *  7. 404 handler
 *  8. Global error handler  ← MUST be last
 */

require('express-async-errors'); // Patches async route handlers to forward errors to next()

const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');
const path    = require('path');

const corsOptions   = require('./config/corsOptions');
const notFound      = require('./middleware/notFound');
const errorHandler  = require('./middleware/errorHandler');

const app = express();

// ── Security ──────────────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Pre-flight for all routes

// ── Request Logging ───────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// ── Body Parsers ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Static Files (uploaded assets) ───────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Textile Marketplace API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/auth',     require('./routes/auth.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/orders',   require('./routes/order.routes'));
app.use('/api/cart',     require('./routes/cart.routes'));
app.use('/api/users',    require('./routes/user.routes'));
app.use('/api/ai',       require('./routes/ai.routes'));

// ── 404 & Error Handling (MUST be last) ──────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
