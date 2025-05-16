import { WarningBannerProps } from "./protocol-allocation.types";
import styles from "./protocol-allocation.module.css";

/**
 * Renders a styled banner displaying a warning message.
 *
 * @param message - The warning text to display in the banner.
 */
export function WarningBanner({ message }: WarningBannerProps) {
  return (
    <div className={styles.warningBanner}>
      <p className={styles.warningText}>{message}</p>
    </div>
  );
}