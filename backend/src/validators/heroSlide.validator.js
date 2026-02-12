const Joi = require('joi');

// Create hero slide validation
const createHeroSlideSchema = Joi.object({
  title: Joi.string().required().max(255).trim().messages({
    'string.empty': 'Title is required',
    'string.max': 'Title cannot exceed 255 characters',
  }),
  subtitle: Joi.string().allow('').trim(),
  description: Joi.string().allow('').trim(),
  mediaUrl: Joi.string().allow('').trim(),
  mediaType: Joi.string().valid('image', 'video').default('image'),
  ctaText: Joi.string().max(100).allow('').trim(),
  ctaLink: Joi.string().allow('').trim(),
  displayOrder: Joi.number().integer().min(0),
  isActive: Joi.boolean().default(true),
});

// Update hero slide validation
const updateHeroSlideSchema = Joi.object({
  title: Joi.string().max(255).trim(),
  subtitle: Joi.string().allow('').trim(),
  description: Joi.string().allow('').trim(),
  mediaUrl: Joi.string().allow('').trim(),
  mediaType: Joi.string().valid('image', 'video'),
  ctaText: Joi.string().max(100).allow('').trim(),
  ctaLink: Joi.string().allow('').trim(),
  displayOrder: Joi.number().integer().min(0),
  isActive: Joi.boolean(),
}).min(1);

// Reorder validation
const reorderSchema = Joi.object({
  displayOrder: Joi.number().integer().min(0).required(),
});

module.exports = {
  createHeroSlideSchema,
  updateHeroSlideSchema,
  reorderSchema,
};
