const express = require('express');
const router = express.Router();
const {
  createSuggestion,
  getSuggestions,
} = require('../controllers/SuggestedController');
const { protect } = require('../middlewares/authMiddleware');

// All suggestion routes are protected
router.post('/create', protect, createSuggestion);
router.get('/history', protect, getSuggestions);

module.exports = router;
