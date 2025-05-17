"use client"

import { useState, useEffect } from "react"
import { useCurrentVersion } from "@/hooks/use-current-version"
import { useAnalytics } from "@/hooks/use-analytics"
import Link from "next/link"
import { Menu, X, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggleEnhanced } from "@/components/theme-toggle-enhanced"
import styles from "./unified-header.module.css"

// Import sub-components
import { MainNavigation } from "./main-navigation"
import { MobileMenu } from "./mobile-menu"
import { UserMenu } from "./user-menu"
import { SearchBar } from "./search-bar"
import { NotificationsButton } from "./notifications-button"

export type NavigationLink = {
    label: string;
    href: string;
    active?: boolean;
  icon?: React.ReactNode;
  children?: NavigationLink[];
};
  
export interface HeaderProps {
  /**
   * The type of header to render
   * - 'landing': Simple header for landing pages
   * - 'dashboard': Complex header for the corporate dashboard
   * - 'demo': Header for demo mode with badge
   * - 'fixed': Fixed position header with scroll effects
   */
  variant?: 'landing' | 'dashboard' | 'demo' | 'fixed';
  
  /**
   * Whether to show the search bar
   */
  showSearch?: boolean;
  
  /**
   * Whether to show notifications
   */
  showNotifications?: boolean;
  
  /**
   * Number of unread notifications
   */
  notificationCount?: number;
  
  /**
   * Whether to show the user menu
   */
  showUserMenu?: boolean;
  
  /**
   * Custom navigation links to override defaults
   */
  navigationLinks?: NavigationLink[];
  
  /**
   * Additional actions to show in the header
   */
  actions?: React.ReactNode;
  
  /**
   * Whether to show the theme toggle
   */
  showThemeToggle?: boolean;
  
  /**
   * Whether to show the "Get Early Access" CTA (for fixed variant)
   */
  showCTA?: boolean;
  
  /**
   * Custom logo component
   */
  customLogo?: React.ReactNode;
  
  /**
   * Custom CSS class for the header
   */
  className?: string;

  /**
   * Callback for when the search form is submitted
   */
  onSearchSubmit?: (query: string) => void;

  /**
   * Callback for when notifications are clicked
   */
  onNotificationClick?: () => void;

  /**
   * Props to pass to the UserMenu component
   */
  userMenuProps?: {
    userName?: string;
    userInitials?: string;
    onLogout?: () => void;
    onProfileClick?: () => void;
    onSettingsClick?: () => void;
    onHelpClick?: () => void;
  };

  /**
   * Callback for when the CTA button is clicked
   */
  onCTAClick?: () => void;

  /**
   * Text for the CTA button
   */
  ctaText?: string;

  /**
   * Callback for when the "Exit Demo" button is clicked
   */
  onExitDemoClick?: () => void;

  /**
   * Whether the user is authenticated
   */
  isAuthenticated?: boolean;
}

