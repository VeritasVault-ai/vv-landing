import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'
import styles from "../unified-footer.module.css"

export interface NewsletterSectionProps {
  email: string;
  setEmail: (email: string) => void;
  handleNewsletterSubmit: (e: React.FormEvent) => void;
}

export function NewsletterSection({ 
  email, 
  setEmail, 
  handleNewsletterSubmit 
}: NewsletterSectionProps) {
  return (
    <div className={styles.newsletterSection}>
      <h3 className={styles.newsletterTitle}>Stay Updated</h3>
      <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
        <Input 
          type="email" 
          placeholder="Enter your email" 
          className={styles.newsletterInput} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <Button type="submit" size="icon" className={styles.newsletterButton}>
          <Send className={styles.newsletterIcon} />
          <span className="sr-only">Subscribe</span>
        </Button>
      </form>
    </div>
  )
}