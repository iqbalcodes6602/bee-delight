const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog post title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Blog post content is required']
  },
  excerpt: {
    type: String,
    required: [true, 'Blog post excerpt is required'],
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  image: {
    type: String,
    required: [true, 'Blog post image is required']
  },
  author: { type: String, required: true },
  published: {
    type: Boolean,
    default: false
  },
  slug: {
    type: String,
    unique: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Generate slug from title before saving
blogPostSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
  }
  next();
});

// Index for search functionality
blogPostSchema.index({ title: 'text', content: 'text', excerpt: 'text' });

// Populate author when querying
blogPostSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'author',
    select: 'name'
  });
  next();
});

module.exports = mongoose.model('BlogPost', blogPostSchema);