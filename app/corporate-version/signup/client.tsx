"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { COLOR_MODES, CORPORATE_VARIANTS, EXPERIENCE_TYPES } from "@/src/constants/theme"
import { RobustThemeProvider } from "@/src/context/RobustThemeProvider"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

/**
 * Client component for the Signup page
 */
export function SignupClient() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    terms: false,
    marketing: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Validate returnUrl to prevent open redirect vulnerabilities
  const rawReturnUrl = searchParams.get("returnUrl") || "/corporate-version/dashboard"
  const returnUrl = rawReturnUrl.startsWith("/") && !rawReturnUrl.startsWith("//") 
    ? rawReturnUrl 
    : "/corporate-version/dashboard"
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value
    }))
    
    // Clear error when field is edited
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }))
    }
  }
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    // Basic validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    if (!formData.company.trim()) newErrors.company = "Company name is required"
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(formData.password)) {
      newErrors.password = "Password must include uppercase, lowercase, number, and special character"
    }
    
    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    
    // Terms agreement
    if (!formData.terms) {
      newErrors.terms = "You must agree to the Terms of Service"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Actual API call implementation
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: formData.company,
          password: formData.password,
          marketingConsent: formData.marketing
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create account')
      }
      
      // Success - redirect to returnUrl
      toast({
        title: "Account created",
        description: "Your account has been successfully created.",
        variant: "success",
      })
      
      router.push(returnUrl)
    } catch (error) {
      console.error('Signup error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create account. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <RobustThemeProvider 
      defaultExperience={EXPERIENCE_TYPES.CORPORATE}
      defaultVariant={CORPORATE_VARIANTS.CORPORATE}
      defaultColorMode={COLOR_MODES.LIGHT}
    >
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col p-4 sm:p-10 lg:p-16 justify-center">
          <div className="mb-8">
            <Link href="/corporate-version" className="flex items-center gap-2">
              <Image 
                src="/logo.svg" 
                alt="VeritasVault Logo" 
                width={40} 
                height={40} 
              />
              <span className="text-xl font-bold">
                VeritasVault<span className="text-blue-600">Enterprise</span>
              </span>
            </Link>
          </div>
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Create your account</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Join VeritasVault Enterprise and start managing your institutional digital assets.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  placeholder="Enter your first name" 
                  required 
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500">{errors.firstName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Enter your last name" 
                  required 
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email address" 
                required 
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input 
                id="company" 
                placeholder="Enter your company name" 
                required 
                value={formData.company}
                onChange={handleChange}
                className={errors.company ? "border-red-500" : ""}
              />
              {errors.company && (
                <p className="text-xs text-red-500">{errors.company}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Create a secure password" 
                required 
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password ? (
                <p className="text-xs text-red-500">{errors.password}</p>
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Password must be at least 8 characters with uppercase, lowercase, number, and special character.
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm your password" 
                required 
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                required 
                checked={formData.terms}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, terms: checked === true }))
                }
              />
              <div>
                <Label 
                  htmlFor="terms" 
                  className="text-sm text-slate-700 dark:text-slate-300"
                >
                  I agree to the <Link href="/corporate-version/terms" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</Link> and <Link href="/corporate-version/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>.
                </Label>
                {errors.terms && (
                  <p className="text-xs text-red-500">{errors.terms}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="marketing" 
                checked={formData.marketing}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, marketing: checked === true }))
                }
              />
              <Label 
                htmlFor="marketing" 
                className="text-sm text-slate-700 dark:text-slate-300"
              >
               I agree to receive communications about VeritasVault products, services, and events. I can unsubscribe at any time. View our <Link href="/corporate-version/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>.  
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          
          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link 
              href={`/corporate-version/login?returnUrl=${encodeURIComponent(returnUrl)}`}
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
        
        {/* Right side - Image/Branding */}
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-900 to-blue-700 relative">
          <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-white">
            <div className="max-w-md text-center">
              <h2 className="text-3xl font-bold mb-6">Enterprise-grade liquidity management for digital assets</h2>
              <p className="text-lg mb-8 text-blue-100">
                Join leading institutions that trust VeritasVault Enterprise for secure, compliant, and efficient digital asset management.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Advanced Security</h3>
                  <p className="text-sm text-blue-100">Enterprise-grade security with multi-factor authentication and encryption.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Regulatory Compliance</h3>
                  <p className="text-sm text-blue-100">Built-in compliance tools for regulatory reporting and auditing.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Risk Management</h3>
                  <p className="text-sm text-blue-100">Real-time risk monitoring and advanced analytics.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="font-bold mb-2">24/7 Support</h3>
                  <p className="text-sm text-blue-100">Dedicated account management and round-the-clock technical support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RobustThemeProvider>
  )
}