import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { IMAGES } from '../contants';
import { useCart, useAuth } from '../App';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user } = useAuth();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen font-sans text-dark-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black text-white shadow-lg border-b border-gold-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src={IMAGES.logo} 
                alt="Zea Enterprises" 
                className="h-16 w-auto object-contain transition-transform group-hover:scale-105" 
              />
              <span className="hidden sm:block text-xl md:text-2xl font-serif font-bold text-gold-500 tracking-wider">ZEA ENTERPRISES</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
              <Link to="/shop" className="hover:text-gold-400 transition-colors">Shop</Link>
              <Link to="/contact" className="hover:text-gold-400 transition-colors">Contact</Link>
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/account" className="hover:text-gold-400 transition-colors flex items-center gap-2">
                <User className="w-6 h-6" />
                {user && <span className="text-sm font-medium text-gold-500">Hi, {user.name.split(' ')[0]}</span>}
              </Link>
              <Link to="/cart" className="relative hover:text-gold-400 transition-colors group">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gold-500 hover:text-white">
                {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-dark-900 border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-gold-400">Home</Link>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-gold-400">Shop</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-gold-400">Contact</Link>
              <Link to="/account" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-gold-400">My Account</Link>
              <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-gold-400 flex items-center">
                Cart <span className="ml-2 bg-gold-500 text-black text-xs px-2 py-0.5 rounded-full">{cartCount}</span>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark-950 text-gray-300 pt-12 pb-8 border-t-4 border-gold-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
               <img src={IMAGES.logo} alt="Zea Logo" className="h-12 w-auto" />
               <h3 className="text-xl font-serif font-bold text-white">Zea Enterprises</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted partner for premium electronics. Quality, reliability, and excellence in every product.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-gold-500 transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=Generators" className="hover:text-gold-500 transition-colors">Generators</Link></li>
              <li><Link to="/shop?category=Refrigerators" className="hover:text-gold-500 transition-colors">Refrigerators</Link></li>
              <li><Link to="/shop?category=Air Conditioners" className="hover:text-gold-500 transition-colors">Air Conditioners</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-gold-500 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-gold-500 transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-gold-500 transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-gold-500 transition-colors">Returns & Refunds</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <span>123 Industrial Estate, Electronics City, 54000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <span>support@zeaenterprises.com</span>
              </li>
              <li className="flex space-x-4 pt-2">
                <a href="#" className="text-gray-400 hover:text-gold-500"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-gold-500"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-gold-500"><Instagram className="w-5 h-5" /></a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Zea Enterprises. All rights reserved.
        </div>
      </footer>
    </div>
  );
};