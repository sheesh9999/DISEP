import React from 'react';
import { PillIcon, ActivityIcon, UserCogIcon, CheckCircle, Shield, Database, User, Lock, AlertTriangle } from 'lucide-react';
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
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Your Personal Medication Safety Assistant
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Check for potential drug interactions and predict side effects before taking multiple medications.
          </p>
        </div>

        {/* Main Features - Improved alignment and styling */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-16 max-w-7xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex flex-col h-full">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 p-4 flex items-center">
              <div className="w-14 h-14 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md">
                <PillIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white ml-4">
                Drug Interaction Checker
              </h2>
            </div>
            <div className="p-6 flex-grow">
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                Analyze potential interactions between your medications to ensure safety.
              </p>
              <button
                onClick={() => setActiveSection('interaction')}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                <span>Check Interactions</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex flex-col h-full">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-700 dark:to-indigo-800 p-4 flex items-center">
              <div className="w-14 h-14 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md">
                <AlertTriangle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-white ml-4">
                Side Effect Predictor
              </h2>
            </div>
            <div className="p-6 flex-grow">
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                Predict potential side effects based on your medication regimen and personal profile.
              </p>
              <button
                onClick={() => setActiveSection('side-effects')}
                className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-800 dark:hover:to-purple-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                <span>Predict Side Effects</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex flex-col h-full">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-700 dark:to-purple-800 p-4 flex items-center">
              <div className="w-14 h-14 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md">
                <UserCogIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white ml-4">
                Personalized Profile
              </h2>
            </div>
            <div className="p-6 flex-grow">
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                Create and manage your health profile for more accurate predictions.
              </p>
              <button
                onClick={() => setActiveSection('profile')}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-800 dark:hover:to-pink-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                <span>Manage Profile</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* How It Works - Improved with cards */}
        <div className="mb-16 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10 relative">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 bg-clip-text text-transparent">How It Works</span>
            <div className="absolute w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 bottom-0 left-1/2 transform -translate-x-1/2 mt-2 rounded-full"></div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105 border-t-4 border-blue-500 dark:border-blue-600">
              <div className="bg-blue-100 dark:bg-blue-900 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                Enter Your Medications
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Add all medications you're currently taking or considering to your profile.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105 border-t-4 border-indigo-500 dark:border-indigo-600">
              <div className="bg-indigo-100 dark:bg-indigo-900 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                Get Instant Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Our system checks for potential drug interactions and predicts side effects.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105 border-t-4 border-purple-500 dark:border-purple-600">
              <div className="bg-purple-100 dark:bg-purple-900 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                Make Informed Decisions
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Review results with your healthcare provider for better treatment planning.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose MediPredict - Enhanced */}
        <div className="text-center mb-16 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 relative">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 bg-clip-text text-transparent">Why Choose MediPredict?</span>
            <div className="absolute w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 bottom-0 left-1/2 transform -translate-x-1/2 mt-2 rounded-full"></div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 rounded-full mb-5 mx-auto shadow-md">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-3">
                Comprehensive Database
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Our system includes data on thousands of prescription and over-the-counter medications.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-700 dark:to-indigo-800 rounded-full mb-5 mx-auto shadow-md">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-3">
                Easy to Use
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Simple interface designed for patients and healthcare providers alike.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-700 dark:to-purple-800 rounded-full mb-5 mx-auto shadow-md">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-3">
                Personalized Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Takes into account your personal health factors for more accurate predictions.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 dark:from-pink-700 dark:to-pink-800 rounded-full mb-5 mx-auto shadow-md">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-3">
                Privacy Focused
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Your health data is stored locally and never shared with third parties.
              </p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-8 max-w-2xl mx-auto">
            Join <strong className="text-blue-600 dark:text-blue-400">MediPredict</strong> today and take control of your medication safety.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 dark:text-gray-300 py-8 border-t border-gray-200 dark:border-gray-700">
          <p className="mb-4">
            <strong className="text-gray-900 dark:text-white">MediPredict</strong>
            <br />
            Your personal medication safety assistant. Check drug interactions and predict side effects to make informed health decisions.
          </p>
          <p className="text-sm mb-2">
            This tool is for informational purposes only and does not replace professional medical advice. Always consult with a healthcare provider.
          </p>
          <p className="text-sm text-gray-500">
            © 2023 MediPredict. All rights reserved.
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