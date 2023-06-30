/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'link-underline': '#FF6B08',
        'movie-genres-and-date': '#FF6B08',
        'active-pagination-bg': '#FF6B08',
        'pagination-btn-bg': '#F7F7F7',
        'modal-text-gray': '#8C8C8C',
        'vote-average-bg': '#FF6B01',
        'active-button-bg': '#FF6B01',
        'footer-text': '#545454',
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
  plugins: [],
};
