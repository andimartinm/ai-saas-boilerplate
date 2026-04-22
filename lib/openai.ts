import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function generateChatCompletion(
  messages: ChatMessage[],
  options: {
    model?: string
    temperature?: number
    maxTokens?: number
  } = {}
) {
  const { model = 'gpt-4o-mini', temperature = 0.7, maxTokens = 1000 } = options

  try {
    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
    })

    return {
      success: true,
      content: response.choices[0]?.message?.content || '',
      usage: response.usage,
    }
  } catch (error) {
    console.error('OpenAI API Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export async function generateText(
  prompt: string,
  systemPrompt?: string
) {
  const messages: ChatMessage[] = []
  
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt })
  }
  
  messages.push({ role: 'user', content: prompt })

  return generateChatCompletion(messages)
}

export async function generateImage(
  prompt: string,
  options: {
    size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792'
    quality?: 'standard' | 'hd'
    n?: number
  } = {}
) {
  const { size = '1024x1024', quality = 'standard', n = 1 } = options

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size,
      quality,
      n,
    })

    return {
      success: true,
      images: response.data.map((img) => ({
        url: img.url,
        revisedPrompt: img.revised_prompt,
      })),
    }
  } catch (error) {
    console.error('OpenAI Image API Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export { openai }
