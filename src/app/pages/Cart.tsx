import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export function Cart() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
    </div>
  );
}
