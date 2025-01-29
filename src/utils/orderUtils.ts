export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  orderDate: string;
  customerEmail?: string;
  customerPhone?: string;
  specialInstructions?: string;
}

export const saveOrder = (order: Omit<Order, 'id' | 'status' | 'orderDate'>) => {
  // Get existing orders
  const existingOrders = JSON.parse(localStorage.getItem('rcs_orders') || '[]');
  
  // Create new order with generated ID and default status
  const newOrder: Order = {
    ...order,
    id: generateOrderId(),
    status: 'pending',
    orderDate: new Date().toISOString()
  };

  // Add to beginning of array to show newest first
  const updatedOrders = [newOrder, ...existingOrders];
  
  // Save to localStorage
  localStorage.setItem('rcs_orders', JSON.stringify(updatedOrders));
  
  return newOrder;
};

const generateOrderId = () => {
  // Get existing orders
  const existingOrders = JSON.parse(localStorage.getItem('rcs_orders') || '[]');
  
  // Find the highest order number
  const highestId = existingOrders.reduce((max: number, order: Order) => {
    const orderNum = parseInt(order.id.replace('ORD', ''));
    return orderNum > max ? orderNum : max;
  }, 0);
  
  // Generate new order number
  const newOrderNum = highestId + 1;
  
  // Pad with zeros to ensure consistent length
  return `ORD${String(newOrderNum).padStart(4, '0')}`;
};
