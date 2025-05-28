'use client'

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {useLanguage} from '@/contexts/language-context'
import {Badge} from '@/components/ui/badge'

export function VersionCard() {
  const {t} = useLanguage()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t('version.title')}</CardTitle>
          <Badge variant="secondary">v1.3</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">{t('version.latest.title')}</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>{t('version.latest.item1')}</li>
              <li>{t('version.latest.item2')}</li>
              <li>{t('version.latest.item3')}</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
