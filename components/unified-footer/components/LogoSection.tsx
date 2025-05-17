import { Logo } from "@/components/ui/logo"
import { Github, Linkedin, Twitter } from 'lucide-react'
import Link from "next/link"
import styles from "../unified-footer.module.css"

export interface LogoSectionProps {
  customLogo?: React.ReactNode;
  productName: string;
  productDescription: string;
  socialLinks: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    [key: string]: string | undefined;
  };
  version: string;
  handleSocialLinkClick: (platform: string) => void;
}

export function LogoSection({ 
  customLogo, 
  productName, 
  productDescription, 
  socialLinks,
  version,
  handleSocialLinkClick 
}: LogoSectionProps) {
  return (
    <div className={styles.logoSection}>
      {customLogo || (
        <Link href={`/${version}`} className={styles.logo}>
          <Logo className={styles.logoIcon} />
          <span className={styles.logoText}>{productName}</span>
        </Link>
      )}
      <p className={styles.productDescription}>
        {productDescription}
      </p>
      <div className={styles.socialLinks}>
        {socialLinks.twitter && (
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            onClick={() => handleSocialLinkClick("twitter")}
          >
            <span className="sr-only">Twitter</span>
            <Twitter className={styles.socialIcon} />
          </a>
        )}
        {socialLinks.github && (
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            onClick={() => handleSocialLinkClick("github")}
          >
            <span className="sr-only">GitHub</span>
            <Github className={styles.socialIcon} />
          </a>
        )}
        {socialLinks.linkedin && (
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            onClick={() => handleSocialLinkClick("linkedin")}
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin className={styles.socialIcon} />
          </a>
        )}
      </div>
    </div>
  )
}