import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { 
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube,
  FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const currentYear = new Date().getFullYear();

  const [companyInfo, setCompanyInfo] = useState({
    name: { en: 'OliveGardens', ar: 'أوليف جاردنز', es: 'OliveGardens' },
    tagline: {
      en: 'Premium quality olive products since 1980',
      ar: 'منتجات زيتون عالية الجودة منذ 1980',
      es: 'Productos de aceituna de calidad premium desde 1980'
    }
  });

  const [contactInfo, setContactInfo] = useState({
    phone: '+201220739090',
    phone2: '+201111091105',
    whatsapp: '+201220739090',
    email: 'info@olivegardenseg.com',
    address: { 
      en: 'Cairo, Egypt', 
      ar: 'القاهرة، مصر',
      es: 'El Cairo, Egipto'
    },
    social: {
      facebook: 'https://facebook.com/olivegardens',
      twitter: 'https://twitter.com/olivegardens',
      instagram: 'https://instagram.com/olivegardens',
      linkedin: 'https://linkedin.com/company/olivegardens',
      youtube: 'https://youtube.com/@olivegardens'
    }
  });

  useEffect(() => {
    fetchContent();
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
      // Using default values
    }
  };

  return (
    <footer className="bg-gradient-to-r from-primary to-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">🫒</span>
              <h3 className="text-2xl font-bold">
                {companyInfo?.name?.[lang] || companyInfo?.name?.en}
              </h3>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">
              {companyInfo?.tagline?.[lang] || companyInfo?.tagline?.ar}
            </p>
            
            {/* Social Media */}
            <div className="flex gap-3 mt-4">
              {contactInfo?.social?.facebook && (
                <a 
                  href={contactInfo.social.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                >
                  <FaFacebook size={18} />
                </a>
              )}
              
              {contactInfo?.social?.twitter && (
                <a 
                  href={contactInfo.social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                >
                  <FaTwitter size={18} />
                </a>
              )}
              
              {contactInfo?.social?.instagram && (
                <a 
                  href={contactInfo.social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                >
                  <FaInstagram size={18} />
                </a>
              )}
              
              {contactInfo?.social?.linkedin && (
                <a 
                  href={contactInfo.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                >
                  <FaLinkedin size={18} />
                </a>
              )}
              
              {contactInfo?.social?.youtube && (
                <a 
                  href={contactInfo.social.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                >
                  <FaYoutube size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Empty Space (for balance) */}
          <div></div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">
              {lang === 'ar' ? 'تواصل معنا' : lang === 'es' ? 'Contáctenos' : 'Contact Us'}
            </h4>
            <ul className="space-y-3 text-sm">
              {contactInfo?.address && (
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-gray-300" size={14} />
                  <span className="text-gray-200">
                    {contactInfo.address[lang] || contactInfo.address.ar}
                  </span>
                </li>
              )}
              
              {(contactInfo?.phone || contactInfo?.phone2) && (
                <li className="flex items-start gap-2">
                  <FaPhone className="mt-1 flex-shrink-0 text-gray-300" size={14} />
                  <div className="text-gray-200">
                    {contactInfo?.phone && (
                      <a href={`tel:${contactInfo.phone}`} className="hover:text-white transition-colors block">
                        {contactInfo.phone}
                      </a>
                    )}
                    {contactInfo?.phone2 && (
                      <a href={`tel:${contactInfo.phone2}`} className="hover:text-white transition-colors block">
                        {contactInfo.phone2}
                      </a>
                    )}
                  </div>
                </li>
              )}
              
              {contactInfo?.whatsapp && (
                <li className="flex items-center gap-2">
                  <FaWhatsapp className="flex-shrink-0 text-gray-300" size={14} />
                  <a 
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/\s+/g, '')}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-white transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              
              {contactInfo?.email && (
                <li className="flex items-center gap-2">
                  <FaEnvelope className="flex-shrink-0 text-gray-300" size={14} />
                  <a 
                    href={`mailto:${contactInfo.email}`} 
                    className="text-gray-200 hover:text-white transition-colors break-all"
                  >
                    {contactInfo.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/20">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-200">
              © {currentYear} {companyInfo?.name?.[lang] || companyInfo?.name?.ar}.{' '}
              {lang === 'ar' 
                ? 'جميع الحقوق محفوظة' 
                : lang === 'es'
                ? 'Todos los derechos reservados'
                : 'All rights reserved'}
            </p>
            <p className="text-xs text-gray-300">
              {lang === 'ar' 
                ? 'شركة مساهمة مصرية (ش.م.م) • تأسست 1980 • القاهرة، مصر'
                : lang === 'es'
                ? 'Compañía Egipcia S.A.E. • Fundada en 1980 • El Cairo, Egipto'
                : 'Egyptian S.A.E. Company • Established 1980 • Cairo, Egypt'}
            </p>
            <p className="text-xs text-gray-400">
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
  );
};

export default Footer;