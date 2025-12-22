const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Service price is required'],
    min: [0, 'Price cannot be negative']
  },
  duration: {
    type: Number, // Duration in minutes
    required: [true, 'Service duration is required'],
    min: [1, 'Duration must be at least 1 minute']
  },
  category: {
    type: String,
    enum: ['home', 'bathroom', 'kitchen', 'deep', 'office', 'other'],
    default: 'other'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  imageUrl: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);

