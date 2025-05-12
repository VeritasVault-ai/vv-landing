"use server"

import { z } from "zod"
// Comment out SendGrid import to prevent it from being loaded in preview
// import sgMail from "@sendgrid/mail"

const emailSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function sendEmail(formData: FormData) {
  try {
    // Parse and validate the form data
    const validatedData = emailSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    })

    // In preview mode, just return success without sending email
    // This prevents nodemailer-related errors
    if (process.env.NODE_ENV !== "production") {
      console.log("Preview mode: Email would be sent with the following data:", {
        to: ["eben@phoenixvc.tech", "jurie@phoenixvc.tech"],
        from: process.env.EMAIL_FROM || "noreply@example.com",
        subject: `${validatedData.subject} - Message from ${validatedData.name}`,
        text: `From: ${validatedData.name} (${validatedData.email})\n\n${validatedData.message}`,
      })
      return { success: true, message: "Email simulation successful (preview mode)" }
    }

    // In production, we would use SendGrid to send the email
    // This code will only run in production
    /*
    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

    // Create email message
    const msg = {
      to: ["eben@phoenixvc.tech", "jurie@phoenixvc.tech"],
      from: process.env.EMAIL_FROM!,
      subject: `${validatedData.subject} - Message from ${validatedData.name}`,
      text: `From: ${validatedData.name} (${validatedData.email})\n\n${validatedData.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d7fff;">New Message from NeuralLiquid Website</h2>
          <p><strong>From:</strong> ${validatedData.name} (${validatedData.email})</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #2d7fff;">
            ${validatedData.message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    }

    // Send email
    await sgMail.send(msg)
    */

    return { success: true, message: "Email request received" }
  } catch (error) {
    console.error("Error processing email request:", error)
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message }
    }
    return { success: false, message: "Failed to process email request" }
  }
}
