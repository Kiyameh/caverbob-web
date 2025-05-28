"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowUpDown } from "lucide-react"
import { useMeasurement } from "@/contexts/measurement-context"
import { TerrainFilter, terrainTypes, type TerrainType } from "@/components/terrain-filter"

// Define the types
interface RankingTableProps {
  type: "longest" | "deepest" | "pits" | "chambers"
}

interface SortState {
  column: string | null
  direction: SortDirection
}

type SortDirection = "asc" | "desc" | null

// Mock data for longest caves
const mockLongestCavesData = [
  {
    id: 1,
    rank: 1,
    name: "Mammoth Cave System",
    country: "United States",
    state: "Kentucky",
    massif: "Flint Ridge",
    length: 676000,
    depth: 124,
    entrances: 27,
    terrainType: "Limestone",
    source: "Cave Research Foundation",
    lastUpdated: "2023-05-15",
  },
  {
    id: 2,
    rank: 2,
    name: "Sistema Sac Actun/Sistema Dos Ojos",
    country: "Mexico",
    state: "Quintana Roo",
    massif: "Yucatan Peninsula",
    length: 372000,
    depth: 119,
    entrances: 223,
    terrainType: "Limestone",
    source: "QRSS",
    lastUpdated: "2023-02-10",
  },
  {
    id: 3,
    rank: 3,
    name: "Jewel Cave",
    country: "United States",
    state: "South Dakota",
    massif: "Black Hills",
    length: 338000,
    depth: 193,
    entrances: 2,
    terrainType: "Limestone",
    source: "National Park Service",
    lastUpdated: "2023-01-20",
  },
  {
    id: 4,
    rank: 4,
    name: "Sistema Ox Bel Ha",
    country: "Mexico",
    state: "Quintana Roo",
    massif: "Yucatan Peninsula",
    length: 270000,
    depth: 33,
    entrances: 143,
    terrainType: "Underwater",
    source: "QRSS",
    lastUpdated: "2022-11-05",
  },
  {
    id: 5,
    rank: 5,
    name: "Wind Cave",
    country: "United States",
    state: "South Dakota",
    massif: "Black Hills",
    length: 258000,
    depth: 193,
    entrances: 1,
    terrainType: "Limestone",
    source: "National Park Service",
    lastUpdated: "2023-03-12",
  },
  {
    id: 6,
    rank: 6,
    name: "Sistema Huautla",
    country: "Mexico",
    state: "Oaxaca",
    massif: "Sierra Mazateca",
    length: 85000,
    depth: 1560,
    entrances: 20,
    terrainType: "Limestone",
    source: "PESH",
    lastUpdated: "2022-08-30",
  },
  {
    id: 7,
    rank: 7,
    name: "Fisher Ridge Cave System",
    country: "United States",
    state: "Kentucky",
    massif: "Mammoth Cave Plateau",
    length: 233000,
    depth: 100,
    entrances: 1,
    terrainType: "Limestone",
    source: "Cave Research Foundation",
    lastUpdated: "2022-12-18",
  },
  {
    id: 8,
    rank: 8,
    name: "Optimisticeskaja",
    country: "Ukraine",
    state: "Podolia",
    massif: "Podolian Upland",
    length: 230000,
    depth: 20,
    entrances: 1,
    terrainType: "Gypsum",
    source: "Ukrainian Speleological Association",
    lastUpdated: "2021-09-05",
  },
  {
    id: 9,
    rank: 9,
    name: "Lechuguilla Cave",
    country: "United States",
    state: "New Mexico",
    massif: "Guadalupe Mountains",
    length: 222000,
    depth: 489,
    entrances: 1,
    terrainType: "Limestone",
    source: "National Park Service",
    lastUpdated: "2023-04-22",
  },
  {
    id: 10,
    rank: 10,
    name: "Sistema Purificación",
    country: "Mexico",
    state: "Tamaulipas",
    massif: "Sierra Madre Oriental",
    length: 194000,
    depth: 953,
    entrances: 20,
    terrainType: "Limestone",
    source: "AMCS",
    lastUpdated: "2022-07-15",
  },
]

