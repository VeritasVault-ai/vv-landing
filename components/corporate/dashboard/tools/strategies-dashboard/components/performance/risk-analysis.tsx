import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  BarChart, 
  Bar, 
  ScatterChart,
  Scatter,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { useHistoricalData } from "../../hooks/use-historical-data";

interface RiskAnalysisProps {
  strategyId: string;
}

/**
 * Risk Analysis Component
 * Provides detailed risk metrics and visualizations for strategy analysis
 */
export function RiskAnalysis({ strategyId }: RiskAnalysisProps) {
  const [timeframe, setTimeframe] = useState<string>('1y');
  const { data } = useHistoricalData(strategyId, timeframe);
  
  // Mock data for risk metrics
  const riskMetrics = {
    volatility: 12.5,
    var95: -2.8,
    var99: -4.2,
    cvar95: -3.5,
    maxDrawdown: -15.3,
    downsideDeviation: 8.7,
    beta: 0.85,
    correlation: 0.72,
    tailRisk: 'Medium',
    stressTestResults: [
      { scenario: 'Market Crash', impact: -18.5 },
      { scenario: 'Interest Rate +2%', impact: -8.2 },
      { scenario: 'USD Strength +10%', impact: -5.7 },
      { scenario: 'Crypto Winter', impact: -22.3 },
      { scenario: 'Liquidity Crisis', impact: -15.8 },
    ]
  };
  
  // Mock data for return distribution
  const returnDistribution = Array.from({ length: 20 }, (_, i) => {
    const returnRange = ((i - 10) * 0.5).toFixed(1); // -5% to +5% in 0.5% increments
    const frequency = Math.round(100 * Math.exp(-Math.pow((i - 11) / 4, 2))); // Normal distribution
    return { returnRange, frequency };
  });
  
  // Mock data for risk/return scatter plot
  const riskReturnData = [
    { name: 'This Strategy', risk: 12.5, return: 15.8, size: 800 },
    { name: 'S&P 500', risk: 15.2, return: 12.3, size: 600 },
    { name: 'Bonds', risk: 5.8, return: 4.2, size: 600 },
    { name: 'Gold', risk: 10.5, return: 8.7, size: 600 },
    { name: 'Bitcoin', risk: 45.2, return: 35.8, size: 600 },
    { name: 'Strategy A', risk: 14.2, return: 16.5, size: 400 },
    { name: 'Strategy B', risk: 18.7, return: 19.2, size: 400 },
    { name: 'Strategy C', risk: 9.8, return: 10.5, size: 400 },
    { name: 'Strategy D', risk: 22.3, return: 24.8, size: 400 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Risk Analysis</h3>
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Drawdown Analysis</h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={['dataMin', 0]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Drawdown']} />
                  <Area 
                    type="monotone" 
                    dataKey="drawdown" 
                    name="Drawdown" 
                    fill="#ef4444" 
                    stroke="#ef4444" 
                    fillOpacity={0.3} 
                  />
                  <ReferenceLine y={-10} stroke="#f59e0b" strokeDasharray="3 3" />
                  <ReferenceLine y={-20} stroke="#dc2626" strokeDasharray="3 3" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              <div className="flex items-center">
                <span className="w-3 h-3 inline-block bg-yellow-500 mr-1"></span>
                <span>Warning threshold (-10%)</span>
                <span className="w-3 h-3 inline-block bg-red-600 ml-4 mr-1"></span>
                <span>Critical threshold (-20%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Key Risk Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Volatility (Annualized)</span>
                  <span className="font-medium">{riskMetrics.volatility.toFixed(1)}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ width: `${Math.min(riskMetrics.volatility * 2, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Value at Risk (95%)</span>
                  <span className="font-medium text-red-500">{riskMetrics.var95.toFixed(1)}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500" 
                    style={{ width: `${Math.min(Math.abs(riskMetrics.var95) * 10, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Maximum Drawdown</span>
                  <span className="font-medium text-red-500">{riskMetrics.maxDrawdown.toFixed(1)}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500" 
                    style={{ width: `${Math.min(Math.abs(riskMetrics.maxDrawdown) * 3, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Beta</span>
                  <span className="font-medium">{riskMetrics.beta.toFixed(2)}</span>
                </div>
                <div className="mt-1 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500" 
                    style={{ width: `${Math.min(riskMetrics.beta * 50, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Market Correlation</span>
                  <span className="font-medium">{riskMetrics.correlation.toFixed(2)}</span>
                </div>
                <div className="mt-1 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500" 
                    style={{ width: `${Math.min(riskMetrics.correlation * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Return Distribution</h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={returnDistribution}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="returnRange" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, 'Frequency']} />
                  <ReferenceLine x="0.0" stroke="#888888" />
                  <Bar dataKey="frequency" name="Frequency" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              <p>Distribution of daily returns shows the strategy's risk profile and potential for extreme events.</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Risk/Return Comparison</h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="risk" name="Risk (%)" domain={[0, 50]} />
                  <YAxis type="number" dataKey="return" name="Return (%)" domain={[0, 40]} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '']} 
                    labelFormatter={(value, payload) => payload[0]?.payload.name || ''}
                  />
                  <Legend />
                  <Scatter 
                    name="Assets & Strategies" 
                    data={riskReturnData} 
                    fill="#8884d8"
                    shape="circle"
                  />
                  {/* Efficient frontier line (simplified) */}
                  <Line 
                    type="monotone" 
                    dataKey="return" 
                    data={[
                      { risk: 5, return: 4 },
                      { risk: 10, return: 10 },
                      { risk: 15, return: 15 },
                      { risk: 20, return: 19 },
                      { risk: 30, return: 25 },
                      { risk: 40, return: 30 },
                    ]} 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={false}
                    name="Efficient Frontier"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              <p>Higher position indicates better return, further right indicates higher risk.</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Stress Test Scenarios</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={riskMetrics.stressTestResults}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[-25, 0]} />
                <YAxis type="category" dataKey="scenario" width={100} />
                <Tooltip formatter={(value) => [`${value}%`, 'Impact']} />
                <Bar dataKey="impact" name="Impact" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Stress tests simulate extreme market conditions to estimate potential strategy losses.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}