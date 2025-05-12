"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

// Sample data for the voting power distribution chart
const votingPowerData = [
  { name: "Your Voting Power", value: 12.5 },
  { name: "Other Delegates", value: 45.3 },
  { name: "Undelegated", value: 42.2 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

export function VotingOverview() {
  // Create a config object for the chart
  const chartConfig = votingPowerData.reduce(
    (acc, item, index) => {
      acc[item.name] = {
        label: item.name,
        color: COLORS[index % COLORS.length],
      }
      return acc
    },
    {} as Record<string, { label: string; color: string }>,
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Your Voting Power</CardDescription>
            <CardTitle className="text-3xl font-bold">12.5%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 dark:text-slate-400">1,250,000 votes of 10,000,000 total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Proposals Participated</CardDescription>
            <CardTitle className="text-3xl font-bold">24</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 dark:text-slate-400">Out of 28 total proposals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Participation Rate</CardDescription>
            <CardTitle className="text-3xl font-bold">85.7%</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={85.7} className="h-2" />
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Above average by 23%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Voting Power Distribution</CardTitle>
            <CardDescription>Current allocation of voting power across the protocol</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={votingPowerData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {votingPowerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delegations</CardTitle>
            <CardDescription>Addresses that have delegated voting power to you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">0x7a23...45df</div>
                  <div className="text-sm text-slate-500">Delegated 3 months ago</div>
                </div>
                <Badge variant="secondary">450,000 votes</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">0x3f89...12ab</div>
                  <div className="text-sm text-slate-500">Delegated 5 months ago</div>
                </div>
                <Badge variant="secondary">350,000 votes</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">0x9c12...78ef</div>
                  <div className="text-sm text-slate-500">Delegated 2 weeks ago</div>
                </div>
                <Badge variant="secondary">250,000 votes</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Self-delegated</div>
                  <div className="text-sm text-slate-500">Your own voting power</div>
                </div>
                <Badge variant="secondary">200,000 votes</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}