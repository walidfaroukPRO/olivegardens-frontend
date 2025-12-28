import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaTachometerAlt, FaBox, FaEnvelope, FaImage, FaUsers,
  FaCog, FaSignOutAlt, FaBars, FaTimes, FaFileAlt
} from 'react-icons/fa';

// Admin subcomponents
import AdminProducts from '../components/admin/AdminProducts';
import AdminMessages from '../components/admin/AdminMessages';
import AdminGallery from '../components/admin/AdminGallery';
import AdminUsers from '../components/admin/AdminUsers';
import AdminOverview from '../components/admin/AdminOverview';

/**
 * Improved Admin Dashboard
 * - Cleaner structure with MenuItem subcomponent
 * - Responsive sidebar (auto-collapses on small screens)
 * - Accessible buttons (aria, keyboard focus)
 * - Memoized menu configuration
 * - Lighter, consistent Tailwind classes and transitions
 */

const MenuItem = ({ id, icon, label, active, onClick, sidebarOpen }) => {
  return (
    <button
      aria-pressed={active}
      onClick={() => onClick(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
        ${active ? 'bg-white/20 text-white shadow-lg' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
      title={label}
    >
      <span className="text-xl flex-shrink-0">{icon}</span>
      {sidebarOpen && <span className="font-medium truncate">{label}</span>}
    </button>
  );
};

const AdminDashboard = () => {
  const { isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';

  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // default open on desktop, collapsed on small screens
    return window.innerWidth >= 1024;
  });

  // Close sidebar automatically on small screens when route changes or on mount if small
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  const menuItems = useMemo(() => ([
    {
      id: 'overview',
      icon: <FaTachometerAlt />,
      label: { en: 'Overview', ar: 'نظرة عامة', es: 'Resumen' }
    },
    {
      id: 'products',
      icon: <FaBox />,
      label: { en: 'Products', ar: 'المنتجات', es: 'Productos' }
    },
    {
      id: 'messages',
      icon: <FaEnvelope />,
      label: { en: 'Messages', ar: 'الرسائل', es: 'Mensajes' }
    },
    {
      id: 'gallery',
      icon: <FaImage />,
      label: { en: 'Gallery', ar: 'المعرض', es: 'Galería' }
    },
    {
      id: 'users',
      icon: <FaUsers />,
      label: { en: 'Users', ar: 'المستخدمين', es: 'Usuarios' }
    },
    {
      id: 'content',
      icon: <FaFileAlt />,
      label: { en: 'CMS', ar: 'المحتوى', es: 'Contenido' }
    }
  ]), []);

  // handle menu click (centralized)
  const handleMenuClick = useCallback((id) => {
    if (id === 'content') {
      navigate('/cms');
    } else {
      setActiveTab(id);
      // close sidebar on mobile for better UX
      if (window.innerWidth < 1024) setSidebarOpen(false);
    }
  }, [navigate]);

  // helper for localized label
  const tLabel = (item) => item.label[lang] ?? item.label.en;

  const initials = useMemo(() => {
    const firstChar = (user?.firstName?.[0] || user?.companyName?.[0] || 'A');
    return firstChar.toUpperCase();
  }, [user]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        aria-label="Admin sidebar"
        className={`fixed inset-y-0 left-0 z-40 transform transition-all duration-300
          ${sidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-0'}
          bg-gradient-to-b from-primary to-dark text-white overflow-hidden shadow-lg`}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          {sidebarOpen ? (
            <div>
              <h2 className="text-lg font-bold leading-none">OliveGardens</h2>
              <p className="text-xs text-gray-300">{lang === 'ar' ? 'لوحة التحكم' : 'Admin Panel'}</p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center font-bold">OG</div>
            </div>
          )}

          <button
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            onClick={() => setSidebarOpen(prev => !prev)}
            className="p-2 rounded-md hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/30"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* User Info */}
        {sidebarOpen && (
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-xl font-bold"
                aria-hidden
              >
                {initials}
              </div>
              <div className="min-w-0">
                <div className="font-semibold truncate">{user?.firstName || user?.companyName || 'Admin'}</div>
                <div className="text-sm text-gray-300">{lang === 'ar' ? 'مسؤول' : 'Administrator'}</div>
              </div>
            </div>
          </div>
        )}

        {/* Menu */}
        <nav className="p-4 space-y-2 overflow-y-auto" role="navigation" aria-label="Main menu">
          {menuItems.map(item => (
            <MenuItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              label={tLabel(item)}
              active={activeTab === item.id}
              onClick={handleMenuClick}
              sidebarOpen={sidebarOpen}
            />
          ))}
        </nav>

        {/* Footer actions */}
        <div className="absolute bottom-6 left-0 right-0 px-4">
          <button
            onClick={() => navigate('/settings')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all mb-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/30"
          >
            <FaCog className="text-xl" />
            {sidebarOpen && <span className="font-medium">{lang === 'ar' ? 'الإعدادات' : 'Settings'}</span>}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
            aria-label="Logout"
          >
            <FaSignOutAlt className="text-xl" />
            {sidebarOpen && <span className="font-medium">{lang === 'ar' ? 'تسجيل خروج' : 'Logout'}</span>}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <main className={`flex-1 min-h-screen transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} ml-0`}>
        {/* Topbar (sticky) */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 p-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {menuItems.find(m => m.id === activeTab)?.label[lang] ?? menuItems[0].label[lang]}
            </h1>
            <p className="text-sm text-gray-500">
              {lang === 'ar' ? 'إدارة ومراقبة النظام' : 'Manage and monitor your system'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* quick actions - keep minimal */}
            <button
              onClick={() => { setActiveTab('products'); if (window.innerWidth < 1024) setSidebarOpen(false); }}
              className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition"
            >
              {lang === 'ar' ? 'المنتجات' : 'Products'}
            </button>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">{user?.email}</div>
            </div>
          </div>
        </div>

        {/* Page content container */}
        <div className="p-8">
          {/* Card container */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            {activeTab === 'overview' && <AdminOverview />}
            {activeTab === 'products' && <AdminProducts />}
            {activeTab === 'messages' && <AdminMessages />}
            {activeTab === 'gallery' && <AdminGallery />}
            {activeTab === 'users' && <AdminUsers />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
