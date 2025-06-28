const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.json({
        success: true,
        items: []
      });
    }

    const items = wishlist.items.map(item => ({
      id: item.product._id,
      name: item.product.name,
      price: item.product.price,
      image: item.product.image
    }));

    res.json({
      success: true,
      items
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'WISHLIST_FETCH_FAILED',
        message: 'Failed to fetch wishlist'
      }
    });
  }
};

// @desc    Add item to wishlist
// @route   POST /api/wishlist/items
// @access  Private
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PRODUCT_NOT_FOUND',
          message: 'Product not found'
        }
      });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      // Create new wishlist
      wishlist = new Wishlist({
        user: req.user._id,
        items: [{ product: productId }]
      });
    } else {
      // Check if product already exists in wishlist
      const existingItem = wishlist.items.find(
        item => item.product.toString() === productId
      );

      if (existingItem) {
        return res.status(409).json({
          success: false,
          error: {
            code: 'ITEM_EXISTS',
            message: 'Item already exists in wishlist'
          }
        });
      }

      wishlist.items.push({ product: productId });
    }

    await wishlist.save();

    res.json({
      success: true,
      message: 'Item added to wishlist'
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'WISHLIST_ADD_FAILED',
        message: 'Failed to add item to wishlist'
      }
    });
  }
};

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/items/:productId
// @access  Private
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'WISHLIST_NOT_FOUND',
          message: 'Wishlist not found'
        }
      });
    }

    wishlist.items = wishlist.items.filter(
      item => item.product.id.toString() !== productId
    );

    await wishlist.save();

    res.json({
      success: true,
      message: 'Item removed from wishlist'
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'WISHLIST_REMOVE_FAILED',
        message: 'Failed to remove item from wishlist'
      }
    });
  }
};

// @desc    Clear entire wishlist
// @route   DELETE /api/wishlist
// @access  Private
const clearWishlist = async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({ user: req.user._id });

    res.json({
      success: true,
      message: 'Wishlist cleared'
    });
  } catch (error) {
    console.error('Clear wishlist error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'WISHLIST_CLEAR_FAILED',
        message: 'Failed to clear wishlist'
      }
    });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist
};