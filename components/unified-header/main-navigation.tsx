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
import { NavigationLink } from "./index"

import type { AnalyticsEvent } from "@/hooks/use-analytics"

interface MainNavigationProps {
  version: string;
  customLinks?: NavigationLink[];
  trackEvent?: (event: AnalyticsEvent) => void;
}

export function MainNavigation({ version, customLinks, trackEvent }: MainNavigationProps) {
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
    }
  ];

  // Additional links for dropdown
  const dropdownLinks: NavigationLink[] = [
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
    if (trackEvent) {
      trackEvent({
        action: "navigation_click",
        category: "navigation",
        label: label,
        destination: href
      });
    }
  };
  
  // Handle dropdown toggle
  const handleDropdownToggle = (open: boolean) => {
    if (trackEvent) {
      trackEvent({
        action: open ? "dropdown_open" : "dropdown_close",
        category: "navigation",
        label: "more_menu"
      });
    }
  };

  return (
    <div className={styles.navigation}>
      {links.map((link, index) => (
        <Link
          key={link.label}
          href={link.href}
          className={link.active ? styles.navLinkActive : styles.navLinkDefault}
          onClick={() => handleLinkClick(link.label, link.href)}
        >
          {link.label}
        </Link>
      ))}

      {!customLinks && (
        <DropdownMenu onOpenChange={handleDropdownToggle}>
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
              <DropdownMenuItem key={link.href} asChild className={styles.dropdownItem}>
                <Link
                  href={link.href}
                  className={styles.dropdownLink}
                  onClick={() => handleLinkClick(link.label, link.href)}
                >
                  {link.label}
                </Link>
              </DropdownMenuItem>
            ))}
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}