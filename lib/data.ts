import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { SiteBlock, SectionName } from '@/lib/types';

export const DEFAULT_BLOCKS: SiteBlock[] = [
  // ── Hero ──────────────────────────────────────────────────
  {
    id: 'hero-default',
    section: 'hero',
    type: 'hero',
    sort_order: 0,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      name: 'Aniket Mishra',
      role: 'Full-Stack & AI Engineer building scalable web applications and intelligent systems.',
      availability: 'Open for freelance',
      cta_primary_text: 'Hire me',
      cta_primary_url: '#contact',
      cta_secondary_text: 'View projects',
      cta_secondary_url: '#projects',
    },
  },

  // ── Projects ──────────────────────────────────────────────
  {
    id: 'proj-1',
    section: 'projects',
    type: 'project',
    sort_order: 0,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      title: 'Enterprise AI Knowledge Engine',
      summary:
        'High-accuracy RAG pipeline providing instantaneous semantic search across 500k+ enterprise documents with verifiable citations.',
      problem:
        'Traditional keyword search suffered from 40% retrieval failure on complex policy and regulatory queries.',
      stack: ['Next.js 15', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'pgvector'],
      status: 'completed',
      featured: true,
      live_url: 'https://example.com',
      repo_url: 'https://github.com/example/knowledge-engine',
    },
  },
  {
    id: 'proj-2',
    section: 'projects',
    type: 'project',
    sort_order: 1,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      title: 'High-Throughput E-Commerce Platform',
      summary:
        'Modern serverless commerce application handling 5,000+ peak checkout requests per second with sub-100ms API response.',
      problem:
        'Legacy monolithic checkout crashed under flash sale concurrency spikes causing massive cart abandonment.',
      stack: ['Next.js', 'Node.js', 'Tailwind CSS', 'Redis', 'Stripe'],
      status: 'completed',
      featured: false,
      live_url: 'https://example.com',
    },
  },
  {
    id: 'proj-3',
    section: 'projects',
    type: 'project',
    sort_order: 2,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      title: 'Autonomous Multi-Agent Workflow Engine',
      summary:
        'Coordinated LLM agent architecture executing multi-step research and code synthesis tasks with human-in-the-loop review.',
      problem:
        'Manual regulatory document processing took up to 3 days per customer file across distributed teams.',
      stack: ['Python', 'LangChain', 'Next.js', 'FastAPI', 'Docker'],
      status: 'completed',
      featured: true,
      live_url: 'https://example.com',
    },
  },

  // ── Services ──────────────────────────────────────────────
  {
    id: 'serv-1',
    section: 'services',
    type: 'service',
    sort_order: 0,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      title: 'Full-Stack Web Application Development',
      description:
        'End-to-end production web applications designed for speed, security, and effortless maintainability.',
      duration: '2–6 weeks',
      best_for: 'Startups and companies launching new products or rebuilding existing web apps',
      includes: [
        'Next.js 15 App Router architecture',
        'Relational database modeling and migrations',
        'Authentication, authorization, and security headers',
        'Automated CI/CD deployment on Vercel',
      ],
    },
  },
  {
    id: 'serv-2',
    section: 'services',
    type: 'service',
    sort_order: 1,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      title: 'AI & LLM Systems Integration',
      description:
        'Custom retrieval-augmented generation (RAG), autonomous agent loops, and streaming AI interfaces.',
      duration: '1–4 weeks',
      best_for: 'Teams looking to add practical, accurate AI capabilities to their product',
      includes: [
        'Semantic search and vector database setup (pgvector)',
        'Streaming LLM UX with graceful fallback states',
        'Cost, latency, and token efficiency optimization',
        'Prompt evaluation and safety guardrails',
      ],
    },
  },
  {
    id: 'serv-3',
    section: 'services',
    type: 'service',
    sort_order: 2,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      title: 'Architecture & Performance Audits',
      description:
        'Deep-dive assessment to eliminate latency, optimize database queries, and strengthen security.',
      duration: '3–5 days',
      best_for: 'Products suffering from slow Core Web Vitals, high server bills, or scaling issues',
      includes: [
        'Comprehensive Core Web Vitals profiling',
        'Database query plan analysis and index tuning',
        'Security headers, CSP, and RLS vulnerability review',
        'Prioritized, actionable remediation plan',
      ],
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
      role: 'Lead AI / Full-Stack Engineer',
      organization: 'Stealth AI Startup',
      org_url: 'https://example.com',
      start_date: '2023',
      end_date: '',
      is_current: true,
      impact: [
        'Architected streaming AI interface reducing first-token latency by 45%.',
        'Scaled user base from 0 to 50k monthly active users with 99.95% uptime.',
        'Mentored 4 engineers and established automated end-to-end testing pipeline.',
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
      role: 'Senior Full-Stack Engineer',
      organization: 'Digital Engineering Consultancy',
      org_url: 'https://example.com',
      start_date: '2021',
      end_date: '2023',
      is_current: false,
      impact: [
        'Shipped 6 production client web applications on time and within budget.',
        'Led migration of legacy monolith to Next.js micro-frontends, increasing developer velocity by 30%.',
      ],
    },
  },

  // ── Stack ─────────────────────────────────────────────────
  {
    id: 'sk-1',
    section: 'stack',
    type: 'skill',
    sort_order: 0,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: { category: 'Frontend', name: 'TypeScript', level: 5 },
  },
  {
    id: 'sk-2',
    section: 'stack',
    type: 'skill',
    sort_order: 1,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: { category: 'Frontend', name: 'React & Next.js 15', level: 5 },
  },
  {
    id: 'sk-3',
    section: 'stack',
    type: 'skill',
    sort_order: 2,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: { category: 'Frontend', name: 'Tailwind CSS', level: 5 },
  },
  {
    id: 'sk-4',
    section: 'stack',
    type: 'skill',
    sort_order: 3,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: { category: 'Backend', name: 'Node.js', level: 5 },
  },
  {
    id: 'sk-5',
    section: 'stack',
    type: 'skill',
    sort_order: 4,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: { category: 'Backend', name: 'Python', level: 5 },
  },
  {
    id: 'sk-6',
    section: 'stack',
    type: 'skill',
    sort_order: 5,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: { category: 'Backend', name: 'PostgreSQL & Supabase', level: 5 },
  },
  {
    id: 'sk-7',
    section: 'stack',
    type: 'skill',
    sort_order: 6,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: { category: 'AI & Data', name: 'LLM APIs & Agents', level: 5 },
  },
  {
    id: 'sk-8',
    section: 'stack',
    type: 'skill',
    sort_order: 7,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: { category: 'AI & Data', name: 'pgvector / Vector Search', level: 4 },
  },
  {
    id: 'sk-9',
    section: 'stack',
    type: 'skill',
    sort_order: 8,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: { category: 'DevOps & Infra', name: 'Docker', level: 4 },
  },
  {
    id: 'sk-10',
    section: 'stack',
    type: 'skill',
    sort_order: 9,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: { category: 'DevOps & Infra', name: 'Vercel & AWS', level: 5 },
  },

  // ── Testimonials ──────────────────────────────────────────
  {
    id: 'test-1',
    section: 'testimonials',
    type: 'testimonial',
    sort_order: 0,
    is_published: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data: {
      author: 'Alex Rivera',
      role: 'VP of Engineering',
      company: 'TechCorp',
      quote:
        'Aniket delivered our core product two weeks ahead of schedule with zero production bugs. His expertise in full-stack architecture and AI integrations is world-class.',
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
      question: 'What is your availability for freelance and contract work?',
      answer:
        'I am currently accepting select freelance projects, technical consulting, and advisory engagements. Engagements typically kick off within 1–2 weeks following an initial discovery call.',
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
      question: 'How do you structure project engagements and billing?',
      answer:
        'I work on either fixed-scope milestone delivery (best for MVPs and defined features) or weekly sprint retainers (best for ongoing product development and advisory). All terms and deliverables are agreed upon in advance.',
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
      question: 'Can you work with our existing codebase and team?',
      answer:
        'Absolutely. I frequently integrate directly into existing engineering teams via GitHub, Slack, and linear workflows to deliver key features, optimize performance, or add AI functionality.',
    },
  },
];

