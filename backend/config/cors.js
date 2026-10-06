import { env } from './env.js';

const STATIC_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://tpo-website-seven.vercel.app',
  'https://www.svpatil.com',
  'https://svpatil.com',
];

function isAllowedOrigin(origin) {
  if (!origin) return true;

  const allowed = [env.frontendUrl, ...STATIC_ORIGINS].filter(Boolean);
  if (allowed.includes(origin)) return true;
  if (/^https:\/\/tpo-website[\w-]*\.vercel\.app$/.test(origin)) return true;

  return false;
}

export const corsOptions = {
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
};
