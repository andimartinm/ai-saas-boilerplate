'use client'

import { useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Sparkles, ArrowLeft, Image as ImageIcon, Loader2, Download } from 'lucide-react'

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateImage = async () => {
    if (!prompt.trim() || loading) return

    setLoading(true)
    setError(null)
    setImageUrl(null)

    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (data.success) {
        setImageUrl(data.imageUrl)
      } else {
        setError(data.error || 'Failed to generate image')
      }
    } catch (err) {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const examplePrompts = [
    'A futuristic city at sunset',
    'A cute robot painting',
    'Mountain landscape with lake',
    'Abstract colorful art',
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Image Generator</span>
            </div>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <main className="container max-w-4xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Generate AI Images</h1>
          <p className="text-muted-foreground mt-2">Describe the image you want to create.</p>
        </div>

        <div className="space-y-4 mb-8">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your image..."
            className="w-full h-32 px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            disabled={loading}
          />
          
          <button
            onClick={generateImage}
            disabled={loading || !prompt.trim()}
            className="w-full h-12 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2 font-medium"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <ImageIcon className="h-4 w-4" />
                Generate Image
              </>
            )}
          </button>
        </div>

        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-3">Try these:</p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((example, i) => (
              <button
                key={i}
                onClick={() => setPrompt(example)}
                className="px-3 py-1.5 text-sm rounded-full border hover:bg-muted transition-colors"
                disabled={loading}
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-red-800 text-sm">
            {error}
          </div>
        )}

        {imageUrl && (
          <div className="space-y-4">
            <img src={imageUrl} alt="Generated" className="w-full rounded-lg border" />
            <a
              href={imageUrl}
              download
              className="w-full h-12 rounded-lg border bg-muted hover:bg-muted/80 flex items-center justify-center gap-2 font-medium"
            >
              <Download className="h-4 w-4" />
              Download Image
            </a>
          </div>
        )}
      </main>
    </div>
  )
}