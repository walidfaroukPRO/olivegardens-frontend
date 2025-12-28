import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { 
  FaBox, FaEnvelope, FaEnvelopeOpen, FaUsers, FaImage, FaChartLine, 
  FaCheckCircle, FaExclamationCircle, FaArrowUp, FaArrowDown 
} from 'react-icons/fa';

const AdminOverview = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalUsers: 0,
    totalGallery: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

const fetchStats = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    // Fetch all stats with error handling for each
    const results = await Promise.allSettled([
      axios.get('/api/products', { headers }),
      axios.get('/api/contact', { headers }), // ✅ شلنا /messages
      axios.get('/api/users', { headers }),
      axios.get('/api/gallery', { headers })
    ]);

    // Process products
    const products = results[0].status === 'fulfilled' ? results[0].value.data : [];
    
    // Process messages
    const messages = results[1].status === 'fulfilled' ? results[1].value.data : [];
    
    // Process users
    const users = results[2].status === 'fulfilled' ? results[2].value.data : [];
    
    // Process gallery
    const gallery = results[3].status === 'fulfilled' ? results[3].value.data : [];

    setStats({
      totalProducts: products.length,
      activeProducts: products.filter(p => p.isActive).length,
      totalMessages: messages.length,
      unreadMessages: messages.filter(m => m.status === 'pending').length, // ✅ غيرنا !m.isRead لـ m.status === 'pending'
      totalUsers: users.length,
      totalGallery: gallery.length
    });

  } catch (error) {
    setError('Failed to load statistics');
  } finally {
    setLoading(false);
  }
};
  const statCards = [
    {
      title: { en: 'Total Products', ar: 'إجمالي المنتجات', es: 'Productos Totales' },
      value: stats.totalProducts,
      icon: <FaBox />,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: { en: 'Active Products', ar: 'المنتجات النشطة', es: 'Productos Activos' },
      value: stats.activeProducts,
      icon: <FaCheckCircle />,
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: { en: 'Total Messages', ar: 'إجمالي الرسائل', es: 'Mensajes Totales' },
      value: stats.totalMessages,
      icon: <FaEnvelope />,
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: { en: 'Unread Messages', ar: 'رسائل غير مقروءة', es: 'Mensajes No Leídos' },
      value: stats.unreadMessages,
      icon: <FaExclamationCircle />,
      color: 'from-red-500 to-red-600',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: { en: 'Total Users', ar: 'إجمالي المستخدمين', es: 'Usuarios Totales' },
      value: stats.totalUsers,
      icon: <FaUsers />,
      color: 'from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: { en: 'Gallery Items', ar: 'عناصر المعرض', es: 'Elementos de Galería' },
      value: stats.totalGallery,
      icon: <FaImage />,
      color: 'from-pink-500 to-pink-600',
      textColor: 'text-pink-600',
      bgColor: 'bg-pink-50'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <FaExclamationCircle className="text-5xl text-red-500 mx-auto mb-4" />
        <p className="text-red-700 text-lg">{error}</p>
        <button 
          onClick={fetchStats}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          {lang === 'ar' ? 'إعادة المحاولة' : 'Retry'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-primary to-dark rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">
          {lang === 'ar' ? '👋 مرحباً بك في لوحة التحكم' : '👋 Welcome to Admin Dashboard'}
        </h2>
        <p className="text-gray-200">
          {lang === 'ar' 
            ? 'إليك نظرة عامة على نظامك' 
            : 'Here\'s an overview of your system'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <span className={`text-2xl ${stat.textColor}`}>{stat.icon}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${stat.color} text-white`}>
                  {lang === 'ar' ? 'مباشر' : 'Live'}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.title[lang]}</div>
            </div>
            <div className={`h-1 bg-gradient-to-r ${stat.color}`}></div>
          </div>
        ))}
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaBox className="text-primary" />
            {lang === 'ar' ? 'إحصائيات المنتجات' : 'Products Statistics'}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
                  <FaCheckCircle className="text-xl" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">{lang === 'ar' ? 'نشط' : 'Active'}</div>
                  <div className="text-2xl font-bold text-gray-800">{stats.activeProducts}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">{lang === 'ar' ? 'من الإجمالي' : 'of total'}</div>
                <div className="text-lg font-semibold text-green-600">
                  {stats.totalProducts > 0 ? Math.round((stats.activeProducts / stats.totalProducts) * 100) : 0}%
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white">
                  <FaExclamationCircle className="text-xl" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">{lang === 'ar' ? 'غير نشط' : 'Inactive'}</div>
                  <div className="text-2xl font-bold text-gray-800">{stats.totalProducts - stats.activeProducts}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">{lang === 'ar' ? 'من الإجمالي' : 'of total'}</div>
                <div className="text-lg font-semibold text-red-600">
                  {stats.totalProducts > 0 ? Math.round(((stats.totalProducts - stats.activeProducts) / stats.totalProducts) * 100) : 0}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaEnvelope className="text-primary" />
            {lang === 'ar' ? 'حالة الرسائل' : 'Messages Status'}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                  <FaEnvelopeOpen className="text-xl" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">{lang === 'ar' ? 'مقروءة' : 'Read'}</div>
                  <div className="text-2xl font-bold text-gray-800">{stats.totalMessages - stats.unreadMessages}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">{lang === 'ar' ? 'من الإجمالي' : 'of total'}</div>
                <div className="text-lg font-semibold text-blue-600">
                  {stats.totalMessages > 0 ? Math.round(((stats.totalMessages - stats.unreadMessages) / stats.totalMessages) * 100) : 0}%
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">{lang === 'ar' ? 'غير مقروءة' : 'Unread'}</div>
                  <div className="text-2xl font-bold text-gray-800">{stats.unreadMessages}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">{lang === 'ar' ? 'من الإجمالي' : 'of total'}</div>
                <div className="text-lg font-semibold text-purple-600">
                  {stats.totalMessages > 0 ? Math.round((stats.unreadMessages / stats.totalMessages) * 100) : 0}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-primary to-dark rounded-2xl shadow-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-6">
          {lang === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-all cursor-pointer">
            <FaBox className="text-3xl mb-3" />
            <div className="font-semibold">{lang === 'ar' ? 'إضافة منتج' : 'Add Product'}</div>
            <div className="text-sm text-gray-300 mt-1">{stats.totalProducts} {lang === 'ar' ? 'منتج' : 'products'}</div>
          </div>
          <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-all cursor-pointer">
            <FaEnvelope className="text-3xl mb-3" />
            <div className="font-semibold">{lang === 'ar' ? 'عرض الرسائل' : 'View Messages'}</div>
            <div className="text-sm text-gray-300 mt-1">{stats.unreadMessages} {lang === 'ar' ? 'جديدة' : 'new'}</div>
          </div>
          <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-all cursor-pointer">
            <FaImage className="text-3xl mb-3" />
            <div className="font-semibold">{lang === 'ar' ? 'إدارة المعرض' : 'Manage Gallery'}</div>
            <div className="text-sm text-gray-300 mt-1">{stats.totalGallery} {lang === 'ar' ? 'صورة' : 'images'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;