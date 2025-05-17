"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EventGridFilter } from "@/src/types/event-grid"
import { BellOff } from "lucide-react"
import { useState } from "react"
import { EventFeed } from "./event-feed"
import { EventFilterDialog } from "./event-filter-dialog"
import styles from "./event-grid-dashboard.module.css"
import { EventGridTopicsList } from "./event-grid-topics-list"

// Add this type definition to match what EventFeed expects
type EventType =
  | "system.status"
  | "system.error"
  | "user.login"
  | "user.logout"
  | "user.created"
  | "data.updated"
  | "security.alert"
  | "security.access"

type EventFilter = {
  eventType?: EventType
  source?: string
  severity?: string
}

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

  // Convert EventGridFilter to EventFilter
  const convertToEventFilter = (gridFilter: EventGridFilter | undefined): EventFilter | undefined => {
    if (!gridFilter) return undefined;
    
    // Only include eventType if it's a valid EventType
    const isValidEventType = (type: string): type is EventType => {
      return ["system.status", "system.error", "user.login", "user.logout", 
              "user.created", "data.updated", "security.alert", "security.access"].includes(type);
    };
    
    const result: EventFilter = {};
    
    if (gridFilter.eventType && isValidEventType(gridFilter.eventType)) {
      result.eventType = gridFilter.eventType;
    }
    
    // Map other fields as needed
    // For example, you might want to map subjectBeginsWith to source
    if (gridFilter.subjectBeginsWith) {
      result.source = gridFilter.subjectBeginsWith;
    }
    
    return result;
  };
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
                  initialFilter={convertToEventFilter(currentFilter)}
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