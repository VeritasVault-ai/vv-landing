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
 * Transforms raw performance metrics from the API into a format suitable for UI components
 * 
 * @param dashboardData The raw dashboard data from API/WebSocket
 * @returns An array of formatted performance metrics
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