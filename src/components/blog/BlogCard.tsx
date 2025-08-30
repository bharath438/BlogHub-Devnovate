import React from 'react';
import { Heart, MessageCircle, Eye, Clock, User } from 'lucide-react';
import { Blog } from '../../types';
import { Card } from '../ui/Card';

interface BlogCardProps {
  blog: Blog;
  onClick?: () => void;
  showStatus?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ 
  blog, 
  onClick, 
  showStatus = false 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card hover={!!onClick} onClick={onClick} className="overflow-hidden">
      {blog.featuredImage && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
            {blog.category}
          </span>
          {showStatus && (
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(blog.status)}`}>
              {blog.status}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
          {blog.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {blog.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
            >
              #{tag}
            </span>
          ))}
          {blog.tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
              +{blog.tags.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {blog.author.avatar ? (
              <img
                src={blog.author.avatar}
                alt={blog.author.username}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-gray-400" />
            )}
            <div className="text-sm">
              <p className="font-medium text-gray-900">{blog.author.username}</p>
              <div className="flex items-center text-gray-500 space-x-1">
                <Clock className="w-3 h-3" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{blog.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{blog.comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{blog.views}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};