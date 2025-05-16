"use client"

import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import styles from "./notifications-button.module.css"

interface NotificationsButtonProps {
  count: number
}

export function NotificationsButton({ count }: NotificationsButtonProps) {
  return (
    <Button variant="ghost" size="icon" className={styles.notificationButton}>
      <Bell className={styles.notificationIcon} />
      {count > 0 && (
        <span className={styles.badge}>
          {count}
        </span>
      )}
    </Button>
  )
}