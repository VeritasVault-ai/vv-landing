/**
 * Format a number as currency with advanced options
 */
export const formatCurrency = (
  value: number,
  options: {
    currency?: string
    locale?: string
    compact?: boolean
  } = {},
): string => {
  const { currency = "USD", locale = "en-US", compact = false } = options
  
  if (value === undefined || value === null) {
    return "$0.00"
  }
  
  if (compact && value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`
  }
  
  if (compact && value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`
  }
  
  if (compact && value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`
  }
  
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Format a number as percentage with advanced options
 */
export const formatPercentage = (
  value: number,
  options: {
    decimals?: number
    includeSign?: boolean
  } = {},
): string => {
  const { decimals = 2, includeSign = false } = options
  
  if (value === undefined || value === null) {
    return "0.00%"
  }
  
  const formattedValue = value.toFixed(decimals)
  
  if (includeSign && value > 0) {
    return `+${formattedValue}%`
  }
  
  return `${formattedValue}%`
}

/**
 * Format a date with various format options
 */
export const formatDate = (
  date: Date | string | number,
  options: {
    format?: "short" | "medium" | "long" | "full"
    includeTime?: boolean
    locale?: string
  } = {},
): string => {
  const { format = "medium", includeTime = false, locale = "en-US" } = options
  
  if (!date) {
    return ""
  }
  
  const dateObj = typeof date === "string" || typeof date === "number" ? new Date(date) : date
  
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return ""
  }
  
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: format === "short" ? "numeric" : format === "medium" ? "short" : "long",
    day: "numeric",
    hour: includeTime ? "2-digit" : undefined,
    minute: includeTime ? "2-digit" : undefined,
  }
  
  return new Intl.DateTimeFormat(locale, dateOptions).format(dateObj)
}

/**
 * Format a number with commas and options
 */
export const formatNumber = (
  value: number,
  options: {
    decimals?: number
    compact?: boolean
    locale?: string
  } = {},
): string => {
  const { decimals = 0, compact = false, locale = "en-US" } = options
  
  if (value === undefined || value === null) {
    return "0"
  }
  
  if (compact && value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(decimals)}B`
  }
  
  if (compact && value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(decimals)}M`
  }
  
  if (compact && value >= 1_000) {
    return `${(value / 1_000).toFixed(decimals)}K`
  }
  
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/**
 * Format a file size
 */
export const formatFileSize = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let size = bytes
  let unitIndex = 0
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`
}

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) {
    return text || ""
  }
  
  return `${text.substring(0, maxLength)}...`
}

/**
 * Format a blockchain address
 */
export const formatAddress = (address: string, startChars = 6, endChars = 4): string => {
  if (!address || address.length < startChars + endChars + 3) {
    return address || ""
  }
  
  return `${address.substring(0, startChars)}...${address.substring(address.length - endChars)}`
}

/**
 * Format a duration in milliseconds to a human-readable string
 */
export const formatDuration = (
  milliseconds: number,
  options: {
    format?: "short" | "long"
    maxUnits?: number
  } = {},
): string => {
  const { format = "long", maxUnits = 2 } = options
  
  if (!milliseconds || milliseconds <= 0) {
    return format === "short" ? "0s" : "0 seconds"
  }
  
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  const units = [
    { value: days, long: "day", short: "d" },
    { value: hours % 24, long: "hour", short: "h" },
    { value: minutes % 60, long: "minute", short: "m" },
    { value: seconds % 60, long: "second", short: "s" },
  ].filter((unit) => unit.value > 0)
  
  if (units.length === 0) {
    return format === "short" ? "0s" : "0 seconds"
  }
  
  const limitedUnits = units.slice(0, maxUnits)
  
  return limitedUnits
    .map((unit) => {
      const label = format === "short" ? unit.short : `${unit.long}${unit.value !== 1 ? "s" : ""}`
      return `${unit.value} ${label}`
    })
    .join(format === "short" ? " " : ", ")
}