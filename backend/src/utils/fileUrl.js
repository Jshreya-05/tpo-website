import { config } from '../config/index.js';

const LOCALHOST_PATTERNS = [
  /^https?:\/\/localhost(:\d+)?/i,
  /^https?:\/\/127\.0\.0\.1(:\d+)?/i,
];

/**
 * Build a public URL for a file stored under /uploads.
 */
export function buildFileUrl(relativePath) {
  const normalized = relativePath.replace(/^\/+/, '');
  return `${config.backendUrl}/uploads/${normalized}`;
}

/**
 * Rewrite legacy localhost/127.0.0.1 URLs to the configured BACKEND_URL.
 */
export function resolveImageUrl(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') {
    return imageUrl;
  }

  for (const pattern of LOCALHOST_PATTERNS) {
    if (pattern.test(imageUrl)) {
      const uploadsIndex = imageUrl.indexOf('/uploads/');
      if (uploadsIndex !== -1) {
        const relativePath = imageUrl.slice(uploadsIndex + '/uploads/'.length);
        return buildFileUrl(relativePath);
      }
      return imageUrl.replace(pattern, config.backendUrl);
    }
  }

  return imageUrl;
}