export async function validatePreviewToken(token: string): Promise<boolean> {
  if (!token) return false;
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
      const filtered = section
        ? DEFAULT_BLOCKS.filter((b) => b.section === section)
        : DEFAULT_BLOCKS;
      return filtered;
    }

    return data as SiteBlock[];
  } catch {
    const filtered = section
      ? DEFAULT_BLOCKS.filter((b) => b.section === section)
      : DEFAULT_BLOCKS;
    return filtered;
  }
}

export async function getBlocksBySection(options?: {
  includeUnpublished?: boolean;
}): Promise<Record<string, SiteBlock[]>> {
  let blocks: SiteBlock[] = [];

  if (options?.includeUnpublished) {
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
        blocks = DEFAULT_BLOCKS;
      }
    } catch {
      blocks = await getAllBlocks();
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
  try {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from('site_blocks')
      .select('*')
      .is('deleted_at', null)
      .order('section')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_BLOCKS;
    }

    return data as SiteBlock[];
  } catch {
    return DEFAULT_BLOCKS;
  }
}

export async function getBlockById(id: string): Promise<SiteBlock | null> {
  try {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from('site_blocks')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error || !data) {
      return DEFAULT_BLOCKS.find((b) => b.id === id) ?? null;
    }

    return data as SiteBlock;
  } catch {
    return DEFAULT_BLOCKS.find((b) => b.id === id) ?? null;
  }
}
