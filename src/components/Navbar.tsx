import React from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img src="/img/logo-673892610ff12.png" className="h-8 w-auto" alt="Logo" />
            <span className="text-2xl font-bold text-gray-900 ml-2">Rozzama Cafe</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
            <a href="#menu" className="text-gray-700 hover:text-gray-900">Menu</a>
            <a href="#about" className="text-gray-700 hover:text-gray-900">About</a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900">Contact</a>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
              Book a Table
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 text-gray-700">Home</a>
            <a href="#menu" className="block px-3 py-2 text-gray-700">Menu</a>
            <a href="#about" className="block px-3 py-2 text-gray-700">About</a>
            <a href="#contact" className="block px-3 py-2 text-gray-700">Contact</a>
            <button className="w-full text-left px-3 py-2 text-gray-700">
              Book a Table
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}