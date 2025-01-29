import { useMemo } from 'react';
import { MenuItem, MenuCategory } from '../types/menu';

export function useMenuData() {
  const categories: MenuCategory[] = useMemo(() => [
    { id: 'starters', name: 'Starters' },
    { id: 'mains', name: 'Main Courses' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'drinks', name: 'Beverages' },
  ], []);

  const items: MenuItem[] = useMemo(() => [
    {
      id: '1',
      categoryId: 'starters',
      name: 'Truffle Arancini',
      description: 'Crispy risotto balls with black truffle and mozzarella',
      price: 16,
      image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    },
    // Add more menu items...
  ], []);

  return { categories, items };
}