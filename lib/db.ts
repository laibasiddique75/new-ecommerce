import { User, Order, CartItem } from '../types';

// Keys for LocalStorage
const USERS_KEY = 'zea_users';
const CURRENT_USER_KEY = 'zea_current_user';
const CART_KEY = 'zea_cart';

export const db = {
  // --- Auth Methods ---
  
  getUsers: (): User[] => {
    try {
      const users = localStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (e) {
      return [];
    }
  },

  saveUser: (user: User) => {
    const users = db.getUsers();
    const existingIndex = users.findIndex(u => u.email === user.email);
    
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // If updating current user, update session too
    const currentUser = db.getCurrentUser();
    if (currentUser && currentUser.email === user.email) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
  },

  register: (name: string, email: string, password: string): { success: boolean; message: string; user?: User } => {
    const users = db.getUsers();
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'User already exists' };
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      orders: []
    };
    
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Auto login
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    
    return { success: true, message: 'Account created successfully', user: newUser };
  },

  login: (email: string, password: string): { success: boolean; message: string; user?: User } => {
    const users = db.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return { success: true, message: 'Login successful', user };
    }
    return { success: false, message: 'Invalid email or password' };
  },

  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser: (): User | null => {
    try {
      const user = localStorage.getItem(CURRENT_USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  },

  // --- Order Methods ---

  createOrder: (items: CartItem[], total: number, shippingDetails: any): Order => {
    const order: Order = {
      id: 'ORD-' + Math.floor(Math.random() * 1000000),
      date: new Date().toLocaleDateString(),
      total,
      status: 'Processing',
      items: [...items],
      shippingDetails
    };

    // Save to User History if logged in
    const currentUser = db.getCurrentUser();
    if (currentUser) {
      if (!currentUser.orders) currentUser.orders = [];
      currentUser.orders.unshift(order); // Add to top
      db.saveUser(currentUser);
    }

    return order;
  },

  // --- Cart Persistence ---
  saveCart: (items: CartItem[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  },

  getCart: (): CartItem[] => {
    try {
      const cart = localStorage.getItem(CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (e) {
      return [];
    }
  }
};