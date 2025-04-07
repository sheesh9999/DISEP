import React from 'react';

interface FooterProps {
  setActiveSection: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveSection }) => {
  const handleNavClick = (section: string) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">MediSafe</h3>
            <p className="text-gray-400">
              Your personal medication safety assistant. Check drug interactions and predict side effects to make informed health decisions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Important Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('interaction')}
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Drug Interaction Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('side-effects')}
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Side Effect Predictor
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('profile')}
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  My Profile
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Disclaimer</h3>
            <p className="text-gray-400">
              This tool is for informational purposes only and does not replace professional medical advice. Always consult with a healthcare provider.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MediSafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;