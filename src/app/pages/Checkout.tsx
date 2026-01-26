import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCart } from '@/app/context/CartContext';
import { ArrowLeft, Lock, Check, Truck, Shield } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const shipping = totalPrice > 5000 ? 0 : 199;
  const tax = totalPrice * 0.18;
  const grandTotal = totalPrice + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'phone' || name === 'pincode') {
      formattedValue = value.replace(/\D/g, '').slice(0, name === 'phone' ? 10 : 6);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleRazorpayPayment = () => {
    setIsProcessing(true);
    
    // Razorpay integration
    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
      amount: Math.round(grandTotal * 100), // Amount in paise
      currency: 'INR',
      name: 'RetroKick',
      description: `Order for ${items.length} item(s)`,
      image: 'https://retrokick.com/logo.png',
      handler: (response: any) => {
        setIsProcessing(false);
        setStep('success');
        clearCart();
        setTimeout(() => navigate('/'), 5000);
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      },
      theme: {
        color: '#00ff9d',
      },
    };

    if (window.Razorpay) {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      razorpay.on('payment.failed', (response: any) => {
        setIsProcessing(false);
        alert('Payment failed. Please try again.');
      });
    } else {
      setIsProcessing(false);
      alert('Razorpay is not loaded. Please include the Razorpay script in your HTML.');
    }
  };

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-[#0a0a0f] pt-32 pb-20 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            YOUR CART IS EMPTY
          </h1>
          <p className="text-white/70 mb-8">Add items to your cart to checkout</p>
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

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-[#0a0a0f] pt-32 pb-20 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-12 h-12 text-black" />
          </motion.div>
          <h1
            className="text-5xl md:text-6xl mb-4 text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ORDER CONFIRMED!
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Thank you for your purchase, {formData.firstName}! Your order has been placed successfully.
          </p>
          <p className="text-white/50 mb-8">
            A confirmation email has been sent to {formData.email}
          </p>
          <Link to="/">
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
      <div className="max-w-7xl mx-auto">
        {step === 'payment' && (
          <motion.button
            whileHover={{ x: -5 }}
            onClick={() => setStep('shipping')}
            className="flex items-center space-x-2 text-white/70 hover:text-[#00ff9d] mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Shipping</span>
          </motion.button>
        )}

        <h1
          className="text-5xl md:text-6xl mb-8 text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {step === 'shipping' ? 'CHECKOUT' : 'PAYMENT'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 'shipping' ? (
              <motion.form
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleShippingSubmit}
                className="space-y-6"
              >
                <div className="p-6 rounded-2xl bg-[#1a1a2e] border border-white/10">
                  <h2 className="text-2xl text-white mb-6 font-bold uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-lg text-white focus:border-[#00ff9d] focus:outline-none transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-lg text-white focus:border-[#00ff9d] focus:outline-none transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-lg text-white focus:border-[#00ff9d] focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-lg text-white focus:border-[#00ff9d] focus:outline-none transition-colors"
                        placeholder="9876543210"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-white/70 mb-2 text-sm">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-lg text-white focus:border-[#00ff9d] focus:outline-none transition-colors"
                        placeholder="123 Main Street, Apartment 4B"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-lg text-white focus:border-[#00ff9d] focus:outline-none transition-colors"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-lg text-white focus:border-[#00ff9d] focus:outline-none transition-colors"
                        placeholder="Maharashtra"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">PIN Code</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-lg text-white focus:border-[#00ff9d] focus:outline-none transition-colors"
                        placeholder="400001"
                      />
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] text-black font-bold rounded-lg text-lg uppercase tracking-wider"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Continue to Payment
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-2xl bg-[#1a1a2e] border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl text-white font-bold uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      Pay with Razorpay
                    </h2>
                    <div className="flex items-center space-x-2 text-white/50">
                      <Lock className="w-4 h-4" />
                      <span className="text-sm">Secure</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0a0a0f] border border-white/10 mb-6">
                    <h3 className="text-white font-bold mb-3">Secure Payment via Razorpay</h3>
                    <p className="text-white/50 text-sm mb-4">Accepts UPI, Credit/Debit Cards, Netbanking, Wallets</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/10 rounded text-white/70 text-xs">UPI</span>
                      <span className="px-3 py-1 bg-white/10 rounded text-white/70 text-xs">Visa</span>
                      <span className="px-3 py-1 bg-white/10 rounded text-white/70 text-xs">Mastercard</span>
                      <span className="px-3 py-1 bg-white/10 rounded text-white/70 text-xs">RuPay</span>
                      <span className="px-3 py-1 bg-white/10 rounded text-white/70 text-xs">Netbanking</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                    whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                    onClick={handleRazorpayPayment}
                    disabled={isProcessing}
                    className="w-full py-4 bg-gradient-to-r from-[#3399ff] to-[#00d4ff] text-white font-bold rounded-lg text-lg uppercase tracking-wider flex items-center justify-center space-x-2 disabled:opacity-50"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-xl">⚡</span>
                        <span>Pay ₹{grandTotal.toLocaleString('en-IN')}</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-2xl bg-[#1a1a2e] border border-white/10 sticky top-32"
            >
              <h2 className="text-2xl text-white mb-6 font-bold uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-white text-sm font-bold truncate">{item.product.name}</p>
                      <p className="text-white/50 text-xs">Size: {item.selectedSize}</p>
                      <p className="text-white/50 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-[#00ff9d] font-bold">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
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
                <div className="flex justify-between text-white text-xl font-bold pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-[#00ff9d]">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {totalPrice < 5000 && (
                <p className="text-white/50 text-sm mt-4 text-center">
                  Add ₹{(5000 - totalPrice).toLocaleString('en-IN')} more for free shipping!
                </p>
              )}

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 text-white/50 text-xs">
                  <Truck className="w-4 h-4 text-[#00ff9d]" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-white/50 text-xs">
                  <Shield className="w-4 h-4 text-[#00d9ff]" />
                  <span>Secure Payment</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

