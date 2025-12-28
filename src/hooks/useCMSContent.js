import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCMSContent = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Hero
  const [heroSlides, setHeroSlides] = useState([{
    title: { en: '', ar: '', es: '' },
    subtitle: { en: '', ar: '', es: '' },
    buttonText: { en: '', ar: '', es: '' },
    buttonLink: '',
    image: '',
    order: 1,
    isActive: true
  }]);

  // About
  const [aboutData, setAboutData] = useState({
    title: { en: '', ar: '', es: '' },
    story: { 
      en: 'OliveGardens Co. for production and agricultural manufacture S.A.E. was established on 1980...',
      ar: 'تأسست شركة OliveGardens للإنتاج والتصنيع الزراعي في عام 1980...',
      es: 'OliveGardens Co. para producción y manufactura agrícola S.A.E. fue establecida en 1980...'
    },
    mission: { en: '', ar: '', es: '' },
    vision: { en: '', ar: '', es: '' },
    foundedYear: '1980',
    companyType: { 
      en: 'Egyptian Contribution Company (S.A.E.)',
      ar: 'شركة مساهمة مصرية (ش.م.م)',
      es: 'Compañía de Contribución Egipcia (S.A.E.)'
    },
    image: ''
  });

  // Stats
  const [stats, setStats] = useState([
    { number: '50+', label: { en: 'Countries Served', ar: 'دولة نخدمها', es: 'Países Servidos' }, icon: '🌍' },
    { number: '44+', label: { en: 'Years Experience', ar: 'سنة خبرة', es: 'Años de Experiencia' }, icon: '⭐' }
  ]);

  // Contact
  const [contactInfo, setContactInfo] = useState({
    phone: '+20 123 456 7890',
    email: 'info@olivegardens.com',
    address: { en: 'Cairo, Egypt', ar: 'القاهرة، مصر', es: 'El Cairo, Egipto' },
    workingHours: { en: 'Sat-Thu: 9AM-6PM', ar: 'السبت-الخميس: 9ص-6م', es: 'Sáb-Jue: 9AM-6PM' },
    social: {
      facebook: 'https://facebook.com/olivegardens',
      twitter: 'https://twitter.com/olivegardens',
      instagram: 'https://instagram.com/olivegardens',
      linkedin: 'https://linkedin.com/company/olivegardens'
    }
  });

  // Company
  const [companyInfo, setCompanyInfo] = useState({
    name: { en: 'OliveGardens', ar: 'OliveGardens', es: 'OliveGardens' },
    shortDescription: { 
      en: 'Premium quality olive products since 1980',
      ar: 'منتجات زيتون عالية الجودة منذ 1980',
      es: 'Productos de aceituna premium desde 1980'
    },
    logo: ''
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const [heroRes, aboutRes, contactRes, companyRes] = await Promise.allSettled([
        axios.get('/api/content/hero'),
        axios.get('/api/content/about'),
        axios.get('/api/content/contact-info'),
        axios.get('/api/content/footer')
      ]);

      if (heroRes.status === 'fulfilled' && heroRes.value.data?.heroSlides) {
        setHeroSlides(heroRes.value.data.heroSlides);
      }

      if (aboutRes.status === 'fulfilled' && aboutRes.value.data?.about) {
        setAboutData(aboutRes.value.data.about);
        if (aboutRes.value.data.stats) setStats(aboutRes.value.data.stats);
      }

      if (contactRes.status === 'fulfilled' && contactRes.value.data?.contactInfo) {
        setContactInfo(contactRes.value.data.contactInfo);
      }

      if (companyRes.status === 'fulfilled' && companyRes.value.data?.companyInfo) {
        setCompanyInfo(companyRes.value.data.companyInfo);
      }
    } catch (err) {
      // Silent fail
    } finally {
      setLoading(false);
    }
  };

  // Update uploadImage function
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    setUploadingImage(true);
    const response = await axios.post('/api/upload', formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // ✅ Add token
      }
    });
    
    if (response.data.success) {
      setSuccess('Image uploaded successfully!');
      setTimeout(() => setSuccess(''), 2000);
      return response.data.url;
    } else {
      throw new Error('Upload failed');
    }
  } catch (error) {
    setError('Failed to upload image');
    setTimeout(() => setError(''), 3000);
    throw error;
  } finally {
    setUploadingImage(false);
  }
};
  const saveHero = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.put('/api/content/hero', { heroSlides });
      setSuccess('Hero section updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update');
    } finally {
      setLoading(false);
    }
  };

  const saveAbout = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.put('/api/content/about', { about: aboutData, stats });
      setSuccess('About section updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update');
    } finally {
      setLoading(false);
    }
  };

  const saveContact = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.put('/api/content/contact-info', { contactInfo });
      setSuccess('Contact info updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update');
    } finally {
      setLoading(false);
    }
  };

  const saveCompany = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.put('/api/content/company-info', { companyInfo });
      setSuccess('Company info updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    success,
    error,
    uploadingImage,
    heroSlides,
    setHeroSlides,
    aboutData,
    setAboutData,
    stats,
    setStats,
    contactInfo,
    setContactInfo,
    companyInfo,
    setCompanyInfo,
    uploadImage,
    saveHero,
    saveAbout,
    saveContact,
    saveCompany
  };
};