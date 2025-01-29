import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/reservation', label: 'Reservation' },
    { to: '/contact', label: 'Contact' },
  ];

  const contactInfo = [
    { icon: <MapPin className="w-5 h-5" />, text: '123 JIFORA Street, City, Country' },
    { icon: <Phone className="w-5 h-5" />, text: '+1 234 567 890' },
    { icon: <Mail className="w-5 h-5" />, text: 'info@jiforacafe.com, support@jiforacafe.com' },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-6 h-6" />, href: '#', label: 'Facebook' },
    { icon: <Instagram className="w-6 h-6" />, href: '#', label: 'Instagram' },
    { icon: <Twitter className="w-6 h-6" />, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold block">
              Jifora Cafe
            </Link>
            <p className="text-gray-400">
              Experience the perfect blend of tradition and innovation in every dish. Our commitment to quality and service makes every visit memorable.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-400">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-400">Opening Hours</h4>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <div>
                  <p>Monday - Friday</p>
                  <p className="text-white">11:00 AM - 10:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <div>
                  <p>Saturday</p>
                  <p className="text-white">10:00 AM - 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <div>
                  <p>Sunday</p>
                  <p className="text-white">10:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-400">Contact Us</h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-center space-x-3 text-gray-400">
                  <span className="text-primary-400">{info.icon}</span>
                  <span>{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} JiforaCafe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}