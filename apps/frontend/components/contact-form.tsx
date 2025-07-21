"use client"

import type React from "react"

import { useState } from "react"
import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Send, Loader2 } from "lucide-react"
import { sendEmail } from "@/app/actions/send-email"

const initialState = {
  success: false,
  message: "",
}

export function ContactForm() {
  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const result = await sendEmail(formData)
    if (result.success) {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })
      // Reset the form
      const form = document.getElementById("contact-form") as HTMLFormElement
      form?.reset()
    } else {
      toast({
        title: "Error",
        description: result.message || "Failed to send message. Please try again.",
        variant: "destructive",
      })
    }
    return result
  }, initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    // The form will be handled by the formAction
    // This is just to show a loading state
    setTimeout(() => {
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <form id="contact-form" action={formAction} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <Input id="name" name="name" required placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <Input id="email" name="email" type="email" required placeholder="your.email@example.com" />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-foreground">
          Subject
        </label>
        <Input id="subject" name="subject" required placeholder="Message subject" />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <Textarea id="message" name="message" required placeholder="Your message" rows={6} />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" /> Send Message
          </>
        )}
      </Button>
    </form>
  )
}
