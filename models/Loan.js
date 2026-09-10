import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full Name is required'],
    trim: true
  },
  loanAmount: {
    type: Number,
    required: [true, 'Loan Amount is required'],
    min: [100, 'Loan amount must be at least $100']
  },
  tenure: {
    type: Number,
    required: [true, 'Tenure is required'],
    min: [1, 'Tenure must be at least 1 month']
  },
  employmentStatus: {
    type: String,
    required: [true, 'Employment Status is required'],
    enum: ['Employed', 'Self-Employed', 'Unemployed', 'Student', 'Freelancer', 'Business Owner']
  },
  income: {
    type: Number,
    required: [true, 'Income is required'],
    min: [0, 'Income cannot be negative']
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Submitted / Processing', 'Approved', 'Rejected']
  },
  loanType: {
    type: String,
    default: 'Personal Loan'
  },
  borrowerEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  processingFee: {
    type: Number,
    default: 50
  },
  paymentTxnId: {
    type: String,
    default: null
  },
  paidAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  bufferCommands: false
});

const Loan = mongoose.model('Loan', loanSchema);

export default Loan;
