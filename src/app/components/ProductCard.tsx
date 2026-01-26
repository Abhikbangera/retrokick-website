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
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const stockPercent = (product.stock / 50) * 100;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem(product, 1, product.sizes[0]);
    setTimeout(() => setIsAdding(false), 1000);
  };

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

            {/* Limited Edition Badge */}
            {product.limitedEdition && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-4 left-4 px-3 py-1 bg-[#ff0055] text-white text-xs font-bold rounded-full uppercase tracking-wider"
                style={{
                  boxShadow: '0 4px 12px rgba(255, 0, 85, 0.4)',
                }}
              >
                Limited Edition
              </motion.div>
            )}

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

            {/* Stock Progress */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-white/50">Stock Status</span>
                <span className="text-xs text-[#00ff9d]">{product.stock} left</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stockPercent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-[#ff0055] via-[#ffd600] to-[#00ff9d] rounded-full"
                  style={{
                    boxShadow: stockPercent < 30 ? '0 0 10px rgba(255, 0, 85, 0.6)' : '0 0 10px rgba(0, 255, 157, 0.6)',
                  }}
                />
              </div>
            </div>

            {/* Price and Cart */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-black text-[#00ff9d]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-white/50 ml-1">INR</span>
              </div>

              <motion.button
                onClick={handleAddToCart}
                disabled={isAdding}
                whileHover={{ scale: isAdding ? 1 : 1.05 }}
                whileTap={{ scale: isAdding ? 1 : 0.95 }}
                className={`group/btn px-4 py-2 bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] text-black font-bold rounded-lg flex items-center space-x-2 hover:shadow-lg hover:shadow-[#00ff9d]/50 transition-shadow ${
                  isAdding ? 'from-[#00d9ff] to-[#00ff9d]' : ''
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm">{isAdding ? 'ADDED!' : 'ADD'}</span>
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
