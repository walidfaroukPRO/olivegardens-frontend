import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../utils/axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaBox, FaSearch, FaStar, FaTag, FaFilter } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const Products = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isRTL = lang === 'ar';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/categories');
      console.log('📂 Categories loaded:', response.data);
      
      // ✅ Handle different response formats
      let categoriesData = [];
      
      if (response.data.categories) {
        categoriesData = response.data.categories;
      } else if (Array.isArray(response.data)) {
        categoriesData = response.data;
      }
      
      const allCategory = {
        value: 'all',
        label: { 
          en: 'All Products', 
          ar: 'جميع المنتجات', 
          es: 'Todos los Productos' 
        },
        image: '🫒'
      };
      
      setCategories([allCategory, ...categoriesData.filter(c => c.isActive !== false)]);
    } catch (error) {
      console.error('❌ Failed to fetch categories:', error);
      setCategories([
        {
          value: 'all',
          label: { en: 'All Products', ar: 'جميع المنتجات', es: 'Todos' },
          image: '🫒'
        }
      ]);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = selectedCategory === 'all' 
        ? '/api/products'
        : `/api/products?category=${selectedCategory}`;
      
      const response = await api.get(url);
      console.log('📦 Products loaded:', response.data.length);
      setProducts(response.data || []);
    } catch (error) {
      console.error('❌ Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

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
    
    if (product.imageUrls && product.imageUrls.length > 0) {
      return product.imageUrls[0];
    }
    
    return 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800';
  };

  const filteredProducts = products.filter(product => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    const name = product.name?.[lang] || product.name?.en || '';
    const description = product.description?.[lang] || product.description?.en || '';
    
    return name.toLowerCase().includes(searchLower) || 
           description.toLowerCase().includes(searchLower);
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-green-600 to-dark">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center text-white"
        >
          <div className="relative">
            <div className="w-24 h-24 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
            <HiSparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl animate-pulse" />
          </div>
          <p className="text-2xl font-bold">
            {lang === 'ar' ? 'جاري التحميل...' : lang === 'es' ? 'Cargando...' : 'Loading...'}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      
      {/* ===== HERO SECTION - Enhanced ===== */}
      <section className="relative h-[60vh] bg-gradient-to-br from-primary via-green-600 to-dark overflow-hidden mt-[68px]">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.5'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/20">
                  <FaBox className="text-5xl" />
                </div>
              </motion.div>

              {/* Title */}
              <h1 className={`text-5xl md:text-7xl font-black mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? 'منتجاتنا المميزة' : lang === 'es' ? 'Nuestros Productos' : 'Our Premium Products'}
              </h1>
              
              {/* Subtitle */}
              <p className={`text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' 
                  ? 'اكتشف مجموعتنا المتنوعة من منتجات الزيتون عالية الجودة المصنوعة بعناية فائقة'
                  : lang === 'es'
                  ? 'Descubra nuestra diversa gama de productos de aceituna premium elaborados con sumo cuidado'
                  : 'Discover our diverse range of premium olive products crafted with utmost care'}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                >
                  <div className="text-3xl font-bold">{products.length}</div>
                  <div className="text-sm text-white/80">
                    {lang === 'ar' ? 'منتج' : lang === 'es' ? 'Productos' : 'Products'}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                >
                  <div className="text-3xl font-bold">{categories.length - 1}</div>
                  <div className="text-sm text-white/80">
                    {lang === 'ar' ? 'تصنيف' : lang === 'es' ? 'Categorías' : 'Categories'}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                >
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm text-white/80">
                    {lang === 'ar' ? 'طبيعي' : lang === 'es' ? 'Natural' : 'Natural'}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* ===== SEARCH & FILTER SECTION ===== */}
      <section className="py-12 bg-white sticky top-[68px] z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Search Bar - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="relative max-w-3xl mx-auto">
              <div className={`absolute ${isRTL ? 'right-5' : 'left-5'} top-1/2 transform -translate-y-1/2 text-gray-400`}>
                <FaSearch className="text-xl" />
              </div>
              <input
                type="text"
                placeholder={lang === 'ar' ? 'ابحث عن المنتجات...' : lang === 'es' ? 'Buscar productos...' : 'Search for products...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full ${isRTL ? 'pr-14 pl-6' : 'pl-14 pr-6'} py-5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-primary text-lg transition-all shadow-sm hover:shadow-md ${
                  isRTL ? 'font-arabic text-right' : ''
                }`}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className={`absolute ${isRTL ? 'left-5' : 'right-5'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600`}
                >
                  ✕
                </button>
              )}
            </div>
          </motion.div>

          {/* Category Filter - Stunning Cards */}
          <div className="mb-6">
            <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <FaFilter className="text-primary text-xl" />
              <h3 className={`text-lg font-bold text-gray-700 ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? 'التصنيفات' : lang === 'es' ? 'Categorías' : 'Categories'}
              </h3>
            </div>

            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${Math.min(categories.length, 6)} gap-4`}>
              {categories.map((category, index) => {
                const isActive = selectedCategory === category.value;
                
                // ✅ Get emoji or use default
                let categoryIcon = '🫒'; // Default
                
                if (category.image) {
                  // Check if it's an emoji (single character or emoji)
                  if (category.image.length <= 2 || /\p{Emoji}/u.test(category.image)) {
                    categoryIcon = category.image;
                  }
                  // If it's a URL, use default emoji based on category name
                  else if (category.image.includes('http')) {
                    const categoryName = (category.label[lang] || category.label.en || '').toLowerCase();
                    
                    if (categoryName.includes('green') || categoryName.includes('أخضر')) categoryIcon = '🟢';
                    else if (categoryName.includes('black') || categoryName.includes('أسود')) categoryIcon = '⚫';
                    else if (categoryName.includes('oil') || categoryName.includes('زيت')) categoryIcon = '🛢️';
                    else if (categoryName.includes('stuffed') || categoryName.includes('محشي')) categoryIcon = '🫒';
                    else if (categoryName.includes('all') || categoryName.includes('جميع')) categoryIcon = '🫒';
                    else categoryIcon = '🫒';
                  }
                }
                
                return (
                  <motion.button
                    key={category.value}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 group ${
                      isActive
                        ? 'bg-gradient-to-br from-primary to-green-600 text-white shadow-xl ring-4 ring-primary/20'
                        : 'bg-white text-gray-700 hover:bg-gradient-to-br hover:from-primary hover:to-green-600 hover:text-white shadow-lg hover:shadow-xl border-2 border-gray-100'
                    }`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                      }}></div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      {/* Icon/Emoji */}
                      <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                        {categoryIcon}
                      </div>
                      
                      {/* Label */}
                      <div className={`font-bold text-sm ${isRTL ? 'font-arabic' : ''}`}>
                        {category.label[lang] || category.label.en}
                      </div>

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                        >
                          <FaStar className="text-yellow-500 text-xs" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex items-center justify-between py-4 border-t-2 border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <div className={`text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
              <span className="font-bold text-2xl text-primary">{filteredProducts.length}</span>{' '}
              <span className="text-lg">
                {lang === 'ar' ? 'منتج متاح' : lang === 'es' ? 'productos disponibles' : 'products available'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== PRODUCTS GRID - Stunning Cards ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-24"
              >
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaBox className="text-6xl text-gray-300" />
                </div>
                <h3 className={`text-2xl font-bold text-gray-700 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                  {lang === 'ar' ? 'لا توجد منتجات' : lang === 'es' ? 'No hay productos' : 'No products found'}
                </h3>
                <p className={`text-gray-500 ${isRTL ? 'font-arabic' : ''}`}>
                  {lang === 'ar' ? 'جرب تغيير التصنيف أو البحث' : lang === 'es' ? 'Intenta cambiar la categoría o buscar' : 'Try changing the category or search term'}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedCategory + searchTerm}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div 
                    key={product._id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100">
                      
                      {/* Image Container */}
                      <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        <motion.img 
                          src={getImageUrl(product)}
                          alt={product.name?.[lang] || product.name?.en || 'Product'}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.6 }}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800';
                          }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Category Badge */}
                        {product.category && (
                          <motion.div
                            initial={{ x: -100 }}
                            animate={{ x: 0 }}
                            className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}
                          >
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                              <FaTag className="text-primary text-sm" />
                              <span className={`text-sm font-bold text-gray-800 ${isRTL ? 'font-arabic' : ''}`}>
                                {categories.find(c => c.value === product.category)?.label[lang] || product.category}
                              </span>
                            </div>
                          </motion.div>
                        )}

                        {/* Featured Badge */}
                        {product.featured && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}
                          >
                            <div className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-lg">
                              <HiSparkles className="text-sm" />
                              <span className="text-xs font-bold">
                                {lang === 'ar' ? 'مميز' : lang === 'es' ? 'Destacado' : 'Featured'}
                              </span>
                            </div>
                          </motion.div>
                        )}

                        {/* Quick View on Hover */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <Link
                            to={`/products/${product._id}`}
                            className="px-6 py-3 bg-white text-primary font-bold rounded-full shadow-xl hover:bg-primary hover:text-white transition-all transform hover:scale-110"
                          >
                            {lang === 'ar' ? 'عرض سريع' : lang === 'es' ? 'Vista rápida' : 'Quick View'}
                          </Link>
                        </motion.div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        {/* Title */}
                        <h3 className={`text-xl font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-primary transition-colors ${
                          isRTL ? 'font-arabic text-right' : ''
                        }`}>
                          {product.name?.[lang] || product.name?.en || 'Unnamed Product'}
                        </h3>
                        
                        {/* Description */}
                        <p className={`text-gray-600 mb-4 line-clamp-2 leading-relaxed text-sm ${
                          isRTL ? 'font-arabic text-right' : ''
                        }`}>
                          {product.description?.[lang] || product.description?.en || ''}
                        </p>

                        {/* Footer */}
                        <div className={`flex items-center justify-between pt-4 border-t border-gray-100 ${
                          isRTL ? 'flex-row-reverse' : ''
                        }`}>
                          {/* Price */}
                          {product.price && (
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-black text-primary">
                                ${product.price}
                              </span>
                              <span className="text-sm text-gray-500">USD</span>
                            </div>
                          )}
                          
                          {/* Details Button */}
                          <Link
                            to={`/products/${product._id}`}
                            className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-green-600 text-white rounded-full font-bold shadow-md hover:shadow-xl transition-all hover:scale-105 ${
                              isRTL ? 'flex-row-reverse font-arabic' : ''
                            }`}
                          >
                            <span className="text-sm">
                              {lang === 'ar' ? 'التفاصيل' : lang === 'es' ? 'Detalles' : 'Details'}
                            </span>
                            <FaArrowRight className={`text-xs ${isRTL ? 'rotate-180' : ''}`} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ===== CTA SECTION - Enhanced ===== */}
      <section className="py-24 bg-gradient-to-br from-primary via-green-600 to-dark text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.6'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Icon */}
            <div className="inline-block mb-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <HiSparkles className="text-4xl" />
              </div>
            </div>

            {/* Title */}
            <h2 className={`text-4xl md:text-5xl font-black mb-6 ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'لم تجد ما تبحث عنه؟' : lang === 'es' ? '¿No encontraste lo que buscas?' : 'Didn\'t Find What You\'re Looking For?'}
            </h2>
            
            {/* Description */}
            <p className={`text-xl mb-10 text-white/90 max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar'
                ? 'تواصل معنا اليوم وسنساعدك في إيجاد المنتج المثالي لاحتياجاتك'
                : lang === 'es'
                ? 'Contáctenos hoy y le ayudaremos a encontrar el producto perfecto'
                : 'Contact us today and we\'ll help you find the perfect product for your needs'}
            </p>

            {/* Buttons */}
            <div className={`flex gap-4 justify-center flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link
                to="/contact"
                className={`group px-10 py-4 bg-white text-primary font-bold rounded-full hover:shadow-2xl transition-all hover:scale-105 ${
                  isRTL ? 'font-arabic' : ''
                }`}
              >
                <span className="flex items-center gap-2">
                  {lang === 'ar' ? 'اتصل بنا الآن' : lang === 'es' ? 'Contáctenos' : 'Contact Us Now'}
                  <FaArrowRight className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                </span>
              </Link>
              
              <Link
                to="/about"
                className={`px-10 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-primary transition-all ${
                  isRTL ? 'font-arabic' : ''
                }`}
              >
                {lang === 'ar' ? 'معرفة المزيد' : lang === 'es' ? 'Saber Más' : 'Learn More'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Products;