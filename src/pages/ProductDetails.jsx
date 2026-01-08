import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  FaChevronLeft, FaCheckCircle, FaBox, FaLeaf, 
  FaCertificate, FaShippingFast, FaEnvelope 
} from 'react-icons/fa';

const ProductDetails = () => {
  const { productId } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isRTL = lang === 'ar';

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  const getImageUrls = (product) => {
    if (!product.images || product.images.length === 0) {
      return ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800'];
    }

    return product.images.map(img => {
      if (typeof img === 'object' && img.url) return img.url;
      if (typeof img === 'string') return img;
      return 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800';
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError(lang === 'ar' ? 'المنتج غير موجود' : lang === 'es' ? 'Producto no encontrado' : 'Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, lang]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-green-600 to-dark">
        <div className="text-center text-white">
          <div className="inline-block w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg">{lang === 'ar' ? 'جاري التحميل...' : lang === 'es' ? 'Cargando...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mt-[68px]">
        <div className="text-center">
          <FaBox className="text-5xl text-gray-300 mx-auto mb-4" />
          <h2 className={`text-2xl font-bold text-gray-800 mb-3 ${isRTL ? 'font-arabic' : ''}`}>
            {error || (lang === 'ar' ? 'المنتج غير موجود' : lang === 'es' ? 'Producto no encontrado' : 'Product not found')}
          </h2>
          <p className={`text-gray-600 mb-6 text-sm ${isRTL ? 'font-arabic' : ''}`}>
            {lang === 'ar' ? 'عذراً، لم نتمكن من العثور على المنتج' : lang === 'es' ? 'Lo sentimos, no pudimos encontrar el producto' : 'Sorry, we couldn\'t find the requested product'}
          </p>
          <Link
            to="/products"
            className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-green-600 text-white rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105 ${
              isRTL ? 'flex-row-reverse font-arabic' : ''
            }`}
          >
            <FaChevronLeft className={isRTL ? 'rotate-180' : ''} />
            {lang === 'ar' ? 'العودة للمنتجات' : lang === 'es' ? 'Volver' : 'Back to Products'}
          </Link>
        </div>
      </div>
    );
  }

  const images = getImageUrls(product);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 mt-[68px]">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link to="/" className="hover:text-primary transition-colors">
              {lang === 'ar' ? 'الرئيسية' : lang === 'es' ? 'Inicio' : 'Home'}
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary transition-colors">
              {lang === 'ar' ? 'المنتجات' : lang === 'es' ? 'Productos' : 'Products'}
            </Link>
            <span>/</span>
            <span className="font-semibold text-primary">{product.name?.[lang] || product.name?.en}</span>
          </div>
        </div>
      </div>

      {/* Product Details - Compact */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images Gallery */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image */}
              <div className="mb-4 rounded-2xl overflow-hidden shadow-xl bg-gray-100">
                <img
                  src={images[selectedImage]}
                  alt={product.name?.[lang] || 'Product'}
                  className="w-full h-[400px] object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800';
                  }}
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`rounded-xl overflow-hidden border-2 transition-all bg-gray-100 ${
                        selectedImage === idx 
                          ? 'border-primary shadow-md scale-105' 
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-20 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info - Compact */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {/* Category Badge */}
              {product.category && (
                <div className="mb-3">
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full font-semibold text-xs ${
                    isRTL ? 'flex-row-reverse' : ''
                  }`}>
                    <FaBox />
                    {product.category}
                  </span>
                </div>
              )}

              {/* Product Name */}
              <h1 className={`text-3xl md:text-4xl font-black text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                {product.name?.[lang] || product.name?.en}
              </h1>

              {/* Price */}
              {product.price && (
                <div className="mb-5">
                  <span className="text-3xl font-black text-primary">
                    ${product.price}
                  </span>
                  <span className={`text-sm text-gray-500 ml-2 ${isRTL ? 'font-arabic' : ''}`}>
                    {lang === 'ar' ? 'للطلبيات الكبيرة' : lang === 'es' ? 'pedidos grandes' : 'bulk orders'}
                  </span>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h2 className={`text-xl font-bold text-gray-900 mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                  {lang === 'ar' ? 'الوصف' : lang === 'es' ? 'Descripción' : 'Description'}
                </h2>
                <p className={`text-base text-gray-700 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                  {product.description?.[lang] || product.description?.en}
                </p>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h2 className={`text-xl font-bold text-gray-900 mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                    {lang === 'ar' ? 'المميزات' : lang === 'es' ? 'Características' : 'Features'}
                  </h2>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <FaCheckCircle className="text-primary text-lg mt-0.5 flex-shrink-0" />
                        <span className={`text-gray-700 text-sm ${isRTL ? 'font-arabic' : ''}`}>
                          {feature[lang] || feature.en}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quality Badges - Compact */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl">
                  <FaLeaf className="text-2xl text-green-600" />
                  <div>
                    <div className={`font-bold text-gray-900 text-sm ${isRTL ? 'font-arabic' : ''}`}>
                      {lang === 'ar' ? 'عضوي' : lang === 'es' ? 'Orgánico' : 'Organic'}
                    </div>
                    <div className="text-xs text-gray-600">100%</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl">
                  <FaCertificate className="text-2xl text-blue-600" />
                  <div>
                    <div className={`font-bold text-gray-900 text-sm ${isRTL ? 'font-arabic' : ''}`}>
                      {lang === 'ar' ? 'معتمد' : lang === 'es' ? 'Certificado' : 'Certified'}
                    </div>
                    <div className="text-xs text-gray-600">ISO</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-xl">
                  <FaShippingFast className="text-2xl text-purple-600" />
                  <div>
                    <div className={`font-bold text-gray-900 text-sm ${isRTL ? 'font-arabic' : ''}`}>
                      {lang === 'ar' ? 'شحن' : lang === 'es' ? 'Envío' : 'Shipping'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {lang === 'ar' ? 'عالمي' : lang === 'es' ? 'Mundial' : 'Worldwide'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-xl">
                  <FaCheckCircle className="text-2xl text-orange-600" />
                  <div>
                    <div className={`font-bold text-gray-900 text-sm ${isRTL ? 'font-arabic' : ''}`}>
                      {lang === 'ar' ? 'جودة' : lang === 'es' ? 'Calidad' : 'Quality'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {lang === 'ar' ? 'ممتازة' : lang === 'es' ? 'Premium' : 'Premium'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Compact */}
              <div className={`flex flex-col sm:flex-row gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <Link
                  to="/contact"
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-green-600 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 ${
                    isRTL ? 'flex-row-reverse font-arabic' : ''
                  }`}
                >
                  <FaEnvelope />
                  {lang === 'ar' ? 'طلب عرض سعر' : lang === 'es' ? 'Solicitar' : 'Request Quote'}
                </Link>
                <Link
                  to="/products"
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all ${
                    isRTL ? 'flex-row-reverse font-arabic' : ''
                  }`}
                >
                  <FaChevronLeft className={isRTL ? 'rotate-180' : ''} />
                  {lang === 'ar' ? 'منتجات أخرى' : lang === 'es' ? 'Otros' : 'Other Products'}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA - Compact */}
      <section className="py-16 bg-gradient-to-br from-primary to-dark text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl font-bold mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'مهتم بهذا المنتج؟' : lang === 'es' ? '¿Interesado?' : 'Interested in this Product?'}
            </h2>
            <p className={`text-lg mb-8 text-gray-200 ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar'
                ? 'تواصل معنا للحصول على عرض سعر مخصص'
                : lang === 'es'
                ? 'Contáctenos para obtener una cotización'
                : 'Contact us for a custom quote and delivery terms'}
            </p>
            <Link
              to="/contact"
              className={`inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-bold rounded-full hover:shadow-2xl transition-all hover:scale-105 ${
                isRTL ? 'flex-row-reverse font-arabic' : ''
              }`}
            >
              <FaEnvelope />
              {lang === 'ar' ? 'تواصل معنا' : lang === 'es' ? 'Contáctenos' : 'Contact Us'}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;