export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterLinkGroup = {
  title: string;
  links: FooterLink[];
};

export interface FooterProps {
  /**
   * The type of footer to render
   * - 'landing': Simple footer for landing pages
   * - 'dashboard': Compact footer for the dashboard
   * - 'demo': Footer for demo mode with badge
   */
  variant?: 'landing' | 'dashboard' | 'demo';

  /**
   * The product experience
   * - 'standard': Standard product experience
   * - 'corporate': Corporate product experience
   */
  experience?: 'standard' | 'corporate';
  
  /**
   * Whether to show the newsletter signup form
   */
  showNewsletter?: boolean;
  
  /**
   * Custom logo component
   */
  customLogo?: React.ReactNode;
  
  /**
   * Custom product name
   */
  productName?: string;

  /**
   * Custom product description
   */
  productDescription?: string;
  /**
   * Custom link groups to override defaults
   */
  linkGroups?: FooterLinkGroup[];
  
  /**
   * Custom social media links
   */
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    [key: string]: string | undefined;
  };
  
  /**
   * Custom contact information
   */
  contactInfo?: {
    email?: string;
    address?: string;
  };
  
  /**
   * Whether to show the demo mode badge
   */
  showDemoBadge?: boolean;
  
  /**
   * Callback for when the newsletter form is submitted
   */
  onNewsletterSubmit?: (email: string) => void;
  
  /**
   * Custom CSS class for the footer
   */
  className?: string;
  
  /**
   * Whether the user is authenticated
   */
  isAuthenticated?: boolean;
}