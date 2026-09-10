import express from 'express';
import { registerBorrower, loginBorrower } from '../controllers/authController.js';
import { checkDbConnection } from '../config/db.js';
import mongoose from 'mongoose';

const router = express.Router();

// GET /api/health
router.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.json({ status: 'ok', database: states[dbState] || 'unknown' });
});

// POST /api/register
router.post('/register', checkDbConnection, registerBorrower);

// POST /api/login
router.post('/login', checkDbConnection, loginBorrower);

export default router;
