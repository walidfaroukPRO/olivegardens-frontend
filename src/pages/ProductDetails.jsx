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

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  // ✅ Helper function to get image URLs (same as Products.jsx)
  const getImageUrls = (product) => {
    if (!product.images || product.images.length === 0) {
      return ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800'];
    }

    return product.images.map(img => {
      // New format: { url, publicId }
      if (typeof img === 'object' && img.url) {
        return img.url;
      }
      
      // Old format: String URL
      if (typeof img === 'string') {
        return img;
      }
      
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-dark">
        <div className="text-center text-white">
          <div className="inline-block w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl">{lang === 'ar' ? 'جاري التحميل...' : lang === 'es' ? 'Cargando...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <FaBox className="text-6xl text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {error || (lang === 'ar' ? 'المنتج غير موجود' : lang === 'es' ? 'Producto no encontrado' : 'Product not found')}
          </h2>
          <p className="text-gray-600 mb-8">
            {lang === 'ar' ? 'عذراً، لم نتمكن من العثور على المنتج المطلوب' : lang === 'es' ? 'Lo sentimos, no pudimos encontrar el producto' : 'Sorry, we couldn\'t find the requested product'}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-dark text-white rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
          >
            <FaChevronLeft />
            {lang === 'ar' ? 'العودة للمنتجات' : lang === 'es' ? 'Volver a Productos' : 'Back to Products'}
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Get all image URLs using helper function
  const images = getImageUrls(product);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-6 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
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

      {/* Product Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Images Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image */}
              <div className="mb-6 rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                <img
                  src={images[selectedImage]}
                  alt={product.name?.[lang] || 'Product'}
                  className="w-full h-[500px] object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800';
                  }}
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`rounded-xl overflow-hidden border-4 transition-all bg-gray-100 ${
                        selectedImage === idx 
                          ? 'border-primary shadow-lg scale-105' 
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-24 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              {/* Category Badge */}
              {product.category && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold text-sm">
                    <FaBox />
                    {product.category}
                  </span>
                </div>
              )}

              {/* Product Name */}
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                {product.name?.[lang] || product.name?.en}
              </h1>

              {/* Price */}
              {product.price && (
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">
                    ${product.price}
                  </span>
                  <span className="text-gray-500 ml-2">
                    {lang === 'ar' ? 'للطلبيات الكبيرة' : lang === 'es' ? 'para pedidos grandes' : 'for bulk orders'}
                  </span>
                </div>
              )}

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {lang === 'ar' ? 'الوصف' : lang === 'es' ? 'Descripción' : 'Description'}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {product.description?.[lang] || product.description?.en}
                </p>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {lang === 'ar' ? 'المميزات' : lang === 'es' ? 'Características' : 'Features'}
                  </h2>
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <FaCheckCircle className="text-primary text-xl mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-lg">
                          {feature[lang] || feature.en}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quality Badges */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                  <FaLeaf className="text-3xl text-green-600" />
                  <div>
                    <div className="font-bold text-gray-900">
                      {lang === 'ar' ? 'عضوي' : lang === 'es' ? 'Orgánico' : 'Organic'}
                    </div>
                    <div className="text-sm text-gray-600">100%</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                  <FaCertificate className="text-3xl text-blue-600" />
                  <div>
                    <div className="font-bold text-gray-900">
                      {lang === 'ar' ? 'معتمد' : lang === 'es' ? 'Certificado' : 'Certified'}
                    </div>
                    <div className="text-sm text-gray-600">ISO</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                  <FaShippingFast className="text-3xl text-purple-600" />
                  <div>
                    <div className="font-bold text-gray-900">
                      {lang === 'ar' ? 'شحن' : lang === 'es' ? 'Envío' : 'Shipping'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {lang === 'ar' ? 'عالمي' : lang === 'es' ? 'Mundial' : 'Worldwide'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl">
                  <FaCheckCircle className="text-3xl text-orange-600" />
                  <div>
                    <div className="font-bold text-gray-900">
                      {lang === 'ar' ? 'جودة' : lang === 'es' ? 'Calidad' : 'Quality'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {lang === 'ar' ? 'ممتازة' : lang === 'es' ? 'Premium' : 'Premium'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-dark text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <FaEnvelope />
                  {lang === 'ar' ? 'طلب عرض سعر' : lang === 'es' ? 'Solicitar Cotización' : 'Request Quote'}
                </Link>
                <Link
                  to="/products"
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 border-2 border-primary text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all"
                >
                  <FaChevronLeft />
                  {lang === 'ar' ? 'منتجات أخرى' : lang === 'es' ? 'Otros Productos' : 'Other Products'}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products or CTA */}
      <section className="py-24 bg-gradient-to-br from-primary to-dark text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              {lang === 'ar' ? 'مهتم بهذا المنتج؟' : lang === 'es' ? '¿Interesado en este producto?' : 'Interested in this Product?'}
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              {lang === 'ar'
                ? 'تواصل معنا للحصول على عرض سعر مخصص وشروط التوصيل'
                : lang === 'es'
                ? 'Contáctenos para obtener una cotización personalizada y términos de entrega'
                : 'Contact us for a custom quote and delivery terms'}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-primary font-bold rounded-full hover:shadow-2xl transition-all hover:scale-105"
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