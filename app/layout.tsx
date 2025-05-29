import type React from 'react'
import type {Metadata} from 'next'
import {Outfit} from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import {MeasurementProvider} from '@/contexts/measurement-context'
import {AuthProvider} from '@/contexts/auth-context'
import {LanguageProvider} from '@/contexts/language-context'

const outfit = Outfit({subsets: ['latin']})

export const metadata: Metadata = {
  title: {
    default: 'CaverBob.org - Worldwide Cave Rankings',
    template: '%s | CaverBob.org',
  },
  description:
    'The central repository for worldwide cave rankings, dedicated to the memory of Robert Gulden. Find the longest, deepest, and most remarkable caves in the world.',
  keywords: [
    'caves',
    'speleology',
    'cave rankings',
    'longest caves',
    'deepest caves',
    'cave exploration',
    'Robert Gulden',
  ],
  authors: [{name: 'CaverBob.org Team'}],
  creator: 'CaverBob.org',
  publisher: 'CaverBob.org',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.caverbob.org'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'es-ES': '/es',
      'fr-FR': '/fr',
    },
  },
  openGraph: {
    title: 'CaverBob.org - Worldwide Cave Rankings',
    description:
      'The central repository for worldwide cave rankings, dedicated to the memory of Robert Gulden. Find the longest, deepest, and most remarkable caves in the world.',
    url: 'https://www.caverbob.org',
    siteName: 'CaverBob.org',
    images: [
      {
        url: '/logo.png',
        width: 200,
        height: 200,
        alt: 'CaverBob Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CaverBob.org - Worldwide Cave Rankings',
    description:
      'The central repository for worldwide cave rankings, dedicated to the memory of Robert Gulden. Find the longest, deepest, and most remarkable caves in the world.',
    images: ['/logo.png'],
    creator: '@caverbob',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Necesitarás añadir tu código de verificación
  },
  icons: {
    icon: [
      {url: '/favicon.png'},
      {url: '/favicon.png', sizes: '32x32', type: 'image/png'},
      {url: '/favicon.png', sizes: '16x16', type: 'image/png'},
    ],
    apple: [
      {url: '/favicon.png'},
      {url: '/favicon.png', sizes: '180x180', type: 'image/png'},
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.png',
      },
    ],
  },
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <AuthProvider>
          <LanguageProvider>
            <MeasurementProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow relative">
                  <div className="absolute top-0 left-0 w-full h-auto z-[-1] opacity-20">
                    <svg
                      width="100%"
                      height="auto"
                      viewBox="0 0 1440 181"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 178.5L0.5 150V1H1439V105L1425.5 168.5L1415.5 131L1407 146L1324 44L1232 40.5L1198.5 63L1185 102L1177.5 80L1168 118L1160.5 85.5L1144.5 59L1074.5 34.5L979 24L902 34.5H831.5H766L740 59L727 44L669 24L624 44L571.5 20.5L494 24L471 48.5L455.5 109.5L440.5 71L435 90L429.5 71L409 34.5L342 30.5L311 62.5L302.5 105L287.5 71L256.5 44L210.5 48.5L176 71L152 105L136.5 90L126 128L120 105L105.5 93.5L89.5 122.5L79 109.5L60 144L41 109.5L23.5 140.5L9.5 178.5Z"
                        fill="#A0AAB9"
                      />
                      <path
                        d="M11.5 103.5L0.5 47.5V0.5H1440V47.5L1416 118.5L1401.5 93.5L1381 181L1364 114L1355 141L1340.5 73L1309 88.5L1287 55.5L1200.5 45L1161 55.5L1134.5 78.5L1100.5 52L1063.5 41.5L1034 52L1006.5 118L998.5 88.5L992 105L984.5 55.5L975 30L958.5 45L947.5 78.5L942.5 55.5L931 41.5L872.5 45L830.5 61L738 34L661.5 41.5L630.5 61L615.5 94L607 72.5L560.5 34L511.5 47.5L491.5 34L443.5 41.5L416 61L397.5 98L386 72.5L376.5 85.5L342.5 52.5L311.5 34L271 47.5L223 61L182 41.5L146.5 72.5L122.5 41.5L104 78L91 56L61 118L54.5 103.5L43 133.5L35.5 176.5L31 142.5L18 85.5L11.5 103.5Z"
                        fill="#344256"
                      />
                    </svg>
                  </div>
                  <div className="absolute opacity-20 bottom-0 left-0 w-full h-auto z-[-2]">
                    <svg
                      id="visual"
                      viewBox="0 0 900 450"
                      width="100%"
                      height="auto"
                      preserveAspectRatio="xMidYMid slice"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                    >
                      <path
                        d="M0 353L90 327L180 361L270 363L360 351L450 346L540 328L630 342L720 343L810 337L900 348L900 451L810 451L720 451L630 451L540 451L450 451L360 451L270 451L180 451L90 451L0 451Z"
                        fill="#f9bfc8"
                      ></path>
                      <path
                        d="M0 381L90 373L180 379L270 371L360 388L450 365L540 381L630 367L720 353L810 369L900 356L900 451L810 451L720 451L630 451L540 451L450 451L360 451L270 451L180 451L90 451L0 451Z"
                        fill="#b692aa"
                      ></path>
                      <path
                        d="M0 391L90 405L180 412L270 390L360 395L450 400L540 396L630 382L720 384L810 404L900 404L900 451L810 451L720 451L630 451L540 451L450 451L360 451L270 451L180 451L90 451L0 451Z"
                        fill="#716984"
                      ></path>
                      <path
                        d="M0 407L90 424L180 410L270 431L360 416L450 407L540 429L630 427L720 407L810 420L900 407L900 451L810 451L720 451L630 451L540 451L450 451L360 451L270 451L180 451L90 451L0 451Z"
                        fill="#344256"
                      ></path>
                    </svg>
                  </div>
                  <div>{children}</div>
                </main>
                <Footer />
              </div>
            </MeasurementProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
