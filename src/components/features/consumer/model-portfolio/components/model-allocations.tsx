"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import styles from "../model-portfolio-dashboard.module.css"

interface Allocation {
  asset: string
  weight: number
}

interface ModelAllocationsProps {
  allocations: Allocation[]
}

export const ModelAllocations = ({ allocations }: ModelAllocationsProps) => {
  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className={styles.allocationsCard}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          Asset Allocations
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 ml-2 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Current portfolio allocation across different assets</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <table className={styles.allocationTable}>
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {allocations.map((allocation) => (
                  <tr key={allocation.asset}>
                    <td>{allocation.asset}</td>
                    <td>{allocation.weight}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.allocationChart}>
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={allocations}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="weight"
                >
                  {allocations.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value, name, props) => [`${value}%`, props.payload.asset]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Allocations represent the optimal portfolio mix based on your risk profile and market views.</p>
        </div>
      </CardContent>
    </Card>
  )
}