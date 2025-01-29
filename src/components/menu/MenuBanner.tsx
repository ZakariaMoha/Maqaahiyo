import React from 'react';

export default function MenuBanner() {
  return (
    <div className="relative h-[40vh] bg-black">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Restaurant interior"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/25" />
      </div>
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F7DC6F] mb-6">
            Discover Our Menu
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
            Experience a culinary journey through our carefully crafted dishes, 
            made with the finest ingredients and passion for exceptional taste.
          </p>
        </div>
      </div>
    </div>
  );
}
