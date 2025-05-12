"use client"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function NotificationsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            3
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Notifications</h4>
            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
              Mark all as read
            </Button>
          </div>
          <div className="space-y-2">
            <div className="rounded-md border p-3">
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-primary/20 p-1">
                  <Bell className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <p className="text-sm">New pool opportunity detected</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
            </div>
            <div className="rounded-md border p-3">
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-primary/20 p-1">
                  <Bell className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <p className="text-sm">Portfolio rebalance recommended</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </div>
            <div className="rounded-md border p-3">
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-primary/20 p-1">
                  <Bell className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <p className="text-sm">Flash loan opportunity available</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
