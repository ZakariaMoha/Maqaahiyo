import React, { useState, useEffect } from 'react';
import { FiCheck, FiX, FiTrash2, FiCalendar, FiClock, FiUsers } from 'react-icons/fi';
import { updateReservationStatus, Reservation } from '../../services/reservationService';
import Swal from 'sweetalert2';

const ReservationPage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const storedReservations = localStorage.getItem('rcs_reservations');
    if (storedReservations) {
      setReservations(JSON.parse(storedReservations));
    }
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'confirmed' | 'cancelled') => {
    const reservation = reservations.find(r => r.id === id);
    if (!reservation) return;

    try {
      const success = await updateReservationStatus(reservation, newStatus);
      
      if (success) {
        const updatedReservations = reservations.map(r => 
          r.id === id ? { ...r, status: newStatus } : r
        );
        setReservations(updatedReservations);
        localStorage.setItem('rcs_reservations', JSON.stringify(updatedReservations));

        await Swal.fire({
          title: 'Status Updated',
          text: `Reservation status has been updated to ${newStatus}${newStatus === 'confirmed' ? '. An SMS confirmation has been sent to the customer.' : ''}`,
          icon: 'success',
          confirmButtonColor: '#F7DC6F'
        });
      } else {
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
    const updatedReservations = reservations.filter(r => r.id !== id);
    setReservations(updatedReservations);
    localStorage.setItem('rcs_reservations', JSON.stringify(updatedReservations));
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const formatTime = (time: string) => {
    return time;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Reservations</h2>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guests
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
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">{reservation.name}</div>
                      <div className="text-sm text-gray-500">{reservation.email}</div>
                      <div className="text-sm text-gray-500">{reservation.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <FiCalendar className="text-gray-400" />
                      <span className="text-sm text-gray-900">{formatDate(reservation.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <FiClock className="text-gray-400" />
                      <span className="text-sm text-gray-500">{formatTime(reservation.time)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <FiUsers className="text-gray-400" />
                      <span className="text-sm text-gray-900">{reservation.guests}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      reservation.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : reservation.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {reservation.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(reservation.id, 'confirmed')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <FiCheck className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(reservation.id, 'cancelled')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiX className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(reservation.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
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
