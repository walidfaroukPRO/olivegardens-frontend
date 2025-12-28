import { useTranslation } from 'react-i18next';
import { FaSave, FaPlus, FaTrash, FaImage, FaSpinner } from 'react-icons/fa';

const HeroSection = ({
  heroSlides,
  setHeroSlides,
  uploadImage,
  saveHero,
  loading,
  uploadingImage
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const handleImageUpload = async (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      const newSlides = [...heroSlides];
      newSlides[idx].image = imageUrl;
      setHeroSlides(newSlides);
    } catch (err) {
      alert(lang === 'ar' ? 'فشل رفع الصورة' : 'Failed to upload image');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FaImage className="text-primary" />
          {lang === 'ar' ? 'شرائح البانر' : lang === 'es' ? 'Diapositivas' : 'Hero Slides'}
        </h2>
        <button
          onClick={() => setHeroSlides([...heroSlides, {
            title: { en: '', ar: '', es: '' },
            subtitle: { en: '', ar: '', es: '' },
            buttonText: { en: '', ar: '', es: '' },
            buttonLink: '',
            image: '',
            order: heroSlides.length + 1,
            isActive: true
          }])}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-dark text-white rounded-xl hover:shadow-lg transition-all"
        >
          <FaPlus /> {lang === 'ar' ? 'إضافة' : lang === 'es' ? 'Añadir' : 'Add Slide'}
        </button>
      </div>

      {heroSlides.map((slide, idx) => (
        <div key={idx} className="border-2 border-gray-200 rounded-xl p-6 space-y-4 hover:border-primary transition-colors">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Slide {idx + 1}</h3>
            {heroSlides.length > 1 && (
              <button
                onClick={() => setHeroSlides(heroSlides.filter((_, i) => i !== idx))}
                className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all"
              >
                <FaTrash />
              </button>
            )}
          </div>

          {slide.image && (
            <div className="relative">
              <img 
                src={slide.image} 
                alt={`Slide ${idx + 1}`} 
                className="w-full h-48 object-cover rounded-xl shadow-md"
              />
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">Title (EN)</label>
              <input
                type="text"
                value={slide.title.en}
                onChange={(e) => {
                  const newSlides = [...heroSlides];
                  newSlides[idx].title.en = e.target.value;
                  setHeroSlides(newSlides);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="Enter title..."
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">العنوان (AR)</label>
              <input
                type="text"
                value={slide.title.ar}
                onChange={(e) => {
                  const newSlides = [...heroSlides];
                  newSlides[idx].title.ar = e.target.value;
                  setHeroSlides(newSlides);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                dir="rtl"
                placeholder="أدخل العنوان..."
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">Título (ES)</label>
              <input
                type="text"
                value={slide.title.es}
                onChange={(e) => {
                  const newSlides = [...heroSlides];
                  newSlides[idx].title.es = e.target.value;
                  setHeroSlides(newSlides);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="Ingrese título..."
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">Subtitle (EN)</label>
              <input
                type="text"
                value={slide.subtitle.en}
                onChange={(e) => {
                  const newSlides = [...heroSlides];
                  newSlides[idx].subtitle.en = e.target.value;
                  setHeroSlides(newSlides);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">العنوان الفرعي (AR)</label>
              <input
                type="text"
                value={slide.subtitle.ar}
                onChange={(e) => {
                  const newSlides = [...heroSlides];
                  newSlides[idx].subtitle.ar = e.target.value;
                  setHeroSlides(newSlides);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                dir="rtl"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">Subtítulo (ES)</label>
              <input
                type="text"
                value={slide.subtitle.es}
                onChange={(e) => {
                  const newSlides = [...heroSlides];
                  newSlides[idx].subtitle.es = e.target.value;
                  setHeroSlides(newSlides);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">Button Text (EN)</label>
              <input
                type="text"
                value={slide.buttonText.en}
                onChange={(e) => {
                  const newSlides = [...heroSlides];
                  newSlides[idx].buttonText.en = e.target.value;
                  setHeroSlides(newSlides);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="Explore Products"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">نص الزر (AR)</label>
              <input
                type="text"
                value={slide.buttonText.ar}
                onChange={(e) => {
                  const newSlides = [...heroSlides];
                  newSlides[idx].buttonText.ar = e.target.value;
                  setHeroSlides(newSlides);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                dir="rtl"
                placeholder="استكشف المنتجات"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">Texto del Botón (ES)</label>
              <input
                type="text"
                value={slide.buttonText.es}
                onChange={(e) => {
                  const newSlides = [...heroSlides];
                  newSlides[idx].buttonText.es = e.target.value;
                  setHeroSlides(newSlides);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="Explorar Productos"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">Button Link</label>
              <input
                type="text"
                value={slide.buttonLink}
                onChange={(e) => {
                  const newSlides = [...heroSlides];
                  newSlides[idx].buttonLink = e.target.value;
                  setHeroSlides(newSlides);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="/products"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">
                {lang === 'ar' ? 'الصورة' : 'Image'}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, idx)}
                disabled={uploadingImage}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white hover:file:bg-dark transition disabled:opacity-50"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={saveHero}
        disabled={loading || uploadingImage}
        className="w-full py-4 bg-gradient-to-r from-primary to-dark text-white font-bold rounded-xl hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
      >
        {loading ? (
          <><FaSpinner className="animate-spin" /> {lang === 'ar' ? 'جاري الحفظ...' : 'Saving...'}</>
        ) : (
          <><FaSave /> {lang === 'ar' ? 'حفظ' : lang === 'es' ? 'Guardar' : 'Save'}</>
        )}
      </button>
    </div>
  );
};

export default HeroSection;