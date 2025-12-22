# Cleaning Services Backend API

A scalable Node.js backend for a Cleaning Services mobile app (similar to Urban Company / Snabbit / Pronto).

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (with Mongoose ODM)
- **Razorpay** - Payment gateway integration
- **Nodemailer** - Email service for OTP and notifications
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## Features

### 1. User Authentication & Verification
- User signup with email and phone number
- Email OTP verification using Nodemailer
- Login with email + password OR OTP
- JWT-based authentication
- Protected routes middleware

### 2. Services Management
- List all cleaning services
- Filter by category (home, bathroom, kitchen, deep cleaning, etc.)
- Each service includes: name, description, price, duration

### 3. Cart Management
- Add services to cart
- Update item quantities
- Remove items from cart
- Clear entire cart
- Dynamic total calculation

### 4. Order & Payment Flow
- Create Razorpay order
- Secure payment verification
- Order creation after successful payment
- Order confirmation emails

### 5. Email Notifications
- OTP emails during signup/login
- Order confirmation emails with details
- Beautiful HTML email templates

### 6. Order Management
- View order history
- Order status tracking (pending, paid, cancelled, completed)
- Order cancellation

### 7. Admin Panel
- Add/update/delete services
- View all orders
- Update order status
- View all users
- Dashboard statistics

## Project Structure

```
backend/
├── controllers/       # Request handlers
│   ├── authController.js
│   ├── serviceController.js
│   ├── cartController.js
│   ├── orderController.js
│   └── adminController.js
├── models/           # MongoDB schemas
│   ├── User.js
│   ├── Service.js
│   ├── Cart.js
│   └── Order.js
├── routes/           # API routes
│   ├── auth.js
│   ├── services.js
│   ├── cart.js
│   ├── orders.js
│   └── admin.js
├── middleware/       # Custom middleware
│   ├── auth.js
│   ├── errorHandler.js
│   └── validator.js
├── utils/            # Utility functions
│   ├── jwt.js
│   ├── email.js
│   └── razorpay.js
├── server.js         # Entry point
├── package.json
└── README.md
```

## Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the `backend` directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/cleaning_services

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d

   # Razorpay Configuration
   RAZORPAY_KEY_ID=your_razorpay_key_id
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

3. **Start MongoDB:**
   Make sure MongoDB is running on your system.

4. **Run the server:**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/signup` | Register new user | Public |
| POST | `/verify-otp` | Verify email OTP | Public |
| POST | `/resend-otp` | Resend OTP | Public |
| POST | `/login` | Login with email/password | Public |
| POST | `/login-otp` | Request OTP for login | Public |
| POST | `/verify-login-otp` | Verify OTP and login | Public |
| GET | `/me` | Get current user | Private |

### Services (`/api/services`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all services | Public |
| GET | `/:id` | Get single service | Public |

### Cart (`/api/cart`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get user cart | Private |
| POST | `/add` | Add item to cart | Private |
| PUT | `/update/:itemId` | Update cart item | Private |
| DELETE | `/remove/:itemId` | Remove item from cart | Private |
| DELETE | `/clear` | Clear cart | Private |

### Orders (`/api/orders`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/create-order` | Create Razorpay order | Private |
| POST | `/verify-payment` | Verify payment and create order | Private |
| GET | `/` | Get user orders | Private |
| GET | `/:id` | Get single order | Private |
| PUT | `/:id/cancel` | Cancel order | Private |

### Admin (`/api/admin`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/services` | Create service | Admin |
| PUT | `/services/:id` | Update service | Admin |
| DELETE | `/services/:id` | Delete service | Admin |
| GET | `/orders` | Get all orders | Admin |
| PUT | `/orders/:id/status` | Update order status | Admin |
| GET | `/users` | Get all users | Admin |
| GET | `/stats` | Get dashboard stats | Admin |

## Request/Response Examples

