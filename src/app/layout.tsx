import type { Metadata, Viewport } from 'next';
import { Aref_Ruqaa, IBM_Plex_Sans_Arabic, Tajawal } from 'next/font/google';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { HeaderLuxury } from '@/components/layout/HeaderLuxury';
import { FooterEditorial } from '@/components/layout/FooterEditorial';

// ── Fonts ───────────────────────────────────────────
// Editorial Arabic display heading
const arefRuqaa = Aref_Ruqaa({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-aref-ruqaa',
  display: 'swap',
  preload: true,
});

// Body — clean Arabic sans
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-arabic',
  display: 'swap',
  preload: true,
});

// Numerals & UI accents
const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
  preload: false,
});

// ── Viewport ────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8F5EF' },
    { media: '(prefers-color-scheme: dark)', color: '#080808' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light',
};

// ── Metadata ────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sardah.com';
const SITE_NAME = 'عبايات سردة';
const SITE_TAGLINE = 'فخامة التفاصيل وأناقة الحضور';
const SITE_DESCRIPTION =
  'بوتيك سردة الرقمي للعبايات الفاخرة. أقمشة كورية مختارة بعناية، خياطة نظيفة، وتفاصيل تليق بحضورك. اكتشفي تشكيلتنا من العبايات اليومية والمناسبات والشتوية والنقابات.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: 'Next.js',
  keywords: [
    'عبايات سردة',
    'sardah abayas',
    'عبايات سعودية',
    'عبايات فاخرة',
    'عبايات جاكار',
    'عبايات دانتيل',
    'عبايات شتوية',
    'عبايات مناسبات',
    'عبايات عملية',
    'نقابات',
    'أقمشة كورية',
    'بوتيك عبايات',
    'موضة محتشمة',
    'sardah',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'fashion',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'ar-SA': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'عبايات سردة — بوتيك العبايات الفاخرة',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'سردة',
    statusBarStyle: 'black-translucent',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

// ── Root Layout ─────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${arefRuqaa.variable} ${ibmPlexArabic.variable} ${tajawal.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-pearl text-onyx min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-[100] focus:bg-onyx focus:text-pearl focus:px-4 focus:py-2 focus:rounded-luxe"
        >
          تخطّي إلى المحتوى الرئيسي
        </a>
        <AnnouncementBar />
        <HeaderLuxury />
        <main id="main" className="flex-1">
          {children}
        </main>
        <FooterEditorial />
      </body>
    </html>
  );
}
