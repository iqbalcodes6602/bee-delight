const Coupon = require('../models/Coupon');

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Private/Admin
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });

    const couponsData = coupons.map(coupon => ({
      id: coupon._id,
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrderAmount: coupon.minOrderAmount,
      maxUses: coupon.maxUses,
      currentUses: coupon.currentUses,
      validFrom: coupon.validFrom,
      validTo: coupon.validTo,
      isActive: coupon.isActive
    }));

    res.json({
      success: true,
      coupons: couponsData
    });
  } catch (error) {
    console.error('Get coupons error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'COUPONS_FETCH_FAILED',
        message: 'Failed to fetch coupons'
      }
    });
  }
};

// @desc    Create new coupon
// @route   POST /api/coupons
// @access  Private/Admin
const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);

    res.status(201).json({
      success: true,
      coupon: {
        id: coupon._id,
        code: coupon.code,
        description: coupon.description,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        minOrderAmount: coupon.minOrderAmount,
        maxUses: coupon.maxUses,
        currentUses: coupon.currentUses,
        validFrom: coupon.validFrom,
        validTo: coupon.validTo,
        isActive: coupon.isActive
      }
    });
  } catch (error) {
    console.error('Create coupon error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'COUPON_CREATE_FAILED',
        message: 'Failed to create coupon'
      }
    });
  }
};

// @desc    Update coupon
// @route   PUT /api/coupons/:id
// @access  Private/Admin
const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!coupon) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'COUPON_NOT_FOUND',
          message: 'Coupon not found'
        }
      });
    }

    res.json({
      success: true,
      coupon: {
        id: coupon._id,
        code: coupon.code,
        description: coupon.description,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        minOrderAmount: coupon.minOrderAmount,
        maxUses: coupon.maxUses,
        currentUses: coupon.currentUses,
        validFrom: coupon.validFrom,
        validTo: coupon.validTo,
        isActive: coupon.isActive
      }
    });
  } catch (error) {
    console.error('Update coupon error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'COUPON_UPDATE_FAILED',
        message: 'Failed to update coupon'
      }
    });
  }
};

// @desc    Delete coupon
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'COUPON_NOT_FOUND',
          message: 'Coupon not found'
        }
      });
    }

    await Coupon.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Coupon deleted successfully'
    });
  } catch (error) {
    console.error('Delete coupon error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'COUPON_DELETE_FAILED',
        message: 'Failed to delete coupon'
      }
    });
  }
};

// @desc    Validate coupon code
// @route   POST /api/coupons/validate
// @access  Private
const validateCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.json({
        success: true,
        valid: false,
        discount: 0,
        message: 'Invalid coupon code'
      });
    }

    const validation = coupon.isValid(orderAmount);
    let discount = 0;

    if (validation.valid) {
      discount = coupon.calculateDiscount(orderAmount);
    }

    res.json({
      success: true,
      valid: validation.valid,
      discount,
      message: validation.message
    });
  } catch (error) {
    console.error('Validate coupon error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'COUPON_VALIDATION_FAILED',
        message: 'Failed to validate coupon'
      }
    });
  }
};

// @desc    Use coupon (increment usage count)
// @route   POST /api/coupons/use
// @access  Private
const useCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'COUPON_NOT_FOUND',
          message: 'Coupon not found'
        }
      });
    }

    coupon.currentUses += 1;
    coupon.usedBy.push({ user: req.user._id });
    await coupon.save();

    res.json({
      success: true,
      message: 'Coupon used successfully'
    });
  } catch (error) {
    console.error('Use coupon error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'COUPON_USE_FAILED',
        message: 'Failed to use coupon'
      }
    });
  }
};

module.exports = {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
  useCoupon
};