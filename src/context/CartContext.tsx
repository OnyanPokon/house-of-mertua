import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../constants';

interface CartItem extends MenuItem {
  quantity: number;
}

interface UserInfo {
  name: string;
  phone: string;
  address: string;
}

interface Order {
  id: string;
  items: CartItem[];
  userInfo: UserInfo;
  total: number;
  status: 'PENDING' | 'PREPARING' | 'DELIVERING' | 'COMPLETED';
  createdAt: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
  activeOrder: Order | null;
  placeOrder: () => void;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userInfo, setUserInfoState] = useState<UserInfo>(() => {
    const saved = localStorage.getItem('mertua_user_info');
    return saved ? JSON.parse(saved) : { name: '', phone: '', address: '' };
  });
  const [activeOrder, setActiveOrder] = useState<Order | null>(() => {
    const saved = localStorage.getItem('mertua_active_order');
    return saved ? JSON.parse(saved) : null;
  });

  const setUserInfo = (info: UserInfo) => {
    setUserInfoState(info);
    localStorage.setItem('mertua_user_info', JSON.stringify(info));
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const placeOrder = () => {
    const newOrder: Order = {
      id: `HMT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      items: cart,
      userInfo,
      total: totalAmount,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    setActiveOrder(newOrder);
    localStorage.setItem('mertua_active_order', JSON.stringify(newOrder));
    clearCart();
  };

  // Simulate order status updates
  useEffect(() => {
    if (activeOrder && activeOrder.status !== 'COMPLETED') {
      const timer = setTimeout(() => {
        const statuses: Order['status'][] = ['PENDING', 'PREPARING', 'DELIVERING', 'COMPLETED'];
        const currentIndex = statuses.indexOf(activeOrder.status);
        if (currentIndex < statuses.length - 1) {
          const nextStatus = statuses[currentIndex + 1];
          const updatedOrder = { ...activeOrder, status: nextStatus };
          setActiveOrder(updatedOrder);
          localStorage.setItem('mertua_active_order', JSON.stringify(updatedOrder));
        }
      }, 30000); // Update every 30 seconds for simulation
      return () => clearTimeout(timer);
    }
  }, [activeOrder]);

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      userInfo, setUserInfo,
      activeOrder, placeOrder, totalAmount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
