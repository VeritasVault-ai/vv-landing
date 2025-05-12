"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy, Check } from "lucide-react"
import {
  HIGH_PRIORITY_DIMENSIONS,
  MEDIUM_PRIORITY_DIMENSIONS,
  LOW_PRIORITY_DIMENSIONS,
} from "@/lib/analytics/custom-dimensions"

export function CustomDimensionsGuide() {
  const [activeTab, setActiveTab] = useState("high")
  const [copiedDimension, setCopiedDimension] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedDimension(text)
    setTimeout(() => setCopiedDimension(null), 2000)
  }

  const renderDimensionsTable = (dimensions: Record<string, string>, priority: string) => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {priority === "high" && "🟢 High Priority Custom Dimensions"}
            {priority === "medium" && "🟡 Medium Priority Custom Dimensions"}
            {priority === "low" && "🔵 Low Priority Custom Dimensions"}
          </CardTitle>
          <CardDescription>
            {priority === "high" && "Register these dimensions first for immediate value"}
            {priority === "medium" && "Consider registering these after high priority dimensions"}
            {priority === "low" && "Track in code only for now, register if needed for specific analyses"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Display Name</TableHead>
                <TableHead>Event Parameter</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(dimensions).map(([key, value]) => {
                // Convert from SNAKE_CASE to Title Case
                const displayName = key
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(" ")

                return (
                  <TableRow key={key}>
                    <TableCell>{displayName}</TableCell>
                    <TableCell>{value}</TableCell>
                    <TableCell>Event</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(value)}>
                        {copiedDimension === value ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Google Analytics 4 Custom Dimensions</CardTitle>
          <CardDescription>
            Register these custom dimensions in your GA4 property to enhance your analytics capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">How to Register Custom Dimensions</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Go to your Google Analytics 4 property</li>
              <li>Navigate to Admin → Custom definitions → Create custom dimension</li>
              <li>Enter the Display Name (use the suggested names below)</li>
              <li>Set the Scope to "Event"</li>
              <li>Enter the Event parameter exactly as shown (click copy button)</li>
              <li>Click "Save" to create the dimension</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="high" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="high">High Priority</TabsTrigger>
          <TabsTrigger value="medium">Medium Priority</TabsTrigger>
          <TabsTrigger value="low">Low Priority</TabsTrigger>
        </TabsList>
        <TabsContent value="high" className="mt-4">
          {renderDimensionsTable(HIGH_PRIORITY_DIMENSIONS, "high")}
        </TabsContent>
        <TabsContent value="medium" className="mt-4">
          {renderDimensionsTable(MEDIUM_PRIORITY_DIMENSIONS, "medium")}
        </TabsContent>
        <TabsContent value="low" className="mt-4">
          {renderDimensionsTable(LOW_PRIORITY_DIMENSIONS, "low")}
        </TabsContent>
      </Tabs>
    </div>
  )
}
