import { Protocol, ChartData } from "../protocol-allocation.types";

// Threshold for grouping small protocols into "Others"
export const SMALL_PROTOCOL_THRESHOLD = 0.03; // 3%
export const MIN_ANGLE = 2; // Minimum angle for pie slices

/**
 * Process chart data to group small protocols into an "Others" category
 * @param data Original protocol data
 * @returns Processed data with small protocols grouped
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
 * Format currency values for display
 * @param value The value to format
 * @returns Formatted currency string
 */
export function formatCurrency(value: string | number): string {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  return `$${numericValue.toLocaleString()}`;
}

/**
 * Format percentage values for display
 * @param value The percentage value
 * @returns Formatted percentage string
 */
export function formatPercentage(value: string | number): string {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  return `${numericValue.toFixed(1)}%`;
}