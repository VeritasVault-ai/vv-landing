import { ChartData, Protocol } from "../protocol-allocation.types";

// Threshold for grouping small protocols into "Others"
export const SMALL_PROTOCOL_THRESHOLD = 0.03; // 3%
export const MIN_ANGLE = 2; // Minimum angle for pie slices

/**
 * Groups protocols with a small share of total value into an "Others" category for chart display.
 *
 * Protocols whose total value locked is less than 3% of the overall total are aggregated into a single "Others" entry if there are more than 10 protocols. Returns the processed list suitable for charting, including the "Others" group if applicable.
 *
 * @param data - Array of protocol data to process.
 * @returns An array of chart data objects with small protocols grouped under "Others" when appropriate.
 */
export function processChartData(data: Protocol[]): ChartData[] {
  if (!data || data.length === 0) return [];
  
  // If we have 10 or fewer protocols, no need to group
  if (data.length <= 10) return data;
  
  const mainProtocols: ChartData[] = [];
  let othersValue = 0;
  let othersCount = 0;
  
  // Calculate total value for percentage calculation
  const totalValue = data.reduce((sum: number, protocol: Protocol) => 
    sum + (parseFloat(protocol.totalValueLockedUSD) || 0), 0);
  
  // Separate protocols into main and others
  data.forEach((protocol: Protocol) => {
    const value = parseFloat(protocol.totalValueLockedUSD) || 0;
    const percentage = totalValue > 0 ? (value / totalValue) : 0;
    
    if (percentage >= SMALL_PROTOCOL_THRESHOLD) {
      mainProtocols.push(protocol);
    } else {
      othersValue += value;
      othersCount++;
    }
  });
  
  // If we have protocols to group, add an "Others" entry
  if (othersCount > 0) {
    mainProtocols.push({
      name: `Others (${othersCount} protocols)`,
      totalValueLockedUSD: othersValue.toString(),
      percentage: ((othersValue / totalValue) * 100).toFixed(1),
      color: "#718096" // Slate color for "Others"
    });
  }
  
  return mainProtocols;
}

/**
 * Formats a numeric or string value as a US dollar currency string with localized thousands separators.
 *
 * @param value - The currency amount to format.
 * @returns The formatted currency string prefixed with a dollar sign.
 */
export function formatCurrency(value: string | number): string {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  return `$${numericValue.toLocaleString()}`;
}

/**
 * Formats a numeric or string value as a percentage with one decimal place.
 *
 * @param value - The value to format as a percentage.
 * @returns The formatted percentage string (e.g., "12.3%").
 */
export function formatPercentage(value: string | number): string {
  const numericValue = typeof value === 'string' ? parseFloat(value) || 0 : (value || 0);  
  return `${numericValue.toFixed(1)}%`;
}