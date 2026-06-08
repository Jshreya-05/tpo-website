import dotenv from 'dotenv';

dotenv.config();

const PRODUCTION_BACKEND_FALLBACK = 'https://tpo-website-631h.onrender.com';

function normalizeUrl(url) {
  return url.replace(/\/+$/, '');
}

function isLocalhostUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(url);
}

function resolveBackendUrl(port) {
  const configured = process.env.BACKEND_URL?.trim();
  if (configured && !isLocalhostUrl(configured)) {
    return normalizeUrl(configured);
  }

  if (process.env.NODE_ENV === 'production') {
    if (configured && isLocalhostUrl(configured)) {
      console.warn(
        'BACKEND_URL is localhost in production — using public fallback for API image URLs.'
      );
    }
    return PRODUCTION_BACKEND_FALLBACK;
  }

  return normalizeUrl(configured || `http://localhost:${port}`);
}

const port = Number(process.env.PORT) || 5000;

export const env = {
  port,
  mongoUri: process.env.MONGO_URI || process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
  backendUrl: resolveBackendUrl(port),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
};
