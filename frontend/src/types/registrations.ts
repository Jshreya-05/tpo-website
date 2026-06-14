export interface StudentRegistration {
  id: string;
  _id: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  year: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegistrationsResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  totalPages: number;
  data: StudentRegistration[];
}

export interface ContactSubmission {
  id: string;
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  org: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactSubmissionsResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  totalPages: number;
  data: ContactSubmission[];
}
