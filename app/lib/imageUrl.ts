const BACKEND_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'https://tpo-website-631h.onrender.com'
).replace(/\/+$/, '');

const LOCALHOST_PATTERNS = [
  /^https?:\/\/localhost(:\d+)?/i,
  /^https?:\/\/127\.0\.0\.1(:\d+)?/i,
];

/**
 * Rewrite legacy localhost image URLs to the production backend URL.
 * Acts as a client-side safety net when MongoDB records were not migrated yet.
 */
export function resolveImageUrl(imageUrl: string): string {
  if (!imageUrl) return imageUrl;

  for (const pattern of LOCALHOST_PATTERNS) {
    if (pattern.test(imageUrl)) {
      const uploadsIndex = imageUrl.indexOf('/uploads/');
      if (uploadsIndex !== -1) {
        const relativePath = imageUrl.slice(uploadsIndex + '/uploads/'.length);
        return `${BACKEND_URL}/uploads/${relativePath}`;
      }
      return imageUrl.replace(pattern, BACKEND_URL);
    }
  }

  return imageUrl;
}
