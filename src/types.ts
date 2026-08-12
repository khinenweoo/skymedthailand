export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'patient' | 'doctor';
  phone?: string;
  emergencyContact?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface UploadedFile {
  id: string;
  fileName: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  authorName: string;
  authorRole: string;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  userId?: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  emergencyLevel: 'normal' | 'urgent' | 'critical';
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  title: string;
  avatar: string;
  quote: string;
  location: string;
}

export interface ValueProp {
  number: string;
  title: string;
  description: string;
}
