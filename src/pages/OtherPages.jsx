import { useTranslation } from 'react-i18next';

export const Manufacturing = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="min-h-screen bg-light py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {lang === 'ar' ? 'عملية التصنيع' : 'Manufacturing Process'}
          </h1>
          <p className="text-xl text-gray-600">
            {lang === 'ar' 
              ? 'من المزرعة إلى المائدة - عملية تصنيع احترافية'
              : 'From Farm to Table - Professional Manufacturing Process'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              step: '1',
              title: { en: 'Harvesting', ar: 'الحصاد' },
              desc: { en: 'Careful selection and harvesting of premium olives', ar: 'اختيار وحصاد دقيق للزيتون الفاخر' },
              image: 'https://images.unsplash.com/photo-1566843536955-cef079ec2f8d?w=600'
            },
            {
              step: '2',
              title: { en: 'Washing', ar: 'الغسيل' },
              desc: { en: 'Thorough cleaning and quality inspection', ar: 'تنظيف شامل وفحص الجودة' },
              image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600'
            },
            {
              step: '3',
              title: { en: 'Processing', ar: 'المعالجة' },
              desc: { en: 'Expert processing and flavoring', ar: 'معالجة وتنكيه احترافية' },
              image: 'https://images.unsplash.com/photo-1596040033229-a0b10e4c424e?w=600'
            },
            {
              step: '4',
              title: { en: 'Packaging', ar: 'التعبئة' },
              desc: { en: 'Hygienic packaging and quality assurance', ar: 'تعبئة صحية وضمان الجودة' },
              image: 'https://images.unsplash.com/photo-1580712015632-73a56c8c2e02?w=600'
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img src={item.image} alt={item.title[lang]} className="w-full h-64 object-cover" />
              <div className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">
                  {lang === 'ar' ? `الخطوة ${item.step}` : `Step ${item.step}`}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {item.title[lang]}
                </h3>
                <p className="text-gray-600">
                  {item.desc[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Gallery = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const images = [
    'https://www.olivegardenseg.com/assets/img/1.jpg?w=600',
    'https://www.olivegardenseg.com/assets/img/2.jpg?w=600',
    'https://www.olivegardenseg.com/assets/img/3.jpg?w=600',
    'https://www.olivegardenseg.com/assets/img/5.jpg?w=600',
    'https://www.olivegardenseg.com/assets/img/8.jpg?w=600',
    'https://www.olivegardenseg.com/assets/img/10.jpg?w=600',
    'https://www.olivegardenseg.com/assets/img/262132180_334273651402842_4589500349624172514_n.jpg?w=600',
    'https://www.olivegardenseg.com/assets/img/262418542_322125076141163_2700973504918352879_n.jpg?w=600',
    'https://www.olivegardenseg.com/assets/img/262001773_966684313920137_8468971722051305913_n.jpg?w=600',
    'https://www.olivegardenseg.com/assets/img/10.jpg?w=600',
    'https://www.olivegardenseg.com/assets/img/10.jpg?w=600',
    'https://www.olivegardenseg.com/assets/img/10.jpg?w=600',
    'https://www.olivegardenseg.com/assets/img/10.jpg?w=600',
    'https://www.olivegardenseg.com/assets/img/10.jpg?w=600',
    'https://www.olivegardenseg.com/assets/img/10.jpg?w=600',
    'https://www.olivegardenseg.com/assets/img/10.jpg?w=600',
    'https://www.olivegardenseg.com/assets/img/10.jpg?w=600',
    'https://www.olivegardenseg.com/assets/img/10.jpg?w=600',





  ];

  return (
    <div className="min-h-screen bg-light py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {lang === 'ar' ? 'المعرض' : 'Gallery'}
          </h1>
          <p className="text-xl text-gray-600">
            {lang === 'ar' 
              ? 'شاهد منتجاتنا ومنشآتنا'
              : 'View our products and facilities'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
              <img 
                src={image} 
                alt={`Gallery ${index + 1}`}
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Certificates = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const certificates = [
    {
      name: 'ISO 9001:2015',
      desc: { 
        en: 'Quality Management System', 
        ar: 'نظام إدارة الجودة' 
      }
    },
    {
      name: 'ISO 22000',
      desc: { 
        en: 'Food Safety Management', 
        ar: 'إدارة سلامة الأغذية' 
      }
    },
    {
      name: 'HACCP',
      desc: { 
        en: 'Hazard Analysis Critical Control Points', 
        ar: 'تحليل المخاطر ونقاط التحكم الحرجة' 
      }
    },
    {
      name: 'HALAL',
      desc: { 
        en: 'Halal Certification', 
        ar: 'شهادة حلال' 
      }
    },
    {
      name: 'ORGANIC',
      desc: { 
        en: 'Organic Certification', 
        ar: 'شهادة عضوية' 
      }
    },
    {
      name: 'GMP',
      desc: { 
        en: 'Good Manufacturing Practice', 
        ar: 'ممارسات التصنيع الجيدة' 
      }
    }
  ];

  return (
    <div className="min-h-screen bg-light py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {lang === 'ar' ? 'الشهادات والاعتمادات' : 'Certificates & Accreditations'}
          </h1>
          <p className="text-xl text-gray-600">
            {lang === 'ar' 
              ? 'نلتزم بأعلى معايير الجودة والسلامة'
              : 'Committed to the highest standards of quality and safety'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl font-bold">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {cert.name}
              </h3>
              <p className="text-gray-600">
                {cert.desc[lang]}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {lang === 'ar' ? 'التزامنا بالجودة' : 'Our Commitment to Quality'}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {lang === 'ar'
              ? 'نحن نلتزم بأعلى معايير الجودة الدولية في جميع مراحل الإنتاج. شهاداتنا تؤكد التزامنا بتقديم منتجات آمنة وعالية الجودة لعملائنا في جميع أنحاء العالم.'
              : 'We adhere to the highest international quality standards at all stages of production. Our certifications confirm our commitment to delivering safe and high-quality products to our customers worldwide.'}
          </p>
        </div>
      </div>
    </div>
  );
};
