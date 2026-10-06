import multer from 'multer';
import {
  assertCloudinaryConfigured,
  destroyCloudinaryAssets,
  galleryStorage,
  getUploadedAssetMeta,
} from '../config/cloudinary.js';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FILES = 20;

const galleryMulter = multer({
  storage: galleryStorage,
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      const error = new Error('Only JPG, JPEG, PNG, and WEBP image formats are allowed.');
      error.statusCode = 400;
      return cb(error);
    }
    cb(null, true);
  },
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: MAX_FILES,
  },
});

function statusForUploadError(error) {
  if (error?.statusCode) return error.statusCode;
  if (error?.code === 'LIMIT_FILE_SIZE') return 400;
  if (error?.code === 'LIMIT_FILE_COUNT') return 400;
  if (error?.http_code && Number(error.http_code) >= 400) return Number(error.http_code);
  return 400;
}

export function uploadGalleryFiles(req, res, next) {
  try {
    assertCloudinaryConfigured();
  } catch (error) {
    return next(error);
  }

  galleryMulter.array('images', MAX_FILES)(req, res, async (error) => {
    if (!error) {
      return next();
    }

    const uploadedIds = (req.files || []).map((file) => getUploadedAssetMeta(file).publicId);
    await destroyCloudinaryAssets(uploadedIds);

    error.statusCode = statusForUploadError(error);
    if (error.code === 'LIMIT_FILE_SIZE') {
      error.message = 'Each image must be 5MB or smaller.';
    } else if (error.code === 'LIMIT_FILE_COUNT') {
      error.message = `A maximum of ${MAX_FILES} images can be uploaded at once.`;
    } else if (!error.message) {
      error.message = 'Failed to upload images to Cloudinary.';
    }

    return next(error);
  });
}
