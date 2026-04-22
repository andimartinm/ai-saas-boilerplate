import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Sparkles, Bot, FileText, Image as ImageIcon } from 'lucide-react'

const VERSION = 'v1.0.0'

export default function DashboardPage() {
  const features = [
    {
      icon: Bot,
      title: 'AI Chat',
      description: 'Chat with Llama 3.1 powered by Groq',
      href: '/dashboard/chat',
      comingSoon: false,
    },
    {
      icon: FileText,
      title: 'Text Generator',
      description: 'Generate marketing copy, emails, and more',
      href: '/dashboard/generate',
      comingSoon: true,
    },
    {
      icon: ImageIcon,
      title: 'Image Generator',
      description: 'Create images with AI',
      href: '/dashboard/image',
      comingSoon: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">AI SaaS Starter</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main className="container py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Choose an AI tool to get started.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.comingSoon ? '#' : feature.href}
              className={`p-6 rounded-lg border bg-card hover:shadow-lg transition-all hover:border-primary/50 relative ${
                feature.comingSoon ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
              }`}
            >
              {feature.comingSoon && (
                <span className="absolute top-4 right-4 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  Coming Soon
                </span>
              )}
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-lg border bg-muted/50">
          <h2 className="font-semibold mb-4">Your Usage</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-sm text-muted-foreground">AI Requests</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">Free</p>
              <p className="text-sm text-muted-foreground">Plan</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">∞</p>
              <p className="text-sm text-muted-foreground">Remaining</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-4 px-4 border-t">
        <div className="container flex items-center justify-end">
          <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
            {VERSION}
          </span>
        </div>
      </footer>
    </div>
  )
}
