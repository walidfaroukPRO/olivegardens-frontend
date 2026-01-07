import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaUser } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import { MdDashboard } from 'react-icons/md';
import { HiGlobeAlt } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowLangMenu(false);
    setShowUserMenu(false);
  }, [location]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    document.body.style.fontFamily = lng === 'ar' 
      ? "'Cairo', 'Tajawal', sans-serif" 
      : "'Inter', 'Poppins', sans-serif";
    setShowLangMenu(false);
  };

  const languages = {
    en: { name: 'English', flag: '🇬🇧', short: 'EN' },
    ar: { name: 'العربية', flag: '🇸🇦', short: 'ع' },
    es: { name: 'Español', flag: '🇪🇸', short: 'ES' }
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
    { path: '/contact', label: t('nav.contact') }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="h-[68px]"></div>

      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/98 backdrop-blur-2xl shadow-xl border-b border-gray-100' 
            : 'bg-white shadow-md'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className={`flex items-center justify-between h-[68px] ${isRTL ? 'flex-row-reverse' : ''}`}>

            {/* ===== LOGO ===== */}
            <Link to="/" className={`flex items-center gap-3 group relative z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-green-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Logo Image */}
                <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-white to-gray-50 p-1 shadow-lg">
                  <img 
                    src="/logo.png" 
                    alt="OliveGardens" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>

              {/* Brand Text */}
              <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
                <span className="text-xl font-black bg-gradient-to-r from-primary via-green-600 to-green-700 bg-clip-text text-transparent leading-none">
                  OliveGardens
                </span>
                <span className={`text-[9px] text-gray-500 font-semibold tracking-widest uppercase ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL ? 'منذ ١٩٨٠' : 'Est. 1980'}
                </span>
              </div>
            </Link>

            {/* ===== CENTER NAVIGATION ===== */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
              <div className={`flex items-center gap-0.5 bg-gray-50/80 backdrop-blur-sm rounded-full p-1 border border-gray-100/50 ${
                isRTL ? 'flex-row-reverse' : ''
              }`}>
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="relative group"
                    >
                      <motion.div
                        className={`px-5 py-2 rounded-full transition-all duration-300 ${
                          active 
                            ? 'text-white' 
                            : 'text-gray-700 hover:text-primary'
                        } ${isRTL ? 'font-arabic font-semibold' : 'font-medium'} text-[13px]`}
                      >
                        {link.label}
                      </motion.div>
                      
                      {/* Active Background */}
                      {active && (
                        <motion.div
                          layoutId="activePill"
                          className="absolute inset-0 bg-gradient-to-r from-primary to-green-600 rounded-full shadow-lg"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          style={{ zIndex: -1 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ===== RIGHT SIDE MENU ===== */}
            <div className={`hidden lg:flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              
              {/* Language Selector */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200/50 transition-all ${
                    showLangMenu ? 'ring-2 ring-primary/20' : ''
                  } ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <FaChevronDown className={`text-[8px] text-gray-500 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
                  <span className="font-bold text-xs text-gray-700">
                    {languages[i18n.language].short}
                  </span>
                  <HiGlobeAlt className="text-primary text-base" />
                </motion.button>

                <AnimatePresence>
                  {showLangMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 w-48 z-50 overflow-hidden ${
                          isRTL ? 'left-0' : 'right-0'
                        }`}
                      >
                        {Object.entries(languages).map(([code, { name, flag }]) => (
                          <motion.button
                            key={code}
                            whileHover={{ x: isRTL ? 4 : -4 }}
                            onClick={() => changeLanguage(code)}
                            className={`flex items-center gap-3 w-full px-4 py-2.5 transition-colors ${
                              i18n.language === code 
                                ? 'bg-gradient-to-r from-primary/5 to-green-500/5 text-primary' 
                                : 'hover:bg-gray-50 text-gray-700'
                            } ${code === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}
                          >
                            {i18n.language === code && (
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                            )}
                            <span className={`flex-1 font-semibold text-sm ${isRTL ? 'text-right' : 'text-left'}`}>{name}</span>
                            <span className="text-xl">{flag}</span>
                          </motion.button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-primary/5 to-green-500/5 hover:from-primary/10 hover:to-green-500/10 border border-primary/20 transition-all ${
                      showUserMenu ? 'ring-2 ring-primary/20' : ''
                    } ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <FaChevronDown className={`text-[8px] text-gray-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                    
                    {/* Name */}
                    <span className={`max-w-[100px] truncate text-xs font-bold text-gray-800 ${isRTL ? 'font-arabic' : ''}`}>
                      {user.userType === 'individual' ? user.firstName : user.companyName}
                    </span>
                    
                    {/* Avatar */}
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center shadow-md">
                      <span className="text-white text-[11px] font-bold">
                        {(user.userType === 'individual' ? user.firstName : user.companyName)?.[0]?.toUpperCase()}
                      </span>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className={`absolute top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 w-64 z-50 overflow-hidden ${
                            isRTL ? 'left-0' : 'right-0'
                          }`}
                        >
                          {/* User Info Header */}
                          <div className="bg-gradient-to-r from-primary/5 to-green-500/5 px-4 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center shadow-lg">
                                <span className="text-white text-lg font-bold">
                                  {(user.userType === 'individual' ? user.firstName : user.companyName)?.[0]?.toUpperCase()}
                                </span>
                              </div>
                              <div className={`flex-1 ${isRTL ? 'text-right font-arabic' : ''}`}>
                                <p className="font-bold text-sm text-gray-800 truncate">
                                  {user.userType === 'individual' ? user.firstName : user.companyName}
                                </p>
                                <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                              </div>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className="py-2">
                            {isAdmin && (
                              <>
                                <Link
                                  to="/admin"
                                  onClick={() => setShowUserMenu(false)}
                                  className={`flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors ${
                                    isRTL ? 'font-arabic flex-row-reverse' : ''
                                  }`}
                                >
                                  <MdDashboard className="text-lg" />
                                  <span className="text-sm font-semibold">{t('nav.dashboard')}</span>
                                </Link>
                                <Link
                                  to="/cms"
                                  onClick={() => setShowUserMenu(false)}
                                  className={`flex items-center gap-3 px-4 py-3 hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-colors ${
                                    isRTL ? 'font-arabic flex-row-reverse' : ''
                                  }`}
                                >
                                  <span className="text-lg">🧩</span>
                                  <span className="text-sm font-semibold">{t('nav.cms')}</span>
                                </Link>
                                <div className="h-px bg-gray-100 my-2"></div>
                              </>
                            )}
                            
                            <button
                              onClick={() => {
                                handleLogout();
                                setShowUserMenu(false);
                              }}
                              className={`flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors ${
                                isRTL ? 'font-arabic flex-row-reverse' : ''
                              }`}
                            >
                              <IoMdLogOut className="text-lg" />
                              <span className="text-sm font-semibold">{t('nav.logout')}</span>
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Link
                    to="/register"
                    className={`px-5 py-2 bg-gradient-to-r from-primary to-green-600 text-white rounded-xl text-sm font-bold hover:shadow-xl hover:scale-105 transition-all ${
                      isRTL ? 'font-arabic' : ''
                    }`}
                  >
                    {t('nav.register')}
                  </Link>
                  <Link
                    to="/login"
                    className={`px-5 py-2 border-2 border-primary text-primary rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-all hover:shadow-lg ${
                      isRTL ? 'font-arabic' : ''
                    }`}
                  >
                    {t('nav.login')}
                  </Link>
                </div>
              )}
            </div>

            {/* ===== MOBILE MENU BUTTON ===== */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                  >
                    <FaTimes size={18} className="text-gray-700" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: -90 }}
                  >
                    <FaBars size={18} className="text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* ===== MOBILE MENU ===== */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-2 max-h-[calc(100vh-68px)] overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive(link.path)
                        ? 'bg-gradient-to-r from-primary to-green-600 text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    } ${isRTL ? 'font-arabic text-right' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Language */}
                <div className="pt-4 border-t border-gray-100">
                  <p className={`px-4 py-2 text-[10px] font-bold text-gray-500 uppercase ${isRTL ? 'text-right font-arabic' : ''}`}>
                    {t('nav.language')}
                  </p>
                  {Object.entries(languages).map(([code, { name, flag }]) => (
                    <button
                      key={code}
                      onClick={() => {
                        changeLanguage(code);
                        setIsOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        i18n.language === code
                          ? 'bg-gradient-to-r from-primary/10 to-green-500/10 text-primary'
                          : 'text-gray-700 hover:bg-gray-50'
                      } ${code === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}
                    >
                      <span className="text-xl">{flag}</span>
                      <span className="flex-1 text-right">{name}</span>
                      {i18n.language === code && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                    </button>
                  ))}
                </div>

                {/* Mobile User */}
                {user ? (
                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    <div className={`px-4 py-3 bg-gray-50 rounded-xl ${isRTL ? 'text-right font-arabic' : ''}`}>
                      <p className="text-[10px] text-gray-500 mb-1">{isRTL ? 'مرحباً' : 'Welcome'}</p>
                      <p className="font-bold text-sm">{user.userType === 'individual' ? user.firstName : user.companyName}</p>
                    </div>
                    {isAdmin && (
                      <>
                        <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-4 py-3 bg-blue-500 text-white rounded-xl text-sm font-bold text-center">
                          {t('nav.dashboard')}
                        </Link>
                        <Link to="/cms" onClick={() => setIsOpen(false)} className="block px-4 py-3 bg-purple-500 text-white rounded-xl text-sm font-bold text-center">
                          {t('nav.cms')}
                        </Link>
                      </>
                    )}
                    <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full px-4 py-3 bg-red-500 text-white rounded-xl text-sm font-bold">
                      {t('nav.logout')}
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    <Link to="/login" onClick={() => setIsOpen(false)} className="block px-4 py-3 border-2 border-primary text-primary rounded-xl text-sm font-bold text-center">
                      {t('nav.login')}
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)} className="block px-4 py-3 bg-gradient-to-r from-primary to-green-600 text-white rounded-xl text-sm font-bold text-center">
                      {t('nav.register')}
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;