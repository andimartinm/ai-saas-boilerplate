import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI SaaS Starter - Launch your AI app in hours',
  description: 'Next.js boilerplate with AI integrations, authentication, payments, and more. Start building your AI SaaS today.',
  keywords: ['Next.js', 'AI', 'SaaS', 'Boilerplate', 'Starter Kit', 'OpenAI', 'Claude'],
  authors: [{ name: 'AI SaaS Starter' }],
  creator: 'AI SaaS Starter',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'AI SaaS Starter - Launch your AI app in hours',
    description: 'Next.js boilerplate with AI integrations, authentication, payments, and more.',
    siteName: 'AI SaaS Starter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI SaaS Starter - Launch your AI app in hours',
    description: 'Next.js boilerplate with AI integrations, authentication, payments, and more.',
    creator: '@yourtwitter',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
