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

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

interface MainNavigationProps {
  version: string;
  customLinks?: NavLink[];
}

export function MainNavigation({ version, customLinks }: MainNavigationProps) {
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
    }
  ];

  // Additional links for dropdown
  const dropdownLinks: NavLink[] = [
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
    <div className={styles.navigation}>
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={link.active ? styles.navLinkActive : styles.navLinkDefault}
        >
          {link.label}
        </Link>
      ))}

      {!customLinks && (
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
            {dropdownLinks.map((link, index) => (
              <DropdownMenuItem key={index} className={styles.dropdownItem}>
                <Link href={link.href} className={styles.dropdownLink}>
                  {link.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}