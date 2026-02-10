const express = require('express');
const router = express.Router();
const {
  uploadMedia,
  getMediaAssets,
  getMediaAsset,
  deleteMedia,
  updateMediaAsset,
} = require('../controllers/mediaController');
const upload = require('../middleware/upload');

// Upload route (single file)
router.post('/upload', upload.single('file'), uploadMedia);

// CRUD routes
router.get('/', getMediaAssets);
router.get('/:id', getMediaAsset);
router.put('/:id', updateMediaAsset);
router.delete('/:id', deleteMedia);

module.exports = router;
