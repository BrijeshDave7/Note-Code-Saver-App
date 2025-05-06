/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        witchPurple: '#6B21A8',
        witchDeepBlue: '#1E3A8A',
        witchMutedGreen: '#4B7F52',
        witchLightGray: '#D1D5DB',
        witchDarkBackground: '#1A1A2E',
      },
      fontFamily: {
        witch: ['Georgia', 'serif'],
      },
      backgroundImage: {
        'witch-gradient': 'linear-gradient(135deg, #1A1A2E 0%, #6B21A8 100%)',
      },
    },
  },
  plugins: [],
}
