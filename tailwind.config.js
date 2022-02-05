const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./web/src/**/*.{js,jsx}'],
  theme: {
    extend: {},
    screens: {
      xs: '480px',
      ...defaultTheme.screens,
    },
  },
}
