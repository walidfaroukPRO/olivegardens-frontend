import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaBuilding } from 'react-icons/fa';

const Profile = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const lang = i18n.language;
  const isRTL = lang === 'ar';

  return (
    <div className={`min-h-screen bg-gray-50 py-24 px-4 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-dark p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">
              {t('profile.title')}
            </h1>
            <p className="text-gray-200">
              {t('profile.subtitle')}
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Email */}
              <div className={`flex items-center gap-4 p-4 bg-gray-50 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                <FaEnvelope className="text-2xl text-primary" />
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <div className="text-sm text-gray-500">{t('profile.email')}</div>
                  <div className="font-semibold text-gray-800">{user?.email}</div>
                </div>
              </div>

              {/* User Type */}
              <div className={`flex items-center gap-4 p-4 bg-gray-50 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                <FaUser className="text-2xl text-primary" />
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <div className="text-sm text-gray-500">{t('profile.accountType')}</div>
                  <div className="font-semibold text-gray-800 capitalize">
                    {user?.userType === 'individual' 
                      ? t('profile.individual') 
                      : user?.userType === 'company' 
                      ? t('profile.company') 
                      : user?.role}
                  </div>
                </div>
              </div>

              {/* Individual: Name */}
              {user?.userType === 'individual' && (
                <div className={`flex items-center gap-4 p-4 bg-gray-50 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <FaUser className="text-2xl text-primary" />
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <div className="text-sm text-gray-500">{t('profile.name')}</div>
                    <div className="font-semibold text-gray-800">
                      {user?.firstName} {user?.lastName}
                    </div>
                  </div>
                </div>
              )}

              {/* Company: Details */}
              {user?.userType === 'company' && (
                <>
                  <div className={`flex items-center gap-4 p-4 bg-gray-50 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <FaBuilding className="text-2xl text-primary" />
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <div className="text-sm text-gray-500">{t('profile.companyName')}</div>
                      <div className="font-semibold text-gray-800">{user?.companyName}</div>
                    </div>
                  </div>

                  <div className={`flex items-center gap-4 p-4 bg-gray-50 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <FaUser className="text-2xl text-primary" />
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <div className="text-sm text-gray-500">{t('profile.contactPerson')}</div>
                      <div className="font-semibold text-gray-800">{user?.contactPerson}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;