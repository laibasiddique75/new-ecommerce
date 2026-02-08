import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../contants';
import { Star, Truck, ShieldCheck, Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../App';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/shop" className="text-gold-600 hover:underline">Return to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    // In a real app we would pass quantity, but our simple context assumes 1 click = 1 add
    // We can loop or improve context later, for now let's just add one by one or simple alert
    for(let i=0; i<quantity; i++) {
        addToCart(product);
    }
    // Optional feedback
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gold-600">Home</Link> / 
        <Link to="/shop" className="hover:text-gold-600 mx-1">Shop</Link> / 
        <span className="text-gray-900 mx-1">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex items-center justify-center">
          <img src={product.image} alt={product.name} className="max-h-[500px] w-full object-contain" />
        </div>

        {/* Info */}
        <div className="space-y-6">
          <span className="text-gold-600 font-bold uppercase tracking-wider text-sm">{product.category}</span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight">{product.name}</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex text-gold-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-gray-500">{product.reviews.length} Reviews</span>
          </div>

          <div className="text-3xl font-bold text-gray-900">${product.price.toLocaleString()}</div>
          
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="border-t border-b border-gray-200 py-6 space-y-4">
             <div className="flex items-center space-x-2 text-sm text-gray-600">
               <Truck className="w-5 h-5 text-gold-500" />
               <span>Free Delivery within 3-5 Business Days</span>
             </div>
             <div className="flex items-center space-x-2 text-sm text-gray-600">
               <ShieldCheck className="w-5 h-5 text-gold-500" />
               <span>1 Year Official Warranty</span>
             </div>
          </div>

          <div className="flex items-center space-x-4 pt-4">
            <div className="flex items-center border border-gray-300 rounded">
              <button 
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button 
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-grow bg-gold-500 text-black font-bold py-3 px-6 rounded hover:bg-gold-400 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
            <button className="p-3 border border-gray-300 rounded hover:bg-gray-50 text-gray-500 hover:text-red-500 transition-colors">
              <Heart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button 
              onClick={() => setActiveTab('desc')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'desc' ? 'border-gold-500 text-gold-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab('specs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'specs' ? 'border-gold-500 text-gold-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Specifications
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-gold-500 text-gold-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Reviews ({product.reviews.length})
            </button>
          </nav>
        </div>
        
        <div className="py-8">
          {activeTab === 'desc' && (
            <div className="prose max-w-none text-gray-600">
              <p>{product.description}</p>
              <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          )}
          
          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key}>
                      <td className="py-3 text-sm font-medium text-gray-900 w-1/3">{key}</td>
                      <td className="py-3 text-sm text-gray-500">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {product.reviews.length > 0 ? product.reviews.map(review => (
                <div key={review.id} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">{review.user}</span>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex text-gold-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              )) : (
                <p className="text-gray-500 italic">No reviews yet for this product.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};