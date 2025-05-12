"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { apiClient } from "@/lib/api/api-client"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

export interface CorporateRiskAssessmentProps {
  className?: string
}

interface RiskData {
  overall: number
  categories: {
    name: string
    value: number
    description: string
  }[]
  recommendations: string[]
}

export function CorporateRiskAssessment({ className }: CorporateRiskAssessmentProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<RiskData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Fetch real data from API
        const response = await apiClient.get<RiskData>("/risk-assessment")
        setData(response)
        setError(null)
      } catch (err) {
        console.error("Error fetching risk assessment data:", err)
        setError("Failed to load risk assessment data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getRiskLevelColor = (value: number) => {
    if (value <= 30) return "text-green-500"
    if (value <= 70) return "text-yellow-500"
    return "text-red-500"
  }

  const getRiskLevelText = (value: number) => {
    if (value <= 30) return "Low"
    if (value <= 70) return "Medium"
    return "High"
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-3/4" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-1/2" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Risk Assessment</CardTitle>
          <CardDescription>Error loading data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-destructive">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Risk Assessment</CardTitle>
            <CardDescription>Current portfolio risk analysis</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Overall Risk:</span>
            <span className={`font-bold ${getRiskLevelColor(data?.overall || 0)}`}>
              {getRiskLevelText(data?.overall || 0)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data?.categories}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Risk" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Recommendations</h4>
            <ul className="space-y-2 list-disc pl-5">
              {data?.recommendations.map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CorporateRiskAssessment
