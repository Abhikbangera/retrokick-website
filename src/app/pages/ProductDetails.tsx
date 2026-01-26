import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { products } from '@/app/data/products';
import { ShoppingCart, Heart, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import { useState, useRef } from 'react';

export function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [hoverPosition, setHoverPosition] = useState<'left' | 'right' | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !product.backImage) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    if (x < width / 2) {
      setHoverPosition('left');
    } else {
      setHoverPosition('right');
    }
  };

  const handleMouseLeave = () => {
    setHoverPosition(null);
  };

  const showBackImage = hoverPosition === 'right' && product.backImage;
  const showFrontImage = hoverPosition === 'left' || !product.backImage;

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
            <div 
              ref={imageRef}
              className="relative rounded-2xl overflow-hidden aspect-square bg-[#0d1b3a]"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Front Image */}
              {product.image && (
                <motion.img
                  src={product.image}
                  alt={`${product.name} - Front`}
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{ opacity: showBackImage ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              
              {/* Back Image */}
              {product.backImage && (
                <motion.img
                  src={product.backImage}
                  alt={`${product.name} - Back`}
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{ opacity: showBackImage ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              {/* Hover Indicator */}
              {product.backImage && (
                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-sm text-white/60 pointer-events-none">
                  <span className={`flex items-center ${hoverPosition === 'left' ? 'text-[#00ff9d]' : ''}`}>
                    <span className="mr-2">←</span> Front
                  </span>
                  <span className={`flex items-center ${hoverPosition === 'right' ? 'text-[#00ff9d]' : ''}`}>
                    Back <span className="ml-2">→</span>
                  </span>
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

            {/* Description */}
            <p className="text-white/70 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div>
              <label className="block text-white mb-3 font-bold uppercase tracking-wider text-sm">
                Select Size
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes && product.sizes.map((size) => (
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

