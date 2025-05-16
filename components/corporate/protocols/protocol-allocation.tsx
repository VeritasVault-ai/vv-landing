"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { ProtocolAllocationSkeleton } from "./protocol-allocation.skeleton";
import { createProtocolAllocation } from "./protocol-allocation.factory";

/**
 * Renders an overview of protocol allocations, including total value locked,
 * distribution across protocols, and individual protocol details.
 *
 * Fetches protocol data from the API and displays it in a user-friendly format.
 * If data loading fails, displays fallback data with a warning banner.
 * Shows loading placeholders while fetching.
 *
 * @returns A React element displaying summary cards, a protocol distribution pie chart,
 * and protocol details, or loading and fallback UI as appropriate.
 *
 * @remark If live data cannot be loaded, simulated fallback data is shown with a warning to the user.
 */
export function ProtocolAllocation() {
  const { 
    loading, 
    data, 
    error, 
    usedFallback, 
    chartConfig, 
    totalValue 
  } = createProtocolAllocation({ useFallback: true });

  if (loading) {
    return <ProtocolAllocationSkeleton />;
  }

  if (!data) {
    return null;
  }

  // Sort protocols by value for consistent display
  const sortedData = [...data].sort((a, b) => 
    parseFloat(b.totalValueLockedUSD) - parseFloat(a.totalValueLockedUSD)
  );

  // Get top 3 protocols for highlight cards
  const topProtocols = sortedData.slice(0, 3);
  
  return (
    <div className="space-y-6">
      {usedFallback && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-md mb-4">
          <p className="text-amber-800 dark:text-amber-200">
            {error} This is simulated data for demonstration purposes.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Value Locked Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Value Locked</CardDescription>
            <CardTitle className="text-3xl font-bold">
              ${totalValue.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Across {data.length} protocols
            </p>
          </CardContent>
        </Card>

        {/* Top Protocol Cards */}
        {topProtocols.map((protocol, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription>{protocol.name}</CardDescription>
              <CardTitle className="text-3xl font-bold">
                {protocol.percentage}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress 
                value={parseFloat(protocol.percentage)} 
                className="h-2" 
                style={{ backgroundColor: protocol.color + '40' }} // Add transparency
              />
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                ${parseFloat(protocol.totalValueLockedUSD).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Protocol Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Protocol Distribution</CardTitle>
            <CardDescription>Allocation of funds across protocols</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="totalValueLockedUSD"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: string) => `$${parseFloat(value).toLocaleString()}`} 
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
            <div className="space-y-4">
              {sortedData.map((protocol, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{protocol.name}</div>
                    <div className="text-sm text-slate-500">
                      {protocol.percentage}% of portfolio
                    </div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    style={{ backgroundColor: protocol.color + '20', color: protocol.color }}
                  >
                    ${parseFloat(protocol.totalValueLockedUSD).toLocaleString()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}