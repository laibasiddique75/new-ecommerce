import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../contants';
import { ProductCard } from '../components/ProductCard';
import { Category } from '../types';
import { Filter, SlidersHorizontal } from 'lucide-react';

export const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') as Category || Category.All;
  
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync with URL param if it changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat as Category);
  }, [searchParams]);

  const categories = Object.values(Category);

  const filteredProducts = PRODUCTS.filter(product => {
    const matchCategory = selectedCategory === Category.All || product.category === selectedCategory;
    const matchPrice = product.price <= priceRange;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchPrice && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4 md:mb-0">Shop</h1>
        
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-gold-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            className="md:hidden p-2 border border-gray-300 rounded hover:bg-gray-50"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`w-full md:w-64 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
            <div className="flex items-center mb-4 text-gray-900 font-bold">
              <Filter className="w-5 h-5 mr-2" /> Filters
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3 text-sm uppercase tracking-wide text-gray-500">Categories</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center space-x-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="category" 
                      className="text-gold-500 focus:ring-gold-500"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                    />
                    <span className={`text-sm group-hover:text-gold-600 ${selectedCategory === cat ? 'font-semibold text-gold-600' : 'text-gray-600'}`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-3 text-sm uppercase tracking-wide text-gray-500">Max Price: ${priceRange}</h3>
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="100" 
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-gold-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$0</span>
                <span>$10,000+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border border-dashed border-gray-300">
              <h3 className="text-lg font-medium text-gray-900">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};