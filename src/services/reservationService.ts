import Swal from 'sweetalert2';
import { NotificationService } from './notificationService';

export interface Reservation {
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

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
}

export const submitReservation = async (data: ReservationData): Promise<boolean> => {
  try {
    // Get existing reservations
    const existingReservations = JSON.parse(localStorage.getItem('rcs_reservations') || '[]');
    
    // Create new reservation with status and ID
    const newReservation: Reservation = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Add to existing reservations
    const updatedReservations = [newReservation, ...existingReservations];
    localStorage.setItem('rcs_reservations', JSON.stringify(updatedReservations));

    // Show success message with enhanced styling
    await Swal.fire({
      title: "Table Reserved!",
      html: `
        <div class="space-y-2">
          <p>Your reservation has been successfully submitted.</p>
          <p class="text-sm text-gray-600">Reservation Details:</p>
          <div class="text-left bg-gray-50 p-4 rounded-lg space-y-1 text-sm">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${data.time}</p>
            <p><strong>Guests:</strong> ${data.guests}</p>
          </div>
        </div>
      `,
      icon: "success",
      confirmButtonColor: '#F7DC6F',
      confirmButtonText: 'Great!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });

    return true;
  } catch (error) {
    console.error('Error submitting reservation:', error);
    
    await Swal.fire({
      title: "Reservation Failed",
      text: "We couldn't process your reservation. Please try again or contact us directly.",
      icon: "error",
      confirmButtonColor: '#F7DC6F',
      confirmButtonText: 'Try Again'
    });

    return false;
  }
};

export const updateReservationStatus = async (
  reservation: Reservation,
  newStatus: Reservation['status']
): Promise<boolean> => {
  try {
    console.log('Updating reservation status:', { reservation, newStatus });

    // Get existing reservations
    const savedReservations = localStorage.getItem('rcs_reservations');
    const reservations: Reservation[] = savedReservations ? JSON.parse(savedReservations) : [];
    
    // Update reservation status
    const updatedReservations = reservations.map(r => 
      r.id === reservation.id ? { ...r, status: newStatus } : r
    );
    
    // Save to localStorage
    localStorage.setItem('rcs_reservations', JSON.stringify(updatedReservations));

    // Show notification about the status change
    if (newStatus === 'confirmed') {
        const notificationResult = await NotificationService.showNotification(
            'Reservation Confirmed',
            {
                body: `Hello ${reservation.name}, your table reservation has been confirmed. Welcome to Jifora!`,
                requireInteraction: true,
                vibrate: [200, 100, 200]
            }
        );

        if (!notificationResult) {
            console.log('Failed to show notification');
            // Fallback to alert if notification fails
            Swal.fire({
                title: 'Reservation Confirmed',
                text: `Hello ${reservation.name}, your table reservation has been confirmed. Welcome to Jifora!`,
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000
            });
        }
    }

    return true;
  } catch (error) {
    console.error('Error updating reservation status:', error);
    return false;
  }
};
