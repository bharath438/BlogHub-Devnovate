import React, { useState } from 'react';
import { CheckCircle, XCircle, Trash2, Users, FileText, TrendingUp } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { BlogFilters } from '../components/blog/BlogFilters';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import { BlogFilters as FilterType } from '../types';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const { blogs, filteredBlogs, filters, setFilters, updateBlogStatus, deleteBlog } = useBlog();
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'delete' | null>(null);

  if (user?.role !== 'admin') {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
            <p className="text-gray-600 mt-2">You don't have permission to access this page.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const pendingBlogs = blogs.filter(blog => blog.status === 'pending');
  const approvedBlogs = blogs.filter(blog => blog.status === 'approved');
  const rejectedBlogs = blogs.filter(blog => blog.status === 'rejected');

  const stats = [
    {
      icon: FileText,
      label: 'Total Blogs',
      value: blogs.length,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      icon: CheckCircle,
      label: 'Approved',
      value: approvedBlogs.length,
      color: 'text-emerald-600 bg-emerald-100',
    },
    {
      icon: XCircle,
      label: 'Pending Review',
      value: pendingBlogs.length,
      color: 'text-amber-600 bg-amber-100',
    },
    {
      icon: TrendingUp,
      label: 'Total Engagement',
      value: blogs.reduce((acc, blog) => acc + blog.likes + blog.comments, 0),
      color: 'text-purple-600 bg-purple-100',
    },
  ];

  const handleAction = async (blogId: string, action: 'approve' | 'reject' | 'delete') => {
    setSelectedBlog(null);
    setActionType(null);
    
    try {
      if (action === 'delete') {
        await deleteBlog(blogId);
      } else {
        await updateBlogStatus(blogId, action === 'approve' ? 'approved' : 'rejected');
      }
    } catch (error) {
      console.error('Action failed:', error);
    }
  };

  const handleFiltersChange = (newFilters: FilterType) => {
    setFilters(newFilters);
  };

  const selectedBlogData = selectedBlog ? blogs.find(b => b.id === selectedBlog) : null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage blog submissions and platform content</p>
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

        <BlogFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          showStatusFilter
        />

        {/* Blogs Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blog
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Engagement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {blog.featuredImage && (
                          <img
                            className="h-12 w-12 rounded-lg object-cover mr-4"
                            src={blog.featuredImage}
                            alt=""
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900 line-clamp-1">
                            {blog.title}
                          </div>
                          <div className="text-sm text-gray-500">{blog.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {blog.author.avatar && (
                          <img
                            className="h-8 w-8 rounded-full mr-3"
                            src={blog.author.avatar}
                            alt=""
                          />
                        )}
                        <div className="text-sm font-medium text-gray-900">
                          {blog.author.username}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        blog.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                        blog.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="space-y-1">
                        <div>{blog.likes} likes</div>
                        <div>{blog.comments} comments</div>
                        <div>{blog.views} views</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {blog.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => {
                              setSelectedBlog(blog.id);
                              setActionType('approve');
                            }}
                            icon={CheckCircle}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => {
                              setSelectedBlog(blog.id);
                              setActionType('reject');
                            }}
                            icon={XCircle}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => {
                          setSelectedBlog(blog.id);
                          setActionType('delete');
                        }}
                        icon={Trash2}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Confirmation Modal */}
        <Modal
          isOpen={!!selectedBlog && !!actionType}
          onClose={() => {
            setSelectedBlog(null);
            setActionType(null);
          }}
          title={`Confirm ${actionType}`}
        >
          {selectedBlogData && (
            <div>
              <p className="text-gray-600 mb-4">
                Are you sure you want to {actionType} the blog "{selectedBlogData.title}"?
                {actionType === 'delete' && ' This action cannot be undone.'}
              </p>
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedBlog(null);
                    setActionType(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant={actionType === 'delete' ? 'danger' : actionType === 'approve' ? 'success' : 'danger'}
                  onClick={() => selectedBlog && actionType && handleAction(selectedBlog, actionType)}
                >
                  {actionType === 'approve' ? 'Approve' : actionType === 'reject' ? 'Reject' : 'Delete'}
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};