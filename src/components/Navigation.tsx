import React from 'react';
import { Menu, X, Sun, Moon, Home, Pill, Activity, User } from 'lucide-react';

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
  isMobileMenuOpen,
  toggleMobileMenu,
  darkMode,
  setDarkMode
}) => {
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'interaction', label: 'Interaction Checker', icon: Pill },
    { id: 'side-effects', label: 'Side Effect Predictor', icon: Activity },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex flex-1">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">MediPredict</span>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:items-center sm:justify-center flex-1 mx-auto">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`${
                    activeSection === item.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200'
                  } inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-colors duration-200 mx-1 relative group`}
                >
                  <item.icon className={`h-4 w-4 mr-2 ${
                    activeSection === item.id 
                      ? 'text-blue-500' 
                      : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                  }`} />
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-100 transition-transform duration-300"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            <div className="sm:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-800 shadow-lg border-t dark:border-gray-700">
          <div className="pt-2 pb-3 space-y-1 px-4">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  toggleMobileMenu();
                }}
                className={`${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400 border-l-4 border-blue-500'
                    : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-l-4 hover:border-blue-500'
                } flex items-center w-full px-3 py-3 rounded-md text-base font-medium transition-all duration-200`}
              >
                <item.icon className={`h-5 w-5 mr-3 ${
                  activeSection === item.id 
                    ? 'text-blue-500' 
                    : 'text-gray-400'
                }`} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;