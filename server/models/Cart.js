const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  size: {
    type: String,
    enum: ['250g', '500g', '1kg', '2kg'],
    default: '500g'
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update updatedAt before saving
cartSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate total items and total price
cartSchema.methods.calculateTotals = function() {
  let totalItems = 0;
  let totalPrice = 0;

  this.items.forEach(item => {
    totalItems += item.quantity;
    if (item.product && item.product.price) {
      totalPrice += item.quantity * item.product.price;
    }
  });

  return { totalItems, totalPrice };
};

// Populate product details when querying
cartSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'items.product',
    select: 'name price images stock'
  });
  next();
});

module.exports = mongoose.model('Cart', cartSchema);