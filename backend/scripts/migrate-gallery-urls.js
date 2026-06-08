/**
 * Rewrite gallery imageUrl fields that point at localhost / 127.0.0.1 (any port).
 *
 * Usage (from backend/):
 *   BACKEND_URL=https://tpo-website-631h.onrender.com npm run migrate:gallery-urls
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
const BACKEND_URL = (
  process.env.BACKEND_URL || 'https://tpo-website-631h.onrender.com'
).replace(/\/+$/, '');

const LOCALHOST_REGEX = /https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i;
const LOCALHOST_QUERY = /(localhost|127\.0\.0\.1)/i;

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
  if (!MONGO_URI) {
    console.error('MONGO_URI is not set in backend/.env');
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');
  console.log(`Target BACKEND_URL: ${BACKEND_URL}`);

  const items = await Gallery.find({
    imageUrl: { $regex: LOCALHOST_QUERY },
  });

  console.log(`Found ${items.length} gallery record(s) with localhost URLs`);

  let updated = 0;
  let sampleBefore = null;
  let sampleAfter = null;

  for (const item of items) {
    const before = item.imageUrl;
    const after = resolveImageUrl(before);
    if (after !== before) {
      if (!sampleBefore) {
        sampleBefore = { _id: item._id, imageUrl: before };
      }
      item.imageUrl = after;
      await item.save();
      updated += 1;
      sampleAfter = { _id: item._id, imageUrl: after };
      console.log(`  ${item._id}: ${before} -> ${after}`);
    }
  }

  console.log('\n--- Migration summary ---');
  console.log(`Documents updated: ${updated}`);
  if (sampleBefore) {
    console.log('Sample before:', JSON.stringify(sampleBefore, null, 2));
    console.log('Sample after:', JSON.stringify(sampleAfter, null, 2));
  } else {
    console.log('No documents required updating.');
  }

  await mongoose.disconnect();
}

migrate().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