// Mock data for deepest caves
const mockDeepestCavesData = [
  {
    id: 1,
    rank: 1,
    name: "Veryovkina Cave",
    country: "Georgia",
    state: "Abkhazia",
    massif: "Arabika Massif",
    length: 13500,
    depth: 2212,
    entrances: 1,
    terrainType: "Limestone",
    source: "Ukrainian Speleological Association",
    lastUpdated: "2023-01-15",
  },
  {
    id: 2,
    rank: 2,
    name: "Krubera Cave (Voronja Cave)",
    country: "Georgia",
    state: "Abkhazia",
    massif: "Arabika Massif",
    length: 16058,
    depth: 2197,
    entrances: 2,
    terrainType: "Limestone",
    source: "Ukrainian Speleological Association",
    lastUpdated: "2022-11-20",
  },
  {
    id: 3,
    rank: 3,
    name: "Sarma",
    country: "Georgia",
    state: "Abkhazia",
    massif: "Arabika Massif",
    length: 6370,
    depth: 1830,
    entrances: 1,
    terrainType: "Limestone",
    source: "Speleological Association",
    lastUpdated: "2022-09-05",
  },
  {
    id: 4,
    rank: 4,
    name: "Lamprechtsofen",
    country: "Austria",
    state: "Salzburg",
    massif: "Leoganger Steinberge",
    length: 60000,
    depth: 1735,
    entrances: 20,
    terrainType: "Limestone",
    source: "Austrian Speleological Association",
    lastUpdated: "2022-08-12",
  },
  {
    id: 5,
    rank: 5,
    name: "Illyuzia-Mezhonnogo-Snezhnaya System",
    country: "Georgia",
    state: "Abkhazia",
    massif: "Bzybsky Massif",
    length: 24080,
    depth: 1753,
    entrances: 4,
    terrainType: "Limestone",
    source: "Ukrainian Speleological Association",
    lastUpdated: "2022-07-30",
  },
  {
    id: 6,
    rank: 6,
    name: "Sistema Huautla",
    country: "Mexico",
    state: "Oaxaca",
    massif: "Sierra Mazateca",
    length: 85000,
    depth: 1560,
    entrances: 20,
    terrainType: "Limestone",
    source: "PESH",
    lastUpdated: "2022-08-30",
  },
  {
    id: 7,
    rank: 7,
    name: "Torca del Cerro del Cuevón (T.33) - Torca de las Saxifragas",
    country: "Spain",
    state: "Asturias",
    massif: "Picos de Europa",
    length: 6800,
    depth: 1589,
    entrances: 2,
    terrainType: "Limestone",
    source: "Spanish Speleological Federation",
    lastUpdated: "2022-06-15",
  },
  {
    id: 8,
    rank: 8,
    name: "Sima de la Cornisa - Torca Magali",
    country: "Spain",
    state: "Asturias",
    massif: "Picos de Europa",
    length: 8000,
    depth: 1507,
    entrances: 2,
    terrainType: "Limestone",
    source: "Spanish Speleological Federation",
    lastUpdated: "2022-05-20",
  },
  {
    id: 9,
    rank: 9,
    name: "Cehi 2",
    country: "Slovenia",
    state: "Julian Alps",
    massif: "Kanin Massif",
    length: 5536,
    depth: 1505,
    entrances: 1,
    terrainType: "Limestone",
    source: "Slovenian Speleological Association",
    lastUpdated: "2022-04-10",
  },
  {
    id: 10,
    rank: 10,
    name: "Gouffre Mirolda / Lucien Bouclier",
    country: "France",
    state: "Haute-Savoie",
    massif: "Samoëns",
    length: 13000,
    depth: 1495,
    entrances: 3,
    terrainType: "Limestone",
    source: "French Speleological Federation",
    lastUpdated: "2022-03-25",
  },
]

