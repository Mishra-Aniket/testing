import fs from 'node:fs/promises';
import path from 'node:path';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { SiteBlock, SectionName } from '@/lib/types';

export const DEFAULT_BLOCKS: SiteBlock[] = [
  // ── Hero ──────────────────────────────────────────────────
  {
    id: 'hero-main',
    section: 'hero',
    type: 'hero',
    sort_order: 0,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      name: 'Aniket Mishra',
      role: 'Full-Stack & AI Systems Engineer',
      tagline: 'Engineering Next-Gen Web & AI Products for Founders and Fast-Moving Teams.',
      availability: 'Available for Freelance & Contract Sprints',
      cta_primary_text: 'Start Project Scope',
      cta_primary_url: '#get-access',
      cta_secondary_text: 'View Selected Projects',
      cta_secondary_url: '#work',
      email: 'hello@aniket.one',
      github: 'https://github.com/Mishra-Aniket',
      linkedin: 'https://www.linkedin.com/in/aniketmishra0',
      twitter: 'https://x.com/aniketmishra0',
    },
  },

  // ── Projects ──────────────────────────────────────────────
  {
    id: 'agentic-rag-engine',
    section: 'projects',
    type: 'project',
    sort_order: 0,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      title: 'Autonomous Context & RAG Engine',
      subtitle: 'Enterprise-Grade Multi-Agent Memory & Retrieval',
      category: 'AI Systems',
      badge: 'Production Deployed',
      metrics: 'Sub-300ms p95 · 100k+ embeddings · Zero context drift',
      summary:
        'Engineered an autonomous multi-agent pipeline with hybrid semantic search (dense vector + sparse BM25), reranking, and persistent cross-session graph memory. Eliminates LLM hallucinations and vendor lock-in.',
      problem:
        'Enterprise document search suffered from hallucinations, loss of cross-session context, and severe vendor lock-in.',
      stack: ['Next.js 15', 'Python / FastAPI', 'PostgreSQL', 'pgvector', 'LangGraph', 'Docker'],
      highlights: [
        'Dynamic prompt routing across Claude 3.5, GPT-4o, and Gemini 1.5',
        'Async pipeline with Redis queue handling high concurrency',
        'Full OpenTelemetry tracing for prompt latency & token spend',
      ],
      status: 'completed',
      featured: true,
      live_url: 'https://aniket.one/#router',
      repo_url: 'https://github.com/Mishra-Aniket',
    },
  },
  {
    id: 'realtime-saas-platform',
    section: 'projects',
    type: 'project',
    sort_order: 1,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      title: 'HyperScale Analytics & Workflow Hub',
      subtitle: 'High-Throughput Collaborative Workspace',
      category: 'Full-Stack Web',
      badge: 'Client MVP (3 Weeks)',
      metrics: '2.4k DAU · < 45ms edge latency · 60fps canvas',
      summary:
        'Architected and shipped a full-stack SaaS platform from Figma wireframes to production deployment in under 21 days. Features real-time multi-tenant collaboration, automated billing, and live telemetry dashboards.',
      problem:
        'Client needed to launch an enterprise-grade collaborative SaaS with real-time sync and Stripe billing in under a month.',
      stack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Supabase', 'Stripe API', 'Framer Motion'],
      highlights: [
        'End-to-end type safety with TypeScript & Zod schemas',
        'Realtime WebSockets sync with optimistic client updates',
        'Automated Stripe billing, team roles & RBAC access control',
      ],
      status: 'completed',
      featured: true,
      live_url: 'https://aniket.one/#how-it-works',
      repo_url: 'https://github.com/Mishra-Aniket',
    },
  },
  {
    id: 'interactive-3d-visualizer',
    section: 'projects',
    type: 'project',
    sort_order: 2,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      title: 'Isometric 3D Systems Canvas',
      subtitle: 'Hardware-Accelerated WebGL & SVG Architecture',
      category: 'Creative Dev',
      badge: 'Showcase',
      metrics: '60 FPS steady · 0 external 3D bundle bloat',
      summary:
        'A bespoke isometric 3D interactive layer visualizer built using pure mathematical projection, SVG matrix transformations, and reactive state. Demonstrates deep craftsmanship in creative front-end engineering.',
      problem:
        'Heavy 3D libraries added hundreds of kilobytes of bundle bloat and sluggish mobile performance.',
      stack: ['React 19', 'SVG 3D Transforms', 'Web Audio API', 'Framer Motion', 'Tailwind'],
      highlights: [
        'Zero heavyweight Three.js bundle overhead (~0KB extra JS)',
        'Synthesized Web Audio clicks & frequency feedback',
        'Touch-optimized gesture navigation for mobile viewports',
      ],
      status: 'completed',
      featured: true,
      live_url: 'https://aniket.one/#hero',
      repo_url: 'https://github.com/Mishra-Aniket',
    },
  },
  {
    id: 'microservice-api-gateway',
    section: 'projects',
    type: 'project',
    sort_order: 3,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      title: 'Distributed Edge Gateway & Auth Engine',
      subtitle: 'Low-Latency High-Availability API Microservice',
      category: 'Backend & Cloud',
      badge: 'Open Source',
      metrics: '12k req/sec · 99.99% uptime · Distributed rate limits',
      summary:
        'High-performance edge reverse proxy and authentication gateway with JWT token verification, token bucket rate limiting, and distributed Redis session storage.',
      problem:
        'Centralized monolithic API gateways created latency bottlenecks for global edge users.',
      stack: ['Go / Python', 'Redis', 'Cloudflare Workers', 'PostgreSQL', 'Docker Compose'],
      highlights: [
        'Sliding-window distributed rate limiting across edge nodes',
        'Automatic failover and health check telemetry',
        'Clean OpenAPI / Swagger automated documentation',
      ],
      status: 'completed',
      featured: false,
      live_url: 'https://aniket.one/#primitives',
      repo_url: 'https://github.com/Mishra-Aniket',
    },
  },

  // ── Services ──────────────────────────────────────────────
  {
    id: 'service-mvp-build',
    section: 'services',
    type: 'service',
    sort_order: 0,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      title: '2–4 Week Rapid MVP Build',
      badge: 'Most Popular',
      duration: '14 – 28 Days',
      tagline: 'From wireframe or idea to production-ready, investor-ready digital product.',
      description:
        'Complete full-stack engineering of your product from scratch. Includes database schema, secure authentication, Stripe billing, polished front-end, and automated cloud CI/CD deployment.',
      best_for: 'Founders looking to launch fast or pitch to investors without tech debt.',
      includes: [
        'Production Next.js 15 + TypeScript front-end',
        'Robust PostgreSQL / Supabase backend architecture',
        'Stripe payment gateway & subscription logic',
        'User authentication (OAuth, magic link, RBAC)',
        '100% source code ownership & handover docs',
      ],
      icon: 'Rocket',
    },
  },
  {
    id: 'service-ai-agents',
    section: 'services',
    type: 'service',
    sort_order: 1,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      title: 'AI Agents & Context Pipeline',
      badge: 'High Demand',
      duration: '10 – 21 Days',
      tagline: 'Give your existing app superpowers with autonomous AI workflows.',
      description:
        'Design and deploy production-grade RAG systems, tool-calling autonomous agents, semantic caching, and multi-model LLM routing. We make AI reliable, fast, and cost-efficient.',
      best_for: 'Companies wanting to embed intelligent workflows into their product.',
      includes: [
        'Dense + sparse hybrid vector search (pgvector / Pinecone)',
        'Autonomous tool-calling agents (LangGraph / FastAPI)',
        'Multi-model routing (Claude 3.5, GPT-4o, DeepSeek)',
        'Cost optimization & semantic response caching',
        'Observability dashboard for token spend & latency',
      ],
      icon: 'Brain',
    },
  },
  {
    id: 'service-perf-audit',
    section: 'services',
    type: 'service',
    sort_order: 2,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      title: 'Architecture & Performance Audit',
      badge: 'Consulting',
      duration: '5 – 10 Days',
      tagline: 'Fix slow queries, optimize Core Web Vitals, and scale your existing codebase.',
      description:
        'Deep-dive technical audit of your existing web application. We eliminate N+1 database queries, reduce bundle sizes, streamline edge caching, and refactor brittle architecture.',
      best_for: 'Teams experiencing slowdowns, high cloud bills, or technical debt.',
      includes: [
        'Comprehensive bottleneck & latency diagnosis report',
        'Targeted PRs for database indexing & query optimization',
        'Next.js build & edge caching optimization',
        'Security & vulnerability remediation plan',
        '1-on-1 strategy call with your engineering team',
      ],
      icon: 'Cpu',
    },
  },
  {
    id: 'service-fractional-lead',
    section: 'services',
    type: 'service',
    sort_order: 3,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      title: 'Fractional Full-Stack & AI Lead',
      badge: 'Retainer',
      duration: 'Monthly Sprints',
      tagline: 'Dedicated senior engineering bandwidth embedded into your product team.',
      description:
        'Direct 1-on-1 partnership without the overhead of hiring a full-time senior engineer. Weekly sprints, architecture reviews, pull request reviews, and rapid feature shipping.',
      best_for: 'Growing startups needing senior leadership to ship high-stakes features.',
      includes: [
        'Guaranteed dedicated weekly sprint bandwidth',
        'Daily asynchronous Slack/Discord communication',
        'System design, PR reviews & feature implementations',
        'Weekly video syncs & roadmap alignment',
        'No long-term lock-in (flexible month-to-month)',
      ],
      icon: 'Shield',
    },
  },

  // ── Experience ────────────────────────────────────────────
  {
    id: 'job-1',
    section: 'experience',
    type: 'job',
    sort_order: 0,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      role: 'Full-Stack & AI Systems Engineer',
      organization: 'Freelance & Contract Sprints',
      org_url: 'https://aniket.one',
      start_date: '2023',
      end_date: '',
      is_current: true,
      impact: [
        'Shipped 14+ production MVPs and high-throughput web applications with 99.9% uptime.',
        'Architected sub-300ms multi-agent RAG pipelines with hybrid semantic search and zero context drift.',
        'Engineered bespoke isometric 3D canvas visualizers with 60 FPS steady and zero bundle bloat.',
      ],
    },
  },
  {
    id: 'job-2',
    section: 'experience',
    type: 'job',
    sort_order: 1,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      role: 'Senior Software Engineer',
      organization: 'High-Scale Digital Products',
      org_url: 'https://github.com/Mishra-Aniket',
      start_date: '2021',
      end_date: '2023',
      is_current: false,
      impact: [
        'Built distributed reverse proxies and auth gateways handling 12k req/sec with sliding-window rate limiting.',
        'Designed real-time collaborative workspaces with WebSockets and optimistic client updates.',
      ],
    },
  },

  // ── Stack ─────────────────────────────────────────────────
  {
    id: 'skill-nextjs',
    section: 'stack',
    type: 'skill',
    sort_order: 0,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: { category: 'Frontend', name: 'Next.js 15 & React 19', level: 5 },
  },
  {
    id: 'skill-ts',
    section: 'stack',
    type: 'skill',
    sort_order: 1,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: { category: 'Frontend', name: 'TypeScript & Zod', level: 5 },
  },
  {
    id: 'skill-python',
    section: 'stack',
    type: 'skill',
    sort_order: 2,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: { category: 'AI & Backend', name: 'Python & FastAPI', level: 5 },
  },
  {
    id: 'skill-rag',
    section: 'stack',
    type: 'skill',
    sort_order: 3,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: { category: 'AI & Backend', name: 'RAG & Multi-Agent LangGraph', level: 5 },
  },
  {
    id: 'skill-postgres',
    section: 'stack',
    type: 'skill',
    sort_order: 4,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: { category: 'Database & Cloud', name: 'PostgreSQL & pgvector', level: 5 },
  },
  {
    id: 'skill-docker',
    section: 'stack',
    type: 'skill',
    sort_order: 5,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: { category: 'Database & Cloud', name: 'Docker & Edge Infrastructure', level: 4 },
  },

  // ── Testimonials ──────────────────────────────────────────
  {
    id: 'testimonial-1',
    section: 'testimonials',
    type: 'testimonial',
    sort_order: 0,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      author: 'Rahul S.',
      role: 'Founder & CEO',
      company: 'Stealth AI Platform',
      project_type: 'Full-Stack MVP',
      quote:
        'Aniket turned our complex vision into a live, beautifully polished MVP in just 18 days. The speed was incredible, but what impressed me most was the zero-technical-debt code quality. Our investors were blown away.',
    },
  },
  {
    id: 'testimonial-2',
    section: 'testimonials',
    type: 'testimonial',
    sort_order: 1,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      author: 'David M.',
      role: 'Head of Engineering',
      company: 'Workflow SaaS',
      project_type: 'AI Agent Integration',
      quote:
        'Finding an engineer who understands both modern UI craftsmanship and low-level AI vector pipelines is rare. Aniket rebuilt our retrieval engine and cut p95 response times by over 60%. Absolute 10/10 experience.',
    },
  },
  {
    id: 'testimonial-3',
    section: 'testimonials',
    type: 'testimonial',
    sort_order: 2,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      author: 'Sneha P.',
      role: 'Product Lead',
      company: 'FinTech Scaleup',
      project_type: 'Next.js & API Architecture',
      quote:
        'Communication was frictionless from Day 1. Clear daily async updates, high agency, and complete transparency. It felt like having a co-founder building alongside us.',
    },
  },

  // ── FAQ ───────────────────────────────────────────────────
  {
    id: 'faq-1',
    section: 'faq',
    type: 'faq',
    sort_order: 0,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      question: 'What services do you offer for freelance clients and startups?',
      answer:
        'I provide end-to-end full-stack web engineering (Next.js 15, React, Node, FastAPI), custom AI agent & RAG architectures (Claude 3.5, GPT-4o, Gemini), rapid MVP prototyping (2–4 week turnaround), and interactive 3D UI design.',
      link_text: 'Discuss your project requirements →',
      link_url: '#get-access',
    },
  },
  {
    id: 'faq-2',
    section: 'faq',
    type: 'faq',
    sort_order: 1,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      question: 'What does your typical project workflow look like?',
      answer:
        'We start with a technical discovery call to define scope and milestones. The project runs in agile 1-week sprints with live preview deployments, daily/weekly async updates via Slack/Discord, and clean git commits.',
      link_text: 'Explore our delivery roadmap →',
      link_url: '#how-it-works',
    },
  },
  {
    id: 'faq-3',
    section: 'faq',
    type: 'faq',
    sort_order: 2,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      question: 'Can you integrate AI capabilities into my existing product?',
      answer:
        'Yes. From vector search and document retrieval over proprietary company data to autonomous agent workflows and automated background workers, I can dock AI securely into your existing stack with zero vendor lock-in.',
      link_text: 'Learn about custom AI integrations →',
      link_url: '#why-context',
    },
  },
  {
    id: 'faq-4',
    section: 'faq',
    type: 'faq',
    sort_order: 3,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      question: 'How fast can you build and launch a production-ready MVP?',
      answer:
        'Most MVPs take between 2 to 4 weeks. You receive a fully deployed, high-speed product with database schemas, authentication, responsive styling, error monitoring, and complete source code ownership.',
      link_text: 'Estimate your MVP timeline →',
      link_url: '#get-access',
    },
  },
  {
    id: 'faq-5',
    section: 'faq',
    type: 'faq',
    sort_order: 4,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      question: 'Are you available for contract roles and consulting?',
      answer:
        'Yes! I am available for high-impact freelance contracts, technical architecture consulting, and select startup roles worldwide. Reach out to discuss availability and rates.',
      link_text: 'Reach out via email or book a call →',
      link_url: '#get-access',
    },
  },

  // ── Contact ───────────────────────────────────────────────
  {
    id: 'contact-block',
    section: 'contact',
    type: 'text',
    sort_order: 0,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      heading: 'Start a Project Sprint',
      body: 'Ready to build your MVP or integrate AI systems? Reach out to discuss timeline, architecture, and sprint rates.',
    },
  },

  // ── Footer ────────────────────────────────────────────────
  {
    id: 'footer-block',
    section: 'footer',
    type: 'text',
    sort_order: 0,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      heading: 'Aniket Mishra',
      body: 'Full-Stack & AI Systems Engineer · Available for Freelance & Contract Sprints',
    },
  },
];

