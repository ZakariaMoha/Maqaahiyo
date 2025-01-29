import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import ReservationPage from './pages/ReservationPage';
import AboutPage from './pages/AboutPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPage from './pages/admin/AdminPage';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('rcs_admin_token') !== null;
  };

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/admin/login" />;
    }
    return <>{children}</>;
  };

  return (
    <Router>
      <ErrorBoundary>
        <div>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="menu" element={<MenuPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="reservation" element={<ReservationPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="admin">
              <Route path="login" element={<AdminLoginPage />} />
              <Route path="dashboard/*" element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;