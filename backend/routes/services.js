const express = require('express');
const {
  getAllServices,
  getService
} = require('../controllers/serviceController');

const router = express.Router();

// @route   GET /api/services
router.get('/', getAllServices);

// @route   GET /api/services/:id
router.get('/:id', getService);

module.exports = router;

