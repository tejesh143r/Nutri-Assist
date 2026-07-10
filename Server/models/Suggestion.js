const mongoose = require('mongoose');

const SuggestionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  bmi: {
    type: Number,
    required: true,
  },
  bmr: {
    type: Number,
    required: true,
  },
  tdee: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true, // in grams
  },
  protein: {
    type: Number,
    required: true, // in grams
  },
  fats: {
    type: Number,
    required: true, // in grams
  },
  recommendations: {
    type: [String],
    default: [],
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Suggestion', SuggestionSchema);
