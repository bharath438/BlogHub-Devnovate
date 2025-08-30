import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Blog, BlogFilters } from '../types';
import { mockBlogs } from '../data/mockData';

interface BlogContextType {
  blogs: Blog[];
  filteredBlogs: Blog[];
  filters: BlogFilters;
  isLoading: boolean;
  createBlog: (blogData: Partial<Blog>) => Promise<void>;
  updateBlogStatus: (blogId: string, status: 'approved' | 'rejected') => Promise<void>;
  deleteBlog: (blogId: string) => Promise<void>;
  likeBlog: (blogId: string) => Promise<void>;
  setFilters: (filters: BlogFilters) => void;
  getBlogById: (id: string) => Blog | undefined;
  getTrendingBlogs: () => Blog[];
}

type BlogAction = 
  | { type: 'SET_BLOGS'; payload: Blog[] }
  | { type: 'ADD_BLOG'; payload: Blog }
  | { type: 'UPDATE_BLOG'; payload: Blog }
  | { type: 'DELETE_BLOG'; payload: string }
  | { type: 'SET_FILTERS'; payload: BlogFilters }
  | { type: 'SET_LOADING'; payload: boolean };

interface BlogState {
  blogs: Blog[];
  filters: BlogFilters;
  isLoading: boolean;
}

const blogReducer = (state: BlogState, action: BlogAction): BlogState => {
  switch (action.type) {
    case 'SET_BLOGS':
      return { ...state, blogs: action.payload, isLoading: false };
    case 'ADD_BLOG':
      return { ...state, blogs: [action.payload, ...state.blogs] };
    case 'UPDATE_BLOG':
      return {
        ...state,
        blogs: state.blogs.map(blog =>
          blog.id === action.payload.id ? action.payload : blog
        ),
      };
    case 'DELETE_BLOG':
      return {
        ...state,
        blogs: state.blogs.filter(blog => blog.id !== action.payload),
      };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const initialState: BlogState = {
  blogs: [],
  filters: {},
  isLoading: true,
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  React.useEffect(() => {
    // Simulate loading blogs from API
    setTimeout(() => {
      dispatch({ type: 'SET_BLOGS', payload: mockBlogs });
    }, 1000);
  }, []);

  const getFilteredBlogs = (): Blog[] => {
    let filtered = [...state.blogs];

    if (state.filters.search) {
      const searchTerm = state.filters.search.toLowerCase();
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.excerpt.toLowerCase().includes(searchTerm) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    if (state.filters.category) {
      filtered = filtered.filter(blog => blog.category === state.filters.category);
    }

    if (state.filters.status) {
      filtered = filtered.filter(blog => blog.status === state.filters.status);
    }

    // Sort blogs
    switch (state.filters.sortBy) {
      case 'trending':
        filtered.sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'latest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  };

  const createBlog = async (blogData: Partial<Blog>): Promise<void> => {
    const newBlog: Blog = {
      id: Math.random().toString(36).substr(2, 9),
      title: blogData.title || '',
      content: blogData.content || '',
      excerpt: blogData.excerpt || '',
      author: blogData.author!,
      status: 'pending',
      category: blogData.category || 'General',
      tags: blogData.tags || [],
      likes: 0,
      comments: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      featuredImage: blogData.featuredImage,
    };

    dispatch({ type: 'ADD_BLOG', payload: newBlog });
  };

  const updateBlogStatus = async (blogId: string, status: 'approved' | 'rejected'): Promise<void> => {
    const blog = state.blogs.find(b => b.id === blogId);
    if (blog) {
      const updatedBlog = {
        ...blog,
        status,
        publishedAt: status === 'approved' ? new Date().toISOString() : undefined,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: 'UPDATE_BLOG', payload: updatedBlog });
    }
  };

  const deleteBlog = async (blogId: string): Promise<void> => {
    dispatch({ type: 'DELETE_BLOG', payload: blogId });
  };

  const likeBlog = async (blogId: string): Promise<void> => {
    const blog = state.blogs.find(b => b.id === blogId);
    if (blog) {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      dispatch({ type: 'UPDATE_BLOG', payload: updatedBlog });
    }
  };

  const setFilters = (filters: BlogFilters): void => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const getBlogById = (id: string): Blog | undefined => {
    return state.blogs.find(blog => blog.id === id);
  };

  const getTrendingBlogs = (): Blog[] => {
    return state.blogs
      .filter(blog => blog.status === 'approved')
      .sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments))
      .slice(0, 6);
  };

  return (
    <BlogContext.Provider value={{
      blogs: state.blogs,
      filteredBlogs: getFilteredBlogs(),
      filters: state.filters,
      isLoading: state.isLoading,
      createBlog,
      updateBlogStatus,
      deleteBlog,
      likeBlog,
      setFilters,
      getBlogById,
      getTrendingBlogs,
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};