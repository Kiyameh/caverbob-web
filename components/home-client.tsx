"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RankingTableClient from "@/components/ranking-table-client"
import { useLanguage } from "@/contexts/language-context"

interface HomeClientProps {
  longestCaves: any[]
  deepestCaves: any[]
  deepPits: any[]
  largestChambers: any[]
}

export function HomeClient({ longestCaves, deepestCaves, deepPits, largestChambers }: HomeClientProps) {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">{t("home.title")}</h1>

      <Tabs defaultValue="longest" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-secondary text-secondary-foreground">
          <TabsTrigger
            value="longest"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {t("home.tab.longest")}
          </TabsTrigger>
          <TabsTrigger
            value="deepest"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {t("home.tab.deepest")}
          </TabsTrigger>
          <TabsTrigger
            value="pits"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {t("home.tab.pits")}
          </TabsTrigger>
          <TabsTrigger
            value="chambers"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {t("home.tab.chambers")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="longest">
          <div className="mt-6">
            <RankingTableClient type="longest" initialData={longestCaves} />
          </div>
        </TabsContent>

        <TabsContent value="deepest">
          <div className="mt-6">
            <RankingTableClient type="deepest" initialData={deepestCaves} />
          </div>
        </TabsContent>

        <TabsContent value="pits">
          <div className="mt-6">
            <RankingTableClient type="pits" initialData={deepPits} />
          </div>
        </TabsContent>

        <TabsContent value="chambers">
          <div className="mt-6">
            <RankingTableClient type="chambers" initialData={largestChambers} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
