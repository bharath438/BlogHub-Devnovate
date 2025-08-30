import React, { useState } from 'react';
import { Eye, Edit } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your blog content in Markdown...',
}) => {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-gray-50 px-4 py-2 border-b border-gray-300">
        <h3 className="text-sm font-medium text-gray-700">Content</h3>
        <div className="flex space-x-2">
          <Button
            variant={!isPreview ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setIsPreview(false)}
            icon={Edit}
          >
            Edit
          </Button>
          <Button
            variant={isPreview ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setIsPreview(true)}
            icon={Eye}
          >
            Preview
          </Button>
        </div>
      </div>

      <div className="h-96">
        {isPreview ? (
          <div className="p-4 h-full overflow-y-auto prose prose-gray max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {value || 'Nothing to preview yet...'}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full p-4 border-none focus:outline-none resize-none"
          />
        )}
      </div>
    </div>
  );
};