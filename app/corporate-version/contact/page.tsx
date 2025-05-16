import { Metadata } from "next"
import { ContactClient } from "./client"

export const metadata: Metadata = {
  title: "Contact Us | VeritasVault Enterprise",
  description: "Get in touch with our team to learn more about our enterprise treasury solutions.",
}

/**
 * Contact page for the corporate version
 */
export default function ContactPage() {
  return <ContactClient />
}