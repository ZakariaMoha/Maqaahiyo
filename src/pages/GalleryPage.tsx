import React, { useState, useEffect } from 'react';
import { GalleryImage, getGalleryImages } from '../services/galleryService';
import { Search, X, Filter } from 'lucide-react';
import GalleryBanner from '../components/gallery/GalleryBanner';

const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = () => {
      setLoading(true);
      const loadedImages = getGalleryImages();
      setImages(loadedImages);
      setLoading(false);
    };

    loadImages();
    // Listen for changes in localStorage
    window.addEventListener('storage', loadImages);
    return () => window.removeEventListener('storage', loadImages);
  }, []);

  // Get unique categories from images
  const categories = ['all', ...new Set(images.map(img => img.category?.toLowerCase() || '').filter(Boolean))];

  // Filter images based on selected category and search query
  const filteredImages = images.filter(img => {
    const matchesCategory = selectedCategory === 'all' || img.category?.toLowerCase() === selectedCategory;
    const matchesSearch = 
      img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
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
              Our Gallery
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
              A visual journey through our culinary creations
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Search Bar */}
          <div className="md:w-96">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search gallery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center text-gray-500 mr-2">
                <Filter className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Filter by:</span>
              </div>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md transition ${
                    selectedCategory === category
                      ? 'bg-[#F7DC6F] text-black'
                      : 'bg-white text-black hover:bg-[#F7DC6F]/10'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-6 text-gray-600 text-lg">Loading gallery...</p>
          </div>
        ) : (
          <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative overflow-hidden rounded-t-xl aspect-[4/3]">
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-sm font-medium bg-black/75 px-4 py-2 rounded-lg backdrop-blur-sm">
                          View Details
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1">
                      {image.title}
                    </h3>
                    {image.category && (
                      <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-sm text-gray-600 rounded-lg">
                        {image.category}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <div className="max-w-md mx-auto">
                  <p className="text-gray-500 text-xl font-medium mb-3">No images found</p>
                  <p className="text-gray-400">Try adjusting your search or category filter</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-6 px-6 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="max-w-5xl w-full bg-white rounded-xl overflow-hidden shadow-2xl transform transition-all"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition-colors backdrop-blur-sm"
                >
                  <X size={20} />
                </button>
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="w-full h-[70vh] object-contain bg-black"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{selectedImage.title}</h3>
                {selectedImage.category && (
                  <span className="inline-block px-3 py-1 bg-gray-100 text-sm text-gray-600 rounded-lg mb-4">
                    {selectedImage.category}
                  </span>
                )}
                <p className="text-gray-600 leading-relaxed">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
