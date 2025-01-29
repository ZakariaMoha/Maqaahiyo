export default function MenuHero() {
  return (
    <div className="relative h-[40vh] bg-gray-900">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
          alt="Menu header"
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Menu</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto px-4">
            Discover our carefully curated selection of dishes, crafted with passion and the finest ingredients
          </p>
        </div>
      </div>
    </div>
  );
}