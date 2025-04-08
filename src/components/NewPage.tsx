import React from 'react';

interface NewPageProps {
  darkMode: boolean;
}

const NewPage: React.FC<NewPageProps> = ({ darkMode }) => {
  return (
    <div className={`container mx-auto px-4 py-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <h1 className="text-3xl font-bold mb-6">New Page</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <p className="text-lg mb-4">
          Welcome to the new page! This is a sample page that you can customize with your content.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Feature 1</h2>
            <p>Description of feature 1</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Feature 2</h2>
            <p>Description of feature 2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPage; 