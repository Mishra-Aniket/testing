"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { sound } from "../utils/sound";

const SPECS_DATA = {
  // --- PHASE 01: ARCHITECT ---
  SCHEMA: {
    phase: 0,
    key: "SCHEMA",
    eyebrow: "01.1 · DATABASE SPEC",
    title: "PostgreSQL & Vector Architecture",
    body: "Translating business domain models into normalized relational schemas. Indexed foreign keys, pgvector embeddings, and automated migration management via Prisma and Alembic.",
    stats: [["DATABASE", "PostgreSQL 16"], ["VECTOR EXT", "pgvector / HNSW"], ["MIGRATIONS", "Zero Downtime"]],
    code: 'schema.define({ tables: ["users", "agents", "sessions"], vector: true })'
  },
  FIGMA: {
    phase: 0,
    key: "FIGMA",
    eyebrow: "01.2 · DESIGN SYSTEM",
    title: "UI Architecture & Wireframing",
    body: "Converting product intuition into precise, accessible UI wireframes and design tokens. Component hierarchy, responsive breakpoint grids, and interaction state mapping before code.",
    stats: [["TOKENS", "Tailwind 3.4"], ["GRID", "12-Col Responsive"], ["ACCESSIBILITY", "WCAG 2.1 AA"]],
    code: 'designSystem.tokens({ colors: "amber-stone", radius: "0.3rem" })'
  },
  APIS: {
    phase: 0,
    key: "APIS",
    eyebrow: "01.3 · API CONTRACTS",
    title: "API Specifications & Schema",
    body: "Defining strict OpenAPI 3.1 and tRPC contracts between client and server. Strongly typed payload validation, error codes, and auto-generated TypeScript client SDKs.",
    stats: [["SPEC", "OpenAPI 3.1"], ["VALIDATION", "Zod & Pydantic"], ["GENERATION", "Typed SDKs"]],
    code: 'contract.export({ spec: "openapi_v3", client: "typescript" })'
  },
  STACK: {
    phase: 0,
    key: "STACK",
    eyebrow: "01.4 · STACK SPEC",
    title: "Next.js 15, FastAPI & Redis",
    body: "Architecting a lean, high-velocity technology stack tailored to your application's concurrency and data requirements. Clean separation of concerns with zero bloat.",
    stats: [["FRONTEND", "Next.js 15 App"], ["BACKEND", "FastAPI Python"], ["CACHE", "Redis 7.2"]],
    code: 'stack.initialize({ framework: "nextjs15", api: "fastapi", db: "postgres" })'
  },

  // --- PHASE 02: ENGINEER (THE 9 NODES) ---
  frontend: {
    phase: 1,
    key: "frontend",
    eyebrow: "02.1 · CLIENT ARCHITECTURE",
    title: "Next.js 15 & React Frontend",
    body: "Pixel-perfect responsive interfaces with React Server Components, Framer Motion micro-interactions, Lenis smooth scrolling, and sub-100ms First Contentful Paint.",
    stats: [["FRAMEWORK", "Next.js 15"], ["PERF", "100/100 Lighthouse"], ["HYDRATION", "Zero-Delay"]],
    code: 'export default async function Page() { return <Dashboard /> }'
  },
  backend: {
    phase: 1,
    key: "backend",
    eyebrow: "02.2 · SYSTEM CORE",
    title: "FastAPI & High-Throughput Core",
    body: "Asynchronous backend services engineered in Python (FastAPI) and Node.js. Connection pooling, pydantic request validation, and sub-millisecond query routing.",
    stats: [["RUNTIME", "Python 3.12 / Node"], ["THROUGHPUT", "45k req/sec"], ["LATENCY", "P99 < 18ms"]],
    code: '@app.get("/api/v1/stream") async def stream_payload(): ...'
  },
  apis: {
    phase: 1,
    key: "apis",
    eyebrow: "02.3 · CONTRACT SPEC",
    title: "Type-Safe APIs & Streaming",
    body: "End-to-end type safety across client and server. Streaming Server-Sent Events (SSE) for LLM generation, RESTful resource modeling, and OpenAPI auto-generation.",
    stats: [["PROTOCOL", "REST & SSE"], ["VALIDATION", "Zod & Pydantic"], ["CONTRACT", "OpenAPI 3.1"]],
    code: 'api.stream({ prompt, model: "gemini-2.5-flash" })'
  },
  auth: {
    phase: 1,
    key: "auth",
    eyebrow: "02.4 · IDENTITY & SHIELD",
    title: "Authentication & Biometric Shield",
    body: "Zero-trust identity architecture with secure HTTP-only JWTs, OAuth 2.0 (Google/GitHub), biometric WebAuthn verification, and role-based access control (RBAC).",
    stats: [["SPEC", "JWT + WebAuthn"], ["LATENCY", "< 8ms"], ["SECURITY", "OWASP Compliant"]],
    code: 'auth.verify({ token: jwt, rbac: "enterprise", biometric: true })'
  },
  workers: {
    phase: 1,
    key: "workers",
    eyebrow: "02.5 · ASYNC WORKERS",
    title: "Background Workers & Task Queues",
    body: "Distributed asynchronous processing with Celery and BullMQ. Handling heavy video ingestion, embedding generation, batch email jobs, and webhook delivery with retry guarantees.",
    stats: [["CONCURRENCY", "10,000+ jobs"], ["QUEUE", "Redis / BullMQ"], ["RELIABILITY", "99.99% Guaranteed"]],
    code: 'queue.process("task", { retries: 3, concurrency: 16 })'
  },
  logic: {
    phase: 1,
    key: "logic",
    eyebrow: "02.6 · DOMAIN LOGIC",
    title: "Autonomous Agent Decision Trees",
    body: "Deterministic business workflows coupled with multi-model LLM tool calling. Error self-healing, deterministic state machines, and structured output parsing.",
    stats: [["ENGINE", "State Machine"], ["EXECUTION", "Zero Tech Debt"], ["ACCURACY", "Deterministic"]],
    code: 'agent.step({ state, tools: ["search", "exec", "database"] })'
  },
  caching: {
    phase: 1,
    key: "caching",
    eyebrow: "02.7 · ACCELERATION",
    title: "Multi-Tier Caching & In-Memory Store",
    body: "Ultra-fast memory layer powered by Redis. Stale-while-revalidate edge caching, atomic counters, rate limiters, and sub-millisecond session lookup.",
    stats: [["HIT RATE", "> 94%"], ["MEMORY", "Redis 7.2"], ["EDGE", "SWR Caching"]],
    code: 'redis.getOrSet("user:session", fetchFn, { ttl: 3600 })'
  },
  pipelines: {
    phase: 1,
    key: "pipelines",
    eyebrow: "02.8 · DATA INGESTION",
    title: "ETL & Ingestion Pipelines",
    body: "High-volume document and media transformation. Chunking, multi-modal embedding generation with pgvector, and automated schema synchronization.",
    stats: [["THROUGHPUT", "1.2M rows/hr"], ["VECTOR", "pgvector"], ["INDEX", "HNSW"]],
    code: 'pipeline.ingest({ docs, embed: "text-embedding-3" })'
  },
  tests: {
    phase: 1,
    key: "tests",
    eyebrow: "02.9 · QUALITY ASSURANCE",
    title: "Automated Test Suite & Verification",
    body: "Comprehensive test coverage with Playwright end-to-end user journey tests, Vitest/Jest unit suites, and strict TypeScript compilation in CI.",
    stats: [["COVERAGE", "> 90%"], ["E2E", "Playwright"], ["REGRESSION", "Zero-Tolerance"]],
    code: 'test("checkout journey", async ({ page }) => { ... })'
  },

  // --- PHASE 03: SHIP & SCALE ---
  DEPLOY: {
    phase: 2,
    key: "DEPLOY",
    eyebrow: "03.1 · CONTINUOUS DELIVERY",
    title: "Automated CI/CD & Deployments",
    body: "Zero-downtime rolling deploys via GitHub Actions and Docker. Automated build verification, secret scanning, and preview environments on every pull request.",
    stats: [["PIPELINE", "GitHub Actions"], ["ROLLBACK", "< 5 seconds"], ["DOWNTIME", "0.00s"]],
    code: 'release.deploy({ env: "production", version: "v2.4.0", checks: true })'
  },
  CLOUD: {
    phase: 2,
    key: "CLOUD",
    eyebrow: "03.2 · CLOUD INFRASTRUCTURE",
    title: "Edge CDN & Multi-Region Cloud",
    body: "Worldwide distributed content delivery and containerized backend clusters on AWS / GCP / Cloudflare. Global routing, DDoS mitigation, and low latency.",
    stats: [["EDGE POPs", "300+ Worldwide"], ["LATENCY", "P50 < 30ms"], ["SECURITY", "Cloudflare WAF"]],
    code: 'cloud.edge({ regions: ["us-east", "eu-central", "ap-south"] })'
  },
  UPTIME: {
    phase: 2,
    key: "UPTIME",
    eyebrow: "03.3 · HIGH AVAILABILITY",
    title: "99.9% Uptime SLA & Resiliency",
    body: "Fault-tolerant system design with automated health checks, self-healing container restarts, automated database read replicas, and circuit breaker patterns.",
    stats: [["AVAILABILITY", "99.9% SLA"], ["REPLICAS", "Primary + 2 Standby"], ["FAILOVER", "Automated"]],
    code: 'health.check({ status: 200, redundancy: "active-active" })'
  },
  MONITOR: {
    phase: 2,
    key: "MONITOR",
    eyebrow: "03.4 · OBSERVABILITY",
    title: "Live Telemetry & Performance Monitoring",
    body: "Full-stack observability with OpenTelemetry, structured logging, distributed tracing, and instant alert dispatch to Slack and email when latency spikes.",
    stats: [["METRICS", "OpenTelemetry"], ["TRACING", "Distributed"], ["ALERTS", "Instant Pager"]],
    code: 'telemetry.trace({ span: "api.request", durationMs: 14 })'
  }
};

