import { DashboardData } from "@/lib/services/websocket-simulations/useDashboardWebSocketSimulation";

/**
 * Interface for a formatted performance metric ready for display
 */
export interface FormattedPerformanceMetric {
  label: string;
  value: number;
  unit: string;
  maxValue: number;
}

/**
 * Converts raw dashboard performance metrics into an array of formatted metric objects for UI display.
 *
 * @param dashboardData - The dashboard data containing performance metrics, or null/undefined if unavailable.
 * @returns An array of formatted performance metrics for CPU usage, memory usage, and API latency. Returns an empty array if no metrics are available.
 */
export function transformPerformanceMetrics(dashboardData?: DashboardData | null): FormattedPerformanceMetric[] {
  if (!dashboardData?.performanceMetrics) {
    return [];
  }
  
  return [
    {
      label: "CPU Usage",
      value: dashboardData.performanceMetrics.cpu,
      unit: "%",
      maxValue: 100
    },
    {
      label: "Memory Usage",
      value: dashboardData.performanceMetrics.memory,
      unit: "%",
      maxValue: 100
    },
    {
      label: "API Latency",
      value: dashboardData.performanceMetrics.latency,
      unit: " ms",
      maxValue: 500 // Assuming 500ms is the max acceptable latency
    }
  ];
}