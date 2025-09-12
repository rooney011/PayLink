import React, { useState } from 'react';
import { User, MapPin, Edit3, Save, X, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation } from '../contexts/LocationContext';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { country, currency, setCountry, requestLocation, loading } = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');

  const handleSave = () => {
    // In production, this would update the user profile via API
    console.log('Saving profile:', { name: editedName });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user?.name || '');
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            User Profile
          </h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Profile Information
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                        theme === 'dark' 
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {user.name}
                    </h3>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Editable Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors ${
                          theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    ) : (
                      <div className={`px-3 py-2 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'
                      }`}>
                        {user.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email Address
                    </label>
                    <div className={`px-3 py-2 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-50 text-gray-600'
                    }`}>
                      {user.email}
                    </div>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Phone Number
                    </label>
                    <div className={`px-3 py-2 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'
                    }`}>
                      {user.phone || 'Not provided'}
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Member Since
                    </label>
                    <div className={`px-3 py-2 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'
                    }`}>
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>

                {/* Wallet Information */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Wallet Address
                  </label>
                  <div className={`px-3 py-2 rounded-lg font-mono text-sm ${
                    theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'
                  }`}>
                    {user.walletAddress}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Currency Settings */}
          <div className="space-y-6">
            <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className={`h-5 w-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Location & Currency
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Current Location
                  </label>
                  <div className={`px-3 py-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {country === 'US' ? '🇺🇸 United States' : '🇮🇳 India'}
                      </span>
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {currency}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Change Location
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCountry('US')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        country === 'US'
                          ? 'bg-emerald-600 text-white'
                          : theme === 'dark'
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      🇺🇸 US
                    </button>
                    <button
                      onClick={() => setCountry('IN')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        country === 'IN'
                          ? 'bg-emerald-600 text-white'
                          : theme === 'dark'
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      🇮🇳 India
                    </button>
                  </div>
                </div>

                <button
                  onClick={requestLocation}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Globe className="h-4 w-4" />
                  <span>{loading ? 'Detecting...' : 'Auto-detect Location'}</span>
                </button>
              </div>
            </div>

            {/* Account Statistics */}
            <div className={`rounded-2xl border p-6 transition-colors duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Account Statistics
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Total Transactions
                  </span>
                  <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {user.transactionCount || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Account Type
                  </span>
                  <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {user.email === 'admin@paylink.com' ? 'Admin' : 
                     user.email === 'premium@paylink.com' ? 'Premium' : 'Standard'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Verification Status
                  </span>
                  <span className="text-green-600 font-semibold">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;