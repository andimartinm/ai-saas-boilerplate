import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for browser (uses RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Types for our database
export interface User {
  id: string
  email: string
  clerk_id: string
  subscription_status: 'free' | 'pro' | 'enterprise'
  stripe_customer_id?: string
  stripe_subscription_id?: string
  created_at: string
  updated_at: string
}

export interface UsageLog {
  id: string
  user_id: string
  feature: string
  tokens_used?: number
  metadata?: Record<string, unknown>
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id: string
  stripe_price_id: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  current_period_start: string
  current_period_end: string
  created_at: string
  updated_at: string
}

// Helper functions
export async function getUserByClerkId(clerkId: string) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('clerk_id', clerkId)
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, user: data as User }
}

export async function createUser(userData: Partial<User>) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .insert(userData)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, user: data as User }
}

export async function updateUserSubscription(
  clerkId: string,
  subscriptionData: Partial<User>
) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .update(subscriptionData)
    .eq('clerk_id', clerkId)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, user: data as User }
}

export async function logUsage(
  userId: string,
  feature: string,
  tokensUsed?: number,
  metadata?: Record<string, unknown>
) {
  const { error } = await supabaseAdmin.from('usage_logs').insert({
    user_id: userId,
    feature,
    tokens_used: tokensUsed,
    metadata,
  })

  return { success: !error, error: error?.message }
}

export async function getUserUsage(
  userId: string,
  period: 'day' | 'week' | 'month' = 'month'
) {
  const now = new Date()
  let startDate: Date

  switch (period) {
    case 'day':
      startDate = new Date(now.setDate(now.getDate() - 1))
      break
    case 'week':
      startDate = new Date(now.setDate(now.getDate() - 7))
      break
    case 'month':
      startDate = new Date(now.setMonth(now.getMonth() - 1))
      break
  }

  const { data, error } = await supabaseAdmin
    .from('usage_logs')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', startDate.toISOString())

  if (error) {
    return { success: false, error: error.message }
  }

  const totalTokens = data.reduce(
    (sum, log) => sum + (log.tokens_used || 0),
    0
  )

  return {
    success: true,
    logs: data as UsageLog[],
    totalTokens,
    count: data.length,
  }
}
