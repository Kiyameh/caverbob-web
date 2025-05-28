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
  title: 'CaverBob.org - Worldwide Cave Rankings',
  description:
    'The central repository for worldwide cave rankings, dedicated to the memory of Robert Gulden.',
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
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </MeasurementProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
