/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        blue: {
          400: '#60A5FA'
        },
        green: {
          400: '#34D399'
        },
        purple: {
          400: '#A78BFA'
        },
        gray: {
          400: '#9CA3AF',
          500: '#6B7280',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        }
      }
    },
  },
  plugins: [],
};