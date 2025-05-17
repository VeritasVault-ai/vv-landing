import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHistoricalData } from "../../hooks/use-historical-data";

interface PerformanceMetricsProps {
  strategyId: string;
}

/**
 * Performance Metrics Component
 * Displays detailed performance metrics and analytics for the strategy
 */
export function PerformanceMetrics({ strategyId }: PerformanceMetricsProps) {
  const [timeframe, setTimeframe] = useState<string>('1y');
  const { data } = useHistoricalData(strategyId, timeframe);
  
  // Calculate performance metrics from historical data
  const metrics = calculateMetrics(data);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Performance Analytics</h3>
        <div className="flex space-x-1">
          <button 
            className={`px-3 py-1 text-sm rounded ${timeframe === '1m' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
            onClick={() => setTimeframe('1m')}
          >
            1M
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded ${timeframe === '3m' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
            onClick={() => setTimeframe('3m')}
          >
            3M
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded ${timeframe === '6m' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
            onClick={() => setTimeframe('6m')}
          >
            6M
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded ${timeframe === '1y' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
            onClick={() => setTimeframe('1y')}
          >
            1Y
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded ${timeframe === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
            onClick={() => setTimeframe('all')}
          >
            All
          </button>
        </div>
      </div>
      
      <Tabs defaultValue="returns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="returns">Returns</TabsTrigger>
          <TabsTrigger value="risk">Risk Metrics</TabsTrigger>
          <TabsTrigger value="ratios">Performance Ratios</TabsTrigger>
          <TabsTrigger value="drawdowns">Drawdowns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="returns">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard 
                  title="Total Return" 
                  value={metrics.totalReturn} 
                  unit="%" 
                  description="Total return over the selected period"
                  isPositive={metrics.totalReturn > 0}
                />
                <MetricCard 
                  title="Annualized Return" 
                  value={metrics.annualizedReturn} 
                  unit="%" 
                  description="Return expressed as an annual percentage"
                  isPositive={metrics.annualizedReturn > 0}
                />
                <MetricCard 
                  title="Best Month" 
                  value={metrics.bestMonth} 
                  unit="%" 
                  description="Highest monthly return"
                  isPositive={true}
                />
                <MetricCard 
                  title="Worst Month" 
                  value={metrics.worstMonth} 
                  unit="%" 
                  description="Lowest monthly return"
                  isPositive={false}
                />
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Monthly Returns Distribution</h4>
                <div className="h-12 bg-secondary rounded-md overflow-hidden flex">
                  <div 
                    className="bg-red-500 h-full" 
                    style={{ width: `${metrics.negativeMonthsPercent}%` }}
                    title={`${metrics.negativeMonths} negative months (${metrics.negativeMonthsPercent.toFixed(1)}%)`}
                  />
                  <div 
                    className="bg-green-500 h-full" 
                    style={{ width: `${metrics.positiveMonthsPercent}%` }}
                    title={`${metrics.positiveMonths} positive months (${metrics.positiveMonthsPercent.toFixed(1)}%)`}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>{metrics.negativeMonths} negative months ({metrics.negativeMonthsPercent.toFixed(1)}%)</span>
                  <span>{metrics.positiveMonths} positive months ({metrics.positiveMonthsPercent.toFixed(1)}%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="risk">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard 
                  title="Volatility" 
                  value={metrics.volatility} 
                  unit="%" 
                  description="Standard deviation of returns (annualized)"
                  isNeutral={true}
                />
                <MetricCard 
                  title="Max Drawdown" 
                  value={metrics.maxDrawdown} 
                  unit="%" 
                  description="Largest peak-to-trough decline"
                  isPositive={false}
                />
                <MetricCard 
                  title="Downside Deviation" 
                  value={metrics.downsideDeviation} 
                  unit="%" 
                  description="Volatility of negative returns only"
                  isNeutral={true}
                />
                <MetricCard 
                  title="Value at Risk (95%)" 
                  value={metrics.valueAtRisk} 
                  unit="%" 
                  description="Expected maximum loss at 95% confidence"
                  isPositive={false}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ratios">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard 
                  title="Sharpe Ratio" 
                  value={metrics.sharpeRatio} 
                  unit="" 
                  description="Return per unit of risk"
                  isPositive={metrics.sharpeRatio > 1}
                  isNeutral={metrics.sharpeRatio > 0 && metrics.sharpeRatio <= 1}
                />
                <MetricCard 
                  title="Sortino Ratio" 
                  value={metrics.sortinoRatio} 
                  unit="" 
                  description="Return per unit of downside risk"
                  isPositive={metrics.sortinoRatio > 1}
                  isNeutral={metrics.sortinoRatio > 0 && metrics.sortinoRatio <= 1}
                />
                <MetricCard 
                  title="Calmar Ratio" 
                  value={metrics.calmarRatio} 
                  unit="" 
                  description="Return relative to maximum drawdown"
                  isPositive={metrics.calmarRatio > 1}
                  isNeutral={metrics.calmarRatio > 0 && metrics.calmarRatio <= 1}
                />
                <MetricCard 
                  title="Beta" 
                  value={metrics.beta} 
                  unit="" 
                  description="Sensitivity to market movements"
                  isNeutral={true}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="drawdowns">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MetricCard 
                  title="Max Drawdown" 
                  value={metrics.maxDrawdown} 
                  unit="%" 
                  description="Largest peak-to-trough decline"
                  isPositive={false}
                />
                <MetricCard 
                  title="Avg Drawdown" 
                  value={metrics.avgDrawdown} 
                  unit="%" 
                  description="Average of all drawdowns"
                  isPositive={false}
                />
                <MetricCard 
                  title="Recovery Time" 
                  value={metrics.recoveryTime} 
                  unit=" days" 
                  description="Average time to recover from drawdowns"
                  isNeutral={true}
                />
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Top 3 Drawdowns</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-2">Start Date</th>
                      <th className="text-left pb-2">End Date</th>
                      <th className="text-right pb-2">Depth (%)</th>
                      <th className="text-right pb-2">Length (days)</th>
                      <th className="text-right pb-2">Recovery (days)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.topDrawdowns.map((drawdown, index) => (
                      <tr key={index} className="border-b border-dashed">
                        <td className="py-2">{drawdown.startDate}</td>
                        <td className="py-2">{drawdown.endDate}</td>
                        <td className="py-2 text-right text-red-500">{drawdown.depth.toFixed(2)}%</td>
                        <td className="py-2 text-right">{drawdown.length}</td>
                        <td className="py-2 text-right">{drawdown.recovery}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper component for displaying metrics
function MetricCard({ 
  title, 
  value, 
  unit, 
  description, 
  isPositive = false, 
  isNeutral = false 
}: { 
  title: string; 
  value: number; 
  unit: string; 
  description: string; 
  isPositive?: boolean; 
  isNeutral?: boolean;
}) {
  let valueColorClass = "text-muted-foreground";
  if (!isNeutral) {
    valueColorClass = isPositive ? "text-green-500" : "text-red-500";
  }
  
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <span className={`text-2xl font-bold ${valueColorClass}`}>
          {value.toFixed(2)}{unit}
        </span>
        <span className="mt-1 text-xs text-muted-foreground">{description}</span>
      </div>
    </div>
  );
}

// Helper function to calculate metrics from historical data
function calculateMetrics(data: any[] | undefined) {
  // Default values if no data is available
  if (!data || data.length === 0) {
    return {
      totalReturn: 0,
      annualizedReturn: 0,
      volatility: 0,
      sharpeRatio: 0,
      sortinoRatio: 0,
      calmarRatio: 0,
      maxDrawdown: 0,
      avgDrawdown: 0,
      recoveryTime: 0,
      bestMonth: 0,
      worstMonth: 0,
      positiveMonths: 0,
      negativeMonths: 0,
      positiveMonthsPercent: 0,
      negativeMonthsPercent: 0,
      downsideDeviation: 0,
      valueAtRisk: 0,
      beta: 0,
      topDrawdowns: [
        { startDate: '-', endDate: '-', depth: 0, length: 0, recovery: 0 },
        { startDate: '-', endDate: '-', depth: 0, length: 0, recovery: 0 },
        { startDate: '-', endDate: '-', depth: 0, length: 0, recovery: 0 },
      ]
    };
  }
  
  // Calculate metrics from data
  const returns = data.map(d => d.return);
  const drawdowns = data.map(d => d.drawdown);
  
  const totalReturn = data[data.length - 1].value / data[0].value * 100 - 100;
  const annualFactor = 365 / (data.length); // Assuming daily data
  const annualizedReturn = Math.pow(1 + totalReturn / 100, annualFactor) * 100 - 100;
  
  // Calculate volatility (standard deviation of returns)
  const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
  const volatility = Math.sqrt(variance) * Math.sqrt(252); // Annualized
  
  // Calculate positive/negative months
  const positiveMonths = returns.filter(r => r > 0).length;
  const negativeMonths = returns.filter(r => r <= 0).length;
  const positiveMonthsPercent = (positiveMonths / returns.length) * 100;
  const negativeMonthsPercent = (negativeMonths / returns.length) * 100;
  
  // Best/worst months
  const bestMonth = Math.max(...returns);
  const worstMonth = Math.min(...returns);
  
  // Drawdown metrics
  const maxDrawdown = Math.min(...drawdowns);
  const nonZeroDrawdowns = drawdowns.filter(d => d < 0);
  const avgDrawdown = nonZeroDrawdowns.length > 0 
    ? nonZeroDrawdowns.reduce((sum, d) => sum + d, 0) / nonZeroDrawdowns.length 
    : 0;
  
  // Mock recovery time (would be calculated from actual drawdown periods)
  const recoveryTime = 45;
  
  // Performance ratios
  const riskFreeRate = 0.03; // 3% risk-free rate assumption
  const excessReturn = annualizedReturn - riskFreeRate;
  const sharpeRatio = volatility > 0 ? excessReturn / volatility : 0;
  
  // Downside deviation (standard deviation of negative returns only)
  const negativeReturns = returns.filter(r => r < 0);
  const downsideVariance = negativeReturns.length > 0
    ? negativeReturns.reduce((sum, r) => sum + Math.pow(r, 2), 0) / negativeReturns.length
    : 0;
  const downsideDeviation = Math.sqrt(downsideVariance) * Math.sqrt(252); // Annualized
  
  // Sortino ratio
  const sortinoRatio = downsideDeviation > 0 ? excessReturn / downsideDeviation : 0;
  
  // Calmar ratio
  const calmarRatio = maxDrawdown !== 0 ? Math.abs(annualizedReturn / maxDrawdown) : 0;
  
  // Value at Risk (95% confidence)
  const valueAtRisk = avgReturn - (1.645 * Math.sqrt(variance));
  
  // Beta (mock value - would be calculated using market returns)
  const beta = 1.2;
  
  // Mock top drawdowns
  const topDrawdowns = [
    { startDate: '2025-03-15', endDate: '2025-04-22', depth: -12.5, length: 38, recovery: 67 },
    { startDate: '2025-07-08', endDate: '2025-08-03', depth: -8.3, length: 26, recovery: 41 },
    { startDate: '2025-10-12', endDate: '2025-10-29', depth: -5.7, length: 17, recovery: 23 },
  ];
  
  return {
    totalReturn,
    annualizedReturn,
    volatility,
    sharpeRatio,
    sortinoRatio,
    calmarRatio,
    maxDrawdown,
    avgDrawdown,
    recoveryTime,
    bestMonth,
    worstMonth,
    positiveMonths,
    negativeMonths,
    positiveMonthsPercent,
    negativeMonthsPercent,
    downsideDeviation,
    valueAtRisk,
    beta,
    topDrawdowns
  };
}