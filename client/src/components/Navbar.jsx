import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link2, LayoutDashboard, LogOut, UserPlus, LogIn } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-500">
          <Link2 className="w-8 h-8" />
          <span>Shorty</span>
        </Link>

        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link
                to="/"
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-700/50"
              >
                <Link2 className="w-5 h-5" />
                <span>Generate</span>
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-700/50"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>My Links</span>
              </Link>
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-700 ml-2">
                <span className="text-sm text-gray-400 hidden sm:inline">Hi, {user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-blue-600/20"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
