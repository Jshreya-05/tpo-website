import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

function normalizeUrl(url) {
  return url.replace(/\/+$/, '');
}

const port = Number(process.env.PORT) || 5000;

const backendUrl = normalizeUrl(
  process.env.BACKEND_URL || `http://localhost:${port}`
);

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

export const config = {
  port,
  mongoUri: process.env.MONGODB_URI,
  backendUrl,
  frontendUrl,
  uploadsDir: path.resolve(__dirname, '../../uploads'),
  isProduction: process.env.NODE_ENV === 'production',
};
