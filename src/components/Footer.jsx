import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp, FaArrowUp 
} from 'react-icons/fa';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const currentYear = new Date().getFullYear();

  const [companyInfo, setCompanyInfo] = useState({
    name: { en: 'OliveGardens', ar: 'أوليف جاردنز', es: 'OliveGardens' },
    shortDescription: {
      en: 'Premium quality olive products exported worldwide since 1980',
      ar: 'منتجات زيتون عالية الجودة تُصدّر للعالم منذ 1980',
      es: 'Productos de aceituna de calidad premium exportados mundialmente desde 1980'
    }
  });

  const [contactInfo, setContactInfo] = useState({
    phone: '+20 123 456 7890',
    whatsapp: '+20 123 456 7890',
    email: 'info@olivegardens.com',
    address: { 
      en: 'Industrial Zone, 6th October City, Giza, Egypt', 
      ar: 'المنطقة الصناعية، مدينة 6 أكتوبر، الجيزة، مصر',
      es: 'Zona Industrial, Ciudad 6 de Octubre, Giza, Egipto'
    },
    social: {
      facebook: 'https://facebook.com/olivegardens',
      twitter: 'https://twitter.com/olivegardens',
      instagram: 'https://instagram.com/olivegardens',
      linkedin: 'https://linkedin.com/company/olivegardens',
      youtube: 'https://youtube.com/@olivegardens'
    }
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    fetchContent();
    
    // Scroll to top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchContent = async () => {
    try {
      const [companyRes, contactRes] = await Promise.allSettled([
        axios.get('/api/content/footer'),
        axios.get('/api/content/contact-info')
      ]);

      if (companyRes.status === 'fulfilled' && companyRes.value.data?.companyInfo) {
        setCompanyInfo(companyRes.value.data.companyInfo);
      }

      if (contactRes.status === 'fulfilled' && contactRes.value.data?.contactInfo) {
        setContactInfo(contactRes.value.data.contactInfo);
      }
    } catch (error) {
      console.error('Error fetching footer content:', error);
      // Using default values already set in state
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { path: '/', label: { en: 'Home', ar: 'الرئيسية', es: 'Inicio' } },
    { path: '/about', label: { en: 'About Us', ar: 'من نحن', es: 'Sobre Nosotros' } },
    { path: '/products', label: { en: 'Products', ar: 'المنتجات', es: 'Productos' } },
    { path: '/manufacturing', label: { en: 'Manufacturing', ar: 'التصنيع', es: 'Fabricación' } },
    { path: '/gallery', label: { en: 'Gallery', ar: 'المعرض', es: 'Galería' } },
    { path: '/certificates', label: { en: 'Certificates', ar: 'الشهادات', es: 'Certificados' } },
    { path: '/contact', label: { en: 'Contact', ar: 'اتصل بنا', es: 'Contacto' } }
  ];

  const productCategories = [
    { en: 'Pickled Olives', ar: 'زيتون مخلل', es: 'Aceitunas Encurtidas' },
    { en: 'Olive Oil', ar: 'زيت زيتون', es: 'Aceite de Oliva' },
    { en: 'Olive Paste', ar: 'معجون زيتون', es: 'Pasta de Aceituna' },
    { en: 'Stuffed Olives', ar: 'زيتون محشي', es: 'Aceitunas Rellenas' },
    { en: 'Black Olives', ar: 'زيتون أسود', es: 'Aceitunas Negras' },
    { en: 'Green Olives', ar: 'زيتون أخضر', es: 'Aceitunas Verdes' }
  ];

  const certificates = [
    { en: 'ISO 9001:2015', ar: 'ISO 9001:2015', es: 'ISO 9001:2015' },
    { en: 'ISO 22000', ar: 'ISO 22000', es: 'ISO 22000' },
    { en: 'HACCP', ar: 'HACCP', es: 'HACCP' },
    { en: 'HALAL Certified', ar: 'حلال معتمد', es: 'Certificado Halal' }
  ];

  return (
    <>
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-2 text-primary">
                🫒 {companyInfo?.name?.[lang] || companyInfo?.name?.en}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {companyInfo?.shortDescription?.[lang] || companyInfo?.shortDescription?.en}
              </p>
              
              {/* Social Media */}
              <div className="flex gap-3 flex-wrap">
                {contactInfo?.social?.facebook && (
                  <a 
                    href={contactInfo.social.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-all hover:scale-110"
                  >
                    <FaFacebook size={20} />
                  </a>
                )}
                {contactInfo?.social?.twitter && (
                  <a 
                    href={contactInfo.social.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-all hover:scale-110"
                  >
                    <FaTwitter size={20} />
                  </a>
                )}
                {contactInfo?.social?.instagram && (
                  <a 
                    href={contactInfo.social.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-all hover:scale-110"
                  >
                    <FaInstagram size={20} />
                  </a>
                )}
                {contactInfo?.social?.linkedin && (
                  <a 
                    href={contactInfo.social.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-all hover:scale-110"
                  >
                    <FaLinkedin size={20} />
                  </a>
                )}
                {contactInfo?.social?.youtube && (
                  <a 
                    href={contactInfo.social.youtube} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-all hover:scale-110"
                  >
                    <FaYoutube size={20} />
                  </a>
                )}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-xl font-bold mb-6 text-primary">
                {lang === 'ar' ? 'روابط سريعة' : lang === 'es' ? 'Enlaces Rápidos' : 'Quick Links'}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path}
                      className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all"></span>
                      {link.label[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Products */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-xl font-bold mb-6 text-primary">
                {lang === 'ar' ? 'منتجاتنا' : lang === 'es' ? 'Nuestros Productos' : 'Our Products'}
              </h4>
              <ul className="space-y-3 text-gray-300">
                {productCategories.map((product, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    {product[lang]}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-xl font-bold mb-6 text-primary">
                {lang === 'ar' ? 'تواصل معنا' : lang === 'es' ? 'Contáctenos' : 'Contact Us'}
              </h4>
              <ul className="space-y-4 text-gray-300">
                {contactInfo?.address && (
                  <li className="flex items-start gap-3">
                    <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-primary" />
                    <span className="leading-relaxed">
                      {contactInfo.address[lang] || contactInfo.address.en}
                    </span>
                  </li>
                )}
                {contactInfo?.phone && (
                  <li className="flex items-center gap-3">
                    <FaPhone className="flex-shrink-0 text-primary" />
                    <a href={`tel:${contactInfo.phone}`} className="hover:text-primary transition-colors">
                      {contactInfo.phone}
                    </a>
                  </li>
                )}
                {contactInfo?.whatsapp && (
                  <li className="flex items-center gap-3">
                    <FaWhatsapp className="flex-shrink-0 text-primary" />
                    <a 
                      href={`https://wa.me/${contactInfo.whatsapp.replace(/\s+/g, '')}`} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
                {contactInfo?.email && (
                  <li className="flex items-center gap-3">
                    <FaEnvelope className="flex-shrink-0 text-primary" />
                    <a href={`mailto:${contactInfo.email}`} className="hover:text-primary transition-colors">
                      {contactInfo.email}
                    </a>
                  </li>
                )}
              </ul>
            </motion.div>
          </div>

          {/* Certificates Bar */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-wrap items-center justify-center gap-8">
              {certificates.map((cert, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg"
                >
                  <span className="text-primary">✓</span>
                  <span className="text-sm text-gray-300">{cert[lang]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="text-center">
              <p className="text-gray-400 mb-2">
                © {currentYear} {companyInfo?.name?.[lang] || companyInfo?.name?.en}.{' '}
                {lang === 'ar' 
                  ? 'جميع الحقوق محفوظة' 
                  : lang === 'es'
                  ? 'Todos los derechos reservados'
                  : 'All rights reserved'}
              </p>
              <p className="text-sm text-gray-500">
                {lang === 'ar' 
                  ? 'شركة مساهمة مصرية (ش.م.م) • تأسست 1980 • القاهرة، مصر'
                  : lang === 'es'
                  ? 'Compañía Egipcia S.A.E. • Fundada en 1980 • El Cairo, Egipto'
                  : 'Egyptian S.A.E. Company • Established 1980 • Cairo, Egypt'}
              </p>
              <p className="text-xs text-gray-600 mt-3">
                {lang === 'ar'
                  ? 'تصميم وتطوير بواسطة OliveGardens Tech Team'
                  : lang === 'es'
                  ? 'Diseñado y desarrollado por OliveGardens Tech Team'
                  : 'Designed & Developed by OliveGardens Tech Team'}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-primary to-dark text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </>
  );
};

export default Footer;