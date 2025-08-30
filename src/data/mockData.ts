import { Blog, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@blog.com',
    username: 'admin',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '2',
    email: 'user@blog.com',
    username: 'john_doe',
    role: 'user',
    createdAt: '2024-01-02T00:00:00Z',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '3',
    email: 'sarah@blog.com',
    username: 'sarah_writer',
    role: 'user',
    createdAt: '2024-01-03T00:00:00Z',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

export const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2025',
    content: `# The Future of Web Development

Web development is evolving at an unprecedented pace. Here are the key trends shaping our industry:

## 1. AI-Powered Development Tools

AI assistants are revolutionizing how we write code, debug issues, and optimize performance. Tools like GitHub Copilot and ChatGPT are becoming essential parts of the developer toolkit.

## 2. WebAssembly (WASM) Adoption

WebAssembly is enabling near-native performance in web applications, opening up new possibilities for complex applications running directly in the browser.

## 3. Edge Computing

Moving computation closer to users through edge computing is reducing latency and improving user experience globally.

## Conclusion

The future of web development is bright, with AI, performance optimizations, and new paradigms leading the way.`,
    excerpt: 'Exploring the cutting-edge trends that will define web development in 2025, from AI-powered tools to edge computing.',
    author: mockUsers[1],
    status: 'approved',
    category: 'Technology',
    tags: ['Web Development', 'AI', 'WebAssembly', 'Edge Computing'],
    likes: 124,
    comments: 23,
    views: 1456,
    createdAt: '2024-12-15T10:00:00Z',
    updatedAt: '2024-12-15T10:00:00Z',
    publishedAt: '2024-12-15T12:00:00Z',
    featuredImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    title: 'Building Scalable React Applications: Best Practices',
    content: `# Building Scalable React Applications

Creating maintainable and scalable React applications requires following established patterns and best practices.

## Component Architecture

- Keep components small and focused
- Use composition over inheritance
- Implement proper prop validation

## State Management

Choose the right state management solution based on your application's complexity:

- **Local State**: useState and useReducer for component-level state
- **Context API**: For shared state across component trees
- **Redux/Zustand**: For complex global state management

## Performance Optimization

- Implement proper memoization with useMemo and useCallback
- Use React.lazy for code splitting
- Optimize bundle size with proper tree shaking`,
    excerpt: 'A comprehensive guide to building maintainable and scalable React applications using modern best practices.',
    author: mockUsers[2],
    status: 'approved',
    category: 'Programming',
    tags: ['React', 'JavaScript', 'Best Practices', 'Performance'],
    likes: 89,
    comments: 15,
    views: 987,
    createdAt: '2024-12-14T14:30:00Z',
    updatedAt: '2024-12-14T14:30:00Z',
    publishedAt: '2024-12-14T16:00:00Z',
    featuredImage: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    title: 'Understanding Modern CSS: Grid, Flexbox, and Beyond',
    content: `# Modern CSS Layout Techniques

CSS has evolved dramatically over the past few years. Let's explore the modern layout techniques that every developer should master.

## CSS Grid vs Flexbox

### When to Use Grid
- Two-dimensional layouts
- Complex page layouts
- When you need precise control over both rows and columns

### When to Use Flexbox
- One-dimensional layouts
- Component-level alignment
- Dynamic content sizing

## CSS Custom Properties

Custom properties (CSS variables) provide powerful theming capabilities:

\`\`\`css
:root {
  --primary-color: #6366f1;
  --secondary-color: #10b981;
}

.button {
  background-color: var(--primary-color);
}
\`\`\`

## Container Queries

The latest addition to CSS, container queries allow responsive design based on container size rather than viewport size.`,
    excerpt: 'Master modern CSS layout techniques including Grid, Flexbox, and the latest container queries for responsive design.',
    author: mockUsers[1],
    status: 'pending',
    category: 'Design',
    tags: ['CSS', 'Layout', 'Responsive Design', 'Grid', 'Flexbox'],
    likes: 45,
    comments: 8,
    views: 234,
    createdAt: '2024-12-13T09:15:00Z',
    updatedAt: '2024-12-13T09:15:00Z',
    featuredImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '4',
    title: 'Database Design Principles for Modern Applications',
    content: `# Database Design Principles

Proper database design is crucial for application performance and maintainability.

## Normalization vs Denormalization

### Normalization Benefits
- Reduces data redundancy
- Ensures data consistency
- Easier to maintain

### When to Denormalize
- Read-heavy applications
- Performance critical queries
- Analytics and reporting

## Indexing Strategies

Proper indexing can dramatically improve query performance:

- Primary keys are automatically indexed
- Create indexes on frequently queried columns
- Avoid over-indexing as it slows down writes

## ACID Properties

Understanding ACID properties is essential for reliable database operations:

- **Atomicity**: All or nothing transactions
- **Consistency**: Data integrity constraints
- **Isolation**: Concurrent transaction handling
- **Durability**: Permanent data storage`,
    excerpt: 'Essential database design principles every developer should understand for building robust and scalable applications.',
    author: mockUsers[2],
    status: 'approved',
    category: 'Database',
    tags: ['Database', 'SQL', 'Design Patterns', 'Performance'],
    likes: 67,
    comments: 12,
    views: 543,
    createdAt: '2024-12-12T16:45:00Z',
    updatedAt: '2024-12-12T16:45:00Z',
    publishedAt: '2024-12-12T18:00:00Z',
    featuredImage: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '5',
    title: 'Getting Started with TypeScript: A Beginner\'s Guide',
    content: `# TypeScript for Beginners

TypeScript adds static typing to JavaScript, making your code more reliable and easier to maintain.

## Why TypeScript?

- **Better Developer Experience**: IntelliSense and autocomplete
- **Early Error Detection**: Catch errors at compile time
- **Improved Code Documentation**: Types serve as documentation
- **Refactoring Safety**: Confident code changes

## Basic Types

\`\`\`typescript
// Primitive types
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// Objects
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};
\`\`\`

## Advanced Features

- Union types for flexible parameters
- Generic types for reusable components
- Utility types for type transformations`,
    excerpt: 'A comprehensive introduction to TypeScript for JavaScript developers looking to add type safety to their projects.',
    author: mockUsers[1],
    status: 'rejected',
    category: 'Programming',
    tags: ['TypeScript', 'JavaScript', 'Programming', 'Tutorial'],
    likes: 32,
    comments: 5,
    views: 178,
    createdAt: '2024-12-11T11:20:00Z',
    updatedAt: '2024-12-11T11:20:00Z',
    featuredImage: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];