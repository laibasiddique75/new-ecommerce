import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Auth } from './pages/Auth';
import { Contact } from './pages/Contact';
import { CartItem, Product, User } from './types';
import { db } from './lib/db';

// --- Auth Context ---
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

// --- Cart Context ---
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

const App: React.FC = () => {
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Initialize Data
  useEffect(() => {
    // Load User
    const currentUser = db.getCurrentUser();
    if (currentUser) setUser(currentUser);

    // Load Cart
    const savedCart = db.getCart();
    if (savedCart.length > 0) setCartItems(savedCart);
  }, []);

  // Sync Cart to DB/Storage whenever it changes
  useEffect(() => {
    db.saveCart(cartItems);
  }, [cartItems]);

  // Auth Handlers
  const handleLogin = (userData: User) => setUser(userData);
  const handleLogout = () => {
    db.logout();
    setUser(null);
  };
  const refreshUser = () => {
    const updated = db.getCurrentUser();
    setUser(updated);
  };

  // Cart Handlers
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => item.id === productId ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout, refreshUser }}>
      <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<><ScrollToTop /><Home /></>} />
              <Route path="/shop" element={<><ScrollToTop /><Shop /></>} />
              <Route path="/product/:id" element={<><ScrollToTop /><ProductDetails /></>} />
              <Route path="/cart" element={<><ScrollToTop /><Cart /></>} />
              <Route path="/checkout" element={<><ScrollToTop /><Checkout /></>} />
              <Route path="/account" element={<><ScrollToTop /><Auth /></>} />
              <Route path="/contact" element={<><ScrollToTop /><Contact /></>} />
            </Routes>
          </Layout>
        </Router>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;