// Mock data for deep pits
const mockDeepPitsData = [
  {
    id: 1,
    rank: 1,
    cave: "Vrtoglavica",
    country: "Slovenia",
    depth: 603,
    source: "Slovenian Speleological Association",
    lastUpdated: "2022-05-10",
    freeFall: true,
  },
  {
    id: 2,
    rank: 2,
    cave: "Patkov Gušt",
    country: "Croatia",
    depth: 553,
    source: "Croatian Speleological Federation",
    lastUpdated: "2022-03-15",
    freeFall: true,
  },
  {
    id: 3,
    rank: 3,
    cave: "Brezno pod velbom",
    country: "Slovenia",
    depth: 501,
    source: "Slovenian Speleological Association",
    lastUpdated: "2021-11-20",
    freeFall: false,
  },
  {
    id: 4,
    rank: 4,
    cave: "Minye",
    country: "Papua New Guinea",
    depth: 417,
    source: "Australian Speleological Federation",
    lastUpdated: "2021-09-05",
    freeFall: false,
  },
  {
    id: 5,
    rank: 5,
    cave: "Pozzo del Merro",
    country: "Italy",
    depth: 392,
    source: "Italian Speleological Society",
    lastUpdated: "2022-01-30",
    freeFall: false,
  },
  {
    id: 6,
    rank: 6,
    cave: "Sotano de las Golondrinas",
    country: "Mexico",
    depth: 376,
    source: "AMCS",
    lastUpdated: "2022-02-18",
    freeFall: true,
  },
  {
    id: 7,
    rank: 7,
    cave: "Sotano de El Barro (Sotano de Rancho El Barro)",
    country: "Mexico",
    depth: 364,
    source: "AMCS",
    lastUpdated: "2021-12-10",
    freeFall: true,
  },
  {
    id: 8,
    rank: 8,
    cave: "Provatina",
    country: "Greece",
    depth: 315,
    source: "Hellenic Speleological Society",
    lastUpdated: "2021-10-25",
    freeFall: false,
  },
  {
    id: 9,
    rank: 9,
    cave: "Sotano de Tomasa Kiahua",
    country: "Mexico",
    depth: 330,
    source: "AMCS",
    lastUpdated: "2022-04-05",
    freeFall: true,
  },
  {
    id: 10,
    rank: 10,
    cave: "Nare",
    country: "Papua New Guinea",
    depth: 310,
    source: "Australian Speleological Federation",
    lastUpdated: "2021-08-15",
    freeFall: false,
  },
]

// Mock data for largest chambers
const mockLargestChambersData = [
  {
    id: 1,
    rank: 1,
    cave: "Sarawak Chamber (Gua Nasib Bagus)",
    country: "Malaysia",
    dimensions: "700 x 400 x 70 m",
    area: 167000,
    volume: 12000000,
    source: "Sarawak Chamber Project",
    lastUpdated: "2022-06-20",
  },
  {
    id: 2,
    rank: 2,
    cave: "Miao Room (Gebihe Cave System)",
    country: "China",
    dimensions: "852 x 191 x 118 m",
    area: 154500,
    volume: 10780000,
    source: "China Cave Exploration Team",
    lastUpdated: "2022-04-15",
  },
  {
    id: 3,
    rank: 3,
    cave: "Cloud Ladder Hall (Tian Xing)",
    country: "China",
    dimensions: "250 x 250 x 350 m",
    area: 51000,
    volume: 6000000,
    source: "China Cave Exploration Team",
    lastUpdated: "2022-02-10",
  },
  {
    id: 4,
    rank: 4,
    cave: "Belize Chamber (Actun Chek)",
    country: "Belize",
    dimensions: "300 x 170 x 90 m",
    area: 50000,
    volume: 4500000,
    source: "Belize Speleological Survey",
    lastUpdated: "2021-12-05",
  },
  {
    id: 5,
    rank: 5,
    cave: "La Verna (Pierre Saint-Martin)",
    country: "France",
    dimensions: "245 x 185 x 194 m",
    area: 45000,
    volume: 3900000,
    source: "French Speleological Federation",
    lastUpdated: "2022-01-18",
  },
  {
    id: 6,
    rank: 6,
    cave: "Majlis Al Jinn (Khoshilat Maqandeli)",
    country: "Oman",
    dimensions: "310 x 225 x 120 m",
    area: 58000,
    volume: 3600000,
    source: "Oman Cave Exploration Team",
    lastUpdated: "2022-03-25",
  },
  {
    id: 7,
    rank: 7,
    cave: "Hong Meigui Chamber (Donghe Tiankeng)",
    country: "China",
    dimensions: "250 x 150 x 170 m",
    area: 35500,
    volume: 3150000,
    source: "China Cave Exploration Team",
    lastUpdated: "2021-11-12",
  },
  {
    id: 8,
    rank: 8,
    cave: "Salle des Treize (Gouffre Berger)",
    country: "France",
    dimensions: "210 x 140 x 115 m",
    area: 30000,
    volume: 3000000,
    source: "French Speleological Federation",
    lastUpdated: "2021-10-08",
  },
  {
    id: 9,
    rank: 9,
    cave: "Salle de la Verna (Pierre Saint-Martin)",
    country: "France",
    dimensions: "230 x 180 x 80 m",
    area: 41400,
    volume: 2700000,
    source: "French Speleological Federation",
    lastUpdated: "2022-05-15",
  },
  {
    id: 10,
    rank: 10,
    cave: "Salle Aphanicé (Gouffre Pierre Saint-Martin)",
    country: "France",
    dimensions: "195 x 160 x 80 m",
    area: 31200,
    volume: 2500000,
    source: "French Speleological Federation",
    lastUpdated: "2021-09-20",
  },
]