const PHASE_SPECS = [
  ["SCHEMA", "FIGMA", "APIS", "STACK"],
  ["frontend", "backend", "apis", "auth", "workers", "pipelines", "caching", "logic", "tests"],
  ["DEPLOY", "CLOUD", "UPTIME", "MONITOR"]
];

const P2_NODES = [
  { key: "frontend", x: -73, y: -73, textX: 600, textY: 205.3 },
  { key: "auth", x: -73, y: -21, textX: 553.2, textY: 222 },
  { key: "workers", x: -73, y: 31, textX: 506.4, textY: 238.6 },
  { key: "apis", x: -21, y: -73, textX: 646.8, textY: 222 },
  { key: "backend", x: -21, y: -21, textX: 600, textY: 238.6 },
  { key: "pipelines", x: -21, y: 31, textX: 553.2, textY: 255.2 },
  { key: "logic", x: 31, y: -73, textX: 693.6, textY: 238.6 },
  { key: "caching", x: 31, y: -21, textX: 646.8, textY: 255.2 },
  { key: "tests", x: 31, y: 31, textX: 600, textY: 271.9 },
];

const P1_NODES = [
  { key: "SCHEMA", x: -68, y: -54, textX: 186.6, textY: 213.6, subX: 186.6, subY: 222.6, sub: "database" },
  { key: "FIGMA", x: 8, y: -54, textX: 255, textY: 237.9, subX: 255, subY: 246.9, sub: "wireframes" },
  { key: "APIS", x: -68, y: 10, textX: 129, textY: 234.1, subX: 129, subY: 243.1, sub: "contracts" },
  { key: "STACK", x: 8, y: 10, textX: 197.4, textY: 258.4, subX: 197.4, subY: 267.4, sub: "frameworks" }
];

const P3_NODES = [
  { key: "DEPLOY", x: -68, y: -54, textX: 1007.1, textY: 212, subX: 1007.1, subY: 221, sub: "ci / cd live" },
  { key: "CLOUD", x: 8, y: -54, textX: 1075.5, textY: 236.3, subX: 1075.5, subY: 245.3, sub: "edge hosting" },
  { key: "UPTIME", x: -68, y: 10, textX: 949.5, textY: 232.5, subX: 949.5, subY: 241.5, sub: "99.9% sla" },
  { key: "MONITOR", x: 8, y: 10, textX: 1017.9, textY: 256.8, subX: 1017.9, subY: 265.8, sub: "telemetry" }
];

