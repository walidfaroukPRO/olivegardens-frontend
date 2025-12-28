import { useTranslation } from 'react-i18next';
import { FaSave, FaPlus, FaTrash, FaSpinner } from 'react-icons/fa';
import { useCMSContent } from '../../hooks/useCMSContent';

const StatsSection = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  
  const { 
    stats, 
    setStats, 
    saveAbout, // Stats are saved with About
    loading 
  } = useCMSContent();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-2xl">📊</span>
          {lang === 'ar' ? 'الإحصائيات' : lang === 'es' ? 'Estadísticas' : 'Statistics'}
        </h2>
        <button
          onClick={() => setStats([...stats, { number: '', label: { en: '', ar: '', es: '' }, icon: '' }])}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-dark text-white rounded-xl hover:shadow-lg transition-all"
        >
          <FaPlus /> {lang === 'ar' ? 'إضافة' : lang === 'es' ? 'Añadir' : 'Add Stat'}
        </button>
      </div>

      {stats.map((stat, idx) => (
        <div key={idx} className="border-2 border-gray-200 rounded-xl p-6 space-y-4 hover:border-primary transition-colors">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Stat {idx + 1}</h3>
            {stats.length > 1 && (
              <button
                onClick={() => setStats(stats.filter((_, i) => i !== idx))}
                className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all"
              >
                <FaTrash />
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">Number</label>
              <input
                type="text"
                value={stat.number}
                onChange={(e) => {
                  const newStats = [...stats];
                  newStats[idx].number = e.target.value;
                  setStats(newStats);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="50+"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">Icon (Emoji)</label>
              <input
                type="text"
                value={stat.icon}
                onChange={(e) => {
                  const newStats = [...stats];
                  newStats[idx].icon = e.target.value;
                  setStats(newStats);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition text-center text-2xl"
                placeholder="🌍"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">Label (EN)</label>
              <input
                type="text"
                value={stat.label.en}
                onChange={(e) => {
                  const newStats = [...stats];
                  newStats[idx].label.en = e.target.value;
                  setStats(newStats);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="Countries Served"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">التسمية (AR)</label>
              <input
                type="text"
                value={stat.label.ar}
                onChange={(e) => {
                  const newStats = [...stats];
                  newStats[idx].label.ar = e.target.value;
                  setStats(newStats);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                dir="rtl"
                placeholder="دولة نخدمها"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">Etiqueta (ES)</label>
              <input
                type="text"
                value={stat.label.es}
                onChange={(e) => {
                  const newStats = [...stats];
                  newStats[idx].label.es = e.target.value;
                  setStats(newStats);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="Países Servidos"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={saveAbout}
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

export default StatsSection;