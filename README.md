# CrediPulse — Full-Stack MERN Credit Loan System

![MERN Stack](https://img.shields.io/badge/Stack-MongoDB%20%7C%20Express%20%7C%20React%20%7C%20Node.js-blue?style=for-the-badge)
![Vite](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-646CFF?style=for-the-badge&logo=vite)

CrediPulse is a full-stack **MERN (MongoDB, Express, React, Node.js)** Credit Loan System capstone application. It provides borrowers with a digital platform to explore loan products, calculate customized monthly EMIs, submit formal credit applications, and complete loan processing fee payments with real-time database status updates in MongoDB Atlas.
Website: https://credit-loan-system-one.vercel.app/

---

## 🌟 Key Features

- 🔐 **Borrower Authentication System**:
  - Account Creation & Secure Login powered by Node.js, Express, and MongoDB Atlas.
  - Protected SPA routes using `React Router DOM`.
- 💳 **Specialized Loan Product Catalog**:
  - Personal Credit Loans (10.5% p.a.)
  - Instant Micro-Loans (7.9% p.a.)
  - Prime Home & Real Estate Loans (6.8% p.a.)
- 📊 **Interactive EMI Calculators**:
  - Dynamic sliders for Loan Amount and Repayment Tenure.
  - Instant client-side formula calculation for Monthly EMI, Total Repayable Amount, and Interest Component.
- 📝 **2-Step Loan Application Portal**:
  - Comprehensive form capturing Full Name, Loan Amount, Tenure, Employment Status, and Monthly Income.
  - Submits application directly to MongoDB Atlas with default status **`Pending`**.
- ⚡ **Payment & Fee Checkout Page**:
  - Processing fee breakdown and checkout interface.
  - Simulated payment processing with real-time loading spinner animations.
  - Updates loan status in MongoDB Atlas to **`Submitted / Processing`** and generates digital transaction receipts.
- 🚀 **Cloud & Serverless Ready**:
  - Configured for Vercel Serverless Functions with dynamic CORS and relative `/api` routing.

---

## 🛠️ Technology Stack

| Component | Technology / Library |
| :--- | :--- |
| **Frontend Framework** | React.js (v19) + Vite |
| **Routing & Forms** | `react-router-dom` (v7), `react-hook-form` |
| **Icons & Styling** | `lucide-react`, Custom Vanilla CSS (Design Tokens & Utility Classes) |
| **Backend Runtime** | Node.js + Express.js |
| **Database & ODM** | MongoDB Atlas Cloud Database + Mongoose |
| **HTTP Client / Utilities**| Native Fetch API, `cors`, `dotenv`, `concurrently` |
| **Deployment** | Vercel Serverless Functions (`vercel.json`) |

---

## 📁 Project Folder Structure

```text
myapp/
├── api/
│   └── index.js              # Vercel Serverless Function entry point
├── config/
│   └── db.js                 # MongoDB connection & serverless promise handler
├── controllers/
│   ├── authController.js     # Borrower Registration & Login handlers
│   └── loanController.js     # Loan Application & Payment Status handlers
├── models/
│   ├── Borrower.js           # Mongoose Borrower Schema
│   └── Loan.js               # Mongoose Loan Application Schema
├── routes/
│   ├── authRoutes.js         # /api/register, /api/login, /api/health
│   └── loanRoutes.js         # /api/loans/apply, /api/loans/:id/pay-fee, etc.
├── src/
│   ├── components/
│   │   ├── LoanCalculator.jsx # Reusable EMI Calculator component
│   │   └── Navbar.jsx         # Sticky navigation header with session state
│   ├── config/
│   │   └── api.js             # Central dynamic API base URL utility
│   ├── pages/
│   │   ├── Login.jsx          # Login & Account Registration page
│   │   ├── Home.jsx           # Borrower Dashboard & Catalog
│   │   ├── PersonalLoan.jsx   # Personal Loan details & EMI estimator
│   │   ├── MicroLoan.jsx      # Micro Loan details & EMI estimator
│   │   ├── HomeLoan.jsx       # Home Loan details & EMI estimator
│   │   ├── LoanApply.jsx      # Loan Application Form
│   │   └── DemoPayment.jsx    # Payment Checkout & Confirmation Receipt
│   ├── App.jsx                # Protected SPA Routes
│   ├── index.css              # Main design system & spinner keyframes
│   └── main.jsx               # React entry point
├── server.js                 # Express server & CORS configuration
├── vercel.json               # Vercel deployment rewrites & build setup
├── package.json              # NPM dependencies & scripts
└── README.md                 # Project documentation
```

---

## 📡 REST API Endpoint Documentation

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/register` | Create new Borrower Account in MongoDB Atlas | `201 Created` |
| `POST` | `/api/login` | Authenticate existing Borrower | `200 OK` |
| `GET` | `/api/health` | Backend & MongoDB Atlas health check | `200 OK` |
| `POST` | `/api/loans/apply` | Save new Loan Application (Default status: `Pending`) | `201 Created` |
| `POST` | `/api/loans/:id/pay-fee` | Process fee payment & update status to `Submitted / Processing` | `200 OK` |
| `GET` | `/api/loans/:id` | Fetch details for a specific loan application | `200 OK` |
| `GET` | `/api/loans/my-loans` | Fetch all applications for a specific borrower email | `200 OK` |

---

## 💻 Local Setup & Execution Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) Account (or local MongoDB server)

### Step 1: Clone Repository & Install Dependencies
```bash
git clone https://github.com/riya-g-10/CreditLoanSystem.git
cd CreditLoanSystem
npm install
```

### Step 2: Configure Environment Variables
Create a `.env` file in the root directory:

### Step 3: Run Application Locally
Execute the concurrent development server command:
```bash
npm run dev
```
- **React Frontend**: [http://localhost:5173](http://localhost:5173)
- **Express Backend API**: [http://localhost:5000](http://localhost:5000)

---
