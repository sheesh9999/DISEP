import React, { useState, useRef, useEffect } from 'react';
import { X, User, Mail, Phone, Calendar, Scale, Ruler, Heart, Pill, Save, UploadCloud, Download } from 'lucide-react';
import { drugDatabase } from '../data/drugDatabase';
import { DarkModeProps } from '../types';

interface ProfileData {
  name: string;
  dob: string;
  gender: string;
  email: string;
  weight: string;
  height: string;
  conditions: string[];
  allergies: string;
  medications: string[];
  password?: string; // Optional password for "login" functionality
}

interface ProfileProps extends DarkModeProps {}

const STORAGE_KEY = 'medipredict_profile';

const Profile: React.FC<ProfileProps> = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    dob: '',
    gender: '',
    email: '',
    weight: '',
    height: '',
    conditions: [],
    allergies: '',
    medications: [],
    password: ''
  });
  const [saveStatus, setSaveStatus] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginMode, setLoginMode] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem(STORAGE_KEY);
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        // Don't auto-fill password field
        const { password, ...profileData } = parsedProfile;
        setProfile(prevProfile => ({
          ...prevProfile,
          ...profileData
        }));
      } catch (error) {
        console.error('Failed to parse saved profile:', error);
      }
    }
  }, []);

  const filteredDrugs = drugDatabase.filter(drug =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drug.genericName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDrugSelect = (drugName: string) => {
    if (!profile.medications.includes(drugName)) {
      setProfile(prev => ({
        ...prev,
        medications: [...prev.medications, drugName]
      }));
    }
    setSearchTerm('');
    setShowAutocomplete(false);
  };

  const removeDrug = (drugName: string) => {
    setProfile(prev => ({
      ...prev,
      medications: prev.medications.filter(drug => drug !== drugName)
    }));
  };

  const handleConditionChange = (condition: string) => {
    setProfile(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition]
    }));
  };

  const handleSaveProfile = () => {
    if (!profile.email || !profile.name) {
      setSaveStatus('Please fill in at least name and email fields');
      setTimeout(() => setSaveStatus(''), 3000);
      return;
    }

    if (!profile.password) {
      // If no password set, show password modal
      setShowPasswordModal(true);
      return;
    }

    // Save profile to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setSaveStatus('Profile saved successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handlePasswordSave = () => {
    if (password !== confirmPassword) {
      setSaveStatus('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setSaveStatus('Password must be at least 6 characters');
      return;
    }

    // Update profile with password
    const updatedProfile = {
      ...profile,
      password: password
    };
    
    setProfile(updatedProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
    
    setShowPasswordModal(false);
    setSaveStatus('Profile saved successfully with password!');
    setIsAuthenticated(true);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleLogin = () => {
    const savedProfile = localStorage.getItem(STORAGE_KEY);
    if (!savedProfile) {
      setLoginStatus('No profile found');
      return;
    }

    try {
      const parsedProfile = JSON.parse(savedProfile);
      if (parsedProfile.password === loginPassword) {
        setProfile(parsedProfile);
        setIsAuthenticated(true);
        setLoginMode(false);
        setLoginStatus('Login successful');
      } else {
        setLoginStatus('Incorrect password');
      }
    } catch (error) {
      setLoginStatus('Error loading profile');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginPassword('');
    setLoginStatus('');
  };

  const handleClearProfile = () => {
    if (window.confirm('Are you sure you want to clear your profile? This action cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY);
      setProfile({
        name: '',
        dob: '',
        gender: '',
        email: '',
        weight: '',
        height: '',
        conditions: [],
        allergies: '',
        medications: [],
        password: ''
      });
      setIsAuthenticated(false);
      setSaveStatus('Profile cleared successfully');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // If user isn't authenticated and there's a saved profile with password, show login form
  if (!isAuthenticated && localStorage.getItem(STORAGE_KEY)) {
    try {
      const savedProfile = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (savedProfile.password && !loginMode) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-8 max-w-md w-full">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-blue-100 dark:bg-blue-900">
                  <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back!</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Login to access your profile</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setLoginMode(true)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg font-medium transition-all duration-200"
                >
                  Login with Password
                </button>
                
                <button
                  onClick={() => {
                    setIsAuthenticated(true);
                    const savedProfile = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
                    // Don't include password in component state for security
                    const { password, ...profileData } = savedProfile;
                    setProfile(prevProfile => ({
                      ...prevProfile,
                      ...profileData
                    }));
                  }}
                  className="w-full py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-medium transition-all duration-200"
                >
                  Continue without Password
                </button>
                
                <button
                  onClick={handleClearProfile}
                  className="w-full py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white font-medium transition-all duration-200"
                >
                  Clear Profile
                </button>
              </div>
            </div>
          </div>
        );
      }

      if (loginMode) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-8 max-w-md w-full">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-blue-100 dark:bg-blue-900">
                  <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Login</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Enter your password to access your profile</p>
              </div>

              {loginStatus && (
                <div className={`p-3 mb-4 rounded-lg text-center ${loginStatus.includes('successful') ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400'}`}>
                  {loginStatus}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg font-medium transition-all duration-200"
                >
                  Login
                </button>
                
                <button
                  onClick={() => setLoginMode(false)}
                  className="w-full py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-medium transition-all duration-200"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        );
      }
    } catch (error) {
      console.error('Error parsing saved profile:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-100 dark:bg-blue-900 mb-6">
            <User className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Profile
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your personal information and medication history
          </p>
          
          {isAuthenticated && (
            <div className="mt-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {saveStatus && (
          <div className={`max-w-4xl mx-auto mb-4 p-4 rounded-lg ${saveStatus.includes('success') ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400'}`}>
            {saveStatus}
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Personal Information
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile</span>
                </button>

                <button
                  onClick={handleClearProfile}
                  className="flex items-center gap-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                  <span>Clear Profile</span>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      value={profile.dob}
                      onChange={(e) => setProfile(prev => ({ ...prev, dob: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gender
                  </label>
                  <select
                    value={profile.gender}
                    onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Weight (kg)
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Scale className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      value={profile.weight}
                      onChange={(e) => setProfile(prev => ({ ...prev, weight: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your weight"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Height (cm)
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Ruler className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      value={profile.height}
                      onChange={(e) => setProfile(prev => ({ ...prev, height: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your height"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Allergies
                </label>
                <textarea
                  value={profile.allergies}
                  onChange={(e) => setProfile(prev => ({ ...prev, allergies: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter any allergies"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Medications
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Pill className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowAutocomplete(true)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Search for medications"
                  />
                </div>

                {showAutocomplete && filteredDrugs.length > 0 && (
                  <div ref={autocompleteRef} className="relative z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredDrugs.map((drug) => (
                      <div
                        key={drug.id}
                        className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-800 cursor-pointer"
                        onClick={() => handleDrugSelect(drug.name)}
                      >
                        <div className="font-medium text-gray-900 dark:text-white">{drug.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{drug.genericName}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  {profile.medications.map((med) => (
                    <div
                      key={med}
                      className="bg-blue-100 dark:bg-blue-800 px-3 py-1 rounded-full flex items-center"
                    >
                      <span className="text-blue-800 dark:text-blue-100">{med}</span>
                      <button
                        onClick={() => removeDrug(med)}
                        className="ml-2 text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Medical Conditions
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {['Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 'Depression', 'Anxiety', 'Migraine', 'Arthritis', 'Thyroid Disease'].map((condition) => (
                    <div key={condition} className="flex items-center">
                      <input
                        type="checkbox"
                        id={condition}
                        checked={profile.conditions.includes(condition)}
                        onChange={() => handleConditionChange(condition)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor={condition}
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {condition}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Set Profile Password</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Create a password to protect your profile. You'll need this password to access your profile in the future.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Confirm password"
                />
              </div>

              {saveStatus && (
                <div className="p-3 bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400 rounded">
                  {saveStatus}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handlePasswordSave}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Save Password
                </button>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setSaveStatus('');
                  }}
                  className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;