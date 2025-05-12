"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { VotingOverview as VotingOverviewType } from "@/lib/repositories/voting-repository"
import { votingService } from "@/lib/services/voting-service"
import { votingEvents } from "@/lib/events/voting-events"

// Colors for the chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

export function VotingOverview() {
  const [data, setData] = useState<VotingOverviewType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await votingService.getVotingOverview()
        setData(result)
      } catch (err) {
        console.error('Error fetching voting overview:', err)
        setError('Failed to load voting data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Subscribe to voting-power-changed events for real-time updates
    const unsubscribe = votingEvents.subscribe('voting-power-changed', ({ overview }) => {
      setData(overview)
    })

    // Clean up subscription when component unmounts
    return () => unsubscribe()
  }, [])

  // Create a config object for the chart
  const chartConfig = data?.votingPowerDistribution?.reduce(
    (acc, item, index) => {
      acc[item.name] = {
        label: item.name,
        color: COLORS[index % COLORS.length],
      }
      return acc
    },
    {} as Record<string, { label: string; color: string }>,
  ) || {}

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent className="h-80">
              <div className="h-full w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="space-y-2">
                      <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                      <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                    </div>
                    <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md">
        <p className="text-red-800 dark:text-red-200">{error}</p>
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Your Voting Power</CardDescription>
            <CardTitle className="text-3xl font-bold">{data.votingPower.percentage}%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {data.votingPower.votes.toLocaleString()} votes of {data.votingPower.totalVotes.toLocaleString()} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Proposals Participated</CardDescription>
            <CardTitle className="text-3xl font-bold">{data.participation.participated}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Out of {data.participation.totalProposals} total proposals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Participation Rate</CardDescription>
            <CardTitle className="text-3xl font-bold">{data.participation.rate}%</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={data.participation.rate} className="h-2" />
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Above average by {data.participation.comparedToAverage}%
            </p>
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
                    data={data.votingPowerDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {data.votingPowerDistribution.map((entry, index) => (
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
              {data.delegations.map((delegation, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{delegation.address}</div>
                    <div className="text-sm text-slate-500">Delegated {delegation.timeAgo}</div>
                  </div>
                  <Badge variant="secondary">{delegation.votes.toLocaleString()} votes</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}