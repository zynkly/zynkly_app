const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const config = require('./config/env');

// Import routes
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const requestId = require('./middleware/requestId');
const logger = require('./middleware/logger');
const {
  cors,
  helmet,
  limiter,
  authLimiter,
  mongoSanitize,
  hpp,
  xss,
} = require('./middleware/security');

const app = express();

// Trust proxy (important for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Security middleware (order matters!)
app.use(helmet);
app.use(cors);
app.use(xss);
app.use(mongoSanitize);
app.use(hpp);

// Request ID middleware (must be before logger)
app.use(requestId);

// Logging middleware
app.use(logger);

// Compression middleware
app.use(compression());

// Body parser middleware with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api/', limiter);
app.use('/api/auth/', authLimiter);

// Health check route (before rate limiting)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Cleaning Services API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
    version: require('./package.json').version,
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/admin', adminRoutes);

// Backward compatibility - redirect old routes to v1
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    requestId: req.id,
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// MongoDB connection with improved error handling
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error.message);
  console.error('\n💡 Troubleshooting tips:');
  console.error('   1. Make sure MongoDB is running');
  console.error('   2. Check your MONGODB_URI in .env file');
  console.error('   3. If using local MongoDB without auth, ensure authentication is disabled');
  console.error('   4. If using MongoDB Atlas, verify your connection string includes username and password');
  if (config.nodeEnv === 'production') {
    process.exit(1);
  }
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);
  
  server.close(() => {
    console.log('✅ HTTP server closed');
    
    // Mongoose 7+ doesn't accept callback, returns a promise
    mongoose.connection.close(false)
      .then(() => {
        console.log('✅ MongoDB connection closed');
        process.exit(0);
      })
      .catch((err) => {
        console.error('❌ Error closing MongoDB connection:', err);
        process.exit(1);
      });
  });

  // Force close after 10 seconds
  setTimeout(() => {
    console.error('❌ Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

// Start server
const PORT = config.port;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${config.nodeEnv}`);
  console.log(`🌐 CORS Origin: ${config.corsOrigin}`);
  console.log(`⏱️  Rate Limit: ${config.rateLimitMax} requests per ${config.rateLimitWindowMs / 1000}s`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
    console.error(`💡 Try one of these solutions:`);
    console.error(`   1. Kill the process using port ${PORT}: lsof -ti:${PORT} | xargs kill -9`);
    console.error(`   2. Change PORT in .env file to a different port`);
    console.error(`   3. Find what's using the port: lsof -i:${PORT}`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', err);
    process.exit(1);
  }
});

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  if (config.nodeEnv === 'production') {
    gracefulShutdown('unhandledRejection');
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  gracefulShutdown('uncaughtException');
});

module.exports = app;

