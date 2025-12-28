import { useTranslation } from 'react-i18next';
import { FaSave, FaSpinner } from 'react-icons/fa';
import { useCMSContent } from '../../hooks/useCMSContent';

const AboutSection = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  
  const { 
    aboutData, 
    setAboutData, 
    uploadImage, 
    saveAbout, 
    loading,
    uploadingImage 
  } = useCMSContent();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      setAboutData({...aboutData, image: imageUrl});
    } catch (err) {
      alert('Failed to upload image');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <span className="text-2xl">📖</span>
        {lang === 'ar' ? 'قسم من نحن' : lang === 'es' ? 'Sección Sobre Nosotros' : 'About Section'}
      </h2>

      {aboutData.image && (
        <div className="relative mb-6">
          <img 
            src={aboutData.image} 
            alt="About" 
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">Title (EN)</label>
          <input
            type="text"
            value={aboutData.title.en}
            onChange={(e) => setAboutData({...aboutData, title: {...aboutData.title, en: e.target.value}})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder="About Us"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">العنوان (AR)</label>
          <input
            type="text"
            value={aboutData.title.ar}
            onChange={(e) => setAboutData({...aboutData, title: {...aboutData.title, ar: e.target.value}})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            dir="rtl"
            placeholder="من نحن"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">Título (ES)</label>
          <input
            type="text"
            value={aboutData.title.es}
            onChange={(e) => setAboutData({...aboutData, title: {...aboutData.title, es: e.target.value}})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder="Sobre Nosotros"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">Story (EN)</label>
          <textarea
            rows="6"
            value={aboutData.story.en}
            onChange={(e) => setAboutData({...aboutData, story: {...aboutData.story, en: e.target.value}})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">القصة (AR)</label>
          <textarea
            rows="6"
            value={aboutData.story.ar}
            onChange={(e) => setAboutData({...aboutData, story: {...aboutData.story, ar: e.target.value}})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            dir="rtl"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">Historia (ES)</label>
          <textarea
            rows="6"
            value={aboutData.story.es}
            onChange={(e) => setAboutData({...aboutData, story: {...aboutData.story, es: e.target.value}})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">Mission (EN)</label>
          <textarea
            rows="3"
            value={aboutData.mission.en}
            onChange={(e) => setAboutData({...aboutData, mission: {...aboutData.mission, en: e.target.value}})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">المهمة (AR)</label>
          <textarea
            rows="3"
            value={aboutData.mission.ar}
            onChange={(e) => setAboutData({...aboutData, mission: {...aboutData.mission, ar: e.target.value}})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            dir="rtl"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">Misión (ES)</label>
          <textarea
            rows="3"
            value={aboutData.mission.es}
            onChange={(e) => setAboutData({...aboutData, mission: {...aboutData.mission, es: e.target.value}})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">Vision (EN)</label>
          <textarea
            rows="3"
            value={aboutData.vision.en}
            onChange={(e) => setAboutData({...aboutData, vision: {...aboutData.vision, en: e.target.value}})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">الرؤية (AR)</label>
          <textarea
            rows="3"
            value={aboutData.vision.ar}
            onChange={(e) => setAboutData({...aboutData, vision: {...aboutData.vision, ar: e.target.value}})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            dir="rtl"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">Visión (ES)</label>
          <textarea
            rows="3"
            value={aboutData.vision.es}
            onChange={(e) => setAboutData({...aboutData, vision: {...aboutData.vision, es: e.target.value}})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">Founded Year</label>
          <input
            type="text"
            value={aboutData.foundedYear}
            onChange={(e) => setAboutData({...aboutData, foundedYear: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder="1980"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">
            {lang === 'ar' ? 'الصورة' : 'Image'}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploadingImage}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white hover:file:bg-dark transition disabled:opacity-50"
          />
        </div>
      </div>

      <button
        onClick={saveAbout}
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

export default AboutSection;