"use client"

import { AllocationChart } from "@/components/allocation-chart"
import { cn } from "@/lib/utils"
import styles from "./allocation-section.module.css"
import { AssetAllocation, DEFAULT_ALLOCATIONS } from "@/mocks/data/allocations"
import { useAllocationWebSocketSimulation } from "@/lib/services/websocket-simulations/useAllocationWebsocketSimulation"
import { useEffect, useState } from "react"
interface AllocationSectionProps {
  className?: string;
  allocations?: AssetAllocation[];
  enableRealtime?: boolean;
}

/**
 * Transforms asset allocation data for the chart component
 */
const transformAllocationsForChart = (allocations: AssetAllocation[]) => {
  return allocations.map(a => ({
    name: a.symbol,
    value: a.weight,
    color: a.color
  }));
};

/**
 * Renders a section displaying asset allocation data as both a table and a chart, with optional real-time updates.
 *
 * Shows each asset's symbol and weight in a table alongside a chart visualization. When real-time updates are enabled, the component subscribes to simulated WebSocket data and displays a live status indicator with the last update time.
 *
 * @param allocations - Optional initial asset allocation data. Defaults to {@link DEFAULT_ALLOCATIONS}.
 * @param className - Optional additional CSS class names for the container.
 * @param enableRealtime - If true, enables real-time updates via WebSocket simulation.
 */
export function AllocationSection({ 
  allocations = DEFAULT_ALLOCATIONS, 
  className,
  enableRealtime = false
}: AllocationSectionProps) {
  const [currentAllocations, setCurrentAllocations] = useState(allocations);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  
  // Initialize WebSocket simulation if real-time updates are enabled
  const { data: wsData, isSimulated } = useAllocationWebSocketSimulation(
    enableRealtime ? (status) => console.log(`Allocation WebSocket status: ${status}`) : undefined
  );
  
  // Update allocations when WebSocket data changes
  useEffect(() => {
    if (enableRealtime && wsData) {
      setCurrentAllocations(wsData.allocations);
      setLastUpdated(wsData.timestamp);
    }
  }, [wsData, enableRealtime]);
  
  // Transform the data once
  const chartData = transformAllocationsForChart(currentAllocations);
  
  return (
    <div className={cn(styles.container, className)}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={styles.title}>Allocations</h2>
        {enableRealtime && isSimulated && (
          <div className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            <span className="text-xs text-slate-400">
              {lastUpdated ? `Updated: ${new Date(lastUpdated).toLocaleTimeString()}` : 'Live'}
            </span>
          </div>
        )}
      </div>
      
      <div className={styles.flexContainer}>
        {/* Table section */}
        <div className={styles.tableSection}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Asset</th>
                  <th className={styles.tableHeaderRight}>Weight</th>
                </tr>
              </thead>
              <tbody>
                {currentAllocations.map((allocation) => (
                  <tr key={allocation.symbol}>
                    <td className={styles.tableCell}>{allocation.symbol}</td>
                    <td className={styles.tableCellRight}>{allocation.weight.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Chart section */}
        <div className={styles.chartSection}>
          <div className={styles.chartContainer}>
            <AllocationChart initialData={chartData} />
          </div>
        </div>
      </div>
    </div>
  )
}