const express = require('express');
const router = express.Router();
const {
  createBlogPost,
  getBlogPosts,
  getPublishedBlogPosts,
  getBlogBySlug,
  getBlogPost,
  updateBlogPost,
  deleteBlogPost,
  publishBlogPost,
  unpublishBlogPost,
  searchBlogPosts,
} = require('../controllers/blogController');
const validate = require('../middleware/validator');
const {
  createBlogPostSchema,
  updateBlogPostSchema,
  searchBlogSchema,
} = require('../validators/blog.validator');
const upload = require('../middleware/upload');

// Public routes
router.get('/published', getPublishedBlogPosts);
router.get('/slug/:slug', getBlogBySlug);
router.post('/search', validate(searchBlogSchema), searchBlogPosts);

// Routes with validation
router
  .route('/')
  .get(getBlogPosts)
  .post(upload.single('image'), validate(createBlogPostSchema), createBlogPost);

router
  .route('/:id')
  .get(getBlogPost)
  .put(upload.single('image'), validate(updateBlogPostSchema), updateBlogPost)
  .delete(deleteBlogPost);

router.patch('/:id/publish', publishBlogPost);
router.patch('/:id/unpublish', unpublishBlogPost);

module.exports = router;
