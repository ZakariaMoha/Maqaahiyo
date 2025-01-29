import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80"
          alt="Restaurant interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col justify-center h-full pt-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Experience Fine Dining<br />at Its Finest
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            Indulge in a culinary journey where traditional flavors meet modern cuisine,
            creating an unforgettable dining experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/menu"
              className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition flex items-center justify-center gap-2 group"
            >
              View Menu
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/reservation"
              className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition"
            >
              Reserve Table
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}