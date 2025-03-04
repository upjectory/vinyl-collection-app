/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class', // Changed to 'class' for manual control
  theme: {
    extend: {
      colors: {
        vinyl: {
          // Primary brand colors
          primary: '#6366F1', // indigo-500
          'primary-dark': '#818cf8', // indigo-400 (brighter for dark mode)
          
          secondary: '#8B5CF6', // violet-500
          'secondary-dark': '#a78bfa', // violet-400 (brighter for dark mode)
          
          accent: '#10B981', // emerald-500
          'accent-dark': '#34d399', // emerald-400 (brighter for dark mode)
          
          // Background colors
          background: {
            light: '#F9FAFB', // gray-50
            dark: '#000000', // Black background as shown in the reference
          },
          
          // Card colors
          card: {
            light: '#FFFFFF', // White for light mode
            dark: '#121212', // Very dark gray for dark mode
          },
          
          // Text colors
          text: {
            light: '#1F2937', // gray-800
            dark: '#F9FAFB', // gray-50
          }
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"Segoe UI"',
          'Roboto', 
          'Helvetica', 
          'Arial', 
          'sans-serif',
        ],
      },
      // Add box shadow extensions for the card hover effects
      boxShadow: {
        'vinyl': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'vinyl-hover': '0 10px 15px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};