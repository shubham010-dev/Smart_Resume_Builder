import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../ui/button';
import { FileText, Plus, LogOut, Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-white/80 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/80">
      <div className="container mx-auto px-4 flex h-16 items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              SmartResume
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-end space-x-4">
          {isLoggedIn ? (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className="hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20"
              >
                <Link to="/dashboard" className="flex items-center font-medium">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                asChild
                className="border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-700 hover:text-blue-800"
              >
                <Link to="/create-resume" className="flex items-center font-medium">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Resume
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="hover:bg-red-50 hover:text-red-700 text-gray-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className="hover:bg-gray-50 font-medium"
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button 
                size="sm" 
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Link to="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {isLoggedIn ? (
              <>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start hover:bg-blue-50 hover:text-blue-700" 
                  asChild
                >
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <User className="mr-3 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start hover:bg-blue-50 hover:text-blue-700" 
                  asChild
                >
                  <Link to="/create-resume" onClick={() => setIsMenuOpen(false)}>
                    <Plus className="mr-3 h-4 w-4" />
                    Create Resume
                  </Link>
                </Button>
                <div className="border-t pt-3">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start hover:bg-red-50 hover:text-red-700 text-gray-600" 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start hover:bg-gray-50" 
                  asChild
                >
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg" 
                  asChild
                >
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}