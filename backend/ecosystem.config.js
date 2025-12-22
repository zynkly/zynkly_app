/**
 * PM2 Ecosystem Configuration
 * Run with: pm2 start ecosystem.config.js
 */

module.exports = {
  apps: [{
    name: 'cleaning-services-api',
    script: './server.js',
    instances: 'max', // Use all available CPU cores
    exec_mode: 'cluster', // Cluster mode for load balancing
    env: {
      NODE_ENV: 'development',
      PORT: 5000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false, // Set to true for development auto-restart
    max_memory_restart: '1G', // Restart if memory exceeds 1GB
    min_uptime: '10s', // Minimum uptime before considering app stable
    max_restarts: 10, // Maximum restarts in 1 minute
    restart_delay: 4000, // Delay between restarts
    kill_timeout: 5000, // Time to wait before force kill
    listen_timeout: 10000, // Time to wait for app to listen
    shutdown_with_message: true
  }]
};

