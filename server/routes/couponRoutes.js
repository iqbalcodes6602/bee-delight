const express = require('express');
const {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
  useCoupon
} = require('../controllers/couponController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/validate', protect, validateCoupon);
router.post('/use', protect, useCoupon);

// Admin routes
router.route('/')
  .get(protect, adminOnly, getCoupons)
  .post(protect, adminOnly, createCoupon);

router.route('/:id')
  .put(protect, adminOnly, updateCoupon)
  .delete(protect, adminOnly, deleteCoupon);

module.exports = router;