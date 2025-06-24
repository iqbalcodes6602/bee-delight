const express = require('express');
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist
} = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All wishlist routes require authentication
router.use(protect);

router.route('/')
  .get(getWishlist)
  .delete(clearWishlist);

router.post('/items', addToWishlist);
router.delete('/items/:productId', removeFromWishlist);

module.exports = router;