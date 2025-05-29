'use client'

import Image from 'next/image'
import {useLanguage} from '@/contexts/language-context'

export default function TributePage() {
  const {t} = useLanguage()

  return (
    <div className="container mx-auto px-4 py-12 ">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center  text-accent">
          {t('tribute.title')}
        </h1>

        {/* Main content section with photo and bio */}
        <div className="bg-surface-2 rounded-2xl shadow-md overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row">
            {/* Photo column */}
            <div className="md:w-1/3 p-6 bg-primary/5 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white shadow-lg border-4 border-white">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bob_Gulden-ABQt1GQoIZVSByka3x5yGfoMtsgJc6.png"
                  alt="Robert 'Bob' Gulden"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center font-medium">
                Robert "Bob" Gulden
                <br />
                <span className="text-xs">
                  March 30, 1948 - November 30, 2022
                </span>
              </p>
            </div>

            {/* Bio column */}
            <div className="md:w-2/3 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-primary">
                {t('tribute.legacy')}
              </h2>
              <div className="space-y-4 text-foreground/90">
                <p className="leading-relaxed">{t('tribute.bio.p1')}</p>
                <p className="leading-relaxed">{t('tribute.bio.p2')}</p>
                <p className="leading-relaxed">{t('tribute.bio.p3')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contributions section */}
        <div className="bg-secondary/50 rounded-2xl p-8 mb-12 shadow-md border border-secondary">
          <div className="flex items-center mb-6">
            <div className="h-10 w-2 bg-accent rounded-full mr-4"></div>
            <h3 className="text-xl font-semibold text-primary">
              {t('tribute.contributions.title')}
            </h3>
          </div>
          <ul className="list-none space-y-3 pl-6">
            {[1, 2, 3, 4, 5, 6, 7].map((index) => (
              <li
                key={index}
                className="flex items-start"
              >
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary mr-3 flex-shrink-0 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="text-foreground/90">
                  {t(`tribute.contributions.item${index}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Legacy section */}
        <div className="bg-gradient-to-br from-surface-2 to-surface-3 rounded-2xl p-8 mb-12 shadow-md border-l-4 border-primary">
          <div className="flex items-center mb-6">
            <div className="h-10 w-2 bg-accent rounded-full mr-4"></div>
            <h3 className="text-xl font-semibold text-primary">
              {t('tribute.legacy.title')}
            </h3>
          </div>
          <div className="space-y-4 text-foreground/90">
            <p className="leading-relaxed">{t('tribute.legacy.p1')}</p>
            <p className="leading-relaxed">{t('tribute.legacy.p2')}</p>
          </div>
        </div>

        {/* Personal life section */}
        <div className="bg-surface-2 rounded-2xl p-8 shadow-md border border-primary/20">
          <div className="flex items-center mb-6">
            <div className="h-10 w-2 bg-accent rounded-full mr-4"></div>
            <h3 className="text-xl font-semibold text-primary">
              {t('tribute.personal.title')}
            </h3>
          </div>
          <div className="space-y-4 text-foreground/90">
            <p className="leading-relaxed">{t('tribute.personal.p1')}</p>
            <p className="leading-relaxed">{t('tribute.personal.p2')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
