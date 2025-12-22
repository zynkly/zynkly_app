/**
 * Environment variable validation and configuration
 */

require('dotenv').config();

const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET',
  'EMAIL_HOST',
  'EMAIL_USER',
  'EMAIL_PASS'
];

const validateEnv = () => {
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0 && process.env.NODE_ENV === 'production') {
    console.error('❌ Missing required environment variables:');
    missing.forEach(envVar => console.error(`   - ${envVar}`));
    process.exit(1);
  }
  
  if (missing.length > 0) {
    console.warn('⚠️  Missing environment variables (non-critical in development):');
    missing.forEach(envVar => console.warn(`   - ${envVar}`));
  }
};

// Validate environment variables on load
validateEnv();

const config = {
  // Server
  port: process.env.PORT || 3000, // Changed default from 5000 to avoid macOS AirPlay conflict
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // MongoDB
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/cleaning_services',
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || 'change_this_secret_in_production',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  
  // Razorpay
  razorpayKeyId: process.env.RAZORPAY_KEY_ID,
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET,
  
  // Email
  emailHost: process.env.EMAIL_HOST || 'smtp.gmail.com',
  emailPort: process.env.EMAIL_PORT || 587,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  emailFrom: process.env.EMAIL_FROM || process.env.EMAIL_USER,
  
  // OTP
  otpExpireMinutes: parseInt(process.env.OTP_EXPIRE_MINUTES || '10', 10),
  
  // CORS
  corsOrigin: process.env.CORS_ORIGIN || '*',
  
  // Rate Limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100', 10), // 100 requests per window
  
  // Security
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10', 10),
};

module.exports = config;

