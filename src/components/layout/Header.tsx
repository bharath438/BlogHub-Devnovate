import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PenTool, User, LogOut, Menu, X, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const NavLink: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ 
    to, 
    children, 
    onClick 
  }) => (
    <Link
      to={to}
      onClick={onClick}
      className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
    >
      {children}
    </Link>
  );

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <PenTool className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">BlogHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/blogs">Blogs</NavLink>
            <NavLink to="/trending">Trending</NavLink>
            
            {user ? (
              <>
                <NavLink to="/create">Write</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                {user.role === 'admin' && (
                  <NavLink to="/admin">Admin</NavLink>
                )}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-gray-400" />
                    )}
                    <span className="text-sm font-medium text-gray-700">{user.username}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    icon={LogOut}
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <NavLink to="/login">Login</NavLink>
                <Button
                  onClick={() => navigate('/signup')}
                  size="sm"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              icon={isMenuOpen ? X : Menu}
            >
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
              <NavLink to="/blogs" onClick={() => setIsMenuOpen(false)}>Blogs</NavLink>
              <NavLink to="/trending" onClick={() => setIsMenuOpen(false)}>Trending</NavLink>
              
              {user ? (
                <>
                  <NavLink to="/create" onClick={() => setIsMenuOpen(false)}>Write</NavLink>
                  <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
                  {user.role === 'admin' && (
                    <NavLink to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</NavLink>
                  )}
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center space-x-2 px-3 py-2">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-gray-400" />
                      )}
                      <span className="text-sm font-medium text-gray-700">{user.username}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-2 border-t border-gray-200 space-y-2">
                  <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
                  <NavLink to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</NavLink>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};