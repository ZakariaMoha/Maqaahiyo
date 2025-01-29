import { useState, useMemo } from 'react';
import { MenuItem } from '../types/menu';

export function useMenuFilter(items: MenuItem[]) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredItems = useMemo(() => {
    if (!selectedCategory) return items;
    return items.filter(item => item.categoryId === selectedCategory);
  }, [items, selectedCategory]);

  return {
    selectedCategory,
    setSelectedCategory,
    filteredItems,
  };
}