const BlogPost = require('../models/BlogPost');
const asyncHandler = require('../middleware/asyncHandler');
const { generateSlug, ensureUniqueSlug } = require('../utils/slugGenerator');

/**
 * @desc    Create new blog post
 * @route   POST /api/v1/blogs
 * @access  Private
 */
exports.createBlogPost = asyncHandler(async (req, res) => {
  // Auto-generate slug from title if not provided
  if (!req.body.slug && req.body.title) {
    const baseSlug = generateSlug(req.body.title);
    req.body.slug = await ensureUniqueSlug(baseSlug, BlogPost);
  }

  const blogPost = await BlogPost.create(req.body);

  res.status(201).json({
    success: true,
    data: blogPost,
  });
});

/**
 * @desc    Get all blog posts
 * @route   GET /api/v1/blogs
 * @access  Public
 */
exports.getBlogPosts = asyncHandler(async (req, res) => {
  const { status, limit = 10, page = 1, sort = '-createdAt' } = req.query;

  // Build query
  const query = status ? { status } : {};

  // Execute query with pagination
  const blogPosts = await BlogPost.find(query)
    .select('-content') // Exclude content for list view
    .sort(sort)
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit));

  const total = await BlogPost.countDocuments(query);

  res.status(200).json({
    success: true,
    count: blogPosts.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
    data: blogPosts,
  });
});

/**
 * @desc    Get published blog posts only
 * @route   GET /api/v1/blogs/published
 * @access  Public
 */
exports.getPublishedBlogPosts = asyncHandler(async (req, res) => {
  const { limit = 10, page = 1 } = req.query;

  const blogPosts = await BlogPost.find({ status: 'published' })
    .select('-content')
    .sort({ publishedAt: -1 })
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit));

  const total = await BlogPost.countDocuments({ status: 'published' });

  res.status(200).json({
    success: true,
    count: blogPosts.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
    data: blogPosts,
  });
});

/**
 * @desc    Get blog post by slug (public view)
 * @route   GET /api/v1/blogs/slug/:slug
 * @access  Public
 */
exports.getBlogBySlug = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findOne({
    slug: req.params.slug,
    status: 'published',
  });

  if (!blogPost) {
    return res.status(404).json({
      success: false,
      error: 'Blog post not found',
    });
  }

  // Increment view count
  blogPost.viewCount += 1;
  await blogPost.save();

  res.status(200).json({
    success: true,
    data: blogPost,
  });
});

/**
 * @desc    Get blog post by ID
 * @route   GET /api/v1/blogs/:id
 * @access  Private
 */
exports.getBlogPost = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    return res.status(404).json({
      success: false,
      error: 'Blog post not found',
    });
  }

  res.status(200).json({
    success: true,
    data: blogPost,
  });
});

/**
 * @desc    Update blog post
 * @route   PUT /api/v1/blogs/:id
 * @access  Private
 */
exports.updateBlogPost = asyncHandler(async (req, res) => {
  let blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    return res.status(404).json({
      success: false,
      error: 'Blog post not found',
    });
  }

  // If slug is being updated, ensure uniqueness
  if (req.body.slug && req.body.slug !== blogPost.slug) {
    req.body.slug = await ensureUniqueSlug(req.body.slug, BlogPost, req.params.id);
  }

  blogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: blogPost,
  });
});

/**
 * @desc    Delete blog post
 * @route   DELETE /api/v1/blogs/:id
 * @access  Private
 */
exports.deleteBlogPost = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    return res.status(404).json({
      success: false,
      error: 'Blog post not found',
    });
  }

  await blogPost.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
    message: 'Blog post deleted successfully',
  });
});

/**
 * @desc    Publish blog post
 * @route   PATCH /api/v1/blogs/:id/publish
 * @access  Private
 */
exports.publishBlogPost = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    return res.status(404).json({
      success: false,
      error: 'Blog post not found',
    });
  }

  blogPost.status = 'published';
  blogPost.publishedAt = req.body.publishedAt || new Date();
  await blogPost.save();

  res.status(200).json({
    success: true,
    data: blogPost,
  });
});

/**
 * @desc    Unpublish blog post (set to draft)
 * @route   PATCH /api/v1/blogs/:id/unpublish
 * @access  Private
 */
exports.unpublishBlogPost = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    return res.status(404).json({
      success: false,
      error: 'Blog post not found',
    });
  }

  blogPost.status = 'draft';
  await blogPost.save();

  res.status(200).json({
    success: true,
    data: blogPost,
  });
});

/**
 * @desc    Search blog posts
 * @route   POST /api/v1/blogs/search
 * @access  Public
 */
exports.searchBlogPosts = asyncHandler(async (req, res) => {
  const { query, page = 1, limit = 10 } = req.body;

  if (!query || query.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Search query must be at least 2 characters',
    });
  }

  const searchResults = await BlogPost.find({
    $text: { $search: query },
    status: 'published',
  })
    .select('-content')
    .sort({ score: { $meta: 'textScore' } })
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit));

  const total = await BlogPost.countDocuments({
    $text: { $search: query },
    status: 'published',
  });

  res.status(200).json({
    success: true,
    count: searchResults.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
    data: searchResults,
  });
});
