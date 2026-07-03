# Yolic Business Platform

Production-ready business platform for Yolic with a premium landing page, quotation management, CMS, analytics dashboard, role-based admin, and Supabase backend.

## Stack

- Next.js 15 App Router
- TypeScript (strict)
- Tailwind CSS + reusable UI primitives
- Supabase (Auth, Postgres, Storage, RLS)
- Resend Email API
- React Hook Form + Zod
- Recharts
- Vercel-ready deployment

## Features

- Public pages: Home, About, Services, Contact
- Quotation system with validation, DB save, admin email, client confirmation, activity log, success redirect
- Contact form with validation, rate limiting, DB storage, email notification
- Admin auth: register, login, logout, forgot/reset password, protected middleware routes
- Admin dashboard with KPI cards and charts
- Quotation management workflow with statuses and actions
- CMS modules for services, testimonials, FAQs
- Analytics snapshots API and dashboard visualizations
- User management (super admin/admin/editor)
- Settings module for company profile and social links
- Storage bucket setup SQL for logos, testimonials, services, uploads
- SEO: metadata, Open Graph, robots, sitemap, JSON-LD
- Security controls: RLS, sanitization, rate limiting, middleware protection

## Project Structure

app/ components/ features/ lib/ hooks/ types/ supabase/ public/

## Local Development

1. Install dependencies

```bash
npm install
```

1. Configure environment variables

```bash
cp .env.example .env.local
```

Fill all variables in `.env.local`.

1. Apply SQL in Supabase SQL editor:

- `supabase/schema.sql`
- `supabase/storage.sql`

1. Run development server

```bash
npm run dev
```

## Deployment (Vercel)

Vercel uses the standard `npm` available in its build environment. It detects `package-lock.json`, installs dependencies with `npm`, runs `npm run build`, and serves the Next.js app automatically.

1. Push repository to Git provider.
1. Import project in Vercel.
1. Set all environment variables from `.env.example`.
1. Ensure `NEXT_PUBLIC_SUPABASE_URL` and at least one of `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is configured.
1. Set production values for `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ADMIN_EMAIL`, and a `CSRF_SECRET` with at least 16 characters.
1. Set `NEXT_PUBLIC_APP_URL` to your production Vercel domain.
1. If your project uses a custom domain, update `NEXT_PUBLIC_APP_URL` after the domain is attached.
1. Deploy.

## Notes

- For production rate limiting at scale, replace in-memory limiter with Redis/Upstash.
- Configure GA4 ingestion in `app/api/analytics/snapshot/route.ts` with your measurement API source.
- Use Supabase Storage signed upload flow for stricter private upload controls where needed.
