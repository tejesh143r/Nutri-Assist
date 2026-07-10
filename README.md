# Nutrition Assistant App 🍎

A personalized MERN (MongoDB, Express, React, Node.js) stack web application designed to help users track their nutrition, calculate body metrics, and monitor adherence to dietary schedules. Built as a full-stack project for the **SmartBridge MERN Stack Internship**.

## 🚀 Key Features

* **Biometric Calculations**: Estimates user Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) based on physical attributes and daily activity coefficients.
* **Macro Targets & Deficits/Surpluses**: Computes targeted daily carbohydrate, protein, and fat values in grams for goals like fat loss, weight gain, or body composition maintenance.
* **On-the-Fly Calories Simulator**: Allows sandbox testing of calorie constraints without changing main account parameters.
* **Adherence Planner**: Enables creation of custom diet challenges with check-boxes to log daily habits (water goals, workout schedules, and calorie intake limits).
* **Responsive Dashboard**: Displays real-time progress indicators using custom radial SVG rings and HSL-tailored glassmorphic card widgets.
* **Hashed Password Security**: Secure user logins and profile management using BcryptJS and JSON Web Tokens (JWT).

---

## 🛠️ Technology Stack

* **Frontend**: React (Vite JS), Vanilla CSS (Custom design variables, animations, and typography).
* **Backend**: Node.js, Express.js.
* **Database**: MongoDB (Mongoose ODM).
* **Security & Auth**: BcryptJS, JSON Web Tokens (JWT), Authorization headers middleware.
* **Icon Assets**: Lucide React.

---

## 📐 Scientific Formula Details

The application calculates energy goals using the **Mifflin-St Jeor Equation**:

$$\text{BMR (Men)} = (10 \times \text{weight in kg}) + (6.25 \times \text{height in cm}) - (5 \times \text{age in years}) + 5$$
$$\text{BMR (Women)} = (10 \times \text{weight in kg}) + (6.25 \times \text{height in cm}) - (5 \times \text{age in years}) - 161$$

$$\text{TDEE} = \text{BMR} \times \text{Activity Multiplier}$$

* **Sedentary**: $1.2$
* **Lightly Active**: $1.375$
* **Moderately Active**: $1.55$
* **Very Active**: $1.725$
* **Extra Active**: $1.9$

---

## 📂 Project Structure

```
nutrition-assistant/
├── Client/                  # React Frontend (Vite)
│   ├── src/
│   │   ├── components/      # Navigation and Layout components
│   │   ├── pages/           # Pages (Dashboard, UserData, Plans)
│   │   ├── utils/           # Client API fetch and local math helpers
│   │   ├── App.jsx          # Route control mappings
│   │   ├── index.css        # Vanilla CSS variables and layouts
│   │   └── main.jsx         # Vite DOM mount point
│   ├── index.html           # Main template
│   └── package.json
│
├── Server/                  # Node/Express Backend
│   ├── db/                  # MongoDB configurations
│   ├── models/              # Mongoose user and suggestion schemas
│   ├── controllers/         # Authentication and calculation managers
│   ├── routes/              # Route endpoints
│   ├── middlewares/         # JWT verification middleware
│   ├── utils/               # Recommendation calculations helper
│   ├── .env                 # Server config template
│   ├── server.js            # Node startup script
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## ⚙️ Setup & Installation Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed and a local instance of [MongoDB](https://www.mongodb.com/) running on your system.

### 1. Backend Server Setup
Navigate to the server directory:
```bash
cd Server
```
Install dependencies:
```bash
npm install
```
Start the server:
```bash
npm start
```
The server will boot on `http://localhost:8000`.

### 2. Frontend Client Setup
Navigate to the client directory:
```bash
cd Client
```
Install dependencies:
```bash
npm install
```
Start the development server:
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser to view the application.

---

## ⚖️ Disclaimer
*This project is for educational and internship demonstration purposes. All calculated recommendations should complement, not replace, professional medical or dietary advice.*
