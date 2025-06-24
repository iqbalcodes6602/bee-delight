const express = require('express');
const {
  getProductReviews,
  createReview,
  deleteReview,
  getAllReviews
} = require('../controllers/reviewController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { validateReview } = require('../middleware/validationMiddleware');

const router = express.Router();

// Public routes
router.get('/product/:productId', getProductReviews);

// Protected routes
router.post('/', protect, validateReview, createReview);

// Admin routes
router.get('/', protect, adminOnly, getAllReviews);
router.delete('/:id', protect, adminOnly, deleteReview);

module.exports = router;