// Update the RankingTable component to use the appropriate data based on type
export default function RankingTable({ type }: RankingTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortState, setSortState] = useState<SortState>({
    column: "rank",
    direction: "asc",
  })
  const [selectedTerrains, setSelectedTerrains] = useState<TerrainType[]>([...terrainTypes])
  const { convertLength, convertDepth } = useMeasurement()

  // Select the appropriate data based on the ranking type
  const rankingData = (() => {
    switch (type) {
      case "longest":
        return mockLongestCavesData
      case "deepest":
        return mockDeepestCavesData
      case "pits":
        return mockDeepPitsData
      case "chambers":
        return mockLargestChambersData
      default:
        return mockLongestCavesData
    }
  })()

  // Filter data based on search term and selected terrain types
  const filteredData = rankingData.filter((cave) => {
    const searchLower = searchTerm.toLowerCase()

    // Different search logic based on ranking type
    if (type === "longest" || type === "deepest") {
      const caveData = cave as (typeof mockLongestCavesData)[0]
      const matchesSearch =
        caveData.name.toLowerCase().includes(searchLower) ||
        caveData.country.toLowerCase().includes(searchLower) ||
        caveData.state.toLowerCase().includes(searchLower) ||
        caveData.massif.toLowerCase().includes(searchLower) ||
        caveData.terrainType.toLowerCase().includes(searchLower)

      const matchesTerrain = selectedTerrains.includes(caveData.terrainType as TerrainType)
      return matchesSearch && matchesTerrain
    } else if (type === "pits") {
      const pitData = cave as (typeof mockDeepPitsData)[0]
      return pitData.cave.toLowerCase().includes(searchLower) || pitData.country.toLowerCase().includes(searchLower)
    } else if (type === "chambers") {
      const chamberData = cave as (typeof mockLargestChambersData)[0]
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

  // Format length with commas and units
  const formatLength = (meters: number) => {
    const { value, unit } = convertLength(meters)
    return `${value.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${unit}`
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatDepth = (meters: number) => {
    const { value, unit } = convertDepth(meters)
    return `${value.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${unit}`
  }

  // Format area (m²)
  const formatArea = (squareMeters: number) => {
    return `${squareMeters.toLocaleString()} m²`
  }

  // Format volume (m³)
  const formatVolume = (cubicMeters: number) => {
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
                    className="flex items-center gap-1 p-0 h-auto font-medium"
                  >
                    #
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left"
                  >
                    Name
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("country")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left"
                  >
                    Country
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("state")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left"
                  >
                    State/Province
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("massif")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left"
                  >
                    Massif
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("length")}
                    className="flex items-center gap-1 p-0 h-auto font-medium justify-end ml-auto"
                  >
                    Length
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("depth")}
                    className="flex items-center gap-1 p-0 h-auto font-medium justify-end ml-auto"
                  >
                    Depth
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("entrances")}
                    className="flex items-center gap-1 p-0 h-auto font-medium justify-end ml-auto"
                  >
                    Entrances
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("terrainType")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left"
                  >
                    Terrain Type
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Source</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("lastUpdated")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left"
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
                  const caveData = cave as (typeof mockLongestCavesData)[0]
                  return (
                    <TableRow key={caveData.id}>
                      <TableCell className="font-medium">{caveData.rank}</TableCell>
                      <TableCell className="font-medium">{caveData.name}</TableCell>
                      <TableCell>{caveData.country}</TableCell>
                      <TableCell>{caveData.state}</TableCell>
                      <TableCell>{caveData.massif}</TableCell>
                      <TableCell className="text-right">{formatLength(caveData.length)}</TableCell>
                      <TableCell className="text-right">{formatDepth(caveData.depth)}</TableCell>
                      <TableCell className="text-right">{caveData.entrances}</TableCell>
                      <TableCell>{caveData.terrainType}</TableCell>
                      <TableCell>{caveData.source}</TableCell>
                      <TableCell>{formatDate(caveData.lastUpdated)}</TableCell>
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
                    className="flex items-center gap-1 p-0 h-auto font-medium"
                  >
                    #
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("cave")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left"
                  >
                    Cave
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("country")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left"
                  >
                    Country
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("depth")}
                    className="flex items-center gap-1 p-0 h-auto font-medium justify-end ml-auto"
                  >
                    Depth
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Source</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("lastUpdated")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left"
                  >
                    Updated
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("freeFall")}
                    className="flex items-center gap-1 p-0 h-auto font-medium justify-center mx-auto"
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
                  const pitData = cave as (typeof mockDeepPitsData)[0]
                  return (
                    <TableRow key={pitData.id}>
                      <TableCell className="font-medium">{pitData.rank}</TableCell>
                      <TableCell className="font-medium">{pitData.cave}</TableCell>
                      <TableCell>{pitData.country}</TableCell>
                      <TableCell className="text-right">{formatDepth(pitData.depth)}</TableCell>
                      <TableCell>{pitData.source}</TableCell>
                      <TableCell>{formatDate(pitData.lastUpdated)}</TableCell>
                      <TableCell className="text-center">
                        {pitData.freeFall ? (
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
                    className="flex items-center gap-1 p-0 h-auto font-medium"
                  >
                    #
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("cave")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left"
                  >
                    Cave
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("country")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left"
                  >
                    Country
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("dimensions")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left"
                  >
                    Dimensions
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("area")}
                    className="flex items-center gap-1 p-0 h-auto font-medium justify-end ml-auto"
                  >
                    Area
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("volume")}
                    className="flex items-center gap-1 p-0 h-auto font-medium justify-end ml-auto"
                  >
                    Volume
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Source</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("lastUpdated")}
                    className="flex items-center gap-1 p-0 h-auto font-medium text-left"
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
                  const chamberData = cave as (typeof mockLargestChambersData)[0]
                  return (
                    <TableRow key={chamberData.id}>
                      <TableCell className="font-medium">{chamberData.rank}</TableCell>
                      <TableCell className="font-medium">{chamberData.cave}</TableCell>
                      <TableCell>{chamberData.country}</TableCell>
                      <TableCell>{chamberData.dimensions}</TableCell>
                      <TableCell className="text-right">{formatArea(chamberData.area)}</TableCell>
                      <TableCell className="text-right">{formatVolume(chamberData.volume)}</TableCell>
                      <TableCell>{chamberData.source}</TableCell>
                      <TableCell>{formatDate(chamberData.lastUpdated)}</TableCell>
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
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search caves..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        {/* Terrain Type Filter - only show for longest and deepest caves */}
        {(type === "longest" || type === "deepest") && (
          <TerrainFilter selectedTerrains={selectedTerrains} onChange={setSelectedTerrains} />
        )}
      </div>

      <div className="rounded-md border">{renderTable()}</div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {sortedData.length} of {rankingData.length} caves
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
