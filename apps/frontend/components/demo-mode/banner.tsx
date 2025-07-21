"use client"

import React from "react"
import { AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface DemoModeBannerProps {
  onExit: () => void
}

export function DemoModeBanner({ onExit }: DemoModeBannerProps) {
  const [dismissed, setDismissed] = React.useState(false)

  if (dismissed) {
    return (
      <div className="flex items-center justify-between mb-4 bg-primary/10 rounded-lg px-4 py-2">
        <Badge className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500">
          DEMO MODE ACTIVE
        </Badge>
        <Button variant="ghost" size="sm" onClick={onExit}>
          Exit Demo
        </Button>
      </div>
    )
  }

  return (
    <Alert className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Badge className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500">
            DEMO MODE ACTIVE
          </Badge>
          <span>You are currently viewing a simulated environment. No real assets are at risk.</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onExit}>
            Exit Demo
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setDismissed(true)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
