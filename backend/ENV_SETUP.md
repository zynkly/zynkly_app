# Environment Variables Setup Guide

Create a `.env` file in the `backend` directory with the following variables:

## Server Configuration

```env
PORT=5000
NODE_ENV=development
```

## MongoDB Configuration

### Local MongoDB
```env
MONGODB_URI=mongodb://localhost:27017/cleaning_services
```

### MongoDB Atlas (Cloud)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cleaning_services?retryWrites=true&w=majority
```

## JWT Configuration

```env
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_EXPIRE=7d
```

**Note:** Use a strong, random string for `JWT_SECRET` in production (at least 32 characters).

## Razorpay Configuration

1. Sign up at [https://razorpay.com/](https://razorpay.com/)
2. Go to Dashboard → Settings → API Keys
3. Copy your Key ID and Key Secret

```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

```

**Note:** Use test keys for development, production keys for production.

## Email Configuration (Nodemailer)

### Gmail Setup

1. Enable 2-Step Verification on your Google Account
2. Generate an App Password:
   - Go to [Google Account](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the generated 16-character password

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_character_app_password
EMAIL_FROM=noreply@cleaningservices.com
```

### Other Email Providers

#### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_password
```

#### Yahoo
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your_email@yahoo.com
EMAIL_PASS=your_app_password
```

#### Custom SMTP
```env
EMAIL_HOST=your_smtp_host
EMAIL_PORT=587
EMAIL_USER=your_email@domain.com
EMAIL_PASS=your_password
```

## OTP Configuration

```env
OTP_EXPIRE_MINUTES=10
```

## Complete Example `.env` File

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/cleaning_services

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_EXPIRE=7d

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@cleaningservices.com

# OTP Configuration
OTP_EXPIRE_MINUTES=10
```

## Security Notes

1. **Never commit `.env` file to version control**
2. Use different credentials for development and production
3. Rotate secrets regularly in production
4. Use environment-specific configurations
5. Keep your `.env` file secure and backed up securely

