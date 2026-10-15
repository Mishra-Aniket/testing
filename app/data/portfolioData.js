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
  location: "Prayagraj, Uttar Pradesh, India · Global Remote Availability",
  registeredAddress: "EWS C-2/70, Naini, Chaka, Prayagraj, UP - 211008, India",
  udyamRegNo: "UDYAM-UP-03-0065855",
  enterpriseType: "Micro (Services) · Govt. of India MSME",
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
    id: "omtabs",
    title: "OmTabs — Chrome Tab Management & Privacy Shield",
    subtitle: "Custom Tab Renaming, Biometric Lock & Tab Organization",
    category: "Chrome Extension",
    featured: true,
    badge: "Chrome Web Store (Official)",
    metrics: "Official Web Store · Sub-10ms Rename · Biometric Shield",
    description:
      "Chrome extension that enables power users to rename open browser tabs with custom titles, protect sensitive tabs with biometric/passcode shields, and organize work sessions effortlessly.",
    tags: ["Chrome Extension (MV3)", "JavaScript", "WebAuthn / Biometrics", "CSS3", "Chrome Storage"],
    githubUrl: "https://github.com/aniketmishra-0",
    liveUrl: "https://chromewebstore.google.com/detail/omtabs/innncdapnjlnjdgkdjjajbiebeppieaf",
    liveLabel: "Add to Chrome (Web Store)",
    highlights: [
      "Instant tab title customization with keyboard shortcuts (Alt+Shift+R)",
      "Shield lock privacy mechanism to hide sensitive tabs when stepping away",
      "Persistent session memory with zero browser slowdown"
    ]
  },
  {
    id: "omspace",
    title: "OmSpace — New Tab Dashboard & Focus Studio",
    subtitle: "Customizable Productivity Hub for Chrome",
    category: "Chrome Extension",
    featured: true,
    badge: "Chrome Web Store (Official)",
    metrics: "Official Web Store · Zero Latency · Focus Mode",
    description:
      "A customizable new tab dashboard with browser-default search, focus tools, widgets, and quick-access surfaces. Built for power users who want an organized, distraction-free browser workspace every time a new tab is opened.",
    tags: ["Chrome Extension (MV3)", "JavaScript", "React / HTML5", "LocalStorage", "Widgets"],
    githubUrl: "https://github.com/aniketmishra-0",
    liveUrl: "https://chromewebstore.google.com/detail/omspace-new-tab-dashboard/hofalojlkckeopheldapdcickcmeihmd?utm_source=ext_app_menu",
    liveLabel: "Add to Chrome (Web Store)",
    highlights: [
      "Customizable new tab dashboard with built-in search & quick access surfaces",
      "Integrated focus tools, widgets, and personalized workspace layout",
      "Lightweight, instant boot with zero impact on browser memory"
    ]
  },
  {
    id: "gps-cam",
    title: "GPS Cam (GPSnap) — Geotagged Media Stamper",
    subtitle: "Real-Time GPS Coordinate & Video Watermarking Engine",
    category: "Mobile & Android Systems",
    featured: true,
    badge: "Native Android (Kotlin)",
    metrics: "Sub-100ms Geocoding · Native CameraX · Drive Sync",
    description:
      "Native Android application built with Kotlin and Jetpack Compose for field operations, auditing, and academic centers. Captures high-res photos and videos with real-time dynamic overlays of GPS coordinates, elevation, timestamp, and address with direct Google Drive upload.",
    tags: ["Android", "Kotlin", "Jetpack Compose", "CameraX", "Google Location Services", "Drive API"],
    githubUrl: "https://github.com/aniketmishra-0",
    liveUrl: "Live Demo Will Be Provided Soon",
    liveLabel: "Live Demo Will Be Provided Soon",
    highlights: [
      "Real-time dynamic canvas stamping for both photos and MP4 video recordings",
      "Accurate GPS coordinate, elevation, and reverse geocoded address stamping",
      "Integrated background sync pipeline to upload audited media straight to Google Drive"
    ]
  },
  {
    id: "nexus-streamer",
    title: "Nexus Streamer — Drive to YouTube Ingestion Matrix",
    subtitle: "Zero-RAM Cloud-to-Cloud Video Streamer",
    category: "Cloud & Media Streaming",
    featured: true,
    badge: "HuggingFace Live Space",
    metrics: "Zero-RAM Streaming · Real-Time SSE · Resumable Uploads",
    description:
      "Autonomous cloud pipeline bridging Google Drive and YouTube. Streams multi-gigabyte video files directly to YouTube as Unlisted assets with chunk-by-chunk Node.js stream transforms and live Server-Sent Events (SSE) telemetry without filling server RAM.",
    tags: ["Node.js", "Express", "Google YouTube API", "SSE", "Docker", "HuggingFace"],
    githubUrl: "https://github.com/aniketmishra-0",
    liveUrl: "https://pwvp-drive2youtube.hf.space/",
    liveLabel: "Launch Streamer (Live Space)",
    docsUrl: "https://docs.google.com/document/d/e/2PACX-1vT6DnA5CWBdEr1rqZD7jFVhUi6zDSUEUb-4UtuLafIeyhev9tTVL0lW_5SbHcmOcEfySbIQ8_iSiBSU/pub",
    highlights: [
      "Zero-gravity memory footprint using Node.js stream pipelines",
      "Real-time live progress broadcasting via Server-Sent Events (SSE)",
      "Automated metadata tagging and unlisted asset provisioning"
    ]
  },
  {
    id: "radialmenu",
    title: "RadialMenu — Windows Radial App Launcher",
    subtitle: "Modern Circular Power-User Launcher for Windows 10/11",
    category: "Desktop & Systems",
    featured: true,
    badge: "Windows Releases Live",
    metrics: "Sub-5ms Hotkey Launch · 60 FPS WPF · Fuzzy Search HUD",
    description:
      "A modern circular application launcher and fuzzy search HUD for Windows 10/11 built with C# and WPF. Brings macOS-style radial aesthetics with global hotkeys, 8 configurable app slots, and lightning-fast keyboard navigation.",
    tags: [".NET 8", "C#", "WPF", "Windows API", "XAML"],
    githubUrl: "https://github.com/aniketmishra-0/RedialWin",
    liveUrl: "https://aniketmishra-0.github.io/RedialMenu-releases/",
    liveLabel: "Download Release (.exe)",
    highlights: [
      "Global hotkey registration with instant hardware-accelerated rendering",
      "Fuzzy search indexing across all installed Windows applications",
      "Glassmorphism blur effects with low RAM and CPU footprint"
    ]
  },
  {
    id: "imgworld",
    title: "ImgWorld.biz — Client-Side Image Tools Studio",
    subtitle: "Zero-Server Privacy-First Media Processing Suite",
    category: "Web Tools & Privacy",
    featured: true,
    badge: "Live Production (ImgWorld.biz)",
    metrics: "100% On-Device · 0 Bytes Sent to Cloud · ONNX Web AI",
    description:
      "A comprehensive in-browser image editing suite running entirely on the user's hardware. Utilizes the native Canvas API, Web ImageDecoder, FaceDetector, and on-device ONNX background removal models without server uploads.",
    tags: ["React 19", "ONNX Runtime Web", "Web ImageDecoder", "Canvas API", "Vite", "Tailwind CSS"],
    githubUrl: "https://github.com/aniketmishra-0/imgWorld.biz",
    liveUrl: "https://www.imgworld.biz/",
    liveLabel: "Launch ImgWorld.biz",
    highlights: [
      "On-device AI background removal using WebAssembly & ONNX Runtime",
      "Client-side batch image conversion, cropping, and compression",
      "Zero telemetry and strict user data privacy compliance"
    ]
  },
  {
    id: "qpic",
    title: "Qpic — Smart Exam Paper Splitter & OCR Studio",
    subtitle: "3-Tier Detection Engine & Cross-Platform Desktop App",
    category: "AI & Document Intelligence",
    featured: true,
    badge: "Production Pipeline",
    metrics: "14-Stage Pipeline · Sub-2s per Paper · Bilingual Auto-Stitch",
    description:
      "FastAPI and Flutter desktop app that parses complex MCQ exam PDFs, detects questions via a 3-tier pipeline (native text layer → Tesseract OCR → Claude vision fallback), crops/stitches multi-page questions, and automatically extracts answer keys to CSV/JSON.",
    tags: ["Python (FastAPI)", "Flutter / Dart", "PyMuPDF", "OpenCV", "Tesseract OCR", "Claude AI"],
    githubUrl: "https://github.com/aniketmishra-0/Qpic",
    liveUrl: "Live Demo Will Be Provided Soon",
    liveLabel: "Live Demo Will Be Provided Soon",
    highlights: [
      "14-stage document processing pipeline with deskew, denoise, and auto-binarization",
      "Bilingual side-by-side Hindi & English column detection and auto-stitching",
      "Bundled Python sidecar engine running seamlessly inside native Flutter desktop app"
    ]
  },
  {
    id: "officemobile",
    title: "Office Mobile — Google Sheet to Mobile Interface",
    subtitle: "Instant Dynamic Forms & Viewer for Spreadsheets",
    category: "Cloud & Productivity",
    featured: true,
    badge: "Live Production PWA",
    metrics: "1-Click Setup · Real-time OAuth 2.0 · Live PWA",
    description:
      "Transforms any Google Spreadsheet into an intuitive, mobile-first data entry and viewing PWA. Authenticates via Google OAuth 2.0, parses column schemas, and generates instant entry forms without requiring code or third-party database setups.",
    tags: ["Next.js", "React", "Google Sheets API", "OAuth 2.0", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/aniketmishra-0",
    liveUrl: "https://officemobile.vercel.app/",
    liveLabel: "Launch officemobile.vercel.app",
    highlights: [
      "Instant dynamic form generation from any public or private Google Sheet",
      "Bi-directional real-time row reading and writing with zero backend lag",
      "Lightweight, mobile-responsive PWA optimized for fieldwork and operations"
    ]
  },
  {
    id: "centrix",
    title: "Centrix — Autonomous Lecture Ingestion Pipeline",
    subtitle: "Edge-First Operations Platform for 500+ PW Centers",
    category: "Enterprise & Edge Systems",
    featured: true,
    badge: "Live Interactive Demo",
    metrics: "500+ Centers · 10,000–20,000 Lectures/Day · Zero Cloud Egress Cost",
    description:
      "Engineered an edge-first automated ingestion engine for Physics Wallah Vidyapeeth centers across India. Automatically pairs OBS/capture card recordings with MaxHub interactive flat panel notes, matches timetables using confidence scoring, and executes chunked resumable uploads directly to Google Drive with zero central bandwidth cost.",
    tags: [".NET 8 (C#)", "React 18", "TypeScript", "SQLite WAL", "Google Drive API v3", "Tailwind CSS"],
    githubUrl: "https://github.com/aniketmishra-0/Centrix",
    liveUrl: "https://aniketmishra-0.github.io/Centrix_Demo/",
    liveLabel: "Launch Centrix Demo",
    highlights: [
      "Sub-second write stability detection for OBS .mkv/.mp4 & MaxHub .pdf notes",
      "Weighted multi-factor confidence engine for automated timetable slot matching",
      "Direct chunked resumable upload to Google Drive saving petabytes in egress costs"
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
    tagline: "From wireframe or idea to a launched, production-ready product.",
    description:
      "Complete full-stack development of your web product from scratch. Clean database schemas, responsive UI, authentication, payment integration, and cloud deployment.",
    deliverables: [
      "Next.js 15, React & TypeScript front-end",
      "PostgreSQL / Supabase database architecture",
      "User authentication & role-based permissions",
      "Stripe or Razorpay payment integration",
      "100% source code ownership & handover docs"
    ],
    idealFor: "Founders looking to launch fast without accumulating technical debt."
  },
  {
    id: "chrome-extensions",
    icon: "Layers",
    badge: "High Demand",
    title: "Custom Chrome Extensions & Tools",
    turnaround: "7 – 14 Days",
    tagline: "Build powerful productivity extensions and browser-based tools.",
    description:
      "End-to-end development of Chrome extensions in Manifest V3 (like OmTabs & OmSpace). Includes background service workers, local data persistence, custom tab workflows, and official Web Store packaging.",
    deliverables: [
      "Manifest V3 compliant extension architecture",
      "Local storage & fast state persistence (chrome.storage)",
      "Custom popup, side-panel, or new-tab dashboard UI",
      "Biometric / passcode shield privacy mechanisms",
      "Packaging & submission support for Chrome Web Store"
    ],
    idealFor: "Founders, creators, and businesses needing custom browser tools."
  },
  {
    id: "api-automation",
    icon: "Cpu",
    badge: "Enterprise Scale",
    title: "High-Scale APIs & Cloud Automations",
    turnaround: "10 – 21 Days",
    tagline: "Automate business workflows and process data/media at scale.",
    description:
      "High-throughput backend services and background workers built with .NET 8 / C# or Python FastAPI. Automate document syncing, media conversion, or cloud distribution (like Centrix across 500+ centers and Nexus Streamer).",
    deliverables: [
      "High-speed REST APIs in .NET 8 or Python FastAPI",
      "Automated Google Drive, YouTube, or Cloud Storage sync",
      "Background worker queues & real-time event updates",
      "Zero-RAM streaming pipelines for large media files",
      "Docker multi-stage containers & automated CI/CD"
    ],
    idealFor: "Companies needing reliable background automation and fast data pipelines."
  },
  {
    id: "perf-refactor",
    icon: "Shield",
    badge: "Consulting",
    title: "Performance Tuning & Code Audits",
    turnaround: "5 – 10 Days",
    tagline: "Speed up slow web apps, eliminate bugs, and scale your code.",
    description:
      "Deep-dive technical review of your existing web application. We eliminate slow database queries, reduce bundle sizes, streamline caching, and refactor brittle code.",
    deliverables: [
      "Comprehensive latency and bottleneck audit report",
      "Targeted PRs for database indexing & query optimization",
      "Front-end build & asset caching improvements",
      "Code refactoring for better readability & stability",
      "1-on-1 walkthrough session with your engineering team"
    ],
    idealFor: "Teams dealing with app slowdowns, high server bills, or messy codebases."
  }
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    phase: "Discovery & Blueprint",
    timeline: "Days 1 – 3",
    title: "Scope Definition & Tech Architecture",
    description:
      "We jump on a call to clarify goals, map out database tables, and establish clear sprint milestones. You get a transparent delivery blueprint before any code is written."
  },
  {
    step: "02",
    phase: "Core Build",
    timeline: "Week 1 – 2",
    title: "Rapid Sprints & Live Preview Link",
    description:
      "I build your product in rapid, iterative sprints. You get access to a private staging URL to test live updates, provide feedback, and track real progress."
  },
  {
    step: "03",
    phase: "Testing & Hardening",
    timeline: "Week 2 – 3",
    title: "Testing, Optimization & Edge Polish",
    description:
      "Stress testing endpoints, cross-browser verification, sub-100ms response time tuning, and edge cases. Everything is polished and hardened before release."
  },
  {
    step: "04",
    phase: "Production Launch",
    timeline: "Week 3 – 4",
    title: "Deploy, Docs & 100% Code Handover",
    description:
      "We launch to your production domain (Vercel, AWS, or Docker). You get complete documentation, environment guides, clean Git commit history, and 14 days of post-launch warranty."
  }
];

