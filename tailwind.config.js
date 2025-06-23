module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'main-bg': {
          light: '#FFFFFF',
          dark: '#343541',
        },
        'sidebar-bg': {
          light: '#F7F7F8',
          dark: '#202123',
        },
        'card-bg': {
          light: '#F7F7F8',
          dark: '#202123',
        },
        'primary-text': {
          light: '#000000',
          dark: '#ECECF1',
        },
        'muted-text': {
          light: '#6E6E80',
          dark: '#8E8EA0',
        },
        'accent': '#10A37F',
        'hover': {
          light: '#E7E7E9',
          dark: '#2A2B32',
        },
        'border': {
          light: '#D9D9E3',
          dark: '#3E3F4B',
        },
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'card-light': '0 2px 8px 0 rgba(229,231,235,0.15)',
        'card-dark': '0 2px 8px 0 rgba(86,88,105,0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'screen-md': '720px',
      },
    },
  },
  plugins: [],
}; 