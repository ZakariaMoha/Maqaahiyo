import { Button } from '../ui/Button';
import { MenuCategory } from '../../types/menu';

interface MenuFilterProps {
  categories: MenuCategory[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export default function MenuFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: MenuFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-8">
      <Button
        variant={selectedCategory === null ? 'primary' : 'outline'}
        onClick={() => onSelectCategory(null)}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'primary' : 'outline'}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}