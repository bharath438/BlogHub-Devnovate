import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { BlogCard } from '../components/blog/BlogCard';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { useBlog } from '../context/BlogContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { blogs } = useBlog();
  const navigate = useNavigate();

  const userBlogs = blogs.filter(blog => blog.author.id === user?.id);
  const pendingBlogs = userBlogs.filter(blog => blog.status === 'pending');
  const approvedBlogs = userBlogs.filter(blog => blog.status === 'approved');
  const rejectedBlogs = userBlogs.filter(blog => blog.status === 'rejected');

  const stats = [
    {
      icon: FileText,
      label: 'Total Blogs',
      value: userBlogs.length,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      icon: Clock,
      label: 'Pending Review',
      value: pendingBlogs.length,
      color: 'text-amber-600 bg-amber-100',
    },
    {
      icon: CheckCircle,
      label: 'Published',
      value: approvedBlogs.length,
      color: 'text-emerald-600 bg-emerald-100',
    },
    {
      icon: XCircle,
      label: 'Rejected',
      value: rejectedBlogs.length,
      color: 'text-red-600 bg-red-100',
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
            <p className="text-gray-600">Manage your blogs and track their status</p>
          </div>
          <Button
            onClick={() => navigate('/create')}
            icon={Plus}
          >
            New Blog
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Blogs */}
        <div className="space-y-8">
          {pendingBlogs.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Review</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    onClick={() => navigate(`/blog/${blog.id}`)}
                    showStatus
                  />
                ))}
              </div>
            </div>
          )}

          {approvedBlogs.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Published Blogs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {approvedBlogs.slice(0, 6).map((blog) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    onClick={() => navigate(`/blog/${blog.id}`)}
                    showStatus
                  />
                ))}
              </div>
            </div>
          )}

          {rejectedBlogs.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Rejected Blogs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rejectedBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    onClick={() => navigate(`/blog/${blog.id}`)}
                    showStatus
                  />
                ))}
              </div>
            </div>
          )}

          {userBlogs.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs yet</h3>
              <p className="text-gray-600 mb-6">Start sharing your thoughts with the world!</p>
              <Button
                onClick={() => navigate('/create')}
                icon={Plus}
              >
                Create Your First Blog
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};