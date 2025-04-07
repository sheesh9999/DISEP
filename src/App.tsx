import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import InteractionChecker from './components/InteractionChecker';
import SideEffectPredictor from './components/SideEffectPredictor';
import Profile from './components/Profile';

interface Props {
  darkMode?: boolean;
  onDarkModeChange?: (darkMode: boolean) => void;
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navigation 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      
      <main className="pt-16">
        {activeSection === 'home' && <Home darkMode={darkMode} setActiveSection={setActiveSection} />}
        {activeSection === 'interaction' && <InteractionChecker darkMode={darkMode} onDarkModeChange={setDarkMode} />}
        {activeSection === 'side-effects' && <SideEffectPredictor darkMode={darkMode} />}
        {activeSection === 'profile' && <Profile darkMode={darkMode} />}
      </main>
    </div>
  );
}

export default App;