"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { createProtocolAllocation } from "./protocol-allocation.factory";
import styles from "./protocol-allocation.module.css";
import { ProtocolAllocationSkeleton } from "./protocol-allocation.skeleton";
import { ChartData } from "./protocol-allocation.types";
import { ProtocolCard } from "./protocol-card";
import { ProtocolItem } from "./protocol-item";
import {
  formatCurrency,
  MIN_ANGLE,
  processChartData,
  SMALL_PROTOCOL_THRESHOLD
} from "./utils/chart-utils";
import { WarningBanner } from "./warning-banner";

/**
 * Renders an overview of protocol allocations, including total value locked,
 * distribution across protocols, and individual protocol details.
 *
 * Fetches protocol data from the API and displays it in a user-friendly format.
 * MSW will intercept the API request during development and testing.
 * If data loading fails, displays fallback data with a warning banner.
 *
 * @returns A React element displaying summary cards, a protocol distribution pie chart,
 * and protocol details, or loading and fallback UI as appropriate.
 */
export function ProtocolAllocation() {
  const { 
    loading, 
    data, 
    error, 
    usedFallback, 
    chartConfig, 
    totalValue 
  } = createProtocolAllocation();

  if (loading) {
    return <ProtocolAllocationSkeleton />;
  }

  // Validate data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <WarningBanner message="No protocol data available. Please try again later." />;
  }
  
  // Sort protocols by value for consistent display
  const sortedData = [...data].sort((a, b) => {
    const bValue = parseFloat(b.totalValueLockedUSD) || 0;
    const aValue = parseFloat(a.totalValueLockedUSD) || 0;
    return bValue - aValue;
  });

  // Get top 3 protocols for highlight cards
  const topProtocols = sortedData.slice(0, Math.min(3, sortedData.length));
  
  // Process data for the chart - group small protocols into "Others"
  const processedChartData = processChartData(sortedData);
  
  return (
    <div className={styles.container}>
      {usedFallback && error && (
        <WarningBanner message={`${error} This is simulated data for demonstration purposes.`} />
      )}

      <div className={styles.summaryGrid}>
        {/* Total Value Locked Card */}
        <Card>
          <CardHeader className={styles.pb2}>
            <CardDescription>Total Value Locked</CardDescription>
            <CardTitle className={styles.valueText}>
              {formatCurrency(totalValue)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={styles.smallText}>
              Across {data.length} protocols
            </p>
          </CardContent>
        </Card>

        {/* Top Protocol Cards */}
        {topProtocols.map((protocol, index) => (
          <ProtocolCard
            key={index}
            name={protocol.name}
            percentage={protocol.percentage}
            value={protocol.totalValueLockedUSD}
            color={protocol.color}
          />
        ))}
      </div>

      <div className={styles.detailsGrid}>
        {/* Protocol Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Protocol Distribution</CardTitle>
            <CardDescription>Allocation of funds across protocols</CardDescription>
          </CardHeader>
          <CardContent className={styles.chartContainer}>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={processedChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    minAngle={MIN_ANGLE}
                    fill="#8884d8"
                    dataKey="totalValueLockedUSD"
                    nameKey="name"
                    label={({ name, percent }: { name: string; percent: number }) => 
                      percent < SMALL_PROTOCOL_THRESHOLD 
                        ? '' 
                        : `${name}: ${(percent * 100).toFixed(1)}%`
                    }
                  >
                    {processedChartData.map((entry: ChartData, index: number) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: string) => formatCurrency(value)} 
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Protocol Details List */}
        <Card>
          <CardHeader>
            <CardTitle>Protocol Details</CardTitle>
            <CardDescription>Value locked in each protocol</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={styles.protocolsList}>
              {sortedData.map((protocol, index) => (
                <ProtocolItem key={index} protocol={protocol} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
