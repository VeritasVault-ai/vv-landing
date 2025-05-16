import { WarningBannerProps } from "./protocol-allocation.types";
import styles from "./protocol-allocation.module.css";

/**
 * Displays a warning banner with a message
 */
export function WarningBanner({ message }: WarningBannerProps) {
  return (
    <div className={styles.warningBanner}>
      <p className={styles.warningText}>{message}</p>
    </div>
  );
}