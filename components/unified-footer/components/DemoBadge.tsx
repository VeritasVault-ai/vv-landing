import { AlertTriangle } from 'lucide-react'
import styles from "../unified-footer.module.css"

export function DemoBadge() {
  return (
    <div className={styles.demoBadge}>
      <AlertTriangle className={styles.demoIcon} />
      <span>Demo Mode</span>
    </div>
  )
}