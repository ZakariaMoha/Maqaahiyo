export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
  dateAdded: string;
}

const GALLERY_ITEMS_KEY = 'rcs_gallery_items';

// Get gallery images from localStorage
export const getGalleryImages = (): GalleryImage[] => {
  const storedItems = localStorage.getItem(GALLERY_ITEMS_KEY);
  return storedItems ? JSON.parse(storedItems) : [];
};

// Save gallery images to localStorage
export const saveGalleryImages = (images: GalleryImage[]): void => {
  localStorage.setItem(GALLERY_ITEMS_KEY, JSON.stringify(images));
};

// Add a new gallery image
export const addGalleryImage = (image: GalleryImage): void => {
  const images = getGalleryImages();
  images.push(image);
  saveGalleryImages(images);
};

// Update an existing gallery image
export const updateGalleryImage = (updatedImage: GalleryImage): void => {
  const images = getGalleryImages();
  const index = images.findIndex(img => img.id === updatedImage.id);
  if (index !== -1) {
    images[index] = updatedImage;
    saveGalleryImages(images);
  }
};

// Delete a gallery image
export const deleteGalleryImage = (id: string): void => {
  const images = getGalleryImages();
  const filteredImages = images.filter(img => img.id !== id);
  saveGalleryImages(filteredImages);
};
