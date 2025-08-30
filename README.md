 BlogSphere - Modern Blogging Platform

A secure and engaging blogging platform built with React, TypeScript, and Supabase featuring JWT authentication, admin approval workflows, and trending blog analytics.

## 🌟 Features

### 🔐 Authentication & User Management
- **Secure Authentication**: JWT-based login/signup with Supabase
- **Role-based Access**: User and Admin roles with different permissions
- **Social Login**: Google and GitHub OAuth integration
- **Protected Routes**: Secure access to user dashboards and admin panels

### 📝 Blog Management
- **Rich Editor**: Markdown-supported blog creation with live preview
- **Admin Approval**: Submitted blogs require admin approval before publishing
- **Status Tracking**: Pending, approved, and rejected blog states
- **User Dashboard**: Manage personal blogs and track submission status

### 📈 Trending & Analytics
- **Engagement Tracking**: Likes, comments, and view analytics
- **Trending Algorithm**: Blogs ranked by engagement metrics
- **Performance Insights**: Analytics dashboard for blog performance
- **Real-time Updates**: Live engagement metrics

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Automatic theme switching
- **Glass Morphism**: Modern card designs with backdrop blur
- **Smooth Animations**: Elegant transitions and micro-interactions
- **Accessibility**: WCAG compliant components

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Router** for navigation
- **Tanstack Query** for data fetching
- **Lucide React** for icons

### Backend (Supabase)
- **PostgreSQL** database
- **Row Level Security** (RLS) for data protection
- **Real-time subscriptions**
- **Authentication** with JWT
- **File storage** for images and assets

### Development Tools
- **Vite** for fast development
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for code formatting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd blogsphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Copy your project URL and API key
   - Set up the database schema (SQL scripts provided in `/supabase` folder)

4. **Configure environment variables**
   ```bash
   # Create .env.local file
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📊 Database Schema

### Users Table
```sql
- id (uuid, primary key)
- email (text, unique)
- full_name (text)
- avatar_url (text)
- role (enum: 'user', 'admin')
- created_at (timestamp)
- updated_at (timestamp)
```

### Blogs Table
```sql
- id (uuid, primary key)
- title (text)
- content (text)
- excerpt (text)
- author_id (uuid, foreign key)
- status (enum: 'pending', 'approved', 'rejected')
- featured (boolean)
- tags (text array)
- likes_count (integer)
- comments_count (integer)
- views_count (integer)
- published_at (timestamp)
- created_at (timestamp)
- updated_at (timestamp)
```

### Comments Table
```sql
- id (uuid, primary key)
- blog_id (uuid, foreign key)
- user_id (uuid, foreign key)
- content (text)
- created_at (timestamp)
```

### Likes Table
```sql
- id (uuid, primary key)
- blog_id (uuid, foreign key)
- user_id (uuid, foreign key)
- created_at (timestamp)
```

## 🔒 Security Features

- **Row Level Security (RLS)** policies for all tables
- **JWT authentication** with secure token handling
- **Input validation** and sanitization
- **XSS protection** with proper content encoding
- **CSRF protection** with SameSite cookies

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📋 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥 Large screens (1440px+)

## 🎯 Performance Optimizations

- **Code splitting** with React.lazy()
- **Image optimization** with proper sizing and formats
- **Bundle optimization** with Vite
- **Caching strategies** with Tanstack Query
- **SEO optimization** with proper meta tags

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Supabase](https://supabase.com/) for the amazing backend-as-a-service
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the clean icon set