export const CLIENT_TESTIMONIALS = [
  {
    quote: "Centrix completely streamlined our daily operations across 500+ physical centers. Pairing lecture recordings with whiteboard notes and syncing directly to Google Drive saved petabytes in bandwidth and eliminated hours of manual work.",
    author: "Centrix Operations Team",
    role: "500+ Centers Scaled",
    company: "Physics Wallah Vidyapeeth",
    projectType: "Enterprise Automation"
  },
  {
    quote: "OmTabs solved a major daily frustration with browser tab overload. The custom tab renaming and privacy shield work instantly with zero lag. It feels like a native browser feature.",
    author: "Verified Chrome User",
    role: "Power User Review",
    company: "Chrome Web Store",
    projectType: "Chrome Extension"
  },
  {
    quote: "Aniket shipped our full-stack MVP in less than 3 weeks. Communication was clear every day, the code was strictly typed with zero shortcuts, and the handover was completely seamless.",
    author: "SaaS Startup Founder",
    role: "Founder & CEO",
    company: "Direct Client Sprint",
    projectType: "Full-Stack MVP"
  }
];

export const STUDENT_OFFERS = [
  {
    id: "mentorship",
    title: "1-on-1 Engineering & Career Guidance",
    badge: "100% Free",
    highlight: "30-Min Direct 1-on-1 Session",
    tagline: "Break into modern full-stack & AI engineering without getting lost in tutorial hell.",
    description: "Stuck on your project architecture, tech stack selection, or breaking into modern engineering? Book a direct session with zero charges. We will review your roadmaps, solve blockers, and give you production perspective.",
    perks: [
      "Architecture & system design walkthrough for your college or side project",
      "Resume, portfolio & GitHub audit with honest, actionable feedback",
      "Career roadmap for modern full-stack, AI agents, and systems engineering"
    ],
    actionLabel: "Book Free Session",
    actionUrl: "mailto:aniketmishra492@gmail.com?subject=Student%20Mentorship%20Request%20-%20[Your%20Name]&body=Hi%20Aniket,%20I%20am%20a%20student%20looking%20for%20guidance%20on...",
  },
  {
    id: "code-review",
    title: "Free PR & Architecture Code Review",
    badge: "Zero Cost",
    highlight: "Production-Grade Engineering Feedback",
    tagline: "Get your GitHub repo reviewed like it's being reviewed at a top tech company.",
    description: "Building your college final-year project, hackathon MVP, or open-source tool? Share your GitHub repository for a comprehensive architectural, security, and performance review.",
    perks: [
      "Identification of performance bottlenecks, memory leaks & security flaws",
      "Database schema normalization & REST/GraphQL API design improvements",
      "Actionable refactoring suggestions directly on your GitHub pull request"
    ],
    actionLabel: "Submit Repo for Review",
    actionUrl: "mailto:aniketmishra492@gmail.com?subject=Student%20Code%20Review%20Request%20-%20[Repository%20Link]&body=Hi%20Aniket,%20here%20is%20my%20project%20repo%20for%20review...",
  },
  {
    id: "templates",
    title: "Open-Source Production Starters & Boilerplates",
    badge: "Instant Access",
    highlight: "Next.js 15 + FastAPI + MV3",
    tagline: "Clean, production-ready boilerplates with zero setup friction.",
    description: "Pre-configured, battle-tested production templates for Next.js 15, Chrome Extensions (Manifest V3), and Python FastAPI microservices so you can start building immediately.",
    perks: [
      "Full source code with permissive MIT license",
      "Integrated Tailwind CSS, TypeScript & dark themes pre-configured",
      "Ready-to-deploy configs for Vercel, Docker & cloud providers"
    ],
    actionLabel: "Explore Open Source Starters",
    actionUrl: "https://github.com/aniketmishra-0",
  },
  {
    id: "student-discount",
    title: "80% Off on MVP Architecture for Student Startups",
    badge: "Subsidized Grant",
    highlight: "For Student Founders & Builders",
    tagline: "Heavily subsidized engineering to help student founders ship their first product.",
    description: "Are you a student building a real venture or launching your first SaaS/mobile app? Get heavily subsidized, high-impact MVP engineering sprints to help you launch fast with full source code ownership.",
    perks: [
      "Rapid 2–4 week MVP turnaround from design to production deployment",
      "Direct 1-on-1 engineering with 100% intellectual property handover",
      "Assistance with investor technical demos, cloud setup & initial user launch"
    ],
    actionLabel: "Apply for Student Grant",
    actionUrl: "mailto:aniketmishra492@gmail.com?subject=Student%20Founder%20Grant%20Application&body=Hi%20Aniket,%20we%20are%20building%20[Project%20Name]...",
  },
];

