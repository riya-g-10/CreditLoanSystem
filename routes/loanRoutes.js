import express from 'express';
import { 
  applyLoan, 
  processPaymentFee, 
  getLoanById, 
  getBorrowerLoans 
} from '../controllers/loanController.js';
import { checkDbConnection } from '../config/db.js';

const router = express.Router();

// POST /api/loans/apply - Submit loan application
router.post('/apply', checkDbConnection, applyLoan);

// POST /api/loans/:id/pay-fee - Process simulated payment fee and update status
router.post('/:id/pay-fee', checkDbConnection, processPaymentFee);

// GET /api/loans/my-loans - Fetch user's loan applications
router.get('/my-loans', checkDbConnection, getBorrowerLoans);

// GET /api/loans/:id - Fetch single loan application details
router.get('/:id', checkDbConnection, getLoanById);

export default router;
