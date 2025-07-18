const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .sort({ createdAt: -1 });

    const reviewsData = reviews.map(review => ({
      id: review._id,
      productId: review.product,
      userId: review.user._id,
      userName: review.user.name,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt
    }));

    // Calculate average rating
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    res.json({
      success: true,
      reviews: reviewsData,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: reviews.length
    });
  } catch (error) {
    console.error('Get product reviews error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'REVIEWS_FETCH_FAILED',
        message: 'Failed to fetch reviews'
      }
    });
  }
};

// @desc    Create product review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PRODUCT_NOT_FOUND',
          message: 'Product not found'
        }
      });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      product: productId,
      user: req.user._id
    });

    if (existingReview) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'REVIEW_EXISTS',
          message: 'You have already reviewed this product'
        }
      });
    }

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      rating,
      comment
    });

    const populatedReview = await Review.findById(review._id);

    res.status(201).json({
      success: true,
      review: {
        id: populatedReview._id,
        productId: populatedReview.product,
        userId: populatedReview.user._id,
        userName: populatedReview.user.name,
        rating: populatedReview.rating,
        comment: populatedReview.comment,
        createdAt: populatedReview.createdAt
      }
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'REVIEW_CREATE_FAILED',
        message: 'Failed to create review'
      }
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'REVIEW_NOT_FOUND',
          message: 'Review not found'
        }
      });
    }

    await Review.deleteOne({ _id: req.params.id });

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'REVIEW_DELETE_FAILED',
        message: 'Failed to delete review'
      }
    });
  }
};

// @desc    Get all reviews for admin
// @route   GET /api/reviews
// @access  Private/Admin
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('product', 'name')
      .sort({ createdAt: -1 });

    const reviewsData = reviews.map(review => ({
      id: review._id,
      productId: review.product?._id,
      productName: review.product?.name,
      userId: review.user?._id,
      userName: review.user?.name,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt
    }));

    res.json({
      success: true,
      reviews: reviewsData
    });
  } catch (error) {
    console.error('Get all reviews error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'REVIEWS_FETCH_FAILED',
        message: 'Failed to fetch reviews'
      }
    });
  }
};

module.exports = {
  getProductReviews,
  createReview,
  deleteReview,
  getAllReviews
};