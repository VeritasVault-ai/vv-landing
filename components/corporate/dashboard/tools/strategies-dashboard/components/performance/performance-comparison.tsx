import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PerformanceComparisonProps {
  strategyId: string;
}

/**
 * Performance Comparison Component
 * Compares strategy performance against benchmarks and other strategies
 */
export function PerformanceComparison({ strategyId }: PerformanceComparisonProps) {
  const [comparisonType, setComparisonType] = useState<'benchmark' | 'strategies'>('benchmark');
  const [timeframe, setTimeframe] = useState<'1m' | '3m' | '6m' | '1y'>('1y');
  
  // Mock data for comparison charts
  const benchmarkComparisonData = [
    { date: '2025-01', strategy: 2.3, benchmark: 1.8 },
    { date: '2025-02', strategy: 1.7, benchmark: 1.2 },
    { date: '2025-03', strategy: -0.5, benchmark: -1.2 },
    { date: '2025-04', strategy: 3.1, benchmark: 2.4 },
    { date: '2025-05', strategy: 2.8, benchmark: 1.9 },
    { date: '2025-06', strategy: 1.2, benchmark: 0.8 },
    { date: '2025-07', strategy: 2.5, benchmark: 2.1 },
    { date: '2025-08', strategy: 3.2, benchmark: 2.7 },
    { date: '2025-09', strategy: 1.8, benchmark: 1.5 },
    { date: '2025-10', strategy: -0.7, benchmark: -1.5 },
    { date: '2025-11', strategy: 2.9, benchmark: 2.2 },
    { date: '2025-12', strategy: 3.5, benchmark: 2.8 },
  ];
  
  const strategiesComparisonData = [
    { name: 'Total Return', strategy: 15.2, avgStrategy: 12.4 },
    { name: 'Volatility', strategy: 8.7, avgStrategy: 10.2 },
    { name: 'Sharpe Ratio', strategy: 1.8, avgStrategy: 1.2 },
    { name: 'Max Drawdown', strategy: -12.5, avgStrategy: -15.8 },
    { name: 'Recovery Time', strategy: 45, avgStrategy: 62 },
  ];
  
  // Filter data based on selected timeframe
  const getFilteredData = () => {
    switch(timeframe) {
      case '1m':
        return benchmarkComparisonData.slice(-1);
      case '3m':
        return benchmarkComparisonData.slice(-3);
      case '6m':
        return benchmarkComparisonData.slice(-6);
      case '1y':
      default:
        return benchmarkComparisonData;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Select value={comparisonType} onValueChange={(value: 'benchmark' | 'strategies') => setComparisonType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Comparison Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="benchmark">Benchmark Comparison</SelectItem>
              <SelectItem value="strategies">Strategy Comparison</SelectItem>
            </SelectContent>
          </Select>
          
          {comparisonType === 'benchmark' && (
            <Select value={timeframe} onValueChange={(value: '1m' | '3m' | '6m' | '1y') => setTimeframe(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      
      {comparisonType === 'benchmark' ? (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Performance vs Benchmark</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getFilteredData()}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis unit="%" />
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="strategy" 
                    name="This Strategy" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="benchmark" 
                    name="Market Benchmark" 
                    stroke="#6b7280" 
                    strokeWidth={2} 
                    strokeDasharray="5 5" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>This chart compares the strategy's performance against a market benchmark over time.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Comparison with Other Strategies</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={strategiesComparisonData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="strategy" name="This Strategy" fill="#3b82f6" />
                  <Bar dataKey="avgStrategy" name="Average Strategy" fill="#6b7280" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>This chart compares key metrics of this strategy against the average of all strategies.</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Alpha Generation</h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getFilteredData()}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis unit="%" />
                  <Tooltip formatter={(value, name, props) => {
                    const benchmark = props.payload.benchmark;
                    const strategy = props.payload.strategy;
                    const alpha = strategy - benchmark;
                    return [`${alpha.toFixed(2)}%`, 'Alpha'];
                  }} />
                  <Line 
                    type="monotone" 
                    dataKey={(data) => data.strategy - data.benchmark} 
                    name="Alpha" 
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Relative Strength</h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getFilteredData().map((item, index, array) => {
                    // Calculate cumulative returns
                    let stratCumulative = 100;
                    let benchmarkCumulative = 100;
                    for (let i = 0; i <= index; i++) {
                      stratCumulative *= (1 + array[i].strategy / 100);
                      benchmarkCumulative *= (1 + array[i].benchmark / 100);
                    }
                    return {
                      ...item,
                      strategyValue: stratCumulative,
                      benchmarkValue: benchmarkCumulative,
                      relativeStrength: (stratCumulative / benchmarkCumulative) * 100
                    };
                  })}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[80, 120]} />
                  <Tooltip formatter={(value) => [value.toFixed(2), 'Relative Strength']} />
                  <Line 
                    type="monotone" 
                    dataKey="relativeStrength" 
                    name="Relative Strength" 
                    stroke="#10b981" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}