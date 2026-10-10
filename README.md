# aniket.one – Production Portfolio & Owner-Only Admin

A work-only, hiring-focused portfolio for a freelance full-stack and AI engineer with a secure, owner-only admin CMS. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Supabase (Postgres, Auth, Storage), React Three Fiber + Drei, Zod validation, and `@dnd-kit`.

---

## Architecture Overview

- **Public Site (`aniket.one`)**:
  - Blazing fast, SEO-optimized, read-only.
  - Dynamically renders blocks from Supabase Postgres with revalidation (`revalidate = 60`).
  - Hero features a lazy-loaded 3D technology orb (`@react-three/fiber` + `drei`) with static image/SVG fallbacks for mobile and `prefers-reduced-motion`.
  - Zero client-side admin traces, no links to admin panel.
- **Admin Panel (`admin.aniket.one`)**:
  - Secure owner-only content management.
  - Multi-layered defense: Cloudflare Access + Subdomain Middleware Rewrite + Supabase Row Level Security (RLS) + OTP Auth + TOTP MFA.
  - Add, edit (live Zod validation), hide/publish, reorder (`@dnd-kit`), and soft delete (with 30s undo toast).
  - Secure image upload (MIME and magic-byte verified on server, max 2MB).
  - Contact inbox, 1-hour expiring preview tokens (`?preview=<token>`), and append-only database audit logs.

---

## 1. Prerequisites & Environment Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/aniket.one.git
cd aniket.one
npm install
```

Create `.env.local` based on `.env.example`:

```bash
cp .env.example .env.local
```

Populate the required environment variables:

| Variable | Description | Where to find |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL | Supabase Dashboard > Project Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anonymous API key | Supabase Dashboard > Project Settings > API |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret service role API key (**server only**) | Supabase Dashboard > Project Settings > API |
| `OWNER_EMAIL` | Owner email address (sole admin) | Your email address |
| `NEXT_PUBLIC_SITE_URL` | Production root URL (`https://aniket.one`) | Domain configuration |
| `RESEND_API_KEY` | Optional: Resend API key for inquiry emails | [Resend Dashboard](https://resend.com) |
| `UPSTASH_REDIS_REST_URL` | Optional: Upstash Redis URL for distributed rate limiting | [Upstash Console](https://upstash.com) |
| `UPSTASH_REDIS_REST_TOKEN` | Optional: Upstash Redis Token | [Upstash Console](https://upstash.com) |

---

## 2. Supabase Setup & Migration

### Step A: Execute SQL Migration
1. In the Supabase Dashboard, navigate to the **SQL Editor**.
2. Open `supabase/migrations/001_init.sql`.
3. Replace `'OWNER_EMAIL_HERE'` with your actual email address.
4. Run the query. This sets up:
   - `site_blocks`, `site_blocks_log`, `contact_messages`, and `preview_tokens` tables.
   - Row Level Security (RLS) policies on all tables.
   - Automatic audit logging trigger on `site_blocks` mutations.
   - Public read / owner-write policies for the `media` storage bucket.

### Step B: Supabase Dashboard Security Checklist
1. **Disable Public Signups**:
   - Go to **Authentication** > **Providers** > **Email**.
   - **Uncheck** "Allow new users to sign up" (or in Auth Settings, toggle **Enable Signup** to OFF). Only existing users can sign in.
2. **Create the Owner User**:
   - Go to **Authentication** > **Users**.
   - Click **Add User** > **Create User** and enter the email specified in `OWNER_EMAIL`.
3. **Enable TOTP Multi-Factor Authentication (MFA)**:
   - Under **Authentication** > **Multi-Factor Authentication**, ensure MFA is enabled.
   - Upon initial sign in, enroll your authenticator app (Google Authenticator, 1Password, etc.).
4. **Verify Storage Bucket**:
   - Under **Storage**, confirm that the `media` bucket exists and is marked as Public for reading.

---

## 3. Database Seeding

To populate all portfolio sections with initial placeholder data marked with clear `[REPLACE: ...]` indicators:

```bash
npm run seed
```

Once seeded, visit the admin panel to update placeholders with your real work and case studies.

---

## 4. Local Development

Run the development server:

```bash
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin) (or configure `admin.localhost` in your local `/etc/hosts`).

---

## 5. Cloudflare Access Setup (Critical Owner Protection)

In production, place Cloudflare Access (Zero Trust – Free tier for up to 50 users) in front of `admin.aniket.one`:

1. In the **Cloudflare Zero Trust Dashboard**, go to **Access** > **Applications**.
2. Click **Add an application** > **Self-hosted**.
3. Application name: `Portfolio Admin`.
4. Application domain: `admin.aniket.one`.
5. Under **Policies**:
   - Policy Name: `Owner Only`.
   - Action: `Allow`.
   - Rule type: **Include** > **Emails** > Enter your `OWNER_EMAIL`.
6. Save the application.
7. Any visitor attempting to reach `admin.aniket.one` will be intercepted at the Cloudflare edge and required to enter an email OTP before any request touches your origin server.

---

## 6. Vercel Deployment

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: production portfolio and admin CMS"
   git push origin main
   ```
2. **Deploy on Vercel**:
   - Import your repository on [Vercel](https://vercel.com).
   - In **Settings** > **Environment Variables**, add all keys from `.env.local`.
   - In **Settings** > **Domains**, add:
     - `aniket.one` (Primary domain for public site)
     - `admin.aniket.one` (Subdomain for admin panel)
3. Deploy! Next.js middleware automatically detects `admin.aniket.one` and serves the protected admin routes while redirecting main domain admin attempts to 404.

---

## 7. Security Architecture Summary

- **No `dangerouslySetInnerHTML`**: All database content is rendered as React text nodes.
- **Strict Headers**: Configured in `next.config.ts` including CSP, HSTS (`max-age=63072000`), X-Frame-Options (`DENY`), and Permissions-Policy.
- **Defense-in-Depth Auth**:
  1. Cloudflare Access OTP at edge.
  2. Middleware host check + Supabase session check.
  3. Server Actions `requireOwner()` call.
  4. Supabase Postgres Row-Level-Security (RLS) policies.
- **Upload Hardening**: File MIME type validation + magic byte inspection on the server to prevent malicious executable uploads; stored with random UUID filenames.
- **Rate Limiting**: IP-based rate limiting on login and contact endpoints with Upstash Redis support.
- **SEO & Indexing**: Admin routes specify `noindex, nofollow`, are blocked in `robots.txt`, and omitted from `sitemap.xml`.
