import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Truck, Clock } from 'lucide-react';
import { PRODUCTS, IMAGES } from '../contants';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-dark-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
           <img src={IMAGES.hero} className="w-full h-full object-cover" alt="Background" />
           <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col justify-center h-full">
          <span className="text-gold-500 font-bold tracking-wider uppercase mb-2">Premium Quality Electronics</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight max-w-2xl">
            Powering Your World with <span className="text-gold-500">Excellence</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-lg">
            Discover our exclusive range of heavy-duty generators, cooling systems, and home appliances designed for durability and performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop" className="bg-gold-500 text-black px-8 py-3 rounded font-bold hover:bg-gold-400 transition-colors text-center">
              Shop Now
            </Link>
            <Link to="/contact" className="border border-white text-white px-8 py-3 rounded font-bold hover:bg-white hover:text-black transition-colors text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-4">
            <div className="bg-gold-100 p-3 rounded-full text-gold-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Official Warranty</h3>
              <p className="text-gray-600 text-sm">All products come with genuine manufacturer warranty.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-4">
             <div className="bg-gold-100 p-3 rounded-full text-gold-600">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Reliable shipping across the country within 3-5 days.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-4">
             <div className="bg-gold-100 p-3 rounded-full text-gold-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Dedicated support team to assist you anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-2">Top picks from our premium collection</p>
          </div>
          <Link to="/shop" className="hidden md:flex items-center text-gold-600 font-medium hover:text-gold-700">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-8 md:hidden text-center">
          <Link to="/shop" className="inline-flex items-center text-gold-600 font-medium hover:text-gold-700">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>
      
      {/* Category Banner */}
      <section className="bg-gray-900 text-white py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Summer Sale Is Live!</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Up to 20% off on Air Conditioners and Room Coolers. Beat the heat with Zea Enterprises.</p>
            <Link to="/shop?category=Air Conditioners" className="bg-white text-black px-8 py-3 rounded font-bold hover:bg-gold-500 transition-all">
              Shop Cooling Appliances
            </Link>
         </div>
      </section>
    </div>
  );
};