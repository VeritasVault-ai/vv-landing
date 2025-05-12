import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact Us | NeuralLiquid",
  description: "Get in touch with the NeuralLiquid team",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          Have questions or want to learn more about NeuralLiquid? Get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-semibold">Send us a message</h2>
          <ContactForm />
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-semibold">Contact Information</h2>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-medium">Email</h3>
              <p className="text-muted-foreground">
                <a href="mailto:info@phoenixvc.tech" className="text-primary hover:underline">
                  info@phoenixvc.tech
                </a>
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium">Address</h3>
              <p className="text-muted-foreground">
                Phoenix Venture Capital
                <br />
                Innovation Hub
                <br />
                Cape Town, South Africa
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium">Working Hours</h3>
              <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
