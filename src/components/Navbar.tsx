import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, CreditCard, User, BarChart3, TrendingUp, Shield, DollarSign, Moon, Sun, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  if (!user) return null;

  return (
    <nav className={`shadow-sm border-b transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pr-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <CreditCard className="h-8 w-8 text-emerald-600" />
            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              PayLink
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/dashboard" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/dashboard') 
                  ? theme === 'dark'
                    ? 'text-emerald-400 bg-emerald-900/30'
                    : 'text-emerald-600 bg-emerald-50'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:text-emerald-400'
                    : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            
            <Link 
              to="/trading" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/trading') 
                  ? theme === 'dark'
                    ? 'text-blue-400 bg-blue-900/30'
                    : 'text-blue-600 bg-blue-50'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>Trading</span>
            </Link>

            <Link 
              to="/blockchain" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/blockchain') 
                  ? theme === 'dark'
                    ? 'text-purple-400 bg-purple-900/30'
                    : 'text-purple-600 bg-purple-50'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:text-purple-400'
                    : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              <Shield className="h-4 w-4" />
              <span>Blockchain</span>
            </Link>

            <Link 
              to="/pricing" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/pricing') 
                  ? theme === 'dark'
                    ? 'text-orange-400 bg-orange-900/30'
                    : 'text-orange-600 bg-orange-50'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:text-orange-400'
                    : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              <DollarSign className="h-4 w-4" />
              <span>Pricing</span>
            </Link>

            {user.email === 'admin@paylink.com' && (
              <Link 
                to="/admin" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/admin') 
                    ? theme === 'dark'
                      ? 'text-red-400 bg-red-900/30'
                      : 'text-red-600 bg-red-50'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:text-red-400'
                      : 'text-gray-700 hover:text-red-600'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
            
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <Link
                to="/profile"
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isActive('/profile')
                    ? theme === 'dark'
                      ? 'bg-emerald-900/30 text-emerald-400'
                      : 'bg-emerald-50 text-emerald-600'
                    : theme === 'dark' 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Settings className="h-4 w-4" />
              </Link>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {user.name}
              </div>
              <button
                onClick={logout}
                className={`flex items-center space-x-2 transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-red-400' 
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-t transition-colors duration-300 ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive('/dashboard') 
                    ? theme === 'dark'
                      ? 'text-emerald-400 bg-emerald-900/30'
                      : 'text-emerald-600 bg-emerald-50'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:text-emerald-400'
                      : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              
              <Link 
                to="/trading" 
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive('/trading') 
                    ? theme === 'dark'
                      ? 'text-blue-400 bg-blue-900/30'
                      : 'text-blue-600 bg-blue-50'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:text-blue-400'
                      : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <TrendingUp className="h-5 w-5" />
                <span>Trading</span>
              </Link>

              <Link 
                to="/blockchain" 
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive('/blockchain') 
                    ? theme === 'dark'
                      ? 'text-purple-400 bg-purple-900/30'
                      : 'text-purple-600 bg-purple-50'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:text-purple-400'
                      : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                <Shield className="h-5 w-5" />
                <span>Blockchain</span>
              </Link>

              <Link 
                to="/pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive('/pricing') 
                    ? theme === 'dark'
                      ? 'text-orange-400 bg-orange-900/30'
                      : 'text-orange-600 bg-orange-50'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:text-orange-400'
                      : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                <DollarSign className="h-5 w-5" />
                <span>Pricing</span>
              </Link>

              {user.email === 'admin@paylink.com' && (
                <Link 
                  to="/admin" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive('/admin') 
                      ? theme === 'dark'
                        ? 'text-red-400 bg-red-900/30'
                        : 'text-red-600 bg-red-50'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:text-red-400'
                        : 'text-gray-700 hover:text-red-600'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>Admin</span>
                </Link>
              )}
              
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive('/profile')
                    ? theme === 'dark'
                      ? 'bg-emerald-900/30 text-emerald-400'
                      : 'bg-emerald-50 text-emerald-600'
                    : theme === 'dark' 
                      ? 'text-gray-300 hover:text-emerald-400' 
                      : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>Profile</span>
              </Link>

              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-red-400' 
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;