import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { config } from '../config/index.js';

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'image';
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const year = req.body.year || new Date().getFullYear().toString();
    // Existing records store files under gallery/{year}/general/
    const uploadDir = path.join(config.uploadsDir, 'gallery', year, 'general');

    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const baseName = slugify(path.parse(file.originalname).name);
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `${uniqueSuffix}-${baseName}${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
    return;
  }
  cb(new Error('Only image files are allowed'), false);
};

export const galleryUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});
