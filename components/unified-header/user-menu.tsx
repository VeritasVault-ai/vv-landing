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

interface UserMenuProps {
  userName?: string;
  userInitials?: string;
  onLogout?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
}

export function UserMenu({
  userName = "Institutional Treasury",
  userInitials = "IT",
  onLogout,
  onProfileClick,
  onSettingsClick,
  onHelpClick
}: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={styles.userButton}>
          <div className={styles.userAvatar}>
            {userInitials}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={styles.dropdownContent}
      >
        <DropdownMenuLabel className={styles.dropdownLabel}>
          {userName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className={styles.dropdownSeparator} />
        <DropdownMenuItem 
          className={styles.dropdownItem}
          onClick={onProfileClick}
        >
          <User className={styles.dropdownItemIcon} />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={styles.dropdownItem}
          onClick={onSettingsClick}
        >
          <Settings className={styles.dropdownItemIcon} />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={styles.dropdownItem}
          onClick={onHelpClick}
        >
          <HelpCircle className={styles.dropdownItemIcon} />
          <span>Help & Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className={styles.dropdownSeparator} />
        <DropdownMenuItem 
          className={styles.dropdownItemDanger}
          onClick={onLogout}
        >
          <LogOut className={styles.dropdownItemIcon} />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}