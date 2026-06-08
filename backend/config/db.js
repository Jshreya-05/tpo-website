import mongoose from 'mongoose';
import { env } from './env.js';

const connectDB = async () => {
  if (!env.mongoUri) {
    console.error('MONGO_URI is not set. Copy backend/.env.example to backend/.env');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(env.mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;