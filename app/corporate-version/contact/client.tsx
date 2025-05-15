"use client"

import { useState } from "react"
import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { CorporateHeader } from "@/components/corporate/corporate-header"
import { CorporateFooter } from "@/components/corporate/corporate-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle } from "lucide-react"

/**
 * Client component for the Contact page
 */
export function ContactClient() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "",
    message: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSelectChange = (value: string) => {
    setFormState({
      ...formState,
      inquiryType: value
    })
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }
  
  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <div className="min-h-screen flex flex-col">
        <CorporateHeader />
        
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  Contact Our Team
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Have questions about our enterprise treasury solutions? Our team is here to help.
                </p>
              </div>
              
              {isSubmitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Thank you for contacting us!
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    We've received your message and will get back to you within 24 hours.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Smith"
                        value={formState.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Acme Corp"
                        value={formState.company}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="inquiryType" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Inquiry Type
                      </label>
                      <Select
                        value={formState.inquiryType}
                        onValueChange={handleSelectChange}
                      >
                        <SelectTrigger id="inquiryType">
                          <SelectValue placeholder="Select an inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="demo">Request Demo</SelectItem>
                          <SelectItem value="pricing">Pricing Information</SelectItem>
                          <SelectItem value="technical">Technical Questions</SelectItem>
                          <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please describe how we can help you..."
                      rows={6}
                      value={formState.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              )}
              
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    Sales Inquiries
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-1">
                    sales@veritasvault.net
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    +1 (555) 123-4567
                  </p>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    Support
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-1">
                    support@veritasvault.net
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    +1 (555) 987-6543
                  </p>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    Headquarters
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    123 Blockchain Avenue<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <CorporateFooter />
      </div>
    </RobustThemeProvider>
  )
}