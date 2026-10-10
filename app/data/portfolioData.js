/**
 * ==============================================================================
 * ANIKET MISHRA — PORTFOLIO & FREELANCE DATA LAYER
 * ==============================================================================
 * File: app/data/portfolioData.js
 * 
 * 💡 TIPS TO ADD / EDIT WITHOUT TOUCHING ANY JSX CODE:
 * - Want to add a new project? Add an object in `PROJECTS` array below.
 * - Want to add a service? Add an object in `SERVICES` array below.
 * - Want to change pricing, contact, or skills? Just update the text here!
 * - Zero JSX, Zero SVG, Zero CSS touching required!
 * ==============================================================================
 */

export const PERSONAL_INFO = {
  name: "Aniket Mishra",
  handle: "Mishra-Aniket",
  title: "Full-Stack & AI Systems Engineer",
  tagline: "Engineering Next-Gen Web & AI Products for Founders and Fast-Moving Teams.",
  email: "hello@aniket.one",
  github: "https://github.com/Mishra-Aniket",
  linkedin: "https://www.linkedin.com/in/aniketmishra0",
  twitter: "https://x.com/aniketmishra0",
  location: "Bangalore, India",
  timezone: "IST (UTC+5:30) · Global Remote Availability",
  availability: "Available for Freelance & Contract Sprints",
  avgTurnaround: "2–4 Weeks for Production MVPs",
  stats: [
    { label: "Production MVPs Shipped", value: "14+" },
    { label: "Average Turnaround", value: "2–4 Wks" },
    { label: "Code Ownership & IP", value: "100%" },
    { label: "System Uptime & SLA", value: "99.9%" }
  ]
};

export const PROJECTS = [
  {
    id: "agentic-rag-engine",
    title: "Autonomous Context & RAG Engine",
    subtitle: "Enterprise-Grade Multi-Agent Memory & Retrieval",
    category: "AI Systems",
    featured: true,
    badge: "Production Deployed",
    metrics: "Sub-300ms p95 · 100k+ embeddings · Zero context drift",
    description:
      "Engineered an autonomous multi-agent pipeline with hybrid semantic search (dense vector + sparse BM25), reranking, and persistent cross-session graph memory. Eliminates LLM hallucinations and vendor lock-in.",
    tags: ["Next.js 15", "Python / FastAPI", "PostgreSQL", "pgvector", "LangGraph", "Docker"],
    githubUrl: "https://github.com/Mishra-Aniket",
    liveUrl: "https://aniket.one/#router",
    highlights: [
      "Dynamic prompt routing across Claude 3.5, GPT-4o, and Gemini 1.5",
      "Async pipeline with Redis queue handling high concurrency",
      "Full OpenTelemetry tracing for prompt latency & token spend"
    ]
  },
  {
    id: "realtime-saas-platform",
    title: "HyperScale Analytics & Workflow Hub",
    subtitle: "High-Throughput Collaborative Workspace",
    category: "Full-Stack Web",
    featured: true,
    badge: "Client MVP (3 Weeks)",
    metrics: "2.4k DAU · < 45ms edge latency · 60fps canvas",
    description:
      "Architected and shipped a full-stack SaaS platform from Figma wireframes to production deployment in under 21 days. Features real-time multi-tenant collaboration, automated billing, and live telemetry dashboards.",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Supabase", "Stripe API", "Framer Motion"],
    githubUrl: "https://github.com/Mishra-Aniket",
    liveUrl: "https://aniket.one/#how-it-works",
    highlights: [
      "End-to-end type safety with TypeScript & Zod schemas",
      "Realtime WebSockets sync with optimistic client updates",
      "Automated Stripe billing, team roles & RBAC access control"
    ]
  },
  {
    id: "interactive-3d-visualizer",
    title: "Isometric 3D Systems Canvas",
    subtitle: "Hardware-Accelerated WebGL & SVG Architecture",
    category: "Creative Dev",
    featured: true,
    badge: "Showcase",
    metrics: "60 FPS steady · 0 external 3D bundle bloat",
    description:
      "A bespoke isometric 3D interactive layer visualizer built using pure mathematical projection, SVG matrix transformations, and reactive state. Demonstrates deep craftsmanship in creative front-end engineering.",
    tags: ["React 19", "SVG 3D Transforms", "Web Audio API", "Framer Motion", "Tailwind"],
    githubUrl: "https://github.com/Mishra-Aniket",
    liveUrl: "https://aniket.one/#hero",
    highlights: [
      "Zero heavyweight Three.js bundle overhead (~0KB extra JS)",
      "Synthesized Web Audio clicks & frequency feedback",
      "Touch-optimized gesture navigation for mobile viewports"
    ]
  },
  {
    id: "microservice-api-gateway",
    title: "Distributed Edge Gateway & Auth Engine",
    subtitle: "Low-Latency High-Availability API Microservice",
    category: "Backend & Cloud",
    featured: false,
    badge: "Open Source",
    metrics: "12k req/sec · 99.99% uptime · Distributed rate limits",
    description:
      "High-performance edge reverse proxy and authentication gateway with JWT token verification, token bucket rate limiting, and distributed Redis session storage.",
    tags: ["Go / Python", "Redis", "Cloudflare Workers", "PostgreSQL", "Docker Compose"],
    githubUrl: "https://github.com/Mishra-Aniket",
    liveUrl: "https://aniket.one/#primitives",
    highlights: [
      "Sliding-window distributed rate limiting across edge nodes",
      "Automatic failover and health check telemetry",
      "Clean OpenAPI / Swagger automated documentation"
    ]
  }
];

