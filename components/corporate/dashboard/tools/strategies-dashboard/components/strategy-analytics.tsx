import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { PerformanceMetrics } from './performance/performance-metrics';
import { RiskAnalysis } from './performance/risk-analysis';
import { PerformanceComparison } from './performance/performance-comparison';

interface StrategyAnalyticsProps {
  strategyId: string;
}

/**
 * Strategy Analytics Component
 * Comprehensive analytics dashboard for a specific strategy
 */
export function StrategyAnalytics({ strategyId }: StrategyAnalyticsProps) {
  const [timeframe, setTimeframe] = useState<string>('1m');
  
  // Mock strategy data
  const strategyData = {
    id: strategyId,
    name: 'Momentum Alpha Strategy',
    description: 'A momentum-based strategy that captures market trends across major crypto assets',
    allocation: [
      { name: 'BTC', value: 35 },
      { name: 'ETH', value: 25 },
      { name: 'SOL', value: 15 },
      { name: 'AVAX', value: 10 },
      { name: 'LINK', value: 8 },
      { name: 'Others', value: 7 },
    ],
    performance: {
      daily: 1.2,
      weekly: 4.5,
      monthly: 12.8,
      yearly: 87.3,
      inception: 245.6
    },
    riskMetrics: {
      volatility: 18.5,
      sharpe: 2.3,
      maxDrawdown: -24.7,
      beta: 0.85
    },
    tradingActivity: [
      { date: '2025-05-01', buys: 3, sells: 1, volume: 12500 },
      { date: '2025-05-02', buys: 2, sells: 2, volume: 8700 },
      { date: '2025-05-03', buys: 0, sells: 4, volume: 15200 },
      { date: '2025-05-04', buys: 5, sells: 0, volume: 21000 },
      { date: '2025-05-05', buys: 1, sells: 3, volume: 9300 },
      { date: '2025-05-06', buys: 2, sells: 1, volume: 7800 },
      { date: '2025-05-07', buys: 4, sells: 2, volume: 18500 },
    ]
  };
  
  // Colors for pie chart
  const COLORS = ['#3b82f6', '#10b981', '#6366f1', '#f59e0b', '#8b5cf6', '#6b7280'];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">{strategyData.name}</h2>
          <p className="text-muted-foreground">{strategyData.description}</p>
        </div>
        <div className="flex space-x-1">
          <button 
            className={`px-3 py-1 text-sm rounded ${timeframe === '1d' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
            onClick={() => setTimeframe('1d')}
          >
            1D
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded ${timeframe === '1w' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
            onClick={() => setTimeframe('1w')}
          >
            1W
          </button>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground">Total Return</span>
              <span className={`text-2xl font-bold ${strategyData.performance.inception >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {strategyData.performance.inception >= 0 ? '+' : ''}{strategyData.performance.inception.toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground">Since inception</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground">Current Period</span>
              <span className={`text-2xl font-bold ${strategyData.performance.monthly >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {strategyData.performance.monthly >= 0 ? '+' : ''}{strategyData.performance.monthly.toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground">Last 30 days</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground">Sharpe Ratio</span>
              <span className={`text-2xl font-bold ${strategyData.riskMetrics.sharpe >= 1 ? 'text-green-600' : 'text-amber-600'}`}>
                {strategyData.riskMetrics.sharpe.toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground">Risk-adjusted return</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground">Max Drawdown</span>
              <span className="text-2xl font-bold text-red-600">
                {strategyData.riskMetrics.maxDrawdown.toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground">Historical maximum loss</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="trading">Trading Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { date: '2025-01', value: 100 },
                        { date: '2025-02', value: 110 },
                        { date: '2025-03', value: 105 },
                        { date: '2025-04', value: 120 },
                        { date: '2025-05', value: 135 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="Strategy Value" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        dot={false} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={strategyData.allocation}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {strategyData.allocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {strategyData.allocation.map((asset, index) => (
                    <div key={asset.name} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                      />
                      <span className="text-xs">{asset.name}: {asset.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Daily</p>
                  <p className={`text-lg font-medium ${strategyData.performance.daily >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {strategyData.performance.daily >= 0 ? '+' : ''}{strategyData.performance.daily}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weekly</p>
                  <p className={`text-lg font-medium ${strategyData.performance.weekly >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {strategyData.performance.weekly >= 0 ? '+' : ''}{strategyData.performance.weekly}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly</p>
                  <p className={`text-lg font-medium ${strategyData.performance.monthly >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {strategyData.performance.monthly >= 0 ? '+' : ''}{strategyData.performance.monthly}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Yearly</p>
                  <p className={`text-lg font-medium ${strategyData.performance.yearly >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {strategyData.performance.yearly >= 0 ? '+' : ''}{strategyData.performance.yearly}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">All-Time</p>
                  <p className={`text-lg font-medium ${strategyData.performance.inception >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {strategyData.performance.inception >= 0 ? '+' : ''}{strategyData.performance.inception}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <PerformanceMetrics strategyId={strategyId} />
        </TabsContent>
        
        <TabsContent value="risk">
          <RiskAnalysis strategyId={strategyId} />
        </TabsContent>
        
        <TabsContent value="comparison">
          <PerformanceComparison strategyId={strategyId} />
        </TabsContent>
        
        <TabsContent value="trading">
          <Card>
            <CardHeader>
              <CardTitle>Trading Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={strategyData.tradingActivity}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="buys" name="Buy Orders" fill="#10b981" />
                    <Bar yAxisId="left" dataKey="sells" name="Sell Orders" fill="#ef4444" />
                    <Line yAxisId="right" type="monotone" dataKey="volume" name="Volume ($)" stroke="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Recent Trades</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Type</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Asset</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground">Amount</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-2 text-sm">2025-05-07</td>
                        <td className="px-4 py-2 text-sm"><span className="text-green-600">Buy</span></td>
                        <td className="px-4 py-2 text-sm">BTC</td>
                        <td className="px-4 py-2 text-sm text-right">0.25</td>
                        <td className="px-4 py-2 text-sm text-right">$48,250</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm">2025-05-07</td>
                        <td className="px-4 py-2 text-sm"><span className="text-green-600">Buy</span></td>
                        <td className="px-4 py-2 text-sm">ETH</td>
                        <td className="px-4 py-2 text-sm text-right">2.5</td>
                        <td className="px-4 py-2 text-sm text-right">$3,420</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm">2025-05-06</td>
                        <td className="px-4 py-2 text-sm"><span className="text-red-600">Sell</span></td>
                        <td className="px-4 py-2 text-sm">SOL</td>
                        <td className="px-4 py-2 text-sm text-right">15</td>
                        <td className="px-4 py-2 text-sm text-right">$142</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm">2025-05-05</td>
                        <td className="px-4 py-2 text-sm"><span className="text-red-600">Sell</span></td>
                        <td className="px-4 py-2 text-sm">AVAX</td>
                        <td className="px-4 py-2 text-sm text-right">25</td>
                        <td className="px-4 py-2 text-sm text-right">$38.50</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm">2025-05-04</td>
                        <td className="px-4 py-2 text-sm"><span className="text-green-600">Buy</span></td>
                        <td className="px-4 py-2 text-sm">LINK</td>
                        <td className="px-4 py-2 text-sm text-right">50</td>
                        <td className="px-4 py-2 text-sm text-right">$18.75</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}