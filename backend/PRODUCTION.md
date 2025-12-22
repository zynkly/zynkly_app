# Production Deployment Guide

Complete guide for deploying the Cleaning Services backend to production.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] MongoDB connection string set (preferably MongoDB Atlas)
- [ ] Strong JWT_SECRET generated (min 32 characters)
- [ ] Razorpay production keys configured
- [ ] Email service configured and tested
- [ ] CORS origins configured for your frontend domain
- [ ] Rate limiting configured appropriately
- [ ] SSL/HTTPS enabled
- [ ] Error logging configured
- [ ] Monitoring set up

## Environment Variables for Production

Create a `.env` file with production values:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB Configuration (Use MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cleaning_services?retryWrites=true&w=majority

# JWT Configuration (Generate a strong secret)
JWT_SECRET=your_very_strong_secret_min_32_characters_long_random_string
JWT_EXPIRE=7d

# Razorpay Configuration (Production Keys)
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_production_razorpay_secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_production_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@yourdomain.com

# OTP Configuration
OTP_EXPIRE_MINUTES=10

# CORS Configuration (Comma-separated origins)
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

## Security Best Practices

### 1. Generate Strong JWT Secret

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

### 2. MongoDB Security

- Use MongoDB Atlas with IP whitelisting
- Enable authentication
- Use strong passwords
- Enable MongoDB encryption at rest
- Regular backups

### 3. Server Security

- Use HTTPS only (SSL/TLS)
- Keep Node.js and dependencies updated
- Use environment variables for all secrets
- Never commit `.env` files
- Use a reverse proxy (Nginx) in front of Node.js
- Enable firewall rules
- Use process manager (PM2)

### 4. API Security

- Rate limiting enabled (already configured)
- Input validation (already implemented)
- XSS protection (already implemented)
- SQL injection protection (MongoDB sanitization)
- CORS properly configured
- Security headers (Helmet)

## Deployment Options

### Option 1: VPS (DigitalOcean, AWS EC2, etc.)

#### Step 1: Set up Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (v18+)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

#### Step 2: Deploy Application

```bash
# Clone repository
git clone <your-repo-url>
cd cleaning-services-backend/backend

# Install dependencies
npm install --production

# Set up environment variables
nano .env
# Add all production environment variables

# Start with PM2
pm2 start server.js --name cleaning-services-api
pm2 save
pm2 startup
```

#### Step 3: Configure Nginx

Create `/etc/nginx/sites-available/cleaning-services`:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/cleaning-services /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 4: SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.yourdomain.com
```

### Option 2: Heroku

#### Step 1: Install Heroku CLI

```bash
# macOS
brew install heroku/brew/heroku

# Or download from heroku.com
```

#### Step 2: Deploy

```bash
# Login
heroku login

# Create app
heroku create cleaning-services-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
# ... set all other variables

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Option 3: AWS (EC2 + Elastic Beanstalk)

1. Create Elastic Beanstalk application
2. Upload code or connect Git repository
3. Configure environment variables
4. Set up MongoDB Atlas
5. Deploy

### Option 4: Railway / Render / Fly.io

These platforms simplify deployment:

1. Connect GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically on push

## Process Management

### Using PM2

```bash
# Start application
pm2 start server.js --name cleaning-services-api

# Monitor
pm2 monit

# View logs
pm2 logs cleaning-services-api

# Restart
pm2 restart cleaning-services-api

# Stop
pm2 stop cleaning-services-api

# Save configuration
pm2 save

# Setup startup script
pm2 startup
```

### PM2 Ecosystem File

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'cleaning-services-api',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    max_memory_restart: '1G'
  }]
};
```

Start with:
```bash
pm2 start ecosystem.config.js
```

## Monitoring & Logging

### 1. Application Logs

Logs are automatically written to console. For production:

```bash
# PM2 logs
pm2 logs cleaning-services-api

# Or redirect to file
pm2 start server.js --name cleaning-services-api --log logs/app.log
```

### 2. Error Tracking

Consider integrating:
- **Sentry** - Error tracking
- **LogRocket** - Session replay and logging
- **New Relic** - Application performance monitoring
- **Datadog** - Infrastructure monitoring

### 3. Health Checks

Monitor the `/health` endpoint:

```bash
# Simple health check script
curl https://api.yourdomain.com/health
```

## Performance Optimization

### 1. Enable Compression

Already enabled in `server.js` with `compression` middleware.

### 2. Database Indexing

Add indexes to frequently queried fields:

```javascript
// In models
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
orderSchema.index({ user: 1, createdAt: -1 });
```

### 3. Caching

Consider adding Redis for:
- Session storage
- Rate limiting
- API response caching

### 4. Load Balancing

Use Nginx or cloud load balancer to distribute traffic across multiple Node.js instances.

## Backup Strategy

### MongoDB Backups

**MongoDB Atlas:**
- Automated backups enabled by default
- Point-in-time recovery available

**Self-hosted MongoDB:**
```bash
# Daily backup script
mongodump --uri="mongodb://..." --out=/backups/$(date +%Y%m%d)
```

### Application Backups

- Version control (Git)
- Environment variables backup (secure storage)
- Database dumps

## Scaling

### Horizontal Scaling

1. Run multiple PM2 instances:
   ```bash
   pm2 start ecosystem.config.js
   ```

2. Use load balancer (Nginx)

3. Scale MongoDB (MongoDB Atlas auto-scaling)

### Vertical Scaling

- Increase server resources (CPU, RAM)
- Optimize database queries
- Add caching layer

## Maintenance

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Test thoroughly before deploying
npm test
```

### Database Migrations

Use Mongoose migrations or manual scripts for schema changes.

## Troubleshooting

### Check Application Status

```bash
pm2 status
pm2 logs cleaning-services-api --lines 100
```

### Check MongoDB Connection

```bash
mongosh "your_connection_string"
```

### Check Nginx Status

```bash
sudo systemctl status nginx
sudo nginx -t
```

### Common Issues

1. **Port already in use**: Kill process or change PORT
2. **MongoDB connection failed**: Check connection string and network
3. **Rate limiting too strict**: Adjust `RATE_LIMIT_MAX`
4. **CORS errors**: Update `CORS_ORIGIN` in `.env`

## Support

For production issues:
1. Check application logs
2. Check server logs
3. Check MongoDB logs
4. Review error tracking service (if configured)

## Post-Deployment

- [ ] Test all API endpoints
- [ ] Verify email sending
- [ ] Test payment flow (with test mode first)
- [ ] Monitor error rates
- [ ] Set up alerts
- [ ] Document API endpoints for frontend team
- [ ] Set up CI/CD pipeline

