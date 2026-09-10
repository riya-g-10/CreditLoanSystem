import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

function getFormattedMongoUri() {
  let uri = process.env.MONGODB_URI;
  if (!uri) return null;
  
  try {
    if (uri.includes('://')) {
      const schemeSplit = uri.split('://');
      const scheme = schemeSplit[0];
      const rest = schemeSplit[1];
      const lastAtPos = rest.lastIndexOf('@');
      
      if (lastAtPos > -1) {
        const credentials = rest.substring(0, lastAtPos);
        const hostAndQuery = rest.substring(lastAtPos + 1);
        const firstColonPos = credentials.indexOf(':');
        
        if (firstColonPos > -1) {
          const username = credentials.substring(0, firstColonPos);
          const rawPassword = credentials.substring(firstColonPos + 1);
          const safePassword = encodeURIComponent(decodeURIComponent(rawPassword));
          return `${scheme}://${username}:${safePassword}@${hostAndQuery}`;
        }
      }
    }
  } catch (e) {
    // If parsing fails, return raw URI
  }
  return uri;
}

// Global cached connection promise for Vercel Serverless Function reuse
let cachedConnectionPromise = null;

export async function connectDB() {
  const uri = getFormattedMongoUri();
  if (!uri) {
    console.warn('⚠️ MONGODB_URI is not set in environment variables.');
    return null;
  }

  // Reuse existing active connection if already connected (state 1)
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If connection is in progress, await existing promise
  if (cachedConnectionPromise) {
    return cachedConnectionPromise;
  }

  console.log('🔄 Connecting to MongoDB Atlas...');

  cachedConnectionPromise = mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
    bufferCommands: false
  }).then((m) => {
    console.log('✅ Successfully connected to MongoDB Atlas!');
    return m.connection;
  }).catch((err) => {
    cachedConnectionPromise = null;
    console.error('❌ MongoDB Atlas connection error:', err.message);
    throw err;
  });

  return cachedConnectionPromise;
}

// Connection event listeners
mongoose.connection.on('connected', () => console.log('🟢 MongoDB Atlas connection active'));
mongoose.connection.on('disconnected', () => {
  console.warn('🟡 MongoDB Atlas disconnected');
  cachedConnectionPromise = null;
});
mongoose.connection.on('error', (err) => {
  console.error('🔴 MongoDB Atlas connection error:', err.message);
  cachedConnectionPromise = null;
});

// Middleware to ensure DB connection is active before processing API request
export const checkDbConnection = async (req, res, next) => {
  try {
    await connectDB();
    if (mongoose.connection.readyState === 1) {
      return next();
    }
    throw new Error('Database connection failed to achieve connected state.');
  } catch (err) {
    console.error('checkDbConnection error:', err.message);
    return res.status(503).json({ 
      error: 'Database connection is not ready. Please verify MONGODB_URI in Vercel settings and ensure MongoDB Atlas Network Access has 0.0.0.0/0 allowed.',
      details: err.message 
    });
  }
};
