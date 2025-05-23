/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        dark: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        accent: {
          blue: '#007BFF',
          blueLight: '#3395FF',
          blueDark: '#0062CC',
        },
      },
      backgroundColor: {
        'dark-primary': '#111827',
        'dark-secondary': '#1f2937',
        'dark-tertiary': '#374151',
      },
      textColor: {
        'dark-primary': '#f9fafb',
        'dark-secondary': '#e5e7eb',
        'dark-tertiary': '#9ca3af',
      },
    },
  },
  plugins: [],
};
