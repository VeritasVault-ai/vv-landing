"use client"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ThemeToggle } from "@/components/theme-toggle"

export function SettingsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Settings</h4>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Theme</span>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Notifications</span>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">API Access</span>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            Advanced settings
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
