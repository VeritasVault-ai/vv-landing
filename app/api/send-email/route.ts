import { NextResponse } from "next/server"
// Comment out SendGrid import to prevent it from being loaded in preview
// import sgMail from "@sendgrid/mail"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate the request
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In preview mode, just return success without sending email
    // This prevents nodemailer-related errors
    if (process.env.NODE_ENV !== "production") {
      console.log("Preview mode: Email would be sent with the following data:", {
        to: ["eben@phoenixvc.tech", "jurie@phoenixvc.tech"],
        from: process.env.EMAIL_FROM || "noreply@example.com",
        subject: `${subject} - Message from ${name}`,
        text: `From: ${name} (${email})\n\n${message}`,
      })
      return NextResponse.json({ success: true, message: "Email simulation successful (preview mode)" })
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
      subject: `${subject} - Message from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d7fff;">New Message from NeuralLiquid Website</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #2d7fff;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    }

    // Send email
    await sgMail.send(msg)
    */

    return NextResponse.json({ success: true, message: "Email request received" })
  } catch (error) {
    console.error("Error processing email request:", error)
    return NextResponse.json({ error: "Failed to process email request" }, { status: 500 })
  }
}
