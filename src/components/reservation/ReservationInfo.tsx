import { Clock, MapPin, Phone } from 'lucide-react';

export default function ReservationInfo() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-[#F7DC6F] mb-6">JIFORA Information</h2>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="bg-[#F7DC6F]/10 w-10 h-10 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-[#F7DC6F]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Opening Hours</h3>
            <ul className="space-y-1 text-gray-600">
              <li>Monday - Friday: 7:00 AM - 10:00 PM</li>
              <li>Saturday: 7:00 AM - 11:00 PM</li>
              <li>Sunday: 7:00 AM - 9:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="bg-[#F7DC6F]/10 w-10 h-10 rounded-lg flex items-center justify-center">
            <MapPin className="w-6 h-6 text-[#F7DC6F]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
            <p className="text-gray-600">
              123 Culinary Street<br />
              Foodie City, FC 12345
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="bg-[#F7DC6F]/10 w-10 h-10 rounded-lg flex items-center justify-center">
            <Phone className="w-6 h-6 text-[#F7DC6F]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
            <p className="text-gray-600">
              Phone: (555) 123-4567<br />
              Email: info@jiforacafe.com<br />
              Email: support@jiforacafe.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}