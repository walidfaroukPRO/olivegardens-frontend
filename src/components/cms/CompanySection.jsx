import { useTranslation } from 'react-i18next';
import { FaSave, FaSpinner } from 'react-icons/fa';
import { useCMSContent } from '../../hooks/useCMSContent';

const ContactSection = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  
  const { 
    contactInfo, 
    setContactInfo, 
    saveContact, 
    loading 
  } = useCMSContent();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <span className="text-2xl">📞</span>
        {lang === 'ar' ? 'معلومات التواصل' : lang === 'es' ? 'Información de Contacto' : 'Contact Information'}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">
            {lang === 'ar' ? 'الهاتف' : 'Phone'}
          </label>
          <input
            type="text"
            value={contactInfo.phone}
            onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder="+20 123 456 7890"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">
            {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
          </label>
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder="info@olivegardens.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">Address (EN)</label>
          <input
            type="text"
            value={contactInfo.address.en}
            onChange={(e) => setContactInfo({...contactInfo, address: {...contactInfo.address, en: e.target.value}})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder="Cairo, Egypt"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">العنوان (AR)</label>
          <input
            type="text"
            value={contactInfo.address.ar}
            onChange={(e) => setContactInfo({...contactInfo, address: {...contactInfo.address, ar: e.target.value}})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            dir="rtl"
            placeholder="القاهرة، مصر"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">Dirección (ES)</label>
          <input
            type="text"
            value={contactInfo.address.es}
            onChange={(e) => setContactInfo({...contactInfo, address: {...contactInfo.address, es: e.target.value}})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder="El Cairo, Egipto"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">Working Hours (EN)</label>
          <input
            type="text"
            value={contactInfo.workingHours.en}
            onChange={(e) => setContactInfo({...contactInfo, workingHours: {...contactInfo.workingHours, en: e.target.value}})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder="Sat-Thu: 9AM-6PM"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">ساعات العمل (AR)</label>
          <input
            type="text"
            value={contactInfo.workingHours.ar}
            onChange={(e) => setContactInfo({...contactInfo, workingHours: {...contactInfo.workingHours, ar: e.target.value}})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            dir="rtl"
            placeholder="السبت-الخميس: 9ص-6م"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">Horario (ES)</label>
          <input
            type="text"
            value={contactInfo.workingHours.es}
            onChange={(e) => setContactInfo({...contactInfo, workingHours: {...contactInfo.workingHours, es: e.target.value}})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder="Sáb-Jue: 9AM-6PM"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span>📱</span>
          {lang === 'ar' ? 'وسائل التواصل الاجتماعي' : 'Social Media'}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium text-sm text-gray-700">Facebook</label>
            <input
              type="url"
              value={contactInfo.social.facebook}
              onChange={(e) => setContactInfo({...contactInfo, social: {...contactInfo.social, facebook: e.target.value}})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="https://facebook.com/..."
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-sm text-gray-700">Twitter</label>
            <input
              type="url"
              value={contactInfo.social.twitter}
              onChange={(e) => setContactInfo({...contactInfo, social: {...contactInfo.social, twitter: e.target.value}})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="https://twitter.com/..."
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-sm text-gray-700">Instagram</label>
            <input
              type="url"
              value={contactInfo.social.instagram}
              onChange={(e) => setContactInfo({...contactInfo, social: {...contactInfo.social, instagram: e.target.value}})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="https://instagram.com/..."
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-sm text-gray-700">LinkedIn</label>
            <input
              type="url"
              value={contactInfo.social.linkedin}
              onChange={(e) => setContactInfo({...contactInfo, social: {...contactInfo.social, linkedin: e.target.value}})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              placeholder="https://linkedin.com/..."
            />
          </div>
        </div>
      </div>

      <button
        onClick={saveContact}
        disabled={loading}
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

export default ContactSection;