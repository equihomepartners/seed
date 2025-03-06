/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      // Device-specific breakpoints
      'mobile': {'max': '639px'},
      'tablet': {'min': '640px', 'max': '1023px'},
      'laptop': {'min': '1024px', 'max': '1279px'},
      'desktop': {'min': '1280px'},
    },
    extend: {
      colors: {
        primary: '#FFFFFF',
        accent: '#3B82F6',
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      animation: {
        'ping': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'progress': 'progress 2s linear infinite',
      },
      keyframes: {
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
        progress: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      // Add responsive padding and margin scales
      padding: {
        'mobile': '1rem',
        'tablet': '2rem',
        'desktop': '4rem',
      },
      margin: {
        'mobile': '1rem',
        'tablet': '2rem',
        'desktop': '4rem',
      },
      // Add responsive typography scales
      fontSize: {
        'mobile-h1': ['2rem', { lineHeight: '2.5rem' }],
        'mobile-h2': ['1.5rem', { lineHeight: '2rem' }],
        'mobile-h3': ['1.25rem', { lineHeight: '1.75rem' }],
        'mobile-body': ['0.875rem', { lineHeight: '1.25rem' }],
        'tablet-h1': ['2.5rem', { lineHeight: '3rem' }],
        'tablet-h2': ['2rem', { lineHeight: '2.5rem' }],
        'tablet-h3': ['1.5rem', { lineHeight: '2rem' }],
        'tablet-body': ['1rem', { lineHeight: '1.5rem' }],
        'desktop-h1': ['3rem', { lineHeight: '3.5rem' }],
        'desktop-h2': ['2.5rem', { lineHeight: '3rem' }],
        'desktop-h3': ['2rem', { lineHeight: '2.5rem' }],
        'desktop-body': ['1rem', { lineHeight: '1.5rem' }],
      },
      // Add responsive grid configurations
      gridTemplateColumns: {
        'mobile': 'repeat(1, minmax(0, 1fr))',
        'tablet': 'repeat(2, minmax(0, 1fr))',
        'desktop': 'repeat(3, minmax(0, 1fr))',
      },
      // Add responsive gap scales
      gap: {
        'mobile': '1rem',
        'tablet': '1.5rem',
        'desktop': '2rem',
      },
      // Add touch-friendly minimum sizes
      minHeight: {
        'touch-target': '44px',
      },
      minWidth: {
        'touch-target': '44px',
      },
      boxShadow: {
        'fintech-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'fintech-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'fintech-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
}

