import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useHistoricalData } from "../../../hooks/use-historical-data";

interface PerformanceHeatmapProps {
  strategyId: string;
  timeframe: string;
}

/**
 * Performance Heatmap Component
 * Displays a heatmap visualization of historical performance data by month and year
 */
export function PerformanceHeatmap({ strategyId, timeframe }: PerformanceHeatmapProps) {
  const { data } = useHistoricalData(strategyId, timeframe);
  const [selectedMetric, setSelectedMetric] = useState<'return' | 'value' | 'drawdown'>('return');
  
  // Group data by year and month for the heatmap
  const groupedData = data ? groupDataByYearMonth(data) : {};
  
  // Generate color for heatmap cell based on value
  const getColor = (value: number) => {
    if (selectedMetric === 'drawdown') {
      // Red gradient for drawdowns (negative is worse)
      const intensity = Math.min(Math.abs(value) * 10, 100);
      return `rgba(239, 68, 68, ${intensity / 100})`;
    } else {
      // Green gradient for positive values, red for negative
      if (value >= 0) {
        const intensity = Math.min(value * 10, 100);
        return `rgba(34, 197, 94, ${intensity / 100})`;
      } else {
        const intensity = Math.min(Math.abs(value) * 10, 100);
        return `rgba(239, 68, 68, ${intensity / 100})`;
      }
    }
  };

  // If no data, show loading message
  if (!data) {
    return (
      <div className="h-60 flex items-center justify-center">
        <p className="text-muted-foreground">Loading heatmap data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Monthly Performance Heatmap</h3>
        <div className="flex space-x-2">
          <button 
            className={`px-2 py-1 text-xs rounded ${selectedMetric === 'return' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
            onClick={() => setSelectedMetric('return')}
          >
            Returns
          </button>
          <button 
            className={`px-2 py-1 text-xs rounded ${selectedMetric === 'value' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
            onClick={() => setSelectedMetric('value')}
          >
            Value
          </button>
          <button 
            className={`px-2 py-1 text-xs rounded ${selectedMetric === 'drawdown' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
            onClick={() => setSelectedMetric('drawdown')}
          >
            Drawdown
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {Object.keys(groupedData).length > 0 ? (
            <div className="grid grid-cols-[auto_repeat(12,1fr)] gap-1">
              {/* Header row with month names */}
              <div className="text-xs font-medium text-muted-foreground">Year</div>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                <div key={month} className="text-xs font-medium text-center text-muted-foreground">
                  {month}
                </div>
              ))}
              
              {/* Data rows by year */}
              {Object.keys(groupedData).sort().map((year) => (
                <React.Fragment key={year}>
                  <div className="text-xs font-medium">{year}</div>
                  {Array.from({ length: 12 }, (_, i) => {
                    const month = i + 1;
                    const monthData = groupedData[year][month];
                    
                    return (
                      <div 
                        key={`${year}-${month}`} 
                        className="h-8 rounded"
                        style={{ 
                          backgroundColor: monthData ? getColor(monthData[selectedMetric]) : 'transparent',
                          border: monthData ? '1px solid rgba(0,0,0,0.1)' : '1px dashed rgba(0,0,0,0.05)'
                        }}
                        title={monthData ? `${year}-${month.toString().padStart(2, '0')}: ${monthData[selectedMetric].toFixed(2)}%` : 'No data'}
                      >
                        {monthData && (
                          <div className="h-full w-full flex items-center justify-center text-xs font-medium">
                            {monthData[selectedMetric].toFixed(1)}
                          </div>
                        )}
                      </div>
                    );
                  })}
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