const Joi = require('joi');

// Create blog post validation
const createBlogPostSchema = Joi.object({
  title: Joi.string().required().max(300).trim().messages({
    'string.empty': 'Title is required',
    'string.max': 'Title cannot exceed 300 characters',
  }),
  slug: Joi.string().max(300).trim().lowercase(),
  content: Joi.string().required().messages({
    'string.empty': 'Content is required',
  }),
  excerpt: Joi.string().max(500).allow('').trim(),
  featuredImage: Joi.string().uri().allow('').trim(),
  metaTitle: Joi.string().max(70).allow('').trim(),
  metaDescription: Joi.string().max(160).allow('').trim(),
  status: Joi.string().valid('draft', 'published').default('draft'),
});

// Update blog post validation
const updateBlogPostSchema = Joi.object({
  title: Joi.string().max(300).trim(),
  slug: Joi.string().max(300).trim().lowercase(),
  content: Joi.string(),
  excerpt: Joi.string().max(500).allow('').trim(),
  featuredImage: Joi.string().uri().allow('').trim(),
  metaTitle: Joi.string().max(70).allow('').trim(),
  metaDescription: Joi.string().max(160).allow('').trim(),
  status: Joi.string().valid('draft', 'published'),
}).min(1);

// Search validation
const searchBlogSchema = Joi.object({
  query: Joi.string().required().min(2).max(100).trim(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(10),
});

// Publish validation
const publishSchema = Joi.object({
  publishedAt: Joi.date().iso(),
});

module.exports = {
  createBlogPostSchema,
  updateBlogPostSchema,
  searchBlogSchema,
  publishSchema,
};
