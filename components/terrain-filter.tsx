"use client"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Define the terrain types
export const terrainTypes = [
  "Limestone",
  "Conglomerate",
  "Chalk",
  "Gypsum",
  "Lava",
  "Sandstone",
  "Underwater",
  "Ice",
  "Salt",
] as const

export type TerrainType = (typeof terrainTypes)[number]

// Define colors for each terrain type
const terrainTypeColors: Record<TerrainType, string> = {
  Limestone: "bg-stone-100 hover:bg-stone-200",
  Conglomerate: "bg-orange-100 hover:bg-orange-200",
  Chalk: "bg-gray-100 hover:bg-gray-200",
  Gypsum: "bg-purple-100 hover:bg-purple-200",
  Lava: "bg-red-100 hover:bg-red-200",
  Sandstone: "bg-yellow-100 hover:bg-yellow-200",
  Underwater: "bg-blue-100 hover:bg-blue-200",
  Ice: "bg-cyan-100 hover:bg-cyan-200",
  Salt: "bg-white hover:bg-gray-50 border-gray-300",
}

interface TerrainFilterProps {
  selectedTerrains: TerrainType[]
  onChange: (terrains: TerrainType[]) => void
}

export function TerrainFilter({ selectedTerrains, onChange }: TerrainFilterProps) {
  const toggleTerrain = (terrain: TerrainType) => {
    if (selectedTerrains.includes(terrain)) {
      onChange(selectedTerrains.filter((t) => t !== terrain))
    } else {
      onChange([...selectedTerrains, terrain])
    }
  }

  const selectAll = () => {
    onChange([...terrainTypes])
  }

  const unselectAll = () => {
    onChange([])
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Filter by Terrain Type</h3>
        <div className="flex space-x-2">
          <button
            className="rounded-full px-3 py-1 text-xs font-medium border border-primary/20 hover:bg-primary/10 flex items-center gap-1"
            onClick={selectAll}
            title="Select All"
          >
            <Check className="h-3 w-3" />
            All
          </button>
          <button
            className="rounded-full px-3 py-1 text-xs font-medium border border-primary/20 hover:bg-primary/10 flex items-center gap-1"
            onClick={unselectAll}
            title="Clear All"
          >
            <X className="h-3 w-3" />
            None
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {terrainTypes.map((terrain) => {
          const isSelected = selectedTerrains.includes(terrain)
          return (
            <button
              key={terrain}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1 transition-colors",
                isSelected ? "bg-accent/20 text-accent border border-accent" : "border border-gray-200 text-gray-700",
                terrainTypeColors[terrain],
              )}
              onClick={() => toggleTerrain(terrain)}
              title={terrain}
            >
              {isSelected && <Check className="h-3 w-3" />}
              {terrain}
            </button>
          )
        })}
      </div>
    </div>
  )
}
