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

// Fallback data to use when API fails
const FALLBACK_DATA: VotingOverviewType = {
  votingPower: {
    percentage: 5.2,
    votes: 52000,
    totalVotes: 1000000
  },
  participation: {
    participated: 12,
    totalProposals: 15,
    rate: 80,
    comparedToAverage: 15
  },
  votingPowerDistribution: [
    { name: "Core Team", value: 15 },
    { name: "Community", value: 45 },
    { name: "Treasury", value: 40 }
  ],
  delegations: [
    { address: "0x1a2...3b4c", timeAgo: "2 days ago", votes: 12000 },
    { address: "0x5d6...7e8f", timeAgo: "1 week ago", votes: 8000 },
    { address: "0x9a0...1b2c", timeAgo: "3 weeks ago", votes: 5000 }
  ]
};

// Colors for the chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

/**
 * Renders an overview of voting statistics, including voting power, participation metrics, voting power distribution, and delegations.
 *
 * Fetches live voting data on mount and updates in real time when voting power changes. If data loading fails, displays simulated fallback data with a warning banner. Shows loading placeholders while fetching.
 *
 * @returns A React element displaying summary cards, a voting power distribution pie chart, and a list of delegations, or loading and fallback UI as appropriate.
 *
 * @remark If live data cannot be loaded, simulated fallback data is shown with a warning to the user.
 */
export function VotingOverview() {
  const [data, setData] = useState<VotingOverviewType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usedFallback, setUsedFallback] = useState(false)

  useEffect(() => {
    /**
     * Fetches voting overview data and updates component state with the result.
     *
     * If the fetch fails, sets an error message and uses fallback data to ensure the UI remains populated.
     */
    async function fetchData() {
      try {
        console.log("Attempting to fetch voting overview data...")
        const result = await votingService.getVotingOverview()
        setData(result)
        setUsedFallback(false)
      } catch (err) {
        console.error('Error fetching voting overview:', err)
        setError('Failed to load voting data. Using fallback data instead.')
        // Use fallback data instead of showing an error
        setData(FALLBACK_DATA)
        setUsedFallback(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Subscribe to voting-power-changed events for real-time updates
    const unsubscribe = votingEvents.subscribe('voting-power-changed', ({ overview }) => {
      setData(overview)
      setUsedFallback(false)
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
    // Loading UI (unchanged)
    return (
      <div className="space-y-6">
        {/* Loading skeleton UI */}
        {/* ... (existing loading UI code) ... */}
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <div className="space-y-6">
      {usedFallback && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-md mb-4">
          <p className="text-amber-800 dark:text-amber-200">
            {error} This is simulated data for demonstration purposes.
          </p>
        </div>
      )}

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