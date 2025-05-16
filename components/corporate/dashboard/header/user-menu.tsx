"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HelpCircle, LogOut, Settings, User } from "lucide-react"
import styles from "./user-menu.module.css"

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={styles.userButton}>
          <div className={styles.userAvatar}>
            IT
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={styles.dropdownContent}
      >
        <DropdownMenuLabel className={styles.dropdownLabel}>
          Institutional Treasury
        </DropdownMenuLabel>
        <DropdownMenuSeparator className={styles.dropdownSeparator} />
        <DropdownMenuItem className={styles.dropdownItem}>
          <User className={styles.dropdownItemIcon} />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className={styles.dropdownItem}>
          <Settings className={styles.dropdownItemIcon} />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className={styles.dropdownItem}>
          <HelpCircle className={styles.dropdownItemIcon} />
          <span>Help & Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className={styles.dropdownSeparator} />
        <DropdownMenuItem className={styles.dropdownItemDanger}>
          <LogOut className={styles.dropdownItemIcon} />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}