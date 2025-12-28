import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaImage, FaSearch, FaTimes } from 'react-icons/fa';

const Gallery = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get('/api/gallery');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      // Set fallback images if API fails
      setImages([
        { _id: '1', imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800', title: { en: 'Olive Field', ar: 'حقل الزيتون' } },
        { _id: '2', imageUrl: 'https://images.unsplash.com/photo-1566843536955-cef079ec2f8d?w=800', title: { en: 'Harvesting', ar: 'الحصاد' } },
        { _id: '3', imageUrl: 'https://images.unsplash.com/photo-1596040033229-a0b10e4c424e?w=800', title: { en: 'Processing', ar: 'المعالجة' } },
        { _id: '4', imageUrl: 'https://images.unsplash.com/photo-1580712015632-73a56c8c2e02?w=800', title: { en: 'Packaging', ar: 'التعبئة' } },
        { _id: '5', imageUrl: 'https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=800', title: { en: 'Quality Check', ar: 'فحص الجودة' } },
        { _id: '6', imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800', title: { en: 'Storage', ar: 'التخزين' } }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = images.filter(img => 
    !searchTerm || 
    (img.title && img.title[lang]?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-dark">
        <div className="text-center text-white">
          <div className="inline-block w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl">{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
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
              <FaImage className="text-6xl mx-auto mb-6" />
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {lang === 'ar' ? 'المعرض' : lang === 'es' ? 'Galería' : 'Gallery'}
              </h1>
              <p className="text-2xl text-gray-200">
                {lang === 'ar' 
                  ? 'شاهد منتجاتنا ومنشآتنا الحديثة'
                  : lang === 'es'
                  ? 'Vea nuestros productos e instalaciones modernas'
                  : 'View our products and modern facilities'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={lang === 'ar' ? 'بحث في المعرض...' : lang === 'es' ? 'Buscar en galería...' : 'Search gallery...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
              />
            </div>
            
            <div className="text-gray-600">
              <span className="font-semibold">{filteredImages.length}</span> {lang === 'ar' ? 'صورة' : lang === 'es' ? 'imágenes' : 'images'}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {filteredImages.length === 0 ? (
            <div className="text-center py-20">
              <FaImage className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">
                {lang === 'ar' ? 'لا توجد صور' : lang === 'es' ? 'No hay imágenes' : 'No images found'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image._id || index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image.imageUrl}
                    alt={image.title?.[lang] || `Gallery ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      {image.title && (
                        <h3 className="text-white font-bold text-lg">
                          {image.title[lang] || image.title.en}
                        </h3>
                      )}
                      <p className="text-gray-300 text-sm mt-1">
                        {lang === 'ar' ? 'انقر للعرض' : lang === 'es' ? 'Clic para ver' : 'Click to view'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <FaTimes className="text-2xl" />
          </button>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-6xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title?.[lang] || 'Gallery Image'}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />
            
            {selectedImage.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                <h3 className="text-white text-2xl font-bold">
                  {selectedImage.title[lang] || selectedImage.title.en}
                </h3>
                {selectedImage.description && (
                  <p className="text-gray-300 mt-2">
                    {selectedImage.description[lang] || selectedImage.description.en}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-dark text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              {lang === 'ar' ? 'مهتم بمنتجاتنا؟' : lang === 'es' ? '¿Interesado en nuestros productos?' : 'Interested in Our Products?'}
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              {lang === 'ar'
                ? 'تواصل معنا اليوم للحصول على عرض سعر'
                : lang === 'es'
                ? 'Contáctenos hoy para obtener una cotización'
                : 'Contact us today for a quote'}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/products"
                className="px-10 py-4 bg-white text-primary font-bold rounded-full hover:shadow-2xl transition-all hover:scale-105"
              >
                {lang === 'ar' ? 'منتجاتنا' : lang === 'es' ? 'Productos' : 'Our Products'}
              </a>
              <a
                href="/contact"
                className="px-10 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-primary transition-all"
              >
                {lang === 'ar' ? 'اتصل بنا' : lang === 'es' ? 'Contacto' : 'Contact Us'}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
