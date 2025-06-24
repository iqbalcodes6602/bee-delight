const express = require('express');
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { validateOrder } = require('../middleware/validationMiddleware');

const router = express.Router();

// All order routes require authentication
router.use(protect);

router.route('/')
  .get(getOrders)
  .post(validateOrder, createOrder);

router.get('/:id', getOrder);
router.put('/:id/status', adminOnly, updateOrderStatus);

module.exports = router;