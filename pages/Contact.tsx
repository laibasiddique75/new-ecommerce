import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">We'd love to hear from you. Whether you have a question about our products, pricing, or warranty, our team is ready to answer all your questions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-4">
            <div className="bg-gold-100 p-3 rounded-full text-gold-600">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Phone Support</h3>
              <p className="text-gray-600 mb-2">Mon-Sat 9am to 6pm</p>
              <a href="tel:+15551234567" className="text-gold-600 font-bold hover:underline">+1 (555) 123-4567</a>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-4">
             <div className="bg-gold-100 p-3 rounded-full text-gold-600">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Email Us</h3>
              <p className="text-gray-600 mb-2">We'll respond within 24 hours</p>
              <a href="mailto:support@zeaenterprises.com" className="text-gold-600 font-bold hover:underline">support@zeaenterprises.com</a>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex items-start space-x-4">
             <div className="bg-gold-100 p-3 rounded-full text-gold-600">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Visit Our Showroom</h3>
              <p className="text-gray-600">123 Industrial Estate, Electronics City<br/>Sector 4, 54000</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-gold-500">
          <h2 className="text-2xl font-serif font-bold mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-gold-500 outline-none" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-gold-500 outline-none" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-gold-500 outline-none">
                <option>General Inquiry</option>
                <option>Product Support</option>
                <option>Warranty Claim</option>
                <option>Corporate Orders</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows={4} className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-gold-500 outline-none" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full bg-black text-white font-bold py-3 rounded hover:bg-gray-800 transition-colors flex items-center justify-center">
              <Send className="w-4 h-4 mr-2" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};