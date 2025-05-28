'use client'

import {ContactForm} from '@/components/contact-form'
import {VersionCard} from '@/components/version-card'
import {useLanguage} from '@/contexts/language-context'

export default function AboutPage() {
  const {t} = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('about.title')}</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              {t('about.mission.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('about.mission.text')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              {t('about.community.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('about.community.text')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              {t('about.future.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('about.future.text')}
            </p>
          </section>
          <VersionCard />
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('contact.description')}
            </p>
            <ContactForm />
          </section>
        </div>
      </div>
    </div>
  )
}
