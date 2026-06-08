import dotenv from 'dotenv';

dotenv.config();

function normalizeUrl(url) {
  return url.replace(/\/+$/, '');
}

const port = Number(process.env.PORT) || 5000;

export const env = {
  port,
  mongoUri: process.env.MONGO_URI || process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
  backendUrl: normalizeUrl(process.env.BACKEND_URL || `http://localhost:${port}`),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
};
