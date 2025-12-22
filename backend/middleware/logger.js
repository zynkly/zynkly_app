/**
 * Request logging middleware
 */

const morgan = require('morgan');
const config = require('../config/env');

// Custom token for request ID
morgan.token('id', (req) => req.id || 'no-id');

// Custom format for development
const devFormat = ':id :method :url :status :response-time ms - :res[content-length]';

// Custom format for production
const prodFormat = ':id :method :url :status :response-time ms :res[content-length] :remote-addr';

// Create logger based on environment
const logger = config.nodeEnv === 'production' 
  ? morgan(prodFormat, {
      skip: (req, res) => res.statusCode < 400, // Only log errors in production
    })
  : morgan(devFormat);

module.exports = logger;

