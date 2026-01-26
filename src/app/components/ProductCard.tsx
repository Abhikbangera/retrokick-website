import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '@/app/data/products';
import { useState } from 'react';
import { useCart } from '@/app/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <Link to={`/product/${product.id}`}>
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative rounded-2xl overflow-hidden bg-[#1a1a2e] border border-white/10"
          style={{
            boxShadow: isHovered
              ? '0 20px 60px rgba(0, 255, 157, 0.2), 0 0 40px rgba(0, 217, 255, 0.1)'
              : '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-[#0d1b3a]">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 right-4 flex space-x-2"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-[#00ff9d] transition-colors"
                aria-label="Add to Wishlist"
              >
                <Heart className="w-5 h-5 text-white" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-[#00d9ff] transition-colors"
                aria-label="Quick View"
              >
                <Eye className="w-5 h-5 text-white" />
              </motion.button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <p className="text-[#00d9ff] text-xs uppercase tracking-wider mb-1">
                  {product.category} {product.year && `• ${product.year}`}
                </p>
                <h3 className="text-white text-lg font-bold mb-1 group-hover:text-[#00ff9d] transition-colors">
                  {product.name}
                </h3>
                <p className="text-white/50 text-sm">{product.team}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/60 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            {/* Price and Cart */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-black text-[#00ff9d]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group/btn px-4 py-2 bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] text-black font-bold rounded-lg flex items-center space-x-2 hover:shadow-lg hover:shadow-[#00ff9d]/50 transition-shadow"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm">ADD</span>
              </motion.button>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(0, 255, 157, 0.1) 0%, transparent 70%)',
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}

