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

2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill all variables in `.env.local`.

3. Apply SQL in Supabase SQL editor:

- `supabase/schema.sql`
- `supabase/storage.sql`

4. Run development server

```bash
npm run dev
```

## Deployment (Vercel)

1. Push repository to Git provider.
2. Import project in Vercel.
3. Set all environment variables from `.env.example`.
4. Ensure Supabase URL/keys and Resend API key are configured.
5. Deploy.

## Notes

- For production rate limiting at scale, replace in-memory limiter with Redis/Upstash.
- Configure GA4 ingestion in `app/api/analytics/snapshot/route.ts` with your measurement API source.
- Use Supabase Storage signed upload flow for stricter private upload controls where needed.
