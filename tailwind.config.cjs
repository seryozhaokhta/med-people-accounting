/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3b82f6',
          DEFAULT: '#2563eb',
          dark: '#1e40af',
        },
        secondary: {
          light: '#fca5a5',
          DEFAULT: '#f87171',
          dark: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      maxWidth: {
        'md': '28rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
