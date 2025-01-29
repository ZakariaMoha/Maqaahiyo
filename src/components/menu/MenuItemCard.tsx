import { MenuItem } from '../../types/menu';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-black">{item.name}</h3>
          <span className="text-[#F7DC6F] font-semibold">${item.price}</span>
        </div>
        <p className="text-black/70">{item.description}</p>
      </div>
    </div>
  );
}