import React, { useState } from 'react';
import { User, Package, LogOut, Settings, AlertCircle } from 'lucide-react';
import { useAuth } from '../App';
import { db } from '../lib/db';

// Authenticated Dashboard View
const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gold-600">
              <User className="w-10 h-10" />
            </div>
            <h2 className="font-bold text-lg">{user.name}</h2>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
          <nav className="space-y-2">
            <button className="w-full flex items-center space-x-3 px-4 py-2 bg-gold-50 text-gold-700 rounded font-medium">
              <Package className="w-5 h-5" /> <span>Orders</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded font-medium transition-colors">
              <Settings className="w-5 h-5" /> <span>Settings</span>
            </button>
            <button onClick={logout} className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded font-medium transition-colors">
              <LogOut className="w-5 h-5" /> <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <h2 className="text-2xl font-serif font-bold mb-6">Order History</h2>
          <div className="space-y-4">
            {user.orders && user.orders.length > 0 ? (
              user.orders.map((order) => (
                <div key={order.id} className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <div>
                       <span className="font-bold text-lg">Order #{order.id}</span>
                       <p className="text-sm text-gray-500">Placed on {order.date}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex -space-x-2 overflow-hidden">
                      {order.items.slice(0, 5).map((item, idx) => (
                        <img 
                          key={idx}
                          src={item.image} 
                          alt={item.name}
                          className="w-10 h-10 rounded-full border-2 border-white bg-white object-contain"
                          title={item.name}
                        />
                      ))}
                      {order.items.length > 5 && (
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                          +{order.items.length - 5}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                     <span className="text-sm text-gray-500">{order.items.length} Items</span>
                     <span className="font-bold text-gray-900">${order.total.toLocaleString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                <Package className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
                <p className="text-gray-500">When you place an order, it will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Login/Register View
export const Auth: React.FC = () => {
  const { user, login } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState("");
  
  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return <Dashboard />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLoginView) {
      const result = db.login(email, password);
      if (result.success && result.user) {
        login(result.user);
      } else {
        setError(result.message);
      }
    } else {
      if (!name) {
        setError("Name is required");
        return;
      }
      const result = db.register(name, email, password);
      if (result.success && result.user) {
        login(result.user);
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900">
            {isLoginView ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLoginView ? 'Sign in to access your orders' : 'Join Zea Enterprises for premium service'}
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded flex items-center text-sm">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {!isLoginView && (
               <div>
                <label className="sr-only">Full Name</label>
                <input 
                  required 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm" 
                  placeholder="Full Name" 
                />
              </div>
            )}
            <div>
              <label className="sr-only">Email address</label>
              <input 
                required 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm" 
                placeholder="Email address" 
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input 
                required 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm" 
                placeholder="Password" 
              />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gold-500 hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500">
              {isLoginView ? 'Sign in' : 'Register'}
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <button 
            onClick={() => {
              setIsLoginView(!isLoginView);
              setError("");
            }}
            className="text-sm font-medium text-gold-600 hover:text-gold-500"
          >
            {isLoginView ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};