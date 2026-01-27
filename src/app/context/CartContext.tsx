import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/app/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number, selectedSize: string) => void;
  removeItem: (productId: string, selectedSize: string) => void;
  updateQuantity: (productId: string, selectedSize: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CART_STORAGE_KEY = 'retrokick_cart_items';

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper function to load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate the parsed data has the expected structure
      if (Array.isArray(parsed) && parsed.length >= 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return [];
};

// Helper function to save cart to localStorage
const saveCartToStorage = (items: CartItem[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize cart from localStorage on mount
  useEffect(() => {
    const storedItems = loadCartFromStorage();
    if (storedItems.length > 0) {
      setItems(storedItems);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever items change (only after initial load)
  useEffect(() => {
    if (isInitialized) {
      saveCartToStorage(items);
    }
  }, [items, isInitialized]);

  const addItem = (product: Product, quantity: number, selectedSize: string) => {
    console.log('CartContext addItem called:', product.name, 'size:', selectedSize, 'qty:', quantity);
    setItems(prev => {
      console.log('Current cart items:', prev.length);
      const existing = prev.find(
        item => item.product.id === product.id && item.selectedSize === selectedSize
      );
      if (existing) {
        console.log('Item exists, updating quantity');
        return prev.map(item =>
          item.product.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      console.log('Adding new item to cart');
      const newItems = [...prev, { product, quantity, selectedSize }];
      console.log('New cart items:', newItems.length);
      return newItems;
    });
  };

  const removeItem = (productId: string, selectedSize: string) => {
    setItems(prev => prev.filter(
      item => !(item.product.id === productId && item.selectedSize === selectedSize)
    ));
  };

  const updateQuantity = (productId: string, selectedSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, selectedSize);
      return;
    }
    setItems(prev => prev.map(item =>
      item.product.id === productId && item.selectedSize === selectedSize
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

