import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, BookOpen, Users, Award, ArrowRight } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { BlogCard } from '../components/blog/BlogCard';
import { Button } from '../components/ui/Button';
import { useBlog } from '../context/BlogContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { blogs, getTrendingBlogs } = useBlog();
  
  const approvedBlogs = blogs.filter(blog => blog.status === 'approved');
  const latestBlogs = approvedBlogs.slice(0, 6);
  const trendingBlogs = getTrendingBlogs();

  const stats = [
    { icon: BookOpen, label: 'Published Articles', value: approvedBlogs.length },
    { icon: Users, label: 'Active Writers', value: 156 },
    { icon: TrendingUp, label: 'Monthly Readers', value: '12K+' },
    { icon: Award, label: 'Featured Stories', value: 24 },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Share Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Stories</span> with the World
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 leading-relaxed">
              Join thousands of writers and readers in our vibrant community. Discover amazing content, share your expertise, and connect with like-minded individuals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/blogs')}
                size="lg"
                className="bg-white text-indigo-900 hover:bg-gray-100"
              >
                Explore Stories
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-indigo-900"
              >
                Start Writing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Stories</h2>
              <p className="text-gray-600">Most popular articles this week</p>
            </div>
            <Button
              onClick={() => navigate('/trending')}
              variant="outline"
              icon={ArrowRight}
            >
              View All
            </Button>
          </div>

          {trendingBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  onClick={() => navigate(`/blog/${blog.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No trending articles yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Articles</h2>
              <p className="text-gray-600">Fresh content from our community</p>
            </div>
            <Button
              onClick={() => navigate('/blogs')}
              variant="outline"
              icon={ArrowRight}
            >
              View All
            </Button>
          </div>

          {latestBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  onClick={() => navigate(`/blog/${blog.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No articles yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join our community and start publishing your ideas today.
          </p>
          <Button
            onClick={() => navigate('/signup')}
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100"
          >
            Get Started Free
          </Button>
        </div>
      </section>
    </Layout>
  );
};