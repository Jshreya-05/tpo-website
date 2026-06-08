export interface Activity {
  id: string; // Used internally and by the backend virtual
  _id: string; // Mongoose default
  title: string;
  category: 'Placement Drive' | 'Workshop' | 'Seminar' | 'Bootcamp' | 'Guest Lecture';
  year: number;
  eventDate: string;
  description: string;
  images: string[];
  companyName?: string;
  isFeatured?: boolean;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface ActivityResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  totalPages: number;
  data: Activity[];
}

export interface SingleActivityResponse {
  success: boolean;
  data: Activity;
}

