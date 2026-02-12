export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  updatedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  readingTime?: number;
  viewCount?: number;
  author?: {
    name: string;
    avatar?: string;
  };
}

export interface HeroSlide {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pages: number;
  total: number;
  page: number;
}
