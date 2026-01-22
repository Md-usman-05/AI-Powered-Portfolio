/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // 1. CUSTOM ANIMATIONS
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'marquee': 'marquee 25s linear infinite', // The Infinite Tech Stack Scroll
        'spin-slow': 'spin 10s linear infinite',  // The Profile Image Ring
      },

      // 2. ANIMATION KEYFRAMES
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }, // Slides left continuously
        },
        glow: {
          '0%': { opacity: 0.5, boxShadow: '0 0 5px rgba(6, 182, 212, 0.5)' },
          '100%': { opacity: 1, boxShadow: '0 0 20px rgba(6, 182, 212, 0.8)' },
        }
      },

      // 3. FONTS (Ensures the "Space Grotesk" & "Outfit" fonts work)
      fontFamily: {
        space: ['"Space Grotesk"', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}