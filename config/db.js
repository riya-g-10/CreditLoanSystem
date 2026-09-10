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

export async function connectDB() {
  const uri = getFormattedMongoUri();
  if (!uri) {
    console.warn('⚠️ MONGODB_URI is not set in .env file. Please add your connection string to .env');
    return;
  }

  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('✅ Successfully connected to MongoDB Atlas!');
  } catch (err) {
    console.error('❌ MongoDB Atlas connection error:', err.message);
    if (err.message.includes('whitelisted') || err.message.includes('Could not connect to any servers')) {
      console.warn('\n👉 ACTION REQUIRED: Your current IP address is not whitelisted in MongoDB Atlas.');
      console.warn('   1. Log into https://cloud.mongodb.com');
      console.warn('   2. Go to Security -> Network Access');
      console.warn('   3. Click "+ Add IP Address" -> "Allow Access from Anywhere" (0.0.0.0/0)');
      console.warn('   4. Save and wait 1 minute for changes to apply.\n');
    }
  }
}

// Connection event listeners
mongoose.connection.on('connected', () => console.log('🟢 MongoDB Atlas connection active'));
mongoose.connection.on('disconnected', () => console.warn('🟡 MongoDB Atlas disconnected. Retrying...'));
mongoose.connection.on('error', (err) => console.error('🔴 MongoDB Atlas connection error:', err.message));

// Middleware to verify DB connection before running queries
export const checkDbConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    // Attempt auto-reconnect if disconnected
    connectDB();
    return res.status(503).json({ 
      error: 'Database connection is not ready. Please verify your MONGODB_URI or check MongoDB Atlas Network Access (IP Whitelist).' 
    });
  }
  next();
};
