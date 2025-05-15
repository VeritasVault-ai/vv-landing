"use client"
import { useState } from "react"
import { BellOff } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EventGridTopicsList } from "@/components/features/event-grid/event-grid-topics-list"
import { EventFeed } from "@/components/features/event-grid/event-feed"
import { EventFilterDialog } from "@/components/features/event-grid/event-filter-dialog"
import type { EventGridFilter } from "@/types/event-grid"
import styles from "./event-grid-dashboard.module.css"

export interface EventGridDashboardProps {
  title?: string
  description?: string
}

export const EventGridDashboard = ({
  title = "Event Grid Dashboard",
  description = "Monitor and manage real-time blockchain events across multiple topics and subscriptions.",
}: EventGridDashboardProps) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [currentFilter, setCurrentFilter] = useState<EventGridFilter | undefined>(undefined)

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId)
  }

  const handleFilterChange = (filter: EventGridFilter | undefined) => {
    setCurrentFilter(filter)
    setIsFilterDialogOpen(false)
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.dashboardTitle}>{title}</h1>
          {description && <p className={styles.dashboardDescription}>{description}</p>}
        </div>
      </div>

      <div className={styles.dashboardContent}>
        <div className={styles.topicsContainer}>
          <EventGridTopicsList onSelectTopic={handleSelectTopic} />
        </div>

        <div className={styles.eventsContainer}>
          <Card className={styles.card}>
            <CardHeader>
              <CardTitle>Event Stream</CardTitle>
              <CardDescription>
                {selectedTopicId
                  ? "Real-time events from the selected topic"
                  : "Select a topic to view its events"}
              </CardDescription>
            </CardHeader>
            <CardContent className={styles.cardContent}>
              {selectedTopicId ? (
                <EventFeed 
                  topicId={selectedTopicId} 
                  title={undefined} 
                  initialFilter={currentFilter}
                />
              ) : (
                <div className={styles.noTopicSelected}>
                  <BellOff className={styles.noTopicIcon} />
                  <p>Select a topic from the list to view its events</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <EventFilterDialog
        isOpen={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        currentFilter={currentFilter}
        onFilterChange={handleFilterChange}
      />
    </div>
  )
}