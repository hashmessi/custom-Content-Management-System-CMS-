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
const upload = require('../middleware/upload');

// ... (keep intervening code)

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
