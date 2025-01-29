import { NotificationService } from './notificationService';
import Swal from 'sweetalert2';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone?: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  orderDate: string;
}

export const updateOrderStatus = async (
  order: Order,
  newStatus: Order['status']
): Promise<boolean> => {
  try {
    // Get existing orders
    const savedOrders = localStorage.getItem('rcs_orders');
    const orders: Order[] = savedOrders ? JSON.parse(savedOrders) : [];
    
    // Update order status
    const updatedOrders = orders.map(o => 
      o.id === order.id ? { ...o, status: newStatus } : o
    );
    
    // Save to localStorage
    localStorage.setItem('rcs_orders', JSON.stringify(updatedOrders));

    // Show notification about the status change
    let title = '';
    let message = '';
    
    switch (newStatus) {
      case 'processing':
        title = 'Order Processing';
        message = `Hello ${order.customerName}, your order #${order.id} is now being processed. We'll notify you when it's ready!`;
        break;
      case 'completed':
        title = 'Order Ready';
        message = `Hello ${order.customerName}, your order #${order.id} is now ready for pickup. Thank you for choosing Jifora!`;
        break;
      case 'cancelled':
        title = 'Order Cancelled';
        message = `Hello ${order.customerName}, your order #${order.id} has been cancelled. Please contact us if you have any questions.`;
        break;
    }

    if (message) {
      const notificationResult = await NotificationService.showNotification(title, {
        body: message,
        requireInteraction: true,
        vibrate: [200, 100, 200]
      });

      if (!notificationResult) {
        // Fallback to SweetAlert if notification fails
        Swal.fire({
          title: title,
          text: message,
          icon: newStatus === 'cancelled' ? 'error' : 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000
        });
      }
    }

    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
};
