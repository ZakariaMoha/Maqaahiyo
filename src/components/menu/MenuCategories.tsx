import { MenuCategory } from '../../types/menu';

interface MenuCategoriesProps {
  categories: MenuCategory[];
}

export default function MenuCategories({ categories }: MenuCategoriesProps) {
  return (
    <div className="bg-white py-8 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8">
          {categories.map((category) => (
            <button
              key={category.id}
              className="text-black hover:text-[#F7DC6F] font-medium"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}