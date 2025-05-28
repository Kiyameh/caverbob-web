"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowUpDown } from "lucide-react"
import { useMeasurement } from "@/contexts/measurement-context"
import { TerrainFilter, terrainTypes, type TerrainType } from "@/components/terrain-filter"
import type { Cave, Pit, Chamber } from "@/lib/database-types"
import Link from "next/link"

// Define the types
interface RankingTableClientProps {
  type: "longest" | "deepest" | "pits" | "chambers"
  initialData: Cave[] | Pit[] | Chamber[]
}

type SortDirection = "asc" | "desc" | null

interface SortState {
  column: string | null
  direction: SortDirection
}

export default function RankingTableClient({ type, initialData }: RankingTableClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortState, setSortState] = useState<SortState>({
    column: "rank",
    direction: "asc",
  })
  const [selectedTerrains, setSelectedTerrains] = useState<TerrainType[]>([...terrainTypes])
  const { convertLength, convertDepth } = useMeasurement()

  // Filter data based on search term and selected terrain types
  const filteredData = initialData.filter((item) => {
    const searchLower = searchTerm.toLowerCase()

    // Different search logic based on ranking type
    if (type === "longest" || type === "deepest") {
      const caveData = item as Cave
      const matchesSearch =
        caveData.name.toLowerCase().includes(searchLower) ||
        caveData.country.toLowerCase().includes(searchLower) ||
        caveData.state?.toLowerCase().includes(searchLower) ||
        false ||
        caveData.massif?.toLowerCase().includes(searchLower) ||
        false ||
        caveData.terrain_type.toLowerCase().includes(searchLower)

      const matchesTerrain = selectedTerrains.includes(caveData.terrain_type as TerrainType)
      return matchesSearch && matchesTerrain
    } else if (type === "pits") {
      const pitData = item as Pit
      return pitData.cave.toLowerCase().includes(searchLower) || pitData.country.toLowerCase().includes(searchLower)
    } else if (type === "chambers") {
      const chamberData = item as Chamber
      return (
        chamberData.cave.toLowerCase().includes(searchLower) || chamberData.country.toLowerCase().includes(searchLower)
      )
    }

    return true
  })

  // Sort data based on sort state
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortState.column || sortState.direction === null) return 0

    const aValue = a[sortState.column as keyof typeof a]
    const bValue = b[sortState.column as keyof typeof b]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortState.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortState.direction === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  // Handle sort click
  const handleSort = (column: string) => {
    setSortState((prev) => {
      if (prev.column === column) {
        // Cycle through: asc -> desc -> null -> asc
        const nextDirection: SortDirection =
          prev.direction === "asc" ? "desc" : prev.direction === "desc" ? null : "asc"

        return {
          column: nextDirection === null ? null : column,
          direction: nextDirection,
        }
      }

      // New column, start with asc
      return {
        column,
        direction: "asc",
      }
    })
  }

  // Format length with commas and units - handle null/undefined values
  const formatLength = (meters: number | null | undefined) => {
    if (meters == null) return "N/A"
    const { value, unit } = convertLength(meters)
    return `${value.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${unit}`
  }

  // Format date from updated_year and updated_month
  const formatDate = (year: number | null, month: string | null) => {
    if (!year) return "N/A"
    return `${month || ""} ${year}`
  }

  // Format depth with commas and units - handle null/undefined values
  const formatDepth = (meters: number | null | undefined) => {
    if (meters == null) return "N/A"
    const { value, unit } = convertDepth(meters)
    return `${value.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${unit}`
  }

  // Format area (m²) - handle null/undefined values
  const formatArea = (squareMeters: number | null | undefined) => {
    if (squareMeters == null) return "N/A"
    return `${squareMeters.toLocaleString()} m²`
  }

  // Format volume (m³) - handle null/undefined values
  const formatVolume = (cubicMeters: number | null | undefined) => {
    if (cubicMeters == null) return "N/A"
    return `${cubicMeters.toLocaleString()} m³`
  }

  // Render table based on ranking type
  const renderTable = () => {
    switch (type) {
      case "longest":
      case "deepest":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("rank")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-primary hover:text-accent"
                  >
                    #
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left text-primary hover:text-accent"
                  >
                    Name
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("country")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left text-primary hover:text-accent"
                  >
                    Country
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("state")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left text-primary hover:text-accent"
                  >
                    State/Province
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("massif")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left text-primary hover:text-accent"
                  >
                    Massif
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("length")}
                    className="flex items-center gap-1 p-0 h-auto font-medium justify-end ml-auto text-primary hover:text-accent"
                  >
                    Length
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("depth")}
                    className="flex items-center gap-1 p-0 h-auto font-medium justify-end ml-auto text-primary hover:text-accent"
                  >
                    Depth
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("entrances")}
                    className="flex items-center gap-1 p-0 h-auto font-medium justify-end ml-auto text-primary hover:text-accent"
                  >
                    Entrances
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("terrain_type")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left text-primary hover:text-accent"
                  >
                    Terrain Type
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Source</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("updated_year")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left text-primary hover:text-accent"
                  >
                    Updated
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length > 0 ? (
                sortedData.map((cave) => {
                  const caveData = cave as Cave
                  return (
                    <TableRow key={caveData.id}>
                      <TableCell className="font-medium">{caveData.rank}</TableCell>
                      <TableCell className="font-medium">
                        <Link href={`/caves/${caveData.id}`} className="text-accent hover:underline">
                          {caveData.name}
                        </Link>
                      </TableCell>
                      <TableCell>{caveData.country}</TableCell>
                      <TableCell>{caveData.state}</TableCell>
                      <TableCell>{caveData.massif}</TableCell>
                      <TableCell className="text-right">{formatLength(caveData.length)}</TableCell>
                      <TableCell className="text-right">{formatDepth(caveData.depth)}</TableCell>
                      <TableCell className="text-right">{caveData.entrances}</TableCell>
                      <TableCell>{caveData.terrain_type}</TableCell>
                      <TableCell>{caveData.source}</TableCell>
                      <TableCell>{formatDate(caveData.updated_year, caveData.updated_month)}</TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={11} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )
      case "pits":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("rank")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-primary hover:text-accent"
                  >
                    #
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("cave")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left text-primary hover:text-accent"
                  >
                    Cave
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("country")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left text-primary hover:text-accent"
                  >
                    Country
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("depth")}
                    className="flex items-center gap-1 p-0 h-auto font-medium justify-end ml-auto text-primary hover:text-accent"
                  >
                    Depth
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Source</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("updated_year")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left text-primary hover:text-accent"
                  >
                    Updated
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("free_fall")}
                    className="flex items-center gap-1 p-0 h-auto font-medium justify-center mx-auto text-primary hover:text-accent"
                  >
                    Free Fall
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length > 0 ? (
                sortedData.map((cave) => {
                  const pitData = cave as Pit
                  return (
                    <TableRow key={pitData.id}>
                      <TableCell className="font-medium">{pitData.rank}</TableCell>
                      <TableCell className="font-medium">{pitData.cave}</TableCell>
                      <TableCell>{pitData.country}</TableCell>
                      <TableCell className="text-right">{formatDepth(pitData.depth)}</TableCell>
                      <TableCell>{pitData.source}</TableCell>
                      <TableCell>{formatDate(pitData.updated_year, pitData.updated_month)}</TableCell>
                      <TableCell className="text-center">
                        {pitData.free_fall ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                            No
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )
      case "chambers":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("rank")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-primary hover:text-accent"
                  >
                    #
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("cave")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left text-primary hover:text-accent"
                  >
                    Cave
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("country")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left text-primary hover:text-accent"
                  >
                    Country
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("dimensions")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left text-primary hover:text-accent"
                  >
                    Dimensions
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("area")}
                    className="flex items-center gap-1 p-0 h-auto font-medium justify-end ml-auto text-primary hover:text-accent"
                  >
                    Area
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("volume")}
                    className="flex items-center gap-1 p-0 h-auto font-medium justify-end ml-auto text-primary hover:text-accent"
                  >
                    Volume
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Source</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("updated_year")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left text-primary hover:text-accent"
                  >
                    Updated
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length > 0 ? (
                sortedData.map((cave) => {
                  const chamberData = cave as Chamber
                  return (
                    <TableRow key={chamberData.id}>
                      <TableCell className="font-medium">{chamberData.rank}</TableCell>
                      <TableCell className="font-medium">{chamberData.cave}</TableCell>
                      <TableCell>{chamberData.country}</TableCell>
                      <TableCell>{chamberData.dimensions}</TableCell>
                      <TableCell className="text-right">{formatArea(chamberData.area)}</TableCell>
                      <TableCell className="text-right">{formatVolume(chamberData.volume)}</TableCell>
                      <TableCell>{chamberData.source}</TableCell>
                      <TableCell>{formatDate(chamberData.updated_year, chamberData.updated_month)}</TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search caves..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-primary/20 hover:border-primary/40">
            Filter
          </Button>
        </div>

        {/* Terrain Type Filter - only show for longest and deepest caves */}
        {(type === "longest" || type === "deepest") && (
          <TerrainFilter selectedTerrains={selectedTerrains} onChange={setSelectedTerrains} />
        )}
      </div>

      <div className="rounded-md border">{renderTable()}</div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {sortedData.length} of {initialData.length} caves
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled className="border-primary/20 hover:border-primary/40">
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled className="border-primary/20 hover:border-primary/40">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
