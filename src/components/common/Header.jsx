import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 shadow-lg backdrop-blur-md' 
          : 'bg-white/95 shadow-md backdrop-blur-sm'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group hover:scale-105 transition-transform duration-300"
          >
            <span className="text-4xl animate-bounce">🐾</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pet Tashkent
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`relative px-4 py-2 font-medium transition-all duration-300 hover:text-purple-600 ${
                isActive('/') 
                  ? 'text-purple-600' 
                  : 'text-gray-700'
              } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-purple-600 after:to-pink-600 after:transition-all after:duration-300 ${
                isActive('/') ? 'after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              Home
            </Link>
            
            <Link 
              to="/about" 
              className={`relative px-4 py-2 font-medium transition-all duration-300 hover:text-purple-600 ${
                isActive('/about') 
                  ? 'text-purple-600' 
                  : 'text-gray-700'
              } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-purple-600 after:to-pink-600 after:transition-all after:duration-300 ${
                isActive('/about') ? 'after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              About
            </Link>
            
            <Link 
              to="/adopt" 
              className={`relative px-4 py-2 font-medium transition-all duration-300 hover:text-purple-600 ${
                isActive('/adopt') 
                  ? 'text-purple-600' 
                  : 'text-gray-700'
              } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-purple-600 after:to-pink-600 after:transition-all after:duration-300 ${
                isActive('/adopt') ? 'after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              Adopt
            </Link>
            
            <Link 
              to="/clinics" 
              className={`relative px-4 py-2 font-medium transition-all duration-300 hover:text-purple-600 ${
                isActive('/clinics') 
                  ? 'text-purple-600' 
                  : 'text-gray-700'
              } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-purple-600 after:to-pink-600 after:transition-all after:duration-300 ${
                isActive('/clinics') ? 'after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              Clinics
            </Link>
            
            <Link 
              to="/donate" 
              className={`relative px-4 py-2 font-medium transition-all duration-300 hover:text-purple-600 ${
                isActive('/donate') 
                  ? 'text-purple-600' 
                  : 'text-gray-700'
              } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-purple-600 after:to-pink-600 after:transition-all after:duration-300 ${
                isActive('/donate') ? 'after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              Donate
            </Link>

            {/* Donate Now Button */}
            <Link 
              to="/donate-now" 
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:from-purple-700 hover:to-pink-700"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
          >
            <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-2 pt-4">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            
            <Link 
              to="/about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                isActive('/about') 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              About
            </Link>
            
            <Link 
              to="/adopt" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                isActive('/adopt') 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Adopt
            </Link>
            
            <Link 
              to="/clinics" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                isActive('/clinics') 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Clinics
            </Link>
            
            <Link 
              to="/donate" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                isActive('/donate') 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Donate
            </Link>

            <Link 
              to="/donate-now" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 mt-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
