import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Navigation } from 'lucide-react';

interface Area {
  name: string;
  restaurants: number;
  image: string;
  description: string;
}

const areas: Area[] = [
  {
    name: 'Westlands',
    restaurants: 50,
    image: '/img/areas/westlands.jpg',
    description: 'Modern dining hub with diverse international cuisines'
  },
  {
    name: 'Lavington',
    restaurants: 21,
    image: '/img/areas/lavington.jpg',
    description: 'Upscale restaurants in a serene neighborhood'
  },
  {
    name: 'Kilimani',
    restaurants: 18,
    image: '/img/areas/kilimani.jpg',
    description: 'Trendy spots with contemporary dining experiences'
  },
  {
    name: 'Karen',
    restaurants: 16,
    image: '/img/areas/karen.jpg',
    description: 'Scenic dining venues in a lush setting'
  },
  {
    name: 'Central Business District',
    restaurants: 12,
    image: '/img/areas/cbd.jpg',
    description: 'Urban dining at the heart of the city'
  },
  {
    name: 'Gigiri',
    restaurants: 11,
    image: '/img/areas/gigiri.jpg',
    description: 'Diplomatic district with exclusive dining options'
  },
  {
    name: 'Parklands',
    restaurants: 5,
    image: '/img/areas/parklands.jpg',
    description: 'Multicultural area with authentic flavors'
  },
  {
    name: 'Hurlingham',
    restaurants: 4,
    image: '/img/areas/hurlingham.jpg',
    description: 'Cozy neighborhood with intimate dining spots'
  }
];

const AreaSelector: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation('Using your current location');
        },
        () => {
          setUserLocation(null);
        }
      );
    }
  }, []);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => 
        prevIndex + 1 >= areas.length ? 0 : prevIndex + 1
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => 
        prevIndex - 1 < 0 ? areas.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      handleNext();
    }
    if (touchStart - touchEnd < -75) {
      handlePrev();
    }
  };

  // Calculate which items to show
  const getVisibleAreas = () => {
    let result = [];
    // Add items from current index to the end
    for (let i = 0; i < areas.length; i++) {
      const index = (currentIndex + i) % areas.length;
      result.push(areas[index]);
    }
    return result;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose your Area
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the best restaurants in your neighborhood
            {userLocation && (
              <span className="flex items-center justify-center mt-2 text-green-600">
                <Navigation className="w-4 h-4 mr-2" />
                {userLocation}
              </span>
            )}
          </p>
        </div>
        
        <div className="relative px-12">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Previous area"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Next area"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Carousel Container */}
          <div 
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex * (100 / 3))}%)`,
                width: `${(areas.length * 100 / 3)}%`
              }}
            >
              {getVisibleAreas().map((area, index) => (
                <div
                  key={`${area.name}-${index}`}
                  className="w-1/3 px-3 flex-shrink-0 transform transition-all duration-500"
                  style={{
                    opacity: isAnimating ? 0.5 : 1,
                  }}
                >
                  <div 
                    className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-xl group h-[350px]"
                    onClick={() => navigate(`/area/${area.name.toLowerCase().replace(/\s+/g, '-')}`)}
                  >
                    <img
                      src={area.image}
                      alt={area.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '/img/default-area.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30 group-hover:from-black/80 transition-all duration-300"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <div className="transform transition-all duration-300">
                        <div className="flex items-center mb-2">
                          <MapPin className="w-5 h-5 mr-2" />
                          <h3 className="text-xl md:text-2xl font-bold line-clamp-1">{area.name}</h3>
                        </div>
                        <p className="text-sm mb-2">{area.restaurants} Restaurants</p>
                        <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: Math.ceil(areas.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index * 3);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / 3) === index 
                    ? 'bg-green-600 w-4' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide group ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreaSelector;
