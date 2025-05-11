import { HIGH_PRIORITY_DIMENSIONS, MEDIUM_PRIORITY_DIMENSIONS } from "./custom-dimensions"

/**
 * Generates instructions for registering custom dimensions in Google Analytics 4
 */
export function generateRegistrationInstructions() {
  const highPriorityInstructions = Object.entries(HIGH_PRIORITY_DIMENSIONS).map(([key, value]) => ({
    displayName: formatDisplayName(key),
    parameterName: value,
    scope: "Event",
    priority: "High",
  }))

  const mediumPriorityInstructions = Object.entries(MEDIUM_PRIORITY_DIMENSIONS).map(([key, value]) => ({
    displayName: formatDisplayName(key),
    parameterName: value,
    scope: "Event",
    priority: "Medium",
  }))

  return {
    highPriorityInstructions,
    mediumPriorityInstructions,
  }
}

/**
 * Formats a constant name into a display name
 * Example: LOGIN_METHOD_SUCCESS -> Login Method Success
 */
function formatDisplayName(constantName: string): string {
  return constantName
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}
