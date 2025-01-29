import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Hero() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80",
      mobileUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Restaurant interior",
      lowQuality: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=20&q=10&blur=10"
    },
    {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
      mobileUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Elegant dining setup",
      lowQuality: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=20&q=10&blur=10"
    },
    {
      url: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
      mobileUrl: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Chef preparing food",
      lowQuality: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-1.2.1&auto=format&fit=crop&w=20&q=10&blur=10"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      images.forEach((image) => {
        const desktopImg = new Image();
        const mobileImg = new Image();
        
        desktopImg.onload = () => {
          setLoadedImages(prev => new Set([...prev, image.url]));
        };
        mobileImg.onload = () => {
          setLoadedImages(prev => new Set([...prev, image.mobileUrl]));
        };

        desktopImg.src = image.url;
        mobileImg.src = image.mobileUrl;
      });
    };

    preloadImages();
  }, []);

  // Handle carousel
  useEffect(() => {
    if (isFirstLoad && loadedImages.size >= images.length) {
      setIsFirstLoad(false);
    }

    const timer = setInterval(() => {
      if (!isFirstLoad) {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isFirstLoad, loadedImages.size]);

  return (
    <div className="relative h-[100svh] overflow-hidden">
      {/* Carousel Images */}
      {images.map((image, index) => (
        <div
          key={image.url}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Low quality placeholder */}
          <div 
            className={`absolute inset-0 transition-opacity duration-500 ${
              loadedImages.has(image.url) ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              backgroundImage: `url(${image.lowQuality})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(10px)',
              transform: 'scale(1.1)'
            }}
          />

          {/* High quality image */}
          <picture className={`transition-opacity duration-500 ${
            loadedImages.has(image.url) ? 'opacity-100' : 'opacity-0'
          }`}>
            <source media="(min-width: 768px)" srcSet={image.url} type="image/jpeg" />
            <source media="(max-width: 767px)" srcSet={image.mobileUrl} type="image/jpeg" />
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover object-center"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
      ))}

      {/* Carousel Indicators */}
      <div className="absolute bottom-20 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentImageIndex
                ? 'bg-white w-4'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col justify-center h-full pt-16 sm:pt-20">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
            Experience Fine Dining<br className="hidden sm:block" />
            <span className="text-[#F7DC6F]">at Its Finest</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl">
            Indulge in a culinary journey where traditional flavors meet modern cuisine,
            creating an unforgettable dining experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/menu"
              className="bg-[#F7DC6F] text-black px-6 sm:px-8 py-3 rounded-md hover:bg-[#F2C464] transition flex items-center justify-center gap-2 group text-sm sm:text-base"
            >
              View Menu
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/reservation"
              className="bg-black text-white px-6 sm:px-8 py-3 rounded-md hover:bg-gray-900 transition text-center text-sm sm:text-base"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}