const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://tpo-website-631h.onrender.com';

export const API_URL = API_BASE_URL.replace(/\/+$/, '');

export interface GalleryItem {
  _id: string;
  title: string;
  year: string;
  category: string;
  imageUrl: string;
  publicId: string;
  uploadedBy?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface GalleryResponse {
  success: boolean;
  data: GalleryItem[];
  total: number;
  page: number;
  pages: number;
}

export async function fetchGallery(params?: {
  page?: number;
  year?: string;
  category?: string;
}): Promise<GalleryResponse> {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.year) searchParams.set('year', params.year);
  if (params?.category) searchParams.set('category', params.category);

  const query = searchParams.toString();
  const url = `${API_URL}/api/gallery${query ? `?${query}` : ''}`;

  const response = await fetch(url, { next: { revalidate: 60 } });

  if (!response.ok) {
    throw new Error(`Failed to fetch gallery: ${response.status}`);
  }

  return response.json();
}