### Signup
```json
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "User registered successfully. Please verify your email with OTP.",
  "data": {
    "userId": "...",
    "email": "john@example.com",
    "phone": "9876543210"
  }
}
```

### Add to Cart
```json
POST /api/cart/add
Headers: { "Authorization": "Bearer <token>" }
{
  "serviceId": "service_id_here",
  "quantity": 2
}
```

### Create Razorpay Order
```json
POST /api/orders/create-order
Headers: { "Authorization": "Bearer <token>" }

Response:
{
  "success": true,
  "data": {
    "orderId": "order_xxx",
    "amount": 500,
    "currency": "INR",
    "keyId": "rzp_test_xxx"
  }
}
```

### Verify Payment
```json
POST /api/orders/verify-payment
Headers: { "Authorization": "Bearer <token>" }
{
  "razorpayOrderId": "order_xxx",
  "razorpayPaymentId": "pay_xxx",
  "razorpaySignature": "signature_xxx",
  "address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "landmark": "Near Park"
  }
}
```

## Environment Variables Setup

### MongoDB
- Install MongoDB locally or use MongoDB Atlas (cloud)
- Update `MONGODB_URI` in `.env`

### Razorpay
1. Sign up at [Razorpay](https://razorpay.com/)
2. Get your API keys from Dashboard → Settings → API Keys
3. Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to `.env`

### Email (Gmail)
1. Enable 2-Step Verification on your Google Account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use your Gmail address and the app password in `.env`

## Security Features

- **Password hashing** with bcrypt (configurable rounds)
- **JWT token authentication** with configurable expiration
- **Input validation** with express-validator
- **Payment signature verification** for Razorpay
- **Protected routes middleware** with role-based access
- **Error handling middleware** with request ID tracking
- **Environment variables** for all secrets
- **Helmet.js** for security headers
- **CORS** protection with configurable origins
- **Rate limiting** to prevent abuse
- **XSS protection** with xss-clean
- **MongoDB injection protection** with express-mongo-sanitize
- **HTTP Parameter Pollution** protection with hpp
- **Request size limits** to prevent DoS attacks

## Error Handling

All errors are handled by a centralized error handler middleware. Errors return in the following format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

## Testing

You can test the API using:
- Postman
- cURL
- Thunder Client (VS Code extension)
- Any HTTP client

## Production Features

### Security
- ✅ Helmet.js for security headers
- ✅ Rate limiting (100 requests per 15 minutes by default)
- ✅ Stricter rate limiting for auth endpoints (5 requests per 15 minutes)
- ✅ XSS protection
- ✅ MongoDB injection protection
- ✅ HTTP Parameter Pollution protection
- ✅ Request size limits (10MB)
- ✅ CORS with configurable origins

### Performance
- ✅ Response compression (gzip)
- ✅ Cluster mode support (PM2)
- ✅ Request ID tracking for debugging
- ✅ Structured logging with Morgan
- ✅ Graceful shutdown handling

### Monitoring
- ✅ Health check endpoint (`/health`)
- ✅ Request logging
- ✅ Error logging with request IDs
- ✅ Uptime tracking
- ✅ Environment information in health check

### Reliability
- ✅ Graceful shutdown on SIGTERM/SIGINT
- ✅ Unhandled rejection handling
- ✅ Uncaught exception handling
- ✅ MongoDB connection error handling
- ✅ Environment variable validation

## Production Deployment

See [PRODUCTION.md](./PRODUCTION.md) for complete deployment guide.

Quick steps:
1. Set `NODE_ENV=production` in `.env`
2. Use a strong `JWT_SECRET` (min 32 characters)
3. Use MongoDB Atlas or a managed MongoDB service
4. Configure `CORS_ORIGIN` with your frontend domain(s)
5. Enable HTTPS (use Nginx reverse proxy with Let's Encrypt)
6. Use PM2 for process management
7. Set up monitoring and error tracking
8. Configure backups for MongoDB

## License

ISC

## Support

For issues or questions, please contact the development team.

