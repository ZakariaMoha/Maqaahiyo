import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types/types';
import { getMenuItems } from '../services/menuService';
import OrderModal from '../components/menu/OrderModal';
import MenuBanner from '../components/menu/MenuBanner';
import { Search } from 'lucide-react';

const MenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        const items = await getMenuItems(); // Fetch menu items from the API
        setMenuItems(items); // Set fetched items to state
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false); // Ensure loading is stopped in all cases
      }
    };

    loadItems();

    // Handle localStorage changes
    const handleStorageChange = () => loadItems();
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Get unique categories from menu items
  const categories = ['all', ...new Set(menuItems.map((item) => item.category.toLowerCase()))];

  // Filter menu items based on category and search query
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category.toLowerCase() === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOrderClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MenuBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Our Menu</h1>
          <p className="text-black/70 max-w-2xl mx-auto">
            Explore our diverse menu featuring delicious dishes made with the finest ingredients
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/50" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#F7DC6F] focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  activeCategory === category
                    ? 'bg-[#F7DC6F] text-black shadow-md'
                    : 'bg-white text-black hover:bg-[#F7DC6F]/10 hover:text-black border border-[#F7DC6F]'
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F7DC6F] mx-auto"></div>
            <p className="mt-4 text-black/70">Loading menu items...</p>
          </div>
        ) : (
          <>
            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
                >
                  {item.image ? (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = '/img/default-food.jpg'; // Fallback image
                        }}
                      />
                    </div>
                  ) : (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src="/img/default-food.jpg"
                        alt={item.name}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-black">{item.name}</h3>
                      <span className="text-[#F7DC6F] font-bold text-lg">
                        KSh {item.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-black/70 mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-3 py-1 bg-[#F7DC6F]/10 text-sm text-black rounded-full">
                        {item.category}
                      </span>
                      <button
                        onClick={() => handleOrderClick(item)}
                        className="bg-[#F7DC6F] text-black px-6 py-2 rounded-full hover:bg-[#F2C464] transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#F7DC6F]"
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-black/70 text-lg mb-2">No menu items found</p>
                <p className="text-black/70">Try adjusting your search or category filter</p>
              </div>
            )}
          </>
        )}

        {/* Order Modal */}
        {selectedItem && (
          <OrderModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            item={selectedItem}
          />
        )}
      </div>
    </div>
  );
};

export default MenuPage;
