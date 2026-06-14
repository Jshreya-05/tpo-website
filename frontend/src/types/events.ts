export interface UpcomingEvent {
  id: string; // Used internally and by the backend virtual
  _id: string; // Mongoose default
  title: string;
  companyName: string;
  eventType?: string;
  description: string;
  image: string;
  googleFormLink?: string;
  registrationLink?: string;
  eligibilityCriteria: string;
  eventDate: string;
  deadline: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface EventResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  totalPages: number;
  data: UpcomingEvent[];
}

export interface SingleEventResponse {
  success: boolean;
  data: UpcomingEvent;
}
