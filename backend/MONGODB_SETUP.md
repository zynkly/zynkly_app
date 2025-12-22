# MongoDB Setup Guide

This guide helps you set up MongoDB for the Cleaning Services backend.

## Option 1: Local MongoDB Without Authentication (Recommended for Development)

### macOS (using Homebrew)

1. **Install MongoDB:**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```

2. **Start MongoDB:**
   ```bash
   brew services start mongodb-community
   ```

3. **Verify it's running:**
   ```bash
   brew services list
   # Should show mongodb-community started
   ```

4. **Check MongoDB status:**
   ```bash
   mongosh
   # Should connect successfully
   ```

5. **Your `.env` file should have:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/cleaning_services
   ```

### Linux

1. **Install MongoDB:**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install -y mongodb

   # Or follow official MongoDB installation guide
   ```

2. **Start MongoDB:**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

3. **Verify:**
   ```bash
   sudo systemctl status mongod
   ```

### Windows

1. Download MongoDB from [mongodb.com/download](https://www.mongodb.com/try/download/community)
2. Install MongoDB Community Server
3. MongoDB should start automatically as a service
4. Verify in Services (services.msc) that MongoDB is running

---

## Option 2: Local MongoDB With Authentication

If your MongoDB has authentication enabled, update your connection string:

```env
MONGODB_URI=mongodb://username:password@localhost:27017/cleaning_services?authSource=admin
```

**To disable authentication for local development:**

1. Edit MongoDB config file:
   - **macOS:** `/usr/local/etc/mongod.conf` or `/opt/homebrew/etc/mongod.conf`
   - **Linux:** `/etc/mongod.conf`
   - **Windows:** `C:\Program Files\MongoDB\Server\{version}\bin\mongod.cfg`

2. Comment out or remove the security section:
   ```yaml
   # security:
   #   authorization: enabled
   ```

3. Restart MongoDB:
   ```bash
   # macOS
   brew services restart mongodb-community
   
   # Linux
   sudo systemctl restart mongod
   
   # Windows
   # Restart MongoDB service from Services
   ```

---

## Option 3: MongoDB Atlas (Cloud - Recommended for Production)

1. **Sign up:** Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a free cluster:**
   - Click "Build a Database"
   - Choose FREE (M0) tier
   - Select your preferred cloud provider and region
   - Click "Create"

3. **Set up database access:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password
   - Set privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Set up network access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, add specific IPs only

5. **Get connection string:**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `cleaning_services`

6. **Your `.env` file should have:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cleaning_services?retryWrites=true&w=majority
   ```

---

## Troubleshooting

### Error: "Command find requires authentication"

**Solution 1:** Update your connection string to include credentials:
```env
MONGODB_URI=mongodb://username:password@localhost:27017/cleaning_services
```

**Solution 2:** Disable authentication for local development (see Option 2 above)

**Solution 3:** Use MongoDB Atlas (cloud) which handles authentication automatically

### Error: "Connection refused"

- Make sure MongoDB is running:
  ```bash
  # macOS
  brew services list
  
  # Linux
  sudo systemctl status mongod
  ```

- Check if MongoDB is listening on port 27017:
  ```bash
  lsof -i :27017
  # or
  netstat -an | grep 27017
  ```

### Error: "Cannot connect to MongoDB"

1. Verify MongoDB is installed:
   ```bash
   mongod --version
   ```

2. Check MongoDB logs:
   - **macOS:** `/usr/local/var/log/mongodb/mongo.log`
   - **Linux:** `/var/log/mongodb/mongod.log`
   - **Windows:** Check Event Viewer

3. Try connecting manually:
   ```bash
   mongosh
   # or
   mongo
   ```

### Testing Connection

Test your MongoDB connection:

```bash
# Using mongosh
mongosh "mongodb://localhost:27017/cleaning_services"

# Or test with Node.js
node -e "require('mongoose').connect('your_connection_string').then(() => console.log('Connected!')).catch(e => console.error(e))"
```

---

## Quick Fix for "Command find requires authentication"

If you're getting this error and want a quick fix for development:

1. **Stop MongoDB:**
   ```bash
   # macOS
   brew services stop mongodb-community
   
   # Linux
   sudo systemctl stop mongod
   ```

2. **Start MongoDB without authentication:**
   ```bash
   # macOS/Linux
   mongod --dbpath /usr/local/var/mongodb --noauth
   
   # Or specify your data directory
   mongod --dbpath ~/data/db --noauth
   ```

3. **Update `.env`:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/cleaning_services
   ```

4. **Test connection:**
   ```bash
   npm run dev
   ```

---

## Recommended Setup

- **Development:** Local MongoDB without authentication
- **Production:** MongoDB Atlas (cloud) with authentication

For the quickest setup, use **MongoDB Atlas** - it's free and handles all the complexity for you!

