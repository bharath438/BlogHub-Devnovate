import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { BlogList } from '../components/blog/BlogList';
import { useBlog } from '../context/BlogContext';

export const TrendingPage: React.FC = () => {
  const { getTrendingBlogs } = useBlog();
  const trendingBlogs = getTrendingBlogs();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Trending Stories</h1>
          </div>
          <p className="text-gray-600">The most engaging content based on likes and comments</p>
        </div>

        <BlogList
          blogs={trendingBlogs}
          emptyMessage="No trending articles yet. Be the first to create engaging content!"
        />
      </div>
    </Layout>
  );
};