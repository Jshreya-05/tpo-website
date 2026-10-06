/**
 * Upload existing local gallery files to Cloudinary and update MongoDB in place.
 * Does not create duplicate gallery documents and does not delete local files.
 *
 * Usage (from backend/):
 *   npm run migrate:gallery-cloudinary
 *   npm run migrate:gallery-cloudinary -- --dry-run
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const [{ default: cloudinary, assertCloudinaryConfigured, buildGalleryFolder, isCloudinaryConfigured }, { default: Gallery }] = await Promise.all([
  import('../config/cloudinary.js'),
  import('../models/Gallery.js'),
]);

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
const BACKEND_ROOT = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

function isCloudinaryUrl(imageUrl = '') {
  return /res\.cloudinary\.com|cloudinary\.com/i.test(imageUrl);
}

function localPathFromImageUrl(imageUrl = '') {
  if (!imageUrl || isCloudinaryUrl(imageUrl)) return null;

  const normalized = imageUrl.replace(/\\/g, '/');
  const uploadsIndex = normalized.indexOf('/uploads/');
  if (uploadsIndex === -1) return null;

  const relativePath = normalized.slice(uploadsIndex + 1).replace(/\//g, path.sep);
  return path.join(BACKEND_ROOT, relativePath);
}

async function migrate() {
  if (!MONGO_URI) {
    console.error('MONGO_URI is not set in backend/.env');
    process.exit(1);
  }

  if (!isCloudinaryConfigured()) {
    console.error(
      'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'
    );
    process.exit(1);
  }

  assertCloudinaryConfigured();
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');
  if (DRY_RUN) console.log('Dry run — no Cloudinary uploads or database writes will be made.');

  const items = await Gallery.find({});
  const pending = items.filter((item) => !isCloudinaryUrl(item.imageUrl));

  console.log(`Gallery records: ${items.length}`);
  console.log(`Already on Cloudinary: ${items.length - pending.length}`);
  console.log(`Local / non-Cloudinary records to migrate: ${pending.length}`);

  let migrated = 0;
  let skippedMissingFile = 0;
  let skippedNoPath = 0;
  let failed = 0;

  for (const item of pending) {
    const localPath = localPathFromImageUrl(item.imageUrl);

    if (!localPath) {
      skippedNoPath += 1;
      console.warn(`SKIP (no local path): ${item._id} ${item.imageUrl}`);
      continue;
    }

    if (!fs.existsSync(localPath)) {
      skippedMissingFile += 1;
      console.warn(`SKIP (file missing, record left unchanged): ${item._id} ${localPath}`);
      continue;
    }

    const folder = buildGalleryFolder({
      year: item.year,
      category: item.category,
    });

    console.log(`${DRY_RUN ? 'WOULD MIGRATE' : 'MIGRATE'} ${item._id}: ${localPath} -> ${folder}`);

    if (DRY_RUN) {
      migrated += 1;
      continue;
    }

    try {
      const result = await cloudinary.uploader.upload(localPath, {
        folder,
        resource_type: 'image',
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      });

      if (!result?.secure_url || !result?.public_id) {
        throw new Error('Cloudinary upload did not return secure_url/public_id');
      }

      item.imageUrl = result.secure_url;
      item.publicId = result.public_id;
      await item.save();
      migrated += 1;
      console.log(`  updated ${item._id} -> ${result.public_id}`);
    } catch (error) {
      failed += 1;
      console.error(`FAIL ${item._id}: ${error.message}`);
    }
  }

  console.log('\n--- Migration summary ---');
  console.log(`Migrated: ${migrated}`);
  console.log(`Skipped (file missing): ${skippedMissingFile}`);
  console.log(`Skipped (not a local /uploads URL): ${skippedNoPath}`);
  console.log(`Failed: ${failed}`);
  console.log('Local files were not deleted.');

  await mongoose.disconnect();
  process.exit(failed > 0 ? 1 : 0);
}

migrate().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
