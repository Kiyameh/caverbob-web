"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { MeasurementDisplay } from "@/components/measurement-display"
import CaveDiscussion from "@/components/cave-discussion"

interface CaveDetailClientProps {
  cave: any
  id: string
}

export function CaveDetailClient({ cave, id }: CaveDetailClientProps) {
  const { t } = useLanguage()

  // Format date from updated_year and updated_month
  const formatDate = (year: number | null, month: string | null) => {
    if (!year) return t("table.na")
    return `${month || ""} ${year}`
  }

  // Safe number formatting
  const formatNumber = (num: number | null | undefined) => {
    if (num == null) return t("table.na")
    return num.toLocaleString()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center mb-6 text-primary hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("cave.back")}
      </Link>

      <div className="max-w-4xl mx-auto">
        {/* Cave Information Card */}
        <div className="bg-surface-2 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-primary text-primary-foreground p-6">
            <h1 className="text-3xl font-bold">{cave.name}</h1>
            <p className="text-xl mt-2">
              {cave.country}
              {cave.state && `, ${cave.state}`}
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-primary">{t("cave.info")}</h2>
                <dl className="space-y-2">
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="font-medium text-muted-foreground">{t("cave.rank")}:</dt>
                    <dd>#{cave.rank}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="font-medium text-muted-foreground">{t("cave.length")}:</dt>
                    <dd>
                      <MeasurementDisplay meters={cave.length} type="length" />
                    </dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="font-medium text-muted-foreground">{t("cave.depth")}:</dt>
                    <dd>
                      <MeasurementDisplay meters={cave.depth} type="depth" />
                    </dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="font-medium text-muted-foreground">{t("cave.entrances")}:</dt>
                    <dd>{formatNumber(cave.entrances)}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="font-medium text-muted-foreground">{t("cave.terrain")}:</dt>
                    <dd>{cave.terrain_type}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 text-primary">{t("cave.location")}</h2>
                <dl className="space-y-2">
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="font-medium text-muted-foreground">{t("cave.country")}:</dt>
                    <dd>{cave.country}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="font-medium text-muted-foreground">{t("cave.state")}:</dt>
                    <dd>{cave.state || t("table.na")}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="font-medium text-muted-foreground">{t("cave.massif")}:</dt>
                    <dd>{cave.massif || t("table.na")}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="font-medium text-muted-foreground">{t("cave.source")}:</dt>
                    <dd>{cave.source}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="font-medium text-muted-foreground">{t("cave.updated")}:</dt>
                    <dd>{formatDate(cave.updated_year, cave.updated_month)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Discussion Section */}
        <CaveDiscussion caveId={id} caveName={cave.name} />
      </div>
    </div>
  )
}
