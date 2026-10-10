import { createClient } from '@supabase/supabase-js';

// Load environment variables (supports local run with tsx)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    '❌ Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set to run the seed script.'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

interface SeedBlock {
  section: string;
  type: string;
  data: Record<string, unknown>;
  sort_order: number;
  is_published: boolean;
}

const SEED_BLOCKS: SeedBlock[] = [
  // ── Hero Section ──────────────────────────────────────────
  {
    section: 'hero',
    type: 'hero',
    sort_order: 0,
    is_published: true,
    data: {
      name: '[REPLACE: Aniket Mishra]',
      role: '[REPLACE: Full-Stack & AI Engineer building scalable web apps and intelligent systems.]',
      availability: 'Open for freelance',
      cta_primary_text: 'Hire me',
      cta_primary_url: '#contact',
      cta_secondary_text: 'View projects',
      cta_secondary_url: '#projects',
    },
  },

  // ── Projects Section ──────────────────────────────────────
  {
    section: 'projects',
    type: 'project',
    sort_order: 0,
    is_published: true,
    data: {
      title: '[REPLACE: Enterprise AI Knowledge Engine]',
      summary: '[REPLACE: High-accuracy RAG pipeline providing instantaneous semantic search across 500k+ documents with verifiable citations.]',
      problem: '[REPLACE: Traditional keyword search failed on complex regulatory queries, resulting in 40% lookup failures.]',
      stack: ['Next.js 15', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'pgvector'],
      status: 'completed',
      featured: true,
      live_url: 'https://example.com',
      repo_url: 'https://github.com/example/knowledge-engine',
    },
  },
  {
    section: 'projects',
    type: 'project',
    sort_order: 1,
    is_published: true,
    data: {
      title: '[REPLACE: High-Throughput E-Commerce Platform]',
      summary: '[REPLACE: Modern serverless commerce application handling 5,000+ peak checkout requests/sec with zero downtime.]',
      problem: '[REPLACE: Legacy monolithic checkout crashed under flash sale concurrency spikes.]',
      stack: ['Next.js', 'Node.js', 'Tailwind CSS', 'Redis', 'Stripe'],
      status: 'completed',
      featured: false,
      live_url: 'https://example.com',
    },
  },

  // ── Services Section ──────────────────────────────────────
  {
    section: 'services',
    type: 'service',
    sort_order: 0,
    is_published: true,
    data: {
      title: '[REPLACE: Full-Stack Web Development]',
      description: '[REPLACE: End-to-end production web applications designed for speed, security, and effortless maintainability.]',
      duration: '2–6 weeks',
      best_for: 'Startups and companies launching new products or rebuilding existing web apps',
      includes: [
        'Next.js 15 App Router architecture',
        'Relational database modeling and migrations',
        'Authentication, authorization, and security headers',
        'Deployment on Vercel or cloud providers with automated CI/CD',
      ],
    },
  },
  {
    section: 'services',
    type: 'service',
    sort_order: 1,
    is_published: true,
    data: {
      title: '[REPLACE: AI & LLM Systems Integration]',
      description: '[REPLACE: Custom retrieval-augmented generation (RAG), autonomous agent loops, and streaming AI interfaces.]',
      duration: '1–4 weeks',
      best_for: 'Teams looking to add practical, accurate AI capabilities to their product',
      includes: [
        'Semantic search and vector database setup (pgvector)',
        'Streaming LLM UX with graceful failure states',
        'Cost, latency, and token efficiency optimization',
        'Prompt engineering and evaluation benchmarks',
      ],
    },
  },
  {
    section: 'services',
    type: 'service',
    sort_order: 2,
    is_published: true,
    data: {
      title: '[REPLACE: Architecture & Performance Audits]',
      description: '[REPLACE: Deep-dive assessment to eliminate latency, optimize database queries, and strengthen application security.]',
      duration: '3–5 days',
      best_for: 'Products suffering from slow Core Web Vitals, high server bills, or scaling issues',
      includes: [
        'Comprehensive Core Web Vitals profiling',
        'Database query plan analysis and index recommendations',
        'Security headers, CSP, and RLS vulnerability verification',
        'Prioritized, actionable remediation plan',
      ],
    },
  },

  // ── Experience Section ────────────────────────────────────
  {
    section: 'experience',
    type: 'job',
    sort_order: 0,
    is_published: true,
    data: {
      role: '[REPLACE: Lead AI / Full-Stack Engineer]',
      organization: '[REPLACE: Venture-Backed AI Startup]',
      org_url: 'https://example.com',
      start_date: '2023',
      end_date: '',
      is_current: true,
      impact: [
        '[REPLACE: Architected streaming AI interface reducing first-token latency by 45%.]',
        '[REPLACE: Scaled user base from 0 to 50k monthly active users with 99.95% uptime.]',
        '[REPLACE: Mentored 4 engineers and established automated end-to-end testing pipeline.]',
      ],
    },
  },
  {
    section: 'experience',
    type: 'job',
    sort_order: 1,
    is_published: true,
    data: {
      role: '[REPLACE: Senior Full-Stack Engineer]',
      organization: '[REPLACE: Digital Engineering Consultancy]',
      org_url: 'https://example.com',
      start_date: '2021',
      end_date: '2023',
      is_current: false,
      impact: [
        '[REPLACE: Shipped 6 production client web applications on time and within budget.]',
        '[REPLACE: Led migration of legacy monolith to Next.js micro-frontends, increasing developer velocity by 30%.]',
      ],
    },
  },

  // ── Stack Section ─────────────────────────────────────────
  {
    section: 'stack',
    type: 'skill',
    sort_order: 0,
    is_published: true,
    data: { category: 'Frontend', name: 'TypeScript', level: 5 },
  },
  {
    section: 'stack',
    type: 'skill',
    sort_order: 1,
    is_published: true,
    data: { category: 'Frontend', name: 'React & Next.js 15', level: 5 },
  },
  {
    section: 'stack',
    type: 'skill',
    sort_order: 2,
    is_published: true,
    data: { category: 'Frontend', name: 'Tailwind CSS', level: 5 },
  },
  {
    section: 'stack',
    type: 'skill',
    sort_order: 3,
    is_published: true,
    data: { category: 'Backend', name: 'Node.js', level: 5 },
  },
  {
    section: 'stack',
    type: 'skill',
    sort_order: 4,
    is_published: true,
    data: { category: 'Backend', name: 'Python', level: 5 },
  },
  {
    section: 'stack',
    type: 'skill',
    sort_order: 5,
    is_published: true,
    data: { category: 'Backend', name: 'PostgreSQL & Supabase', level: 5 },
  },
  {
    section: 'stack',
    type: 'skill',
    sort_order: 6,
    is_published: true,
    data: { category: 'AI & Data', name: 'LLM APIs & Agents', level: 5 },
  },
  {
    section: 'stack',
    type: 'skill',
    sort_order: 7,
    is_published: true,
    data: { category: 'AI & Data', name: 'pgvector / Vector Search', level: 4 },
  },
  {
    section: 'stack',
    type: 'skill',
    sort_order: 8,
    is_published: true,
    data: { category: 'DevOps & Infra', name: 'Docker', level: 4 },
  },
  {
    section: 'stack',
    type: 'skill',
    sort_order: 9,
    is_published: true,
    data: { category: 'DevOps & Infra', name: 'Vercel & AWS', level: 5 },
  },

  // ── Testimonials Section ──────────────────────────────────
  {
    section: 'testimonials',
    type: 'testimonial',
    sort_order: 0,
    is_published: true,
    data: {
      author: '[REPLACE: Jordan Lee]',
      role: 'Founder & CEO',
      company: '[REPLACE: Nexus Labs]',
      quote: '[REPLACE: Working with Aniket was hands down the best engineering collaboration we had. He quickly grasped our complex product vision, executed with exceptional attention to detail, and shipped well ahead of schedule.]',
    },
  },

  // ── FAQ Section ───────────────────────────────────────────
  {
    section: 'faq',
    type: 'faq',
    sort_order: 0,
    is_published: true,
    data: {
      question: 'What is your availability for freelance and contract work?',
      answer: '[REPLACE: I am currently accepting select freelance projects, technical consulting, and advisory engagements. Engagements typically kick off within 1–2 weeks following an initial discovery call.]',
    },
  },
  {
    section: 'faq',
    type: 'faq',
    sort_order: 1,
    is_published: true,
    data: {
      question: 'How do you structure project engagements and billing?',
      answer: '[REPLACE: I work on either fixed-scope milestone delivery (best for MVPs and defined features) or weekly sprint retainers (best for ongoing product development and advisory). All terms and deliverables are agreed upon in advance.]',
    },
  },
  {
    section: 'faq',
    type: 'faq',
    sort_order: 2,
    is_published: true,
    data: {
      question: 'Can you work with our existing codebase and team?',
      answer: '[REPLACE: Absolutely. I frequently integrate directly into existing engineering teams via GitHub, Slack, and linear workflows to deliver key features, optimize performance, or add AI functionality.]',
    },
  },
];

async function seed() {
  console.log('🌱 Starting database seed...');

  // Check if blocks already exist
  const { data: existing, error: checkError } = await supabase
    .from('site_blocks')
    .select('id')
    .limit(1);

  if (checkError) {
    console.error('❌ Failed to check existing blocks:', checkError.message);
    process.exit(1);
  }

  if (existing && existing.length > 0) {
    console.log('ℹ️ Site blocks already exist in the database. Skipping seed to prevent overwriting existing data.');
    console.log('   (To re-seed, truncate the site_blocks table first).');
    process.exit(0);
  }

  const { data, error } = await supabase
    .from('site_blocks')
    .insert(SEED_BLOCKS)
    .select('id, section, type');

  if (error) {
    console.error('❌ Error seeding site_blocks:', error.message);
    process.exit(1);
  }

  console.log(`✅ Successfully seeded ${data.length} site blocks with placeholder data.`);
  console.log('👉 Remember to update all [REPLACE: ...] placeholder markers via the admin panel!');
}

seed().catch((err) => {
  console.error('❌ Unexpected seed error:', err);
  process.exit(1);
});
