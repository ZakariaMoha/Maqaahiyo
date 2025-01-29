import React from 'react';

const featuredDishes = [
  {
    name: "Grilled Sea Bass",
    description: "Fresh sea bass with herbs, lemon, and seasonal vegetables",
    price: "$32",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
  },
  {
    name: "Truffle Risotto",
    description: "Creamy Arborio rice with black truffle and parmesan",
    price: "$28",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
  },
  {
    name: "Wagyu Steak",
    description: "Premium grade Wagyu beef with red wine reduction",
    price: "$45",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
  }
];

export default function FeaturedMenu() {
  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Dishes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our chef's carefully curated selection of signature dishes,
            prepared with the finest ingredients and exceptional attention to detail.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredDishes.map((dish) => (
            <div key={dish.name} className="group">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{dish.name}</h3>
                  <span className="text-orange-500 font-semibold">{dish.price}</span>
                </div>
                <p className="text-gray-600">{dish.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}