import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { env } from './env.js';

dotenv.config();
dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.env') });

function readCredential(name) {
  return (process.env[name] || '').trim();
}

const cloudinaryConfig = {
  cloud_name: readCredential('CLOUDINARY_CLOUD_NAME'),
  api_key: readCredential('CLOUDINARY_API_KEY'),
  api_secret: readCredential('CLOUDINARY_API_SECRET'),
};

cloudinary.config(cloudinaryConfig);

export function isCloudinaryConfigured() {
  return Boolean(
    cloudinaryConfig.cloud_name &&
      cloudinaryConfig.api_key &&
      cloudinaryConfig.api_secret
  );
}

export function assertCloudinaryConfigured() {
  if (isCloudinaryConfigured()) return;

  const error = new Error(
    'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'
  );
  error.statusCode = env.isProduction ? 503 : 500;
  throw error;
}

export function sanitizeFolderSegment(value = '') {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function buildGalleryFolder({ year, eventName, category } = {}) {
  const folderYear =
    sanitizeFolderSegment(year || new Date().getFullYear().toString()) || 'general';
  const eventOrCategory =
    sanitizeFolderSegment(eventName || category || 'general') || 'general';
  return `kbp-tpo/gallery/${folderYear}/${eventOrCategory}`;
}

export function getUploadedAssetMeta(file = {}) {
  return {
    imageUrl: file.path || file.secure_url || '',
    publicId: file.filename || file.public_id || '',
  };
}

export async function destroyCloudinaryAsset(publicId) {
  if (!publicId) return { result: 'skipped' };

  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
    if (result?.result !== 'ok' && result?.result !== 'not found') {
      console.warn(`Cloudinary destroy returned "${result?.result}" for ${publicId}`);
    }
    return result;
  } catch (error) {
    console.error(`Cloudinary destroy failed for ${publicId}:`, error.message);
    return { result: 'error', error: error.message };
  }
}

export async function destroyCloudinaryAssets(publicIds = []) {
  const uniqueIds = [...new Set(publicIds.filter(Boolean))];
  if (uniqueIds.length === 0) return;
  await Promise.allSettled(uniqueIds.map((id) => destroyCloudinaryAsset(id)));
}

export const galleryStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req) => ({
    folder: buildGalleryFolder({
      year: req.body?.year,
      eventName: req.body?.eventName,
      category: req.body?.category,
    }),
    resource_type: 'image',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }],
  }),
});

export default cloudinary;
