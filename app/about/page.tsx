'use client'

import {useLanguage} from '@/contexts/language-context'

export default function AboutPage() {
  const {t} = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        {t('about.title')}
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          {t('about.mission.title')}
        </h2>
        <p className="text-lg text-gray-700 mb-4">{t('about.mission.text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          {t('about.community.title')}
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          {t('about.community.text')}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          {t('about.future.title')}
        </h2>
        <p className="text-lg text-gray-700 mb-4">{t('about.future.text')}</p>
      </section>
    </div>
  )
}
