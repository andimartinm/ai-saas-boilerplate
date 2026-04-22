'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, Check, Loader2 } from 'lucide-react'
import { SignInButton, useUser } from '@clerk/nextjs'

export default function PricingPage() {
  const { isSignedIn, user } = useUser()
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!isSignedIn) return

    setLoading(true)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const features = [
    'Unlimited AI Chat',
    'Image Generation',
    'Priority Support',
    'Access to all features',
    'No rate limits',
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">AI SaaS Starter</span>
          </Link>
          <Link href="/dashboard" className="text-sm hover:text-primary">
            Dashboard
          </Link>
        </div>
      </header>

      <main className="container py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple Pricing</h1>
          <p className="text-xl text-muted-foreground">Start building today</p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="rounded-2xl border bg-card p-8 shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Pro Plan</h2>
              <div className="flex items-center justify-center gap-1">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {isSignedIn ? (
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full h-12 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2 font-medium"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Subscribe Now'
                )}
              </button>
            ) : (
              <SignInButton mode="modal">
                <button className="w-full h-12 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                  Sign In to Subscribe
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}