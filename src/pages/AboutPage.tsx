import { MapPin, Coffee, CreditCard, Clock } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: <Coffee className="w-6 h-6 text-[#F7DC6F]" />,
      title: "Authentic Cuisine",
      description: "Offering the best of Somali and Middle Eastern dishes with authentic spices and fresh ingredients."
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#F7DC6F]" />,
      title: "Prime Location",
      description: "Located in the heart of Eastleigh, known for its vibrant culture and rich heritage."
    },
    {
      icon: <Clock className="w-6 h-6 text-[#F7DC6F]" />,
      title: "Welcoming Atmosphere",
      description: "A warm and lively environment perfect for both casual dining and group gatherings."
    },
    {
      icon: <CreditCard className="w-6 h-6 text-[#F7DC6F]" />,
      title: "Convenient Service",
      description: "Multiple payment options and comfortable seating for the best dining experience."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-black">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Restaurant interior"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/25" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F7DC6F] mb-6">
              About Jifora
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
              A culinary journey through Somali and Middle Eastern cuisine
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About Section */}
        <div className="prose prose-lg max-w-none mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
          <div className="text-gray-600 space-y-6">
            <p>
              Jifora is situated in the heart of Eastleigh, a district famous for its cultural diversity, 
              thriving markets, and rich Somali heritage. The restaurant is conveniently located near busy 
              shopping areas and easily accessible from various parts of the city. Eastleigh is known for 
              its vibrant street life, and Jifora provides a perfect spot for locals and visitors alike to 
              enjoy authentic meals amidst the energy of the area. The atmosphere at Jifora is warm, lively, 
              and welcoming, reflecting the vibrant culture of Eastleigh.
            </p>
            <p>
              The décor is simple yet inviting, with traditional elements that pay homage to Somali and 
              Middle Eastern heritage. The restaurant's spacious seating area is designed for comfort, 
              making it an ideal place for both casual family meals and more prominent group gatherings. 
              Jifora is renowned for its Somali and Middle Eastern dishes, offering a menu that highlights 
              the best of both cuisines. The menu features a variety of flavorful dishes prepared with 
              authentic spices and fresh ingredients, ensuring a true taste of the region's culinary traditions.
            </p>
            <p>
              Popular starters include samosas, falafel, and hummus platters, which provide a light and 
              flavorful beginning to the meal. For mains, the menu offers hearty and traditional Somali 
              dishes like bariis iskukaris (spiced rice with meat or chicken), camel meat stew, and 
              roasted goat, alongside Middle Eastern favourites like shawarma, grilled kebabs, and lamb kofta.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="bg-[#F7DC6F]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Image Gallery */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="relative aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Restaurant food"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="relative aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Restaurant interior"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="relative aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Restaurant ambiance"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
