const mongoose = require('mongoose');

const mediaAssetSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: [true, 'File name is required'],
      trim: true,
    },
    fileUrl: {
      type: String,
      required: [true, 'File URL is required'],
      trim: true,
    },
    publicId: {
      type: String,
      trim: true,
    },
    fileType: {
      type: String,
      enum: ['image', 'video', 'document'],
      default: 'image',
    },
    mimeType: {
      type: String,
      trim: true,
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    alt: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Index for querying by file type
mediaAssetSchema.index({ fileType: 1, createdAt: -1 });

const MediaAsset = mongoose.model('MediaAsset', mediaAssetSchema);

module.exports = MediaAsset;
