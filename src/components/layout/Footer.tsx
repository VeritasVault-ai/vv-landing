// src/components/layout/Footer.tsx
'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FooterNavigation } from '@/lib/navigation'
import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

export interface FooterProps {
  brand: { name: string; description: string }
  nav: FooterNavigation
  subscribeApi?: string
}

/**
 * Renders a responsive footer with brand information, navigation links, social media icons, and an optional newsletter subscription form.
 *
 * @param brand - Contains the brand's name and description to display.
 * @param nav - Navigation structure including sections and social media links.
 * @param subscribeApi - Optional API endpoint URL for newsletter subscriptions; if provided, a subscription form is shown.
 *
 * @returns The footer JSX element.
 *
 * @remark The subscription form validates email format and displays success or error messages based on the API response.
 */
export function Footer({ brand, nav, subscribeApi }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subscribeApi) return
    setStatus('loading')
    setError('')
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!valid) {
      setError('Invalid email')
      setStatus('error')
      return
    }
    try {
      const res = await fetch(subscribeApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      setEmail('')
    } catch (err) {
      console.error('Subscribe error', err)
      setError('Subscription failed')
      setStatus('error')
    }
  }

  const renderIcon = (icon?: string) => {
    switch (icon) {
      case 'github': return <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
      case 'twitter': return <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
      case 'linkedin': return <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
      default: return null
    }
  }

  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm mt-auto">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div className="space-y-4 max-w-sm">
            <h3 className="font-bold">{brand.name}</h3>
            <p className="text-sm text-muted-foreground">{brand.description}</p>
          </div>
          {subscribeApi && (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
              <h3 className="font-bold">Subscribe to our newsletter</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={status==='loading'}
                  required
                  className="max-w-xs"
                />
                <Button type="submit" disabled={status==='loading'}>
                  {status==='loading' ? 'Submitting...' : 'Subscribe'}
                </Button>
              </div>
              {status==='error' && <p className="text-sm text-red-600">{error}</p>}
              {status==='success' && <p className="text-sm text-green-600">Subscribed!</p>}
            </form>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {Object.entries(nav).map(([section, items]) => (
            <div key={section}>
              <h3 className="mb-4 text-lg font-semibold capitalize">{section}</h3>
              <ul className="space-y-2 text-sm">
                {items?.map(item => (
                  <li key={item.href||item.title}>
                    <Link href={item.href||'#'} className="text-muted-foreground hover:text-foreground">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t">
          <p className="text-sm text-muted-foreground">© {currentYear} {brand.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {nav.social?.map(item => (
              <Link key={item.href||item.title} href={item.href||'#'} target={item.isExternal?'_blank':undefined} rel={item.isExternal?'noopener noreferrer':undefined}>
                {renderIcon(item.icon)}<span className="sr-only">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}