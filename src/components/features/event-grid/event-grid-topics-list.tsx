"use client"
import type React from "react"
import { useState } from "react"
import { Bell, BellOff, ChevronRight, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEventGridTopics, useEventGridSubscription } from "@/hooks/use-event-grid"
import { Badge } from "@/components/ui/badge"
import styles from "./event-grid-topics-list.module.css"

export interface EventGridTopicsListProps {
  onSelectTopic?: (topicId: string) => void
}

export const EventGridTopicsList = ({ onSelectTopic }: EventGridTopicsListProps) => {
  const { topics, isLoading, error, refetch } = useEventGridTopics()
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId)
    if (onSelectTopic) {
      onSelectTopic(topicId)
    }
  }

  if (error) {
    return (
      <Card className={styles.errorCard}>
        <CardHeader>
          <CardTitle>Event Grid Topics</CardTitle>
          <CardDescription>Error loading topics</CardDescription>
        </CardHeader>
        <CardContent>
          <p className={styles.errorMessage}>{error.message}</p>
          <Button onClick={() => refetch()} variant="outline" size="sm" className={styles.retryButton}>
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Grid Topics</CardTitle>
        <CardDescription>Available topics for real-time blockchain events</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <Loader2 className={styles.loadingIcon} />
            <p>Loading topics...</p>
          </div>
        ) : topics.length === 0 ? (
          <p className={styles.noTopicsMessage}>No Event Grid topics available</p>
        ) : (
          <div className={styles.topicsList}>
            {topics.map((topic) => (
              <TopicItem
                key={topic.id}
                topic={topic}
                isSelected={topic.id === selectedTopicId}
                onSelect={() => handleSelectTopic(topic.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface TopicItemProps {
  topic: {
    id: string
    name: string
    description?: string
    region: string
  }
  isSelected: boolean
  onSelect: () => void
}

const TopicItem = ({ topic, isSelected, onSelect }: TopicItemProps) => {
  const [isSubscribing, setIsSubscribing] = useState(false)
  const { subscription, isLoading, subscribe, unsubscribe } = useEventGridSubscription(
    topic.id,
    `/api/event-grid/${topic.id}`,
  )

  const handleSubscribe = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSubscribing(true)
    await subscribe()
    setIsSubscribing(false)
  }

  const handleUnsubscribe = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await unsubscribe()
  }

  return (
    <div
      className={`${styles.topicItem} ${isSelected ? styles.selectedTopic : ""}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
    >
      <div className={styles.topicInfo}>
        <h3 className={styles.topicName}>{topic.name}</h3>
        {topic.description && <p className={styles.topicDescription}>{topic.description}</p>}
        <div className={styles.topicMeta}>
          <Badge variant="outline" className={styles.regionBadge}>
            {topic.region}
          </Badge>
          {subscription && (
            <Badge variant="secondary" className={styles.subscribedBadge}>
              Subscribed
            </Badge>
          )}
        </div>
      </div>
      <div className={styles.topicActions}>
        {subscription ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUnsubscribe}
            disabled={isLoading}
            className={styles.subscribeButton}
          >
            {isLoading ? <Loader2 className={styles.buttonSpinner} /> : <BellOff className={styles.bellIcon} />}
            <span className={styles.buttonText}>Unsubscribe</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={handleSubscribe}
            disabled={isLoading || isSubscribing}
            className={styles.subscribeButton}
          >
            {isLoading || isSubscribing ? (
              <Loader2 className={styles.buttonSpinner} />
            ) : (
              <Bell className={styles.bellIcon} />
            )}
            <span className={styles.buttonText}>Subscribe</span>
          </Button>
        )}
        <ChevronRight className={styles.chevronIcon} />
      </div>
    </div>
  )
}