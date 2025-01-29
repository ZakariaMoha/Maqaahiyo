import { FC, useState, FormEvent } from 'react';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { addContactMessage } from '../services/contactService';
import ContactBanner from '../components/contact/ContactBanner';

interface FormData {
  name: string;
  phone: string;
  message: string;
}

const ContactPage: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePhone = (phone: string): boolean => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;
    return re.test(phone);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate name
    if (!formData.name.trim()) {
      await Swal.fire({
        title: "Missing Name",
        text: "Please enter your name",
        icon: "warning",
        confirmButtonColor: '#F7DC6F',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Validate phone
    if (!formData.phone.trim() || !validatePhone(formData.phone)) {
      await Swal.fire({
        title: "Invalid Phone Number",
        text: "Please enter a valid phone number",
        icon: "warning",
        confirmButtonColor: '#F7DC6F',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Validate message
    if (!formData.message.trim()) {
      await Swal.fire({
        title: "Missing Message",
        text: "Please enter your message",
        icon: "warning",
        confirmButtonColor: '#F7DC6F',
        confirmButtonText: 'OK'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await addContactMessage(formData);
      
      // Show success message with enhanced styling
      await Swal.fire({
        title: 'Message Sent Successfully!',
        html: `
          <div class="space-y-3">
            <p class="text-green-600">✓ Your message has been received</p>
            <div class="text-left bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
              <p><strong>Name:</strong> ${formData.name}</p>
              <p><strong>Phone:</strong> ${formData.phone}</p>
              <p class="text-gray-600 text-xs mt-2">We'll get back to you within 24 hours</p>
            </div>
          </div>
        `,
        icon: 'success',
        confirmButtonColor: '#F7DC6F',
        confirmButtonText: 'Done',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });

      setFormData({
        name: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      await Swal.fire({
        title: "Message Not Sent",
        html: `
          <div class="space-y-2">
            <p class="text-red-600">There was a problem sending your message</p>
            <p class="text-sm text-gray-600">Please try again or contact us directly:</p>
            <p class="text-sm font-semibold">Phone: (555) 123-4567</p>
          </div>
        `,
        icon: "error",
        confirmButtonColor: '#F7DC6F',
        confirmButtonText: 'Try Again'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ContactBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="bg-[#F7DC6F]/10 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-[#F7DC6F]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Visit Us</h3>
                  <p className="text-gray-600 mt-1">
                    123 Culinary Street<br />
                    Foodie City, FC 12345
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="bg-[#F7DC6F]/10 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-[#F7DC6F]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
                  <p className="text-gray-600 mt-1">
                    (555) 123-4567
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="bg-[#F7DC6F]/10 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-[#F7DC6F]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Hours</h3>
                  <p className="text-gray-600 mt-1">
                    Mon-Sun: 7:00 AM - 10:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="bg-[#F7DC6F]/10 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-[#F7DC6F]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
                  <p className="text-gray-600 mt-1">
                    info@jiforacafe.com<br />
                    support@jiforacafe.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-[#F7DC6F] mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F7DC6F] focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F7DC6F] focus:border-transparent"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F7DC6F] focus:border-transparent"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F7DC6F] text-black py-3 px-6 rounded-md hover:bg-[#F2C464] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
