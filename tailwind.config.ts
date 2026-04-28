import type { Config } from 'tailwindcss';

/**
 * Sardah Abayas — Luxury Boutique Theme
 * بوتيك سردة — لوحة الفخامة
 */
const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Sardah Brand Palette ──────────────────────
        onyx: {
          DEFAULT: '#080808',
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#cfcfcf',
          300: '#9e9e9e',
          400: '#5e5e5e',
          500: '#2c2c2c',
          600: '#1f1f1f',
          700: '#151515',
          800: '#0e0e0e',
          900: '#080808',
        },
        pearl: {
          DEFAULT: '#EFE5D4',
          50: '#F7EFE0',
          100: '#F2E9D6',
          200: '#EFE5D4',
          300: '#E6D9C3',
          400: '#D9C8AC',
        },
        ivory: '#F7EFE0',
        champagne: {
          DEFAULT: '#C8A96A',
          50: '#FBF6EC',
          100: '#F4E9CC',
          200: '#E5D29A',
          300: '#D6BB7E',
          400: '#C8A96A',
          500: '#B89653',
          600: '#A98752',
          700: '#876A40',
          800: '#5E4B2D',
          900: '#3A2E1B',
        },
        sand: '#E8DED0',
        taupe: '#B9A89A',
        rose: {
          DEFAULT: '#B98D88',
          soft: '#D4ABA6',
        },
        // semantic
        success: '#5C8A6F',
        danger: '#A14A4A',
        warning: '#C99B5C',
      },
      fontFamily: {
        // Headings — Editorial
        ruqaa: ['var(--font-aref-ruqaa)', 'serif'],
        // Body — Clean Arabic Sans
        sans: ['var(--font-ibm-plex-arabic)', 'var(--font-tajawal)', 'system-ui', 'sans-serif'],
        tajawal: ['var(--font-tajawal)', 'sans-serif'],
        plex: ['var(--font-ibm-plex-arabic)', 'sans-serif'],
      },
      fontSize: {
        // Editorial scale
        'display-2xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-lg': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.5rem, 4vw, 2.5rem)', { lineHeight: '1.2' }],
      },
      letterSpacing: {
        luxe: '0.18em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        section: '6rem',
        'section-lg': '8rem',
      },
      maxWidth: {
        boutique: '1400px',
        editorial: '1200px',
        prose: '68ch',
      },
      borderRadius: {
        luxe: '2px',
        sheet: '14px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(8,8,8,0.04), 0 8px 30px rgba(8,8,8,0.06)',
        premium: '0 2px 8px rgba(8,8,8,0.06), 0 30px 60px -20px rgba(8,8,8,0.18)',
        card: '0 1px 3px rgba(8,8,8,0.04), 0 12px 24px -8px rgba(8,8,8,0.10)',
        gold: '0 0 0 1px rgba(200,169,106,0.35), 0 8px 24px -8px rgba(200,169,106,0.25)',
        editorial: '0 30px 80px -20px rgba(8,8,8,0.35)',
        'inner-soft': 'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      backdropBlur: {
        xs: '2px',
        glass: '14px',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.16, 1, 0.3, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '900': '900ms',
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 0.7s ease-out both',
        'shimmer-gold': 'shimmerGold 3s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmerGold: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gold-gradient':
          'linear-gradient(135deg, #C8A96A 0%, #E5D29A 35%, #A98752 65%, #C8A96A 100%)',
        'gold-text':
          'linear-gradient(120deg, #C8A96A 0%, #E5D29A 50%, #A98752 100%)',
        'onyx-gradient':
          'linear-gradient(180deg, #080808 0%, #151515 100%)',
        'pearl-gradient':
          'linear-gradient(180deg, #FFFDF8 0%, #F8F5EF 100%)',
        'editorial-fade':
          'linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,0.15) 40%, rgba(8,8,8,0.85) 100%)',
        'top-fade':
          'linear-gradient(180deg, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0) 35%)',
        'noise-overlay':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
