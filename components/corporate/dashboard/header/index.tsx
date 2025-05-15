"use client"

import { useState } from "react"
import { useCurrentVersion } from "@/hooks/use-current-version"
import { MainNavigation } from "./main-navigation"
import { MobileMenu } from "./mobile-menu"
import { UserMenu } from "./user-menu"
import { SearchBar } from "./search-bar"
import { NotificationsButton } from "./notifications-button"
import { ThemeToggleEnhanced } from "@/components/theme-toggle-enhanced"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import styles from "./header.module.css"

export function CorporateDashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { version } = useCurrentVersion()

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Link href={`/${version}`} className={styles.logo}>
            <span className={styles.logoText}>
              <span className={styles.logoVeritas}>Veritas</span>
              <span className={styles.logoVault}>Vault</span>
              <span className={styles.logoDomain}>.net</span>
            </span>
          </Link>

          <MainNavigation version={version} />
        </div>

        <div className={styles.desktopActions}>
          <SearchBar />
          <NotificationsButton count={3} />
          <ThemeToggleEnhanced />
          <UserMenu />
        </div>

        <div className={styles.mobileActions}>
          <ThemeToggleEnhanced />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className={styles.iconButton} /> : <Menu className={styles.iconButton} />}
          </Button>
        </div>
      </div>

      {isMenuOpen && <MobileMenu version={version} setIsMenuOpen={setIsMenuOpen} />}
    </header>
  )
}