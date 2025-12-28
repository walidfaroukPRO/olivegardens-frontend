import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FaLeaf, FaAward, FaUsers, FaGlobeAmericas, FaIndustry, 
  FaHandshake, FaHeart, FaSeedling, FaShieldAlt, FaStar,
  FaCheckCircle, FaRocket, FaLightbulb, FaMedal, FaCertificate,
  FaArrowRight, FaQuoteLeft
} from 'react-icons/fa';

const About = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const [aboutData, setAboutData] = useState(null);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
    window.scrollTo(0, 0);
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get('/api/content/about');
      if (response.data?.about) setAboutData(response.data.about);
      if (response.data?.stats) setStats(response.data.stats);
    } catch (error) {
      console.error('Error:', error);
      setAboutData({
        title: { en: "About OliveGardens", ar: "عن OliveGardens", es: "Sobre OliveGardens" },
        story: {
          en: "OliveGardens Co. for production and agricultural manufacture S.A.E. was established in 1980. The Company transformed from an individual enterprise to an Egyptian Contribution Company, becoming one of the leading international companies in olive production, both in quality and quantity. Through this evolution, our company gained the ability to open new markets and witnessed remarkable expansion in increasing investments to become one of the largest olive production companies locally and internationally.",
          ar: "تأسست شركة OliveGardens للإنتاج والتصنيع الزراعي ش.م.م في عام 1980. تحولت الشركة من مؤسسة فردية إلى شركة مساهمة مصرية، لتصبح واحدة من الشركات الدولية الرائدة في إنتاج الزيتون من حيث الجودة والكمية.",
          es: "OliveGardens Co. para producción y manufactura agrícola S.A.E. fue establecida en 1980. La Compañía se transformó de una empresa individual a una Compañía de Contribución Egipcia."
        },
        mission: { 
          en: "To provide the finest quality olive products to customers worldwide while maintaining sustainability and excellence.", 
          ar: "توفير أفضل منتجات الزيتون عالية الجودة للعملاء في جميع أنحاء العالم مع الحفاظ على الاستدامة والتميز.", 
          es: "Proporcionar los mejores productos de aceituna a clientes de todo el mundo."
        },
        vision: { 
          en: "To be the world's most trusted and innovative olive products exporter, setting industry standards.", 
          ar: "أن نكون أكثر مصدري منتجات الزيتون ثقة وابتكاراً في العالم.", 
          es: "Ser el exportador de productos de aceituna más confiable del mundo."
        },
        foundedYear: "1980",
        companyType: { 
          en: "Egyptian Contribution Company (S.A.E.)", 
          ar: "شركة مساهمة مصرية (ش.م.م)", 
          es: "Compañía de Contribución Egipcia (S.A.E.)" 
        },
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200"
      });
      
      setStats([
        { number: '50+', label: { en: 'Countries Served', ar: 'دولة نخدمها', es: 'Países Servidos' }, icon: '🌍' },
        { number: '44+', label: { en: 'Years Experience', ar: 'سنة خبرة', es: 'Años de Experiencia' }, icon: '⭐' },
        { number: '100+', label: { en: 'Products', ar: 'منتج', es: 'Productos' }, icon: '🫒' },
        { number: '1000+', label: { en: 'Happy Clients', ar: 'عميل سعيد', es: 'Clientes Felices' }, icon: '😊' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const values = [
    {
      icon: <FaHeart />,
      title: { en: 'Quality First', ar: 'الجودة أولاً', es: 'Calidad Primero' },
      desc: { en: 'We never compromise on quality and maintain the highest standards', ar: 'لا نتنازل أبداً عن الجودة ونحافظ على أعلى المعايير', es: 'Nunca comprometemos la calidad' },
      color: 'from-rose-500 via-pink-500 to-red-500'
    },
    {
      icon: <FaSeedling />,
      title: { en: 'Sustainability', ar: 'الاستدامة', es: 'Sostenibilidad' },
      desc: { en: 'Committed to environmental protection and sustainable practices', ar: 'ملتزمون بحماية البيئة والممارسات المستدامة', es: 'Comprometidos con la protección ambiental' },
      color: 'from-emerald-500 via-green-500 to-teal-500'
    },
    {
      icon: <FaUsers />,
      title: { en: 'Customer Focus', ar: 'التركيز على العملاء', es: 'Enfoque en el Cliente' },
      desc: { en: 'Your satisfaction drives everything we do', ar: 'رضاكم يدفع كل ما نقوم به', es: 'Su satisfacción impulsa todo' },
      color: 'from-blue-500 via-indigo-500 to-purple-500'
    },
    {
      icon: <FaLightbulb />,
      title: { en: 'Innovation', ar: 'الابتكار', es: 'Innovación' },
      desc: { en: 'Continuously improving through technology', ar: 'تحسين مستمر من خلال التكنولوجيا', es: 'Mejora continua' },
      color: 'from-yellow-500 via-amber-500 to-orange-500'
    },
    {
      icon: <FaShieldAlt />,
      title: { en: 'Integrity', ar: 'النزاهة', es: 'Integridad' },
      desc: { en: 'Conducting business with honesty and transparency', ar: 'إجراء الأعمال بصدق وشفافية', es: 'Negocios con honestidad' },
      color: 'from-violet-500 via-purple-500 to-fuchsia-500'
    },
    {
      icon: <FaRocket />,
      title: { en: 'Excellence', ar: 'التميز', es: 'Excelencia' },
      desc: { en: 'Striving for excellence in everything we do', ar: 'السعي للتميز في كل ما نقوم به', es: 'Excelencia en todo' },
      color: 'from-cyan-500 via-sky-500 to-blue-500'
    }
  ];

  const achievements = [
    {
      icon: <FaCertificate />,
      title: { en: 'ISO Certified', ar: 'شهادة ISO', es: 'Certificado ISO' },
      desc: { en: 'International quality standards', ar: 'معايير جودة دولية', es: 'Estándares internacionales' },
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      icon: <FaGlobeAmericas />,
      title: { en: 'Global Reach', ar: 'انتشار عالمي', es: 'Alcance Global' },
      desc: { en: 'Exporting to 50+ countries', ar: 'التصدير لأكثر من 50 دولة', es: 'Exportando a 50+ países' },
      gradient: 'from-emerald-600 to-teal-600'
    },
    {
      icon: <FaIndustry />,
      title: { en: 'Modern Facilities', ar: 'منشآت حديثة', es: 'Instalaciones Modernas' },
      desc: { en: 'State-of-the-art production', ar: 'إنتاج بأحدث التقنيات', es: 'Producción avanzada' },
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      icon: <FaMedal />,
      title: { en: 'Industry Leader', ar: 'رائد الصناعة', es: 'Líder de Industria' },
      desc: { en: 'Award-winning excellence', ar: 'تميز حائز على جوائز', es: 'Excelencia premiada' },
      gradient: 'from-amber-600 to-orange-600'
    }
  ];

  const timeline = [
    { year: '1980', event: { en: 'Company Founded', ar: 'تأسيس الشركة', es: 'Fundación' }, icon: '🏢' },
    { year: '1990', event: { en: 'First Export', ar: 'أول تصدير', es: 'Primera Exportación' }, icon: '🌍' },
    { year: '2000', event: { en: 'Factory Expansion', ar: 'توسيع المصنع', es: 'Expansión de Fábrica' }, icon: '🏭' },
    { year: '2010', event: { en: 'ISO Certification', ar: 'شهادة ISO', es: 'Certificación ISO' }, icon: '🏆' },
    { year: '2015', event: { en: 'New Product Lines', ar: 'خطوط إنتاج جديدة', es: 'Nuevas Líneas' }, icon: '📦' },
    { year: '2020', event: { en: 'Digital Transformation', ar: 'التحول الرقمي', es: 'Transformación Digital' }, icon: '💻' },
    { year: '2024', event: { en: 'Industry Leader', ar: 'رائد الصناعة', es: 'Líder de Industria' }, icon: '⭐' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-dark to-primary">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block w-20 h-20 border-4 border-white border-t-transparent rounded-full"
          />
          <p className="text-white mt-4 text-xl font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen overflow-hidden">
<motion.div 
  style={{ 
    y,  // ✅ Parallax effect
    backgroundImage: `url(${aboutData?.image})`,  // ✅ Background image
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
  className="absolute inset-0 scale-110"
>          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-dark/90 to-primary/95 backdrop-blur-sm"></div>
        </motion.div>

        {/* Animated Dots Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative h-full flex items-center justify-center text-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-xl rounded-full mb-8 border border-white/30"
              >
                <span className="text-3xl">🫒</span>
                <span className="text-secondary font-bold text-lg">
                  {aboutData?.companyType?.[lang] || aboutData?.companyType?.en}
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-6xl md:text-8xl font-black mb-6 leading-tight"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary to-white">
                  {aboutData?.title?.[lang] || aboutData?.title?.en}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-4 mb-8"
              >
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-secondary"></div>
                <p className="text-2xl md:text-4xl font-light text-secondary">
                  {lang === 'ar' ? `تأسست عام ${aboutData?.foundedYear}` : 
                   lang === 'es' ? `Fundada en ${aboutData?.foundedYear}` :
                   `Established ${aboutData?.foundedYear}`}
                </p>
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-secondary"></div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4 justify-center mt-12 flex-wrap"
              >
                <Link 
                  to="/products"
                  className="group relative px-8 py-4 bg-white text-primary font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {lang === 'ar' ? 'منتجاتنا' : lang === 'es' ? 'Productos' : 'Our Products'}
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                <Link 
                  to="/contact"
                  className="px-8 py-4 border-2 border-white/50 backdrop-blur-xl text-white font-bold rounded-full hover:bg-white hover:text-primary transition-all hover:scale-105 hover:border-white"
                >
                  {lang === 'ar' ? 'اتصل بنا' : lang === 'es' ? 'Contacto' : 'Contact Us'}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Floating Stats Cards */}
      {stats.length > 0 && (
        <section className="relative -mt-32 z-20 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-2xl p-4 md:p-8 border border-gray-100"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
                    
                    <div className="relative text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white group-hover:from-white group-hover:to-gray-50 transition-all">
                      <motion.div 
                        className="text-6xl mb-4"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        {stat.icon}
                      </motion.div>
                      <div className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-dark mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-600 font-semibold text-sm">
                        {stat.label?.[lang] || stat.label?.en}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Our Story with Quote */}
      <section className="py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-8 py-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 text-primary font-bold rounded-full mb-6 border border-primary/20"
            >
              <span className="text-2xl mr-2">📖</span>
              {lang === 'ar' ? 'قصتنا' : lang === 'es' ? 'Nuestra Historia' : 'Our Story'}
            </motion.div>
            <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-dark to-primary">
                {lang === 'ar' ? 'رحلة النجاح' : lang === 'es' ? 'Viaje de Éxito' : 'Journey of Success'}
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Quote Icon */}
            <div className="absolute -top-6 -left-6 text-8xl text-primary/10">
              <FaQuoteLeft />
            </div>

            <div className="relative bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-gray-100">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                {aboutData?.story?.[lang] || aboutData?.story?.en}
              </p>
              
              {/* Decorative Line */}
              <div className="flex items-center gap-4 mt-8">
                <div className="h-1 flex-1 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
                <FaLeaf className="text-primary text-2xl" />
                <div className="h-1 flex-1 bg-gradient-to-l from-primary to-transparent rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision - New Design */}
      <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(76,29,149,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(29,78,216,0.3),transparent_50%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500"></div>
              
              <div className="relative h-full bg-gradient-to-br from-primary via-dark to-primary rounded-3xl p-10 md:p-12 shadow-2xl border border-white/10">
                <motion.div 
                  className="text-7xl mb-8"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🎯
                </motion.div>
                <h3 className="text-4xl font-black mb-6">
                  {lang === 'ar' ? 'رسالتنا' : lang === 'es' ? 'Nuestra Misión' : 'Our Mission'}
                </h3>
                <div className="h-1 w-20 bg-secondary rounded-full mb-6"></div>
                <p className="text-xl leading-relaxed text-gray-100">
                  {aboutData?.mission?.[lang] || aboutData?.mission?.en}
                </p>
              </div>
            </motion.div>
            
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-secondary to-primary rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500"></div>
              
              <div className="relative h-full bg-gradient-to-br from-secondary via-primary to-secondary rounded-3xl p-10 md:p-12 shadow-2xl border border-white/10">
                <motion.div 
                  className="text-7xl mb-8"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  👁️
                </motion.div>
                <h3 className="text-4xl font-black mb-6">
                  {lang === 'ar' ? 'رؤيتنا' : lang === 'es' ? 'Nuestra Visión' : 'Our Vision'}
                </h3>
                <div className="h-1 w-20 bg-white rounded-full mb-6"></div>
                <p className="text-xl leading-relaxed text-gray-100">
                  {aboutData?.vision?.[lang] || aboutData?.vision?.en}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values - Cards Grid */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-black text-gray-900 mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-dark">
                {lang === 'ar' ? 'قيمنا الأساسية' : lang === 'es' ? 'Nuestros Valores' : 'Our Core Values'}
              </span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              {lang === 'ar' ? 'المبادئ التي نؤمن بها ونعمل بها' : lang === 'es' ? 'Los principios que guían nuestro trabajo' : 'The principles that guide our work'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${value.color} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300`}></div>
                
                <div className="relative bg-white rounded-2xl p-8 shadow-lg group-hover:shadow-2xl transition-all h-full border border-gray-100">
                  {/* Icon with Gradient Background */}
                  <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white text-4xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg`}>
                    {value.icon}
                    {/* Icon Shine Effect */}
                    <div className="absolute inset-0 bg-white/20 rounded-2xl transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700"></div>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.title[lang]}
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {value.desc[lang]}
                  </p>

                  {/* Bottom Accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements - Bento Grid Style */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-black text-gray-900 mb-6">
              {lang === 'ar' ? 'إنجازاتنا' : lang === 'es' ? 'Nuestros Logros' : 'Our Achievements'}
            </h2>
            <p className="text-2xl text-gray-600">
              {lang === 'ar' ? 'نفخر بما حققناه' : lang === 'es' ? 'Orgullosos de lo que hemos logrado' : 'Proud of what we\'ve achieved'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative p-8 text-white text-center h-full flex flex-col justify-center">
                  <motion.div 
                    className="text-6xl mb-6"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    {achievement.icon}
                  </motion.div>
                  <h4 className="text-2xl font-bold mb-3">{achievement.title[lang]}</h4>
                  <p className="text-white/90 text-lg">{achievement.desc[lang]}</p>
                  
                  {/* Bottom Shine Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Modern Vertical Design */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl font-black mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-white to-secondary">
                {lang === 'ar' ? 'خط زمني' : lang === 'es' ? 'Línea de Tiempo' : 'Our Timeline'}
              </span>
            </h2>
            <p className="text-2xl text-gray-300">
              {lang === 'ar' ? 'معالم رئيسية في رحلتنا' : lang === 'es' ? 'Hitos en nuestro viaje' : 'Key milestones in our journey'}
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Central Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-primary opacity-30 hidden lg:block"></div>

            <div className="space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} relative`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group relative"
                    >
                      {/* Glow */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
                      
                      <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 group-hover:bg-white/15 transition-all">
                        <div className="flex items-center gap-4 mb-4" style={{ flexDirection: index % 2 === 0 ? 'row-reverse' : 'row' }}>
                          <div className="text-4xl">{item.icon}</div>
                          <div className="text-4xl font-black text-secondary">{item.year}</div>
                        </div>
                        <div className="text-xl font-semibold">{item.event[lang]}</div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Center Dot */}
                  <motion.div 
                    whileHover={{ scale: 1.5, rotate: 180 }}
                    className="hidden lg:block relative z-10"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-white shadow-lg"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary animate-ping opacity-20"></div>
                  </motion.div>
                  
                  {/* Spacer */}
                  <div className="flex-1 hidden lg:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Modern Gradient */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-dark to-secondary">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-8"
            >
              🤝
            </motion.div>

            <h2 className="text-6xl md:text-7xl font-black mb-8 text-white">
              {lang === 'ar' ? 'انضم إلى عائلة OliveGardens' : lang === 'es' ? 'Únase a OliveGardens' : 'Join the OliveGardens Family'}
            </h2>
            <p className="text-2xl md:text-3xl mb-12 text-gray-200 max-w-3xl mx-auto">
              {lang === 'ar'
                ? 'نحن نبحث دائماً عن شركاء وعملاء جدد لنحقق النجاح معاً'
                : lang === 'es'
                ? 'Siempre buscamos nuevos socios y clientes para lograr el éxito juntos'
                : "We're always looking for new partners and clients to achieve success together"}
            </p>
            
            <div className="flex gap-6 justify-center flex-wrap">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="group relative px-12 py-6 bg-white text-primary font-bold rounded-full overflow-hidden shadow-2xl"
                >
                  <span className="relative z-10 flex items-center gap-3 text-xl">
                    {lang === 'ar' ? 'ابدأ معنا' : lang === 'es' ? 'Comience' : 'Get Started'}
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/products"
                  className="px-12 py-6 border-2 border-white/80 backdrop-blur-xl text-white font-bold rounded-full hover:bg-white hover:text-primary transition-all text-xl"
                >
                  {lang === 'ar' ? 'تصفح المنتجات' : lang === 'es' ? 'Ver Productos' : 'View Products'}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;