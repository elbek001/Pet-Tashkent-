import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🐾</span>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Pet Tashkent
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Connecting loving homes with animals in need.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              SERVICES
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/adopt" 
                  className="text-gray-600 text-sm hover:text-purple-600 transition-colors duration-300"
                >
                  Adoption
                </Link>
              </li>
              <li>
                <Link 
                  to="/clinics" 
                  className="text-gray-600 text-sm hover:text-purple-600 transition-colors duration-300"
                >
                  Vet Clinics
                </Link>
              </li>
              <li>
                <Link 
                  to="/fostering" 
                  className="text-gray-600 text-sm hover:text-purple-600 transition-colors duration-300"
                >
                  Fostering
                </Link>
              </li>
              <li>
                <Link 
                  to="/donate" 
                  className="text-gray-600 text-sm hover:text-purple-600 transition-colors duration-300"
                >
                  Donations
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              ABOUT
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-600 text-sm hover:text-purple-600 transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-600 text-sm hover:text-purple-600 transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-gray-600 text-sm hover:text-purple-600 transition-colors duration-300"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              LEGAL
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-600 text-sm hover:text-purple-600 transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-600 text-sm hover:text-purple-600 transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              CONTACT
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>123 Pet Street, Tashkent</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a 
                  href="tel:+998712345267" 
                  className="hover:text-purple-600 transition-colors duration-300"
                >
                  +998 71 234 52 67
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a 
                  href="mailto:info@pettashkent.uz" 
                  className="hover:text-purple-600 transition-colors duration-300"
                >
                  info@pettashkent.uz
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Pet Tashkent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;