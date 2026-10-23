# aniket.one — Freelance Portfolio & Engineering Blog

The personal site of [Aniket Mishra](https://aniket.one) — freelance full-stack & AI systems engineer. A fully static, SEO-optimized portfolio with real project case studies, a technical blog, live GitHub telemetry, and a fixed-scope proposal flow for prospective clients.

## What's inside

- **Portfolio** — real shipped products (OmTabs, OmSpace, Centrix, Nexus Streamer, ImgWorld.biz, Qpic, RadialMenu) with live GitHub stars and links to full engineering deep-dives
- **Engineering blog** (`/blog`) — long-form case studies with TOC scroll-spy, reading progress, share and RSS (`/feed.xml`)
- **Pricing & sprints** (`/pricing`) — fixed-scope freelance engagements with a proposal submission form (Supabase insert + prefilled-mail fallback)
- **Live GitHub terrain** — 12-month contribution graph for both profiles, fetched client-side at runtime with a curated static fallback
- **⌘K search** — fuzzy search across pages, projects, services, FAQs and articles, with recent searches and match highlighting

## Stack

| Layer | Choice |
| :--- | :--- |
| Framework | Next.js 15 (App Router, `output: export`) |
| UI | React 19, Tailwind CSS, Framer Motion, Lucide |
| 3D / Visuals | Hand-built isometric SVG (no WebGL dependency) |
| Data | Supabase (Postgres + RLS) for proposal submissions |
| Fonts | Self-hosted Merriweather + JetBrains Mono (woff2) |
| Infra | Static export, deployed via GitHub Actions |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

Optional environment (`.env.local`) — the site runs without them; they only enable persistence/analytics paths:

```bash
NEXT_PUBLIC_SITE_URL=https://aniket.one     # canonical URLs in metadata/sitemap
NEXT_PUBLIC_SUPABASE_URL=...                # proposal form DB storage
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Project structure

```
app/
  page.jsx                 # homepage (hero, projects, live terrain, FAQ)
  blog/                    # blog index + [slug] article pages
  data/blogArticles.js     # article metadata (search + list)
  blog/content.js          # full article bodies (loaded only on article pages)
  data/portfolioData.js    # projects, services, FAQs, search index
  pricing/                 # sprint pricing + proposal form
  components/              # all UI components
  feed.xml/route.ts        # static RSS feed
  sitemap.ts / robots.ts   # SEO
supabase/migrations/       # contact_messages table + RLS policies
lib/supabase/              # browser/server clients
```

Hidden-but-kept sections (return 404, code preserved for future revival): `/students`, `/docs`, `/labs`, `/thesis`, `/use-cases`, `/compare`, `/creators-program`.

## Proposal form data flow

1. Visitor submits the form on `/pricing`
2. The client attempts an anonymous insert into `contact_messages` (RLS: anyone can insert, only the owner can read)
3. Independently, a fully prefilled `mailto:` opens — on a static site this is the guaranteed delivery path, so no lead is ever lost

## License

© Aniket Mishra. All rights reserved — this repo is public for inspection, not for redistribution.
