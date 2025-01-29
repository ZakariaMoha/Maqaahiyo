import React, { useState, useEffect, createContext } from 'react';
import { MenuItem } from '../../types/types';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { getMenuItems, saveMenuItems, deleteMenuItem } from '../../services/menuService';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useNavigate } from 'react-router-dom';

// Create a context to share the menu update functionality
export const MenuContext = createContext<{
  updateMenuItem: (id: string, updatedDetails: Partial<MenuItem>) => void;
}>({
  updateMenuItem: () => {},
});

const MenuItemsPage: React.FC = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState<MenuItem>({
    id: '',
    menuId: Date.now().toString(), // Initialize with a unique menu ID
    name: '',
    description: '',
    price: 0,
    category: '',
    image: ''
  });
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const items = getMenuItems();
    setMenuItems(items);
  }, []);

  const updateMenuItem = (id: string, updatedDetails: Partial<MenuItem>) => {
    const updatedItems = menuItems.map(item => 
      item.id === id ? { ...item, ...updatedDetails } : item
    );
    setMenuItems(updatedItems);
    saveMenuItems(updatedItems);
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await Swal.fire({
        title: 'Add Menu Item',
        text: 'Are you sure you want to add this menu item?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#F7DC6F',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add it!'
      });

      if (result.isConfirmed) {
        const itemToAdd = {
          ...newItem,
          id: Date.now().toString()
        };
        
        const updatedItems = [...menuItems, itemToAdd];
        setMenuItems(updatedItems);
        saveMenuItems(updatedItems);
        
        await Swal.fire({
          title: 'Added!',
          text: 'Menu item has been added successfully.',
          icon: 'success',
          confirmButtonColor: '#F7DC6F'
        });

        // Reset form
        setNewItem({
          id: '',
          menuId: Date.now().toString(), // Initialize with a unique menu ID
          name: '',
          description: '',
          price: 0,
          category: '',
          image: ''
        });
      }
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to add menu item.',
        icon: 'error',
        confirmButtonColor: '#F7DC6F'
      });
    }
  };

  const handleUpdateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const result = await Swal.fire({
        title: 'Update Menu Item',
        text: 'Are you sure you want to update this menu item?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#F7DC6F',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      });

      if (result.isConfirmed) {
        updateMenuItem(editingItem.id, editingItem);
        
        await Swal.fire({
          title: 'Updated!',
          text: 'Menu item has been updated successfully.',
          icon: 'success',
          confirmButtonColor: '#F7DC6F'
        });

        setEditingItem(null);
      }
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to update menu item.',
        icon: 'error',
        confirmButtonColor: '#F7DC6F'
      });
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: 'Delete Menu Item',
        text: 'Are you sure you want to delete this menu item? This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#F7DC6F',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        deleteMenuItem(id);
        setMenuItems(menuItems.filter(item => item.id !== id));
        
        await Swal.fire({
          title: 'Deleted!',
          text: 'Menu item has been deleted successfully.',
          icon: 'success',
          confirmButtonColor: '#F7DC6F'
        });
      }
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to delete menu item.',
        icon: 'error',
        confirmButtonColor: '#F7DC6F'
      });
    }
  };

  const handleGenerateQRCode = (item: MenuItem) => {
    navigate('/admin/dashboard/qrcode', { 
      state: { 
        menuItemId: item.id,
        menuId: item.menuId,
        name: item.name,
        price: item.price,
        description: item.description
      } 
    });
  };

  const handleGenerateMenuQRCode = () => {
    console.log('Generating QR Code for menu items:', menuItems); // Debug log
    if (menuItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Menu Items',
        text: 'Please add some menu items before generating a QR code.'
      });
      return;
    }
    
    navigate('/admin/dashboard/qrcode', { 
      state: { 
        allMenuItems: menuItems,
        isFullMenu: true
      } 
    });
  };

  return (
    <MenuContext.Provider value={{ updateMenuItem }}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Menu Items Management</h2>
          <button
            onClick={handleGenerateMenuQRCode}
            className="bg-[#F7DC6F] text-black px-4 py-2 rounded hover:bg-[#F4D03F] flex items-center gap-2"
          >
            Generate Menu QR Code
          </button>
        </div>
        
        {/* Add/Edit Form */}
        <form onSubmit={editingItem ? handleUpdateItem : handleAddItem} className="mb-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">
            {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={editingItem ? editingItem.name : newItem.name}
                onChange={(e) => editingItem 
                  ? setEditingItem({ ...editingItem, name: e.target.value })
                  : setNewItem({ ...newItem, name: e.target.value })
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                value={editingItem ? editingItem.category : newItem.category}
                onChange={(e) => editingItem
                  ? setEditingItem({ ...editingItem, category: e.target.value })
                  : setNewItem({ ...newItem, category: e.target.value })
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                value={editingItem ? editingItem.price : newItem.price}
                onChange={(e) => editingItem
                  ? setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })
                  : setNewItem({ ...newItem, price: parseFloat(e.target.value) })
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                required
                min="0"
                step="0.01"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const base64String = reader.result as string;
                        if (editingItem) {
                          setEditingItem({ ...editingItem, image: base64String });
                        } else {
                          setNewItem({ ...newItem, image: base64String });
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                />
              </div>
              {/* Image Preview */}
              {(editingItem?.image || newItem.image) && (
                <div className="mt-2">
                  <img
                    src={editingItem ? editingItem.image : newItem.image}
                    alt="Preview"
                    className="h-24 w-24 object-cover rounded"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = '/img/default-food.jpg'; // Fallback image
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={editingItem ? editingItem.description : newItem.description}
                onChange={(e) => editingItem
                  ? setEditingItem({ ...editingItem, description: e.target.value })
                  : setNewItem({ ...newItem, description: e.target.value })
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                required
                rows={3}
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end space-x-2">
            {editingItem && (
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
            >
              <FiPlus className="mr-2" />
              {editingItem ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>

        {/* Menu Items List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {menuItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-12 w-12 object-cover rounded"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = '/img/default-food.jpg'; // Fallback image
                        }}
                      />
                    ) : (
                      <img 
                        src="/img/default-food.jpg" 
                        alt={item.name} 
                        className="h-12 w-12 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">ksh{item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-2 text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 />
                      </button>
                      <button
                        onClick={() => handleGenerateQRCode(item)}
                        className="p-2 text-[#F7DC6F] hover:text-[#F7DC6F]"
                      >
                        Generate QR
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MenuContext.Provider>
  );
};

export default MenuItemsPage;