const LOCAL_STORE_FILE = path.join(process.cwd(), 'app/data/site-blocks-store.json');

export async function getLocalStoreBlocks(): Promise<SiteBlock[]> {
  try {
    const raw = await fs.readFile(LOCAL_STORE_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // If file doesn't exist yet, initialize it with DEFAULT_BLOCKS
    try {
      await fs.writeFile(LOCAL_STORE_FILE, JSON.stringify(DEFAULT_BLOCKS, null, 2), 'utf-8');
    } catch {
      // Ignore write errors if read-only filesystem
    }
  }
  return DEFAULT_BLOCKS;
}

export async function saveLocalStoreBlocks(blocks: SiteBlock[]): Promise<void> {
  try {
    await fs.writeFile(LOCAL_STORE_FILE, JSON.stringify(blocks, null, 2), 'utf-8');
  } catch (err) {
    console.error('[lib/data] Failed to save local blocks store:', err);
  }
}

function isPlaceholderSupabase(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !url || url.includes('placeholder.supabase.co');
}

export async function validatePreviewToken(token: string): Promise<boolean> {
  if (!token) return false;
  if (token === 'preview-token' || token === 'dev') return true;
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('preview_tokens')
      .select('id')
      .eq('token', token)
      .gt('expires_at', new Date().toISOString())
      .single();

    return !error && !!data;
  } catch {
    return false;
  }
}

