import React, { useState } from 'react';
import { useCart, useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';
import { db } from '../lib/db';

export const Checkout: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: user ? user.name.split(' ')[0] : '',
    lastName: user && user.name.split(' ').length > 1 ? user.name.split(' ')[1] : '',
    address: '',
    city: '',
    postalCode: ''
  });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + (subtotal * 0.05);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API network delay
    setTimeout(() => {
      // Create real order in DB
      db.createOrder(cartItems, total, {
        name: `${formData.firstName} ${formData.lastName}`,
        address: formData.address,
        city: formData.city
      });
      
      // If user is logged in, refresh their data to show new order in history
      if (user) {
        refreshUser();
      }

      setLoading(false);
      setStep(3); // Success
      clearCart();
    }, 2000);
  };

  if (step === 3) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-serif font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for shopping with Zea Enterprises. 
          {user ? " You can track this order in your Account dashboard." : " A confirmation email has been sent."}
        </p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => navigate('/shop')}
            className="bg-gold-500 text-black px-8 py-3 rounded font-bold hover:bg-gold-400"
          >
            Continue Shopping
          </button>
          {user && (
            <button 
              onClick={() => navigate('/account')}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded font-bold hover:bg-gray-50"
            >
              View Order
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold mb-8 text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <Truck className="w-6 h-6 mr-3 text-gold-600" />
                <h2 className="text-xl font-bold">Shipping Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">First Name</label>
                  <input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required type="text" 
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-gold-500 outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Last Name</label>
                  <input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required type="text" 
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-gold-500 outline-none" 
                  />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <input 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required type="text" 
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-gold-500 outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <input 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required type="text" 
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-gold-500 outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Postal Code</label>
                  <input 
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required type="text" 
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-gold-500 outline-none" 
                  />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <CreditCard className="w-6 h-6 mr-3 text-gold-600" />
                <h2 className="text-xl font-bold">Payment Details</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Card Number</label>
                  <input required type="text" placeholder="0000 0000 0000 0000" className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-gold-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Expiry</label>
                    <input required type="text" placeholder="MM/YY" className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-gold-500 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">CVC</label>
                    <input required type="text" placeholder="123" className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-gold-500 outline-none" />
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-black text-white font-bold py-4 rounded hover:bg-gray-800 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : `Pay $${total.toLocaleString()}`}
            </button>
          </form>
        </div>

        {/* Mini Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
            <h3 className="font-bold mb-4">Order Items</h3>
            <div className="space-y-4 max-h-80 overflow-y-auto mb-4 custom-scrollbar">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white rounded flex items-center justify-center mr-3 border border-gray-200">
                      <img src={item.image} alt={item.name} className="max-h-10 max-w-10" />
                    </div>
                    <div>
                      <p className="text-sm font-medium line-clamp-1 w-32">{item.name}</p>
                      <p className="text-xs text-gray-500">x{item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold">${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};