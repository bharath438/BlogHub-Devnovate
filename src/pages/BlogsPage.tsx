import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { BlogList } from '../components/blog/BlogList';
import { BlogFilters } from '../components/blog/BlogFilters';
import { useBlog } from '../context/BlogContext';
import { BlogFilters as FilterType } from '../types';

export const BlogsPage: React.FC = () => {
  const { filteredBlogs, filters, setFilters, isLoading } = useBlog();
  
  const approvedBlogs = filteredBlogs.filter(blog => blog.status === 'approved');

  const handleFiltersChange = (newFilters: FilterType) => {
    setFilters(newFilters);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Blogs</h1>
          <p className="text-gray-600">Discover amazing stories from our community</p>
        </div>

        <BlogFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <BlogList
            blogs={approvedBlogs}
            emptyMessage="No blogs match your current filters."
          />
        )}
      </div>
    </Layout>
  );
};