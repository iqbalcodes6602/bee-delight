const express = require('express');
const { 
  register, 
  login, 
  logout, 
  getMe,
  updatePassword
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { 
  validateUserRegistration, 
  validateUserLogin 
} = require('../middleware/validationMiddleware');

const router = express.Router();

// Public routes
router.post('/register', validateUserRegistration, register);
router.post('/login', validateUserLogin, login);

// Protected routes
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/password', protect, updatePassword);

module.exports = router;