const PHASE_CARD_POSITIONS = [
  { left: "16%", top: "54%" },
  { left: "50%", top: "57%" },
  { left: "84%", top: "54%" }
];

export default function ModelSovereignty() {
  const [activePhase, setActivePhase] = useState(1);
  const [activeSpec, setActiveSpec] = useState("workers");
  const [hoveredPhase, setHoveredPhase] = useState(null);
  const [hoveredSpec, setHoveredSpec] = useState(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const isHoveringCardRef = useRef(false);
  const closeTimerRef = useRef(null);

  const currentPhase = hoveredPhase !== null ? hoveredPhase : activePhase;
  const currentSpecKey = hoveredSpec !== null ? hoveredSpec : (
    SPECS_DATA[activeSpec]?.phase === currentPhase ? activeSpec : PHASE_SPECS[currentPhase][0]
  );
  const currentSpec = SPECS_DATA[currentSpecKey] || SPECS_DATA.workers;

  const handleSelectSpec = (specKey) => {
    sound.playDock();
    const spec = SPECS_DATA[specKey];
    if (spec) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setIsInteracting(true);
      setActivePhase(spec.phase);
      setActiveSpec(specKey);
      setHoveredSpec(specKey);
      setHoveredPhase(spec.phase);
      setIsSwapping(true);
      setTimeout(() => setIsSwapping(false), 600);
    }
  };

  const handleHoverSpec = (specKey) => {
    const spec = SPECS_DATA[specKey];
    if (spec) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setIsInteracting(true);
      if (hoveredSpec !== specKey) {
        sound.playClick();
        setHoveredSpec(specKey);
        setHoveredPhase(spec.phase);
      }
    }
  };

  const handlePlatformClick = (idx) => {
    sound.playDock();
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsInteracting(true);
    setActivePhase(idx);
    setActiveSpec(PHASE_SPECS[idx][0]);
    setHoveredSpec(PHASE_SPECS[idx][0]);
    setHoveredPhase(idx);
  };

  const handlePlatformMouseEnter = (idx) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsInteracting(true);
    if (hoveredPhase !== idx && hoveredSpec === null) {
      sound.playClick();
      setHoveredPhase(idx);
      setHoveredSpec(PHASE_SPECS[idx][0]);
    }
  };

  const handleContainerMouseLeave = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      if (!isHoveringCardRef.current) {
        setIsInteracting(false);
        setHoveredPhase(null);
        setHoveredSpec(null);
      }
    }, 280);
  };

  const handleCardMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    isHoveringCardRef.current = true;
    setIsInteracting(true);
  };

  const handleCardMouseLeave = () => {
    isHoveringCardRef.current = false;
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
      setHoveredPhase(null);
      setHoveredSpec(null);
    }, 280);
  };

  const handleCloseCard = (e) => {
    if (e) e.stopPropagation();
    sound.playClick();
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    isHoveringCardRef.current = false;
    setIsInteracting(false);
    setHoveredPhase(null);
    setHoveredSpec(null);
  };

  const cardPos = PHASE_CARD_POSITIONS[currentPhase];

  return (
    <section className="relative w-full overflow-visible bg-[#FDFBF7] pt-16 md:pt-24 pb-28 md:pb-36 text-[#4A3B33]">
      {/* Grid background matching original site */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(228, 217, 188, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(228, 217, 188, 0.4) 1px, transparent 1px)",
          backgroundSize: "140px 140px",
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, #000 30%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, #000 30%, transparent 95%)"
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-8 gap-2">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#78716C] font-semibold text-center">
            Engineering Protocol: From Initial Spec to Scalable Production Software
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#B45309] bg-[#FAF6EE] px-3 py-1 rounded-full border border-[#E4D9BC]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hover or click any platform to inspect architecture specs</span>
          </div>
        </div>

        <div 
          className="relative w-full overflow-x-auto lg:overflow-visible select-none"
          onMouseLeave={handleContainerMouseLeave}
        >
          <div className="relative w-full min-w-[860px] aspect-[20/9]">
            <svg 
              id="router-svg" 
              viewBox="0 0 1200 540" 
              className="w-full h-full block overflow-visible" 
              preserveAspectRatio="xMidYMid meet" 
              role="img" 
              aria-label="Engineering Protocol: From Initial Spec to Scalable Production Software"
            >
              <defs>
                <linearGradient id="svTop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#FBF6EE" />
                </linearGradient>
                <radialGradient id="svHalo">
                  <stop offset="0%" stopColor="#B45309" stopOpacity="0.22" />
                  <stop offset="60%" stopColor="#B45309" stopOpacity="0.07" />
                  <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
                </radialGradient>
                <filter id="svBlur" x="-30%" y="-60%" width="160%" height="220%">
                  <feGaussianBlur stdDeviation="9" />
                </filter>
                <filter id="svShadow" x="-10%" y="-20%" width="120%" height="160%">
                  <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="hsl(28 18% 25%)" floodOpacity="0.14" />
                </filter>
              </defs>

              {/* Top Left Telemetry */}
              <g pointerEvents="none">
                <rect x="24" y="33" width="7" height="7" fill={isSwapping ? "#F59E0B" : "#B45309"} className={isSwapping ? "animate-ping" : ""} />
                <text x="37" y="40" fill="#78716C" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6" fontWeight="600">
                  ANIKET // ENGINEERING_PROTOCOL
                </text>
                <text x="24" y="57" fill="#A8A29E" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
                  specs 17 · phases 3 · speed 2-4w · 0s downtime
                </text>
                <circle cx="298" cy="54.5" r="2.4" fill={isSwapping ? "#10B981" : "#B45309"} opacity="0.93" />
                <text x="330" y="57" textAnchor="end" fill={isSwapping ? "#10B981" : "#A8A29E"} fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1" fontWeight={isSwapping ? "700" : "400"}>
                  {isSwapping ? "SWITCHING" : "LIVE"}
                </text>
                <rect x="24" y="67" width="73.5" height="3" rx="1.5" style={{ fill: currentPhase === 0 && isInteracting ? "#B45309" : "#E4D9BC", transition: "fill 0.2s" }} />
                <rect x="101.5" y="67" width="73.5" height="3" rx="1.5" style={{ fill: currentPhase === 1 && isInteracting ? "#B45309" : "#E4D9BC", transition: "fill 0.2s" }} />
                <rect x="179" y="67" width="73.5" height="3" rx="1.5" style={{ fill: currentPhase === 2 && isInteracting ? "#B45309" : "#E4D9BC", transition: "fill 0.2s" }} />
                <rect x="256.5" y="67" width="73.5" height="3" rx="1.5" style={{ fill: "#E4D9BC", transition: "fill 0.2s" }} />
                <text x="24" y="88" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6" fontWeight="600" fill="#B45309">
                  {isSwapping ? `⚡ SPEC UPDATED: FOCUSING ON ${currentSpecKey.toUpperCase()}...` : (isInteracting ? `PHASE 0${currentPhase + 1} · ACTIVE SPEC: ${currentSpecKey.toUpperCase()}` : "PHASE · SYSTEM ARCHITECTURE LIVE")}
                </text>
              </g>

              {/* Top Right Active Focus */}
              <g 
                role="button"
                aria-label="Active focus switcher"
                data-custom-sound="true"
                style={{ outline: "none" }}
                onClick={() => {
                  const currentSpecs = PHASE_SPECS[currentPhase];
                  const nextIdx = (currentSpecs.indexOf(currentSpecKey) + 1) % currentSpecs.length;
                  handleSelectSpec(currentSpecs[nextIdx]);
                }}
                className="cursor-pointer group/activemodel outline-none"
              >
                <text x="1176" y="40" textAnchor="end" fill="#A8A29E" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2" fontWeight="600">
                  ACTIVE FOCUS
                </text>
                <text x="1176" y="68" textAnchor="end" fill="#4A3B33" fontSize="20" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                  {currentSpecKey.toUpperCase()}
                </text>
                <text x="1176" y="84" textAnchor="end" fill="#B45309" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.2">
                  {currentSpec.eyebrow}
                </text>
              </g>

              {/* Connecting Flow Lines Between Platforms */}
              <g pointerEvents="none" opacity="0.8">
                {/* 01 -> 02 */}
                <path d="M 346.8 236 L 412.8 236" stroke="#E4D9BC" strokeWidth="1.2" strokeDasharray="3 3" />
                <circle cx="380" cy="236" r="3" fill="#B45309" opacity="0.6">
                  <animate attributeName="cx" values="346.8;412.8;346.8" dur="4s" repeatCount="indefinite" />
                </circle>
                <text x="380" y="226" textAnchor="middle" fill="#A8A29E" fontSize="6.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
                  SPEC → BUILD
                </text>

                {/* 02 -> 03 */}
                <path d="M 787.2 236 L 853.2 236" stroke="#E4D9BC" strokeWidth="1.2" strokeDasharray="3 3" />
                <circle cx="820" cy="236" r="3" fill="#B45309" opacity="0.6">
                  <animate attributeName="cx" values="787.2;853.2;787.2" dur="4s" repeatCount="indefinite" />
                </circle>
                <text x="820" y="226" textAnchor="middle" fill="#A8A29E" fontSize="6.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
                  BUILD → SHIP
                </text>
              </g>

              {/* 01: Architecture & System Spec Platform */}
              <g 
                role="button" 
                aria-label="01 Discovery and System Architecture"
                onMouseEnter={() => handlePlatformMouseEnter(0)}
                onClick={() => handlePlatformClick(0)}
                className="cursor-pointer transition-all duration-300 outline-none"
                style={{
                  outline: "none",
                  transformOrigin: "50% 50%", 
                  transformBox: "fill-box",
                  transform: (isInteracting && currentPhase === 0) ? "scale(1.03) translateY(-4px)" : "none",
                  opacity: isInteracting && currentPhase !== 0 ? 0.45 : 1,
                  filter: (isInteracting && currentPhase === 0) ? "drop-shadow(0 10px 20px rgba(180,83,9,0.22))" : "none"
                }}
              >
                <g pointerEvents="none">
                  <line x1="192" y1="306.04" x2="192" y2="320.04" strokeWidth="1" stroke="#E4D9BC" />
                  <circle cx="192" cy="306.04" r="2.2" fill="#B45309" />
                  <g opacity={(isInteracting && currentPhase === 0) ? 0 : 1} style={{ transition: "opacity 0.2s" }}>
                    <text x="192" y="336.04" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5" fontWeight="600" fill="#B45309">
                      01 · ARCHITECT
                    </text>
                    <text x="192" y="354.04" textAnchor="middle" fill="#4A3B33" fontSize="14" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                      Discovery &amp; Design
                    </text>
                    <text x="192" y="368.04" textAnchor="middle" fill="#78716C" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4">
                      schema · wireframes · stack
                    </text>
                  </g>
                </g>

                <g>
                  <ellipse cx="192" cy="262" rx="139.3" ry="39.6" fill="#4A3B33" opacity="0.07" filter="url(#svBlur)" />
                  <ellipse cx="192" cy="240" rx="176.8" ry="73" fill="url(#svHalo)" opacity={(isInteracting && currentPhase === 0) ? 0.8 : 0.4} />
                  <polygon points="37.2,236 192,291.04 192,300.04 37.2,245" fill="#F1E9DA" />
                  <polygon points="192,291.04 346.8,236 346.8,245 192,300.04" fill="#E4D9BC" />
                  <polygon points="192,180.96 346.8,236 192,291.04 37.2,236" fill="url(#svTop)" strokeWidth="1.4" stroke="#B45309" />
                  <polyline points="37.2,236 192,291.04 346.8,236" fill="none" strokeWidth="1.6" strokeLinejoin="round" stroke="#B45309" opacity="0.9" />
                  
                  {/* Grid Lines on platform surface */}
                  <g transform="matrix(0.9 0.32 -0.9 0.32 192 236)">
                    <rect x="-80" y="-80" width="160" height="160" rx="4" fill="none" stroke="#F1E9DA" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <g stroke="#F6F0E4" strokeWidth="0.8">
                      <line x1="-53.3" y1="-80" x2="-53.3" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="-53.3" x2="80" y2="-53.3" vectorEffect="non-scaling-stroke" />
                      <line x1="-26.7" y1="-80" x2="-26.7" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="-26.7" x2="80" y2="-26.7" vectorEffect="non-scaling-stroke" />
                      <line x1="0" y1="-80" x2="0" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="0" x2="80" y2="0" vectorEffect="non-scaling-stroke" />
                      <line x1="26.7" y1="-80" x2="26.7" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="26.7" x2="80" y2="26.7" vectorEffect="non-scaling-stroke" />
                      <line x1="53.3" y1="-80" x2="53.3" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="53.3" x2="80" y2="53.3" vectorEffect="non-scaling-stroke" />
                    </g>
                    
                    {/* Interactive P1 Chips */}
                    {P1_NODES.map((node) => {
                      const isSel = (isInteracting && currentPhase === 0) && currentSpecKey === node.key;
                      const isHov = hoveredSpec === node.key;
                      return (
                        <g 
                          key={node.key}
                          onClick={(e) => { e.stopPropagation(); handleSelectSpec(node.key); }}
                          onMouseEnter={() => handleHoverSpec(node.key)}
                          className="cursor-pointer group/chip"
                        >
                          <rect 
                            x={node.x - 6} 
                            y={node.y - 6} 
                            width="72" 
                            height="56" 
                            fill="transparent" 
                          />
                          <rect 
                            x={node.x} 
                            y={node.y} 
                            width="60" 
                            height="44" 
                            rx="4" 
                            strokeWidth={isSel ? "2" : (isHov ? "1.5" : "1")} 
                            vectorEffect="non-scaling-stroke" 
                            fill={isSel ? "rgba(180,83,9,0.26)" : (isHov ? "rgba(180,83,9,0.16)" : "#FFFFFF")} 
                            stroke={isSel ? "#B45309" : (isHov ? "#B45309" : "#E4D9BC")} 
                            style={{ transition: "fill 0.15s, stroke 0.15s" }}
                          />
                        </g>
                      );
                    })}
                    <line x1="43.6" x2="43.6" y1="-80" y2="80" stroke="#B45309" strokeWidth="1.2" vectorEffect="non-scaling-stroke" opacity="0.5" />
                  </g>

                  {/* Spec Labels for P1 */}
                  <g pointerEvents="none">
                    {P1_NODES.map((node) => {
                      const isSel = (isInteracting && currentPhase === 0) && currentSpecKey === node.key;
                      return (
                        <g key={`lbl-${node.key}`}>
                          <text 
                            x={node.textX} 
                            y={node.textY} 
                            textAnchor="middle" 
                            fontSize="7.5" 
                            fontFamily="JetBrains Mono, monospace" 
                            fontWeight={isSel ? "800" : "600"} 
                            letterSpacing="1" 
                            fill={isSel ? "#B45309" : "#4A3B33"}
                          >
                            {node.key}
                          </text>
                          <text 
                            x={node.subX} 
                            y={node.subY} 
                            textAnchor="middle" 
                            fontSize="6.2" 
                            fontFamily="JetBrains Mono, monospace" 
                            letterSpacing="0.4" 
                            fill={isSel ? "#A16207" : "#78716C"}
                          >
                            {isSel ? "● active" : node.sub}
                          </text>
                        </g>
                      );
                    })}
                    <text x="53.2" y="238.5" fontSize="6.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.8" fill="#A8A29E">01</text>
                  </g>
                </g>
              </g>

              {/* 02: Full-Stack Development Platform (The 9 Nodes) */}
              <g 
                role="button" 
                aria-label="02 Full-Stack Development"
                onMouseEnter={() => handlePlatformMouseEnter(1)}
                onClick={() => handlePlatformClick(1)}
                className="cursor-pointer transition-all duration-300 outline-none"
                style={{
                  outline: "none",
                  transformOrigin: "50% 50%", 
                  transformBox: "fill-box",
                  transform: (isInteracting && currentPhase === 1) ? "scale(1.03) translateY(-4px)" : "none",
                  opacity: isInteracting && currentPhase !== 1 ? 0.45 : 1,
                  filter: (isInteracting && currentPhase === 1) ? "drop-shadow(0 10px 20px rgba(180,83,9,0.22))" : "none"
                }}
              >
                <g pointerEvents="none">
                  <line x1="600" y1="319.56" x2="600" y2="333.56" strokeWidth="1" stroke="#E4D9BC" />
                  <circle cx="600" cy="319.56" r="2.2" fill="#B45309" />
                  <g opacity={(isInteracting && currentPhase === 1) ? 0 : 1} style={{ transition: "opacity 0.2s" }}>
                    <text x="600" y="349.56" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5" fontWeight="600" fill="#B45309">
                      02 · ENGINEER
                    </text>
                    <text x="600" y="367.56" textAnchor="middle" fill="#4A3B33" fontSize="14" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                      Full-Stack Development
                    </text>
                    <text x="600" y="381.56" textAnchor="middle" fill="#78716C" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4">
                      clean code · resilient services · testing
                    </text>
                  </g>
                </g>

                <g>
                  <ellipse cx="600" cy="262" rx="168.5" ry="47.9" fill="#4A3B33" opacity="0.07" filter="url(#svBlur)" />
                  <ellipse cx="600" cy="240" rx="209.2" ry="84.5" fill="url(#svHalo)" opacity={(isInteracting && currentPhase === 1) ? 0.8 : 0.4} />
                  <polygon points="412.8,236 600,302.56 600,313.56 412.8,247" fill="#F1E9DA" />
                  <polygon points="600,302.56 787.2,236 787.2,247 600,313.56" fill="#E4D9BC" />
                  <polygon points="600,169.44 787.2,236 600,302.56 412.8,236" fill="url(#svTop)" strokeWidth="1.4" stroke="#B45309" />
                  <polyline points="412.8,236 600,302.56 787.2,236" fill="none" strokeWidth="1.6" strokeLinejoin="round" stroke="#B45309" opacity="0.9" />

                  {/* Surface Grid & Nodes */}
                  <g transform="matrix(0.9 0.32 -0.9 0.32 600 236)">
                    <rect x="-98" y="-98" width="196" height="196" rx="4" fill="none" stroke="#F1E9DA" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <g stroke="#F6F0E4" strokeWidth="0.8">
                      <line x1="-65.3" y1="-98" x2="-65.3" y2="98" vectorEffect="non-scaling-stroke" />
                      <line x1="-98" y1="-65.3" x2="98" y2="-65.3" vectorEffect="non-scaling-stroke" />
                      <line x1="-32.7" y1="-98" x2="-32.7" y2="98" vectorEffect="non-scaling-stroke" />
                      <line x1="-98" y1="-32.7" x2="98" y2="-32.7" vectorEffect="non-scaling-stroke" />
                      <line x1="0" y1="-98" x2="0" y2="98" vectorEffect="non-scaling-stroke" />
                      <line x1="-98" y1="0" x2="98" y2="0" vectorEffect="non-scaling-stroke" />
                      <line x1="32.7" y1="-98" x2="32.7" y2="98" vectorEffect="non-scaling-stroke" />
                      <line x1="-98" y1="32.7" x2="98" y2="32.7" vectorEffect="non-scaling-stroke" />
                      <line x1="65.3" y1="-98" x2="65.3" y2="98" vectorEffect="non-scaling-stroke" />
                      <line x1="-98" y1="65.3" x2="98" y2="65.3" vectorEffect="non-scaling-stroke" />
                    </g>
                    
                    {/* The 9 Interactive Nodes with Seamless 0-gap Hitboxes */}
                    {P2_NODES.map((node) => {
                      const isSel = (isInteracting && currentPhase === 1) && currentSpecKey === node.key;
                      const isHov = hoveredSpec === node.key;
                      return (
                        <g 
                          key={node.key}
                          onClick={(e) => { e.stopPropagation(); handleSelectSpec(node.key); }}
                          onMouseEnter={() => handleHoverSpec(node.key)}
                          className="cursor-pointer group/node"
                        >
                          <rect 
                            x={node.x - 5} 
                            y={node.y - 5} 
                            width="52" 
                            height="52" 
                            fill="transparent" 
                          />
                          <rect 
                            x={node.x} 
                            y={node.y} 
                            width="42" 
                            height="42" 
                            rx="4" 
                            strokeWidth={isSel ? "2" : (isHov ? "1.5" : "1")} 
                            vectorEffect="non-scaling-stroke" 
                            fill={isSel ? "rgba(180,83,9,0.28)" : (isHov ? "rgba(180,83,9,0.18)" : "rgba(180,83,9,0.07)")} 
                            stroke={isSel ? "#B45309" : (isHov ? "#B45309" : "#E4D9BC")} 
                            style={{ transition: "fill 0.15s, stroke 0.15s" }}
                          />
                        </g>
                      );
                    })}
                    <line x1="11.8" x2="11.8" y1="-98" y2="98" stroke="#B45309" strokeWidth="1.2" vectorEffect="non-scaling-stroke" opacity="0.5" />
                  </g>

                  {/* Surface Texts for P2 Nodes */}
                  <g pointerEvents="none">
                    {P2_NODES.map((node) => {
                      const isSel = (isInteracting && currentPhase === 1) && currentSpecKey === node.key;
                      return (
                        <text 
                          key={`lbl-${node.key}`}
                          x={node.textX} 
                          y={node.textY} 
                          textAnchor="middle" 
                          fontSize={isSel ? "7.8" : "7"} 
                          fontFamily="JetBrains Mono, monospace" 
                          letterSpacing="0.5" 
                          fontWeight={isSel ? "800" : "500"} 
                          fill={isSel ? "#B45309" : "#78716C"}
                          style={{ transition: "fill 0.15s, font-weight 0.15s" }}
                        >
                          {node.key}
                        </text>
                      );
                    })}
                    <text x="428.8" y="238.5" fontSize="6.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.8" fill="#A8A29E">02</text>
                  </g>
                </g>
              </g>

              {/* 03: Deployment & Production Scale Platform */}
              <g 
                role="button" 
                aria-label="03 Deployment and Production Scale"
                onMouseEnter={() => handlePlatformMouseEnter(2)}
                onClick={() => handlePlatformClick(2)}
                className="cursor-pointer transition-all duration-300 outline-none"
                style={{
                  outline: "none",
                  transformOrigin: "50% 50%", 
                  transformBox: "fill-box",
                  transform: (isInteracting && currentPhase === 2) ? "scale(1.03) translateY(-4px)" : "none",
                  opacity: isInteracting && currentPhase !== 2 ? 0.45 : 1,
                  filter: (isInteracting && currentPhase === 2) ? "drop-shadow(0 10px 20px rgba(180,83,9,0.22))" : "none"
                }}
              >
                <g pointerEvents="none">
                  <line x1="1008" y1="306.04" x2="1008" y2="320.04" strokeWidth="1" stroke="#E4D9BC" />
                  <circle cx="1008" cy="306.04" r="2.2" fill="#B45309" />
                  <g opacity={(isInteracting && currentPhase === 2) ? 0 : 1} style={{ transition: "opacity 0.2s" }}>
                    <text x="1008" y="336.04" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5" fontWeight="600" fill="#B45309">
                      03 · SHIP &amp; SCALE
                    </text>
                    <text x="1008" y="354.04" textAnchor="middle" fill="#4A3B33" fontSize="14" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                      Deployment &amp; Scale
                    </text>
                    <text x="1008" y="368.04" textAnchor="middle" fill="#78716C" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4">
                      cloud deploy · zero downtime · scale
                    </text>
                  </g>
                </g>

                <g>
                  <ellipse cx="1008" cy="262" rx="139.3" ry="39.6" fill="#4A3B33" opacity="0.07" filter="url(#svBlur)" />
                  <ellipse cx="1008" cy="240" rx="176.8" ry="73" fill="url(#svHalo)" opacity={(isInteracting && currentPhase === 2) ? 0.8 : 0.4} />
                  <polygon points="853.2,236 1008,291.04 1008,300.04 853.2,245" fill="#F1E9DA" />
                  <polygon points="1008,291.04 1162.8,236 1162.8,245 1008,300.04" fill="#E4D9BC" />
                  <polygon points="1008,180.96 1162.8,236 1008,291.04 853.2,236" fill="url(#svTop)" strokeWidth="1.4" stroke="#B45309" />
                  <polyline points="853.2,236 1008,291.04 1162.8,236" fill="none" strokeWidth="1.6" strokeLinejoin="round" stroke="#B45309" opacity="0.9" />

                  {/* Surface Grid */}
                  <g transform="matrix(0.9 0.32 -0.9 0.32 1008 236)">
                    <rect x="-80" y="-80" width="160" height="160" rx="4" fill="none" stroke="#F1E9DA" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <g stroke="#F6F0E4" strokeWidth="0.8">
                      <line x1="-53.3" y1="-80" x2="-53.3" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="-53.3" x2="80" y2="-53.3" vectorEffect="non-scaling-stroke" />
                      <line x1="-26.7" y1="-80" x2="-26.7" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="-26.7" x2="80" y2="-26.7" vectorEffect="non-scaling-stroke" />
                      <line x1="0" y1="-80" x2="0" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="0" x2="80" y2="0" vectorEffect="non-scaling-stroke" />
                      <line x1="26.7" y1="-80" x2="26.7" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="26.7" x2="80" y2="26.7" vectorEffect="non-scaling-stroke" />
                      <line x1="53.3" y1="-80" x2="53.3" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="53.3" x2="80" y2="53.3" vectorEffect="non-scaling-stroke" />
                    </g>
                    
                    {/* Interactive P3 Chips */}
                    {P3_NODES.map((node) => {
                      const isSel = (isInteracting && currentPhase === 2) && currentSpecKey === node.key;
                      const isHov = hoveredSpec === node.key;
                      return (
                        <g 
                          key={node.key}
                          onClick={(e) => { e.stopPropagation(); handleSelectSpec(node.key); }}
                          onMouseEnter={() => handleHoverSpec(node.key)}
                          className="cursor-pointer group/chip"
                        >
                          <rect 
                            x={node.x - 6} 
                            y={node.y - 6} 
                            width="72" 
                            height="56" 
                            fill="transparent" 
                          />
                          <rect 
                            x={node.x} 
                            y={node.y} 
                            width="60" 
                            height="44" 
                            rx="4" 
                            fill={isSel ? "rgba(180,83,9,0.26)" : (isHov ? "rgba(180,83,9,0.16)" : "#FFFFFF")} 
                            stroke={isSel ? "#B45309" : (isHov ? "#B45309" : "#E4D9BC")} 
                            strokeWidth={isSel ? "2" : (isHov ? "1.5" : "1")} 
                            vectorEffect="non-scaling-stroke" 
                            style={{ transition: "fill 0.15s, stroke 0.15s" }}
                          />
                        </g>
                      );
                    })}

                    <line x1="-17.1" x2="-17.1" y1="-80" y2="80" stroke="#B45309" strokeWidth="1.2" vectorEffect="non-scaling-stroke" opacity="0.5" />
                    <circle cx="0" cy="0" r="7" fill="#FDFBF7" stroke="#B45309" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                    <circle cx="0" cy="0" r="3" fill="#B45309" />
                  </g>

                  {/* Surface Labels for P3 */}
                  <g pointerEvents="none">
                    {P3_NODES.map((node) => {
                      const isSel = (isInteracting && currentPhase === 2) && currentSpecKey === node.key;
                      return (
                        <g key={`lbl-${node.key}`}>
                          <text 
                            x={node.textX} 
                            y={node.textY} 
                            textAnchor="middle" 
                            fill={isSel ? "#B45309" : "#4A3B33"} 
                            fontSize="7.5" 
                            fontFamily="JetBrains Mono, monospace" 
                            fontWeight={isSel ? "800" : "700"} 
                            letterSpacing="1"
                          >
                            {node.key}
                          </text>
                          <text 
                            x={node.subX} 
                            y={node.subY} 
                            textAnchor="middle" 
                            fill={isSel ? "#A16207" : "#78716C"} 
                            fontSize="6.2" 
                            fontFamily="JetBrains Mono, monospace" 
                            letterSpacing="0.3"
                          >
                            {isSel ? "● active" : node.sub}
                          </text>
                        </g>
                      );
                    })}
                    <text x="869.2" y="238.5" fontSize="6.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.8" fill="#A8A29E">03</text>
                  </g>
                </g>
              </g>

              {/* Bottom Telemetry Bar */}
              <g pointerEvents="none" opacity={isInteracting ? 0.35 : 1} style={{ transition: "opacity 0.25s" }}>
                <g>
                  <text x="24" y="432" fill="#78716C" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.2">CODE INTEGRITY</text>
                  <text x="294" y="432" textAnchor="end" fill="#4A3B33" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">100%</text>
                  <rect x="24" y="442" width="270" height="3" rx="1.5" fill="#F1E9DA" />
                  <rect x="24" y="442" width="270" height="3" rx="1.5" fill="#B45309" />
                </g>
                <g>
                  <text x="318" y="432" fill="#78716C" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.2">SYSTEM LATENCY</text>
                  <text x="588" y="432" textAnchor="end" fill="#4A3B33" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">&lt; 100ms</text>
                  <rect x="318" y="442" width="270" height="3" rx="1.5" fill="#F1E9DA" />
                  <rect x="318" y="442" width="40" height="3" rx="1.5" fill="#B45309" />
                </g>
                <g>
                  <text x="612" y="432" fill="#78716C" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.2">VERIFIED COMMITS</text>
                  <text x="882" y="432" textAnchor="end" fill="#4A3B33" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">699+</text>
                  <rect x="612" y="442" width="270" height="3" rx="1.5" fill="#F1E9DA" />
                  <rect x="612" y="442" width="270" height="3" rx="1.5" fill="#B45309" />
                </g>
                <g>
                  <text x="906" y="432" fill="#78716C" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.2">PRODUCTION DOWNTIME</text>
                  <text x="1176" y="432" textAnchor="end" fill="#4A3B33" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">0.0s</text>
                  <rect x="906" y="442" width="270" height="3" rx="1.5" fill="#F1E9DA" />
                  <rect x="906" y="442" width="0" height="3" rx="1.5" fill="#B45309" />
                </g>
              </g>

              {/* Bottom Separator & Footer Label */}
              <g pointerEvents="none">
                <line x1="24" y1="484" x2="1176" y2="484" stroke="#E4D9BC" strokeWidth="1" />
                <text x="24" y="504" fill="#A8A29E" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4">
                  engineering_protocol.live · 3 phases · 17 interactive specs · production grade
                </text>
                <text x="1176" y="504" textAnchor="end" fill="#A16207" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4" fontWeight="600">
                  {isInteracting ? "HOVER OR CLICK TILES TO SWITCH SPEC" : "HOVER A PHASE TO INSPECT SPEC"}
                </text>
              </g>
            </svg>

            {/* Inspection Detail Panel - Only shown on hover/interaction with smooth animatePresence */}
            <AnimatePresence>
              {isInteracting && currentSpec && (
                <motion.div
                  key={currentPhase}
                  initial={{ opacity: 0, x: "-50%", y: 10 }}
                  animate={{ opacity: 1, x: "-50%", y: 0 }}
                  exit={{ opacity: 0, x: "-50%", y: 6 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  onMouseEnter={handleCardMouseEnter}
                  onMouseLeave={handleCardMouseLeave}
                  className="hidden md:block absolute z-30 pointer-events-auto cursor-default w-[30%] min-w-[310px] max-w-[370px]"
                  style={{
                    top: cardPos.top,
                    left: cardPos.left
                  }}
                >
                  <div className="relative overflow-hidden rounded-lg border border-[#E4D9BC] bg-white/95 backdrop-blur-md shadow-[0_16px_40px_-16px_rgba(74,59,51,0.28)]">
                    <div className="absolute inset-y-0 left-0 w-[3px] bg-[#B45309]" />
                    <div className="p-4">
                      {/* Eyebrow & LIVE badge & Close Button */}
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#B45309]">
                          {currentSpec.eyebrow}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#10B981] font-semibold">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                            live spec
                          </span>
                          <button
                            type="button"
                            onClick={handleCloseCard}
                            aria-label="Close inspection panel"
                            className="p-1 rounded text-[#A8A29E] hover:text-[#4A3B33] hover:bg-[#FAF6EE] transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="mt-2 text-[15.5px] font-bold leading-snug text-[#4A3B33] font-serif">
                        {currentSpec.title}
                      </h4>

                      {/* Interactive Spec Pill Switcher */}
                      <div className="mt-3 flex flex-wrap gap-1.5 pb-2.5 border-b border-[#F1E9DA]">
                        {PHASE_SPECS[currentPhase].map((sKey) => {
                          const isAct = currentSpecKey === sKey;
                          return (
                            <button
                              key={sKey}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectSpec(sKey);
                              }}
                              className={`px-2 py-0.5 text-[10px] font-mono font-medium rounded transition-all cursor-pointer ${
                                isAct 
                                  ? "bg-[#B45309] text-white font-bold shadow-sm scale-105" 
                                  : "bg-[#FAF6EE] text-[#78716C] hover:bg-[#F1E9DA] hover:text-[#4A3B33] border border-[#E4D9BC]/70"
                              }`}
                            >
                              {sKey}
                              {isAct && <span className="ml-1 opacity-80">●</span>}
                            </button>
                          );
                        })}
                      </div>

                      {/* Body Description */}
                      <p className="mt-2.5 text-[11.5px] leading-[1.65] text-[#57534E]">
                        {currentSpec.body}
                      </p>

                      {/* Key-Value Stats */}
                      <dl className="mt-3 space-y-1.5 border-t border-[#F1E9DA] pt-2.5">
                        {currentSpec.stats.map(([k, v]) => (
                          <div key={k} className="flex items-baseline justify-between gap-3">
                            <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#A8A29E]">{k}</dt>
                            <dd className="font-mono text-[11px] font-semibold tabular-nums text-[#4A3B33]">{v}</dd>
                          </div>
                        ))}
                      </dl>

                      {/* Code Pill */}
                      {currentSpec.code && (
                        <div className="mt-3 rounded-md border border-[#F1E9DA] bg-[#F8F4EE] px-2.5 py-1.5 font-mono text-[10px] text-[#57534E] overflow-x-auto whitespace-nowrap">
                          <span className="text-[#B45309]">▸</span> {currentSpec.code}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Interactive Inspection Card - Only visible when user taps to inspect */}
        <AnimatePresence>
          {isInteracting && currentSpec && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="block md:hidden mt-6"
            >
              <div className="relative overflow-hidden rounded-lg border border-[#E4D9BC] bg-white p-4 shadow-md">
                <div className="absolute inset-y-0 left-0 w-[3px] bg-[#B45309]" />
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#B45309]">
                    {currentSpec.eyebrow}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-[#10B981] font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                      live spec
                    </span>
                    <button
                      type="button"
                      onClick={handleCloseCard}
                      aria-label="Close inspection panel"
                      className="p-1 rounded text-[#A8A29E] hover:text-[#4A3B33] hover:bg-[#FAF6EE] cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h4 className="text-[15px] font-bold text-[#4A3B33] font-serif mb-2">
                  {currentSpec.title}
                </h4>

                {/* Pill Switcher */}
                <div className="flex flex-wrap gap-1.5 py-2 border-y border-[#F1E9DA] my-2">
                  {PHASE_SPECS[currentPhase].map((sKey) => {
                    const isAct = currentSpecKey === sKey;
                    return (
                      <button
                        key={sKey}
                        type="button"
                        onClick={() => handleSelectSpec(sKey)}
                        className={`px-2 py-0.5 text-[10.5px] font-mono rounded cursor-pointer ${
                          isAct ? "bg-[#B45309] text-white font-bold" : "bg-[#FAF6EE] text-[#78716C] border border-[#E4D9BC]"
                        }`}
                      >
                        {sKey}
                      </button>
                    );
                  })}
                </div>

                <p className="text-[12px] leading-relaxed text-[#57534E] mb-3">
                  {currentSpec.body}
                </p>

                <dl className="space-y-1.5 border-t border-[#F1E9DA] pt-2 mb-2">
                  {currentSpec.stats.map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-2">
                      <dt className="font-mono text-[9px] uppercase tracking-wider text-[#A8A29E]">{k}</dt>
                      <dd className="font-mono text-[11px] font-semibold text-[#4A3B33]">{v}</dd>
                    </div>
                  ))}
                </dl>

                {currentSpec.code && (
                  <div className="rounded border border-[#F1E9DA] bg-[#F8F4EE] px-2 py-1.5 font-mono text-[10px] text-[#57534E] overflow-x-auto whitespace-nowrap">
                    <span className="text-[#B45309]">▸</span> {currentSpec.code}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
