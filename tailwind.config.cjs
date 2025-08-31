/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        accent: '#f59e0b',
      },
      boxShadow: {
        glass: '0 20px 40px -10px rgba(0,0,0,.25)',
      },
      backdropBlur: {
        20: '20px',
      },
      borderRadius: {
        '3xl': '1.75rem'
      }
    },
  },
  plugins: [],
}
