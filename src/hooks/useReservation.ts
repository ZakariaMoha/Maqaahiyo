import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
}

export function useReservation() {
  const submitReservation = async (data: ReservationData) => {
    try {
      // Get existing reservations
      const existingReservations = JSON.parse(localStorage.getItem('rcs_reservations') || '[]');
      
      // Create new reservation with status and ID
      const newReservation = {
        ...data,
        id: Math.random().toString(36).substring(2, 9),
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Add to existing reservations
      const updatedReservations = [...existingReservations, newReservation];
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

  return { submitReservation };
}