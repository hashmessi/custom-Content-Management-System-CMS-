const express = require('express');
const router = express.Router();
const {
  createHeroSlide,
  getHeroSlides,
  getActiveHeroSlides,
  getHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  reorderHeroSlide,
  toggleHeroSlide,
} = require('../controllers/heroSlideController');
const validate = require('../middleware/validator');
const {
  createHeroSlideSchema,
  updateHeroSlideSchema,
  reorderSchema,
} = require('../validators/heroSlide.validator');

// Public routes
router.get('/active', getActiveHeroSlides);

// Routes with validation
router
  .route('/')
  .get(getHeroSlides)
  .post(validate(createHeroSlideSchema), createHeroSlide);

router
  .route('/:id')
  .get(getHeroSlide)
  .put(validate(updateHeroSlideSchema), updateHeroSlide)
  .delete(deleteHeroSlide);

router.patch('/:id/reorder', validate(reorderSchema), reorderHeroSlide);
router.patch('/:id/toggle', toggleHeroSlide);

module.exports = router;
