import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Image } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { MarkdownEditor } from '../components/blog/MarkdownEditor';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useBlog } from '../context/BlogContext';

export const CreateBlogPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { user } = useAuth();
  const { createBlog } = useBlog();
  const navigate = useNavigate();

  const categories = ['Technology', 'Programming', 'Design', 'Database', 'Tutorial'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    try {
      await createBlog({
        title,
        excerpt,
        content,
        category,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        author: user,
        featuredImage: featuredImage || undefined,
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create blog:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Blog</h1>
          <p className="text-gray-600">Share your thoughts and expertise with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <Input
              label="Blog Title"
              value={title}
              onChange={setTitle}
              placeholder="Enter an engaging title for your blog"
              required
            />

            <Input
              label="Excerpt"
              value={excerpt}
              onChange={setExcerpt}
              placeholder="Brief description that appears in blog cards"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <Input
                label="Tags (comma-separated)"
                value={tags}
                onChange={setTags}
                placeholder="react, javascript, tutorial"
              />
            </div>

            <Input
              label="Featured Image URL (optional)"
              value={featuredImage}
              onChange={setFeaturedImage}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <MarkdownEditor
              value={content}
              onChange={setContent}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !title || !excerpt || !content || !category}
              icon={Send}
            >
              {isLoading ? 'Publishing...' : 'Submit for Review'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};