export function UnifiedHeader({
  variant = 'dashboard',
  showSearch = true,
  showNotifications = true,
  notificationCount = 0,
  showUserMenu = true,
  navigationLinks,
  actions,
  showThemeToggle = true,
  showCTA = false,
  customLogo,
  className,
  onSearchSubmit,
  onNotificationClick,
  userMenuProps,
  onCTAClick,
  ctaText = "Get Early Access",
  onExitDemoClick,
  isAuthenticated = true,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { version } = useCurrentVersion()
  const { trackEvent } = useAnalytics()
  
  // Handle scroll effect for fixed variant
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);

    if (variant === 'fixed') {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [variant]);
  // Track menu toggle
  const handleMenuToggle = () => {
    const newState = !isMenuOpen
    setIsMenuOpen(newState)
    
    trackEvent({
      action: newState ? 'mobile_menu_open' : 'mobile_menu_close',
      category: 'navigation',
      label: variant
    })
  }
  
  // Track search submission
  const handleSearchSubmit = (query: string) => {
    if (onSearchSubmit) {
      onSearchSubmit(query)
    }
    
    trackEvent({
      action: 'search',
      category: 'engagement',
      label: query,
      variant: variant
    })
  }
  
  // Track notification click
  const handleNotificationClick = () => {
    if (onNotificationClick) {
      onNotificationClick()
    }
    
    trackEvent({
      action: 'notification_click',
      category: 'engagement',
      label: variant,
      count: notificationCount
    })
  }
  
  // Track CTA click
  const handleCTAClick = () => {
    if (onCTAClick) {
      onCTAClick()
    }
    
    trackEvent({
      action: 'cta_click',
      category: 'conversion',
      label: ctaText
    })
  }
  
  // Track demo exit click
  const handleExitDemoClick = () => {
    if (onExitDemoClick) {
      onExitDemoClick()
    }
    
    trackEvent({
      action: 'exit_demo_click',
      category: 'navigation',
      label: 'header'
    })
  }
  
  // Determine header class based on variant and scroll state
  const headerClass = `${styles.header} ${
    variant === 'fixed' ? (scrolled ? styles.headerScrolled : '') : ''
  } ${variant === 'landing' ? styles.headerLanding : ''} ${
    className || ''
  }`;
  
  // Add animation classes
  const mobileMenuAnimationClass = isMenuOpen ? styles.mobileMenuOpen : '';
  
  return (
    <header className={headerClass}>
      {/* Demo mode badge */}
          {variant === 'demo' && (
        <div className={styles.demoBadge}>
          <AlertTriangle className={styles.demoIcon} />
          <span>Demo Mode</span>
        </div>
          )}
          
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          {customLogo || (
            <Link href={`/${version}`} className={styles.logo}>
              <span className={styles.logoText}>
                <span className={styles.logoVeritas}>Veritas</span>
                <span className={styles.logoVault}>Vault</span>
                <span className={styles.logoDomain}>.net</span>
              </span>
            </Link>
          )}
          
          {/* Show navigation for dashboard and fixed variants */}
          {(variant === 'dashboard' || variant === 'fixed') && (
            <MainNavigation 
          version={version} 
              customLinks={navigationLinks}
              trackEvent={trackEvent}
        />
      )}
        </div>

        {/* Desktop actions */}
        <div className={styles.desktopActions}>
          {showSearch && variant !== 'landing' && (
            <SearchBar onSubmit={handleSearchSubmit} />
          )}
          
          {showNotifications && variant !== 'landing' && (
            <NotificationsButton 
              count={notificationCount} 
              onClick={handleNotificationClick} 
            />
          )}
          
          {showThemeToggle && <ThemeToggleEnhanced />}
          
          {/* Custom actions */}
          {actions}
          
          {/* CTA for fixed variant */}
          {variant === 'fixed' && showCTA && (
            <Button 
              className={styles.ctaButton}
              onClick={handleCTAClick}
            >
              {ctaText}
            </Button>
          )}
          
          {/* Exit Demo button for demo variant */}
          {variant === 'demo' && (
            <Button 
              variant="outline" 
              className={styles.exitDemoButton}
              onClick={handleExitDemoClick}
            >
              Exit Demo
            </Button>
          )}
          
          {/* User menu for authenticated views */}
          {showUserMenu && variant !== 'landing' && isAuthenticated && (
            <UserMenu 
              {...userMenuProps} 
              trackEvent={trackEvent}
            />
          )}
        </div>
        {/* Mobile actions */}
        <div className={styles.mobileActions}>
          {showThemeToggle && <ThemeToggleEnhanced />}
          
          {/* Demo exit button on mobile */}
          {variant === 'demo' && (
            <Button 
              variant="outline" 
              size="sm" 
              className={styles.exitDemoButtonMobile}
              onClick={handleExitDemoClick}
            >
              Exit
            </Button>
      )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleMenuToggle}
            className={styles.menuButton}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className={styles.iconButton} />
            ) : (
              <Menu className={styles.iconButton} />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <div className={`${styles.mobileMenuContainer} ${mobileMenuAnimationClass}`}>
        {isMenuOpen && (
          <MobileMenu 
            version={version} 
            setIsMenuOpen={setIsMenuOpen} 
            customLinks={navigationLinks}
            variant={variant}
            isAuthenticated={isAuthenticated}
            userMenuProps={{
              ...userMenuProps,
              trackEvent
            }}
            showSearch={showSearch}
            onSearchSubmit={handleSearchSubmit}
            trackEvent={trackEvent}
          />
        )}
      </div>
    </header>
  )
}