import { createServerClient } from "@/lib/supabase"
import type { Cave, Pit, Chamber, TerrainType } from "@/lib/database-types"

// Fetch longest caves
export async function getLongestCaves() {
  const supabase = createServerClient()

  // Use double quotes around "rank" to treat it as an identifier, not a function
  const { data, error } = await supabase.from("caves").select("*").order("length", { ascending: false }).limit(100)

  if (error) {
    console.error("Error fetching longest caves:", error)
    return []
  }

  return data as Cave[]
}

// Fetch deepest caves
export async function getDeepestCaves() {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("caves").select("*").order("depth", { ascending: false }).limit(100)

  if (error) {
    console.error("Error fetching deepest caves:", error)
    return []
  }

  return data as Cave[]
}

// Fetch deep pits
export async function getDeepPits() {
  const supabase = createServerClient()

  // Use id for ordering instead of rank
  const { data, error } = await supabase.from("pits").select("*").order("id", { ascending: true }).limit(100)

  if (error) {
    console.error("Error fetching deep pits:", error)
    return []
  }

  return data as Pit[]
}

// Fetch largest chambers
export async function getLargestChambers() {
  const supabase = createServerClient()

  // Use id for ordering instead of rank
  const { data, error } = await supabase.from("chambers").select("*").order("id", { ascending: true }).limit(100)

  if (error) {
    console.error("Error fetching largest chambers:", error)
    return []
  }

  return data as Chamber[]
}

// Filter caves by terrain type
export async function getCavesByTerrainType(terrainTypes: TerrainType[]) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("caves")
    .select("*")
    .in("terrain_type", terrainTypes)
    .order("id", { ascending: true })
    .limit(100)

  if (error) {
    console.error("Error fetching caves by terrain type:", error)
    return []
  }

  return data as Cave[]
}

// Search caves by term
export async function searchCaves(searchTerm: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("caves")
    .select("*")
    .or(
      `name.ilike.%${searchTerm}%,country.ilike.%${searchTerm}%,state.ilike.%${searchTerm}%,massif.ilike.%${searchTerm}%`,
    )
    .order("id", { ascending: true })
    .limit(100)

  if (error) {
    console.error("Error searching caves:", error)
    return []
  }

  return data as Cave[]
}
