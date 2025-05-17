"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HelpCircle, LogOut, Settings, User, AlertTriangle } from "lucide-react"
import { Dispatch, SetStateAction } from "react"
import styles from "./mobile-menu.module.css"
import { SearchBar } from "./search-bar"

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

interface MobileMenuProps {
  version: string;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  customLinks?: NavLink[];
  variant?: 'landing' | 'dashboard' | 'demo' | 'fixed';
}

export function MobileMenu({ version, setIsMenuOpen, customLinks, variant = 'dashboard' }: MobileMenuProps) {
  // Default navigation links if no custom links are provided
  const defaultLinks: NavLink[] = [
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

  return (
    <div className={styles.mobileMenu}>
      <div className={styles.mobileMenuContainer}>
        {variant !== 'landing' && <SearchBar />}

        {variant === 'demo' && (
          <div className={styles.demoModeNotice}>
            <AlertTriangle className={styles.demoIcon} />
            <span>You are currently in Demo Mode</span>
          </div>
        )}

        <nav className={styles.navMenu}>
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={link.active ? styles.navLinkActive : styles.navLink}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          {variant === 'demo' && (
            <Button
              variant="outline"
              className={styles.exitDemoButton}
              onClick={() => setIsMenuOpen(false)}
            >
              Exit Demo Mode
            </Button>
          )}
        </nav>

        {variant !== 'landing' && <MobileUserProfile setIsMenuOpen={setIsMenuOpen} />}
      </div>
    </div>
  )
}

interface MobileUserProfileProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

function MobileUserProfile({ setIsMenuOpen }: MobileUserProfileProps) {
  return (
    <div className={styles.userProfileSection}>
      <div className={styles.userProfileHeader}>
        <div className={styles.userAvatar}>
          IT
        </div>
        <div className={styles.userInfo}>
          <p className={styles.userName}>Institutional Treasury</p>
          <p className={styles.userRole}>Enterprise Account</p>
        </div>
      </div>

      <div className={styles.userActions}>
        <Button
          variant="ghost"
          className={styles.actionButton}
          onClick={() => setIsMenuOpen(false)}
        >
          <User className={styles.actionIcon} />
          <span>Profile</span>
        </Button>
        <Button
          variant="ghost"
          className={styles.actionButton}
          onClick={() => setIsMenuOpen(false)}
        >
          <Settings className={styles.actionIcon} />
          <span>Settings</span>
        </Button>
        <Button
          variant="ghost"
          className={styles.actionButton}
          onClick={() => setIsMenuOpen(false)}
        >
          <HelpCircle className={styles.actionIcon} />
          <span>Help & Support</span>
        </Button>
        <Button
          variant="ghost"
          className={styles.actionButtonDanger}
          onClick={() => setIsMenuOpen(false)}
        >
          <LogOut className={styles.actionIcon} />
          <span>Log out</span>
        </Button>
      </div>
    </div>
  )
}