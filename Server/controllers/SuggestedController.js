const Suggestion = require('../models/Suggestion');
const suggestNutrition = require('../utils/suggestNutrition');

/**
 * @desc    Generate and save a personalized nutrition suggestion for the user
 * @route   POST /api/suggestions/create
 * @access  Private
 */
const createSuggestion = async (req, res) => {
  try {
    const user = req.user; // populated by authMiddleware

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Call custom nutrition suggestions utility
    const calculatedNutrition = suggestNutrition({
      age: user.age,
      weight: user.weight,
      height: user.height,
      gender: user.gender,
      activityLevel: user.activityLevel,
      goal: user.goal
    });

    // Create a Suggestion record in MongoDB
    const suggestion = await Suggestion.create({
      userId: user._id,
      bmi: calculatedNutrition.bmi,
      bmr: calculatedNutrition.bmr,
      tdee: calculatedNutrition.tdee,
      calories: calculatedNutrition.calories,
      carbs: calculatedNutrition.carbs,
      protein: calculatedNutrition.protein,
      fats: calculatedNutrition.fats,
      recommendations: calculatedNutrition.recommendations
    });

    return res.status(201).json({
      success: true,
      suggestion
    });
  } catch (error) {
    console.error('Error in createSuggestion:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Retrieve all nutrition suggestion logs for the current user
 * @route   GET /api/suggestions/history
 * @access  Private
 */
const getSuggestions = async (req, res) => {
  try {
    const suggestions = await Suggestion.find({ userId: req.user._id })
      .sort({ createdAt: -1 }); // newest first

    return res.json({
      success: true,
      suggestions
    });
  } catch (error) {
    console.error('Error in getSuggestions:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createSuggestion,
  getSuggestions,
};
