import React, { useState, useEffect } from 'react';
import { FiCheck, FiX, FiTrash2, FiCalendar, FiClock, FiUsers } from 'react-icons/fi';
import { updateReservationStatus, Reservation } from '../../services/reservationService';
import Swal from 'sweetalert2';

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
}

const ReservationPage: React.FC = () => {
  console.log('ReservationPage rendering');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    try {
      console.log('Loading reservations from localStorage');
      const storedReservations = localStorage.getItem('rcs_reservations');
      if (storedReservations) {
        const parsedReservations = JSON.parse(storedReservations);
        console.log('Loaded reservations:', parsedReservations);
        setReservations(parsedReservations);
      }
    } catch (error) {
      console.error('Error loading reservations:', error);
    }
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'confirmed' | 'cancelled') => {
    console.log('Updating reservation status:', id, newStatus); // Add debug logging
    const reservation = reservations.find(r => r.id === id);
    if (!reservation) return;

    try {
      const success = await updateReservationStatus(reservation, newStatus);
      
      if (success) {
        const updatedReservations = reservations.map(r => 
          r.id === id ? { ...r, status: newStatus } : r
        );
        setReservations(updatedReservations);

        // Show success message
        await Swal.fire({
          title: 'Status Updated',
          text: `Reservation status has been updated to ${newStatus}${newStatus === 'confirmed' ? '. An SMS confirmation has been sent to the customer.' : ''}`,
          icon: 'success',
          confirmButtonColor: '#F7DC6F'
        });
      } else {
        // Show error message
        await Swal.fire({
          title: 'Update Failed',
          text: 'Failed to update reservation status. Please try again.',
          icon: 'error',
          confirmButtonColor: '#F7DC6F'
        });
      }
    } catch (error) {
      console.error('Error updating reservation status:', error);
      await Swal.fire({
        title: 'Error',
        text: 'An error occurred while updating the reservation status.',
        icon: 'error',
        confirmButtonColor: '#F7DC6F'
      });
    }
  };

  const handleDelete = (id: string) => {
    console.log('Deleting reservation:', id); // Add debug logging
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      const updatedReservations = reservations.filter(reservation => reservation.id !== id);
      setReservations(updatedReservations);
      localStorage.setItem('rcs_reservations', JSON.stringify(updatedReservations));
    }
  };

  const filteredReservations = reservations
    .filter(reservation => {
      const matchesSearch = 
        reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.phone.includes(searchTerm);
      const matchesStatus = selectedStatus === 'all' || reservation.status === selectedStatus;
      const matchesDate = !dateFilter || reservation.date === dateFilter;
      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  console.log('Filtered reservations:', filteredReservations); // Add debug logging

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Reservation Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <input
              type="date"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reservation Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReservations.map(reservation => (
                <tr key={reservation.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{reservation.name}</div>
                    <div className="text-sm text-gray-500">{reservation.email}</div>
                    <div className="text-sm text-gray-500">{reservation.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-900">
                      <FiCalendar className="mr-2" />
                      {reservation.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiClock className="mr-2" />
                      {reservation.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiUsers className="mr-2" />
                      {reservation.guests} guests
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      {reservation.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(reservation.id, 'confirmed')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <FiCheck className="w-5 h-5" />
                        </button>
                      )}
                      {reservation.status !== 'cancelled' && (
                        <button
                          onClick={() => handleStatusChange(reservation.id, 'cancelled')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiX className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(reservation.id)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
