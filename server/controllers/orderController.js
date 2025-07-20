const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('orderItems.product', 'name images');

    const formattedOrders = orders.map(order => ({
      id: order._id,
      userId: order.user._id,
      items: order.orderItems.map(item => ({
        id: item.product._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      shippingAddress: order.shippingAddress
    }));

    res.json({
      success: true,
      orders: formattedOrders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'ORDERS_FETCH_FAILED',
        message: 'Failed to fetch orders'
      }
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('orderItems.product', 'name images');

    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ORDER_NOT_FOUND',
          message: 'Order not found'
        }
      });
    }

    // Check if user owns this order or is admin
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: {
          code: 'ACCESS_DENIED',
          message: 'Access denied'
        }
      });
    }

    res.json({
      success: true,
      order: {
        id: order._id,
        userId: order.user._id,
        items: order.orderItems.map(item => ({
          id: item.product._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        shippingAddress: order.shippingAddress
      }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'ORDER_FETCH_FAILED',
        message: 'Failed to fetch order'
      }
    });
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { items, total, shippingAddress, couponCode } = req.body;

    // Validate items stock
    for (const item of items) {
      const product = await Product.findById(item.id);
      if (!product || !product.isActive) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'PRODUCT_NOT_AVAILABLE',
            message: `Product ${item.name} is not available`
          }
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INSUFFICIENT_STOCK',
            message: `Insufficient stock for ${item.name}`
          }
        });
      }
    }

    let discount = 0;
    
    // Apply coupon if provided
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });
      if (coupon) {
        const validation = coupon.isValid(total);
        if (validation.valid) {
          discount = coupon.calculateDiscount(total);
          coupon.currentUses += 1;
          coupon.usedBy.push({ user: req.user._id });
          await coupon.save();
        }
      }
    }

    // Create order
    const order = new Order({
      user: req.user._id,
      orderItems: items.map(item => ({
        product: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      shippingAddress,
      subtotal: total,
      discount,
      total: total - discount,
      couponCode
    });

    await order.save();

    // Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.id, {
        $inc: { stock: -item.quantity }
      });
    }

    // Clear user's cart
    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(201).json({
      success: true,
      order: {
        id: order._id,
        status: order.status,
        total: order.total
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'ORDER_CREATE_FAILED',
        message: 'Failed to create order'
      }
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ORDER_NOT_FOUND',
          message: 'Order not found'
        }
      });
    }

    // Validate status transition
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_STATUS',
          message: 'Invalid order status'
        }
      });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      message: 'Order status updated'
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'ORDER_UPDATE_FAILED',
        message: 'Failed to update order status'
      }
    });
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus
};