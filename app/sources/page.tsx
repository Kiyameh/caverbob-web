'use client'

import {useLanguage} from '@/contexts/language-context'

export default function SourcesPage() {
  const {t} = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        {t('sources.title')}
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          {t('sources.collection.title')}
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          {t('sources.collection.text')}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          {t('sources.standards.title')}
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          {t('sources.standards.text')}
        </p>
        <ul className="list-disc pl-6 mb-4 text-lg text-gray-700">
          <li>{t('sources.standards.item1')}</li>
          <li>{t('sources.standards.item2')}</li>
          <li>{t('sources.standards.item3')}</li>
          <li>{t('sources.standards.item4')}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          {t('sources.primary.title')}
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          {t('sources.primary.text')}
        </p>
        <ul className="list-disc pl-6 text-lg text-gray-700">
          <li>{t('sources.primary.item1')}</li>
          <li>{t('sources.primary.item2')}</li>
          <li>{t('sources.primary.item3')}</li>
          <li>{t('sources.primary.item4')}</li>
        </ul>
      </section>
    </div>
  )
}
