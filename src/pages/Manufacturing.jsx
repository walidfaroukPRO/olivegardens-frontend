import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaIndustry, FaLeaf, FaCheckCircle, FaCog } from 'react-icons/fa';

const Manufacturing = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  
  const [loading, setLoading] = useState(false);

  const manufacturingSteps = [
    {
      step: '1',
      icon: <FaLeaf className="text-5xl" />,
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
      icon: <FaCog className="text-5xl" />,
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
      icon: <FaIndustry className="text-5xl" />,
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
      icon: <FaCheckCircle className="text-5xl" />,
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
      icon: <FaCheckCircle className="text-5xl" />,
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
      icon: <FaCheckCircle className="text-5xl" />,
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
        en: '10,000 sqm facility with latest technology',
        ar: 'منشأة 10,000 متر مربع بأحدث التقنيات',
        es: 'Instalación de 10,000 m² con la última tecnología'
      },
      icon: '🏭'
    },
    {
      title: { en: 'ISO Certified', ar: 'معتمد ISO', es: 'Certificado ISO' },
      desc: { 
        en: 'ISO 22000 & HACCP certified production',
        ar: 'إنتاج معتمد من ISO 22000 و HACCP',
        es: 'Producción certificada ISO 22000 y HACCP'
      },
      icon: '✅'
    },
    {
      title: { en: 'Expert Team', ar: 'فريق خبير', es: 'Equipo Experto' },
      desc: { 
        en: '100+ skilled workers and technicians',
        ar: 'أكثر من 100 عامل وفني ماهر',
        es: 'Más de 100 trabajadores y técnicos cualificados'
      },
      icon: '👥'
    },
    {
      title: { en: 'Daily Production', ar: 'الإنتاج اليومي', es: 'Producción Diaria' },
      desc: { 
        en: '50+ tons processing capacity per day',
        ar: 'طاقة معالجة أكثر من 50 طن يومياً',
        es: 'Capacidad de procesamiento de más de 50 toneladas por día'
      },
      icon: '📊'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-primary via-dark to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative h-full flex items-center justify-center text-white mt-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-6xl mb-6">🏭</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {lang === 'ar' ? 'عملية التصنيع' : lang === 'es' ? 'Proceso de Fabricación' : 'Manufacturing Process'}
              </h1>
              <p className="text-2xl text-gray-200">
                {lang === 'ar' 
                  ? 'من المزرعة إلى المائدة - رحلة الجودة والتميز'
                  : lang === 'es'
                  ? 'De la granja a la mesa - Viaje de calidad y excelencia'
                  : 'From Farm to Table - A Journey of Quality & Excellence'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manufacturing Steps */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              {lang === 'ar' ? 'مراحل الإنتاج' : lang === 'es' ? 'Etapas de Producción' : 'Production Stages'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {lang === 'ar'
                ? 'نتبع عملية تصنيع دقيقة ومتقدمة لضمان أعلى معايير الجودة'
                : lang === 'es'
                ? 'Seguimos un proceso de fabricación preciso y avanzado para garantizar los más altos estándares'
                : 'We follow a precise and advanced manufacturing process to ensure the highest quality standards'}
            </p>
          </motion.div>

          <div className="space-y-24">
            {manufacturingSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                {/* Image */}
                <div className="flex-1">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                    <img 
                      src={step.image}
                      alt={step.title[lang]}
                      className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Step Number Badge */}
                    <div className={`absolute top-6 ${index % 2 === 0 ? 'left-6' : 'right-6'}`}>
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-3xl font-bold shadow-xl`}>
                        {step.step}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className={`p-8 bg-white rounded-3xl shadow-xl border-l-8 border-primary`}>
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-6`}>
                      {step.icon}
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {step.title[lang]}
                    </h3>
                    
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {step.desc[lang]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Stats */}
      <section className="py-24 bg-gradient-to-br from-primary to-dark text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              {lang === 'ar' ? 'منشآتنا' : lang === 'es' ? 'Nuestras Instalaciones' : 'Our Facilities'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{facility.icon}</div>
                <h4 className="text-2xl font-bold mb-3">{facility.title[lang]}</h4>
                <p className="text-gray-200 text-lg">{facility.desc[lang]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {lang === 'ar' ? 'هل تريد زيارة مصنعنا؟' : lang === 'es' ? '¿Quiere visitar nuestra fábrica?' : 'Want to Visit Our Factory?'}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {lang === 'ar'
              ? 'نرحب بالعملاء والشركاء لزيارة منشآتنا ورؤية عملية الإنتاج'
              : lang === 'es'
              ? 'Damos la bienvenida a clientes y socios para visitar nuestras instalaciones'
              : 'We welcome clients and partners to visit our facilities and see our production process'}
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-gradient-to-r from-primary to-dark text-white font-bold rounded-full hover:shadow-2xl transition-all hover:scale-105"
          >
            {lang === 'ar' ? 'اتصل بنا' : lang === 'es' ? 'Contáctenos' : 'Contact Us'}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Manufacturing;
