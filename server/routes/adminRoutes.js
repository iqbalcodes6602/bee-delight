const express = require('express');
const {
  getUsers,
  updateUser,
  deleteUser,
  getAdminOrders,
  getDashboardStats,
  getRevenueAnalytics,
  getProductAnalytics
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// All admin routes require authentication and admin privileges
router.use(protect, adminOnly);

// User management
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Order management
router.get('/orders', getAdminOrders);

// Analytics
router.get('/stats', getDashboardStats);
router.get('/analytics/revenue', getRevenueAnalytics);
router.get('/analytics/products', getProductAnalytics);

module.exports = router;