// Database types for TypeScript
export type TerrainType =
  | "Limestone"
  | "Conglomerate"
  | "Chalk"
  | "Gypsum"
  | "Lava"
  | "Sandstone"
  | "Underwater"
  | "Ice"
  | "Salt"

export interface Cave {
  id: number
  rank: number
  name: string
  country: string
  state: string | null
  massif: string | null
  length: number
  depth: number
  entrances: number
  terrain_type: TerrainType
  source: string
  updated_year: number | null
  updated_month: string | null
  created_at: string
  updated_at: string
}

export interface Pit {
  id: number
  rank: number
  cave: string
  country: string
  depth: number
  source: string
  updated_year: number | null
  updated_month: string | null
  free_fall: boolean
  created_at: string
  updated_at: string
}

export interface Chamber {
  id: number
  rank: number
  cave: string
  country: string
  dimensions: string
  area: number
  volume: number
  source: string
  updated_year: number | null
  updated_month: string | null
  created_at: string
  updated_at: string
}
