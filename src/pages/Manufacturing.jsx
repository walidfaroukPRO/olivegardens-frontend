import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaIndustry, FaLeaf, FaCheckCircle, FaCog, FaBox, FaTruck } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const Manufacturing = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isRTL = lang === 'ar';
  
  const [loading, setLoading] = useState(false);

  const manufacturingSteps = [
    {
      step: '1',
      icon: <FaLeaf className="text-4xl" />,
      title: { 
        en: 'Harvesting & Selection', 
        ar: 'الحصاد والاختيار',
        es: 'Cosecha y Selección'
      },
      desc: { 
        en: 'Careful selection and harvesting of premium olives at peak ripeness using traditional methods combined with modern technology',
        ar: 'اختيار وحصاد دقيق للزيتون الفاخر في ذروة نضجه باستخدام الطرق التقليدية المدمجة مع التكنولوجيا الحديثة',
        es: 'Selección cuidadosa y cosecha de aceitunas premium en su punto óptimo de maduración'
      },
      image: 'https://www.maan-ctr.org/magazine//files/image/photos/firas/4-1.jpg?w=800',
      color: 'from-green-500 to-emerald-600'
    },
    {
      step: '2',
      icon: <FaCog className="text-4xl" />,
      title: { 
        en: 'Washing & Sorting', 
        ar: 'الغسيل والفرز',
        es: 'Lavado y Clasificación'
      },
      desc: { 
        en: 'Thorough cleaning process and quality inspection using advanced automated systems to ensure only the finest olives proceed',
        ar: 'عملية تنظيف شاملة وفحص جودة باستخدام أنظمة آلية متقدمة لضمان المضي قدماً بأفضل الزيتون فقط',
        es: 'Proceso de limpieza exhaustivo e inspección de calidad utilizando sistemas automatizados avanzados'
      },
      image: 'https://www.internationaloliveoil.org/wp-content/uploads/2019/03/green_olives.jpg?w=800',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      step: '3',
      icon: <FaIndustry className="text-4xl" />,
      title: { 
        en: 'Processing & Treatment', 
        ar: 'المعالجة والتصنيع',
        es: 'Procesamiento y Tratamiento'
      },
      desc: { 
        en: 'Expert processing, curing, and flavoring using secret family recipes and state-of-the-art equipment in climate-controlled facilities',
        ar: 'معالجة وتنكيه احترافية باستخدام وصفات عائلية سرية ومعدات حديثة في منشآت ذات تحكم بالمناخ',
        es: 'Procesamiento experto, curado y saborizante utilizando recetas familiares secretas'
      },
      image: 'https://www.frantoiogrevepesa.com/wp-content/uploads/2023/05/frantoio4.jpg?w=800',
      color: 'from-purple-500 to-pink-600'
    },
    {
      step: '4',
      icon: <FaCheckCircle className="text-4xl" />,
      title: { 
        en: 'Quality Control', 
        ar: 'مراقبة الجودة',
        es: 'Control de Calidad'
      },
      desc: { 
        en: 'Rigorous quality testing and analysis by certified food technologists ensuring international standards compliance',
        ar: 'اختبار وتحليل صارم للجودة من قبل تقنيي أغذية معتمدين لضمان الامتثال للمعايير الدولية',
        es: 'Pruebas y análisis rigurosos de calidad por tecnólogos alimentarios certificados'
      },
      image: 'https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=800',
      color: 'from-orange-500 to-red-600'
    },
    {
      step: '5',
      icon: <FaBox className="text-4xl" />,
      title: { 
        en: 'Packaging & Preservation', 
        ar: 'التعبئة والحفظ',
        es: 'Empaque y Conservación'
      },
      desc: { 
        en: 'Hygienic packaging in various sizes using food-grade materials, vacuum sealing, and proper labeling for export',
        ar: 'تعبئة صحية بأحجام مختلفة باستخدام مواد غذائية، ختم مفرغ من الهواء، ووضع العلامات المناسبة للتصدير',
        es: 'Empaque higiénico en varios tamaños utilizando materiales de grado alimenticio'
      },
      image: 'https://images.unsplash.com/photo-1580712015632-73a56c8c2e02?w=800',
      color: 'from-yellow-500 to-amber-600'
    },
    {
      step: '6',
      icon: <FaTruck className="text-4xl" />,
      title: { 
        en: 'Storage & Distribution', 
        ar: 'التخزين والتوزيع',
        es: 'Almacenamiento y Distribución'
      },
      desc: { 
        en: 'Proper storage in temperature-controlled warehouses and efficient global distribution network to ensure freshness',
        ar: 'تخزين مناسب في مستودعات ذات تحكم بالحرارة وشبكة توزيع عالمية فعالة لضمان النضارة',
        es: 'Almacenamiento adecuado en almacenes con temperatura controlada y red de distribución global'
      },
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
      color: 'from-teal-500 to-green-600'
    }
  ];

  const facilities = [
    {
      title: { en: 'Modern Factory', ar: 'مصنع حديث', es: 'Fábrica Moderna' },
      desc: { 
        en: '10,000 m² facility',
        ar: 'منشأة 10,000 م²',
        es: '10,000 m² instalación'
      },
      icon: '🏭',
      number: '10K'
    },
    {
      title: { en: 'ISO Certified', ar: 'معتمد ISO', es: 'Certificado ISO' },
      desc: { 
        en: 'ISO 22000 & HACCP',
        ar: 'ISO 22000 و HACCP',
        es: 'ISO 22000 y HACCP'
      },
      icon: '✅',
      number: '100%'
    },
    {
      title: { en: 'Expert Team', ar: 'فريق خبير', es: 'Equipo Experto' },
      desc: { 
        en: 'Skilled workers',
        ar: 'عمال ماهرون',
        es: 'Trabajadores cualificados'
      },
      icon: '👥',
      number: '100+'
    },
    {
      title: { en: 'Daily Capacity', ar: 'الطاقة اليومية', es: 'Capacidad Diaria' },
      desc: { 
        en: 'Processing capacity',
        ar: 'طاقة المعالجة',
        es: 'Capacidad de procesamiento'
      },
      icon: '📊',
      number: '50T'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section - Compact */}
      <section className="relative h-[45vh] md:h-[50vh] bg-gradient-to-br from-primary via-green-600 to-dark overflow-hidden mt-[68px]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative h-full flex items-center justify-center text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-5xl mb-4">🏭</div>
              <h1 className={`text-4xl md:text-5xl font-black mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? 'عملية التصنيع' : lang === 'es' ? 'Proceso de Fabricación' : 'Manufacturing Process'}
              </h1>
              <p className={`text-lg md:text-xl text-gray-100 ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' 
                  ? 'من المزرعة إلى المائدة - رحلة الجودة'
                  : lang === 'es'
                  ? 'De la granja a la mesa - Viaje de calidad'
                  : 'From Farm to Table - A Journey of Quality'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manufacturing Steps - Compact */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-black text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'مراحل الإنتاج' : lang === 'es' ? 'Etapas de Producción' : 'Production Stages'}
            </h2>
            <p className={`text-base text-gray-600 max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar'
                ? 'نتبع عملية تصنيع دقيقة لضمان أعلى معايير الجودة'
                : lang === 'es'
                ? 'Seguimos un proceso preciso para garantizar los más altos estándares'
                : 'We follow a precise process to ensure the highest quality standards'}
            </p>
          </motion.div>

          <div className="space-y-16">
            {manufacturingSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`flex flex-col ${
                  (isRTL && index % 2 === 0) || (!isRTL && index % 2 === 1) 
                    ? 'lg:flex-row-reverse' 
                    : 'lg:flex-row'
                } gap-8 items-center`}
              >
                {/* Image */}
                <div className="flex-1 w-full">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                    <img 
                      src={step.image}
                      alt={step.title[lang]}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Step Number Badge */}
                    <div className={`absolute top-4 ${
                      (isRTL && index % 2 === 0) || (!isRTL && index % 2 === 1) ? 'right-4' : 'left-4'
                    }`}>
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                        {step.step}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 w-full">
                  <div className={`p-6 bg-white rounded-2xl shadow-lg border-l-4 border-primary ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-4`}>
                      {step.icon}
                    </div>
                    
                    <h3 className={`text-2xl font-bold text-gray-900 mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                      {step.title[lang]}
                    </h3>
                    
                    <p className={`text-base text-gray-700 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                      {step.desc[lang]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Stats - Compact */}
      <section className="py-16 bg-gradient-to-br from-primary to-dark text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-black mb-3 ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'منشآتنا' : lang === 'es' ? 'Nuestras Instalaciones' : 'Our Facilities'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="text-4xl mb-3">{facility.icon}</div>
                <div className="text-3xl font-bold mb-2">{facility.number}</div>
                <h4 className={`text-lg font-bold mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                  {facility.title[lang]}
                </h4>
                <p className={`text-sm text-gray-200 ${isRTL ? 'font-arabic' : ''}`}>
                  {facility.desc[lang]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Compact */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <HiSparkles className="text-5xl text-primary mx-auto mb-4" />
            <h2 className={`text-3xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'هل تريد زيارة مصنعنا؟' : lang === 'es' ? '¿Quiere visitar nuestra fábrica?' : 'Want to Visit Our Factory?'}
            </h2>
            <p className={`text-lg text-gray-600 mb-8 max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar'
                ? 'نرحب بالعملاء والشركاء لزيارة منشآتنا ورؤية عملية الإنتاج'
                : lang === 'es'
                ? 'Damos la bienvenida a clientes y socios para visitar nuestras instalaciones'
                : 'We welcome clients and partners to visit our facilities and see our production'}
            </p>
            <a
              href="/contact"
              className={`inline-block px-8 py-3 bg-gradient-to-r from-primary to-green-600 text-white font-bold rounded-full hover:shadow-xl transition-all hover:scale-105 ${
                isRTL ? 'font-arabic' : ''
              }`}
            >
              {lang === 'ar' ? 'اتصل بنا' : lang === 'es' ? 'Contáctenos' : 'Contact Us'}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Manufacturing;