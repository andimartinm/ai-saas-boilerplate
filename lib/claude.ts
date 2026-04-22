import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export interface ClaudeMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function generateClaudeCompletion(
  messages: ClaudeMessage[],
  options: {
    model?: string
    systemPrompt?: string
    temperature?: number
    maxTokens?: number
  } = {}
) {
  const {
    model = 'claude-3-5-sonnet-20241022',
    systemPrompt,
    temperature = 0.7,
    maxTokens = 1000,
  } = options

  try {
    const response = await anthropic.messages.create({
      model,
      max_tokens: maxTokens,
      temperature,
      system: systemPrompt,
      messages,
    })

    const textContent = response.content
      .filter((block) => block.type === 'text')
      .map((block) => (block as { type: 'text'; text: string }).text)
      .join('')

    return {
      success: true,
      content: textContent,
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      },
    }
  } catch (error) {
    console.error('Claude API Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export async function generateClaudeText(
  prompt: string,
  systemPrompt?: string
) {
  return generateClaudeCompletion(
    [{ role: 'user', content: prompt }],
    { systemPrompt }
  )
}

export async function analyzeWithClaude(
  text: string,
  analysisType: 'sentiment' | 'summary' | 'keywords' | 'custom',
  customPrompt?: string
) {
  const systemPrompts = {
    sentiment: 'You are a sentiment analysis expert. Analyze the sentiment of the text and provide a rating from -1 (very negative) to 1 (very positive), along with a brief explanation.',
    summary: 'You are a summarization expert. Provide a concise summary of the text, highlighting the key points.',
    keywords: 'You are a keyword extraction expert. Extract the most important keywords and phrases from the text.',
    custom: customPrompt || 'You are a helpful assistant.',
  }

  return generateClaudeCompletion(
    [{ role: 'user', content: text }],
    { systemPrompt: systemPrompts[analysisType] }
  )
}

export { anthropic }
