import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  FaCertificate, FaAward, FaShieldAlt, FaCheckCircle, 
  FaLeaf, FaIndustry, FaGlobeAmericas 
} from 'react-icons/fa';

const Certificates = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const certificates = [
    {
      name: 'ISO 9001:2015',
      icon: <FaCertificate className="text-5xl" />,
      desc: { 
        en: 'Quality Management System - Ensures consistent quality in products and services through systematic processes',
        ar: 'نظام إدارة الجودة - يضمن جودة متسقة في المنتجات والخدمات من خلال عمليات منهجية',
        es: 'Sistema de Gestión de Calidad - Asegura calidad consistente en productos y servicios'
      },
      color: 'from-blue-500 to-blue-600',
      year: '2010'
    },
    {
      name: 'ISO 22000:2018',
      icon: <FaShieldAlt className="text-5xl" />,
      desc: { 
        en: 'Food Safety Management - International standard for food safety management throughout the supply chain',
        ar: 'إدارة سلامة الأغذية - معيار دولي لإدارة سلامة الأغذية في جميع مراحل سلسلة التوريد',
        es: 'Gestión de Seguridad Alimentaria - Estándar internacional para la gestión de la seguridad alimentaria'
      },
      color: 'from-green-500 to-green-600',
      year: '2012'
    },
    {
      name: 'HACCP',
      icon: <FaCheckCircle className="text-5xl" />,
      desc: { 
        en: 'Hazard Analysis Critical Control Points - Systematic preventive approach to food safety',
        ar: 'تحليل المخاطر ونقاط التحكم الحرجة - نهج وقائي منهجي لسلامة الأغذية',
        es: 'Análisis de Peligros y Puntos Críticos de Control - Enfoque preventivo sistemático'
      },
      color: 'from-red-500 to-red-600',
      year: '2011'
    },
    {
      name: 'HALAL',
      icon: <FaAward className="text-5xl" />,
      desc: { 
        en: 'Halal Certification - Products comply with Islamic dietary laws and are permissible for Muslim consumption',
        ar: 'شهادة حلال - المنتجات متوافقة مع الشريعة الإسلامية ومسموح بها للاستهلاك الإسلامي',
        es: 'Certificación Halal - Productos conformes con las leyes dietéticas islámicas'
      },
      color: 'from-emerald-500 to-emerald-600',
      year: '2013'
    },
    {
      name: 'ORGANIC',
      icon: <FaLeaf className="text-5xl" />,
      desc: { 
        en: 'Organic Certification - Products grown without synthetic pesticides or chemical fertilizers',
        ar: 'شهادة عضوية - منتجات مزروعة بدون مبيدات حشرية صناعية أو أسمدة كيميائية',
        es: 'Certificación Orgánica - Productos cultivados sin pesticidas sintéticos'
      },
      color: 'from-lime-500 to-lime-600',
      year: '2014'
    },
    {
      name: 'GMP',
      icon: <FaIndustry className="text-5xl" />,
      desc: { 
        en: 'Good Manufacturing Practice - Guidelines ensuring products are consistently produced and controlled',
        ar: 'ممارسات التصنيع الجيدة - إرشادات تضمن إنتاج ومراقبة المنتجات بشكل متسق',
        es: 'Buenas Prácticas de Manufactura - Directrices que aseguran producción consistente'
      },
      color: 'from-purple-500 to-purple-600',
      year: '2015'
    },
    {
      name: 'FDA',
      icon: <FaShieldAlt className="text-5xl" />,
      desc: { 
        en: 'FDA Approved - Meets US Food and Drug Administration standards for safety and quality',
        ar: 'معتمد من FDA - يلبي معايير إدارة الغذاء والدواء الأمريكية للسلامة والجودة',
        es: 'Aprobado por FDA - Cumple con los estándares de la FDA de EE.UU.'
      },
      color: 'from-indigo-500 to-indigo-600',
      year: '2016'
    },
    {
      name: 'GlobalGAP',
      icon: <FaGlobeAmericas className="text-5xl" />,
      desc: { 
        en: 'Global Good Agricultural Practices - International standard for farm production',
        ar: 'الممارسات الزراعية الجيدة العالمية - معيار دولي للإنتاج الزراعي',
        es: 'Buenas Prácticas Agrícolas Globales - Estándar internacional para producción agrícola'
      },
      color: 'from-cyan-500 to-cyan-600',
      year: '2017'
    }
  ];

  const qualityPrinciples = [
    {
      title: { en: 'Quality First', ar: 'الجودة أولاً', es: 'Calidad Primero' },
      desc: { 
        en: 'Never compromise on quality standards',
        ar: 'لا نتنازل أبداً عن معايير الجودة',
        es: 'Nunca comprometer los estándares de calidad'
      },
      icon: '⭐'
    },
    {
      title: { en: 'Safety Standards', ar: 'معايير السلامة', es: 'Estándares de Seguridad' },
      desc: { 
        en: 'Strict adherence to food safety protocols',
        ar: 'الالتزام الصارم ببروتوكولات سلامة الأغذية',
        es: 'Estricta adherencia a protocolos de seguridad'
      },
      icon: '🛡️'
    },
    {
      title: { en: 'Continuous Improvement', ar: 'التحسين المستمر', es: 'Mejora Continua' },
      desc: { 
        en: 'Always seeking to enhance our processes',
        ar: 'نسعى دائماً لتحسين عملياتنا',
        es: 'Siempre buscando mejorar nuestros procesos'
      },
      icon: '📈'
    },
    {
      title: { en: 'Customer Satisfaction', ar: 'رضا العملاء', es: 'Satisfacción del Cliente' },
      desc: { 
        en: 'Meeting and exceeding customer expectations',
        ar: 'تلبية وتجاوز توقعات العملاء',
        es: 'Cumplir y superar las expectativas'
      },
      icon: '😊'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-primary via-dark to-primary overflow-hidden mt-20">
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
              <FaCertificate className="text-6xl mx-auto mb-6" />
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {lang === 'ar' ? 'الشهادات والاعتمادات' : lang === 'es' ? 'Certificados y Acreditaciones' : 'Certificates & Accreditations'}
              </h1>
              <p className="text-2xl text-gray-200">
                {lang === 'ar' 
                  ? 'نلتزم بأعلى معايير الجودة والسلامة العالمية'
                  : lang === 'es'
                  ? 'Comprometidos con los más altos estándares de calidad y seguridad'
                  : 'Committed to the Highest Standards of Quality & Safety'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              {lang === 'ar' ? 'شهاداتنا المعتمدة' : lang === 'es' ? 'Nuestros Certificados' : 'Our Certifications'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {lang === 'ar'
                ? 'نحمل جميع الشهادات الدولية المطلوبة لضمان أعلى جودة ومعايير السلامة'
                : lang === 'es'
                ? 'Tenemos todas las certificaciones internacionales requeridas'
                : 'We hold all required international certifications for highest quality and safety standards'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 text-center h-full border-t-4 border-primary">
                  {/* Icon */}
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center mx-auto mb-6 text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                    {cert.icon}
                  </div>
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    {lang === 'ar' ? 'منذ' : 'Since'} {cert.year}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {cert.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {cert.desc[lang]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Principles */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              {lang === 'ar' ? 'مبادئ الجودة لدينا' : lang === 'es' ? 'Nuestros Principios de Calidad' : 'Our Quality Principles'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="text-6xl mb-4">{principle.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {principle.title[lang]}
                </h4>
                <p className="text-gray-600">
                  {principle.desc[lang]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-dark text-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">
              {lang === 'ar' ? 'التزامنا بالتميز' : lang === 'es' ? 'Nuestro Compromiso con la Excelencia' : 'Our Commitment to Excellence'}
            </h2>
            <p className="text-xl leading-relaxed text-gray-200 mb-8">
              {lang === 'ar'
                ? 'نحن نلتزم بأعلى معايير الجودة الدولية في جميع مراحل الإنتاج. شهاداتنا تؤكد التزامنا المستمر بتقديم منتجات آمنة وعالية الجودة لعملائنا في جميع أنحاء العالم. نعمل باستمرار على تحسين عملياتنا والحفاظ على جميع المعايير والشهادات المطلوبة.'
                : lang === 'es'
                ? 'Nos comprometemos con los más altos estándares de calidad internacional en todas las etapas de producción. Nuestras certificaciones confirman nuestro compromiso continuo de entregar productos seguros y de alta calidad.'
                : 'We are committed to the highest international quality standards at all stages of production. Our certifications confirm our ongoing commitment to delivering safe and high-quality products to our customers worldwide. We continuously work to improve our processes and maintain all required standards and certifications.'}
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

export default Certificates;
