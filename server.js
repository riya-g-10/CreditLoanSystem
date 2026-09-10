import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import loanRoutes from './routes/loanRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Dynamic CORS configuration allowing localhost and production deployment URLs
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. mobile apps, curl, or same-origin serverless calls)
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(null, true); // Permissive CORS for seamless capstone demo access
    }
  },
  credentials: true
}));

app.use(express.json());

// Initialize MongoDB Atlas connection
connectDB();

// Modular API Routes
app.use('/api', authRoutes);
app.use('/api/loans', loanRoutes);

// Root Fallback Route
app.get('/api', (req, res) => {
  res.json({ message: 'CrediPulse Loan System REST API is active on Vercel Serverless Functions.' });
});

app.get('/', (req, res) => {
  res.json({ message: 'CrediPulse Loan System REST API is running.' });
});

// Bind to port only in standalone Node.js environment (not inside Vercel Serverless Function)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Modular Express server listening on http://localhost:${PORT}`);
  });
}

export default app;
