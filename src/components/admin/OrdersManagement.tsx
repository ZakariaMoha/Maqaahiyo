import { useState } from 'react';
import { FiMoreVertical, FiCheck, FiX, FiClock } from 'react-icons/fi';
import { updateOrderStatus, Order } from '../../services/orderService';
import Swal from 'sweetalert2';

interface Order {
  id: string;
  customerName: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  orderDate: string;
}

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('rcs_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-[#F7DC6F] text-black';
      case 'processing':
        return 'bg-blue-500 text-white';
      case 'completed':
        return 'bg-green-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    try {
      const success = await updateOrderStatus(order, newStatus);
      
      if (success) {
        const updatedOrders = orders.map(o => 
          o.id === orderId ? { ...o, status: newStatus } : o
        );
        setOrders(updatedOrders);

        // Show success message
        await Swal.fire({
          title: 'Status Updated',
          text: `Order status has been updated to ${newStatus}`,
          icon: 'success',
          confirmButtonColor: '#F7DC6F'
        });
      } else {
        // Show error message
        await Swal.fire({
          title: 'Update Failed',
          text: 'Failed to update order status. Please try again.',
          icon: 'error',
          confirmButtonColor: '#F7DC6F'
        });
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      await Swal.fire({
        title: 'Error',
        text: 'An error occurred while updating the order status.',
        icon: 'error',
        confirmButtonColor: '#F7DC6F'
      });
    }
  };

  const filteredOrders = orders.filter(order => 
    selectedStatus === 'all' ? true : order.status === selectedStatus
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#F7DC6F] mb-4">Orders Management</h2>
        <div className="flex space-x-4">
          {['all', 'pending', 'processing', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedStatus === status
                  ? 'bg-[#F7DC6F] text-black'
                  : 'bg-white text-gray-600 hover:bg-[#F7DC6F]/10'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  #{order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="max-w-xs">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.name} x{item.quantity}</span>
                        <span>KES {item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  KES {order.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex space-x-2">
                    {order.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(order.id, 'processing')}
                          className="text-blue-500 hover:text-blue-700"
                          title="Start Processing"
                        >
                          <FiClock className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(order.id, 'cancelled')}
                          className="text-red-500 hover:text-red-700"
                          title="Cancel Order"
                        >
                          <FiX className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    {order.status === 'processing' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'completed')}
                        className="text-green-500 hover:text-green-700"
                        title="Mark as Completed"
                      >
                        <FiCheck className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