export const SERVICES = [
  {
    id: "mvp-build",
    icon: "Rocket",
    badge: "Most Popular",
    title: "2–4 Week Rapid MVP Build",
    turnaround: "14 – 28 Days",
    tagline: "From wireframe or idea to production-ready, investor-ready digital product.",
    description:
      "Complete full-stack engineering of your product from scratch. Includes database schema, secure authentication, Stripe billing, polished front-end, and automated cloud CI/CD deployment.",
    deliverables: [
      "Production Next.js 15 + TypeScript front-end",
      "Robust PostgreSQL / Supabase backend architecture",
      "Stripe payment gateway & subscription logic",
      "User authentication (OAuth, magic link, RBAC)",
      "100% source code ownership & handover docs"
    ],
    idealFor: "Founders looking to launch fast or pitch to investors without tech debt."
  },
  {
    id: "ai-agents-rag",
    icon: "Brain",
    badge: "High Demand",
    title: "AI Agents & Context Pipeline",
    turnaround: "10 – 21 Days",
    tagline: "Give your existing app superpowers with autonomous AI workflows.",
    description:
      "Design and deploy production-grade RAG systems, tool-calling autonomous agents, semantic caching, and multi-model LLM routing. We make AI reliable, fast, and cost-efficient.",
    deliverables: [
      "Dense + sparse hybrid vector search (pgvector / Pinecone)",
      "Autonomous tool-calling agents (LangGraph / FastAPI)",
      "Multi-model routing (Claude 3.5, GPT-4o, DeepSeek)",
      "Cost optimization & semantic response caching",
      "Observability dashboard for token spend & latency"
    ],
    idealFor: "Companies wanting to embed intelligent workflows into their product."
  },
  {
    id: "perf-refactor",
    icon: "Cpu",
    badge: "Consulting",
    title: "Architecture & Performance Audit",
    turnaround: "5 – 10 Days",
    tagline: "Fix slow queries, optimize Core Web Vitals, and scale your existing codebase.",
    description:
      "Deep-dive technical audit of your existing web application. We eliminate N+1 database queries, reduce bundle sizes, streamline edge caching, and refactor brittle architecture.",
    deliverables: [
      "Comprehensive bottleneck & latency diagnosis report",
      "Targeted PRs for database indexing & query optimization",
      "Next.js build & edge caching optimization",
      "Security & vulnerability remediation plan",
      "1-on-1 strategy call with your engineering team"
    ],
    idealFor: "Teams experiencing slowdowns, high cloud bills, or technical debt."
  },
  {
    id: "fractional-eng",
    icon: "Shield",
    badge: "Retainer",
    title: "Fractional Full-Stack & AI Lead",
    turnaround: "Monthly Sprints",
    tagline: "Dedicated senior engineering bandwidth embedded into your product team.",
    description:
      "Direct 1-on-1 partnership without the overhead of hiring a full-time senior engineer. Weekly sprints, architecture reviews, pull request reviews, and rapid feature shipping.",
    deliverables: [
      "Guaranteed dedicated weekly sprint bandwidth",
      "Daily asynchronous Slack/Discord communication",
      "System design, PR reviews & feature implementations",
      "Weekly video syncs & roadmap alignment",
      "No long-term lock-in (flexible month-to-month)"
    ],
    idealFor: "Growing startups needing senior leadership to ship high-stakes features."
  }
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    phase: "Discovery & Blueprint",
    timeline: "Days 1 – 3",
    title: "Scope Definition & Tech Architecture",
    description:
      "We jump on a deep-dive call to clarify goals, audit requirements, map database schemas, and establish clear sprint milestones. No vague estimates — you get a transparent delivery blueprint."
  },
  {
    step: "02",
    phase: "Core Build",
    timeline: "Week 1 – 2",
    title: "Rapid Sprints & Live Preview Link",
    description:
      "I build your product in rapid, iterative sprints. You get access to a private staging environment from Week 1 to test live updates, provide feedback, and see daily progress."
  },
  {
    step: "03",
    phase: "AI & Polish",
    timeline: "Week 2 – 3",
    title: "AI Integration, Evals & Edge Performance",
    description:
      "Integration of vector search, AI agent pipelines, payment gateways, and fluid micro-interactions. Every endpoint is stress-tested and optimized for sub-second response times."
  },
  {
    step: "04",
    phase: "Production Launch",
    timeline: "Week 3 – 4",
    title: "Deploy, Docs & 100% Code Handover",
    description:
      "We launch to your production domain (Vercel, AWS, or Docker). I deliver complete documentation, environment variable guides, clean Git commit history, and 14 days of post-launch warranty."
  }
];

export const CLIENT_TESTIMONIALS = [
  {
    quote: "Aniket turned our complex vision into a live, beautifully polished MVP in just 18 days. The speed was incredible, but what impressed me most was the zero-technical-debt code quality. Our investors were blown away.",
    author: "Rahul S.",
    role: "Founder & CEO",
    company: "Stealth AI Platform",
    projectType: "Full-Stack MVP"
  },
  {
    quote: "Finding an engineer who understands both modern UI craftsmanship and low-level AI vector pipelines is rare. Aniket rebuilt our retrieval engine and cut p95 response times by over 60%. Absolute 10/10 experience.",
    author: "David M.",
    role: "Head of Engineering",
    company: "Workflow SaaS",
    projectType: "AI Agent Integration"
  },
  {
    quote: "Communication was frictionless from Day 1. Clear daily async updates, high agency, and complete transparency. It felt like having a co-founder building alongside us.",
    author: "Sneha P.",
    role: "Product Lead",
    company: "FinTech Scaleup",
    projectType: "Next.js & API Architecture"
  }
];
