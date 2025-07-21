"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HelpCircle, LogOut, Settings, User, AlertTriangle } from "lucide-react"
import { Dispatch, SetStateAction } from "react"
import styles from "./mobile-menu.module.css"
import { SearchBar } from "./search-bar"
import { NavigationLink } from "./index"

interface MobileMenuProps {
  version: string;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  customLinks?: NavigationLink[];
  variant?: 'landing' | 'dashboard' | 'demo' | 'fixed';
  isAuthenticated?: boolean;
  userMenuProps?: {
    userName?: string;
    userInitials?: string;
    onLogout?: () => void;
    onProfileClick?: () => void;
    onSettingsClick?: () => void;
    onHelpClick?: () => void;
    trackEvent?: (event: any) => void;
  };
  showSearch?: boolean;
  onSearchSubmit?: (query: string) => void;
  trackEvent?: (event: any) => void;
  onExitDemoClick?: () => void;
}

export function MobileMenu({ 
  version, 
  setIsMenuOpen, 
  customLinks, 
  variant = 'dashboard',
  isAuthenticated = false,
  userMenuProps = {},
  showSearch = true,
  onSearchSubmit,
  trackEvent,
  onExitDemoClick
}: MobileMenuProps) {
  // Default navigation links if no custom links are provided
  const defaultLinks: NavigationLink[] = [
    {
      label: "Dashboard",
      href: `/${version}/dashboard`,
      active: true
    },
    {
      label: "Portfolio",
      href: `/${version}/portfolio`,
      active: false
    },
    {
      label: "Strategies",
      href: `/${version}/strategies`,
      active: false
    },
    {
      label: "Analytics",
      href: `/${version}/analytics`,
      active: false
    },
    {
      label: "Compliance",
      href: `/${version}/compliance`,
      active: false
    },
    {
      label: "Reports",
      href: `/${version}/reports`,
      active: false
    },
    {
      label: "Settings",
      href: `/${version}/settings`,
      active: false
    }
  ];

  // Use custom links if provided, otherwise use default links
  const links = customLinks || defaultLinks;

  // Handle link click with analytics tracking
  const handleLinkClick = (label: string, href: string) => {
    setIsMenuOpen(false);
    
    if (trackEvent) {
      trackEvent({
        action: "mobile_navigation_click",
        category: "navigation",
        label: label,
        destination: href
      });
    }
  };
  
  // Handle exit demo click
  const handleExitDemo = () => {
    setIsMenuOpen(false);
    
    if (onExitDemoClick) {
      onExitDemoClick();
    }
    
    if (trackEvent) {
      trackEvent({
        action: "exit_demo_click",
        category: "navigation",
        label: "mobile_menu"
      });
    }
  };
  
  // Handle search submission
  const handleSearchSubmit = (query: string) => {
    if (onSearchSubmit) {
      onSearchSubmit(query);
    }

    if (trackEvent) {
      trackEvent({
        action: "search",
        category: "engagement",
        label: query,
        variant: variant
      });
    }

    setIsMenuOpen(false);
  };

  return (
    <div className={styles.mobileMenu}>
      <div className={styles.mobileMenuContainer}>
        {showSearch && variant !== 'landing' && (
          <SearchBar onSubmit={handleSearchSubmit} />
        )}

          {variant === 'demo' && (
          <div className={styles.demoModeNotice}>
            <AlertTriangle className={styles.demoIcon} />
            <span>You are currently in Demo Mode</span>
          </div>
          )}

        <nav className={styles.navMenu}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={link.active ? styles.navLinkActive : styles.navLink}
              onClick={() => handleLinkClick(link.label, link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

          {variant === 'demo' && (
        <Button
              variant="outline"
              className={styles.exitDemoButton}
              onClick={handleExitDemo}
        >
              Exit Demo Mode
        </Button>
          )}
        </nav>

        {variant !== 'landing' && isAuthenticated && (
          <MobileUserProfile 
            setIsMenuOpen={setIsMenuOpen} 
            userMenuProps={userMenuProps}
            trackEvent={trackEvent}
          />
        )}
      </div>
    </div>
  )
}

interface MobileUserProfileProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  userMenuProps?: {
    userName?: string;
    userInitials?: string;
    onLogout?: () => void;
    onProfileClick?: () => void;
    onSettingsClick?: () => void;
    onHelpClick?: () => void;
    trackEvent?: (event: any) => void;
  };
  trackEvent?: (event: any) => void;
}

function MobileUserProfile({ 
  setIsMenuOpen, 
  userMenuProps = {},
  trackEvent
}: MobileUserProfileProps) {
  const {
    userName = "Institutional Treasury",
    userInitials = "IT",
    onLogout,
    onProfileClick,
    onSettingsClick,
    onHelpClick
  } = userMenuProps;
  
  // Handle profile click
  // Utility function for handling user actions
  const handleUserAction = (
    actionCallback?: () => void,
    eventData?: { action: string, category: string, label: string }
  ) => {
    setIsMenuOpen(false);
    
    if (actionCallback) {
      actionCallback();
    }
    
    if (trackEvent && eventData) {
      trackEvent(eventData);
    }
  };

  const handleProfileClick = () => {
    handleUserAction(onProfileClick, {
      action: "profile_click",
      category: "navigation",
      label: "mobile_menu"
    });
  };

  return (
    <div className={styles.userProfileSection}>
      <div className={styles.userProfileHeader}>
        <div className={styles.userAvatar}>
          {userInitials}
        </div>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{userName}</p>
          <p className={styles.userRole}>Enterprise Account</p>
        </div>
      </div>

      <div className={styles.userActions}>
        <Button
          variant="ghost"
          className={styles.actionButton}
          onClick={handleProfileClick}
        >
          <User className={styles.actionIcon} />
          <span>Profile</span>
        </Button>
        <Button
          variant="ghost"
          className={styles.actionButton}
          onClick={handleSettingsClick}
        >
          <Settings className={styles.actionIcon} />
          <span>Settings</span>
        </Button>
        <Button
          variant="ghost"
          className={styles.actionButton}
          onClick={handleHelpClick}
        >
          <HelpCircle className={styles.actionIcon} />
          <span>Help & Support</span>
        </Button>
        <Button
          variant="ghost"
          className={styles.actionButtonDanger}
          onClick={handleLogoutClick}
        >
          <LogOut className={styles.actionIcon} />
          <span>Log out</span>
        </Button>
      </div>
    </div>
  )
}