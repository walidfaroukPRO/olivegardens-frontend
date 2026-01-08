import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, 
  FaCheckCircle, FaPaperPlane
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isRTL = lang === 'ar';
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // ✅ Static contact information
  const contactInfo = {
    phone: '+201220739090',
    phone2: '+201111091105',
    whatsapp: '+201220739090',
    email: 'info@olivegardenseg.com',
    salesEmail: 'Nader@olivegardenseg.com',
    address: { 
      en: 'Kom oshem 2nd industrial zone cairo / fayoum desert road 72k', 
      ar: 'المنطقة الصناعية التانية كوم اوشيم طريق القاهرة / الفيوم الصحراوي ك ٧٢',
      es: 'Zona Industrial Kom Oshem, Carretera El Cairo/Fayoum km 72'
    },
    workingHours: { 
      en: 'Saturday - Thursday: 9:00 AM - 6:00 PM', 
      ar: 'السبت - الخميس: 9:00 صباحاً - 6:00 مساءً',
      es: 'Sábado - Jueves: 9:00 AM - 6:00 PM'
    }
  };
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general',
    userType: 'individual'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const response = await axios.post('/api/contact', formData);
      
      if (response.data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          inquiryType: 'general',
          userType: 'individual'
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setError(
        err.response?.data?.message || 
        (lang === 'ar' 
          ? 'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.' 
          : lang === 'es'
          ? 'Error al enviar. Inténtalo de nuevo.'
          : 'Failed to send message. Please try again.')
      );
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    {
      icon: <FaPhone className="text-3xl" />,
      title: { en: 'Phone Numbers', ar: 'أرقام الهاتف', es: 'Teléfonos' },
      info: `${contactInfo.phone} / ${contactInfo.phone2}`,
      link: `tel:${contactInfo.phone}`,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <FaWhatsapp className="text-3xl" />,
      title: { en: 'WhatsApp', ar: 'واتساب', es: 'WhatsApp' },
      info: contactInfo.whatsapp,
      link: `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: { en: 'Email Addresses', ar: 'البريد الإلكتروني', es: 'Correos' },
      info: contactInfo.email,
      info2: contactInfo.salesEmail,
      link: `mailto:${contactInfo.email}`,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <FaClock className="text-3xl" />,
      title: { en: 'Working Hours', ar: 'ساعات العمل', es: 'Horario' },
      info: contactInfo.workingHours[lang],
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl" />,
      title: { en: 'Office Address', ar: 'عنوان المكتب', es: 'Dirección' },
      info: contactInfo.address[lang],
      link: 'https://maps.google.com/?q=Kom+Oshem+Industrial+Zone+Cairo+Fayoum+Road+72km',
      color: 'from-red-500 to-red-600'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: { en: 'General Inquiry', ar: 'استفسار عام', es: 'Consulta General' } },
    { value: 'quotation', label: { en: 'Request Quotation', ar: 'طلب عرض سعر', es: 'Solicitar Cotización' } },
    { value: 'partnership', label: { en: 'Partnership', ar: 'شراكة', es: 'Asociación' } },
    { value: 'export', label: { en: 'Export Inquiry', ar: 'استفسار تصدير', es: 'Consulta de Exportación' } },
    { value: 'other', label: { en: 'Other', ar: 'أخرى', es: 'Otro' } }
  ];

  const userTypes = [
    { value: 'individual', label: { en: 'Individual', ar: 'فرد', es: 'Individual' } },
    { value: 'company', label: { en: 'Company', ar: 'شركة', es: 'Empresa' } }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section - Compact */}
      <section className="relative h-[45vh] md:h-[50vh] bg-gradient-to-br from-primary via-green-600 to-dark overflow-hidden mt-[68px]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative h-full flex items-center justify-center text-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FaEnvelope className="text-5xl mx-auto mb-4" />
              <h1 className={`text-4xl md:text-5xl font-black mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' ? 'اتصل بنا' : lang === 'es' ? 'Contáctenos' : 'Contact Us'}
              </h1>
              <p className={`text-lg md:text-xl text-gray-100 ${isRTL ? 'font-arabic' : ''}`}>
                {lang === 'ar' 
                  ? 'نحن هنا للإجابة على أسئلتك'
                  : lang === 'es'
                  ? 'Estamos aquí para responder'
                  : "We're here to answer your questions"}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Cards - Compact */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-5"
              >
                <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white flex-shrink-0`}>
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-gray-900 mb-2 text-base ${isRTL ? 'font-arabic' : ''}`}>
                      {card.title[lang]}
                    </h3>
                    {card.link ? (
                      <div className="space-y-1">
                        <a 
                          href={card.link}
                          target={card.link.startsWith('http') ? '_blank' : undefined}
                          rel={card.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className={`text-gray-600 hover:text-primary transition-colors text-sm block ${
                            isRTL ? 'font-arabic' : ''
                          }`}
                        >
                          {card.info}
                        </a>
                        {card.info2 && (
                          <a 
                            href={`mailto:${card.info2}`}
                            className="text-gray-600 hover:text-primary transition-colors text-sm block"
                          >
                            {card.info2}
                          </a>
                        )}
                      </div>
                    ) : (
                      <p className={`text-gray-600 leading-relaxed text-sm ${isRTL ? 'font-arabic' : ''}`}>
                        {card.info}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map - Compact */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className={`text-2xl font-bold text-gray-900 mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {lang === 'ar' ? 'أرسل لنا رسالة' : lang === 'es' ? 'Envíenos un mensaje' : 'Send us a Message'}
                </h2>
                <p className={`text-gray-600 mb-6 text-sm ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {lang === 'ar' 
                    ? 'املأ النموذج وسنتواصل معك قريباً'
                    : lang === 'es'
                    ? 'Complete el formulario'
                    : 'Fill out the form and we will contact you'}
                </p>

                {success && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`mb-5 p-4 bg-green-50 border-2 border-green-500 text-green-700 rounded-xl flex items-start gap-3 ${
                      isRTL ? 'flex-row-reverse text-right' : ''
                    }`}
                  >
                    <FaCheckCircle className="text-2xl flex-shrink-0 mt-0.5" />
                    <div>
                      <div className={`font-bold mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                        {lang === 'ar' ? 'تم الإرسال بنجاح!' : lang === 'es' ? '¡Enviado!' : 'Sent Successfully!'}
                      </div>
                      <div className={`text-sm ${isRTL ? 'font-arabic' : ''}`}>
                        {lang === 'ar' 
                          ? 'سنتواصل معك قريباً'
                          : lang === 'es'
                          ? 'Nos pondremos en contacto pronto'
                          : 'We will contact you soon'}
                      </div>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <div className={`mb-5 p-4 bg-red-50 border-2 border-red-500 text-red-700 rounded-xl text-sm ${
                    isRTL ? 'font-arabic text-right' : ''
                  }`}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* User Type */}
                  <div>
                    <label className={`block text-gray-700 font-semibold mb-2 text-sm ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {lang === 'ar' ? 'نوع المستخدم' : lang === 'es' ? 'Tipo' : 'User Type'} *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {userTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, userType: type.value })}
                          className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                            formData.userType === type.value
                              ? 'bg-primary text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          } ${isRTL ? 'font-arabic' : ''}`}
                        >
                          {type.label[lang]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-gray-700 font-semibold mb-2 text-sm ${isRTL ? 'font-arabic text-right' : ''}`}>
                        {lang === 'ar' ? 'الاسم' : lang === 'es' ? 'Nombre' : 'Name'} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-primary text-sm ${
                          isRTL ? 'font-arabic text-right' : ''
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-gray-700 font-semibold mb-2 text-sm ${isRTL ? 'font-arabic text-right' : ''}`}>
                        {lang === 'ar' ? 'البريد' : lang === 'es' ? 'Correo' : 'Email'} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-primary text-sm"
                      />
                    </div>
                  </div>

                  {/* Phone & Company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-gray-700 font-semibold mb-2 text-sm ${isRTL ? 'font-arabic text-right' : ''}`}>
                        {lang === 'ar' ? 'الهاتف' : lang === 'es' ? 'Teléfono' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-primary text-sm"
                      />
                    </div>

                    <div>
                      <label className={`block text-gray-700 font-semibold mb-2 text-sm ${isRTL ? 'font-arabic text-right' : ''}`}>
                        {lang === 'ar' ? 'الشركة' : lang === 'es' ? 'Empresa' : 'Company'}
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-primary text-sm ${
                          isRTL ? 'font-arabic text-right' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label className={`block text-gray-700 font-semibold mb-2 text-sm ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {lang === 'ar' ? 'نوع الاستفسار' : lang === 'es' ? 'Tipo de Consulta' : 'Inquiry Type'} *
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-primary text-sm ${
                        isRTL ? 'font-arabic text-right' : ''
                      }`}
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label[lang]}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className={`block text-gray-700 font-semibold mb-2 text-sm ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {lang === 'ar' ? 'الموضوع' : lang === 'es' ? 'Asunto' : 'Subject'} *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-primary text-sm ${
                        isRTL ? 'font-arabic text-right' : ''
                      }`}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className={`block text-gray-700 font-semibold mb-2 text-sm ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {lang === 'ar' ? 'الرسالة' : lang === 'es' ? 'Mensaje' : 'Message'} *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className={`w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-primary resize-none text-sm ${
                        isRTL ? 'font-arabic text-right' : ''
                      }`}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 bg-gradient-to-r from-primary to-green-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${
                      isRTL ? 'flex-row-reverse font-arabic' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {lang === 'ar' ? 'جاري الإرسال...' : lang === 'es' ? 'Enviando...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        {lang === 'ar' ? 'إرسال الرسالة' : lang === 'es' ? 'Enviar' : 'Send Message'}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 h-full">
                <h2 className={`text-2xl font-bold text-gray-900 mb-5 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {lang === 'ar' ? 'موقعنا' : lang === 'es' ? 'Ubicación' : 'Our Location'}
                </h2>
                <div className="w-full h-[500px] lg:h-[calc(100%-60px)] rounded-xl overflow-hidden">
                  <iframe
                    title="OliveGardens Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3462.5!2d30.920!3d29.330!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDE5JzQ4LjAiTiAzMMKwNTUnMTIuMCJF!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA - Compact */}
      <section className="py-16 bg-gradient-to-br from-primary to-dark text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <HiSparkles className="text-5xl mx-auto mb-4" />
            <h2 className={`text-3xl font-bold mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'نصدّر إلى 50+ دولة' : lang === 'es' ? '50+ Países' : 'We Export to 50+ Countries'}
            </h2>
            <p className={`text-lg text-gray-200 ${isRTL ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'انضم إلى شبكة شركائنا العالمية' : lang === 'es' ? 'Únase a nuestra red global' : 'Join our global network of partners'}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;