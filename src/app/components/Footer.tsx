import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const footerLinks = {
    Shop: [
      { name: 'Retro Jerseys', path: '/shop?category=retro' },
      { name: 'Club Jerseys', path: '/shop?category=club' },
      { name: 'International', path: '/shop?category=international' },
      { name: 'Limited Edition', path: '/shop?limited=true' },
    ],
    Support: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'About Us', path: '/about' },
      { name: 'Shipping Info', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
    ],
    Legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
    ],
  };

  return (
    <footer className="relative bg-[#0a0a0f] border-t border-white/10">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3
            className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] bg-clip-text text-transparent"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Join The RetroKick Club
          </h3>
          <p className="text-white/70 mb-8">
            Get exclusive access to limited editions and early releases
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 bg-[#1a1a2e] border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#00ff9d] transition-colors"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#00ff9d]/50 transition-shadow"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              SUBSCRIBE
            </motion.button>
          </form>
        </motion.div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-3xl font-black bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] bg-clip-text text-transparent"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                RETROKICK
              </motion.div>
            </Link>
            <p className="text-white/50 text-sm mb-6">
              Celebrating football heritage through authentic jerseys and iconic kits.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-white/10 hover:bg-[#00ff9d]/20 border border-white/10 hover:border-[#00ff9d] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white/70 hover:text-[#00ff9d]" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className="text-white text-lg mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white/50 hover:text-[#00ff9d] transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/30 text-sm">
              © 2026 RetroKick. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
                className="h-6 opacity-30 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
                className="h-6 opacity-30 hover:opacity-100 transition-opacity"
              />
              <span className="text-white/30 text-sm">UPI</span>
              <span className="text-white/30 text-sm">COD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00ff9d] rounded-full blur-3xl opacity-5"
          style={{ transform: 'translate(-50%, 50%)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00d9ff] rounded-full blur-3xl opacity-5"
          style={{ transform: 'translate(50%, 50%)' }}
        />
      </div>
    </footer>
  );
}
