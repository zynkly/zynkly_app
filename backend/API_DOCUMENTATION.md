# API Documentation

Complete API reference for Cleaning Services Backend.

**Base URL:** `http://localhost:5000/api`

---

## Authentication Endpoints

### 1. Signup
**POST** `/auth/signup`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}
```

**Response:**
```json
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

---

### 2. Verify OTP
**POST** `/auth/verify-otp`

Verify email with OTP received during signup.

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

---

### 3. Resend OTP
**POST** `/auth/resend-otp`

Resend OTP to user's email.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

---

### 4. Login (Email/Password)
**POST** `/auth/login`

Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "role": "user"
    }
  }
}
```

---

### 5. Login with OTP (Request)
**POST** `/auth/login-otp`

Request OTP for login.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

---

### 6. Verify Login OTP
**POST** `/auth/verify-login-otp`

Verify OTP and complete login.

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Response:** Same as login endpoint.

---

### 7. Get Current User
**GET** `/auth/me`

Get current authenticated user details.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "role": "user",
      "isEmailVerified": true
    }
  }
}
```

---

## Services Endpoints

### 1. Get All Services
**GET** `/services`

Get list of all available services.

**Query Parameters:**
- `category` (optional): Filter by category (home, bathroom, kitchen, deep, office, other)
- `isActive` (optional): Filter by active status (true/false)

**Example:**
```
GET /services?category=home&isActive=true
```

**Response:**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "_id": "...",
      "name": "Home Cleaning",
      "description": "Complete home cleaning service...",
      "price": 500,
      "duration": 120,
      "category": "home",
      "isActive": true,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

---

### 2. Get Single Service
**GET** `/services/:id`

Get details of a specific service.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Home Cleaning",
    "description": "...",
    "price": 500,
    "duration": 120,
    "category": "home",
    "isActive": true
  }
}
```

---

## Cart Endpoints

All cart endpoints require authentication.

### 1. Get Cart
**GET** `/cart`

Get user's shopping cart.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "user": "...",
    "items": [
      {
        "_id": "...",
        "service": {
          "_id": "...",
          "name": "Home Cleaning",
          "price": 500,
          "duration": 120
        },
        "quantity": 2,
        "price": 500
      }
    ],
    "totalAmount": 1000,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### 2. Add to Cart
**POST** `/cart/add`

Add a service to cart.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "serviceId": "service_id_here",
  "quantity": 1
}
```

---

### 3. Update Cart Item
**PUT** `/cart/update/:itemId`

Update quantity of a cart item.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "quantity": 3
}
```

---

### 4. Remove from Cart
**DELETE** `/cart/remove/:itemId`

Remove an item from cart.

**Headers:**
```
Authorization: Bearer <token>
```

---

### 5. Clear Cart
**DELETE** `/cart/clear`

Remove all items from cart.

**Headers:**
```
Authorization: Bearer <token>
```

---

## Order Endpoints

All order endpoints require authentication.

### 1. Create Razorpay Order
**POST** `/orders/create-order`

Create a Razorpay order for payment.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Razorpay order created",
  "data": {
    "orderId": "order_xxxxxxxxxxxxx",
    "amount": 1000,
    "currency": "INR",
    "keyId": "rzp_test_xxxxxxxxxxxxx"
  }
}
```

**Note:** Use this `orderId` and `keyId` in your frontend Razorpay integration.

---

### 2. Verify Payment
**POST** `/orders/verify-payment`

Verify Razorpay payment and create order.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "razorpayOrderId": "order_xxxxxxxxxxxxx",
  "razorpayPaymentId": "pay_xxxxxxxxxxxxx",
  "razorpaySignature": "signature_xxxxxxxxxxxxx",
  "address": {
    "street": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "landmark": "Near Park"
  },
  "scheduledDate": "2024-01-15T10:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "_id": "...",
    "orderId": "ORD1234567890",
    "user": "...",
    "items": [...],
    "totalAmount": 1000,
    "status": "paid",
    "paymentStatus": "completed",
    "razorpayOrderId": "order_xxx",
    "razorpayPaymentId": "pay_xxx",
    "createdAt": "..."
  }
}
```

---

### 3. Get User Orders
**GET** `/orders`

Get all orders for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "orderId": "ORD1234567890",
      "items": [...],
      "totalAmount": 1000,
      "status": "paid",
      "paymentStatus": "completed",
      "createdAt": "..."
    }
  ]
}
```

---

### 4. Get Single Order
**GET** `/orders/:id`

Get details of a specific order.

**Headers:**
```
Authorization: Bearer <token>
```

---

### 5. Cancel Order
**PUT** `/orders/:id/cancel`

Cancel an order (only if not completed).

**Headers:**
```
Authorization: Bearer <token>
```

---

## Admin Endpoints

All admin endpoints require authentication and admin role.

### 1. Create Service
**POST** `/admin/services`

Create a new service.

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "New Service",
  "description": "Service description",
  "price": 500,
  "duration": 120,
  "category": "home",
  "imageUrl": "https://example.com/image.jpg"
}
```

---

### 2. Update Service
**PUT** `/admin/services/:id`

Update an existing service.

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:** (all fields optional)
```json
{
  "name": "Updated Name",
  "price": 600,
  "isActive": false
}
```

---

### 3. Delete Service
**DELETE** `/admin/services/:id`

Delete a service.

**Headers:**
```
Authorization: Bearer <admin_token>
```

---

### 4. Get All Orders
**GET** `/admin/orders`

Get all orders (with pagination).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `status` (optional): Filter by status (pending, paid, cancelled, completed)
- `paymentStatus` (optional): Filter by payment status (pending, completed, failed)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example:**
```
GET /admin/orders?status=paid&page=1&limit=20
```

---

### 5. Update Order Status
**PUT** `/admin/orders/:id/status`

Update order status.

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "completed"
}
```

**Valid statuses:** `pending`, `paid`, `cancelled`, `completed`

---

### 6. Get All Users
**GET** `/admin/users`

Get all users (with pagination).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

---

### 7. Get Dashboard Stats
**GET** `/admin/stats`

Get dashboard statistics.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalOrders": 500,
    "totalServices": 8,
    "totalRevenue": 250000,
    "ordersByStatus": {
      "pending": 10,
      "paid": 450,
      "cancelled": 20,
      "completed": 20
    }
  }
}
```

---

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Authentication

Most endpoints require authentication using JWT tokens.

**How to use:**
1. Login or signup to get a token
2. Include token in request headers:
   ```
   Authorization: Bearer <your_token_here>
   ```
3. Token expires in 7 days (configurable via `JWT_EXPIRE`)

---

## Rate Limiting

Currently not implemented. Consider adding rate limiting for production.

---

## CORS

CORS is enabled for all origins. Configure in `server.js` for production.

---

## Notes

- All timestamps are in ISO 8601 format
- All prices are in INR (Indian Rupees)
- Duration is in minutes
- OTP expires in 10 minutes (configurable)
- Payment amounts are in paise (Razorpay) but API returns in rupees