/**
 * ==============================================================================
 * STUDENT FREE RESOURCES & LEARNING TOOLKITS
 * ==============================================================================
 * 💡 TIPS FOR USER:
 * Yahan aap aasani se naye free resources add ya edit kar sakte hain:
 * - title: Resource ka naam
 * - category: Roadmap | Starter Kit | Cheatsheet | Template | Tool
 * - badge: Free / Open Source / PDF
 * - tagline: Short single-line punchline
 * - description: Detailed overview
 * - tags: Key technologies
 * - downloadOrOpenUrl: GitHub repo, Drive link, PDF, ya tool URL
 * - actionLabel: Button text (e.g. "Download Free PDF", "Clone Repo", "Open Guide")
 * ==============================================================================
 */
export const STUDENT_RESOURCES = [
  {
    id: "fullstack-ai-roadmap",
    title: "Modern Full-Stack & AI Systems Engineering Roadmap (2026)",
    category: "Roadmap",
    badge: "100% Free",
    tagline: "From JavaScript basics to Next.js 15, FastAPI, .NET 8, and LLM Orchestration.",
    description: "A battle-tested, zero-fluff engineering guide designed to take you from syntax to shipping production-grade distributed architectures with real database integrity.",
    tags: ["Next.js 15", "FastAPI", "PostgreSQL", "Docker", "System Design"],
    downloadOrOpenUrl: "https://github.com/aniketmishra-0",
    actionLabel: "View Roadmap on GitHub",
    featured: true
  },
  {
    id: "mv3-chrome-boilerplate",
    title: "Chrome Extension MV3 Production Starter Kit",
    category: "Starter Kit",
    badge: "Open Source",
    tagline: "The exact architectural template used for OmTabs & OmSpace extensions.",
    description: "Pre-configured Manifest V3 boilerplate with React 19, Tailwind CSS, background service workers, local session storage, and biometric lock hooks.",
    tags: ["Chrome MV3", "React 19", "Tailwind CSS", "WebAuthn"],
    downloadOrOpenUrl: "https://github.com/aniketmishra-0",
    actionLabel: "Get Boilerplate (MIT)",
    featured: true
  },
  {
    id: "system-design-cheatsheet",
    title: "High-Throughput Microservices & SQL Cheatsheet",
    category: "Cheatsheet",
    badge: "Free Guide",
    tagline: "Database indexing, SQLite WAL mode, chunked resumable uploads & Redis caching.",
    description: "Compact production cheatsheet summarizing latency optimization patterns, SQL indexing best practices, and lessons learned scaling Centrix across 500+ centers.",
    tags: [".NET 8", "SQLite WAL", "Redis", "Resumable Uploads"],
    downloadOrOpenUrl: "https://github.com/aniketmishra-0",
    actionLabel: "Read Architecture Cheatsheet",
    featured: true
  },
  {
    id: "developer-portfolio-template",
    title: "Proof-of-Work Developer Portfolio Template",
    category: "Template",
    badge: "Figma & Next.js",
    tagline: "Showcase real engineering metrics, architecture breakdowns, and interactive telemetry.",
    description: "Clean, editorial developer portfolio template designed to highlight proof-of-work, system telemetry, and case studies instead of generic skill bars.",
    tags: ["Portfolio", "Next.js", "Tailwind CSS", "Proof of Work"],
    downloadOrOpenUrl: "https://github.com/aniketmishra-0",
    actionLabel: "Clone Portfolio Starter",
    featured: true
  }
];

