import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../utils/axios';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminCategories = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    value: '',
    label: { en: '', ar: '', es: '' }
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/categories');
      setCategories(response.data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error(lang === 'ar' ? 'فشل تحميل التصنيفات' : 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        // Update
        await api.put(`/api/categories/${editingId}`, formData);
        toast.success(lang === 'ar' ? 'تم التحديث بنجاح' : 'Updated successfully');
      } else {
        // Create
        await api.post('/api/categories', formData);
        toast.success(lang === 'ar' ? 'تم الإضافة بنجاح' : 'Added successfully');
      }
      
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error('Failed to save category:', error);
      toast.error(lang === 'ar' ? 'فشل الحفظ' : 'Failed to save');
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setFormData({
      value: category.value,
      label: category.label
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm(lang === 'ar' ? 'هل أنت متأكد؟' : 'Are you sure?')) return;

    try {
      await api.delete(`/api/categories/${id}`);
      toast.success(lang === 'ar' ? 'تم الحذف بنجاح' : 'Deleted successfully');
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
      toast.error(lang === 'ar' ? 'فشل الحذف' : 'Failed to delete');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      value: '',
      label: { en: '', ar: '', es: '' }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaPlus className="text-primary" />
          {editingId 
            ? (lang === 'ar' ? 'تعديل التصنيف' : 'Edit Category')
            : (lang === 'ar' ? 'إضافة تصنيف جديد' : 'Add New Category')
          }
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Value (slug) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'ar' ? 'المعرّف (Value)' : 'Value (Slug)'}
            </label>
            <input
              type="text"
              required
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              placeholder="e.g., pickled-olives"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          {/* Labels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                English Label
              </label>
              <input
                type="text"
                required
                value={formData.label.en}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  label: { ...formData.label, en: e.target.value }
                })}
                placeholder="Pickled Olives"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Arabic Label
              </label>
              <input
                type="text"
                required
                value={formData.label.ar}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  label: { ...formData.label, ar: e.target.value }
                })}
                placeholder="زيتون مخلل"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-right"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spanish Label
              </label>
              <input
                type="text"
                required
                value={formData.label.es}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  label: { ...formData.label, es: e.target.value }
                })}
                placeholder="Aceitunas en Vinagre"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              <FaSave />
              {editingId 
                ? (lang === 'ar' ? 'تحديث' : 'Update')
                : (lang === 'ar' ? 'إضافة' : 'Add')
              }
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                <FaTimes />
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Categories List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {lang === 'ar' ? 'التصنيفات الحالية' : 'Current Categories'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition"
            >
              <div className="mb-3">
                <div className="text-sm text-gray-500 mb-1">Value:</div>
                <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                  {category.value}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-sm">
                  <span className="text-gray-500">EN:</span> {category.label.en}
                </div>
                <div className="text-sm text-right" dir="rtl">
                  <span className="text-gray-500">AR:</span> {category.label.ar}
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">ES:</span> {category.label.es}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
                >
                  <FaEdit />
                  {lang === 'ar' ? 'تعديل' : 'Edit'}
                </button>

                <button
                  onClick={() => handleDelete(category._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                >
                  <FaTrash />
                  {lang === 'ar' ? 'حذف' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {lang === 'ar' ? 'لا توجد تصنيفات' : 'No categories found'}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;