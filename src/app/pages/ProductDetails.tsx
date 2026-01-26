import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { products } from '@/app/data/products';
import { ShoppingCart, Heart, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl text-white mb-4">Product not found</h2>
          <Link to="/shop" className="text-[#00ff9d] hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const stockPercent = (product.stock / 50) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link to="/shop">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center space-x-2 text-white/70 hover:text-[#00ff9d] mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Shop</span>
          </motion.button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#0d1b3a]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.limitedEdition && (
                <div className="absolute top-6 left-6 px-4 py-2 bg-[#ff0055] text-white font-bold rounded-full uppercase tracking-wider text-sm">
                  Limited Edition
                </div>
              )}
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Category & Year */}
            <div className="flex items-center space-x-4">
              <span className="px-4 py-1 bg-[#00d9ff]/20 text-[#00d9ff] rounded-full text-sm uppercase tracking-wider">
                {product.category}
              </span>
              {product.year && (
                <span className="text-white/50 text-sm">{product.year}</span>
              )}
            </div>

            {/* Title */}
            <div>
              <h1
                className="text-5xl md:text-6xl mb-2 text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {product.name}
              </h1>
              <p className="text-xl text-white/70">{product.team}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#ffd600] text-[#ffd600]" />
              ))}
              <span className="text-white/70 ml-2">(124 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-black text-[#00ff9d]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-white/50">INR</span>
            </div>

            {/* Stock Progress */}
            <div className="p-6 rounded-xl bg-[#1a1a2e] border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-white/70">Availability</span>
                <span className="text-[#00ff9d] font-bold">
                  {product.stock} in stock
                </span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stockPercent}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-[#ff0055] via-[#ffd600] to-[#00ff9d] rounded-full"
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-white/70 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div>
              <label className="block text-white mb-3 font-bold uppercase tracking-wider text-sm">
                Select Size
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`w-16 h-16 rounded-lg font-bold transition-all ${
                      selectedSize === size
                        ? 'bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] text-black'
                        : 'bg-[#1a1a2e] border border-white/10 text-white hover:border-[#00ff9d]'
                    }`}
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-4 bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] text-black font-bold rounded-lg flex items-center justify-center space-x-2 hover:shadow-xl hover:shadow-[#00ff9d]/50 transition-shadow"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>ADD TO CART</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-[#1a1a2e] border border-white/10 rounded-lg hover:border-[#00ff9d] transition-colors"
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-[#1a1a2e]/50 border border-white/10">
                <Truck className="w-6 h-6 text-[#00ff9d]" />
                <div>
                  <p className="text-white font-bold text-sm">Free Shipping</p>
                  <p className="text-white/50 text-xs">On orders above ₹5,000</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-[#1a1a2e]/50 border border-white/10">
                <Shield className="w-6 h-6 text-[#00d9ff]" />
                <div>
                  <p className="text-white font-bold text-sm">Authentic</p>
                  <p className="text-white/50 text-xs">100% Original</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
