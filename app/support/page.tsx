'use client'

import {useLanguage} from '@/contexts/language-context'
import {Coffee} from 'lucide-react'
import Link from 'next/link'

export default function SupportPage() {
  const {t} = useLanguage()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-primary">
          {t('support.title')}
        </h1>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg mb-6">{t('support.description')}</p>
          <p className="text-lg mb-8">{t('support.help')}</p>
        </div>

        <div className="flex justify-center">
          <Link
            href="https://buymeacoffee.com/kiyameh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FFDD00] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#FFDD00]/90 transition-colors"
          >
            <Coffee className="w-5 h-5" />
            {t('support.coffee')}
          </Link>
        </div>
      </div>
    </div>
  )
}
