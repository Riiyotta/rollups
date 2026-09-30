/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'light-100': '#e4eac8',
        'light-200': '#d1dbb9',
        'light-300': '#989e7b',
        green: '#2a5d33',
        'green-deep': '#295d32',
        'green-dark': '#273f2c',
        black: '#1a1717',
        'light-bg': '#ecefe7',
        tint: 'rgba(84,137,93,.24)',
        'tint-hover': 'rgba(84,137,93,.4)',
        'btn-secondary': 'rgba(228,234,200,.08)',
        'btn-secondary-hover': 'rgba(228,234,200,.12)',
        'btn-secondary-border': '#466346',
        modal: '#2d5636',
      },
      fontFamily: {
        primary: ['SuisseIntl', '"SuisseIntl Fallback"', 'system-ui', 'arial'],
        secondary: ['PpNeueCorp', '"PpNeueCorp Fallback"', 'system-ui', 'arial'],
        mono: ['AbcFavoritMono', '"AbcFavoritMono Fallback"', 'monospace', 'system-ui'],
      },
      spacing: { '3xs': '4px', '2xs': '6px', xs: '8px', sm: '12px', md: '16px', lg: '24px' },
      borderWidth: { hair: '0.5px' },
      screens: { mobile: { max: '767px' }, tablet: { max: '991px' }, wide: '1600px' },
    },
  },
  corePlugins: { container: false },
  plugins: [],
}
