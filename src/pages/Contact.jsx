import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, 
  FaCheckCircle, FaPaperPlane, FaGlobe 
} from 'react-icons/fa';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [contactInfo] = useState({
    phone: '+20 123 456 7890',
    whatsapp: '+20 123 456 7890',
    email: 'info@olivegardens.com',
    salesEmail: 'sales@olivegardens.com',
    address: { 
      en: 'Industrial Zone, 6th October City, Giza, Egypt', 
      ar: 'المنطقة الصناعية، مدينة 6 أكتوبر، الجيزة، مصر',
      es: 'Zona Industrial, Ciudad 6 de Octubre, Giza, Egipto'
    },
    workingHours: { 
      en: 'Saturday - Thursday: 9:00 AM - 6:00 PM', 
      ar: 'السبت - الخميس: 9:00 صباحاً - 6:00 مساءً',
      es: 'Sábado - Jueves: 9:00 AM - 6:00 PM'
    }
  });
  
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
          : 'Failed to send message. Please try again.')
      );
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    {
      icon: <FaPhone className="text-4xl text-primary" />,
      title: { en: 'Phone', ar: 'الهاتف', es: 'Teléfono' },
      info: contactInfo.phone,
      link: `tel:${contactInfo.phone}`,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <FaWhatsapp className="text-4xl text-primary" />,
      title: { en: 'WhatsApp', ar: 'واتساب', es: 'WhatsApp' },
      info: contactInfo.whatsapp,
      link: `https://wa.me/${contactInfo.whatsapp.replace(/\s+/g, '')}`,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <FaEnvelope className="text-4xl text-primary" />,
      title: { en: 'Email', ar: 'البريد الإلكتروني', es: 'Correo' },
      info: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <FaClock className="text-4xl text-primary" />,
      title: { en: 'Working Hours', ar: 'ساعات العمل', es: 'Horario' },
      info: contactInfo.workingHours[lang],
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: <FaMapMarkerAlt className="text-4xl text-primary" />,
      title: { en: 'Address', ar: 'العنوان', es: 'Dirección' },
      info: contactInfo.address[lang],
      color: 'from-red-500 to-red-600'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: { en: 'General Inquiry', ar: 'استفسار عام', es: 'Consulta General' } },
    { value: 'quotation', label: { en: 'Request Quotation', ar: 'طلب عرض سعر', es: 'Solicitar Cotización' } },
    { value: 'partnership', label: { en: 'Partnership', ar: 'شراكة', es: 'Asociación' } },
    { value: 'other', label: { en: 'Other', ar: 'أخرى', es: 'Otro' } }
  ];

  const userTypes = [
    { value: 'individual', label: { en: 'Individual', ar: 'فرد', es: 'Individual' } },
    { value: 'company', label: { en: 'Company', ar: 'شركة', es: 'Empresa' } }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-br from-primary via-dark to-primary overflow-hidden mt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
        </div>

        <div className="relative h-full flex items-center justify-center text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <FaEnvelope className="text-6xl mx-auto mb-6" />
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {lang === 'ar' ? 'اتصل بنا' : lang === 'es' ? 'Contáctenos' : 'Contact Us'}
              </h1>
              <p className="text-2xl text-gray-200">
                {lang === 'ar' 
                  ? 'نحن هنا للإجابة على أسئلتك ومساعدتك'
                  : lang === 'es'
                  ? 'Estamos aquí para responder sus preguntas'
                  : "We're here to answer your questions and assist you"}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white flex-shrink-0`}>
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">
                      {card.title[lang]}
                    </h3>
                    {card.link ? (
                      <a 
                        href={card.link}
                        target={card.link.startsWith('http') ? '_blank' : undefined}
                        rel={card.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-gray-600 hover:text-primary transition-colors break-all"
                      >
                        {card.info}
                      </a>
                    ) : (
                      <p className="text-gray-600 leading-relaxed">{card.info}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {lang === 'ar' ? 'أرسل لنا رسالة' : lang === 'es' ? 'Envíenos un mensaje' : 'Send us a Message'}
                </h2>
                <p className="text-gray-600 mb-8">
                  {lang === 'ar' 
                    ? 'املأ النموذج أدناه وسنتواصل معك قريباً'
                    : lang === 'es'
                    ? 'Complete el formulario y nos pondremos en contacto'
                    : 'Fill out the form and we will get back to you soon'}
                </p>

                {success && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-green-50 border-2 border-green-500 text-green-700 rounded-xl flex items-start gap-3"
                  >
                    <FaCheckCircle className="text-2xl flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold mb-1">
                        {lang === 'ar' ? 'تم الإرسال بنجاح!' : lang === 'es' ? '¡Enviado!' : 'Sent Successfully!'}
                      </div>
                      <div>
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
                  <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 text-red-700 rounded-xl">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-3">
                      {lang === 'ar' ? 'نوع المستخدم' : 'User Type'} *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {userTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, userType: type.value })}
                          className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                            formData.userType === type.value
                              ? 'bg-primary text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {type.label[lang]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        {lang === 'ar' ? 'الاسم' : 'Name'} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        {lang === 'ar' ? 'البريد' : 'Email'} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        {lang === 'ar' ? 'الهاتف' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        {lang === 'ar' ? 'الشركة' : 'Company'}
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {lang === 'ar' ? 'نوع الاستفسار' : 'Inquiry Type'} *
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label[lang]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {lang === 'ar' ? 'الموضوع' : 'Subject'} *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {lang === 'ar' ? 'الرسالة' : 'Message'} *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-primary to-dark text-white font-bold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {lang === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        {lang === 'ar' ? 'إرسال' : 'Send Message'}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 h-full">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {lang === 'ar' ? 'موقعنا' : 'Our Location'}
                </h2>
                <div className="w-full h-[600px] rounded-xl overflow-hidden">
                  <iframe
                    title="OliveGardens Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.37771441109!2d30.880222!3d29.51925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDMxJzA5LjMiTiAzMMKwNTInNDguOCJF!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
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

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary to-dark text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FaGlobe className="text-6xl mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            {lang === 'ar' ? 'نصدّر إلى 50+ دولة' : 'We Export to 50+ Countries'}
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            {lang === 'ar' ? 'انضم إلى شبكة شركائنا العالمية' : 'Join our global network of partners'}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;