import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, FaTimes, FaGlobe, FaUserCircle 
} from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import { MdDashboard, MdLanguage } from 'react-icons/md';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { t, i18n } = useTranslation();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    setShowLangMenu(false);
  };

  const getLanguageName = (code) => {
    const names = { en: 'English', ar: 'العربية', es: 'Español' };
    return names[code];
  };

  const getFlag = (code) => {
    const flags = { en: '🇬🇧', ar: '🇸🇦', es: '🇪🇸' };
    return flags[code];
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/products', label: t('nav.products') },
    { path: '/manufacturing', label: t('nav.manufacturing') },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/certificates', label: t('nav.certificates') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md fixed w-full top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

{/* Logo */}
<Link to="/" className="flex items-center gap-3">
  <motion.div 
    initial={{ rotate: -20 }} 
    animate={{ rotate: 0 }} 
    transition={{ type: 'spring', stiffness: 150 }}
    className="w-12 h-12"
  >
    <img 
      src="/logo.png" 
      alt="OliveGardens Logo" 
      className="w-full h-full object-contain"
    />
  </motion.div>
  <div className="text-2xl font-extrabold bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
    OliveGardens
  </div>
</Link>
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative text-gray-700 font-medium hover:text-primary transition-colors"
              >
                <span>{link.label}</span>
                <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-primary transition-all duration-300 hover:w-full"></span>
              </Link>
            ))}

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
              >
                <MdLanguage className="text-xl" />
                <span className="uppercase">{i18n.language}</span>
              </button>
              <AnimatePresence>
                {showLangMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-3 right-0 bg-white border rounded-xl shadow-lg py-2 w-40 z-50"
                  >
                    {['en', 'ar', 'es'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => changeLanguage(lang)}
                        className={`flex items-center gap-3 w-full text-left px-4 py-2 transition-colors rounded-lg ${
                          i18n.language === lang ? 'bg-light text-primary font-semibold' : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <span>{getFlag(lang)}</span>
                        {getLanguageName(lang)}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 text-gray-700 hover:text-primary"
                >
                  <FaUserCircle className="text-2xl" />
                  <span className="font-medium">
                    {user.userType === 'individual' ? user.firstName : user.companyName}
                  </span>
                </button>
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-3 bg-white border rounded-xl shadow-xl w-48 z-50 py-2"
                    >
                      {isAdmin && (
                        <>
                          <Link
                            to="/admin"
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                          >
                            <MdDashboard /> {t('nav.dashboard')}
                          </Link>
                          <Link
                            to="/cms"
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                          >
                            🧩 {t('nav.cms')}
                          </Link>
                        </>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <IoMdLogOut /> {t('nav.logout')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary p-2 transition"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="lg:hidden bg-white border-t overflow-hidden shadow-inner"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-gray-700 font-medium hover:bg-gray-50 hover:text-primary rounded-lg"
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t pt-2">
                <p className="px-3 py-1 text-sm text-gray-500">{t('nav.language')}</p>
                {['en', 'ar', 'es'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      changeLanguage(lang);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg ${
                      i18n.language === lang ? 'bg-light text-primary font-semibold' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>{getFlag(lang)}</span> {getLanguageName(lang)}
                  </button>
                ))}
              </div>

              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    {user.userType === 'individual' ? user.firstName : user.companyName}
                  </Link>
                  {isAdmin && (
                    <>
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 bg-secondary text-white rounded-lg"
                      >
                        {t('nav.dashboard')}
                      </Link>
                      <Link
                        to="/cms"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 bg-primary text-white rounded-lg"
                      >
                        {t('nav.cms')}
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 bg-gray-700 text-white rounded-lg"
                  >
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-primary hover:bg-light rounded-lg"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 bg-primary text-white rounded-lg text-center"
                  >
                    {t('nav.register')}
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
