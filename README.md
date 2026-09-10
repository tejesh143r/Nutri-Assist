# Nutri Assistant

A premium nutrition and wellness web app designed to help users track their health goals, get personalized nutrition insights, and stay consistent with daily habits.

Built with the MERN stack and upgraded into a more polished, product-style experience while preserving the original functionality.

## ✨ Highlights

- Personalized nutrition recommendations based on user profile and goals
- BMI, BMR, and TDEE calculations
- Daily macro tracking and calorie guidance
- Active habits planner with adherence checklists
- Nutrition suggestion simulator for quick goal testing
- Modern premium dashboard and landing page experience
- Authentication with JWT and secure password hashing

## 🧠 Tech Stack

- Frontend: React + Vite
- Styling: Custom CSS with glassmorphism and responsive UI patterns
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Auth: JWT + bcryptjs
- Icons: Lucide React

## 📁 Project Structure

```bash
nutrition-assistant/
├── Client/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── Server/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── README.md
├── test-endpoints.js
└── .gitignore
```

## 🚀 Getting Started

### 1) Install frontend dependencies

```bash
cd Client
npm install
```

### 2) Install backend dependencies

```bash
cd ../Server
npm install
```

### 3) Start the backend

```bash
cd Server
npm start
```

The API runs on:

```bash
http://localhost:8000
```

### 4) Start the frontend

```bash
cd Client
npm run dev
```

The app runs on:

```bash
http://localhost:5173
```

## 🧪 Quick Validation

You can run a sanity test against the server routes using:

```bash
cd ..
node test-endpoints.js
```

This checks:

- user registration
- login
- profile fetch
- nutrition suggestion creation
- history retrieval

## 📐 Nutrition Logic

The application calculates daily energy and nutrition targets using the Mifflin-St Jeor Formula:

- Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5
- Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161
- TDEE = BMR × activity multiplier

Activity multipliers:

- Sedentary: 1.2
- Lightly Active: 1.375
- Moderately Active: 1.55
- Very Active: 1.725
- Extra Active: 1.9

## ⚠️ Disclaimer

This project is intended for educational and demonstration purposes. Nutrition calculations should be used as guidance and should not replace professional medical advice.

## ✅ Project Status

The app is functional, responsive, and includes the polished premium redesign while keeping the original logic and workflows intact.
