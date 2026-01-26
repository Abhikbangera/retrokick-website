import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Since we can't embed actual video, we'll use a high-quality stadium image with parallax effect */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1549923015-badf41b04831?w=1920"
            alt="Football Stadium"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        {/* Neon Glow Effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(0, 255, 157, 0.15) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-[#00ff9d]/30 mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#00ff9d]" />
          <span className="text-sm text-white/90 uppercase tracking-wider">
            Limited Edition Collection
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-8xl lg:text-9xl mb-6 leading-none"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          <span className="block bg-gradient-to-r from-white via-[#00ff9d] to-[#00d9ff] bg-clip-text text-transparent">
            WEAR THE
          </span>
          <span className="block text-white mt-2">LEGACY OF</span>
          <span
            className="block bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] bg-clip-text text-transparent mt-2"
            style={{
              textShadow: '0 0 60px rgba(0, 255, 157, 0.5)',
            }}
          >
            FOOTBALL
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto"
        >
          Authentic retro jerseys, iconic club kits, and legendary international
          uniforms. Celebrate football history with every thread.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] text-black font-bold rounded-lg overflow-hidden"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center space-x-2 text-lg tracking-wider">
                <span>SHOP NOW</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </Link>

          <Link to="/shop?category=retro">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-lg backdrop-blur-sm hover:border-[#00ff9d] hover:bg-[#00ff9d]/10 transition-all text-lg tracking-wider"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              EXPLORE RETRO COLLECTION
            </motion.button>
          </Link>
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { label: 'Jerseys', value: '500+' },
            { label: 'Countries', value: '50+' },
            { label: 'Satisfied Customers', value: '10K+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="text-center"
            >
              <div
                className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] bg-clip-text text-transparent mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-white/60 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-[#00ff9d] rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
