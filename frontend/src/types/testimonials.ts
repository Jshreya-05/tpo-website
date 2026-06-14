export interface TestimonialItem {
  id: string;
  _id: string;
  name: string;
  role: string;
  company: string;
  batch: string;
  text: string;
  initials: string;
  pkg: string;
  createdAt?: string;
}

export interface TestimonialsResponse {
  success: boolean;
  count: number;
  data: TestimonialItem[];
}

export interface SingleTestimonialResponse {
  success: boolean;
  data: TestimonialItem;
}
