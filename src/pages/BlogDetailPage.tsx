import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Eye, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useBlog } from '../context/BlogContext';

export const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBlogById, likeBlog } = useBlog();
  const [hasLiked, setHasLiked] = useState(false);

  const blog = id ? getBlogById(id) : null;

  if (!blog) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Blog not found</h1>
            <p className="text-gray-600 mt-2">The blog you're looking for doesn't exist.</p>
            <Button
              onClick={() => navigate('/blogs')}
              className="mt-4"
              icon={ArrowLeft}
            >
              Back to Blogs
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleLike = async () => {
    if (!hasLiked) {
      await likeBlog(blog.id);
      setHasLiked(true);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          icon={ArrowLeft}
          className="mb-6"
        >
          Back
        </Button>

        <article>
          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="aspect-video w-full rounded-xl overflow-hidden mb-8">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Blog Header */}
          <header className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full">
                {blog.category}
              </span>
              {blog.status !== 'approved' && (
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                  blog.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                }`}>
                  {blog.status}
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {blog.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              {blog.excerpt}
            </p>

            {/* Author and Meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {blog.author.avatar ? (
                  <img
                    src={blog.author.avatar}
                    alt={blog.author.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-gray-400" />
                )}
                <div>
                  <p className="font-semibold text-gray-900">{blog.author.username}</p>
                  <div className="flex items-center text-gray-500 space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{blog.views} views</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  onClick={handleLike}
                  variant={hasLiked ? 'primary' : 'outline'}
                  size="sm"
                  icon={Heart}
                  disabled={hasLiked}
                >
                  {blog.likes}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={Share2}
                  onClick={() => navigator.share?.({ title: blog.title, url: window.location.href })}
                >
                  Share
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          {/* Blog Content */}
          <Card className="p-8">
            <div className="prose prose-lg prose-gray max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {blog.content}
              </ReactMarkdown>
            </div>
          </Card>

          {/* Engagement Stats */}
          <Card className="mt-8 p-6">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-red-500 mb-2">
                  <Heart className="w-5 h-5" />
                  <span className="text-2xl font-bold">{blog.likes}</span>
                </div>
                <p className="text-sm text-gray-600">Likes</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-blue-500 mb-2">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-2xl font-bold">{blog.comments}</span>
                </div>
                <p className="text-sm text-gray-600">Comments</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-gray-500 mb-2">
                  <Eye className="w-5 h-5" />
                  <span className="text-2xl font-bold">{blog.views}</span>
                </div>
                <p className="text-sm text-gray-600">Views</p>
              </div>
            </div>
          </Card>
        </article>
      </div>
    </Layout>
  );
};