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
  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    }
    
    if (trackEvent) {
      trackEvent({
        action: "profile_click",
        category: "navigation",
        label: "user_menu"
      });
    }
  };
  
  const handleSettingsClick = () => {
    if (onSettingsClick) {
      onSettingsClick();
    }
    
    if (trackEvent) {
      trackEvent({
        action: "settings_click",
        category: "navigation",
        label: "user_menu"
      });
    }
  };
  
  const handleHelpClick = () => {
    if (onHelpClick) {
      onHelpClick();
    }
    
    if (trackEvent) {
      trackEvent({
        action: "help_click",
        category: "navigation",
        label: "user_menu"
      });
    }
  };
  
  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
    
    if (trackEvent) {
      trackEvent({
        action: "logout_click",
        category: "authentication",
        label: "user_menu"
      });
    }
  };
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