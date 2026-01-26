import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function Contact() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1
            className="text-6xl md:text-8xl mb-6 bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] bg-clip-text text-transparent"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            GET IN TOUCH
          </h1>
          <p className="text-xl text-white/70">
            We'd love to hear from you. Let's talk football!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2
                className="text-3xl mb-6 text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                CONTACT INFORMATION
              </h2>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email', value: 'support@retrokick.in' },
                  { icon: Phone, label: 'Phone', value: '+91 9876543210' },
                  { icon: MapPin, label: 'Address', value: 'Mumbai, Maharashtra, India' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-[#00ff9d]/10">
                      <item.icon className="w-6 h-6 text-[#00ff9d]" />
                    </div>
                    <div>
                      <p className="text-white/50 text-sm mb-1">{item.label}</p>
                      <p className="text-white text-lg">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <form className="space-y-6">
              <div>
                <label className="block text-white mb-2 font-bold text-sm uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-4 bg-[#1a1a2e] border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#00ff9d] transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-bold text-sm uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-4 bg-[#1a1a2e] border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#00ff9d] transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-bold text-sm uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-4 bg-[#1a1a2e] border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#00ff9d] transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] text-black font-bold rounded-lg flex items-center justify-center space-x-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span>SEND MESSAGE</span>
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
