# GuardianX Launchpad

> Technology Recruitment & Career Assistance Consultancy

Premium dark-themed website for GuardianX Launchpad, a technology recruitment consultancy that connects skilled professionals with leading tech employers across every domain.

## ✨ Features

### Public Site
- **7 pages**: Home, Admissions, Placements, AI Resume Review, For Employers, Candidate Dashboard, Contact
- **Dynamic role deep-dive pages** at `#role/[slug]`
- **Premium dark + amber gold aesthetic** with Playfair Display + Inter typography
- **Custom gold cursor** with magnetic button interactions
- **Page transitions** with morphing GuardianX logo
- **Scroll-driven 3D hero parallax**
- **Animated SVG dividers, glass morphism v2, gold foil texture**
- **Live placement ticker** + interactive salary band chart
- **WhatsApp floating button** + email capture bar
- **AI-powered resume review** (uses z-ai-web-dev-sdk)
- **PWA + offline support**
- **Reduced-motion accessibility** throughout
- **Mobile responsive** with custom mobile drawer

### Admin Panel (`#admin`)
- Password-protected (set `ADMIN_PASSWORD` env var)
- **Dashboard**: live stats (registrations, revenue, messages, subscribers)
- **Registrations manager**: search, filter, view full detail, update payment status
- **Messages manager**: mark resolved, add internal notes
- **Subscribers manager**: view + export CSV
- **Site settings**: registration fee, WhatsApp number, social URLs, hero copy, fee descriptions
- **Roles manager**: full CRUD for 12 role categories (powers Placements + Register + role deep-dive)
- **Placements manager**: CRUD for success stories
- **FAQs manager**: CRUD for Admissions FAQ
- **Job openings manager**: CRUD for matched roles on candidate dashboard

### Payment Integration
- Razorpay checkout for ₹2,000 registration fee
- Mock mode when Razorpay keys are not configured
- Server-side HMAC SHA256 signature verification

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase DATABASE_URL, WhatsApp number, admin password

# Create database tables
bun run db:push

# Seed initial content (roles, placement stories, FAQs, jobs, site settings)
bun run db:seed

# Start dev server
bun run dev
```

Visit `http://localhost:3000` for the public site, or `http://localhost:3000/#admin` for the admin panel.

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string (Supabase recommended) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Yes | WhatsApp number with country code, no + |
| `ADMIN_PASSWORD` | Yes | Admin panel password (change in production) |
| `RAZORPAY_KEY_ID` | Optional | Razorpay key ID (leave empty for mock mode) |
| `RAZORPAY_KEY_SECRET` | Optional | Razorpay key secret |

## 🗄️ Database Setup (Supabase)

This project uses PostgreSQL via Prisma. [Supabase](https://supabase.com) is recommended for production hosting (free tier, persists data on Vercel/Netlify).

> **Important**: Use the **Session Pooler** connection string (not the direct connection). The direct connection uses IPv6 which doesn't work in many hosting environments (Vercel, Netlify, etc.). The pooler uses IPv4 and is recommended by Supabase.

### Steps

1. **Create a Supabase project** at https://supabase.com/dashboard
2. **Get your connection string**:
   - Go to Project Settings → Database → Connection string → **Session pooler**
   - Format: `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres`
3. **Set it as `DATABASE_URL`** in your `.env` file (local) and in your hosting platform's env vars (production)
4. **Create the schema**:
   ```bash
   bun run db:push
   ```
5. **Seed initial content** (roles, FAQs, placement stories, jobs, site settings):
   ```bash
   bun run db:seed
   ```

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York style)
- **Database**: Prisma ORM + SQLite (dev)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: z-ai-web-dev-sdk (for resume review)
- **Payments**: Razorpay
- **PWA**: manifest.json + service worker

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── admin/              # Admin panel API (auth, CRUD)
│   │   ├── contact/            # Contact form
│   │   ├── register/           # Registration + Razorpay order
│   │   ├── verify-payment/     # Payment verification
│   │   ├── subscribe/          # Email capture
│   │   ├── dashboard/          # Candidate dashboard data
│   │   ├── role/[roleSlug]/    # Role deep-dive data
│   │   ├── resume-review/       # AI resume analysis
│   │   └── analytics/          # Aggregated analytics
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # PageRouter entry
│   └── globals.css             # Theme + animations
├── components/
│   └── site/
│       ├── admin/              # Admin panel UI
│       ├── pages/              # Public pages (Home, Admissions, etc.)
│       └── ui/                 # Reusable UI components
├── hooks/                      # useReducedMotion, useFormAutoSave
└── lib/                        # db, utils, admin auth helpers

prisma/
└── schema.prisma               # 9 models (Registration, Role, FAQItem, etc.)

scripts/
└── seed.ts                     # Initial data migration

public/
├── logo.png                    # GuardianX shield logo
├── favicon.ico
├── manifest.json                # PWA manifest
├── sw.js                        # Service worker
└── apple-touch-icon.png
```

## 🎨 Design System

- **Background**: Near-black with warm tint (`oklch(0.08 0.005 60)`)
- **Primary accent**: Amber gold (`oklch(0.78 0.16 75)`)
- **Typography**: Playfair Display (headings) + Inter (body) + Geist Mono (technical)
- **Cursor**: Custom gold cursor with magnetic interactions (desktop only)

## 📄 License

Proprietary. © GuardianX Launchpad.

## 🔐 Security Notes

- Change `ADMIN_PASSWORD` before production deployment
- For production, upgrade admin auth to NextAuth.js with proper session management
- Configure Razorpay keys before going live (currently in mock mode)
- Database contains PII (candidate registrations) — back up regularly
