import path from 'path';
import { env } from '../config/env.js';

const LOCALHOST_PATTERNS = [
  /^https?:\/\/localhost(:\d+)?/i,
  /^https?:\/\/127\.0\.0\.1(:\d+)?/i,
];

function isLocalhostUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return LOCALHOST_PATTERNS.some((pattern) => pattern.test(url));
}

/** Public base URL for API responses — never localhost in production. */
export function getPublicBackendUrl() {
  return env.backendUrl;
}

export function buildFileUrl(relativePath) {
  const normalized = relativePath.replace(/^\/+/, '').replace(/\\/g, '/');
  return `${getPublicBackendUrl()}/uploads/${normalized}`;
}

export function filePathToRelative(filePath) {
  if (!filePath) return '';
  const normalized = filePath.replace(/\\/g, '/');
  const uploadsIndex = normalized.indexOf('/uploads/');
  if (uploadsIndex !== -1) {
    return normalized.slice(uploadsIndex + '/uploads/'.length);
  }
  return path.basename(filePath);
}

export function filePathToPublicUrl(filePath) {
  return buildFileUrl(filePathToRelative(filePath));
}

export function resolveImageUrl(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') {
    return imageUrl;
  }

  const publicBase = getPublicBackendUrl();

  if (isLocalhostUrl(imageUrl)) {
    const uploadsIndex = imageUrl.indexOf('/uploads/');
    if (uploadsIndex !== -1) {
      const relativePath = imageUrl.slice(uploadsIndex + '/uploads/'.length);
      return `${publicBase}/uploads/${relativePath}`;
    }
    return imageUrl.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i, publicBase);
  }

  if (imageUrl.startsWith(publicBase)) {
    return imageUrl;
  }

  if (!/^https?:\/\//i.test(imageUrl) && imageUrl.includes('uploads')) {
    return buildFileUrl(filePathToRelative(imageUrl));
  }

  return imageUrl;
}

export function resolveImageUrls(urls) {
  if (!Array.isArray(urls)) return urls;
  return urls.map(resolveImageUrl);
}
