import Link from "next/link"
import styles from "../unified-footer.module.css"
import { FooterLinkGroup } from "../types"

export interface LinkGroupsProps {
  linkGroups: FooterLinkGroup[];
  trackEvent: (event: { action: string; category: string; label: string }) => void;
}

export function LinkGroups({ 
  linkGroups, 
  trackEvent 
}: LinkGroupsProps) {
  return (
    <>
      {linkGroups.map((group) => (
        <div key={group.title} className={styles.linkGroup}>
          <h3 className={styles.linkGroupTitle}>{group.title}</h3>
          <ul className={styles.linkList}>
            {group.links.map((link) => (
              <li key={`${group.title}-${link.label}`}>
                {link.external ? (
                  <a 
                    href={link.href} 
                    className={styles.footerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent({
                      action: "footer_link_click",
                      category: "navigation",
                      label: `${group.title}:${link.label}`
                    })}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link 
                    href={link.href} 
                    className={styles.footerLink}
                    onClick={() => trackEvent({
                      action: "footer_link_click",
                      category: "navigation",
                      label: `${group.title}:${link.label}`
                    })}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}