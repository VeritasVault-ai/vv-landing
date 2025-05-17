import { Mail, MapPin } from 'lucide-react'
import styles from "../unified-footer.module.css"

export interface ContactSectionProps {
  contactInfo: {
    email?: string;
    address?: string;
  };
  trackEvent: (event: any) => void;
}

export function ContactSection({ 
  contactInfo, 
  trackEvent 
}: ContactSectionProps) {
  return (
    <div className={styles.contactSection}>
      <h3 className={styles.contactTitle}>Contact</h3>
      <ul className={styles.contactList}>
        {contactInfo.email && (
          <li className={styles.contactItem}>
            <Mail className={styles.contactIcon} />
            <div>
              <a 
                href={`mailto:${contactInfo.email}`} 
                className={styles.contactLink}
                onClick={() => trackEvent({
                  action: "contact_click",
                  category: "engagement",
                  label: "email"
                })}
              >
                {contactInfo.email}
              </a>
            </div>
          </li>
        )}
        {contactInfo.address && (
          <li className={styles.contactItem}>
            <MapPin className={styles.contactIcon} />
            <div className={styles.contactText}>
              {contactInfo.address.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}