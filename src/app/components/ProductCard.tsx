import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '@/app/data/products';
import { useState, useRef } from 'react';
import { useCart } from '@/app/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [hoverPosition, setHoverPosition] = useState<'left' | 'right' | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const imageRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Adding to cart:', product.name, 'Size:', selectedSize);
    addItem(product, 1, selectedSize);
    console.log('Added to cart successfully');
    alert(`${product.name} (Size: ${selectedSize}) added to cart!\nPrice: ₹${product.price.toLocaleString('en-IN')}`);
  };

  const showBackImage = hoverPosition === 'right' && product.backImage;
  const showFrontImage = hoverPosition === 'left' || !product.backImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative rounded-2xl overflow-hidden bg-[#1a1a2e] border border-white/10"
        style={{
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Image Container with Front/Back Hover Effect */}
        <Link to={`/product/${product.id}`}>
          <div
            ref={imageRef}
            className="relative aspect-square overflow-hidden bg-[#0d1b3a]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Front Image */}
            {product.image && (
              <motion.img
                src={product.image}
                alt={`${product.name} - Front`}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ opacity: showBackImage ? 0 : 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}

            {/* Back Image */}
            {product.backImage && (
              <motion.img
                src={product.backImage}
                alt={`${product.name} - Back`}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ opacity: showBackImage ? 1 : 0, scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}

            {/* Hover Indicator */}
            {product.backImage && (
              <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs text-white/50 pointer-events-none">
                <span className={hoverPosition === 'left' ? 'text-[#00ff9d]' : ''}>← Front</span>
                <span className={hoverPosition === 'right' ? 'text-[#00ff9d]' : ''}>Back →</span>
              </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 right-4 flex space-x-2"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-[#00ff9d] transition-colors"
                aria-label="Add to Wishlist"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Heart className="w-5 h-5 text-white" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-[#00d9ff] transition-colors"
                aria-label="Quick View"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Eye className="w-5 h-5 text-white" />
              </motion.button>
            </motion.div>
          </div>
        </Link>

        {/* Product Info */}
        <div className="p-6">
          <Link to={`/product/${product.id}`}>
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
          </Link>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-4">
              <p className="text-white/50 text-xs mb-2">Select Size:</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSize(size);
                    }}
                    className={`w-8 h-8 text-sm font-bold rounded-lg transition-all ${
                      selectedSize === size
                        ? 'bg-[#00ff9d] text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

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
              onClick={handleAddToCart}
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
          animate={{ opacity: 1 }}
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(0, 255, 157, 0.1) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

