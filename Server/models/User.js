const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
  },
  age: {
    type: Number,
    required: [true, 'Please add age'],
    min: 0,
  },
  weight: {
    type: Number,
    required: [true, 'Please add weight in kg'],
    min: 0,
  },
  height: {
    type: Number,
    required: [true, 'Please add height in cm'],
    min: 0,
  },
  gender: {
    type: String,
    required: [true, 'Please specify gender'],
    enum: ['Male', 'Female', 'Other'],
  },
  activityLevel: {
    type: String,
    required: [true, 'Please specify activity level'],
    enum: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extra Active'],
    default: 'Sedentary',
  },
  goal: {
    type: String,
    required: [true, 'Please specify goal'],
    enum: ['Weight Loss', 'Maintenance', 'Weight Gain'],
    default: 'Maintenance',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
