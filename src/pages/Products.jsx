import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../utils/axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaBox, FaSearch } from 'react-icons/fa';

const Products = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // ✅ Dynamic categories
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/categories');
      const allCategory = {
        value: 'all',
        label: { en: 'All Products', ar: 'جميع المنتجات', es: 'Todos los Productos' }
      };
      setCategories([allCategory, ...response.data]);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      // Fallback to hardcoded if API fails
      setCategories([
        { value: 'all', label: { en: 'All Products', ar: 'جميع المنتجات', es: 'Todos los Productos' } }
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
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Get first image URL (handle both old and new format)
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
    
    // Fallback from imageUrls (backward compatibility)
    if (product.imageUrls && product.imageUrls.length > 0) {
      return product.imageUrls[0];
    }
    
    return 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800';
  };

  // Filter products by search term
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-dark">
        <div className="text-center text-white">
          <div className="inline-block w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl">{lang === 'ar' ? 'جاري التحميل...' : lang === 'es' ? 'Cargando...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-br from-primary via-dark to-primary overflow-hidden mt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative h-full flex items-center justify-center text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <FaBox className="text-6xl mx-auto mb-6" />
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {lang === 'ar' ? 'منتجاتنا' : lang === 'es' ? 'Nuestros Productos' : 'Our Products'}
              </h1>
              <p className="text-2xl text-gray-200">
                {lang === 'ar' 
                  ? 'اكتشف مجموعتنا المتنوعة من منتجات الزيتون عالية الجودة'
                  : lang === 'es'
                  ? 'Descubra nuestra diversa gama de productos de aceituna de alta calidad'
                  : 'Discover our diverse range of high-quality olive products'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={lang === 'ar' ? 'بحث في المنتجات...' : lang === 'es' ? 'Buscar productos...' : 'Search products...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-primary text-lg"
              />
            </div>
          </div>

          {/* Category Filter - ✅ Dynamic */}
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category.value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.value
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-primary hover:text-white shadow-md'
                }`}
              >
                {category.label[lang] || category.label.en}
              </motion.button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mt-6 text-gray-600">
            <span className="font-semibold">{filteredProducts.length}</span> {lang === 'ar' ? 'منتج' : lang === 'es' ? 'productos' : 'products'}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">
                {lang === 'ar' ? 'لا توجد منتجات' : lang === 'es' ? 'No hay productos' : 'No products found'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div 
                  key={product._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500"
                >
                  {/* Product Image */}
                  <div className="relative h-80 overflow-hidden bg-gray-100">
                    <img 
                      src={getImageUrl(product)}
                      alt={product.name?.[lang] || product.name?.en || 'Product'}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800';
                      }}
                    />
                    
                    {/* Category Badge - ✅ Dynamic */}
                    {product.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold shadow-lg">
                          {categories.find(c => c.value === product.category)?.label[lang] || product.category}
                        </span>
                      </div>
                    )}

                    {/* Featured Badge */}
                    {product.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-4 py-2 bg-yellow-500 text-white rounded-full text-sm font-semibold shadow-lg">
                          {lang === 'ar' ? 'مميز' : lang === 'es' ? 'Destacado' : 'Featured'}
                        </span>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-1">
                      {product.name?.[lang] || product.name?.en || 'Unnamed Product'}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                      {product.description?.[lang] || product.description?.en || ''}
                    </p>

                    {/* Price & Details */}
                    <div className="flex items-center justify-between">
                      {product.price && (
                        <div className="text-2xl font-bold text-primary">
                          ${product.price}
                        </div>
                      )}
                      
                      <Link
                        to={`/products/${product._id}`}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-dark text-white rounded-full font-semibold shadow-md hover:shadow-xl transition-all hover:scale-105"
                      >
                        {lang === 'ar' ? 'التفاصيل' : lang === 'es' ? 'Detalles' : 'Details'}
                        <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-dark text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              {lang === 'ar' ? 'هل تبحث عن منتج معين؟' : lang === 'es' ? '¿Buscas un producto específico?' : 'Looking for a Specific Product?'}
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              {lang === 'ar'
                ? 'تواصل معنا اليوم وسنساعدك في إيجاد ما تحتاجه'
                : lang === 'es'
                ? 'Contáctenos hoy y le ayudaremos a encontrar lo que necesita'
                : 'Contact us today and we\'ll help you find what you need'}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/contact"
                className="px-10 py-4 bg-white text-primary font-bold rounded-full hover:shadow-2xl transition-all hover:scale-105"
              >
                {lang === 'ar' ? 'اتصل بنا' : lang === 'es' ? 'Contacto' : 'Contact Us'}
              </Link>
              <Link
                to="/about"
                className="px-10 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-primary transition-all"
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