import mongoose from 'mongoose';

const borrowerSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  }
}, { 
  timestamps: true,
  bufferCommands: false
});

const Borrower = mongoose.model('Borrower', borrowerSchema);

export default Borrower;
