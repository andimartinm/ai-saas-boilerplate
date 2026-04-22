import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { prompt } = body

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // Imagen placeholder (puedes integrar Replicate/OpenAI después)
    const randomSeed = Math.floor(Math.random() * 1000)
    const imageUrl = `https://picsum.photos/seed/${randomSeed}/1024/1024`

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}