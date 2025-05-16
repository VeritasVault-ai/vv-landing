"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts"

interface DashboardPerformanceProps {
  fullView?: boolean
}

/**
 * Component that displays performance charts and metrics
 */
export function DashboardPerformance({ fullView = false }: DashboardPerformanceProps) {
  // Mock data for performance charts
  const performanceData = [
    { name: "Jan", return: 4.5 },
    { name: "Feb", return: 3.8 },
    { name: "Mar", return: -2.1 },
    { name: "Apr", return: 5.7 },
    { name: "May", return: 2.3 },
    { name: "Jun", return: 6.4 },
    { name: "Jul", return: 4.2 },
    { name: "Aug", return: -1.8 },
    { name: "Sep", return: 3.1 },
    { name: "Oct", return: 5.2 },
    { name: "Nov", return: 4.8 },
    { name: "Dec", return: 6.9 }
  ]
  
  const assetPerformance = [
    { name: "BTC", value: 12.4 },
    { name: "ETH", value: 8.7 },
    { name: "USDC", value: 2.1 },
    { name: "AVAX", value: 15.3 },
    { name: "SOL", value: 10.2 }
  ]
  
  const timeframeData = {
    "1M": performanceData.slice(-1),
    "3M": performanceData.slice(-3),
    "6M": performanceData.slice(-6),
    "1Y": performanceData,
    "ALL": performanceData
  }
  
  return (
    <Card className={fullView ? "col-span-2" : ""}>
      <CardHeader>
        <CardTitle>Performance</CardTitle>
        <CardDescription>Portfolio performance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="1Y" className="space-y-4">
          <TabsList className="grid grid-cols-5 h-8">
            <TabsTrigger value="1M">1M</TabsTrigger>
            <TabsTrigger value="3M">3M</TabsTrigger>
            <TabsTrigger value="6M">6M</TabsTrigger>
            <TabsTrigger value="1Y">1Y</TabsTrigger>
            <TabsTrigger value="ALL">ALL</TabsTrigger>
          </TabsList>
          
          {Object.entries(timeframeData).map(([timeframe, data]) => (
            <TabsContent key={timeframe} value={timeframe} className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`${value}%`, 'Return']}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="return" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {fullView && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="text-sm font-medium mb-3">Asset Performance</h4>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={assetPerformance}
                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number) => [`${value}%`, 'Return']}
                          labelFormatter={(label) => `Asset: ${label}`}
                        />
                        <Bar 
                          dataKey="value" 
                          fill="#3b82f6" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}