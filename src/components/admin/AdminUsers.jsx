import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../utils/axios'; // استخدم الـ axios instance
import { motion } from 'framer-motion';
import { 
  FaUsers, FaUserCircle, FaBuilding, FaEnvelope, 
  FaPhone, FaTrash, FaSearch 
} from 'react-icons/fa';

const AdminUsers = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      // Set empty array if fails
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Delete this user?')) {
      try {
        await api.delete(`/api/users/${id}`);
        alert(lang === 'ar' ? 'تم الحذف بنجاح' : 'Deleted successfully');
        fetchUsers();
      } catch (error) {
        console.error('Failed to delete:', error);
        alert(lang === 'ar' ? 'فشل الحذف' : 'Failed to delete');
      }
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchTerm || 
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || user.userType === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: users.length,
    individuals: users.filter(u => u.userType === 'individual').length,
    companies: users.filter(u => u.userType === 'company').length,
    admins: users.filter(u => u.role === 'admin').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6">
          <div className="text-3xl font-bold">{stats.total}</div>
          <div className="text-blue-100 mt-1">
            {lang === 'ar' ? 'إجمالي المستخدمين' : 'Total Users'}
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6">
          <div className="text-3xl font-bold">{stats.individuals}</div>
          <div className="text-green-100 mt-1">{lang === 'ar' ? 'أفراد' : 'Individuals'}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6">
          <div className="text-3xl font-bold">{stats.companies}</div>
          <div className="text-purple-100 mt-1">{lang === 'ar' ? 'شركات' : 'Companies'}</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6">
          <div className="text-3xl font-bold">{stats.admins}</div>
          <div className="text-orange-100 mt-1">{lang === 'ar' ? 'مسؤولين' : 'Admins'}</div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={lang === 'ar' ? 'بحث...' : 'Search...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'individual', 'company'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  filterType === type ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {type === 'all' ? (lang === 'ar' ? 'الكل' : 'All') 
                  : type === 'individual' ? (lang === 'ar' ? 'أفراد' : 'Individuals')
                  : (lang === 'ar' ? 'شركات' : 'Companies')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <FaUsers className="text-6xl mx-auto mb-4 opacity-30" />
            <p className="text-xl">{lang === 'ar' ? 'لا توجد مستخدمين' : 'No users found'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-primary to-dark text-white">
                <tr>
                  <th className="px-6 py-4 text-left">{lang === 'ar' ? 'الاسم' : 'Name'}</th>
                  <th className="px-6 py-4 text-left">{lang === 'ar' ? 'البريد' : 'Email'}</th>
                  <th className="px-6 py-4 text-left">{lang === 'ar' ? 'النوع' : 'Type'}</th>
                  <th className="px-6 py-4 text-left">{lang === 'ar' ? 'الدور' : 'Role'}</th>
                  <th className="px-6 py-4 text-center">{lang === 'ar' ? 'إجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-dark text-white flex items-center justify-center font-bold">
                          {(user.firstName?.[0] || user.companyName?.[0] || 'U').toUpperCase()}
                        </div>
                        <div className="font-semibold">{user.firstName || user.companyName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user.userType === 'individual' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.userType === 'individual' ? (lang === 'ar' ? 'فرد' : 'Individual') : (lang === 'ar' ? 'شركة' : 'Company')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role === 'admin' ? (lang === 'ar' ? 'مسؤول' : 'Admin') : (lang === 'ar' ? 'مستخدم' : 'User')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;