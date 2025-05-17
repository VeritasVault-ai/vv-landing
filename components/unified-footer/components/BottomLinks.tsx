import Link from "next/link"
import styles from "../unified-footer.module.css"

export interface BottomLinksProps {
  version: string;
  trackEvent: (event: any) => void;
}

export function BottomLinks({ 
  version, 
  trackEvent 
}: BottomLinksProps) {
  return (
    <div className={styles.bottomLinks}>
      <Link 
        href={`/${version}/privacy`} 
        className={styles.bottomLink}
        onClick={() => trackEvent({
          action: "footer_link_click",
          category: "navigation",
          label: "privacy"
        })}
      >
        Privacy
      </Link>
      <Link 
        href={`/${version}/terms`} 
        className={styles.bottomLink}
        onClick={() => trackEvent({
          action: "footer_link_click",
          category: "navigation",
          label: "terms"
        })}
      >
        Terms
      </Link>
      <Link 
        href={`/${version}/cookies`} 
        className={styles.bottomLink}
        onClick={() => trackEvent({
          action: "footer_link_click",
          category: "navigation",
          label: "cookies"
        })}
      >
        Cookies
      </Link>
    </div>
  )
}