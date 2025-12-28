import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [userType, setUserType] = useState('individual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    // Common
    email: '',
    password: '',
    phone: '',
    // Individual
    firstName: '',
    lastName: '',
    // Company
    companyName: '',
    companyRegistrationNumber: '',
    taxId: '',
    contactPerson: ''
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
    setLoading(true);

    const result = await register(formData, userType);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-light py-24 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          {t('nav.register')}
        </h2>

        {/* User Type Selection */}
        <div className="flex gap-4 mb-8">
          <button
            type="button"
            onClick={() => setUserType('individual')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
              userType === 'individual'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {t('auth.individual')}
          </button>
          <button
            type="button"
            onClick={() => setUserType('company')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
              userType === 'company'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {t('auth.company')}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Individual Fields */}
          {userType === 'individual' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t('auth.firstName')} *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t('auth.lastName')} *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </>
          )}

          {/* Company Fields */}
          {userType === 'company' && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('auth.companyName')} *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t('auth.registrationNumber')} *
                  </label>
                  <input
                    type="text"
                    name="companyRegistrationNumber"
                    value={formData.companyRegistrationNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t('auth.taxId')} *
                  </label>
                  <input
                    type="text"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('auth.contactPerson')} *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </>
          )}

          {/* Common Fields */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              {t('auth.email')} *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              {t('auth.password')} *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              {t('auth.phone')} *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-dark transition-colors disabled:bg-gray-400"
          >
            {loading ? '...' : t('auth.registerBtn')}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {t('auth.haveAccount')}{' '}
          <Link to="/login" className="text-primary hover:underline font-semibold">
            {t('auth.loginHere')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
