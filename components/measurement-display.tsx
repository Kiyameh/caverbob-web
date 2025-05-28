"use client"

import { useMeasurement } from "@/contexts/measurement-context"

interface MeasurementDisplayProps {
  meters: number | null | undefined
  type: "length" | "depth" | "area" | "volume"
  className?: string
}

export function MeasurementDisplay({ meters, type, className }: MeasurementDisplayProps) {
  const { convertLength, convertDepth } = useMeasurement()

  if (meters == null) {
    return <span className={className}>N/A</span>
  }

  // Handle different measurement types
  if (type === "length" || type === "depth") {
    const { value, unit } = type === "length" ? convertLength(meters) : convertDepth(meters)
    return (
      <span className={className}>
        {value.toLocaleString(undefined, { maximumFractionDigits: 0 })} {unit}
      </span>
    )
  }

  // For area and volume, we're not converting yet, but keeping the structure for future implementation
  if (type === "area") {
    return <span className={className}>{meters.toLocaleString()} m²</span>
  }

  if (type === "volume") {
    return <span className={className}>{meters.toLocaleString()} m³</span>
  }

  return <span className={className}>{meters.toLocaleString()}</span>
}
