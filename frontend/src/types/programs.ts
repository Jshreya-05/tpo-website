import type { ProgramDepartmentSlug } from '../constants/departments';

export interface Program {
  id?: string;
  _id?: string;
  slug: string;
  title: string;
  shortDesc: string;
  tag: string;
  tagColor: string;
  tagTextColor: string;
  icon: string;
  gradient: string;
  students: number;
  duration: string;
  description: string;
  topics: string[];
  benefits: string[];
  url: string;
  department?: ProgramDepartmentSlug | null;
  status?: 'draft' | 'published';
  sortOrder?: number;
}

export interface ProgramResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  totalPages: number;
  data: Program[];
}

export interface SingleProgramResponse {
  success: boolean;
  data: Program;
}
