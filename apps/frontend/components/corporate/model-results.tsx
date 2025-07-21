"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

interface Weight {
  asset: string
  weight: number
}

interface View {
  Weights: Weight[]
  Return: number
}

interface ModelResult {
  Views: View[]
  Allocations: Weight[]
}

interface ModelResultsResponse {
  Model: string
  ModelResults: ModelResult[]
}

// Generate colors for chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

// Custom label for pie chart segments
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

/**
 * Formats a portfolio view into a human-readable string showing asset weights and return.
 *
 * The output lists each asset with its weight, using specific formatting rules for signs and multipliers, and appends the total return as a percentage.
 *
 * @param weights - Array of asset weights to format.
 * @param returnValue - The return value as a decimal (e.g., 0.05 for 5%).
 * @returns A formatted string representing the view's asset weights and return percentage.
 */
export function formatView(weights: Weight[], returnValue: number): string {
  const formattedWeights = weights
    .map((item, index) => {
      const { asset, weight } = item
      // First item
      if (index === 0) {
        if (weight === 1.0) return asset
        if (weight === -1.0) return `-${asset}`
        return `${weight.toFixed(1)}*${asset}`
      }
      // Subsequent items
      if (weight === 1.0) return `+ ${asset}`
      if (weight === -1.0) return `- ${asset}`
      const sign = weight < 0 ? "-" : "+"
      const absWeight = Math.abs(weight)
      return `${sign} ${absWeight.toFixed(1)}*${asset}`
    })
    .join(" ")
  const formattedReturn = (returnValue * 100).toFixed(2)
  return `${formattedWeights} = ${formattedReturn}%`
}

/**
 * Displays a card summarizing a model portfolio's views and asset allocations.
 *
 * Renders a list of formatted views and a two-column layout showing asset allocations as both a table and a pie chart.
 *
 * @param modelIndex - The zero-based index of the model portfolio.
 * @param views - An array of views, each containing asset weights and a return value.
 * @param allocations - An array of asset weights representing the portfolio's allocations.
 */
function ModelResultCard({ modelIndex, views, allocations }: { modelIndex: number; views: View[]; allocations: Weight[] }) {
  // Format the chart data
  const chartData = allocations.map((allocation) => ({
    name: allocation.asset,
    value: allocation.weight,
  }))

  // Create a config object for the chart
  const chartConfig = allocations.reduce(
    (acc, allocation, index) => {
      acc[allocation.asset] = {
        label: allocation.asset,
        color: COLORS[index % COLORS.length],
      }
      return acc
    },
    {} as Record<string, { label: string; color: string }>,
  )

  return (
    <Card className="shadow-lg mb-6">
      <CardHeader>
        <CardTitle>Model Portfolio {modelIndex + 1}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Views</h3>
          <ul className="space-y-2 pl-4">
            {views.map((view, index) => (
              <li key={index} className="font-mono bg-muted p-2 rounded text-sm">
                {formatView(view.Weights, view.Return)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Allocations</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead className="text-right">Weight</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allocations.map((allocation, index) => (
                    <TableRow key={index}>
                      <TableCell>{allocation.asset}</TableCell>
                      <TableCell className="text-right">{(allocation.weight * 100).toFixed(1)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="h-[300px]">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={renderCustomizedLabel}
                      nameKey="name"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Displays portfolio model results, including views and allocations, with loading and error handling.
 *
 * Fetches model results asynchronously and renders a header with the model name, followed by a list of cards for each model result. Each card presents formatted views and allocation data using tables and pie charts. Shows a loading spinner while fetching data and an error message if loading fails.
 */
export function ModelResults() {
  const [modelData, setModelData] = useState<ModelResultsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchModelResults() {
      try {
        // In a real application, this would be an API call
        // For now, we'll use the sample data directly
        const sampleData: ModelResultsResponse = {
          "Model": "BlackLitterman",
          "ModelResults": [
            {
              "Views": [
                {
                  "Weights": [{ "asset": "stETH", "weight": 1.0 }, { "asset": "tzBTC", "weight": -1.0 }],
                  "Return": 0.0125
                },
                {
                  "Weights": [{ "asset": "USDC", "weight": 1.0 }],
                  "Return": 0.03
                }
              ],
              "Allocations": [
                { "asset": "stETH", "weight": 0.5 },
                { "asset": "tzBTC", "weight": 0.2 },
                { "asset": "USDC", "weight": 0.3 }
              ]
            },
            {
              "Views": [
                {
                  "Weights": [{ "asset": "stETH", "weight": 1.0 }, { "asset": "USDC", "weight": -1.0 }],
                  "Return": 0.02
                },
                {
                  "Weights": [{ "asset": "USDC", "weight": 1.0 }],
                  "Return": 0.02
                },
                {
                  "Weights": [{ "asset": "tzBTC", "weight": 1.0 }],
                  "Return": 0.035
                }
              ],
              "Allocations": [
                { "asset": "stETH", "weight": 0.4 },
                { "asset": "tzBTC", "weight": 0.5 },
                { "asset": "USDC", "weight": 0.1 }
              ]
            }
          ]
        };

        // Simulate API delay
        setTimeout(() => {
          setModelData(sampleData);
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error("Error fetching model results:", err);
        setError("Failed to load model results");
        setLoading(false);
      }
    }

    fetchModelResults();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Model Results</h2>
          <p className="text-slate-600 dark:text-slate-400">Using {modelData?.Model} optimization model</p>
        </div>
      </div>

      <div className="space-y-6">
        {modelData?.ModelResults.map((result, index) => (
          <ModelResultCard
            key={index}
            modelIndex={index}
            views={result.Views}
            allocations={result.Allocations}
          />
        ))}
      </div>
    </div>
  );
}