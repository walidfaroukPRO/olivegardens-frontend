import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaSearch, FaImage, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminProducts = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);

  const [formData, setFormData] = useState({
    name: { en: '', ar: '', es: '' },
    description: { en: '', ar: '', es: '' },
    category: '',
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
    
    if (typeof firstImage === 'object' && firstImage.url) {
      return firstImage.url;
    }
    
    if (typeof firstImage === 'string') {
      return firstImage;
    }
    
    return 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800';
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ✅ Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      const categoriesData = response.data.categories || response.data || [];
      console.log('✅ Categories loaded:', categoriesData);
      setCategories(categoriesData);
      
      // ✅ Set first category VALUE as default
      if (categoriesData.length > 0 && !formData.category) {
        setFormData(prev => ({ 
          ...prev, 
          category: categoriesData[0].value  // ✅ Use value not label
        }));
      }
    } catch (error) {
      console.error('❌ Failed to fetch categories:', error);
      toast.error(lang === 'ar' ? 'فشل تحميل التصنيفات' : 'Failed to load categories');
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      setProducts(response.data);
      toast.success(lang === 'ar' ? 'تم تحميل المنتجات' : 'Products loaded');
    } catch (error) {
      console.error('❌ Failed to fetch products:', error);
      toast.error(lang === 'ar' ? 'فشل تحميل المنتجات' : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle image selection with preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 5) {
      toast.error(lang === 'ar' ? 'الحد الأقصى 5 صور' : 'Maximum 5 images');
      return;
    }

    setImages(files);

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  // ✅ Submit with progress tracking
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ Validation
    if (!formData.name.en || !formData.name.ar || !formData.name.es) {
      toast.error(lang === 'ar' ? 'الاسم مطلوب بكل اللغات' : 'Name required in all languages');
      return;
    }

    if (!formData.description.en || !formData.description.ar || !formData.description.es) {
      toast.error(lang === 'ar' ? 'الوصف مطلوب بكل اللغات' : 'Description required in all languages');
      return;
    }

    if (!formData.category) {
      toast.error(lang === 'ar' ? 'التصنيف مطلوب' : 'Category is required');
      return;
    }

    // ✅ Debug: Log category value
    console.log('✅ Submitting with category:', formData.category);
    
    const formDataObj = new FormData();
    formDataObj.append('productData', JSON.stringify(formData));
    
    Array.from(images).forEach(image => {
      formDataObj.append('images', image);
    });

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const config = {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      };

      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct._id}`, formDataObj, config);
        toast.success(lang === 'ar' ? 'تم تحديث المنتج بنجاح' : 'Product updated successfully');
      } else {
        await axios.post('/api/products', formDataObj, config);
        toast.success(lang === 'ar' ? 'تم إضافة المنتج بنجاح' : 'Product added successfully');
      }
      
      setShowModal(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts();
      
    } catch (error) {
      console.error('❌ Failed to save product:', error);
      console.error('❌ Error response:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || 
        (lang === 'ar' ? 'فشل حفظ المنتج' : 'Failed to save product');
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      name: { en: '', ar: '', es: '' },
      description: { en: '', ar: '', es: '' },
      category: categories.length > 0 ? categories[0].value : '',  // ✅ Use value
      specifications: {
        weight: '',
        packaging: { en: '', ar: '', es: '' },
        origin: { en: '', ar: '', es: '' },
        shelfLife: ''
      },
      features: []
    });
    setImages([]);
    setImagePreview([]);
    setUploadProgress(0);
  };

  const handleDelete = async (id) => {
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) {
      try {
        await axios.delete(`/api/products/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        toast.success(lang === 'ar' ? 'تم حذف المنتج' : 'Product deleted');
        fetchProducts();
      } catch (error) {
        console.error('❌ Failed to delete:', error);
        toast.error(lang === 'ar' ? 'فشل الحذف' : 'Failed to delete');
      }
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await axios.patch(`/api/products/${id}/toggle-active`, {}, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success(lang === 'ar' ? 'تم تغيير الحالة' : 'Status changed');
      fetchProducts();
    } catch (error) {
      console.error('❌ Failed to toggle:', error);
      toast.error(lang === 'ar' ? 'فشل تغيير الحالة' : 'Failed to toggle');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,  // ✅ Already a value
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
    const matchesSearch = product.name[lang]?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">
          {lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-dark text-white p-6 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-2">
          {lang === 'ar' ? '📦 إدارة المنتجات' : '📦 Products Management'}
        </h1>
        <p className="text-white/80">
          {lang === 'ar' ? `إجمالي المنتجات: ${products.length}` : `Total Products: ${products.length}`}
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={lang === 'ar' ? 'بحث بالاسم...' : 'Search by name...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-all"
          />
        </div>

        {/* Filter */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-all"
        >
          <option value="all">{lang === 'ar' ? '🔍 الكل' : '🔍 All Categories'}</option>
          {categories.map(cat => (
            <option key={cat._id || cat.value} value={cat.value}>
              {cat.label?.[lang] || cat.label?.en || cat.value}
            </option>
          ))}
        </select>

        {/* Add Button */}
        <button
          onClick={() => {
            resetForm();
            setEditingProduct(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-bold"
        >
          <FaPlus className="text-lg" />
          {lang === 'ar' ? 'إضافة منتج جديد' : 'Add New Product'}
        </button>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <FaImage className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500">
            {lang === 'ar' ? 'لا توجد منتجات' : 'No products found'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200">
                <img 
                  src={getImageUrl(product)}
                  alt={product.name[lang]}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800';
                  }}
                />
                <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-bold shadow-lg ${
                  product.isActive 
                    ? 'bg-gradient-to-r from-green-500 to-green-600' 
                    : 'bg-gradient-to-r from-red-500 to-red-600'
                } text-white`}>
                  {product.isActive ? (lang === 'ar' ? '✓ نشط' : '✓ Active') : (lang === 'ar' ? '✗ غير نشط' : '✗ Inactive')}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                  {product.name[lang]}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                  {product.description[lang]}
                </p>
                
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary/10 to-dark/10 text-primary rounded-full text-sm font-medium">
                    {categories.find(c => c.value === product.category)?.label?.[lang] || product.category}
                  </span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleActive(product._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all font-medium"
                    title={lang === 'ar' ? 'تغيير الحالة' : 'Toggle Status'}
                  >
                    {product.isActive ? <FaToggleOn className="text-lg" /> : <FaToggleOff className="text-lg" />}
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all font-medium"
                    title={lang === 'ar' ? 'تعديل' : 'Edit'}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-medium"
                    title={lang === 'ar' ? 'حذف' : 'Delete'}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary to-dark text-white p-6 rounded-t-3xl z-10">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                {editingProduct ? '✏️' : '➕'}
                {editingProduct 
                  ? (lang === 'ar' ? 'تعديل منتج' : 'Edit Product')
                  : (lang === 'ar' ? 'إضافة منتج جديد' : 'Add New Product')}
              </h2>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                
                {/* Names */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">1</span>
                    {lang === 'ar' ? 'اسم المنتج' : 'Product Name'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">English *</label>
                      <input
                        type="text"
                        value={formData.name.en}
                        onChange={(e) => setFormData({...formData, name: {...formData.name, en: e.target.value}})}
                        required
                        placeholder="e.g., Green Olives"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">العربية *</label>
                      <input
                        type="text"
                        value={formData.name.ar}
                        onChange={(e) => setFormData({...formData, name: {...formData.name, ar: e.target.value}})}
                        required
                        placeholder="مثال: زيتون أخضر"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-all"
                        dir="rtl"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Español *</label>
                      <input
                        type="text"
                        value={formData.name.es}
                        onChange={(e) => setFormData({...formData, name: {...formData.name, es: e.target.value}})}
                        required
                        placeholder="ej., Aceitunas Verdes"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Descriptions */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">2</span>
                    {lang === 'ar' ? 'وصف المنتج' : 'Product Description'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">English *</label>
                      <textarea
                        value={formData.description.en}
                        onChange={(e) => setFormData({...formData, description: {...formData.description, en: e.target.value}})}
                        required
                        rows="4"
                        placeholder="Detailed description..."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-all resize-none"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">العربية *</label>
                      <textarea
                        value={formData.description.ar}
                        onChange={(e) => setFormData({...formData, description: {...formData.description, ar: e.target.value}})}
                        required
                        rows="4"
                        placeholder="وصف تفصيلي..."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-all resize-none"
                        dir="rtl"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Español *</label>
                      <textarea
                        value={formData.description.es}
                        onChange={(e) => setFormData({...formData, description: {...formData.description, es: e.target.value}})}
                        required
                        rows="4"
                        placeholder="Descripción detallada..."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-all resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">3</span>
                    {lang === 'ar' ? 'التصنيف' : 'Category'}
                  </h3>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      console.log('✅ Category selected:', e.target.value);
                      setFormData({...formData, category: e.target.value});
                    }}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-all font-medium"
                  >
                    {categories.length === 0 ? (
                      <option value="">
                        {lang === 'ar' ? '⚠️ لا توجد تصنيفات - أضف تصنيفاً أولاً' : '⚠️ No categories - Add one first'}
                      </option>
                    ) : (
                      categories.map(cat => (
                        <option key={cat._id || cat.value} value={cat.value}>
                          {cat.label?.[lang] || cat.label?.en || cat.value}
                        </option>
                      ))
                    )}
                  </select>
                  {/* Debug indicator */}
                  {formData.category && (
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      {lang === 'ar' ? 'التصنيف المحدد:' : 'Selected category:'} <code className="bg-gray-100 px-2 py-1 rounded">{formData.category}</code>
                    </p>
                  )}
                </div>

                {/* Images Upload */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">4</span>
                    {lang === 'ar' ? 'صور المنتج' : 'Product Images'}
                  </h3>
                  
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-all cursor-pointer hover:border-primary"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="block text-sm text-gray-600">
                      {lang === 'ar' 
                        ? '📸 حد أقصى 5 صور - اتركه فارغاً للاحتفاظ بالصور الحالية عند التعديل' 
                        : '📸 Max 5 images - Leave empty to keep existing images when editing'}
                    </label>

                    {/* Image Previews */}
                    {imagePreview.length > 0 && (
                      <div className="grid grid-cols-5 gap-3">
                        {imagePreview.map((preview, idx) => (
                          <div key={idx} className="relative group">
                            <img 
                              src={preview}
                              alt={`Preview ${idx + 1}`}
                              className="w-full h-24 object-cover rounded-lg border-2 border-gray-300 group-hover:border-primary transition-all"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <FaCheckCircle className="text-white text-2xl" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Existing Images (when editing) */}
                    {editingProduct && editingProduct.images && editingProduct.images.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          {lang === 'ar' ? 'الصور الحالية:' : 'Current images:'}
                        </p>
                        <div className="grid grid-cols-5 gap-3">
                          {editingProduct.images.map((img, idx) => {
                            const imgUrl = typeof img === 'object' ? img.url : img;
                            return (
                              <img 
                                key={idx}
                                src={imgUrl}
                                alt={`Current ${idx + 1}`}
                                className="w-full h-24 object-cover rounded-lg border-2 border-gray-300"
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200';
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-blue-700 font-bold flex items-center gap-2">
                        <FaSpinner className="animate-spin" />
                        {lang === 'ar' ? 'جاري الرفع...' : 'Uploading...'}
                      </span>
                      <span className="text-blue-700 font-bold">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-300 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t-2">
                  <button
                    type="submit"
                    disabled={isUploading || categories.length === 0}
                    className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                      isUploading || categories.length === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-2xl hover:scale-105'
                    }`}
                  >
                    {isUploading ? (
                      <>
                        <FaSpinner className="animate-spin text-xl" />
                        {lang === 'ar' ? 'جاري الحفظ...' : 'Saving...'}
                      </>
                    ) : (
                      <>
                        <FaCheckCircle className="text-xl" />
                        {editingProduct 
                          ? (lang === 'ar' ? 'تحديث المنتج' : 'Update Product') 
                          : (lang === 'ar' ? 'إضافة المنتج' : 'Add Product')}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingProduct(null);
                      resetForm();
                    }}
                    disabled={isUploading}
                    className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                      isUploading
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                  >
                    <FaTimesCircle className="text-xl" />
                    {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;