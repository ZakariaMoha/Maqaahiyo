import { Phone } from 'lucide-react';

export default function FloatingHelpButton() {
  return (
    <a
      href="tel:+1234567890"  // Replace with your actual phone number
      className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center gap-2 z-50 animate-bounce"
    >
      <Phone className="w-5 h-5" />
      <span className="font-medium">How can I help you ?</span>
    </a>
  );
}
