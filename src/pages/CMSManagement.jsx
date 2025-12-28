import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCMSContent } from '../hooks/useCMSContent';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import HeroSection from '../components/cms/HeroSection';
import AboutSection from '../components/cms/AboutSection';
import StatsSection from '../components/cms/StatsSection';
import ContactSection from '../components/cms/ContactSection';
import CompanySection from '../components/cms/CompanySection';

const CMSManagement = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [activeTab, setActiveTab] = useState('hero');
  
  // ✅ استخدام الـ hook مرة واحدة هنا
  const cmsData = useCMSContent();
  const { loading, success, error, uploadingImage } = cmsData;

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  if (loading && cmsData.heroSlides.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <span className="text-4xl">⚙️</span>
            {lang === 'ar' ? 'إدارة المحتوى' : lang === 'es' ? 'Gestión de Contenido' : 'Content Management'}
          </h1>
          <p className="text-gray-600">
            {lang === 'ar' ? 'تحكم في محتوى الموقع' : lang === 'es' ? 'Control del contenido' : 'Manage website content'}
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-xl shadow-md animate-fade-in">
            <div className="flex items-center">
              <FaCheckCircle className="text-green-500 text-xl mr-3" />
              <p className="text-green-800 font-medium">{success}</p>
            </div>
          </div>
        )}
        
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl shadow-md animate-fade-in">
            <div className="flex items-center">
              <span className="text-red-500 text-2xl mr-3">⚠</span>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Uploading Alert */}
        {uploadingImage && (
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl shadow-md">
            <div className="flex items-center">
              <FaSpinner className="animate-spin text-blue-500 text-xl mr-3" />
              <p className="text-blue-800 font-medium">
                {lang === 'ar' ? 'جاري رفع الصورة...' : 'Uploading image...'}
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['hero', 'about', 'stats', 'contact', 'company'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-primary to-dark text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              {tab === 'hero' && '🎬 ' + (lang === 'ar' ? 'البانر' : lang === 'es' ? 'Banner' : 'Hero')}
              {tab === 'about' && '📖 ' + (lang === 'ar' ? 'من نحن' : lang === 'es' ? 'Sobre Nosotros' : 'About')}
              {tab === 'stats' && '📊 ' + (lang === 'ar' ? 'الإحصائيات' : lang === 'es' ? 'Estadísticas' : 'Stats')}
              {tab === 'contact' && '📞 ' + (lang === 'ar' ? 'التواصل' : lang === 'es' ? 'Contacto' : 'Contact')}
              {tab === 'company' && '🏢 ' + (lang === 'ar' ? 'الشركة' : lang === 'es' ? 'Empresa' : 'Company')}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* ✅ تمرير البيانات كـ props */}
          {activeTab === 'hero' && <HeroSection {...cmsData} />}
          {activeTab === 'about' && <AboutSection {...cmsData} />}
          {activeTab === 'stats' && <StatsSection {...cmsData} />}
          {activeTab === 'contact' && <ContactSection {...cmsData} />}
          {activeTab === 'company' && <CompanySection {...cmsData} />}
        </div>
      </div>
    </div>
  );
};

export default CMSManagement;