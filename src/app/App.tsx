import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { Home } from '@/app/pages/Home';
import { Shop } from '@/app/pages/Shop';
import { ProductDetails } from '@/app/pages/ProductDetails';
import { Cart } from '@/app/pages/Cart';
import { About } from '@/app/pages/About';
import { Contact } from '@/app/pages/Contact';
import { Checkout } from '@/app/pages/Checkout';
import { CartProvider } from '@/app/context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-[#0a0a0f]">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
