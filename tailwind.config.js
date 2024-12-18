const defaultTheme = require('tailwindcss/defaultTheme');
const flowbite = require('flowbite-react/tailwind');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('flowbite-typography'),
    require('flowbite/plugin'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
};
