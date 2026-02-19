// User types
export interface User {
  id: string
  email: string
  name?: string
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
  createdAt: Date
  updatedAt: Date
}

export interface AuthResponse {
  user: User
  token: string
}

// Project types
export interface Project {
  id: string
  title: string
  description: string
  image?: string
  techStack: string[]
  category: string
  year: number
  featured: boolean
  liveUrl?: string
  githubUrl?: string
  createdAt: Date
  updatedAt: Date
  userId: string
}

export interface ProjectFormData {
  title: string
  description: string
  image?: string
  techStack: string[]
  category: string
  year: number
  featured: boolean
  liveUrl?: string
  githubUrl?: string
}

// Blog types
export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  coverImage?: string
  tags: string[]
  published: boolean
  readingTime: number
  likes: number
  views: number
  createdAt: Date
  updatedAt: Date
  userId: string
}

export interface BlogPostFormData {
  title: string
  slug: string
  content: string
  excerpt?: string
  coverImage?: string
  tags: string[]
  published: boolean
}

export interface Comment {
  id: string
  content: string
  author: string
  email: string
  createdAt: Date
  postId: string
}

// Testimonial types
export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  content: string
  avatar?: string
  rating: number
  featured: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
}

export interface TestimonialFormData {
  name: string
  role: string
  company?: string
  content: string
  avatar?: string
  rating: number
  featured: boolean
}

// Service types
export interface Service {
  id: string
  name: string
  description: string
  icon?: string
  features: string[]
  order: number
  active: boolean
  createdAt: Date
  updatedAt: Date
}

// FAQ types
export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  order: number
  active: boolean
  createdAt: Date
  updatedAt: Date
}

// Message types
export interface Message {
  id: string
  name: string
  email: string
  subject?: string
  content: string
  read: boolean
  archived: boolean
  createdAt: Date
  userId: string
}

// Subscriber types
export interface Subscriber {
  id: string
  email: string
  name?: string
  active: boolean
  subscribedAt: Date
  unsubscribedAt?: Date
}

// Audit Log types
export interface AuditLog {
  id: string
  action: string
  entityType: string
  entityId?: string
  details?: Record<string, unknown>
  ipAddress?: string
  userAgent?: string
  createdAt: Date
  userId: string
}

// Brand Asset types
export interface BrandAsset {
  id: string
  type: string
  name: string
  url: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Form types
export interface ContactFormData {
  name: string
  email: string
  subject?: string
  content: string
}

export interface SubscribeFormData {
  email: string
  name?: string
}

// Filter types
export interface ProjectFilter {
  tech?: string
  category?: string
  year?: number
}

export interface BlogFilter {
  tag?: string
  published?: boolean
}
