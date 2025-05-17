import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useHistoricalData } from "../../hooks/use-historical-data";

interface PerformanceHeatmapProps {
  strategyId: string;
}

/**
 * Performance Heatmap Component
 * Displays monthly performance data in a calendar heatmap format
 */
export function PerformanceHeatmap({ strategyId }: PerformanceHeatmapProps) {
  const [timeframe, setTimeframe] = useState<string>('5y');
  const [selectedMetric, setSelectedMetric] = useState<'return' | 'value' | 'drawdown'>('return');
  const { data } = useHistoricalData(strategyId, timeframe);
  
  // Group data by year and month for the heatmap
  const groupedData = data ? groupDataByYearMonth(data) : {};
  const years = Object.keys(groupedData).sort().reverse();
  
  // Get color for a cell based on value
  const getCellColor = (value: number | undefined, metric: 'return' | 'value' | 'drawdown') => {
    if (value === undefined) return 'bg-secondary';
    
    if (metric === 'return' || metric === 'value') {
      if (value > 5) return 'bg-green-700';
      if (value > 3) return 'bg-green-600';
      if (value > 1) return 'bg-green-500';
      if (value > 0) return 'bg-green-400';
      if (value > -1) return 'bg-red-400';
      if (value > -3) return 'bg-red-500';
      if (value > -5) return 'bg-red-600';
      return 'bg-red-700';
    } else { // drawdown
      if (value === 0) return 'bg-green-500';
      if (value > -5) return 'bg-yellow-400';
      if (value > -10) return 'bg-yellow-500';
      if (value > -15) return 'bg-orange-500';
      if (value > -20) return 'bg-red-500';
      return 'bg-red-700';
    }
  };

  // Format value for display
  const formatValue = (value: number | undefined) => {
    if (value === undefined) return '-';
    return value.toFixed(1) + '%';
  };
  
  // Month names for header
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg font-medium">Performance Heatmap</h3>
        <div className="flex items-center space-x-2">
          <Select value={selectedMetric} onValueChange={(value: 'return' | 'value' | 'drawdown') => setSelectedMetric(value)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="return">Monthly Returns</SelectItem>
              <SelectItem value="value">Value Change</SelectItem>
              <SelectItem value="drawdown">Drawdowns</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1y">1 Year</SelectItem>
              <SelectItem value="3y">3 Years</SelectItem>
              <SelectItem value="5y">5 Years</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="p-4 border-b bg-muted/50">
          <div className="grid grid-cols-13 gap-1">
            <div className="col-span-1"></div>
            {monthNames.map((month, i) => (
              <div key={month} className="text-xs font-medium text-center">
                {month}
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4">
          {years.length > 0 ? (
            <div className="space-y-1">
              {years.map((year) => (
                <React.Fragment key={year}>
                  <div className="grid grid-cols-13 gap-1">
                    <div className="text-xs font-medium flex items-center">{year}</div>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
                      const monthData = groupedData[year]?.[month];
                      const value = monthData ? monthData[selectedMetric] : undefined;
                      
                      return (
                        <div
                          key={`${year}-${month}`}
                          className={`aspect-square rounded-sm ${getCellColor(value, selectedMetric)} flex items-center justify-center text-[10px] text-white font-medium`}
                          title={`${monthNames[month-1]} ${year}: ${formatValue(value)}`}
                        >
                          {value !== undefined && value.toFixed(1)}
                        </div>
                      );
                    })}
                  </div>
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center">
              <p className="text-muted-foreground">No data available for the selected timeframe</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground">
        <p>The heatmap shows {selectedMetric === 'return' ? 'monthly returns' : selectedMetric === 'value' ? 'value changes' : 'drawdowns'} over time. Darker colors indicate stronger performance.</p>
      </div>
    </div>
  );
}

// Helper function to group data by year and month
function groupDataByYearMonth(data: any[]) {
  const result: Record<string, Record<number, { return: number; value: number; drawdown: number }>> = {};
  
  data.forEach(item => {
    const date = new Date(item.date);
    const year = date.getFullYear().toString();
    const month = date.getMonth() + 1; // 1-12
    
    if (!result[year]) {
      result[year] = {};
    }
    
    result[year][month] = {
      return: item.return,
      value: item.value,
      drawdown: item.drawdown
    };
  });
  
  return result;
}