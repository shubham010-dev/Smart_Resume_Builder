import { Link } from 'react-router-dom';
import { FileText, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-white/95 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-white/80 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/80">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                SmartResume
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md leading-relaxed">
              Create professional resumes with our smart builder. Get AI-powered suggestions and export to multiple formats. Built by Shubham Singh Bora.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/shubham010-dev" 
                className="text-gray-500 hover:text-gray-800 transition-all duration-200 hover:scale-110 target:_blank"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/shubham-singh-bora-49a5b4312/" 
                className="text-gray-500 hover:text-blue-700 transition-all duration-200 hover:scale-110 target:_blank"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:shubhambora814@gmail.com" 
                className="text-gray-500 hover:text-red-500 transition-all duration-200 hover:scale-110 target:_blank"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200 hover:font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/create-resume" 
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200 hover:font-medium"
                >
                  Create Resume
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200 hover:font-medium"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200 hover:font-medium"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                &copy; 2025 SmartResume. All rights reserved.
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Created by <span className="font-semibold text-gray-700 dark:text-gray-200">Shubham Singh Bora</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}