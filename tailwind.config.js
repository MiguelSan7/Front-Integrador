/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      textStroke: {
        'sm': '1px',
        'DEFAULT': '2px',
        'md': '3px',
        'lg': '4px',
      },
      textShadow: {
        'sm': '1px 1px 1px rgba(0,0,0,0.5)',
        'DEFAULT': '2px 2px 2px rgba(0,0,0,0.5)',
        'md': '3px 3px 3px rgba(0,0,0,0.5)',
        'lg': '4px 4px 4px rgba(0,0,0,0.5)',
      },
    }
  },
  variants: {
    textStroke: ['responsive'],
    textShadow: ['responsive'],
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-stroke': {
          '-webkit-text-stroke': '0.8px black',
          'text-stroke': '1px black',
        },
        '.text-stroke-2': {
          '-webkit-text-stroke': '2px black',
          'text-stroke': '2px black',
        },
        '.text-stroke-3': {
          '-webkit-text-stroke': '3px black',
          'text-stroke': '3px black',
        },
        '.text-stroke-4': {
          '-webkit-text-stroke': '4px black',
          'text-stroke': '4px black',
        },

        '.text-shadow': {
          'text-shadow': '1px 1px 1px rgba(0,0,0,0.5)',
        },
        '.text-shadow-2': {
          'text-shadow': '2px 2px 2px rgba(0,0,0,0.5)',
        },
        '.text-shadow-3': {
          'text-shadow': '3px 3px 3px rgba(0,0,0,0.5)',
        },
        '.text-shadow-4': {
          'text-shadow': '4px 4px 4px rgba(0,0,0,0.5)',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
};


