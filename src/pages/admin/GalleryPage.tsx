import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiImage } from 'react-icons/fi';
import { GalleryImage, getGalleryImages, saveGalleryImages, deleteGalleryImage } from '../../services/galleryService';

const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [newImage, setNewImage] = useState<GalleryImage>({
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    category: '',
    dateAdded: new Date().toISOString()
  });

  useEffect(() => {
    // Load gallery images when component mounts
    const loadedImages = getGalleryImages();
    setImages(loadedImages);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        if (editingImage) {
          setEditingImage({ ...editingImage, imageUrl });
        } else {
          setNewImage({ ...newImage, imageUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    const imageToAdd = {
      ...newImage,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString()
    };
    
    const updatedImages = [...images, imageToAdd];
    setImages(updatedImages);
    saveGalleryImages(updatedImages);
    
    // Reset form
    setNewImage({
      id: '',
      title: '',
      description: '',
      imageUrl: '',
      category: '',
      dateAdded: new Date().toISOString()
    });
  };

  const handleUpdateImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    const updatedImages = images.map(img =>
      img.id === editingImage.id ? editingImage : img
    );
    
    setImages(updatedImages);
    saveGalleryImages(updatedImages);
    setEditingImage(null);
  };

  const handleDeleteImage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      deleteGalleryImage(id);
      setImages(images.filter(img => img.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Gallery Management</h2>
      
      {/* Add/Edit Form */}
      <form onSubmit={editingImage ? handleUpdateImage : handleAddImage} className="mb-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">
          {editingImage ? 'Edit Gallery Image' : 'Add New Gallery Image'}
        </h3>
        
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              {(editingImage?.imageUrl || newImage.imageUrl) ? (
                <div className="relative">
                  <img
                    src={editingImage?.imageUrl || newImage.imageUrl}
                    alt="Preview"
                    className="mx-auto h-48 w-auto object-cover rounded"
                  />
                </div>
              ) : (
                <FiImage className="mx-auto h-12 w-12 text-gray-400" />
              )}
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={editingImage ? editingImage.title : newImage.title}
              onChange={(e) => editingImage
                ? setEditingImage({ ...editingImage, title: e.target.value })
                : setNewImage({ ...newImage, title: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              value={editingImage ? editingImage.category : newImage.category}
              onChange={(e) => editingImage
                ? setEditingImage({ ...editingImage, category: e.target.value })
                : setNewImage({ ...newImage, category: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={editingImage ? editingImage.description : newImage.description}
              onChange={(e) => editingImage
                ? setEditingImage({ ...editingImage, description: e.target.value })
                : setNewImage({ ...newImage, description: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
              rows={3}
              required
            />
          </div>
        </div>
        
        <div className="mt-4 flex justify-end space-x-2">
          {editingImage && (
            <button
              type="button"
              onClick={() => setEditingImage(null)}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
            disabled={!(editingImage?.imageUrl || newImage.imageUrl)}
          >
            <FiPlus className="mr-2" />
            {editingImage ? 'Update Image' : 'Add Image'}
          </button>
        </div>
      </form>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => setEditingImage(image)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <FiEdit2 className="text-blue-600" />
                </button>
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <FiTrash2 className="text-red-600" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
              {image.category && (
                <span className="inline-block px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded mb-2">
                  {image.category}
                </span>
              )}
              <p className="text-gray-600 text-sm">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
