import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiGrid, FiImage, FiMessageSquare, FiCalendar, FiLogOut, FiShoppingBag } from 'react-icons/fi';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import MenuItemsPage from './MenuItemsPage';
import GalleryPage from './GalleryPage';
import ContactPage from './ContactPage';
import ReservationPage from './ReservationPage';
import OrdersManagement from '../../components/admin/OrdersManagement';
import QRCodeManagement from '../../components/admin/QRCodeManagement';

const AdminPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    menuItems: 0,
    gallery: 0,
    contacts: 0,
    reservations: 0,
    orders: 0
  });

  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentSection = () => {
    const path = location.pathname.split('/').pop() || '';
    console.log('Current path:', path);
    if (['menu', 'gallery', 'contact', 'reservation', 'orders', 'qrcode'].includes(path)) {
      return path;
    }
    return 'menu';
  };

  useEffect(() => {
    try {
      const menuItems = JSON.parse(localStorage.getItem('rcs_menu_items') || '[]').length;
      const gallery = JSON.parse(localStorage.getItem('rcs_gallery_items') || '[]').length;
      const contacts = JSON.parse(localStorage.getItem('rcs_contacts') || '[]').length;
      const reservations = JSON.parse(localStorage.getItem('rcs_reservations') || '[]').length;
      const orders = JSON.parse(localStorage.getItem('rcs_orders') || '[]').length;

      setStats({
        menuItems,
        gallery,
        contacts,
        reservations,
        orders
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      setStats({
        menuItems: 0,
        gallery: 0,
        contacts: 0,
        reservations: 0,
        orders: 0
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('rcs_admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-[#F7DC6F]">Jifora Admin</h1>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            <button
              onClick={() => navigate('/admin/dashboard/menu')}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                getCurrentSection() === 'menu'
                  ? 'bg-[#F7DC6F] text-black'
                  : 'text-gray-600 hover:bg-[#F7DC6F]/10'
              }`}
            >
              <FiGrid />
              <span>Menu Items</span>
              <span className={`ml-auto px-2 py-1 rounded-full text-sm ${
                getCurrentSection() === 'menu'
                  ? 'bg-black/10'
                  : 'bg-[#F7DC6F]/20'
              }`}>
                {stats.menuItems}
              </span>
            </button>

            <button
              onClick={() => navigate('/admin/dashboard/gallery')}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                getCurrentSection() === 'gallery'
                  ? 'bg-[#F7DC6F] text-black'
                  : 'text-gray-600 hover:bg-[#F7DC6F]/10'
              }`}
            >
              <FiImage />
              <span>Gallery</span>
              <span className={`ml-auto px-2 py-1 rounded-full text-sm ${
                getCurrentSection() === 'gallery'
                  ? 'bg-black/10'
                  : 'bg-[#F7DC6F]/20'
              }`}>
                {stats.gallery}
              </span>
            </button>

            <button
              onClick={() => navigate('/admin/dashboard/contact')}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                getCurrentSection() === 'contact'
                  ? 'bg-[#F7DC6F] text-black'
                  : 'text-gray-600 hover:bg-[#F7DC6F]/10'
              }`}
            >
              <FiMessageSquare />
              <span>Contact Messages</span>
              <span className={`ml-auto px-2 py-1 rounded-full text-sm ${
                getCurrentSection() === 'contact'
                  ? 'bg-black/10'
                  : 'bg-[#F7DC6F]/20'
              }`}>
                {stats.contacts}
              </span>
            </button>

            <button
              onClick={() => navigate('/admin/dashboard/reservation')}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                getCurrentSection() === 'reservation'
                  ? 'bg-[#F7DC6F] text-black'
                  : 'text-gray-600 hover:bg-[#F7DC6F]/10'
              }`}
            >
              <FiCalendar />
              <span>Reservations</span>
              <span className={`ml-auto px-2 py-1 rounded-full text-sm ${
                getCurrentSection() === 'reservation'
                  ? 'bg-black/10'
                  : 'bg-[#F7DC6F]/20'
              }`}>
                {stats.reservations}
              </span>
            </button>

            <button
              onClick={() => navigate('/admin/dashboard/orders')}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                getCurrentSection() === 'orders'
                  ? 'bg-[#F7DC6F] text-black'
                  : 'text-gray-600 hover:bg-[#F7DC6F]/10'
              }`}
            >
              <FiShoppingBag />
              <span>Orders</span>
              <span className={`ml-auto px-2 py-1 rounded-full text-sm ${
                getCurrentSection() === 'orders'
                  ? 'bg-black/10'
                  : 'bg-[#F7DC6F]/20'
              }`}>
                {stats.orders}
              </span>
            </button>

            <button
              onClick={() => navigate('/admin/dashboard/qrcode')}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                getCurrentSection() === 'qrcode'
                  ? 'bg-[#F7DC6F] text-black'
                  : 'text-gray-600 hover:bg-[#F7DC6F]/10'
              }`}
            >
              <FiImage />
              <span>Manage QR Codes</span>
            </button>
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`lg:ml-64 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="menu" element={<MenuItemsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="reservation" element={<ReservationPage />} />
            <Route path="orders" element={<OrdersManagement />} />
            <Route path="qrcode" element={<QRCodeManagement />} />
            <Route path="*" element={<Navigate to="menu" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
