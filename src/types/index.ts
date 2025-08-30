export interface User {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
  createdAt: string;
  avatar?: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: User;
  status: 'pending' | 'approved' | 'rejected';
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  featuredImage?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  blogId: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface BlogFilters {
  category?: string;
  search?: string;
  sortBy?: 'latest' | 'trending' | 'oldest';
  status?: 'pending' | 'approved' | 'rejected';
}