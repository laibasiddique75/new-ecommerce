import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../App';
import { IMAGES } from '../contants';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [imgSrc, setImgSrc] = useState(product.image);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100 group">
      <div className="relative h-64 overflow-hidden bg-gray-50 p-4 flex items-center justify-center">
        <img 
          src={imgSrc} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          onError={() => setImgSrc(IMAGES.placeholder)}
        />
        
        {product.featured && (
          <div className="absolute top-2 left-2 bg-gold-500 text-black text-xs font-bold px-2 py-1 rounded">
            FEATURED
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</div>
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-gold-600">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        
        <div className="flex items-center mb-4">
          <div className="flex text-gold-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-gray-400 text-xs ml-2">({product.rating})</span>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
          <button 
            onClick={() => addToCart(product)}
            className="bg-gray-900 text-white p-2 rounded-full hover:bg-gold-500 hover:text-black transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};