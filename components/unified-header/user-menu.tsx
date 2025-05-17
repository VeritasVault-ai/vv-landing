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
  trackEvent?: (event: any) => void;
}

export function UserMenu({
  userName = "Institutional Treasury",
  userInitials = "IT",
  onLogout,
  onProfileClick,
  onSettingsClick,
  onHelpClick,
  trackEvent
}: UserMenuProps) {
  // Track menu item clicks
  // Handler factory for menu item clicks
  const createMenuItemHandler = (
    callback?: () => void,
    action: string,
    category: string = "navigation"
  ) => () => {
    if (callback) {
      callback();
    }
    
    if (trackEvent) {
      trackEvent({
        action,
        category,
        label: "user_menu"
      });
    }
  };
  
  // Create handlers for each menu item
  const handleProfileClick = createMenuItemHandler(onProfileClick, "profile_click");
  const handleSettingsClick = createMenuItemHandler(onSettingsClick, "settings_click");
  const handleHelpClick = createMenuItemHandler(onHelpClick, "help_click");
  const handleLogoutClick = createMenuItemHandler(onLogout, "logout_click", "authentication");
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
          onClick={handleProfileClick}
        >
          <User className={styles.dropdownItemIcon} />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={styles.dropdownItem}
          onClick={handleSettingsClick}
        >
          <Settings className={styles.dropdownItemIcon} />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={styles.dropdownItem}
          onClick={handleHelpClick}
        >
          <HelpCircle className={styles.dropdownItemIcon} />
          <span>Help & Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className={styles.dropdownSeparator} />
        <DropdownMenuItem 
          className={styles.dropdownItemDanger}
          onClick={handleLogoutClick}
        >
          <LogOut className={styles.dropdownItemIcon} />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}