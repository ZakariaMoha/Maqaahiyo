import { useState } from 'react';
import { X } from 'lucide-react';
import { MenuItem } from '../../types';
import { saveOrder } from '../../utils/orderUtils';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem;
}

export default function OrderModal({ isOpen, onClose, item }: OrderModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = async () => {
    if (!customerName.trim()) {
      await Swal.fire({
        title: "Missing Name",
        text: "Please enter your name",
        icon: "warning",
        confirmButtonColor: '#F7DC6F',
        confirmButtonText: 'OK'
      });
      return false;
    }

    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      await Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address",
        icon: "warning",
        confirmButtonColor: '#F7DC6F',
        confirmButtonText: 'OK'
      });
      return false;
    }

    if (!customerPhone.trim() || !/^\+?[\d\s-]{10,}$/.test(customerPhone)) {
      await Swal.fire({
        title: "Invalid Phone Number",
        text: "Please enter a valid phone number",
        icon: "warning",
        confirmButtonColor: '#F7DC6F',
        confirmButtonText: 'OK'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!await validateForm()) {
      return;
    }

    // Ask for confirmation before placing order
    const confirmResult = await Swal.fire({
      title: 'Confirm Your Order',
      html: `
        <div class="space-y-3">
          <div class="text-left bg-gray-50 p-4 rounded-lg space-y-2">
            <p class="font-semibold text-lg">${item.name}</p>
            <p><strong>Quantity:</strong> ${quantity}</p>
            <p><strong>Price:</strong> KES ${(item.price * quantity).toFixed(2)}</p>
            ${specialInstructions ? `<p class="text-sm"><strong>Special Instructions:</strong><br/>${specialInstructions}</p>` : ''}
          </div>
          <p class="text-sm text-gray-600">Order will be prepared upon confirmation</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#F7DC6F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Place Order',
      cancelButtonText: 'Cancel'
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    setIsSubmitting(true);

    try {
      const order = {
        customerName,
        customerEmail,
        customerPhone,
        specialInstructions,
        items: [{
          name: item.name,
          quantity,
          price: item.price
        }],
        total: item.price * quantity
      };

      await saveOrder(order);
      
      // Show success message with enhanced styling
      await Swal.fire({
        title: 'Order Placed Successfully! 🎉',
        html: `
          <div class="space-y-4">
            <p class="text-green-600">✓ Your order has been confirmed</p>
            <div class="text-left bg-gray-50 p-4 rounded-lg space-y-2">
              <p class="font-semibold">Order Summary:</p>
              <p><strong>Item:</strong> ${item.name}</p>
              <p><strong>Quantity:</strong> ${quantity}</p>
              <p><strong>Total:</strong> KES ${(item.price * quantity).toFixed(2)}</p>
              <p><strong>Name:</strong> ${customerName}</p>
              <p><strong>Contact:</strong> ${customerPhone}</p>
              ${specialInstructions ? `<p class="text-sm mt-2"><strong>Special Instructions:</strong><br/>${specialInstructions}</p>` : ''}
            </div>
            <div class="mt-4 text-sm text-gray-600">
              <p>A confirmation email has been sent to ${customerEmail}</p>
              <p class="mt-2">Estimated preparation time: 20-30 minutes</p>
            </div>
          </div>
        `,
        icon: 'success',
        confirmButtonColor: '#F7DC6F',
        confirmButtonText: 'Great!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      
      // Reset form and close modal
      setQuantity(1);
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setSpecialInstructions('');
      onClose();
    } catch (error) {
      await Swal.fire({
        title: 'Order Failed',
        html: `
          <div class="space-y-3">
            <p class="text-red-600">There was a problem processing your order</p>
            <p class="text-sm text-gray-600">Please try again or contact us directly:</p>
            <p class="text-sm font-semibold">Phone: (555) 123-4567</p>
          </div>
        `,
        icon: 'error',
        confirmButtonColor: '#F7DC6F',
        confirmButtonText: 'Try Again'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-[#F7DC6F] mb-4">Place Order</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item
            </label>
            <div className="text-gray-900">{item.name}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F7DC6F]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F7DC6F]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F7DC6F]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F7DC6F]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Instructions
            </label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F7DC6F]"
              rows={3}
            />
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total:</span>
              <span className="text-[#F7DC6F] font-bold">KES {(item.price * quantity).toFixed(2)}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#F7DC6F] text-black py-2 px-4 rounded-md hover:bg-[#F2C464] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
