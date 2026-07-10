/**
 * Generates personalized nutrition suggestions based on user profile metrics.
 * 
 * @param {Object} userProfile - User profile containing age, weight, height, gender, activityLevel, goal
 * @returns {Object} suggestions containing bmi, bmr, tdee, calories, carbs, protein, fats, and recommendations list
 */
export default function suggestNutrition(userProfile) {
  const { age, weight, height, gender, activityLevel, goal } = userProfile;

  // 1. Calculate BMI
  const heightInMeters = height / 100;
  const bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));

  // 2. Calculate BMR (Mifflin-St Jeor Equation)
  let bmr = 0;
  if (gender === 'Male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender === 'Female') {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 78;
  }
  bmr = Math.round(bmr);

  // 3. Calculate TDEE based on Activity Level
  let multiplier = 1.2;
  switch (activityLevel) {
    case 'Sedentary':
      multiplier = 1.2;
      break;
    case 'Lightly Active':
      multiplier = 1.375;
      break;
    case 'Moderately Active':
      multiplier = 1.55;
      break;
    case 'Very Active':
      multiplier = 1.725;
      break;
    case 'Extra Active':
      multiplier = 1.9;
      break;
  }
  let tdee = Math.round(bmr * multiplier);

  // 4. Target Calories adjustment based on Goal
  let calories = tdee;
  if (goal === 'Weight Loss') {
    calories = tdee - 500;
    if (calories < 1200) calories = 1200;
  } else if (goal === 'Weight Gain') {
    calories = tdee + 500;
  }
  calories = Math.round(calories);

  // 5. Macronutrient distribution
  let proteinRatio = 0.25;
  let carbRatio = 0.45;
  let fatRatio = 0.30;

  if (goal === 'Weight Loss') {
    proteinRatio = 0.30;
    carbRatio = 0.40;
    fatRatio = 0.30;
  } else if (goal === 'Weight Gain') {
    proteinRatio = 0.25;
    carbRatio = 0.50;
    fatRatio = 0.25;
  }

  const protein = Math.round((calories * proteinRatio) / 4);
  const carbs = Math.round((calories * carbRatio) / 4);
  const fats = Math.round((calories * fatRatio) / 9);

  // 6. Generate Custom Recommendations
  const recommendations = [];

  if (bmi < 18.5) {
    recommendations.push("Your BMI indicates you are underweight. Focus on calorie-dense, nutrient-dense foods (nuts, seeds, avocados, whole grains).");
  } else if (bmi >= 18.5 && bmi < 25) {
    recommendations.push("Your BMI is in the healthy weight range. Keep up the good work and maintain a balanced diet with plenty of whole foods.");
  } else if (bmi >= 25 && bmi < 30) {
    recommendations.push("Your BMI indicates you are in the overweight range. Consider moderate portion controls and incorporating more dietary fiber.");
  } else {
    recommendations.push("Your BMI is in the obese range. We suggest a steady, structured calorie deficit and consultation with a registered dietitian.");
  }

  if (goal === 'Weight Loss') {
    recommendations.push("Prioritize high-protein meals to help preserve lean muscle mass and keep you satiated throughout the day.");
    recommendations.push("Increase intake of non-starchy vegetables (spinach, broccoli, zucchini) to provide high volume and micronutrients with low calories.");
    recommendations.push("Incorporate cardiovascular exercises like brisk walking or cycling for 150 minutes a week.");
  } else if (goal === 'Weight Gain') {
    recommendations.push("Incorporate healthy liquid calories like smoothies with protein powder, nut butter, and oats to meet your high caloric targets easily.");
    recommendations.push("Prioritize strength training or weightlifting 3-4 times a week to promote muscle hypertrophy over fat accumulation.");
    recommendations.push("Eat smaller, more frequent meals throughout the day if you struggle to eat large portions.");
  } else {
    recommendations.push("Focus on dietary variety. Aim for a 'rainbow' of fruits and vegetables to ensure a broad spectrum of vitamins and minerals.");
    recommendations.push("Maintain a steady balance of aerobic and resistance exercises for cardiovascular and muscular health.");
  }

  if (activityLevel === 'Sedentary') {
    recommendations.push("Try to incorporate light movement throughout the day, such as standing up every hour, taking the stairs, or aiming for 6,000 steps daily.");
  } else if (activityLevel === 'Very Active' || activityLevel === 'Extra Active') {
    recommendations.push("Since your activity level is very high, focus on timing your carbohydrate intake around your workouts for optimal performance and recovery.");
    recommendations.push("Ensure adequate hydration. Drink water before, during, and after intense training sessions.");
  }

  recommendations.push("Aim to drink at least 2.5 to 3 liters of water daily to maintain cellular hydration and metabolic functions.");
  recommendations.push("Limit processed foods, refined sugars, and trans fats, replacing them with whole grains, lean proteins, and unsaturated fats.");

  return {
    bmi,
    bmr,
    tdee,
    calories,
    carbs,
    protein,
    fats,
    recommendations
  };
}
