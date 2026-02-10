const slugify = require('slugify');

/**
 * Generate URL-friendly slug from text
 * @param {string} text - Text to slugify
 * @returns {string} URL-friendly slug
 */
const generateSlug = (text) => {
  return slugify(text, {
    lower: true,
    strict: true,
    remove: /[*+~.()'\"!:@]/g,
  });
};

/**
 * Ensure slug uniqueness by appending counter
 * @param {string} baseSlug - Base slug to check
 * @param {Model} Model - Mongoose model to check against
 * @param {string} excludeId - ID to exclude from check (for updates)
 * @returns {Promise<string>} Unique slug
 */
const ensureUniqueSlug = async (baseSlug, Model, excludeId = null) => {
  let slug = baseSlug;
  let counter = 1;

  const query = excludeId ? { slug, _id: { $ne: excludeId } } : { slug };

  while (await Model.findOne(query)) {
    slug = `${baseSlug}-${counter}`;
    query.slug = slug;
    counter++;
  }

  return slug;
};

module.exports = {
  generateSlug,
  ensureUniqueSlug,
};
