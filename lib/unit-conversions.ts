// Convert meters to feet
export function metersToFeet(meters: number): number {
  return meters * 3.28084
}

// Convert feet to meters
export function feetToMeters(feet: number): number {
  return feet / 3.28084
}

// Format a number with commas for thousands
export function formatNumber(num: number, decimals = 0): string {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

// Format a measurement with the appropriate unit
export function formatMeasurement(value: number, unit: string): string {
  return `${formatNumber(value)} ${unit}`
}
