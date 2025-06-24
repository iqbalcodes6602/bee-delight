const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Coupon code is required'],
    unique: true,
    uppercase: true,
    trim: true,
    maxlength: [20, 'Coupon code cannot exceed 20 characters']
  },
  description: {
    type: String,
    required: [true, 'Coupon description is required'],
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: [true, 'Discount value is required'],
    min: [0, 'Discount value cannot be negative']
  },
  minOrderAmount: {
    type: Number,
    default: 0,
    min: [0, 'Minimum order amount cannot be negative']
  },
  maxUses: {
    type: Number,
    default: null // null means unlimited
  },
  currentUses: {
    type: Number,
    default: 0
  },
  validFrom: {
    type: Date,
    required: true
  },
  validTo: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  usedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    usedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Validate that validTo is after validFrom
couponSchema.pre('save', function(next) {
  if (this.validTo <= this.validFrom) {
    next(new Error('Valid to date must be after valid from date'));
  }
  next();
});

// Check if coupon is valid
couponSchema.methods.isValid = function(orderAmount = 0) {
  const now = new Date();
  
  // Check if coupon is active
  if (!this.isActive) {
    return { valid: false, message: 'Coupon is not active' };
  }

  // Check date validity
  if (now < this.validFrom || now > this.validTo) {
    return { valid: false, message: 'Coupon has expired or not yet valid' };
  }

  // Check usage limit
  if (this.maxUses && this.currentUses >= this.maxUses) {
    return { valid: false, message: 'Coupon usage limit exceeded' };
  }

  // Check minimum order amount
  if (orderAmount < this.minOrderAmount) {
    return { 
      valid: false, 
      message: `Minimum order amount of $${this.minOrderAmount} required` 
    };
  }

  return { valid: true, message: 'Coupon is valid' };
};

// Calculate discount amount
couponSchema.methods.calculateDiscount = function(orderAmount) {
  if (this.discountType === 'percentage') {
    return Math.round(orderAmount * (this.discountValue / 100) * 100) / 100;
  } else {
    return Math.min(this.discountValue, orderAmount);
  }
};

module.exports = mongoose.model('Coupon', couponSchema);