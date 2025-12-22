/**
 * Request ID middleware for tracing requests
 */

const { v4: uuidv4 } = require('uuid');

const requestId = (req, res, next) => {
  // Generate or use existing request ID
  req.id = req.headers['x-request-id'] || uuidv4();
  
  // Set response header
  res.setHeader('X-Request-ID', req.id);
  
  next();
};

module.exports = requestId;

