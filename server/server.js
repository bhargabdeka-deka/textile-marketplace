/**
 * server.js
 *
 * Application entry point.
 * Responsibilities:
 *  1. Load environment variables (must happen before any other import)
 *  2. Connect to MongoDB
 *  3. Create the HTTP server
 *  4. Start listening on the configured port
 *  5. Handle unhandled promise rejections and uncaught exceptions gracefully
 */

// ── Load env FIRST ────────────────────────────────────────────────────────────
require('dotenv').config();

const app       = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ── Connect to Database ───────────────────────────────────────────────────────
connectDB();

// ── Start HTTP Server ─────────────────────────────────────────────────────────
const server = app.listen(PORT, () => {
  console.log('');
  console.log('┌─────────────────────────────────────────────────┐');
  console.log('│       🧵  Textile Marketplace API Server         │');
  console.log('├─────────────────────────────────────────────────┤');
  console.log(`│  Status:       Running                          │`);
  console.log(`│  Port:         ${PORT}                              │`);
  console.log(`│  Environment:  ${NODE_ENV.padEnd(32)}│`);
  console.log(`│  Health:       http://localhost:${PORT}/api/health  │`);
  console.log('└─────────────────────────────────────────────────┘');
  console.log('');
});

// ── Graceful Shutdown ─────────────────────────────────────────────────────────
const gracefulShutdown = (signal) => {
  console.log(`\n⚡ ${signal} received. Shutting down gracefully…`);
  server.close(() => {
    console.log('✅  HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT',  () => gracefulShutdown('SIGINT'));

// ── Safety Nets ───────────────────────────────────────────────────────────────
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌  Unhandled Promise Rejection:', reason);
  // In production, let the process manager (PM2) restart cleanly
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.error('❌  Uncaught Exception:', err.message);
  process.exit(1);
});
