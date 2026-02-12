const HeroSlide = require('../models/HeroSlide');
const asyncHandler = require('../middleware/asyncHandler');
const sharp = require('sharp');
const cloudinary = require('../config/cloudinary');

/**
 * @desc    Create new hero slide
 * @route   POST /api/v1/hero-slides
 * @access  Private
 */
exports.createHeroSlide = asyncHandler(async (req, res) => {
  // Map subtitle to description if present
  if (req.body.subtitle) {
    req.body.description = req.body.subtitle;
  }

  // Handle image upload if file exists
  if (req.file) {
    let buffer = req.file.buffer;
    
    // Optimize image
    if (req.file.mimetype.startsWith('image/')) {
        buffer = await sharp(buffer)
          .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 85 })
          .toBuffer();
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'antigravity-cms/hero', resource_type: 'image' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
    });

    req.body.mediaUrl = result.secure_url;
    req.body.mediaType = 'image';
  }

  const heroSlide = await HeroSlide.create(req.body);

  res.status(201).json({
    success: true,
    data: heroSlide,
  });
});

/**
 * @desc    Get all hero slides
 * @route   GET /api/v1/hero-slides
 * @access  Public
 */
exports.getHeroSlides = asyncHandler(async (req, res) => {
  const { active, limit = 10, page = 1 } = req.query;

  // Build query
  const query = active === 'true' ? { isActive: true } : {};

  // Execute query with pagination
  const heroSlides = await HeroSlide.find(query)
    .sort({ displayOrder: 1 })
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit));

  const total = await HeroSlide.countDocuments(query);

  res.status(200).json({
    success: true,
    count: heroSlides.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
    data: heroSlides,
  });
});

/**
 * @desc    Get active hero slides only
 * @route   GET /api/v1/hero-slides/active
 * @access  Public
 */
exports.getActiveHeroSlides = asyncHandler(async (req, res) => {
  const heroSlides = await HeroSlide.find({ isActive: true })
    .sort({ displayOrder: 1 });

  res.status(200).json({
    success: true,
    count: heroSlides.length,
    data: heroSlides,
  });
});

/**
 * @desc    Get single hero slide
 * @route   GET /api/v1/hero-slides/:id
 * @access  Public
 */
exports.getHeroSlide = asyncHandler(async (req, res) => {
  const heroSlide = await HeroSlide.findById(req.params.id);

  if (!heroSlide) {
    return res.status(404).json({
      success: false,
      error: 'Hero slide not found',
    });
  }

  res.status(200).json({
    success: true,
    data: heroSlide,
  });
});

/**
 * @desc    Update hero slide
 * @route   PUT /api/v1/hero-slides/:id
 * @access  Private
 */
exports.updateHeroSlide = asyncHandler(async (req, res) => {
  let heroSlide = await HeroSlide.findById(req.params.id);

  if (!heroSlide) {
    return res.status(404).json({
      success: false,
      error: 'Hero slide not found',
    });
  }

  // Map subtitle to description if present
  if (req.body.subtitle) {
    req.body.description = req.body.subtitle;
  }

  // Handle image upload if file exists
  if (req.file) {
    let buffer = req.file.buffer;
    
    // Optimize image
    if (req.file.mimetype.startsWith('image/')) {
        buffer = await sharp(buffer)
          .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 85 })
          .toBuffer();
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'antigravity-cms/hero', resource_type: 'image' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
    });

    req.body.mediaUrl = result.secure_url;
    req.body.mediaType = 'image';
  }

  heroSlide = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: heroSlide,
  });
});

/**
 * @desc    Delete hero slide
 * @route   DELETE /api/v1/hero-slides/:id
 * @access  Private
 */
exports.deleteHeroSlide = asyncHandler(async (req, res) => {
  const heroSlide = await HeroSlide.findById(req.params.id);

  if (!heroSlide) {
    return res.status(404).json({
      success: false,
      error: 'Hero slide not found',
    });
  }

  await heroSlide.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
    message: 'Hero slide deleted successfully',
  });
});

/**
 * @desc    Reorder hero slide
 * @route   PATCH /api/v1/hero-slides/:id/reorder
 * @access  Private
 */
exports.reorderHeroSlide = asyncHandler(async (req, res) => {
  const { displayOrder } = req.body;

  const heroSlide = await HeroSlide.findById(req.params.id);

  if (!heroSlide) {
    return res.status(404).json({
      success: false,
      error: 'Hero slide not found',
    });
  }

  heroSlide.displayOrder = displayOrder;
  await heroSlide.save();

  res.status(200).json({
    success: true,
    data: heroSlide,
  });
});

/**
 * @desc    Toggle hero slide active status
 * @route   PATCH /api/v1/hero-slides/:id/toggle
 * @access  Private
 */
exports.toggleHeroSlide = asyncHandler(async (req, res) => {
  const heroSlide = await HeroSlide.findById(req.params.id);

  if (!heroSlide) {
    return res.status(404).json({
      success: false,
      error: 'Hero slide not found',
    });
  }

  heroSlide.isActive = !heroSlide.isActive;
  await heroSlide.save();

  res.status(200).json({
    success: true,
    data: heroSlide,
  });
});
