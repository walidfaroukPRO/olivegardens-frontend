import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaSearch } from 'react-icons/fa';

const AdminProducts = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const [formData, setFormData] = useState({
    name: { en: '', ar: '', es: '' },
    description: { en: '', ar: '', es: '' },
    category: 'pickled-olives',
    specifications: {
      weight: '',
      packaging: { en: '', ar: '', es: '' },
      origin: { en: '', ar: '', es: '' },
      shelfLife: ''
    },
    features: []
  });

  const [images, setImages] = useState([]);

  // ✅ Helper function to get first image URL
  const getImageUrl = (product) => {
    if (!product.images || product.images.length === 0) {
      return 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800';
    }
    
    const firstImage = product.images[0];
    
    // New format: { url, publicId }
    if (typeof firstImage === 'object' && firstImage.url) {
      return firstImage.url;
    }
    
    // Old format: String URL
    if (typeof firstImage === 'string') {
      return firstImage;
    }
    
    // Fallback
    return 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800';
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataObj = new FormData();
    formDataObj.append('productData', JSON.stringify(formData));
    
    Array.from(images).forEach(image => {
      formDataObj.append('images', image);
    });

    try {
      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct._id}`, formDataObj, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('/api/products', formDataObj, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      
      setShowModal(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Failed to save product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: { en: '', ar: '', es: '' },
      description: { en: '', ar: '', es: '' },
      category: 'pickled-olives',
      specifications: {
        weight: '',
        packaging: { en: '', ar: '', es: '' },
        origin: { en: '', ar: '', es: '' },
        shelfLife: ''
      },
      features: []
    });
    setImages([]);
  };

  const handleDelete = async (id) => {
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await axios.patch(`/api/products/${id}/toggle-active`);
      fetchProducts();
    } catch (error) {
      console.error('Failed to toggle:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      specifications: product.specifications || {
        weight: '',
        packaging: { en: '', ar: '', es: '' },
        origin: { en: '', ar: '', es: '' },
        shelfLife: ''
      },
      features: product.features || []
    });
    setShowModal(true);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name[lang].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={lang === 'ar' ? 'بحث...' : 'Search...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
          />
        </div>

        {/* Filter */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
        >
          <option value="all">{lang === 'ar' ? 'الكل' : 'All Categories'}</option>
          <option value="pickled-olives">{lang === 'ar' ? 'زيتون مخلل' : 'Pickled Olives'}</option>
          <option value="olive-oil">{lang === 'ar' ? 'زيت زيتون' : 'Olive Oil'}</option>
          <option value="olive-paste">{lang === 'ar' ? 'معجون زيتون' : 'Olive Paste'}</option>
          <option value="stuffed-olives">{lang === 'ar' ? 'زيتون محشي' : 'Stuffed Olives'}</option>
        </select>

        {/* Add Button */}
        <button
          onClick={() => {
            resetForm();
            setEditingProduct(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-dark text-white rounded-xl hover:shadow-lg transition-all"
        >
          <FaPlus />
          {lang === 'ar' ? 'إضافة منتج' : 'Add Product'}
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
            <div className="relative h-48 bg-gray-100">
              <img 
                src={getImageUrl(product)}
                alt={product.name[lang]}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800';
                }}
              />
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                product.isActive ? 'bg-green-500' : 'bg-red-500'
              } text-white`}>
                {product.isActive ? (lang === 'ar' ? 'نشط' : 'Active') : (lang === 'ar' ? 'غير نشط' : 'Inactive')}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name[lang]}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{product.description[lang]}</p>
              <div className="text-sm text-gray-500 mb-4">{product.category}</div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleActive(product._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  {product.isActive ? <FaToggleOn /> : <FaToggleOff />}
                </button>
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-primary to-dark text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">
                {editingProduct 
                  ? (lang === 'ar' ? 'تعديل منتج' : 'Edit Product')
                  : (lang === 'ar' ? 'إضافة منتج جديد' : 'Add New Product')}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Names */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name (EN) *</label>
                  <input
                    type="text"
                    value={formData.name.en}
                    onChange={(e) => setFormData({...formData, name: {...formData.name, en: e.target.value}})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">الاسم (AR) *</label>
                  <input
                    type="text"
                    value={formData.name.ar}
                    onChange={(e) => setFormData({...formData, name: {...formData.name, ar: e.target.value}})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Nombre (ES) *</label>
                  <input
                    type="text"
                    value={formData.name.es}
                    onChange={(e) => setFormData({...formData, name: {...formData.name, es: e.target.value}})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Description (EN) *</label>
                  <textarea
                    value={formData.description.en}
                    onChange={(e) => setFormData({...formData, description: {...formData.description, en: e.target.value}})}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">الوصف (AR) *</label>
                  <textarea
                    value={formData.description.ar}
                    onChange={(e) => setFormData({...formData, description: {...formData.description, ar: e.target.value}})}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                    dir="rtl"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Descripción (ES) *</label>
                  <textarea
                    value={formData.description.es}
                    onChange={(e) => setFormData({...formData, description: {...formData.description, es: e.target.value}})}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                  ></textarea>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                >
                  <option value="pickled-olives">Pickled Olives</option>
                  <option value="olive-oil">Olive Oil</option>
                  <option value="olive-paste">Olive Paste</option>
                  <option value="stuffed-olives">Stuffed Olives</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Images */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Images (Max 5) {editingProduct && '- Leave empty to keep existing images'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setImages(e.target.files)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                />
                {editingProduct && editingProduct.images && editingProduct.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {editingProduct.images.map((img, idx) => {
                      const imgUrl = typeof img === 'object' ? img.url : img;
                      return (
                        <img 
                          key={idx}
                          src={imgUrl}
                          alt={`Current ${idx + 1}`}
                          className="w-full h-20 object-cover rounded-lg border border-gray-300"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200';
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4 border-t">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-primary to-dark text-white font-bold rounded-xl hover:shadow-lg transition-all"
                >
                  {editingProduct ? (lang === 'ar' ? 'تحديث' : 'Update') : (lang === 'ar' ? 'إضافة' : 'Add')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProduct(null);
                    resetForm();
                  }}
                  className="flex-1 py-3 bg-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-400 transition-all"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;