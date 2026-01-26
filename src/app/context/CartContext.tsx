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

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('retrokick-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('retrokick-cart', JSON.stringify(items));
  }, [items]);

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
      return [...prev, { product, quantity, selectedSize }];
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

