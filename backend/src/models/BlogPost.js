const mongoose = require('mongoose');
const slugify = require('slugify');

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxlength: [300, 'Title cannot exceed 300 characters'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      maxlength: [300, 'Slug cannot exceed 300 characters'],
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    excerpt: {
      type: String,
      maxlength: [500, 'Excerpt cannot exceed 500 characters'],
      trim: true,
    },
    featuredImage: {
      type: String,
      trim: true,
    },
    // SEO Fields
    metaTitle: {
      type: String,
      maxlength: [70, 'Meta title cannot exceed 70 characters'],
      trim: true,
    },
    metaDescription: {
      type: String,
      maxlength: [160, 'Meta description cannot exceed 160 characters'],
      trim: true,
    },
    // Publication status
    status: {
      type: String,
      enum: {
        values: ['draft', 'published'],
        message: 'Status must be either draft or published',
      },
      default: 'draft',
    },
    publishedAt: {
      type: Date,
    },
    // Analytics
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexes for performance (slug index is auto-created by unique: true)
blogPostSchema.index({ status: 1, publishedAt: -1 });
blogPostSchema.index({ createdAt: -1 });

// Text index for search functionality
blogPostSchema.index(
  { title: 'text', content: 'text', excerpt: 'text' },
  { 
    weights: { title: 10, excerpt: 5, content: 1 },
    name: 'blog_text_search', 
  },
);

// Virtual for reading time (approx 200 words per minute)
blogPostSchema.virtual('readingTime').get(function () {
  if (!this.content) return 0;
  const wordCount = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(wordCount / 200);
});

// Pre-save middleware
blogPostSchema.pre('save', async function (next) {
  // Auto-generate slug from title if not provided
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'\"!:@]/g,
    });
  }

  // Ensure slug uniqueness
  if (this.isModified('slug')) {
    const existingPost = await this.constructor.findOne({ 
      slug: this.slug,
      _id: { $ne: this._id },
    });
    
    if (existingPost) {
      let counter = 1;
      let newSlug = `${this.slug}-${counter}`;
      while (await this.constructor.findOne({ slug: newSlug, _id: { $ne: this._id } })) {
        counter++;
        newSlug = `${this.slug}-${counter}`;
      }
      this.slug = newSlug;
    }
  }

  // Auto-generate meta fields if not provided
  if (!this.metaTitle && this.title) {
    this.metaTitle = this.title.substring(0, 70);
  }
  if (!this.metaDescription && this.excerpt) {
    this.metaDescription = this.excerpt.substring(0, 160);
  }

  // Set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
