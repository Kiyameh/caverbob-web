import { getLongestCaves, getDeepestCaves, getDeepPits, getLargestChambers } from "@/lib/cave-service"
import { HomeClient } from "@/components/home-client"

export default async function Home() {
  // Fetch data for all rankings
  const longestCaves = await getLongestCaves()
  const deepestCaves = await getDeepestCaves()
  const deepPits = await getDeepPits()
  const largestChambers = await getLargestChambers()

  return (
    <HomeClient
      longestCaves={longestCaves}
      deepestCaves={deepestCaves}
      deepPits={deepPits}
      largestChambers={largestChambers}
    />
  )
}
