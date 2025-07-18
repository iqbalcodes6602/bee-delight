const BlogPost = require('../models/BlogPost');

// @desc    Get published blog posts
// @route   GET /api/blog/posts
// @access  Public
const getBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find({ published: true })
      .sort({ createdAt: -1 });

    const postsData = posts.map(post => ({
      id: post._id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      image: post.image,
      author: post.author?.name,
      createdAt: post.createdAt,
      published: post.published
    }));

    res.json({
      success: true,
      posts: postsData
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'BLOG_POSTS_FETCH_FAILED',
        message: 'Failed to fetch blog posts'
      }
    });
  }
};

// @desc    Get single blog post
// @route   GET /api/blog/posts/:id
// @access  Public
const getBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post || !post.published) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'POST_NOT_FOUND',
          message: 'Blog post not found'
        }
      });
    }

    // Increment view count
    post.views += 1;
    await post.save();

    res.json({
      success: true,
      post: {
        id: post._id,
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        image: post.image,
        author: post.author.name,
        createdAt: post.createdAt,
        published: post.published
      }
    });
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'BLOG_POST_FETCH_FAILED',
        message: 'Failed to fetch blog post'
      }
    });
  }
};

// @desc    Create new blog post
// @route   POST /api/blog/posts
// @access  Private/Admin
const createBlogPost = async (req, res) => {
  try {
    const { title, content, excerpt, image, published = false } = req.body;

    const post = await BlogPost.create({
      title,
      content,
      excerpt,
      image,
      author: req.user._id,
      published
    });

    const populatedPost = await BlogPost.findById(post._id);

    res.status(201).json({
      success: true,
      post: {
        id: populatedPost._id,
        title: populatedPost.title,
        content: populatedPost.content,
        excerpt: populatedPost.excerpt,
        image: populatedPost.image,
        author: populatedPost.author.name,
        createdAt: populatedPost.createdAt,
        published: populatedPost.published
      }
    });
  } catch (error) {
    console.error('Create blog post error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'BLOG_POST_CREATE_FAILED',
        message: 'Failed to create blog post'
      }
    });
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/posts/:id
// @access  Private/Admin
const updateBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'POST_NOT_FOUND',
          message: 'Blog post not found'
        }
      });
    }

    res.json({
      success: true,
      post: {
        id: post._id,
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        image: post.image,
        author: post.author?.name,
        createdAt: post.createdAt,
        published: post.published
      }
    });
  } catch (error) {
    console.error('Update blog post error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'BLOG_POST_UPDATE_FAILED',
        message: 'Failed to update blog post'
      }
    });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/posts/:id
// @access  Private/Admin
const deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'POST_NOT_FOUND',
          message: 'Blog post not found'
        }
      });
    }

    await BlogPost.deleteOne({ _id: req.params.id });

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'BLOG_POST_DELETE_FAILED',
        message: 'Failed to delete blog post'
      }
    });
  }
};

// @desc    Get all blog posts for admin
// @route   GET /api/blog/posts/admin
// @access  Private/Admin
const getAdminBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find()
      .sort({ createdAt: -1 });

    const postsData = posts.map(post => ({
      id: post._id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      image: post.image,
      author: post.author?.name,
      createdAt: post.createdAt,
      published: post.published
    }));

    res.json({
      success: true,
      posts: postsData
    });
  } catch (error) {
    console.error('Get admin blog posts error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'BLOG_POSTS_FETCH_FAILED',
        message: 'Failed to fetch blog posts'
      }
    });
  }
};

module.exports = {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getAdminBlogPosts
};