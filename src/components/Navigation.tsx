import React from 'react';
import { Pill, Moon, Sun } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  setActiveSection,
  darkMode,
  setDarkMode
}) => {
  const handleNavClick = (section: string) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bg-[#1a1f2e] shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Pill className="text-[#3b82f6] h-8 w-8" />
            <span className="font-semibold text-xl text-[#3b82f6]">MediSafe</span>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center space-x-8 mr-6">
              <button
                onClick={() => handleNavClick('home')}
                className={`text-gray-200 hover:text-[#3b82f6] transition duration-300 ${
                  activeSection === 'home' ? 'text-[#3b82f6]' : ''
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('interaction')}
                className={`text-gray-200 hover:text-[#3b82f6] transition duration-300 ${
                  activeSection === 'interaction' ? 'text-[#3b82f6]' : ''
                }`}
              >
                Interaction Checker
              </button>
              <button
                onClick={() => handleNavClick('side-effects')}
                className={`text-gray-200 hover:text-[#3b82f6] transition duration-300 ${
                  activeSection === 'side-effects' ? 'text-[#3b82f6]' : ''
                }`}
              >
                Side Effect Predictor
              </button>
              <button
                onClick={() => handleNavClick('profile')}
                className={`text-gray-200 hover:text-[#3b82f6] transition duration-300 ${
                  activeSection === 'profile' ? 'text-[#3b82f6]' : ''
                }`}
              >
                My Profile
              </button>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;