const express = require('express');
const cors = require('cors');
const connectDB = require('./db/config');
require('dotenv').config();

// Connect to Database
connectDB();

const app = express();
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean);

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Origin not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

// Main Root endpoint for API sanity check
app.get('/', (req, res) => {
  res.json({ message: 'Nutrition Assistant API is running...' });
});

// Routes
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/suggestions', require('./routes/suggestionRoute'));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
