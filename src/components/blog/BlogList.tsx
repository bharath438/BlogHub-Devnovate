import React from 'react';
import { Blog } from '../../types';
import { BlogCard } from './BlogCard';
import { useNavigate } from 'react-router-dom';

interface BlogListProps {
  blogs: Blog[];
  showStatus?: boolean;
  emptyMessage?: string;
}

export const BlogList: React.FC<BlogListProps> = ({ 
  blogs, 
  showStatus = false, 
  emptyMessage = 'No blogs found.' 
}) => {
  const navigate = useNavigate();

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onClick={() => navigate(`/blog/${blog.id}`)}
          showStatus={showStatus}
        />
      ))}
    </div>
  );
};