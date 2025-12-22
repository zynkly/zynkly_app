/**
 * Seed script to populate initial services
 * Run with: node scripts/seedServices.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');

const services = [
  {
    name: 'Home Cleaning',
    description: 'Complete home cleaning service including dusting, mopping, and vacuuming',
    price: 500,
    duration: 120,
    category: 'home',
    isActive: true
  },
  {
    name: 'Bathroom Cleaning',
    description: 'Deep cleaning of bathroom including tiles, fixtures, and sanitization',
    price: 300,
    duration: 60,
    category: 'bathroom',
    isActive: true
  },
  {
    name: 'Kitchen Cleaning',
    description: 'Thorough kitchen cleaning including appliances, countertops, and cabinets',
    price: 400,
    duration: 90,
    category: 'kitchen',
    isActive: true
  },
  {
    name: 'Deep Cleaning',
    description: 'Comprehensive deep cleaning service for entire home',
    price: 1500,
    duration: 240,
    category: 'deep',
    isActive: true
  },
  {
    name: 'Office Cleaning',
    description: 'Professional office cleaning service',
    price: 800,
    duration: 180,
    category: 'office',
    isActive: true
  },
  {
    name: 'Window Cleaning',
    description: 'Interior and exterior window cleaning',
    price: 250,
    duration: 45,
    category: 'other',
    isActive: true
  },
  {
    name: 'Carpet Cleaning',
    description: 'Deep carpet cleaning and vacuuming',
    price: 600,
    duration: 90,
    category: 'other',
    isActive: true
  },
  {
    name: 'Sofa Cleaning',
    description: 'Professional sofa and upholstery cleaning',
    price: 700,
    duration: 120,
    category: 'other',
    isActive: true
  }
];

const seedServices = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cleaning_services';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');

    // Clear existing services
    await Service.deleteMany({});
    console.log('✅ Cleared existing services');

    // Insert services
    const createdServices = await Service.insertMany(services);
    console.log(`✅ Created ${createdServices.length} services`);

    // Display created services
    console.log('\n📋 Created Services:');
    createdServices.forEach((service, index) => {
      console.log(`${index + 1}. ${service.name} - ₹${service.price} (${service.duration} min)`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding services:', error);
    process.exit(1);
  }
};

seedServices();