export const STACK_LAYERS = [
  {
    id: "l00",
    idx: "L00 · DATA & STORAGE",
    title: "Database & Storage Layer",
    techs: ["PostgreSQL", "Supabase", "Redis", "SQLite WAL", "Cloud Storage"],
    body: "PostgreSQL, Supabase, Redis, and Cloud Storage. High-concurrency schema design with ACID compliance, instant indexing, and resilient caching.",
    stats: [["DATABASES", "Postgres · Supabase"], ["CACHING", "Redis · In-Memory"], ["INTEGRITY", "ACID Compliant"]],
    code: '> db.connect({ pool: "pg-pool", redis: true })',
    top: "71%",
    target: "#stack",
    keywords: ["postgres", "postgresql", "supabase", "redis", "database", "sqlite", "sql", "storage", "caching", "acid"]
  },
  {
    id: "l01",
    idx: "L01 · CORE ENGINE",
    title: "Backend APIs & Services",
    techs: [".NET 8 (C#)", "Python (FastAPI)", "Node.js", "Express", "REST APIs"],
    body: "High-throughput APIs and background workers built with .NET 8 / C#, Python (FastAPI), and Node.js. Resilient multi-tenant endpoints and secure auth.",
    stats: [["FRAMEWORKS", ".NET 8 · FastAPI"], ["LATENCY", "< 80ms p95"], ["SECURITY", "JWT · OAuth2"]],
    code: '> api.route("/v1/pipeline/stream")',
    top: "57%",
    target: "#stack",
    keywords: ["dotnet", "c#", "csharp", "python", "fastapi", "backend", "api", "microservices", "node", "express", "jwt", "oauth"]
  },
  {
    id: "l02",
    idx: "L02 · AUTOMATION",
    title: "Pipelines & Integrations",
    techs: ["Google Drive API", "YouTube Ingestion", "Chunked Resumable Uploads", "SSE", "Zero-RAM"],
    body: "Automated video distribution (Nexus Streamer), Google Drive API sync (Centrix for 500+ centers), media conversion (ImgWorld), and third-party APIs.",
    stats: [["INTEGRATIONS", "Drive · YouTube API"], ["SCALE", "500+ Offline Centers"], ["AUTOMATION", "Zero-Touch QC"]],
    code: '> pipeline.sync({ drive: true, workers: 8 })',
    top: "43%",
    target: "#stack",
    keywords: ["automation", "pipelines", "stream", "drive", "youtube", "centrix", "nexus", "sse", "resumable", "egress"]
  },
  {
    id: "l03",
    idx: "L03 · INTERACTION",
    title: "Modern UI & Extensions",
    techs: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Chrome MV3", "WebGL / Canvas"],
    body: "Fluid, pixel-perfect interfaces with Next.js 15, React, Tailwind CSS, and Chrome Extension APIs (OmTabs & OmSpace) with interactive 3D Canvas.",
    stats: [["CORE", "Next.js 15 · React"], ["EXTENSIONS", "OmTabs · OmSpace"], ["PERF", "100/100 Lighthouse"]],
    code: '> ui.render(<InteractiveDashboard />)',
    top: "29%",
    target: "#stack",
    keywords: ["nextjs", "react", "typescript", "tailwind", "chrome extension", "mv3", "frontend", "ui", "canvas", "3d", "lighthouse"]
  },
  {
    id: "l04",
    idx: "L04 · PRODUCTION",
    title: "Cloud & Fast Deployment",
    techs: ["Docker", "Vercel", "GitHub Actions CI/CD", "Edge Computing", "HuggingFace"],
    body: "Automated CI/CD workflows, Docker containerization, edge computing, and zero-downtime releases on Vercel and cloud infrastructure.",
    stats: [["DEPLOY", "Vercel · Docker"], ["VERSIONING", "GitHub Actions"], ["SLA", "Zero Downtime"]],
    code: '> deploy.release({ env: "production" })',
    top: "15%",
    target: "#stack",
    keywords: ["devops", "docker", "vercel", "github actions", "ci/cd", "deployment", "cloud", "containers", "edge"]
  }
];