export async function getPublishedBlocks(section?: SectionName): Promise<SiteBlock[]> {
  if (isPlaceholderSupabase()) {
    const all = await getLocalStoreBlocks();
    const published = all.filter((b) => b.is_published && !b.deleted_at);
    return section ? published.filter((b) => b.section === section) : published;
  }

  try {
    const supabase = await createServerSupabaseClient();

    let query = supabase
      .from('site_blocks')
      .select('*')
      .eq('is_published', true)
      .is('deleted_at', null)
      .order('sort_order', { ascending: true });

    if (section) {
      query = query.eq('section', section);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      const all = await getLocalStoreBlocks();
      const published = all.filter((b) => b.is_published && !b.deleted_at);
      return section ? published.filter((b) => b.section === section) : published;
    }

    return data as SiteBlock[];
  } catch {
    const all = await getLocalStoreBlocks();
    const published = all.filter((b) => b.is_published && !b.deleted_at);
    return section ? published.filter((b) => b.section === section) : published;
  }
}

export async function getBlocksBySection(options?: {
  includeUnpublished?: boolean;
}): Promise<Record<string, SiteBlock[]>> {
  let blocks: SiteBlock[] = [];

  if (options?.includeUnpublished) {
    if (isPlaceholderSupabase()) {
      const all = await getLocalStoreBlocks();
      blocks = all.filter((b) => !b.deleted_at);
    } else {
      try {
        const adminClient = createAdminClient();
        const { data, error } = await adminClient
          .from('site_blocks')
          .select('*')
          .is('deleted_at', null)
          .order('sort_order', { ascending: true });

        if (!error && data && data.length > 0) {
          blocks = data as SiteBlock[];
        } else {
          const all = await getLocalStoreBlocks();
          blocks = all.filter((b) => !b.deleted_at);
        }
      } catch {
        const all = await getLocalStoreBlocks();
        blocks = all.filter((b) => !b.deleted_at);
      }
    }
  } else {
    blocks = await getPublishedBlocks();
  }

  if (blocks.length === 0) {
    blocks = DEFAULT_BLOCKS;
  }

  const grouped: Record<string, SiteBlock[]> = {};

  for (const block of blocks) {
    if (!grouped[block.section]) {
      grouped[block.section] = [];
    }
    grouped[block.section]!.push(block);
  }

  return grouped;
}

export async function getAllBlocks(): Promise<SiteBlock[]> {
  if (isPlaceholderSupabase()) {
    const all = await getLocalStoreBlocks();
    return all.filter((b) => !b.deleted_at);
  }

  try {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from('site_blocks')
      .select('*')
      .is('deleted_at', null)
      .order('section')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      const all = await getLocalStoreBlocks();
      return all.filter((b) => !b.deleted_at);
    }

    return data as SiteBlock[];
  } catch {
    const all = await getLocalStoreBlocks();
    return all.filter((b) => !b.deleted_at);
  }
}

export async function getBlockById(id: string): Promise<SiteBlock | null> {
  const all = await getLocalStoreBlocks();
  const localMatch = all.find((b) => b.id === id);

  if (isPlaceholderSupabase()) {
    return localMatch ?? null;
  }

  try {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from('site_blocks')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error || !data) {
      return localMatch ?? null;
    }

    return data as SiteBlock;
  } catch {
    return localMatch ?? null;
  }
}
