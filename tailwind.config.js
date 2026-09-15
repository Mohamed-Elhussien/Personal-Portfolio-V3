/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
          dim: 'rgba(139,92,246,0.15)',
        },
        cyan: {
          DEFAULT: '#06B6D4',
          dim: 'rgba(6,182,212,0.15)',
        },
      },
    },
  },
  plugins: [],
}