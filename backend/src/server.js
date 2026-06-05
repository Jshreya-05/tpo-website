import mongoose from 'mongoose';
import app from './app.js';
import { config } from './config/index.js';

async function startServer() {
  if (!config.mongoUri) {
    console.error('MONGODB_URI is not set. Add it to backend/.env');
    process.exit(1);
  }

  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
    console.log(`Public file base URL: ${config.backendUrl}/uploads`);
  });
}

startServer();
