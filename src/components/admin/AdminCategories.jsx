import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // ✅ Matching the actual schema: label + value
  const [formData, setFormData] = useState({
    label: { en: '', ar: '', es: '' },
    value: '',
    image: '',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      console.log('Categories fetched:', response.data);
      setCategories(response.data.categories || response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load categories');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ Validation
    if (!formData.label.en || !formData.label.ar || !formData.label.es) {
      toast.error('Category label in all languages is required');
      return;
    }
    
    if (!formData.value) {
      toast.error('Category value is required');
      return;
    }
    
    console.log('Submitting:', formData);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login first');
        return;
      }
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      
      if (editingId) {
        // Update
        const response = await axios.put(
          `/api/categories/${editingId}`,
          formData,
          config
        );
        console.log('Update response:', response.data);
        toast.success('Category updated successfully');
      } else {
        // Create
        const response = await axios.post(
          '/api/categories',
          formData,
          config
        );
        console.log('Create response:', response.data);
        toast.success('Category created successfully');
      }
      
      // Reset form
      setFormData({
        label: { en: '', ar: '', es: '' },
        value: '',
        image: '',
        order: 0,
        isActive: true
      });
      setEditingId(null);
      setShowForm(false);
      
      // Refresh list
      fetchCategories();
      
    } catch (error) {
      console.error('Submit error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || 'Failed to save category';
      toast.error(errorMessage);
    }
  };

  const handleEdit = (category) => {
    setFormData({
      label: category.label || { en: '', ar: '', es: '' },
      value: category.value || '',
      image: category.image || '',
      order: category.order || 0,
      isActive: category.isActive !== undefined ? category.isActive : true
    });
    setEditingId(category._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/categories/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete category');
    }
  };

  const handleCancel = () => {
    setFormData({
      label: { en: '', ar: '', es: '' },
      value: '',
      image: '',
      order: 0,
      isActive: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  // Auto-generate value from English label
  const generateValue = (enLabel) => {
    return enLabel
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
        >
          <FaPlus />
          Add Category
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Category' : 'Add New Category'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Label Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label (English) *
                </label>
                <input
                  type="text"
                  value={formData.label.en}
                  onChange={(e) => {
                    const newLabel = e.target.value;
                    setFormData({
                      ...formData,
                      label: { ...formData.label, en: newLabel },
                      // Auto-generate value if not editing
                      value: !editingId ? generateValue(newLabel) : formData.value
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  placeholder="e.g., Green Olives"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label (Arabic) *
                </label>
                <input
                  type="text"
                  value={formData.label.ar}
                  onChange={(e) => setFormData({
                    ...formData,
                    label: { ...formData.label, ar: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  dir="rtl"
                  placeholder="مثال: زيتون أخضر"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label (Spanish) *
                </label>
                <input
                  type="text"
                  value={formData.label.es}
                  onChange={(e) => setFormData({
                    ...formData,
                    label: { ...formData.label, es: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  placeholder="ej., Aceitunas Verdes"
                />
              </div>
            </div>

            {/* Value (auto-generated) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Value (URL-friendly identifier) *
              </label>
              <input
                type="text"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value.toLowerCase() })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50"
                required
                placeholder="green-olives"
              />
              <p className="text-xs text-gray-500 mt-1">
                Auto-generated from English label. Can be edited manually.
              </p>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Order & Active */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
              >
                {editingId ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            {category.image && (
              <img
                src={category.image}
                alt={category.label?.en || category.value}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
            )}
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {category.label?.en || category.value}
            </h3>
            
            <p className="text-sm text-gray-600 mb-1" dir="rtl">
              {category.label?.ar}
            </p>
            
            <p className="text-xs text-gray-500 mb-3">
              Value: {category.value}
            </p>
            
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 text-xs rounded ${
                category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {category.isActive ? 'Active' : 'Inactive'}
              </span>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No categories yet. Click "Add Category" to create one.
        </div>
      )}
    </div>
  );
};

export default AdminCategories;