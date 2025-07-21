"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import styles from "./notifications-button.module.css"

interface NotificationsButtonProps {
  count?: number;
  onClick?: () => void;
}

export function NotificationsButton({ count = 0, onClick }: NotificationsButtonProps) {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className={styles.notificationsButton}
      onClick={onClick}
    >
      <Bell className={styles.notificationIcon} />
      {count > 0 && (
        <span className={styles.badge}>
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Button>
  )
}