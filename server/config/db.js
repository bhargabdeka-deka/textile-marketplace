/**
 * config/db.js
 *
 * MongoDB connection factory using Mongoose.
 * Called once at server startup. All Mongoose models automatically
 * reuse this connection — no need to import it in individual files.
 */

const mongoose = require('mongoose');

/**
 * connectDB — establish connection to MongoDB.
 * Exits the process on failure so the server does not start
 * with a broken database connection.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options silence Mongoose deprecation warnings
      // and are recommended for production usage.
    });

    console.log(`✅  MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌  MongoDB connection error: ${error.message}`);
    process.exit(1); // Crash fast — let the process manager restart
  }
};

module.exports = connectDB;