export const FAQS = [
  {
    id: "faq-services",
    q: "What services do you offer for freelance clients and startups?",
    a: "I provide end-to-end full-stack web engineering (Next.js 15, React 19, TypeScript, Node.js, FastAPI), custom Chrome extension development (Manifest V3 with background workers & Web Store packaging), high-scale APIs, automated data ingestion pipelines (.NET 8 & Python), and performance audits for fast-moving startups.",
    linkText: "Discuss your project requirements →",
    href: "#get-access",
    keywords: ["services", "offer", "freelance", "startups", "web engineering", "mvp", "chrome extension"]
  },
  {
    id: "faq-workflow",
    q: "What does your typical project workflow look like?",
    a: "We start with a quick technical discovery call to define clear scope and milestone deliverables. Projects run in agile 1-week sprints with live preview deployments on staging, transparent async communication (Slack, Discord, or WhatsApp), and clean git commits pushed directly to your private repository.",
    linkText: "Explore our delivery roadmap & workflow →",
    href: "#services",
    keywords: ["workflow", "process", "sprint", "staging", "agile", "roadmap", "discovery"]
  },
  {
    id: "faq-mvp-time",
    q: "How fast can you build and launch a production-ready MVP?",
    a: "Most production MVPs are delivered in 2 to 4 weeks. You receive a fully deployed, high-speed application with clean database schemas (PostgreSQL / Supabase), user authentication, payment processing (Stripe / Razorpay), automated error tracking, responsive styling, and complete documentation.",
    linkText: "Estimate your MVP turnaround timeline →",
    href: "#get-access",
    keywords: ["mvp", "timeline", "turnaround", "how fast", "weeks", "launch", "delivery"]
  },
  {
    id: "faq-ip-ownership",
    q: "Do I own 100% of the source code and intellectual property?",
    a: "Yes, absolutely. You retain 100% full ownership of all source code, database architectures, documentation, and digital assets from day one. I work under strict bilateral Non-Disclosure Agreements (NDAs), and complete repository ownership is handed over to your organization upon project completion.",
    linkText: "Read our security & client IP sovereignty terms →",
    href: "/security",
    keywords: ["code ownership", "ip", "intellectual property", "nda", "contract", "source code", "security"]
  },
  {
    id: "faq-chrome-mv3",
    q: "Can you build or upgrade Chrome extensions to Manifest V3?",
    a: "Yes. I have shipped official Chrome Web Store extensions like OmTabs and OmSpace. I architect modern Manifest V3 extensions with local storage persistence, biometric shields, custom new-tab surfaces, and automated background service workers compliant with Google's latest Web Store policies.",
    linkText: "Review Chrome extension offerings →",
    href: "#services",
    keywords: ["chrome", "extensions", "manifest v3", "mv3", "upgrade", "omtabs", "omspace", "webstore"]
  },
  {
    id: "faq-contracts",
    q: "How do contracts, milestones, and payments work?",
    a: "All projects operate under transparent milestone-based contracts with invoices issued through my Govt. of India registered MSME enterprise (UDYAM-UP-03-0065855). Payments can be handled via bank wire, Stripe, or escrow milestones with clear sign-offs before any stage begins.",
    linkText: "Discuss milestone scope & contract terms →",
    href: "#get-access",
    keywords: ["contracts", "milestones", "payments", "invoicing", "msme", "udyam", "escrow", "stripe"]
  }
];

