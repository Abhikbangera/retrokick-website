import { motion } from 'motion/react';
import { Trophy, Users, Globe, Heart } from 'lucide-react';

export function About() {
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
            ABOUT RETROKICK
          </h1>
          <p className="text-xl text-white/70">
            Celebrating Football Heritage Through Authentic Jerseys
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none mb-16"
        >
          <div className="text-white/80 space-y-6 text-lg leading-relaxed">
            <p>
              RetroKick was born from a passion for football's rich history and the
              iconic jerseys that defined legendary moments. We believe every jersey
              tells a story – from Pelé's 1970 World Cup victory to the Invincibles'
              unbeaten season.
            </p>
            <p>
              Our mission is to bring these stories to life by providing authentic,
              high-quality replica jerseys that let fans wear their love for the
              beautiful game. Whether it's a vintage classic or a modern masterpiece,
              each piece in our collection is carefully curated to capture the essence
              of football history.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: Trophy,
              title: 'Authentic Quality',
              description: 'Every jersey is crafted with attention to detail and authentic materials.',
            },
            {
              icon: Users,
              title: '10K+ Happy Fans',
              description: 'Join thousands of satisfied customers celebrating football heritage.',
            },
            {
              icon: Globe,
              title: 'Global Collection',
              description: 'Jerseys from 50+ countries and the greatest clubs in history.',
            },
            {
              icon: Heart,
              title: 'Passion Driven',
              description: 'Built by football fans, for football fans. We live and breathe the game.',
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="p-8 rounded-2xl bg-[#1a1a2e] border border-white/10"
            >
              <item.icon className="w-12 h-12 text-[#00ff9d] mb-4" />
              <h3 className="text-2xl text-white mb-3 font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {item.title}
              </h3>
              <p className="text-white/70">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
