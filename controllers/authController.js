import Borrower from '../models/Borrower.js';

// POST /api/register - Register new borrower account
export const registerBorrower = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email ID and Password are required.' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if borrower already exists
    const existingBorrower = await Borrower.findOne({ email: cleanEmail });
    if (existingBorrower) {
      return res.status(400).json({ error: 'An account with this email already exists. Please sign in.' });
    }

    // Insert new borrower record into MongoDB
    const newBorrower = new Borrower({
      email: cleanEmail,
      password: password
    });

    await newBorrower.save();
    console.log(`✅ Saved new borrower to MongoDB: ${cleanEmail}`);

    res.status(201).json({ 
      message: 'Account created successfully! You can now sign in.', 
      user: { email: cleanEmail } 
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to create account.', details: err.message });
  }
};

// POST /api/login - Authenticate borrower
export const loginBorrower = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email ID and Password are required.' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Find borrower in MongoDB
    const borrower = await Borrower.findOne({ email: cleanEmail });

    if (!borrower) {
      return res.status(404).json({ error: 'No account found with this email. Please create a new account first.' });
    }

    // Verify password match
    if (borrower.password !== password) {
      return res.status(401).json({ error: 'Invalid password. Please check your credentials.' });
    }

    console.log(`✅ Borrower authenticated successfully from MongoDB: ${cleanEmail}`);

    res.json({ 
      message: 'Login successful!', 
      borrower: { email: borrower.email } 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Authentication failed.', details: err.message });
  }
};
