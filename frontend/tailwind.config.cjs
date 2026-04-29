/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-red':      '#E53935',
        'brand-red-hover':'#D32F2F',
        'bg-beige':       '#F5F1EB',
        'surface':        '#FFFFFF',
        'border':         '#E8E3DD',
        'text-main':      '#1C1917',
        'text-muted':     '#78716C',
        'success-bg':     '#ECFDF5',
        'success-text':   '#10B981',
        'error-bg':       '#FEF2F2',
        'error-text':     '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};
