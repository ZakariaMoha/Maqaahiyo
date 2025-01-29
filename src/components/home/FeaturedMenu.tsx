import { FC, useState } from 'react';
import OrderModal from '../menu/OrderModal';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

const featuredItems: MenuItem[] = [
  {
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon with herbs and lemon butter sauce",
    price: "2800",
    image: "https://images.unsplash.com/photo-1485704686097-ed47f7263ca4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Beef Tenderloin",
    description: "Prime cut tenderloin with red wine reduction",
    price: "3400",
    image: "/img/tenderloin-1.jpg"
  },
  {
    name: "Truffle Pasta",
    description: "Homemade fettuccine with black truffle and parmesan",
    price: "2600",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

const FeaturedMenu: FC = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Our <span className="text-[#F7DC6F]">Featured</span> Menu
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our chef's specially curated selection of dishes, crafted with the finest ingredients
            and exceptional culinary expertise.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <div key={item.name} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#F7DC6F] font-bold">KES {item.price}</span>
                  <button 
                    onClick={() => handleOrderClick(item)}
                    className="bg-[#F7DC6F] text-black px-4 py-2 rounded-md hover:bg-[#F2C464] transition"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Modal */}
      {selectedItem && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          item={selectedItem}
        />
      )}
    </section>
  );
};

export default FeaturedMenu;
