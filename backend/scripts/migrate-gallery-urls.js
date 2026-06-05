/**
 * One-time migration: rewrite gallery imageUrl fields that still point at
 * localhost or 127.0.0.1 so they use BACKEND_URL instead.
 *
 * Usage (from backend/):
 *   npm run migrate:gallery-urls
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
const BACKEND_URL = (process.env.BACKEND_URL || 'https://tpo-website-631h.onrender.com').replace(
  /\/+$/,
  ''
);

const LOCALHOST_REGEX = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i;

function resolveImageUrl(imageUrl) {
  if (!imageUrl || !LOCALHOST_REGEX.test(imageUrl)) {
    return imageUrl;
  }

  const uploadsIndex = imageUrl.indexOf('/uploads/');
  if (uploadsIndex === -1) {
    return imageUrl.replace(LOCALHOST_REGEX, BACKEND_URL);
  }

  const relativePath = imageUrl.slice(uploadsIndex + '/uploads/'.length);
  return `${BACKEND_URL}/uploads/${relativePath}`;
}

const gallerySchema = new mongoose.Schema(
  {
    title: String,
    year: String,
    category: String,
    imageUrl: String,
    publicId: String,
    uploadedBy: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true, strict: false }
);

const Gallery = mongoose.model('Gallery', gallerySchema);

async function migrate() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not set in backend/.env');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
  console.log(`Target BACKEND_URL: ${BACKEND_URL}`);

  const items = await Gallery.find({
    imageUrl: { $regex: LOCALHOST_REGEX },
  });

  console.log(`Found ${items.length} gallery record(s) with localhost URLs`);

  let updated = 0;
  for (const item of items) {
    const newUrl = resolveImageUrl(item.imageUrl);
    if (newUrl !== item.imageUrl) {
      console.log(`  ${item._id}: ${item.imageUrl} -> ${newUrl}`);
      item.imageUrl = newUrl;
      await item.save();
      updated += 1;
    }
  }

  console.log(`Migration complete. Updated ${updated} record(s).`);
  await mongoose.disconnect();
}

migrate().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
