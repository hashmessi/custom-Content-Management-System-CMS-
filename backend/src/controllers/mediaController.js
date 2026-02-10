const sharp = require('sharp');
const cloudinary = require('../config/cloudinary');
const MediaAsset = require('../models/MediaAsset');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * @desc    Upload media file
 * @route   POST /api/v1/media/upload
 * @access  Private
 */
exports.uploadMedia = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'No file uploaded',
    });
  }

  let buffer = req.file.buffer;
  let resourceType = 'image';
  let width, height;

  // If it's an image, optimize it
  if (req.file.mimetype.startsWith('image/')) {
    // Get image dimensions before optimization
    const metadata = await sharp(buffer).metadata();
    width = metadata.width;
    height = metadata.height;

    // Optimize image: resize if too large, convert to JPEG with quality
    buffer = await sharp(buffer)
      .resize(1920, 1080, { 
        fit: 'inside', 
        withoutEnlargement: true, 
      })
      .jpeg({ quality: 85 })
      .toBuffer();

    // Update dimensions after resize
    const optimizedMeta = await sharp(buffer).metadata();
    width = optimizedMeta.width;
    height = optimizedMeta.height;
  } else if (req.file.mimetype.startsWith('video/')) {
    resourceType = 'video';
  }

  // Upload to Cloudinary
  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'antigravity-cms',
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );

    uploadStream.end(buffer);
  });

  // Save to database
  const mediaAsset = await MediaAsset.create({
    fileName: req.file.originalname,
    fileUrl: result.secure_url,
    publicId: result.public_id,
    fileType: resourceType,
    mimeType: req.file.mimetype,
    fileSize: result.bytes,
    width: width || result.width,
    height: height || result.height,
    alt: req.body.alt || '',
  });

  res.status(201).json({
    success: true,
    data: {
      id: mediaAsset._id,
      url: result.secure_url,
      publicId: result.public_id,
      fileName: mediaAsset.fileName,
      fileType: mediaAsset.fileType,
      width: mediaAsset.width,
      height: mediaAsset.height,
    },
  });
});

/**
 * @desc    Get all media assets
 * @route   GET /api/v1/media
 * @access  Private
 */
exports.getMediaAssets = asyncHandler(async (req, res) => {
  const { type, limit = 20, page = 1 } = req.query;

  // Build query
  const query = type ? { fileType: type } : {};

  const mediaAssets = await MediaAsset.find(query)
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit));

  const total = await MediaAsset.countDocuments(query);

  res.status(200).json({
    success: true,
    count: mediaAssets.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
    data: mediaAssets,
  });
});

/**
 * @desc    Get single media asset
 * @route   GET /api/v1/media/:id
 * @access  Private
 */
exports.getMediaAsset = asyncHandler(async (req, res) => {
  const mediaAsset = await MediaAsset.findById(req.params.id);

  if (!mediaAsset) {
    return res.status(404).json({
      success: false,
      error: 'Media asset not found',
    });
  }

  res.status(200).json({
    success: true,
    data: mediaAsset,
  });
});

/**
 * @desc    Delete media asset
 * @route   DELETE /api/v1/media/:id
 * @access  Private
 */
exports.deleteMedia = asyncHandler(async (req, res) => {
  const mediaAsset = await MediaAsset.findById(req.params.id);

  if (!mediaAsset) {
    return res.status(404).json({
      success: false,
      error: 'Media asset not found',
    });
  }

  // Delete from Cloudinary
  if (mediaAsset.publicId) {
    try {
      await cloudinary.uploader.destroy(mediaAsset.publicId, {
        resource_type: mediaAsset.fileType === 'video' ? 'video' : 'image',
      });
    } catch (error) {
      console.error('Failed to delete from Cloudinary:', error.message);
    }
  }

  // Delete from database
  await mediaAsset.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
    message: 'Media asset deleted successfully',
  });
});

/**
 * @desc    Update media asset (alt text, etc.)
 * @route   PUT /api/v1/media/:id
 * @access  Private
 */
exports.updateMediaAsset = asyncHandler(async (req, res) => {
  const { alt } = req.body;

  const mediaAsset = await MediaAsset.findByIdAndUpdate(
    req.params.id,
    { alt },
    { new: true, runValidators: true },
  );

  if (!mediaAsset) {
    return res.status(404).json({
      success: false,
      error: 'Media asset not found',
    });
  }

  res.status(200).json({
    success: true,
    data: mediaAsset,
  });
});
