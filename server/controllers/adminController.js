const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Review = require('../models/Review');

// @desc    Get all users for admin
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    const usersData = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      isActive: user.isActive
    }));

    res.json({
      success: true,
      users: usersData
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'USERS_FETCH_FAILED',
        message: 'Failed to fetch users'
      }
    });
  }
};

// @desc    Update user role/status
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    const { role, isActive } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        }
      });
    }

    // Prevent admin from demoting themselves
    if (user._id.toString() === req.user._id.toString() && role === 'user') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'CANNOT_DEMOTE_SELF',
          message: 'Cannot demote yourself'
        }
      });
    }

    if (role) user.role = role;
    if (typeof isActive === 'boolean') user.isActive = isActive;

    await user.save();

    res.json({
      success: true,
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'USER_UPDATE_FAILED',
        message: 'Failed to update user'
      }
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        }
      });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'CANNOT_DELETE_SELF',
          message: 'Cannot delete yourself'
        }
      });
    }

    await user.remove();

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'USER_DELETE_FAILED',
        message: 'Failed to delete user'
      }
    });
  }
};

// @desc    Get all orders for admin
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    const ordersData = orders.map(order => ({
      id: order._id,
      userId: order.user._id,
      userName: order.user.name,
      userEmail: order.user.email,
      items: order.orderItems.map(item => ({
        id: item.product,
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
      orders: ordersData
    });
  } catch (error) {
    console.error('Get admin orders error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'ORDERS_FETCH_FAILED',
        message: 'Failed to fetch orders'
      }
    });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    // Calculate totals
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $in: ['delivered', 'shipped'] } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    // const totalOrders = await Order.find();
    const totalOrders = await Order.find().select('status');
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalUsers = await User.countDocuments({ role: 'user' });

    // Recent orders
    const recentOrders = await Order.find()
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentOrdersData = recentOrders.map(order => ({
      id: order._id,
      userName: order.user.name,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt
    }));

    // Popular products
    const popularProducts = await Order.aggregate([
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: '$orderItems.product',
          name: { $first: '$orderItems.name' },
          totalSold: { $sum: '$orderItems.quantity' },
          revenue: { $sum: { $multiply: ['$orderItems.price', '$orderItems.quantity'] } }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    const popularProductsData = popularProducts.map(product => ({
      id: product._id,
      name: product.name,
      totalSold: product.totalSold,
      revenue: product.revenue
    }));

    // Monthly revenue (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$total' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    const monthlyRevenueData = monthlyRevenue.map(item => ({
      month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
      revenue: item.revenue,
      orders: item.orders
    }));

    res.json({
      success: true,
      stats: {
        totalRevenue: totalRevenue[0]?.total || 0,
        totalOrders,
        totalProducts,
        totalUsers,
        recentOrders: recentOrdersData,
        popularProducts: popularProductsData,
        monthlyRevenue: monthlyRevenueData
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'STATS_FETCH_FAILED',
        message: 'Failed to fetch dashboard statistics'
      }
    });
  }
};

// @desc    Get revenue analytics
// @route   GET /api/admin/analytics/revenue
// @access  Private/Admin
const getRevenueAnalytics = async (req, res) => {
  try {
    const { period = 'month', startDate, endDate } = req.query;

    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      };
    } else {
      // Default to last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      dateFilter = { createdAt: { $gte: thirtyDaysAgo } };
    }

    const totalRevenue = await Order.aggregate([
      { $match: { ...dateFilter, status: { $in: ['delivered', 'shipped'] } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const periodRevenue = totalRevenue[0]?.total || 0;

    // Calculate percentage change (simplified)
    const previousPeriodRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date(dateFilter.createdAt.$gte).getTime() - (30 * 24 * 60 * 60 * 1000)),
            $lte: dateFilter.createdAt.$gte
          },
          status: { $in: ['delivered', 'shipped'] }
        }
      },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const previousRevenue = previousPeriodRevenue[0]?.total || 0;
    const percentageChange = previousRevenue > 0 
      ? ((periodRevenue - previousRevenue) / previousRevenue) * 100 
      : 0;

    // Daily revenue
    const dailyRevenue = await Order.aggregate([
      { $match: { ...dateFilter, status: { $in: ['delivered', 'shipped'] } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          revenue: { $sum: '$total' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    const dailyRevenueData = dailyRevenue.map(item => ({
      date: item._id,
      revenue: item.revenue
    }));

    res.json({
      success: true,
      analytics: {
        totalRevenue: periodRevenue,
        periodRevenue,
        percentageChange: Math.round(percentageChange * 100) / 100,
        dailyRevenue: dailyRevenueData
      }
    });
  } catch (error) {
    console.error('Get revenue analytics error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'ANALYTICS_FETCH_FAILED',
        message: 'Failed to fetch revenue analytics'
      }
    });
  }
};

// @desc    Get product analytics
// @route   GET /api/admin/analytics/products
// @access  Private/Admin
const getProductAnalytics = async (req, res) => {
  try {
    // Top selling products
    const topSellingProducts = await Order.aggregate([
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: '$orderItems.product',
          name: { $first: '$orderItems.name' },
          totalSold: { $sum: '$orderItems.quantity' },
          revenue: { $sum: { $multiply: ['$orderItems.price', '$orderItems.quantity'] } }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 10 }
    ]);

    const topSellingData = topSellingProducts.map(product => ({
      id: product._id,
      name: product.name,
      totalSold: product.totalSold,
      revenue: product.revenue
    }));

    // Low stock products
    const lowStockProducts = await Product.find({
      isActive: true,
      stock: { $lte: 10 }
    }).select('name stock').limit(10);

    const lowStockData = lowStockProducts.map(product => ({
      id: product._id,
      name: product.name,
      currentStock: product.stock
    }));

    // Category distribution
    const categoryDistribution = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalProducts = await Product.countDocuments({ isActive: true });
    const categoryData = categoryDistribution.map(cat => ({
      category: cat._id,
      count: cat.count,
      percentage: Math.round((cat.count / totalProducts) * 100)
    }));

    res.json({
      success: true,
      analytics: {
        topSellingProducts: topSellingData,
        lowStockProducts: lowStockData,
        categoryDistribution: categoryData
      }
    });
  } catch (error) {
    console.error('Get product analytics error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'ANALYTICS_FETCH_FAILED',
        message: 'Failed to fetch product analytics'
      }
    });
  }
};

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  getAdminOrders,
  getDashboardStats,
  getRevenueAnalytics,
  getProductAnalytics
};