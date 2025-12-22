/**
 * Script to create an admin user
 * Run with: node scripts/createAdmin.js
 * 
 * Usage:
 * node scripts/createAdmin.js --email admin@example.com --password admin123 --name "Admin User"
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cleaning_services';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected\n');

    // Get admin details
    const name = await question('Enter admin name: ');
    const email = await question('Enter admin email: ');
    const phone = await question('Enter admin phone: ');
    const password = await question('Enter admin password (min 6 chars): ');

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('\n❌ User with this email already exists');
      process.exit(1);
    }

    // Create admin user
    const admin = await User.create({
      name,
      email,
      phone,
      password,
      role: 'admin',
      isEmailVerified: true,
      isActive: true
    });

    console.log('\n✅ Admin user created successfully!');
    console.log(`   Name: ${admin.name}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Phone: ${admin.phone}`);
    console.log(`   Role: ${admin.role}`);

    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error creating admin:', error.message);
    if (error.message.includes('authentication')) {
      console.error('\n💡 MongoDB Authentication Error:');
      console.error('   Your MongoDB requires authentication.');
      console.error('   Update your MONGODB_URI in .env file to include credentials:');
      console.error('   Format: mongodb://username:password@localhost:27017/cleaning_services');
      console.error('   Or disable authentication in MongoDB for local development.');
    }
    rl.close();
    process.exit(1);
  }
};

createAdmin();

