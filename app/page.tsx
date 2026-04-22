import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, Shield, Code2, Bot, CreditCard, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'

const features = [
  {
    icon: Bot,
    title: 'AI Ready',
    description: 'OpenAI, Claude, and Replicate pre-configured. Start generating content in minutes.',
  },
  {
    icon: Shield,
    title: 'Authentication',
    description: 'Clerk integration with OAuth support. Secure and production-ready.',
  },
  {
    icon: CreditCard,
    title: 'Payments',
    description: 'Stripe checkout and subscriptions. Start monetizing immediately.',
  },
  {
    icon: Database,
    title: 'Database',
    description: 'Supabase with Row Level Security. Your data, secure and scalable.',
  },
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'TypeScript, ESLint, and Prettier configured. Professional codebase.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Next.js 14 with App Router. Optimized for performance.',
  },
]

const aiExamples = [
  {
    title: 'AI Chat',
    description: 'Conversational AI powered by GPT-4 and Claude',
  },
  {
    title: 'Text Generator',
    description: 'Generate marketing copy, emails, and more',
  },
  {
    title: 'Image Generator',
    description: 'Create images with DALL-E and Stable Diffusion',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">AI SaaS Starter</span>
          </div>
          <nav className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            </SignedIn>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Launch your AI app in hours, not weeks</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Build AI-Powered Apps
            <br />
            <span className="gradient-text">Faster Than Ever</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A production-ready Next.js boilerplate with AI integrations, authentication,
            payments, and database. Everything you need to launch your AI SaaS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <Link href="/sign-up">
                <Button size="lg" className="gap-2">
                  Start Building <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Go to Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </SignedIn>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Examples Preview */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            AI Features Ready to Use
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {aiExamples.map((example, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-lg mb-2">{example.title}</h3>
                <p className="text-muted-foreground">{example.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Stop spending weeks on boilerplate code. Focus on what makes your product unique.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all hover:border-primary/50"
              >
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-blue-600 p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Your AI App?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Get started today and launch your AI SaaS in record time.
              No configuration needed.
            </p>
            <SignedOut>
              <Link href="/sign-up">
                <Button size="lg" variant="secondary" className="gap-2">
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="gap-2">
                  Go to Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-semibold">AI SaaS Starter</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI SaaS Starter. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
