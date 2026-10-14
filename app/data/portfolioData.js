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
  handle: "aniketmishra-0",
  title: "Full-Stack, AI & Systems Engineer",
  tagline: "Engineering Next-Gen Web, Edge & Automation Products for High-Growth Teams.",
  email: "aniketmishra492@gmail.com",
  github: "https://github.com/aniketmishra-0",
  linkedin: "https://www.linkedin.com/in/aniketmishra0",
  twitter: "https://x.com/aniket_mishra0",
  location: "India · Global Remote Availability",
  timezone: "IST (UTC+5:30) · Global Remote Availability",
  availability: "Available for Freelance & High-Impact Contracts",
  avgTurnaround: "2–4 Weeks for Production MVPs",
  stats: [
    { label: "Daily Enterprise Lectures Handled", value: "20,000+" },
    { label: "PW Centers & Operations Scaled", value: "500+" },
    { label: "Production Tools Shipped", value: "10+" },
    { label: "Cloud Egress Cost Saved", value: "100%" }
  ]
};

export const PROJECTS = [
  {
    id: "centrix",
    title: "Centrix — Autonomous Lecture Ingestion",
    subtitle: "Edge-First Operations Platform for 500+ PW Centers",
    category: "Enterprise & Edge Systems",
    featured: true,
    badge: "Production Deployed (Physics Wallah)",
    metrics: "500+ Centers · 10,000–20,000 Lectures/Day · Zero Cloud Egress Cost",
    description:
      "Engineered an edge-first automated ingestion engine for Physics Wallah Vidyapeeth centers across India. Automatically pairs OBS/capture card recordings with MaxHub interactive flat panel notes, matches timetables using confidence scoring, and executes chunked resumable uploads directly to Google Drive with zero central bandwidth cost.",
    tags: [".NET 8 (C#)", "React 18", "TypeScript", "SQLite WAL", "Google Drive API v3", "Tailwind CSS"],
    githubUrl: "https://github.com/aniketmishra-0/Centrix",
    liveUrl: "https://github.com/aniketmishra-0/Centrix",
    liveLabel: "View Architecture & Repo",
    highlights: [
      "Sub-second write stability detection for OBS .mkv/.mp4 & MaxHub .pdf notes",
      "Weighted multi-factor confidence engine for automated timetable slot matching",
      "Direct chunked resumable upload to Google Drive saving petabytes in egress costs"
    ]
  },
  {
    id: "qpic",
    title: "Qpic — Smart Exam Paper Splitter & OCR Studio",
    subtitle: "3-Tier Detection Engine & Cross-Platform Desktop App",
    category: "AI & Document Intelligence",
    featured: true,
    badge: "Open Source / Production",
    metrics: "14-Stage Pipeline · Sub-2s per Paper · Bilingual Auto-Stitch",
    description:
      "FastAPI and Flutter desktop app that parses complex MCQ exam PDFs, detects questions via a 3-tier pipeline (native text layer → Tesseract OCR → Claude vision fallback), crops/stitches multi-page questions, and automatically extracts answer keys to CSV/JSON.",
    tags: ["Python (FastAPI)", "Flutter / Dart", "PyMuPDF", "OpenCV", "Tesseract OCR", "Claude AI"],
    githubUrl: "https://github.com/aniketmishra-0/Qpic",
    liveUrl: "https://github.com/aniketmishra-0/Qpic",
    liveLabel: "Inspect Engine & GitHub",
    highlights: [
      "14-stage document processing pipeline with deskew, denoise, and auto-binarization",
      "Bilingual side-by-side Hindi & English column detection and auto-stitching",
      "Bundled Python sidecar engine running seamlessly inside native Flutter desktop app"
    ]
  },
  {
    id: "thumbcraft",
    title: "ThumbCraft — 1-Click EdTech Thumbnail Studio",
    subtitle: "Automated YouTube & App Asset Generator",
    category: "GenAI & Creative Tools",
    featured: true,
    badge: "Live Production Tool",
    metrics: "1-Click Generation · 100+ PW Presets · Zero Server Lag",
    description:
      "High-speed thumbnail generation studio for educators and creators. Features Google Gemini GenAI integration, automated typography placement, Physics Wallah faculty/batch asset presets, and Google Sheets batch export.",
    tags: ["React 19", "Google GenAI SDK", "HTML5 Canvas", "Vite", "Tailwind CSS", "JSZip"],
    githubUrl: "https://github.com/aniketmishra-0/thumbcraft",
    liveUrl: "https://github.com/aniketmishra-0/thumbcraft",
    liveLabel: "Explore Studio Code",
    highlights: [
      "Direct browser HTML5 Canvas rendering for instant zero-latency export",
      "Automated batch thumbnail generation synchronized from Google Sheets",
      "Built-in faculty library, chapter tagging, and high-CTR layout presets"
    ]
  },
  {
    id: "radialmenu",
    title: "RadialMenu — Windows Radial App Launcher",
    subtitle: "Modern Circular Power-User Launcher for Windows 10/11",
    category: "Desktop & Systems",
    featured: true,
    badge: "Open Source (.NET 8 / WPF)",
    metrics: "Sub-5ms Hotkey Launch · 60 FPS WPF · Fuzzy Search HUD",
    description:
      "A modern circular application launcher and fuzzy search HUD for Windows 10/11 built with C# and WPF. Brings macOS-style radial aesthetics with global hotkeys, 8 configurable app slots, and lightning-fast keyboard navigation.",
    tags: [".NET 8", "C#", "WPF", "Windows API", "XAML"],
    githubUrl: "https://github.com/aniketmishra-0/RedialWin",
    liveUrl: "https://github.com/aniketmishra-0/RedialWin",
    liveLabel: "Download on GitHub",
    highlights: [
      "Global hotkey registration with instant hardware-accelerated rendering",
      "Fuzzy search indexing across all installed Windows applications",
      "Glassmorphism blur effects with low RAM and CPU footprint"
    ]
  },
  {
    id: "imgworld",
    title: "imgworld.biz — Client-Side Image Tools Studio",
    subtitle: "Zero-Server Privacy-First Media Processing Suite",
    category: "Web Tools & Privacy",
    featured: true,
    badge: "Live Production Site",
    metrics: "100% On-Device · 0 Bytes Sent to Cloud · ONNX Web AI",
    description:
      "A comprehensive in-browser image editing suite running entirely on the user's hardware. Utilizes the native Canvas API, Web ImageDecoder, FaceDetector, and on-device ONNX background removal models without server uploads.",
    tags: ["React 19", "ONNX Runtime Web", "Web ImageDecoder", "Canvas API", "Vite", "Tailwind CSS"],
    githubUrl: "https://github.com/aniketmishra-0/imgWorld.biz",
    liveUrl: "https://imgworld.biz",
    liveLabel: "Launch Live Site (imgworld.biz)",
    highlights: [
      "On-device AI background removal using WebAssembly & ONNX Runtime",
      "Client-side batch image conversion, cropping, and compression",
      "Zero telemetry and strict user data privacy compliance"
    ]
  },
  {
    id: "officemobile",
    title: "Office Mobile — Google Sheet to Mobile Interface",
    subtitle: "Instant Dynamic Forms & Viewer for Spreadsheets",
    category: "Cloud & Productivity",
    featured: true,
    badge: "Live Web Application",
    metrics: "1-Click Setup · Real-time OAuth 2.0 · Live PWA",
    description:
      "Transforms any Google Spreadsheet into an intuitive, mobile-first data entry and viewing PWA. Authenticates via Google OAuth 2.0, parses column schemas, and generates instant entry forms without requiring code or third-party database setups.",
    tags: ["Next.js", "React", "Google Sheets API", "OAuth 2.0", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/aniketmishra-0",
    liveUrl: "https://officemobile.vercel.app",
    liveLabel: "Launch App (officemobile.vercel.app)",
    highlights: [
      "Instant dynamic form generation from any public or private Google Sheet",
      "Bi-directional real-time row reading and writing with zero backend lag",
      "Lightweight, mobile-responsive PWA optimized for fieldwork and operations"
    ]
  },
  {
    id: "pw-qc-assistant",
    title: "PW Automation & QC Assistant (v3.6.0)",
    subtitle: "Internal Chrome Extension for PenPencil Admin",
    category: "Browser Automation & Ops",
    featured: false,
    badge: "Internal Enterprise Tool",
    metrics: "v3.6.0 Stable · 4 hrs → 15 mins · 1,000+ Batches",
    description:
      "Manifest V3 Chrome Extension developed for Physics Wallah academic operations. Automates batch scheduling, QA validation, student attendance auditing, and test management directly on the PenPencil Admin portal.",
    tags: ["Chrome Extensions (MV3)", "JavaScript", "Google Apps Script", "DOM Automation"],
    githubUrl: "https://github.com/aniketmishra-0",
    liveUrl: "https://github.com/aniketmishra-0",
    liveLabel: "Extension Overview",
    highlights: [
      "Automates complex multi-step batch scheduling on PenPencil Admin",
      "Real-time error flagging and fatal mistake prevention for operators",
      "Integrated with Google Sheets MIS reporting pipelines"
    ]
  },
  {
    id: "omtabs",
    title: "OmTabs — Chrome Tab Management & Privacy Shield",
    subtitle: "Custom Tab Renaming, Biometric Lock & Tab Organization",
    category: "Productivity Tools",
    featured: false,
    badge: "Chrome Web Store Tool",
    metrics: "Sub-10ms Rename · Biometric Shield · Zero Latency",
    description:
      "Chrome extension that enables power users to rename open browser tabs with custom titles, protect sensitive tabs with biometric/passcode shields, and organize work sessions effortlessly.",
    tags: ["Chrome Extension (MV3)", "JavaScript", "WebAuthn / Biometrics", "CSS3"],
    githubUrl: "https://github.com/aniketmishra-0",
    liveUrl: "https://github.com/aniketmishra-0",
    liveLabel: "Inspect Extension",
    highlights: [
      "Instant tab title customization with keyboard shortcuts (Alt+Shift+R)",
      "Shield lock privacy mechanism to hide sensitive tabs when stepping away",
      "Persistent session memory with zero browser slowdown"
    ]
  },
  {
    id: "nexus-streamer",
    title: "Nexus — Autonomous Drive to YouTube Matrix",
    subtitle: "Zero-RAM Cloud-to-Cloud Video Streamer",
    category: "Cloud & Media Streaming",
    featured: false,
    badge: "Cloud Pipeline",
    metrics: "Zero-RAM Streaming · Real-Time SSE · Resumable Uploads",
    description:
      "Automated streaming pipeline that bridges Google Drive and YouTube. Streams multi-gigabyte video files directly to YouTube as Unlisted assets with chunk-by-chunk Node.js stream transforms and live Server-Sent Events (SSE) telemetry.",
    tags: ["Node.js", "Express", "Google YouTube API", "SSE", "Docker"],
    githubUrl: "https://github.com/aniketmishra-0",
    liveUrl: "https://github.com/aniketmishra-0",
    liveLabel: "View Pipeline",
    highlights: [
      "Zero-gravity memory footprint using Node.js stream pipelines",
      "Real-time live progress broadcasting via Server-Sent Events (SSE)",
      "Automated metadata tagging and unlisted asset provisioning"
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
