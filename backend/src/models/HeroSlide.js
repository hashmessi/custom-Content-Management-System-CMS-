const mongoose = require('mongoose');

const heroSlideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxlength: [255, 'Title cannot exceed 255 characters'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    mediaUrl: {
      type: String,
      trim: true,
    },
    mediaType: {
      type: String,
      enum: {
        values: ['image', 'video'],
        message: 'Media type must be either image or video',
      },
      default: 'image',
    },
    ctaText: {
      type: String,
      maxlength: [100, 'CTA text cannot exceed 100 characters'],
      trim: true,
    },
    ctaLink: {
      type: String,
      trim: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexes for performance
heroSlideSchema.index({ isActive: 1, displayOrder: 1 });
heroSlideSchema.index({ createdAt: -1 });

// Pre-save middleware to auto-set display order
heroSlideSchema.pre('save', async function (next) {
  if (this.isNew && this.displayOrder === 0) {
    const lastSlide = await this.constructor.findOne().sort({ displayOrder: -1 });
    this.displayOrder = lastSlide ? lastSlide.displayOrder + 1 : 1;
  }
  next();
});

const HeroSlide = mongoose.model('HeroSlide', heroSlideSchema);

module.exports = HeroSlide;
