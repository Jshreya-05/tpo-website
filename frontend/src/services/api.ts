import axios from 'axios';
import type { ActivityResponse, SingleActivityResponse } from '../types/activities';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL.replace(/\/+$/, ''),
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (localStorage.getItem('userInfo')) {
        localStorage.removeItem('userInfo');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export interface LoginResponse {
  success: boolean;
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  token: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', { email, password });
  return data;
};

export const fetchActivities = async (params?: {
  page?: number;
  limit?: number;
  year?: number | string;
  category?: string;
  search?: string;
  status?: string;
  isFeatured?: boolean;
}): Promise<ActivityResponse> => {
  const { data } = await apiClient.get<ActivityResponse>('/activities', { params });
  return data;
};

export const fetchFeaturedActivities = async (): Promise<ActivityResponse> => {
  const { data } = await apiClient.get<ActivityResponse>('/activities/featured');
  return data;
};

export const fetchActivityById = async (id: string): Promise<SingleActivityResponse> => {
  const { data } = await apiClient.get<SingleActivityResponse>(`/activities/${id}`);
  return data;
};

export const fetchAdminAnalytics = async () => {
  const { data } = await apiClient.get('/activities/admin/analytics');
  return data;
};

export const createActivity = async (formData: FormData) => {
  const { data } = await apiClient.post('/activities/admin', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const updateActivity = async (id: string, formData: FormData) => {
  const { data } = await apiClient.put(`/activities/admin/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const deleteActivity = async (id: string) => {
  const { data } = await apiClient.delete(`/activities/admin/${id}`);
  return data;
};

export const fetchGalleryImages = async (params?: Record<string, unknown>) => {
  const { data } = await apiClient.get('/gallery', { params });
  return data;
};

export const uploadGalleryImages = async (
  formData: FormData,
  onUploadProgress?: (progress: number) => void
) => {
  const { data } = await apiClient.post('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      if (onUploadProgress && progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onUploadProgress(percentCompleted);
      }
    },
  });
  return data;
};

export const deleteGalleryImage = async (id: string) => {
  const { data } = await apiClient.delete(`/gallery/${id}`);
  return data;
};

export const fetchGalleryStats = async () => {
  const { data } = await apiClient.get('/gallery/stats');
  return data;
};

export const getCloudinaryUrl = (url: string, width = 800) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_fill/`);
};

export default apiClient;
