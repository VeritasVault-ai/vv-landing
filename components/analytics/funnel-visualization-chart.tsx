"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"

// Sample funnel data - in a real implementation, this would come from your analytics API
const SAMPLE_FUNNEL_DATA = {
  authentication: [
    { step: "View Login Page", users: 1000, rate: 100 },
    { step: "Login Attempt", users: 850, rate: 85 },
    { step: "Login Success", users: 780, rate: 78 },
    { step: "View Dashboard", users: 720, rate: 72 },
  ],
  strategy: [
    { step: "View Strategies Page", users: 500, rate: 100 },
    { step: "Start Strategy Creation", users: 320, rate: 64 },
    { step: "Configure Strategy", users: 280, rate: 56 },
    { step: "Adjust Risk", users: 220, rate: 44 },
    { step: "Save Strategy", users: 180, rate: 36 },
  ],
  ai: [
    { step: "View AI Features", users: 400, rate: 100 },
    { step: "Generate AI Strategy", users: 250, rate: 62.5 },
    { step: "Review AI Strategy", users: 200, rate: 50 },
    { step: "Save AI Strategy", users: 150, rate: 37.5 },
  ],
}

const TIME_PERIODS = ["Last 7 days", "Last 30 days", "Last 90 days"]

export function FunnelVisualizationChart() {
  const [selectedFunnel, setSelectedFunnel] = useState("authentication")
  const [timePeriod, setTimePeriod] = useState("Last 30 days")

  const data = SAMPLE_FUNNEL_DATA[selectedFunnel as keyof typeof SAMPLE_FUNNEL_DATA]

  const getStepColor = (index: number, total: number) => {
    // Generate colors from green to red based on position in funnel
    const hue = ((total - index) / total) * 120 // 120 is green, 0 is red
    return `hsl(${hue}, 70%, 50%)`
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Funnel Visualization</CardTitle>
            <CardDescription>Visual representation of user progression through key workflows</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="funnel-type">Funnel Type</Label>
              <Select value={selectedFunnel} onValueChange={setSelectedFunnel}>
                <SelectTrigger id="funnel-type">
                  <SelectValue placeholder="Select funnel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="authentication">Authentication Funnel</SelectItem>
                  <SelectItem value="strategy">Strategy Creation Funnel</SelectItem>
                  <SelectItem value="ai">AI Feature Adoption Funnel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="time-period">Time Period</Label>
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger id="time-period">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_PERIODS.map((period) => (
                    <SelectItem key={period} value={period}>
                      {period}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar" className="space-y-4">
          <TabsList>
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="funnel">Funnel View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>

          <TabsContent value="bar" className="space-y-4">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <XAxis dataKey="step" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} interval={0} />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      value,
                      name === "rate" ? "Conversion Rate %" : "Users",
                    ]}
                  />
                  <Bar dataKey="users" name="Users" radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getStepColor(index, data.length - 1)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Key Insights</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    <span className="font-medium">Overall conversion rate:</span> {data[data.length - 1].rate}% (
                    {data[data.length - 1].users} of {data[0].users} users)
                  </li>
                  <li>
                    <span className="font-medium">Biggest drop-off:</span> Between "
                    {
                      data.reduce(
                        (max, entry, i) =>
                          i > 0 && entry.users / data[i - 1].users < max.rate
                            ? { steps: `${data[i - 1].step} → ${entry.step}`, rate: entry.users / data[i - 1].users }
                            : max,
                        { steps: "", rate: 1 },
                      ).steps
                    }
                    "
                  </li>
                  <li>
                    <span className="font-medium">Opportunity:</span> Focus on improving the steps with the highest
                    drop-off rates
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Recommendations</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Analyze user behavior at each step to identify friction points</li>
                  <li>Consider A/B testing different approaches for high drop-off steps</li>
                  <li>Implement user feedback mechanisms at critical funnel points</li>
                  <li>Compare performance across different user segments</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="funnel" className="space-y-4">
            <div className="h-[400px]">
              <ChartContainer
                config={{
                  users: {
                    label: "Users",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full"
              >
                {/* Custom funnel visualization would go here */}
                <div className="h-full flex items-center justify-center flex-col">
                  {data.map((step, index) => {
                    const width = `${Math.max(30, step.rate)}%`
                    const nextStep = data[index + 1]
                    const dropRate = nextStep ? (((step.users - nextStep.users) / step.users) * 100).toFixed(1) : 0

                    return (
                      <div key={index} className="w-full flex flex-col items-center mb-4">
                        <div
                          className="bg-primary/80 text-primary-foreground rounded-md py-2 px-4 text-center"
                          style={{ width }}
                        >
                          <div className="font-medium">{step.step}</div>
                          <div className="text-sm">
                            {step.users} users ({step.rate}%)
                          </div>
                        </div>

                        {index < data.length - 1 && (
                          <div className="h-8 flex items-center justify-center text-sm text-muted-foreground">
                            ↓ {dropRate}% drop
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </ChartContainer>
            </div>
          </TabsContent>

          <TabsContent value="table" className="space-y-4">
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-10 px-4 text-left font-medium">Step</th>
                    <th className="h-10 px-4 text-right font-medium">Users</th>
                    <th className="h-10 px-4 text-right font-medium">Conversion Rate</th>
                    <th className="h-10 px-4 text-right font-medium">Drop-off</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((step, index) => {
                    const prevStep = index > 0 ? data[index - 1] : null
                    const dropOff = prevStep ? prevStep.users - step.users : 0
                    const dropOffRate = prevStep ? ((dropOff / prevStep.users) * 100).toFixed(1) : "0.0"

                    return (
                      <tr key={index} className="border-b">
                        <td className="p-4">{step.step}</td>
                        <td className="p-4 text-right">{step.users.toLocaleString()}</td>
                        <td className="p-4 text-right">{step.rate}%</td>
                        <td className="p-4 text-right">
                          {index > 0 ? (
                            <>
                              {dropOff.toLocaleString()} ({dropOffRate}%)
                            </>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
