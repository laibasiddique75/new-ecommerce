import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../App';

export const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% tax
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="inline-block bg-gold-500 text-black px-8 py-3 rounded font-bold hover:bg-gold-400 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-contain mb-4 sm:mb-0 sm:mr-6" />
              
              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{item.category}</p>
                <div className="text-lg font-bold text-gold-600">${item.price.toLocaleString()}</div>
              </div>

              <div className="flex items-center mt-4 sm:mt-0 space-x-6">
                <div className="flex items-center border border-gray-300 rounded">
                  <button 
                    className="px-3 py-1 hover:bg-gray-100"
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 font-medium">{item.quantity}</span>
                  <button 
                    className="px-3 py-1 hover:bg-gray-100"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          
          <Link to="/shop" className="inline-flex items-center text-gold-600 font-medium hover:text-gold-700 mt-4">
             <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (5%)</span>
                <span>${tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-xl text-gray-900">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            <Link to="/checkout" className="block w-full bg-black text-white text-center py-4 rounded font-bold hover:bg-gray-800 transition-colors flex justify-center items-center group">
              Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="mt-6 text-xs text-center text-gray-500">
              <p>Secure Checkout - SSL Encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};