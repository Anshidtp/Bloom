/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream:       '#FFF8ED',
        chocolate:   '#4A2C2A',
        roseGold:    '#B76E79',
        gold:        '#D4AF37',
        cocoa:       '#2B1B17',
        secondary:   '#795553',
        surface:     '#fdf8f7',
        'surface-low': '#f7f3f1',
        'surface-container': '#f1edeb',
        'outline-variant': '#ccc6bc',
      },
      fontFamily: {
        playfair:  ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        poppins:   ['Poppins', 'sans-serif'],
        inter:     ['Inter', 'sans-serif'],
      },
      animation: {
        float:       'float 6s ease-in-out infinite',
        'float-slow':'float 9s ease-in-out infinite',
        shimmer:     'shimmer 2.5s linear infinite',
        fadeUp:      'fadeUp 0.6s ease forwards',
        slideIn:     'slideIn 0.4s ease forwards',
        confetti:    'fall 3s ease-out forwards',
        pulse:       'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
        spin:        'spin 1s linear infinite',
      },
      keyframes: {
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        fadeUp:  { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { '0%': { opacity: '0', transform: 'translateX(20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        fall:    { '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: '1' }, '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' } },
      },
      backdropBlur: { xl: '16px' },
      boxShadow: {
        chocolate: '0 20px 40px -15px rgba(74,44,42,0.12)',
        gold:      '0 0 20px rgba(212,175,55,0.15), inset 0 0 8px rgba(212,175,55,0.05)',
        glass:     '0 8px 32px rgba(74,44,42,0.08)',
      },
    },
  },
  plugins: [],
}