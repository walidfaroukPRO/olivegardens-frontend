import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSlideshow = () => {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: { en: "Premium Quality Olives", ar: "زيتون بجودة عالمية" },
      subtitle: { en: "Exported to Over 50 Countries Worldwide", ar: "يتم تصديرها لأكثر من 50 دولة حول العالم" },
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1600",
      cta: { en: "Explore Products", ar: "استكشف المنتجات" }
    },
    {
      id: 2,
      title: { en: "Certified Quality Standards", ar: "معايير جودة معتمدة" },
      subtitle: { en: "ISO Certified Manufacturing Process", ar: "عملية تصنيع معتمدة من ISO" },
      image: "https://images.unsplash.com/photo-1596040033229-a0b10e4c424e?w=1600",
      cta: { en: "View Certificates", ar: "عرض الشهادات" }
    },
    {
      id: 3,
      title: { en: "Fresh From Farm to Table", ar: "طازج من المزرعة إلى مائدتك" },
      subtitle: { en: "Direct from Our Olive Groves", ar: "مباشرة من بساتيننا" },
      image: "https://images.unsplash.com/photo-1566843536955-cef079ec2f8d?w=1600",
      cta: { en: "Contact Us", ar: "اتصل بنا" }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const lang = i18n.language;

  return (
    <div className="relative h-screen w-full overflow-hidden mt-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center text-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                {slides[currentSlide].title[lang]}
              </motion.h1>
              
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-xl md:text-2xl mb-8"
              >
                {slides[currentSlide].subtitle[lang]}
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                <Link
                  to="/products"
                  className="inline-block px-8 py-4 bg-primary hover:bg-dark text-white font-semibold rounded-lg transition-all transform hover:scale-105"
                >
                  {slides[currentSlide].cta[lang]}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-8' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default HeroSlideshow;
