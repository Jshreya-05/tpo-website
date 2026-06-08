import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: (process.env.CLOUDINARY_CLOUD_NAME || '').trim(),
  api_key: (process.env.CLOUDINARY_API_KEY || '').trim(),
  api_secret: (process.env.CLOUDINARY_API_SECRET || '').trim()
});

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: (req, file) => {
      const year = req.body.year || new Date().getFullYear().toString();
      const eventName = req.body.eventName ? req.body.eventName.toLowerCase().replace(/\s+/g, '-') : 'general';
      return `kbp-tpo/gallery/${year}/${eventName}`;
    },
    allowedFormats: ['jpeg', 'png', 'jpg', 'webp'],
    transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }]
  }
});

export default cloudinary;
