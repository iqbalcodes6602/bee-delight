const express = require('express');
const {
  getProfile,
  updateProfile,
  getAddresses,
  addAddress,
  deleteAddress
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All user routes require authentication
router.use(protect);

// Profile routes
router.route('/profile')
  .get(getProfile)
  .put(updateProfile);

// Address routes
router.route('/addresses')
  .get(getAddresses)
  .post(addAddress);

router.delete('/addresses/:id', deleteAddress);

module.exports = router;