import { motion } from 'motion/react';
import { Hero } from '@/app/components/Hero';
import { ProductCard } from '@/app/components/ProductCard';
import { products, categories, testimonials } from '@/app/data/products';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Shield, Truck } from 'lucide-react';

export function Home() {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20">
      <Hero />

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Authentic Jerseys',
                description: '100% original designs from official archives',
              },
              {
                icon: Truck,
                title: 'Free Shipping',
                description: 'On orders above ₹5,000 across India',
              },
              {
                icon: TrendingUp,
                title: 'Limited Editions',
                description: 'Exclusive drops you won\'t find anywhere else',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-[#1a1a2e]/50 to-[#0d1b3a]/30 border border-white/10 backdrop-blur-sm"
              >
                <feature.icon className="w-12 h-12 text-[#00ff9d] mb-4" />
                <h3
                  className="text-xl mb-2 text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-5xl md:text-7xl mb-4 bg-gradient-to-r from-white to-[#00ff9d] bg-clip-text text-transparent"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              EXPLORE COLLECTIONS
            </h2>
            <p className="text-white/70 text-lg">
              From legendary eras to modern masterpieces
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link to={`/shop?category=${category.id}`} key={category.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00ff9d]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3
                      className="text-3xl mb-2 text-white group-hover:text-[#00ff9d] transition-colors"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {category.name}
                    </h3>
                    <p className="text-white/70 text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center space-x-2 text-[#00ff9d]">
                      <span className="text-sm font-bold">{category.count} Products</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent to-[#0d1b3a]/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-5xl md:text-7xl mb-4 bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] bg-clip-text text-transparent"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              BESTSELLERS
            </h2>
            <p className="text-white/70 text-lg">
              Most coveted jerseys in our collection
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] text-black font-bold rounded-lg inline-flex items-center space-x-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span>VIEW ALL PRODUCTS</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-5xl md:text-7xl mb-4 text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              WHAT FANS SAY
            </h2>
            <p className="text-white/70 text-lg">
              Join thousands of satisfied customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-[#1a1a2e]/50 border border-white/10 backdrop-blur-sm"
              >
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#ffd600] text-[#ffd600]"
                    />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-white/50 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
