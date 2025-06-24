const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Prevent duplicate products in wishlist
wishlistSchema.index({ user: 1, 'items.product': 1 }, { unique: true, sparse: true });

// Populate product details when querying
wishlistSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'items.product',
    select: 'name price image'
  });
  next();
});

module.exports = mongoose.model('Wishlist', wishlistSchema);