import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 pointer-events-none"
    >
      <div
        className="max-w-7xl mx-auto rounded-2xl backdrop-blur-xl bg-black/40 border border-white/10 shadow-2xl pointer-events-auto"
        style={{
          boxShadow: '0 8px 32px 0 rgba(0, 255, 157, 0.1)',
        }}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                className="text-3xl font-black bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                RETROKICK
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group"
                >
                  <span
                    className={`text-sm uppercase tracking-wider transition-colors ${
                      isActive(link.path)
                        ? 'text-[#00ff9d]'
                        : 'text-white/80 hover:text-[#00ff9d]'
                    }`}
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {link.name}
                  </span>
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00ff9d] to-[#00d9ff]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-white/10 transition-colors hidden md:block"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-white/80" />
              </motion.button>

              {isAuthenticated ? (
                // User profile when logged in
                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center space-x-2"
                    aria-label="User Profile"
                  >
                    <User className="w-5 h-5 text-[#00ff9d]" />
                    <span className="text-white/80 text-sm hidden md:block">{user?.name}</span>
                  </motion.button>
                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-[#1a1a2e] border border-white/10 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-white font-bold text-sm">{user?.name}</p>
                      <p className="text-white/50 text-xs">{user?.email}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 text-left text-white/70 hover:text-[#00ff9d] hover:bg-white/5 transition-colors flex items-center space-x-2 text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] text-black font-bold rounded-lg text-sm hidden md:flex items-center space-x-2"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    <User className="w-4 h-4" />
                    <span>LOGIN</span>
                  </motion.button>
                </Link>
              )}

              <Link to="/cart">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="w-5 h-5 text-white/80" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff0055] text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </motion.button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 rounded-2xl backdrop-blur-xl bg-black/40 border border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-lg uppercase tracking-wider transition-colors ${
                    isActive(link.path)
                      ? 'text-[#00ff9d]'
                      : 'text-white/80 hover:text-[#00ff9d]'
                  }`}
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {link.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg uppercase tracking-wider text-white/80 hover:text-[#00ff9d] transition-colors"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
