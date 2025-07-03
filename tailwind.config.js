module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF4444',
        'primary-dark': '#CC0000',
        'primary-light': '#FF7777',
        secondary: '#007AFF',
        'secondary-dark': '#0051B8',
        'secondary-light': '#66B3FF',
        success: '#22C55E',
        'success-dark': '#15803D',
        'success-light': '#BBF7D0',
        warning: '#F97316',
        error: '#DC2626',
        background: '#FFFFFF',
        surface: '#F8F9FA',
        border: '#E5E5E5',
        'text-primary': '#212121',
        'text-secondary': '#555555',
        'text-disabled': '#9CA3AF',
        robux: '#1CBB4F',
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