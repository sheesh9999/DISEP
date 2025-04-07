import React from 'react';
import { SyringeIcon as ExchangeIcon, AlertTriangle, UserCog, CheckCircle, Shield, Database, User, Lock } from 'lucide-react';
import { DarkModeProps } from '../types';

interface HomeProps extends DarkModeProps {
  setActiveSection: (section: string) => void;
}

const Home: React.FC<HomeProps> = ({ darkMode, setActiveSection }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Personal Medication Safety Assistant
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Check for potential drug interactions and predict side effects before taking multiple medications.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Drug Interaction Checker
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Analyze potential interactions between your medications to ensure safety.
              </p>
              <button
                onClick={() => setActiveSection('interaction')}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Check Interactions
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Side Effect Predictor
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Predict potential side effects based on your medication regimen and personal profile.
              </p>
              <button
                onClick={() => setActiveSection('side-effects')}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Predict Side Effects
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Personalized Profile
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Create and manage your health profile for more accurate predictions.
              </p>
              <button
                onClick={() => setActiveSection('profile')}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Manage Profile
              </button>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Enter Your Medications
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Add all medications you're currently taking or considering.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Get Instant Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our system checks for potential drug interactions and side effects.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Make Informed Decisions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Review results with your healthcare provider for better treatment planning.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose MediSafe */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Why Choose MediSafe?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 mx-auto">
                <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                Comprehensive Database
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Our system includes data on thousands of prescription and over-the-counter medications.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 mx-auto">
                <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                Easy to Use
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Simple interface designed for patients and healthcare providers alike.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 mx-auto">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                Personalized Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Takes into account your personal health factors for more accurate predictions.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 mx-auto">
                <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                Privacy Focused
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Your health data is stored locally and never shared with third parties.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 dark:text-gray-300">
          <p className="mb-4">
            <strong className="text-gray-900 dark:text-white">MediSafe</strong>
            <br />
            Your personal medication safety assistant. Check drug interactions and predict side effects to make informed health decisions.
          </p>
          <p className="text-sm">
            This tool is for informational purposes only and does not replace professional medical advice. Always consult with a healthcare provider.
          </p>
          <p className="text-sm mt-4">
            © 2023 MediSafe. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

const Feature: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="flex items-start">
    <div className="text-blue-600 mr-3 mt-1">
      <CheckCircle className="h-5 w-5" />
    </div>
    <div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default Home;