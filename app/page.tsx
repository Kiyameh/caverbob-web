import {
  getLongestCaves,
  getDeepestCaves,
  getDeepPits,
  getLargestChambers,
} from '@/lib/cave-service'
import {HomeClient} from '@/components/home-client'
import type {Metadata} from 'next'

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

export const metadata: Metadata = {
  title: 'Worldwide Cave Rankings',
  description:
    "Explore the world's most remarkable caves. Find rankings for the longest, deepest, and most impressive cave systems across the globe.",
  alternates: {
    canonical: '/',
  },
}
