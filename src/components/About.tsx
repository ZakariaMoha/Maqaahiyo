import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Culinary Journey
            </h2>
            <p className="text-gray-600 mb-6">
              Founded in 2010, Savoria has been at the forefront of culinary innovation,
              combining traditional techniques with modern gastronomy. Our passionate
              team of chefs creates memorable dining experiences using only the finest,
              locally-sourced ingredients.
            </p>
            <p className="text-gray-600 mb-8">
              Every dish tells a story, reflecting our commitment to excellence and
              our deep respect for culinary traditions from around the world.
            </p>
            <button className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition">
              Learn More About Us
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Restaurant interior"
              className="rounded-lg w-full h-48 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1428515613728-6b4607e44363?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Chef preparing food"
              className="rounded-lg w-full h-48 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Plated dish"
              className="rounded-lg w-full h-48 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Restaurant ambiance"
              className="rounded-lg w-full h-48 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}