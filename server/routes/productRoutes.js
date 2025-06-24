const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { validateProduct } = require('../middleware/validationMiddleware');

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Admin only routes
router.post('/', protect, adminOnly, validateProduct, createProduct);
router.put('/:id', protect, adminOnly, validateProduct, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;