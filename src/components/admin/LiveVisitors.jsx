import { useVisitors } from '../../hooks/useVisitors';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaCircle, FaEye, FaGlobe, FaFlag } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const LiveVisitors = () => {
  const { visitors, isConnected } = useVisitors();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [analytics, setAnalytics] = useState({
    totalVisits: 0,
    activeNow: 0,
    countries: [],
    activeCountries: {}
  });

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/api/analytics');
      setAnalytics({
        totalVisits: response.data.totalVisits,
        activeNow: response.data.activeNow,
        countries: response.data.countries || [],
        activeCountries: response.data.activeCountries || {}
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  const topPages = Object.entries(visitors.pages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // ✅ Get top countries (all time)
  const topCountries = analytics.countries.slice(0, 5);

  // ✅ Get active countries (right now)
  const activeCountriesList = Object.entries(visitors.countries || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  // ✅ Country name mapping
  const getCountryName = (code) => {
    const countries = {
      'US': 'United States',
      'EG': 'Egypt',
      'SA': 'Saudi Arabia',
      'AE': 'UAE',
      'GB': 'United Kingdom',
      'DE': 'Germany',
      'FR': 'France',
      'IN': 'India',
      'CN': 'China',
      'JP': 'Japan',
      'LC': 'Local',
      'UN': 'Unknown'
    };
    return countries[code] || code;
  };

  return (
    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-xl">
            <FaUsers className="text-2xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold">
              {lang === 'ar' ? 'الزوار' : 'Visitors'}
            </h3>
            <p className="text-xs text-green-100">
              {lang === 'ar' ? 'تحديث مباشر' : 'Real-time'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
          <FaCircle 
            className={`text-xs ${isConnected ? 'text-white animate-pulse' : 'text-red-300'}`} 
          />
          <span className="text-xs font-bold">
            {isConnected ? 'LIVE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCircle className="text-xs animate-pulse" />
            <span className="text-xs font-medium text-green-100">
              {lang === 'ar' ? 'نشط الآن' : 'Active Now'}
            </span>
          </div>
          <div className="text-4xl font-bold">
            {visitors.total}
          </div>
        </div>

        <div className="bg-white/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaGlobe className="text-lg opacity-80" />
            <span className="text-xs font-medium text-green-100">
              {lang === 'ar' ? 'إجمالي الزيارات' : 'Total Visits'}
            </span>
          </div>
          <div className="text-4xl font-bold">
            {analytics.totalVisits.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Active Countries (Right Now) */}
      {activeCountriesList.length > 0 && (
        <div className="bg-white/20 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <FaCircle className="text-xs animate-pulse" />
            <span className="text-sm font-semibold">
              {lang === 'ar' ? 'نشط الآن من' : 'Active From'}
            </span>
          </div>
          <div className="space-y-2">
            {activeCountriesList.map(([code, count]) => (
              <div key={code} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <FaFlag className="text-xs" />
                  <span>{getCountryName(code)}</span>
                </div>
                <span className="bg-white/30 px-2 py-1 rounded-full font-bold">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Countries (All Time) */}
      {topCountries.length > 0 && (
        <div className="bg-white/20 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <FaGlobe />
            <span className="text-sm font-semibold">
              {lang === 'ar' ? 'أكثر الدول زيارة' : 'Top Countries'}
            </span>
          </div>
          <div className="space-y-2">
            {topCountries.map((country, index) => (
              <div key={country.countryCode} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="bg-white/30 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="truncate">{country.country || getCountryName(country.countryCode)}</span>
                </div>
                <span className="bg-white/30 px-2 py-1 rounded-full font-bold ml-2 flex-shrink-0">
                  {country.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Most Visited Pages */}
      {topPages.length > 0 && (
        <div className="bg-white/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <FaEye />
            <span className="text-sm font-semibold">
              {lang === 'ar' ? 'الصفحات الأكثر زيارة' : 'Most Visited'}
            </span>
          </div>
          <div className="space-y-2">
            {topPages.map(([page, count], index) => {
              const pageName = page === '/' ? 'Home' : page.replace(/^\//, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
              
              return (
                <div key={page} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="bg-white/30 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="truncate">{pageName}</span>
                  </div>
                  <span className="bg-white/30 px-2 py-1 rounded-full font-bold ml-2 flex-shrink-0">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveVisitors;