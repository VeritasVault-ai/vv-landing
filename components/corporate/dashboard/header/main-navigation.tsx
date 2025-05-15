"use client"

import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import styles from "./main-navigation.module.css"

interface MainNavigationProps {
  version: string
}

export function MainNavigation({ version }: MainNavigationProps) {
  return (
    <div className={styles.navigation}>
      <Link
        href={`/${version}/dashboard`}
        className={styles.navLinkActive}
      >
        Dashboard
      </Link>
      <Link
        href={`/${version}/portfolio`}
        className={styles.navLinkDefault}
      >
        Portfolio
      </Link>
      <Link
        href={`/${version}/strategies`}
        className={styles.navLinkDefault}
      >
        Strategies
      </Link>
      <Link
        href={`/${version}/analytics`}
        className={styles.navLinkDefault}
      >
        Analytics
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={styles.moreButton}>
            More
            <ChevronDown className={styles.chevronIcon} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className={styles.dropdownContent}
        >
          <DropdownMenuItem className={styles.dropdownItem}>
            <Link href={`/${version}/compliance`} className={styles.dropdownLink}>
              Compliance
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={styles.dropdownItem}>
            <Link href={`/${version}/reports`} className={styles.dropdownLink}>
              Reports
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={styles.dropdownItem}>
            <Link href={`/${version}/settings`} className={styles.dropdownLink}>
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}