"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, Loader2 } from "lucide-react"

/**
 * Demo request form that redirects to the dashboard
 */
export function DemoForm() {
  const router = useRouter()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    jobTitle: "",
    companySize: "",
    interests: [] as string[],
    message: "",
    consent: false
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setFormState({
      ...formState,
      [name]: value
    })
  }
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormState({
      ...formState,
      [name]: checked
    })
  }
  
  const handleInterestToggle = (interest: string) => {
    const interests = formState.interests.includes(interest)
      ? formState.interests.filter(i => i !== interest)
      : [...formState.interests, interest]
    
    setFormState({
      ...formState,
      interests
    })
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setStep(2) // Move to success step
    
    // After 2 seconds, redirect to dashboard
    setTimeout(() => {
      router.push('/corporate-version/dashboard')
    }, 2000)
  }
  
  const interests = [
    "Treasury Management",
    "Portfolio Optimization",
    "Risk Analysis",
    "Compliance Solutions",
    "Multi-chain Integration",
    "Reporting & Analytics"
  ]
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      {step === 1 ? (
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Full Name*
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
                Work Email*
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@company.com"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Company Name*
              </label>
              <Input
                id="company"
                name="company"
                placeholder="Acme Corporation"
                value={formState.company}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="jobTitle" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Job Title*
              </label>
              <Input
                id="jobTitle"
                name="jobTitle"
                placeholder="CFO, Treasury Manager, etc."
                value={formState.jobTitle}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <label htmlFor="companySize" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Company Size*
            </label>
            <Select
              value={formState.companySize}
              onValueChange={(value) => handleSelectChange("companySize", value)}
            >
              <SelectTrigger id="companySize">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-50">1-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201-500">201-500 employees</SelectItem>
                <SelectItem value="501-1000">501-1000 employees</SelectItem>
                <SelectItem value="1001+">1001+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3 mb-6">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Areas of Interest* (Select all that apply)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {interests.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox 
                    id={interest.toLowerCase().replace(/\s+/g, '-')}
                    checked={formState.interests.includes(interest)}
                    onCheckedChange={(checked) => {
                      if (checked !== 'indeterminate') {
                        handleInterestToggle(interest)
                      }
                    }}
                  />
                  <label 
                    htmlFor={interest.toLowerCase().replace(/\s+/g, '-')}
                    className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    {interest}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Specific Requirements (Optional)
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your specific requirements or questions..."
              rows={3}
              value={formState.message}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex items-start space-x-2 mb-8">
            <Checkbox 
              id="consent"
              checked={formState.consent}
              onCheckedChange={(checked) => {
                if (checked !== 'indeterminate') {
                  handleCheckboxChange('consent', checked)
                }
              }}
              required
            />
            <label 
              htmlFor="consent"
              className="text-sm text-slate-700 dark:text-slate-300"
            >
              I agree to receive communications about VeritasVault products, services, and events. I can unsubscribe at any time. View our <a href="/corporate-version/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>.
            </label>
          </div>
          
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              disabled={isSubmitting || !formState.consent || formState.interests.length === 0}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Access Demo"
              )}
            </Button>
          </div>
        </form>
      ) : (
        <div className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Thank You!
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
            Your demo access is being prepared...
          </p>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            You'll be redirected to our interactive dashboard momentarily.
          </p>
          <div className="w-16 h-1 bg-blue-600 mx-auto animate-pulse"></div>
        </div>
      )}
    </div>
  )
}