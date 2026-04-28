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
        // ═══════════════════════════════════════════════
        // SARDAH — Royal Espresso Palette
        // لوحة "الإسبريسو الملكي" — سينمائية، دافئة، فخمة
        // Inspired by Bottega Veneta · Tom Ford · Saudi palaces
        //
        // Strategy: keep Tailwind tokens semantically intact (onyx=dark,
        // pearl=light) so existing components keep their contrast, but
        // warm every black into espresso and every cream into golden ivory.
        // The <body> background is espresso (set in globals.css), so the
        // page now alternates: espresso body → warm-ivory editorial bands
        // → espresso cinematic sections. Pure Vogue Arabia layering.
        // ═══════════════════════════════════════════════

        // Espresso (formerly cold black → warm coffee/onyx)
        onyx: {
          DEFAULT: '#15110D',  // body background — Royal Espresso
          50: '#F5EFE6',       // very light tint (rare use)
          100: '#E9DBC9',
          200: '#C9B79A',
          300: '#9A876C',
          400: '#5E4F3C',
          500: '#3D3225',
          600: '#2C2218',      // dividers
          700: '#1E1812',      // elevated cards
          800: '#1A140F',
          900: '#100D09',
          950: '#15110D',      // text-onyx-950 → primary heading on light bg
        },
        // Pearl (formerly cold whites → warm ivory & cream)
        pearl: {
          DEFAULT: '#F5EAD4',  // warm ivory
          50: '#FBF7EC',       // warmest cream — section bg (alternating bands)
          100: '#F8F2DF',      // card surface on cream sections
          200: '#F5EAD4',      // primary ivory
          300: '#E9DBBE',      // soft cream
          400: '#D9C8A8',      // sand cream
        },
        ivory: '#FBF7EC',
        // Champagne gold — the heartbeat of the palette
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
        taupe: '#8A7768',
        rose: {
          DEFAULT: '#B8908B',
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
        soft: '0 1px 2px rgba(21,17,13,0.06), 0 8px 30px rgba(21,17,13,0.10)',
        premium: '0 2px 8px rgba(21,17,13,0.10), 0 30px 60px -20px rgba(21,17,13,0.30), 0 0 0 1px rgba(200,169,106,0.10)',
        card: '0 1px 3px rgba(21,17,13,0.08), 0 12px 24px -8px rgba(21,17,13,0.18)',
        gold: '0 0 0 1px rgba(200,169,106,0.45), 0 8px 24px -8px rgba(200,169,106,0.35)',
        editorial: '0 30px 80px -20px rgba(21,17,13,0.55)',
        'inner-soft': 'inset 0 1px 0 rgba(245,234,212,0.06)',
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
          'linear-gradient(180deg, #15110D 0%, #1E1812 50%, #2C2218 100%)',
        'pearl-gradient':
          'linear-gradient(180deg, #FBF7EC 0%, #F5EAD4 100%)',
        'editorial-fade':
          'linear-gradient(180deg, rgba(10,8,6,0) 0%, rgba(10,8,6,0.25) 40%, rgba(10,8,6,0.92) 100%)',
        'top-fade':
          'linear-gradient(180deg, rgba(10,8,6,0.65) 0%, rgba(10,8,6,0) 35%)',
        'noise-overlay':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
