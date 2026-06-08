import path from 'path';
import { env } from '../config/env.js';

const LOCALHOST_PATTERNS = [
  /^https?:\/\/localhost(:\d+)?/i,
  /^https?:\/\/127\.0\.0\.1(:\d+)?/i,
];

export function buildFileUrl(relativePath) {
  const normalized = relativePath.replace(/^\/+/, '').replace(/\\/g, '/');
  return `${env.backendUrl}/uploads/${normalized}`;
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

  if (imageUrl.startsWith(env.backendUrl)) {
    return imageUrl;
  }

  for (const pattern of LOCALHOST_PATTERNS) {
    if (pattern.test(imageUrl)) {
      const uploadsIndex = imageUrl.indexOf('/uploads/');
      if (uploadsIndex !== -1) {
        const relativePath = imageUrl.slice(uploadsIndex + '/uploads/'.length);
        return buildFileUrl(relativePath);
      }
      return imageUrl.replace(pattern, env.backendUrl);
    }
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
