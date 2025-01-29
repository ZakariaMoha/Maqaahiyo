import { MenuItems } from '../types/types';

// Key for storing menu items in localStorage
const MENU_ITEMS_KEY = 'rcs_menu_items';
const API_BASE_URL = 'http://localhost:5000/API/menu'
// Get menu items from localStorage
// export const getMenuItems = (): MenuItems[] => {
//   const storedItems = localStorage.getItem(MENU_ITEMS_KEY);
//   return storedItems ? JSON.parse(storedItems) : [];
// };

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export const getMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch menu items: ${response.statusText}`);
    }
    const data: MenuItem[] = await response.json();

    // Optional: Normalize category names (e.g., remove trailing slashes)
    return data.map(item => ({
      ...item,
      category: item.category.replace(/\/$/, '') // Removes trailing slash if present
    }));
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }
};
// Save menu items to localStorage
export const saveMenuItems = (items: MenuItems[]): void => {
  localStorage.setItem(MENU_ITEMS_KEY, JSON.stringify(items));
};

// Add a new menu item
export const addMenuItem = (item: MenuItems): void => {
  const items = getMenuItems();
  items.push(item);
  saveMenuItems(items);
};

// Update an existing menu item
export const updateMenuItem = (updatedItem: MenuItem): void => {
  const items = getMenuItems();
  const index = items.findIndex(item => item.id === updatedItem.id);
  if (index !== -1) {
    items[index] = updatedItem;
    saveMenuItems(items);
  }
};

// Delete a menu item
export const deleteMenuItem = (id: string): void => {
  const items = getMenuItems();
  const filteredItems = items.filter(item => item.id !== id);
  saveMenuItems(filteredItems);
};

// Fetch menu items from the database
export const fetchMenuItems = async (): Promise<MenuItems[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) throw new Error('Failed to fetch menu items');
    const data = await response.json();
    saveMenuItems(data); // Cache locally for offline use
    return data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return getMenuItems(); // Fallback to local data
  }
};
// import { MenuItem } from '../types/types';

// const API_BASE_URL = 'http://localhost:5000/API/menu';

// // Fetch menu items from the database
// export const getMenuItems = async (): Promise<MenuItem[]> => {
//   try {
//     const response = await fetch(API_BASE_URL);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch menu items: ${response.statusText}`);
//     }
//     const data: MenuItem[] = await response.json();

//     // Optional: Normalize category names (e.g., remove trailing slashes)
//     return data.map(item => ({
//       ...item,
//       category: item.category.replace(/\/$/, ''), // Removes trailing slash if present
//     }));
//   } catch (error) {
//     console.error('Error fetching menu items:', error);
//     return []; // Return an empty array in case of an error
//   }
// };

// // Add a new menu item
// export const addMenuItem = async (item: MenuItem): Promise<void> => {
//   try {
//     const response = await fetch(API_BASE_URL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(item),
//     });
//     if (!response.ok) {
//       throw new Error(`Failed to add menu item: ${response.statusText}`);
//     }
//   } catch (error) {
//     console.error('Error adding menu item:', error);
//   }
// };

// // Update an existing menu item
// export const updateMenuItem = async (updatedItem: MenuItem): Promise<void> => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/${updatedItem.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedItem),
//     });
//     if (!response.ok) {
//       throw new Error(`Failed to update menu item: ${response.statusText}`);
//     }
//   } catch (error) {
//     console.error('Error updating menu item:', error);
//   }
// };

// // Delete a menu item
// export const deleteMenuItem = async (id: string): Promise<void> => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/${id}`, {
//       method: 'DELETE',
//     });
//     if (!response.ok) {
//       throw new Error(`Failed to delete menu item: ${response.statusText}`);
//     }
//   } catch (error) {
//     console.error('Error deleting menu item:', error);
//   }
// };
