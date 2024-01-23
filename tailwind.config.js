/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        "link-underline": "#FF6B08",
        "switch-bg": "#FF6B08",
        "movie-genres-and-date": "#FF6B08",
        "active-pagination-bg": "#FF6B08",
        "pagination-btn-bg": "#F7F7F7",
        "modal-text-gray": "#8C8C8C",
        "vote-average-bg": "#FF6B01",
        "active-button-bg": "#FF6B01",
        "footer-text": "#545454",
      },
      backgroundImage: {
        'main-page': "linear-gradient(rgba(0,0,0,0.56), rgba(0,0,0,0.56)), url('/bgImg1.png')",
        'library-page': "linear-gradient(rgba(0,0,0,0.56), rgba(0,0,0,0.56)), url('/bgImg2.png')",
      },
      backgroundPosition: {
        'left-200': '-200px 0px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
