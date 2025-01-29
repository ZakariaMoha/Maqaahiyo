import ReservationForm from '../components/reservation/ReservationForm';
import ReservationInfo from '../components/reservation/ReservationInfo';

export default function ReservationPage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative h-[40vh] bg-black">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="Restaurant interior"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/25" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F7DC6F] mb-6">
                Make a Reservation
              </h1>
              <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
                Book your table and experience our exceptional cuisine
              </p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <ReservationForm />
          <ReservationInfo />
        </div>
      </div>
    </div>
  );
}