# AI SaaS Starter Kit 🚀

> Launch your AI-powered application in hours, not weeks.

A production-ready Next.js boilerplate with AI integrations, authentication, payments, and everything you need to build your AI SaaS.

## ✨ Features

- 🔐 **Authentication** - Clerk with OAuth support (Google, GitHub)
- 💳 **Payments** - Stripe subscriptions and one-time payments
- 🤖 **AI Ready** - OpenAI, Claude, and Replicate pre-configured
- 🗄️ **Database** - Supabase with Row Level Security
- 🎨 **UI Components** - Tailwind CSS + shadcn/ui
- 📧 **Email** - Resend integration for transactional emails
- 🌙 **Dark Mode** - Built-in theme toggle
- 📱 **Responsive** - Mobile-first design
- 🔒 **Type Safe** - Full TypeScript support

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd ai-saas-starter
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Then fill in your API keys (see [Environment Variables](#environment-variables) section).

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL schema (see [Database Setup](#database-setup))
3. Copy your project URL and anon key to `.env.local`

### 4. Set Up Clerk

1. Create an application at [clerk.com](https://clerk.com)
2. Copy your publishable key and secret key to `.env.local`
3. Configure OAuth providers if needed

### 5. Set Up Stripe

1. Create an account at [stripe.com](https://stripe.com)
2. Create products and prices for your subscription plans
3. Copy your keys and price IDs to `.env.local`
4. Set up webhooks (see [Stripe Webhooks](#stripe-webhooks))

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## 📁 Project Structure

```
ai-saas-starter/
├── app/
│   ├── (auth)/           # Auth pages (sign-in, sign-up)
│   ├── (dashboard)/      # Dashboard and app pages
│   ├── api/              # API routes
│   │   ├── chat/         # AI chat endpoint
│   │   ├── generate/     # Text generation endpoint
│   │   ├── image/        # Image generation endpoint
│   │   └── stripe/       # Stripe webhooks
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # shadcn/ui components
│   └── features/         # Feature components
├── lib/
│   ├── openai.ts         # OpenAI integration
│   ├── claude.ts         # Claude integration
│   ├── replicate.ts      # Replicate integration
│   ├── supabase.ts       # Supabase client
│   ├── stripe.ts         # Stripe integration
│   └── utils.ts          # Utility functions
├── hooks/                # Custom React hooks
├── types/                # TypeScript types
└── public/               # Static assets
```

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | ✅ |
| `CLERK_SECRET_KEY` | Clerk secret key | ✅ |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | ✅ |
| `STRIPE_SECRET_KEY` | Stripe secret key | ✅ |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | ✅ |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | ✅ |
| `OPENAI_API_KEY` | OpenAI API key | For AI features |
| `ANTHROPIC_API_KEY` | Claude API key | For AI features |
| `REPLICATE_API_TOKEN` | Replicate API token | For image generation |
| `RESEND_API_KEY` | Resend API key | For emails |

## 🗄️ Database Setup

Run this SQL in your Supabase SQL editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  clerk_id TEXT UNIQUE NOT NULL,
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'pro', 'enterprise')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usage logs table
CREATE TABLE usage_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  feature TEXT NOT NULL,
  tokens_used INTEGER,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_price_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid()::text = clerk_id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::text = clerk_id);
```

## 🔗 Stripe Webhooks

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-domain.com/api/stripe/webhook`
3. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the signing secret to `STRIPE_WEBHOOK_SECRET`

For local testing, use Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## 🤖 AI Features

### Chat Completion

```typescript
import { generateChatCompletion } from '@/lib/openai'

const result = await generateChatCompletion([
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'Hello!' }
])
```

### Text Generation with Claude

```typescript
import { generateClaudeText } from '@/lib/claude'

const result = await generateClaudeText(
  'Write a product description for a smart watch',
  'You are a marketing copywriter.'
)
```

### Image Generation

```typescript
import { generateImageWithFlux } from '@/lib/replicate'

const result = await generateImageWithFlux(
  'A futuristic city at sunset',
  { aspectRatio: '16:9' }
)
```

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Other Platforms

This app works on any platform that supports Next.js:
- [Railway](https://railway.app)
- [Render](https://render.com)
- [Fly.io](https://fly.io)

## 🛠️ Customization

### Adding New AI Features

1. Create a new API route in `app/api/`
2. Import the AI library you need
3. Add your logic
4. Create a UI component in `components/features/`

### Changing the Theme

Edit CSS variables in `app/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  /* ... */
}
```

### Adding New Pages

Create a new folder in `app/`:

```
app/
└── your-page/
    └── page.tsx
```

## 📄 License

MIT License - feel free to use this for any commercial project.

## 🙏 Support

- 📧 Email: support@your-domain.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)

---

Built with ❤️ for indie hackers and developers who want to ship fast.
