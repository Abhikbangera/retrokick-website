import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCart } from '@/app/context/CartContext';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';

export function Cart() {
  const { items, updateQuantity, removeItem, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const shipping = totalPrice > 5000 ? 0 : 199;
  const tax = totalPrice * 0.18;
  const grandTotal = totalPrice + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] pt-32 pb-20 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag className="w-24 h-24 text-white/30 mx-auto mb-8" />
          <h1
            className="text-6xl md:text-7xl mb-6 text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            YOUR CART IS EMPTY
          </h1>
          <p className="text-xl text-white/70 mb-12">
            Start shopping to add items to your cart
          </p>
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] text-black font-bold rounded-lg"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              CONTINUE SHOPPING
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl mb-8 text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          YOUR CART ({totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'})
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={`${item.product.id}-${item.selectedSize}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                layout
                className="p-6 rounded-2xl bg-[#1a1a2e] border border-white/10 flex flex-col md:flex-row items-center gap-6"
              >
                {/* Product Image */}
                <Link to={`/product/${item.product.id}`}>
                  <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-[#0d1b3a] flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="flex-1 text-center md:text-left">
                  <Link to={`/product/${item.product.id}`}>
                    <h3 className="text-xl text-white font-bold hover:text-[#00ff9d] transition-colors mb-1">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-white/50 text-sm mb-2">{item.product.team} • {item.product.year}</p>
                  <p className="text-[#00d9ff] text-sm">Size: {item.selectedSize}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                    className="p-2 bg-[#0a0a0f] border border-white/10 rounded-lg hover:border-[#00ff9d] transition-colors"
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </motion.button>
                  <span className="text-white font-bold text-lg w-8 text-center">{item.quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                    className="p-2 bg-[#0a0a0f] border border-white/10 rounded-lg hover:border-[#00ff9d] transition-colors"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </motion.button>
                </div>

                {/* Price & Remove */}
                <div className="flex flex-col items-center md:items-end gap-2">
                  <p className="text-2xl font-black text-[#00ff9d]">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeItem(item.product.id, item.selectedSize)}
                    className="p-2 text-red-400 hover:text-red-400/70 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}

            {/* Continue Shopping */}
            <Link to="/shop">
              <motion.button
                whileHover={{ x: -5 }}
                className="flex items-center space-x-2 text-white/70 hover:text-[#00ff9d] transition-colors mt-4"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Continue Shopping</span>
              </motion.button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-2xl bg-[#1a1a2e] border border-white/10 sticky top-32"
            >
              <h2
                className="text-2xl text-white mb-6 font-bold uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-[#00ff9d]' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-white text-xl font-bold pt-4 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-[#00ff9d]">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {totalPrice < 5000 && (
                <div className="mb-6 p-4 rounded-lg bg-[#0a0a0f] border border-white/10">
                  <p className="text-white/70 text-sm mb-2">Add ₹{(5000 - totalPrice).toLocaleString('en-IN')} more for</p>
                  <p className="text-[#00ff9d] font-bold">FREE SHIPPING!</p>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] text-black font-bold rounded-lg text-lg uppercase tracking-wider flex items-center justify-center space-x-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-white/50 text-xs">
                    <div className="w-8 h-8 rounded-full bg-[#00ff9d]/10 flex items-center justify-center">
                      <span className="text-[#00ff9d]">🔒</span>
                    </div>
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/50 text-xs">
                    <div className="w-8 h-8 rounded-full bg-[#00d9ff]/10 flex items-center justify-center">
                      <span className="text-[#00d9ff]">↩️</span>
                    </div>
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

