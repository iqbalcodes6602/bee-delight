const express = require('express');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All cart routes require authentication
router.use(protect);

router.route('/')
  .get(getCart)
  .delete(clearCart);

router.post('/items', addToCart);
router.route('/items/:productId')
  .put(updateCartItem)
  .delete(removeFromCart);

module.exports = router;