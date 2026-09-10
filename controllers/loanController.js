import Loan from '../models/Loan.js';

// POST /api/loans/apply - Save a new loan application to MongoDB
export const applyLoan = async (req, res) => {
  try {
    const { fullName, loanAmount, tenure, employmentStatus, income, loanType, borrowerEmail } = req.body;

    if (!fullName || !loanAmount || !tenure || !employmentStatus || !income) {
      return res.status(400).json({ error: 'All loan fields (Full Name, Loan Amount, Tenure, Employment Status, Income) are required.' });
    }

    // Default processing fee calculated as 1% of loan amount or minimum $50
    const calculatedFee = Math.max(50, Math.round(Number(loanAmount) * 0.01));

    const newLoan = new Loan({
      fullName: fullName.trim(),
      loanAmount: Number(loanAmount),
      tenure: Number(tenure),
      employmentStatus,
      income: Number(income),
      loanType: loanType || 'Personal Loan',
      borrowerEmail: borrowerEmail ? borrowerEmail.toLowerCase().trim() : 'guest@creditpulse.com',
      status: 'Pending', // Defaults to Pending
      processingFee: calculatedFee
    });

    const savedLoan = await newLoan.save();
    console.log(`✅ Saved new loan application to MongoDB: ID ${savedLoan._id} for ${savedLoan.fullName}`);

    res.status(201).json({
      message: 'Loan application created successfully.',
      loan: savedLoan
    });
  } catch (err) {
    console.error('Apply loan error:', err);
    res.status(500).json({ error: 'Failed to create loan application.', details: err.message });
  }
};

// POST /api/loans/:id/pay-fee - Update loan status after simulated fee payment
export const processPaymentFee = async (req, res) => {
  try {
    const { id } = req.params;

    const loan = await Loan.findById(id);
    if (!loan) {
      return res.status(404).json({ error: 'Loan application not found.' });
    }

    // Simulate payment transaction generation
    const mockTxnId = 'TXN-' + Math.floor(10000000 + Math.random() * 90000000);

    // Update status in MongoDB to "Submitted / Processing"
    loan.status = 'Submitted / Processing';
    loan.paymentTxnId = mockTxnId;
    loan.paidAt = new Date();

    const updatedLoan = await loan.save();
    console.log(`✅ Loan ID ${id} payment processed. Status updated to: ${updatedLoan.status}`);

    res.json({
      message: 'Demo payment processed successfully! Application status updated.',
      loan: updatedLoan
    });
  } catch (err) {
    console.error('Payment processing error:', err);
    res.status(500).json({ error: 'Failed to process demo payment.', details: err.message });
  }
};

// GET /api/loans/:id - Fetch single loan application details
export const getLoanById = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await Loan.findById(id);

    if (!loan) {
      return res.status(404).json({ error: 'Loan application not found.' });
    }

    res.json({ loan });
  } catch (err) {
    console.error('Fetch loan error:', err);
    res.status(500).json({ error: 'Failed to retrieve loan details.', details: err.message });
  }
};

// GET /api/loans/my-loans - Fetch all loan applications for a borrower
export const getBorrowerLoans = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Borrower email is required to fetch applications.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const loans = await Loan.find({ borrowerEmail: cleanEmail }).sort({ createdAt: -1 });

    res.json({ loans });
  } catch (err) {
    console.error('Fetch borrower loans error:', err);
    res.status(500).json({ error: 'Failed to retrieve borrower loans.', details: err.message });
  }
};
