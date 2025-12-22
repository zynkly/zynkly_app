# Quick Start Guide

Get your Cleaning Services backend up and running in minutes!

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Razorpay account (for payments)
- Gmail account (for email/OTP)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp ENV_SETUP.md .env
# Then edit .env with your actual values
```

**Minimum required variables:**
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A random secret string (min 32 chars)
- `RAZORPAY_KEY_ID` - Your Razorpay key ID
- `RAZORPAY_KEY_SECRET` - Your Razorpay key secret
- `EMAIL_USER` - Your email address
- `EMAIL_PASS` - Your email app password

### 3. Start MongoDB

**Local MongoDB:**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**Or use MongoDB Atlas (Cloud):**
- Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get connection string
- Update `MONGODB_URI` in `.env`

### 4. Seed Initial Data (Optional)

```bash
# Seed services
npm run seed:services

# Create admin user
npm run create:admin
```

### 5. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
📝 Environment: development
✅ Email server is ready to send messages
```

### 6. Test the API

**Health Check:**
```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Cleaning Services API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Testing Authentication Flow

### 1. Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "password": "password123"
  }'
```

### 2. Verify OTP
Check your email for OTP, then:
```bash
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "otp": "123456"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Save the `token` from the response.

### 4. Get Services
```bash
curl http://localhost:5000/api/services
```

### 5. Add to Cart
```bash
curl -X POST http://localhost:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "serviceId": "SERVICE_ID_HERE",
    "quantity": 1
  }'
```

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify network access if using Atlas

### Email Not Sending
- Check Gmail app password is correct
- Ensure 2-Step Verification is enabled
- Verify `EMAIL_USER` and `EMAIL_PASS` in `.env`

### Razorpay Errors
- Use test keys for development
- Verify `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
- Check Razorpay dashboard for key status

### Port Already in Use
- Change `PORT` in `.env`
- Or kill the process using port 5000:
  ```bash
  # macOS/Linux
  lsof -ti:5000 | xargs kill
  
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

## Next Steps

1. **Read the full documentation:** See `README.md`
2. **Explore API endpoints:** Check `README.md` for complete API reference
3. **Set up your frontend:** Connect your mobile app to these APIs
4. **Configure production:** Update environment variables for production

## Need Help?

- Check `README.md` for detailed documentation
- Review `ENV_SETUP.md` for environment configuration
- Check server logs for error messages

Happy coding! 🚀

