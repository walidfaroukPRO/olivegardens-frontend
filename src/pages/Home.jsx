import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLeaf, FaCertificate, FaShippingFast, FaCheckCircle, 
  FaAward, FaGlobeAmericas, FaIndustry, FaStar 
} from 'react-icons/fa';

const Home = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [heroSlides, setHeroSlides] = useState([]);
  const [aboutData, setAboutData] = useState(null);
  const [stats, setStats] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    if (heroSlides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [heroSlides]);

  const fetchContent = async () => {
    try {
      const [heroRes, aboutRes] = await Promise.all([
        axios.get('/api/content/hero'),
        axios.get('/api/content/about')
      ]);

      if (heroRes.data?.heroSlides) {
        setHeroSlides(heroRes.data.heroSlides.filter(s => s.isActive));
      }
      if (aboutRes.data?.about) setAboutData(aboutRes.data.about);
      if (aboutRes.data?.stats) setStats(aboutRes.data.stats);
    } catch (error) {
      console.error('Error:', error);
      setHeroSlides([{
        title: { en: "Premium Quality Olive Products", ar: "منتجات زيتون بجودة عالمية", es: "Productos de Aceituna Premium" },
        subtitle: { en: "Exporting Excellence Since 1980", ar: "نصدر التميز منذ 1980", es: "Exportando Excelencia Desde 1980" },
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1600",
        buttonText: { en: "Explore Products", ar: "استكشف المنتجات", es: "Explorar Productos" },
        buttonLink: "/products"
      }]);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <FaLeaf className="text-5xl" />,
      title: { en: "100% Natural", ar: "طبيعي 100%", es: "100% Natural" },
      description: { en: "No artificial preservatives or additives", ar: "بدون مواد حافظة أو إضافات صناعية", es: "Sin conservantes artificiales" },
      color: "from-green-400 to-green-600"
    },
    {
      icon: <FaCertificate className="text-5xl" />,
      title: { en: "Certified Quality", ar: "جودة معتمدة", es: "Calidad Certificada" },
      description: { en: "ISO & HACCP certified facilities", ar: "منشآت معتمدة من ISO و HACCP", es: "Instalaciones certificadas ISO y HACCP" },
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: <FaShippingFast className="text-5xl" />,
      title: { en: "Fast Delivery", ar: "شحن سريع", es: "Entrega Rápida" },
      description: { en: "Worldwide shipping to 50+ countries", ar: "شحن عالمي لأكثر من 50 دولة", es: "Envío mundial a más de 50 países" },
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: <FaCheckCircle className="text-5xl" />,
      title: { en: "Quality Guaranteed", ar: "جودة مضمونة", es: "Calidad Garantizada" },
      description: { en: "100% satisfaction guarantee", ar: "ضمان رضا 100%", es: "Garantía de satisfacción 100%" },
      color: "from-orange-400 to-orange-600"
    }
  ];

  const milestones = [
    {
      icon: <FaIndustry />,
      year: "1980",
      title: { en: "Company Founded", ar: "تأسيس الشركة", es: "Fundación" },
      desc: { en: "Started as a small family business", ar: "بدأت كعمل عائلي صغير", es: "Comenzó como negocio familiar" }
    },
    {
      icon: <FaGlobeAmericas />,
      year: "1995",
      title: { en: "International Expansion", ar: "التوسع الدولي", es: "Expansión Internacional" },
      desc: { en: "Entered global markets", ar: "دخول الأسواق العالمية", es: "Ingreso a mercados globales" }
    },
    {
      icon: <FaAward />,
      year: "2010",
      title: { en: "ISO Certification", ar: "شهادة ISO", es: "Certificación ISO" },
      desc: { en: "Quality standards achieved", ar: "تحقيق معايير الجودة", es: "Estándares de calidad alcanzados" }
    },
    {
      icon: <FaStar />,
      year: "2024",
      title: { en: "Industry Leader", ar: "رائد الصناعة", es: "Líder de la Industria" },
      desc: { en: "Top exporter in the region", ar: "أكبر مصدر في المنطقة", es: "Principal exportador regional" }
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-dark">
        <div className="text-center">
          <div className="inline-block w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white mt-4 text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Enhanced */}
      <div className="relative h-screen w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {heroSlides.length > 0 && (
            <motion.div
              key={currentSlide}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              {/* Background with Parallax Effect */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${heroSlides[currentSlide]?.image || 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1600'})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-primary/30"></div>
              </div>

              {/* Animated Particles */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.2, 0.8, 0.2]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center justify-center text-white mt-20">
                <div className="max-w-5xl mx-auto px-6 text-center">
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="inline-block mb-4 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                  >
                    <span className="text-secondary font-semibold">🫒 OliveGardens - Since 1980</span>
                  </motion.div>

                  <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
                  >
                    {heroSlides[currentSlide]?.title?.[lang] || heroSlides[currentSlide]?.title?.en}
                  </motion.h1>
                  
                  <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-xl md:text-3xl mb-10 text-gray-200"
                  >
                    {heroSlides[currentSlide]?.subtitle?.[lang] || heroSlides[currentSlide]?.subtitle?.en}
                  </motion.p>

                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="flex gap-4 justify-center flex-wrap"
                  >
                    <Link
                      to={heroSlides[currentSlide]?.buttonLink || "/products"}
                      className="group relative px-10 py-5 bg-primary text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {heroSlides[currentSlide]?.buttonText?.[lang] || heroSlides[currentSlide]?.buttonText?.en}
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                    </Link>
                    
                    <Link
                      to="/about"
                      className="px-10 py-5 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border-2 border-white/30 hover:bg-white/20 transition-all hover:scale-105"
                    >
                      {lang === 'ar' ? 'من نحن' : lang === 'es' ? 'Sobre Nosotros' : 'Learn More'}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modern Slide Indicators */}
        {heroSlides.length > 1 && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="group relative"
              >
                <div className={`h-1 rounded-full transition-all duration-500 ${
                  currentSlide === index ? 'w-12 bg-white' : 'w-8 bg-white/40'
                }`}></div>
              </button>
            ))}
          </div>
        )}

        {/* Stylish Navigation Arrows */}
        {heroSlides.length > 1 && (
          <>
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 border border-white/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 border border-white/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Features Section - Modern Cards */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 bg-primary/10 text-primary font-bold rounded-full mb-4">
              {lang === 'ar' ? 'لماذا نحن' : lang === 'es' ? 'Por Qué Nosotros' : 'Why Us'}
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {lang === 'ar' ? 'لماذا تختارنا؟' : lang === 'es' ? '¿Por qué elegirnos?' : 'Why Choose OliveGardens?'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {lang === 'ar' 
                ? 'نقدم أفضل منتجات الزيتون بجودة عالمية ومعايير لا مثيل لها'
                : lang === 'es'
                ? 'Ofrecemos los mejores productos de aceituna con calidad mundial y estándares incomparables'
                : 'We offer the finest olive products with world-class quality and unmatched standards'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Icon */}
                  <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    {feature.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {feature.title[lang]}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description[lang]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      {stats.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-primary to-dark text-white relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-32 border border-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-4">{stat.icon}</div>
                  <div className="text-5xl md:text-6xl font-bold mb-3">
                    {stat.number}
                  </div>
                  <div className="text-xl text-gray-200">
                    {stat.label?.[lang] || stat.label?.en}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Preview - Redesigned */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={aboutData?.image || "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800"} 
                  alt="About"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 bg-white rounded-2xl p-6 shadow-xl">
                  <div className="text-4xl font-bold text-primary mb-1">44+</div>
                  <div className="text-gray-600 font-semibold">
                    {lang === 'ar' ? 'سنة خبرة' : lang === 'es' ? 'Años' : 'Years Experience'}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-6 py-2 bg-primary/10 text-primary font-bold rounded-full mb-4">
                {lang === 'ar' ? 'قصتنا' : lang === 'es' ? 'Nuestra Historia' : 'Our Story'}
              </span>
              
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {aboutData?.title?.[lang] || (lang === 'ar' ? 'عن OliveGardens' : lang === 'es' ? 'Sobre OliveGardens' : 'About OliveGardens')}
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {aboutData?.story?.[lang]?.substring(0, 400) || 
                  (lang === 'ar'
                    ? 'تأسست شركة OliveGardens للإنتاج والتصنيع الزراعي في عام 1980، وتحولت من شركة فردية إلى شركة مساهمة مصرية...'
                    : lang === 'es'
                    ? 'OliveGardens Co. para producción y manufactura agrícola fue establecida en 1980...'
                    : 'OliveGardens Co. for production and agricultural manufacture was established in 1980...')}
                ...
              </p>

              <div className="flex gap-4">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-dark transition-all hover:scale-105"
                >
                  {lang === 'ar' ? 'اقرأ المزيد' : lang === 'es' ? 'Leer más' : 'Learn More'}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all"
                >
                  {lang === 'ar' ? 'اتصل بنا' : lang === 'es' ? 'Contacto' : 'Contact Us'}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              {lang === 'ar' ? 'رحلتنا' : lang === 'es' ? 'Nuestro Viaje' : 'Our Journey'}
            </h2>
            <p className="text-xl text-gray-600">
              {lang === 'ar' ? 'معالم رئيسية في تاريخنا' : lang === 'es' ? 'Hitos en nuestra historia' : 'Key milestones in our history'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="text-5xl text-primary mb-4">{milestone.icon}</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{milestone.year}</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{milestone.title[lang]}</h4>
                  <p className="text-gray-600">{milestone.desc[lang]}</p>
                </div>
                {index < milestones.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-24 bg-gradient-to-br from-primary via-dark to-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              {lang === 'ar' ? 'هل أنت مستعد للبدء؟' : lang === 'es' ? '¿Listo para comenzar?' : 'Ready to Get Started?'}
            </h2>
            <p className="text-2xl mb-10 text-gray-200">
              {lang === 'ar'
                ? 'اتصل بنا اليوم للحصول على عرض سعر مخصص لاحتياجاتك'
                : lang === 'es'
                ? 'Contáctenos hoy para obtener una cotización personalizada'
                : 'Contact us today to get a customized quote for your needs'}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/contact"
                className="group px-10 py-5 bg-white text-primary font-bold rounded-full hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
              >
                <span className="flex items-center gap-2">
                  {lang === 'ar' ? 'اتصل بنا الآن' : lang === 'es' ? 'Contáctenos' : 'Contact Us Now'}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
              
              <Link
                to="/products"
                className="px-10 py-5 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-primary transition-all"
              >
                {lang === 'ar' ? 'تصفح المنتجات' : lang === 'es' ? 'Ver Productos' : 'View Products'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
