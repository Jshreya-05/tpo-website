import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import galleryRoutes from './routes/gallery.js';
import { config } from './config/index.js';

const app = express();

fs.mkdirSync(config.uploadsDir, { recursive: true });

function isAllowedOrigin(origin) {
  if (!origin) return true;

  const allowedOrigins = [
    config.frontendUrl,
    'https://tpo-website-seven.vercel.app',
    'http://localhost:3000',
  ];

  if (allowedOrigins.includes(origin)) return true;
  if (/^https:\/\/tpo-website.*\.vercel\.app$/.test(origin)) return true;

  return false;
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  '/uploads',
  express.static(config.uploadsDir, {
    maxAge: config.isProduction ? '7d' : 0,
  })
);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running securely.' });
});

app.use('/api/gallery', galleryRoutes);

app.use((err, req, res, next) => {
  if (err.message?.startsWith('CORS blocked')) {
    return res.status(403).json({ success: false, message: err.message });
  }
  if (err.code === 'ENOENT') {
    return res.status(404).json({ success: false, message: 'File not found' });
  }
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

export default app;
