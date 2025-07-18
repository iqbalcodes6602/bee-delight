const express = require('express');
const {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getAdminBlogPosts
} = require('../controllers/blogController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/posts', getBlogPosts);
router.post('/posts', protect, adminOnly, createBlogPost);
router.get('/posts/admin', protect, adminOnly, getAdminBlogPosts);
router.get('/posts/:id', getBlogPost);

// Admin routes
router.put('/posts/:id', protect, adminOnly, updateBlogPost);
router.delete('/posts/:id', protect, adminOnly, deleteBlogPost);

module.exports = router;