"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type MeasurementSystem = "metric" | "imperial"

interface MeasurementContextType {
  system: MeasurementSystem
  toggleSystem: () => void
  convertLength: (meters: number) => { value: number; unit: string }
  convertDepth: (meters: number) => { value: number; unit: string }
  displayText: string
}

const MeasurementContext = createContext<MeasurementContextType | undefined>(undefined)

export function MeasurementProvider({ children }: { children: ReactNode }) {
  const [system, setSystem] = useState<MeasurementSystem>("metric")
  const [displayText, setDisplayText] = useState("Metric")

  // Load preference from localStorage on mount
  useEffect(() => {
    const savedSystem = localStorage.getItem("measurementSystem") as MeasurementSystem
    if (savedSystem) {
      setSystem(savedSystem)
      setDisplayText(savedSystem === "metric" ? "Metric" : "Imperial")
    }
  }, [])

  // Save preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("measurementSystem", system)
  }, [system])

  const toggleSystem = () => {
    setSystem((prev) => {
      const newSystem = prev === "metric" ? "imperial" : "metric"
      setDisplayText(newSystem === "metric" ? "Metric" : "Imperial")
      return newSystem
    })
  }

  // Convert length from meters to the current system
  const convertLength = (meters: number) => {
    if (system === "imperial") {
      // Convert to feet (1 meter = 3.28084 feet)
      const feet = meters * 3.28084
      return { value: feet, unit: "ft" }
    }
    return { value: meters, unit: "m" }
  }

  // Convert depth from meters to the current system
  const convertDepth = (meters: number) => {
    // Using the same conversion as length for now
    return convertLength(meters)
  }

  return (
    <MeasurementContext.Provider value={{ system, toggleSystem, convertLength, convertDepth, displayText }}>
      {children}
    </MeasurementContext.Provider>
  )
}

export function useMeasurement() {
  const context = useContext(MeasurementContext)
  if (context === undefined) {
    throw new Error("useMeasurement must be used within a MeasurementProvider")
  }
  return context
}
