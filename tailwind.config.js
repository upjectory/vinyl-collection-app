/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'media', // or 'class' for manual control
  theme: {
    extend: {
      colors: {
        vinyl: {
          primary: '#6366F1', // indigo-500
          secondary: '#8B5CF6', // violet-500
          accent: '#10B981', // emerald-500
          background: {
            light: '#F9FAFB', // gray-50
            dark: '#111827', // gray-900
          },
          text: {
            light: '#1F2937', // gray-800
            dark: '#F9FAFB', // gray-50
          }
        },
      },
      fontFamily: {
        sans: [
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"Segoe UI"',
          'Roboto', 
          'Helvetica', 
          'Arial', 
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};