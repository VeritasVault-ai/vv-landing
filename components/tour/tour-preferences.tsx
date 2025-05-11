"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, RefreshCw } from "lucide-react"
import { useTour } from "./tour-context"

interface TourPreferencesProps {
  className?: string
}

export function TourPreferences({ className }: TourPreferencesProps) {
  const { tourCompleted, tourStarted, resetTour, openTour, autoStartForNewUsers, setAutoStartForNewUsers } = useTour()

  const [isResetting, setIsResetting] = useState(false)

  const handleResetTour = () => {
    setIsResetting(true)
    setTimeout(() => {
      resetTour()
      setIsResetting(false)
    }, 1000)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Guided Tour Preferences
        </CardTitle>
        <CardDescription>Customize your guided tour experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="font-medium">Auto-start tour for new users</div>
            <div className="text-sm text-muted-foreground">
              Automatically start the guided tour for first-time visitors
            </div>
          </div>
          <Switch checked={autoStartForNewUsers} onCheckedChange={setAutoStartForNewUsers} />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="font-medium">Tour status</div>
            <div className="text-sm text-muted-foreground">
              {tourCompleted
                ? "You've completed the guided tour"
                : tourStarted
                  ? "You've started but not completed the tour"
                  : "You haven't started the guided tour yet"}
            </div>
          </div>
          <div className="text-sm font-medium">
            {tourCompleted ? "Completed" : tourStarted ? "In Progress" : "Not Started"}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleResetTour} disabled={isResetting || (!tourStarted && !tourCompleted)}>
          {isResetting ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Resetting...
            </>
          ) : (
            "Reset Tour Progress"
          )}
        </Button>
        <Button onClick={openTour}>
          {tourCompleted ? "Restart Tour" : tourStarted ? "Continue Tour" : "Start Tour"}
        </Button>
      </CardFooter>
    </Card>
  )
}
