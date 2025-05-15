"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HelpCircle, LogOut, Search, Settings, User } from "lucide-react"
import { Dispatch, SetStateAction } from "react"
import styles from "./mobile-menu.module.css"
import { SearchBar } from "./search-bar"

interface MobileMenuProps {
  version: string
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}

export function MobileMenu({ version, setIsMenuOpen }: MobileMenuProps) {
  return (
    <div className={styles.mobileMenu}>
      <div className={styles.mobileMenuContainer}>
        <SearchBar />

        <nav className={styles.navMenu}>
          <Link
            href={`/${version}/dashboard`}
            className={styles.navLinkActive}
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href={`/${version}/portfolio`}
            className={styles.navLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link
            href={`/${version}/strategies`}
            className={styles.navLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Strategies
          </Link>
          <Link
            href={`/${version}/analytics`}
            className={styles.navLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Analytics
          </Link>
          <Link
            href={`/${version}/compliance`}
            className={styles.navLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Compliance
          </Link>
          <Link
            href={`/${version}/reports`}
            className={styles.navLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Reports
          </Link>
          <Link
            href={`/${version}/settings`}
            className={styles.navLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Settings
          </Link>
        </nav>

        <MobileUserProfile setIsMenuOpen={setIsMenuOpen} />
      </div>
    </div>
  )
}

interface MobileUserProfileProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
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