export const SITE_PAGES = [
  { label: "Home (Hero)", href: "#hero", category: "pages", desc: "Hero introduction & headline overview", keywords: ["home", "hero", "overview", "intro", "aniket"] },
  { label: "Featured Projects (#work)", href: "#work", category: "pages", desc: "OmTabs, OmSpace, Centrix, Nexus & more", keywords: ["work", "projects", "featured", "portfolio", "case studies", "apps"] },
  { label: "Services & Sprints (#services)", href: "#services", category: "pages", desc: "MVP builds, Chrome extensions, APIs & audits", keywords: ["services", "sprints", "mvp", "offerings", "deliverables", "hire"] },
  { label: "Tech Stack & Architecture (#stack)", href: "#stack", category: "pages", desc: "5-layer full-stack & systems diagram", keywords: ["stack", "architecture", "technologies", "diagram", "database", "backend"] },
  { label: "Frequently Asked Questions (#faq)", href: "#faq", category: "pages", desc: "Turnarounds, IP ownership & contract terms", keywords: ["faq", "questions", "answers", "help", "timeline", "contracts"] },
  { label: "Pricing & Sprint Packages", href: "/pricing", category: "pages", desc: "Transparent freelance sprint pricing & plans", keywords: ["pricing", "cost", "plans", "rate", "packages", "quote", "budget"] },
  { label: "Students & Builders Initiative", href: "/students", category: "pages", desc: "100% free mentorship, PR reviews & startup grants", keywords: ["students", "college", "mentorship", "free", "code review", "boilerplates", "discount"] },
  { label: "Documentation & Architecture Reference", href: "/docs", category: "pages", desc: "Technical blueprints, specifications & guides", keywords: ["docs", "documentation", "reference", "api", "architecture", "specs"] },
  { label: "Technical Blog & Deep Dives", href: "/blog", category: "pages", desc: "Articles on full-stack systems & performance", keywords: ["blog", "articles", "deep dives", "insights", "read", "tutorials"] },
  { label: "Head-to-Head Architecture Comparisons", href: "/compare", category: "pages", desc: "Engineering benchmarks & system comparisons", keywords: ["compare", "benchmarks", "analysis", "vs", "evaluation"] },
  { label: "Security & Client IP Sovereignty", href: "/security", category: "pages", desc: "Bilateral NDA, 100% code ownership & compliance", keywords: ["security", "nda", "compliance", "encryption", "ip", "intellectual property"] },
  { label: "Privacy Policy (Chrome Extensions)", href: "/privacy", category: "pages", desc: "OmTabs & OmSpace zero-telemetry policy", keywords: ["privacy", "policy", "data", "extensions", "omtabs", "omspace"] },
  { label: "Terms of Service", href: "/terms", category: "pages", desc: "Terms of use and client licensing agreements", keywords: ["terms", "conditions", "service", "license"] },
  { label: "Engineering Thesis", href: "/thesis", category: "pages", desc: "Core thesis on context layers and modern systems", keywords: ["thesis", "philosophy", "context", "systems"] },
  { label: "Experimental Labs", href: "/labs", category: "pages", desc: "R&D prototypes, shaders & AI experiments", keywords: ["labs", "experimental", "research", "prototypes", "ai"] },
  { label: "Case Studies & Use Cases", href: "/use-cases", category: "pages", desc: "Real-world engineering implementations", keywords: ["use cases", "case studies", "enterprise", "implementations"] },
  { label: "GitHub Profile (@aniketmishra-0)", href: "https://github.com/aniketmishra-0", external: true, category: "pages", desc: "699+ public contributions & open-source repos", keywords: ["github", "aniketmishra-0", "commits", "source", "code"] },
  { label: "Enterprise GitHub (@Mishra-Aniket)", href: "https://github.com/Mishra-Aniket", external: true, category: "pages", desc: "Systems, pipelines & enterprise repositories", keywords: ["github", "mishra-aniket", "org", "enterprise"] },
  { label: "LinkedIn Profile (@aniketmishra0)", href: "https://www.linkedin.com/in/aniketmishra0", external: true, category: "pages", desc: "Professional network, updates & connections", keywords: ["linkedin", "profile", "connect", "aniketmishra0"] },
  { label: "Direct Email (aniketmishra492@gmail.com)", href: "mailto:aniketmishra492@gmail.com", external: true, category: "pages", desc: "Direct client inquiries & sprint bookings", keywords: ["email", "contact", "hire", "talk", "inquire", "mail"] }
];


