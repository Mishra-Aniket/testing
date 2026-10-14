"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "../utils/sound";
import {
  Search,
  X,
  Home,
  BookOpen,
  CreditCard,
  Folder,
  Shield,
  Mail,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  Layers,
  Cpu,
  Rocket,
  GraduationCap,
  HelpCircle,
  FileText,
  Clock,
  Check,
  CornerDownLeft
} from "lucide-react";
import {
  PROJECTS,
  SERVICES,
  STUDENT_OFFERS,
  STACK_LAYERS,
  FAQS,
  SITE_PAGES,
  PERSONAL_INFO,
  WORKFLOW_STEPS,
  CLIENT_TESTIMONIALS
} from "../data/portfolioData";

/**
 * Helper to recursively extract all text from any object / array
 * This guarantees that ANY new field or property added to portfolioData.js
 * is automatically 100% searchable with zero code changes!
 */
function extractAllText(data) {
  if (!data) return "";
  if (typeof data === "string" || typeof data === "number") return String(data);
  if (Array.isArray(data)) {
    return data.map(extractAllText).join(" ");
  }
  if (typeof data === "object") {
    return Object.values(data).map(extractAllText).join(" ");
  }
  return "";
}

// Icon mapping helper for navigation and dynamic types
const ICON_MAP = {
  Home,
  Folder,
  Rocket,
  Layers,
  HelpCircle,
  CreditCard,
  GraduationCap,
  BookOpen,
  FileText,
  Cpu,
  Shield,
  ExternalLink,
  Mail
};

const CATEGORY_TABS = [
  { id: "all", label: "All Results", icon: Sparkles },
  { id: "projects", label: "Projects", icon: Folder },
  { id: "services", label: "Services", icon: Rocket },
  { id: "students", label: "Students", icon: GraduationCap },
  { id: "stack", label: "Tech Stack", icon: Layers },
  { id: "faq", label: "FAQs", icon: HelpCircle },
  { id: "pages", label: "Pages & Links", icon: BookOpen }
];

export default function SearchModal({ isOpen, onOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeAnswer, setActiveAnswer] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const inputRef = useRef(null);

  // Sync with mobile menu open state to prevent overlapping
  useEffect(() => {
    const handleMobileMenuChange = (e) => {
      setIsMobileMenuOpen(Boolean(e.detail));
    };
    if (typeof document !== "undefined") {
      setIsMobileMenuOpen(document.documentElement.getAttribute("data-mobile-nav-open") === "true");
    }
    window.addEventListener("aniket_mobile_menu", handleMobileMenuChange);
    return () => window.removeEventListener("aniket_mobile_menu", handleMobileMenuChange);
  }, []);

  // Keyboard shortcut listener for ⌘K / Ctrl K and Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          onOpen();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onOpen, onClose]);

  // Scroll lock & autofocus on open
  useEffect(() => {
    if (isOpen) {
      if (typeof window !== "undefined") {
        if (window.__lenis) {
          window.__lenis.stop();
        }
        const qParam = new URLSearchParams(window.location.search).get("q");
        if (qParam) {
          setQuery(qParam);
        }
      }
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
      document.body.style.overflow = "";
      setQuery("");
      setActiveAnswer(null);
      setActiveCategory("all");
      setSelectedIndex(0);
    }

    return () => {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ==============================================================================
  // 1. DYNAMIC KNOWLEDGE BASE (AUTOMATICALLY GENERATED FROM PORTFOLIO DATA)
  // Whenever any project, service, FAQ, or student offer is added to portfolioData.js,
  // it is automatically transformed into an AI Q&A card!
  // ==============================================================================
  const dynamicKnowledgeBase = useMemo(() => {
    const base = [
      {
        q: "What projects has Aniket built?",
        keywords: ["projects", "built", "work", "portfolio", "apps", "code", ...(PROJECTS || []).map(p => p.id || "")],
        tag: "FULL PORTFOLIO",
        time: "115ms",
        source: "Projects · aniket.one",
        answer: `Aniket has engineered production applications including: ${(PROJECTS || []).map(p => p.title.split("—")[0].trim()).join(", ")}. Spanning official Chrome extensions (OmTabs & OmSpace), automated enterprise pipelines (Centrix across 500+ centers), zero-RAM media streamers (Nexus Streamer), and cross-platform desktop OCR tools (Qpic).`,
        target: "#work"
      },
      {
        q: "What is Aniket's primary tech stack?",
        keywords: ["stack", "tech", "technologies", "nextjs", "react", "dotnet", "python", "fastapi", "typescript", "csharp", "postgres", "redis", "docker"],
        tag: "CORE TECH STACK",
        time: "110ms",
        source: "Stack Profile · L00-L04 Architecture",
        answer: "Full-Stack & Systems Architecture: Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS on the frontend; high-throughput microservices in .NET 8 / C# and Python (FastAPI); PostgreSQL, Supabase, Redis, and SQLite WAL for resilient storage; Docker, Vercel, and GitHub Actions CI/CD for deployments.",
        target: "#stack"
      },
      {
        q: "How fast can you build and launch a production-ready MVP?",
        keywords: ["mvp", "turnaround", "timeline", "fast", "sprint", "duration", "how long", "launch", "weeks", "days", "speed"],
        tag: "SPRINT VELOCITY",
        time: "95ms",
        source: "Delivery Blueprint · Sprints",
        answer: "Production MVPs are delivered within 2 to 4 weeks. You get a complete, production-hardened web product with Next.js 15, PostgreSQL database schema, authentication, Stripe/Razorpay payments, error tracking, staging preview links, and 100% intellectual property & source code handover.",
        target: "#services"
      },
      {
        q: "Tell me about Centrix and its enterprise scale",
        keywords: ["centrix", "centers", "enterprise", "scale", "physics wallah", "pw", "google drive", "sync", "automation", "lectures"],
        tag: "500+ CENTERS SCALED",
        time: "140ms",
        source: "Centrix Architecture · Case Study",
        answer: "Centrix is an edge-first automated ingestion engine built for Physics Wallah Vidyapeeth across 500+ physical centers in India. It autonomously detects OBS/MaxHub recordings, matches timetables using confidence algorithms, and executes direct chunked resumable uploads to Google Drive, handling 10,000–20,000 daily lectures with zero cloud egress cost.",
        target: "#work"
      },
      {
        q: "What Chrome extensions has Aniket published?",
        keywords: ["chrome", "extensions", "omtabs", "omspace", "browser", "webstore", "manifest v3", "mv3"],
        tag: "CHROME WEB STORE",
        time: "105ms",
        source: "Chrome Web Store (Official)",
        answer: "Aniket has published OmTabs (browser tab customization, grouping, and biometric privacy lock) and OmSpace (all-in-one productivity new tab dashboard with widgets and focus mode). Both are built on Manifest V3 with background service workers and zero memory drag.",
        target: "#work"
      },
      {
        q: "What free programs and mentorship do you offer for students?",
        keywords: ["student", "students", "mentorship", "college", "free", "advice", "pr review", "code review", "grant", "subsidy", "starter"],
        tag: "STUDENTS & BUILDERS",
        time: "100ms",
        source: "Students Hub · aniket.one/students",
        answer: "Under the Students & Builders Initiative, Aniket provides: 1) 100% Free 30-min 1-on-1 career & engineering mentorship, 2) Zero-cost GitHub PR and system architecture code reviews, 3) Open-source production boilerplates (Next.js 15 + FastAPI + MV3), and 4) An 80% subsidized MVP architecture grant for student-led startups.",
        target: "/students"
      },
      {
        q: "Do I own 100% of the source code and intellectual property?",
        keywords: ["code ownership", "ip", "intellectual property", "nda", "license", "source code", "security", "confidential"],
        tag: "100% IP SOVEREIGNTY",
        time: "90ms",
        source: "Legal & IP Terms · /security",
        answer: "Yes, 100%. Clients retain exclusive, perpetual ownership of all source code, database architectures, CI/CD scripts, and digital assets from day one. All projects operate under strict bilateral Non-Disclosure Agreements (NDAs), and complete GitHub repository access is transferred to you.",
        target: "/security"
      },
      {
        q: "What are Aniket's GitHub profiles and open-source contributions?",
        keywords: ["github", "commits", "repos", "open source", "aniketmishra-0", "mishra-aniket", "contributions"],
        tag: "GITHUB PROFILES",
        time: "110ms",
        source: "GitHub API · 699+ Contributions",
        answer: "Aniket maintains two GitHub profiles: @aniketmishra-0 (primary personal profile with 699+ verified open-source contributions) and @Mishra-Aniket (enterprise and systems repositories), spanning full-stack web apps, browser extensions, and automated pipelines.",
        target: "https://github.com/aniketmishra-0"
      },
      {
        q: "How do contracts, milestones, and payments work?",
        keywords: ["contracts", "invoicing", "milestone", "payment", "msme", "udyam", "invoice", "bank wire", "stripe", "escrow"],
        tag: "CONTRACTS & MSME",
        time: "115ms",
        source: "Govt. of India Registered MSME",
        answer: `Projects operate under transparent milestone-based contracts with invoices issued through Aniket's Govt. of India registered MSME enterprise (${PERSONAL_INFO?.udyamRegNo || "UDYAM-UP-03-0065855"}). Payments can be handled via bank wire, Stripe, Razorpay, or escrow milestones with clear sign-offs before any stage begins.`,
        target: "#get-access"
      },
      {
        q: "How can I collaborate or hire Aniket for a project?",
        keywords: ["hire", "contact", "email", "collaborate", "freelance", "work together", "talk", "quote", "booking"],
        tag: "COLLABORATION & HIRE",
        time: "85ms",
        source: `${PERSONAL_INFO?.email || "aniketmishra492@gmail.com"} · Direct Inquiry`,
        answer: `Aniket is available for freelance projects, MVP sprints, and technical contract roles. Reach out directly via email at ${PERSONAL_INFO?.email || "aniketmishra492@gmail.com"}, fill out the project form at #get-access, or connect on LinkedIn (@aniketmishra0). Average response time is under 12 hours.`,
        target: `mailto:${PERSONAL_INFO?.email || "aniketmishra492@gmail.com"}`
      }
    ];

    // Automatically generate Q&A for every project in PROJECTS
    (PROJECTS || []).forEach((p) => {
      const pTitle = p.title || p.id;
      base.push({
        q: `Tell me about ${pTitle}`,
        keywords: [p.id, ...pTitle.toLowerCase().split(/[\s—-]+/), ...(p.tags || []).map(t => t.toLowerCase())],
        tag: p.badge || p.category || "PROJECT",
        time: "105ms",
        source: `${pTitle} · Case Study`,
        answer: `${p.description || ""} ${p.highlights ? "Highlights: " + p.highlights.join("; ") + "." : ""} Metrics: ${p.metrics || "Production Grade"}.`,
        target: p.liveUrl && p.liveUrl.startsWith("http") ? p.liveUrl : "#work"
      });
    });

    // Automatically generate Q&A for every service in SERVICES
    (SERVICES || []).forEach((s) => {
      base.push({
        q: `What is included in ${s.title}?`,
        keywords: [s.id, ...s.title.toLowerCase().split(/[\s—-]+/), "service", "deliverables", "turnaround"],
        tag: s.turnaround || "SERVICE",
        time: "95ms",
        source: `${s.title} · Service Offering`,
        answer: `${s.description || ""} Turnaround: ${s.turnaround || "2–4 Weeks"}. Key deliverables: ${(s.deliverables || []).join(", ")}. Ideal for: ${s.idealFor || "High-growth teams"}.`,
        target: "#services"
      });
    });

    // Automatically generate Q&A for every FAQ in FAQS
    (FAQS || []).forEach((f) => {
      base.push({
        q: f.q,
        keywords: [...f.q.toLowerCase().split(/[\s?.,]+/), ...(f.keywords || [])],
        tag: "VERIFIED FAQ",
        time: "80ms",
        source: "Client & Engineering FAQ",
        answer: f.a,
        target: f.href || "#faq"
      });
    });

    return base;
  }, []);

  // ==============================================================================
  // 2. UNIVERSAL DYNAMIC SEARCH MATCHER
  // Recursively indexes all fields of all data structures from portfolioData.js
  // ==============================================================================
  const searchResults = useMemo(() => {
    const cleanQ = query.trim().toLowerCase();

    // 1. PROJECTS
    const matchedProjects = (PROJECTS || []).filter((p) => {
      if (!cleanQ) return true;
      return extractAllText(p).toLowerCase().includes(cleanQ);
    }).map((p) => ({
      type: "projects",
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      badge: p.badge,
      metrics: p.metrics,
      description: p.description,
      tags: p.tags || [],
      href: p.liveUrl && p.liveUrl.startsWith("http") ? p.liveUrl : "#work",
      external: p.liveUrl && p.liveUrl.startsWith("http"),
      secondaryUrl: p.githubUrl,
      secondaryLabel: "GitHub Repo"
    }));

    // 2. SERVICES
    const matchedServices = (SERVICES || []).filter((s) => {
      if (!cleanQ) return true;
      return extractAllText(s).toLowerCase().includes(cleanQ);
    }).map((s) => ({
      type: "services",
      id: s.id,
      title: s.title,
      subtitle: s.tagline,
      badge: s.badge || s.turnaround,
      turnaround: s.turnaround,
      description: s.description,
      deliverables: s.deliverables || [],
      href: "#get-access",
      external: false
    }));

    // 3. STUDENT INITIATIVES
    const matchedStudents = (STUDENT_OFFERS || []).filter((so) => {
      if (!cleanQ) return true;
      return extractAllText(so).toLowerCase().includes(cleanQ);
    }).map((so) => ({
      type: "students",
      id: so.id,
      title: so.title,
      subtitle: so.tagline,
      badge: so.badge,
      highlight: so.highlight,
      description: so.description,
      href: so.actionUrl?.startsWith("mailto") ? so.actionUrl : "/students",
      external: so.actionUrl?.startsWith("mailto") || so.actionUrl?.startsWith("http")
    }));

    // 4. TECH STACK LAYERS
    const matchedStack = (STACK_LAYERS || []).filter((sl) => {
      if (!cleanQ) return true;
      return extractAllText(sl).toLowerCase().includes(cleanQ);
    }).map((sl) => ({
      type: "stack",
      id: sl.id || sl.idx,
      title: sl.title,
      subtitle: (sl.techs || []).join(" · "),
      badge: "Architecture Layer",
      description: sl.body || sl.description,
      href: sl.target || "#stack",
      external: false
    }));

    // 5. FAQS
    const matchedFaqs = (FAQS || []).filter((f) => {
      if (!cleanQ) return true;
      return extractAllText(f).toLowerCase().includes(cleanQ);
    }).map((f) => ({
      type: "faq",
      id: f.id || f.q,
      title: f.q,
      subtitle: f.a,
      badge: "FAQ & Answers",
      description: f.a,
      href: f.href || "#faq",
      external: false
    }));

    // 6. PAGES & DIRECT SHORTCUTS
    const matchedPages = (SITE_PAGES || []).filter((pg) => {
      if (!cleanQ) return true;
      return extractAllText(pg).toLowerCase().includes(cleanQ);
    }).map((pg) => {
      let IconComponent = FileText;
      if (pg.icon) {
        IconComponent = typeof pg.icon === "string" ? (ICON_MAP[pg.icon] || FileText) : pg.icon;
      }
      return {
        type: "pages",
        id: pg.label,
        title: pg.label,
        subtitle: pg.desc,
        badge: pg.external ? "External Link" : "Site Route",
        description: pg.desc,
        href: pg.href,
        icon: IconComponent,
        external: pg.external
      };
    });

    return {
      projects: matchedProjects,
      services: matchedServices,
      students: matchedStudents,
      stack: matchedStack,
      faq: matchedFaqs,
      pages: matchedPages
    };
  }, [query]);

  // Total results count
  const totalCount = useMemo(() => {
    return (
      searchResults.projects.length +
      searchResults.services.length +
      searchResults.students.length +
      searchResults.stack.length +
      searchResults.faq.length +
      searchResults.pages.length
    );
  }, [searchResults]);

  // Flattened active results based on category filter for keyboard navigation
  const flatVisibleResults = useMemo(() => {
    if (activeCategory === "all") {
      return [
        ...searchResults.projects,
        ...searchResults.services,
        ...searchResults.students,
        ...searchResults.stack,
        ...searchResults.faq,
        ...searchResults.pages
      ];
    }
    return searchResults[activeCategory] || [];
  }, [searchResults, activeCategory]);

  // Intelligent matching for instant AI answer from the dynamic knowledge base
  const matchedQA = useMemo(() => {
    const cleanQ = query.trim().toLowerCase();
    if (!cleanQ) return null;

    return dynamicKnowledgeBase.find((item) => {
      const qMatch = item.q.toLowerCase().includes(cleanQ);
      const kMatch = item.keywords?.some((k) => cleanQ.includes(k) || k.includes(cleanQ));
      return qMatch || kMatch;
    });
  }, [query, dynamicKnowledgeBase]);

  const displayAnswer = activeAnswer || matchedQA;

  // Handle custom query asking with contextual synthesis across all live portfolio items
  const handleCustomAsk = (customQuery) => {
    sound.playClick();
    const qLower = customQuery.toLowerCase();

    // Check if query matches any project directly
    const matchingProj = (PROJECTS || []).find(p => extractAllText(p).toLowerCase().includes(qLower));
    // Check if query matches any service directly
    const matchingSrv = (SERVICES || []).find(s => extractAllText(s).toLowerCase().includes(qLower));
    // Check if query matches any stack layer
    const matchingStack = (STACK_LAYERS || []).find(sl => extractAllText(sl).toLowerCase().includes(qLower));

    let synthesizedAnswer = "";
    let target = "#work";
    let tag = "AI SYNTHESIS";

    if (matchingProj) {
      tag = matchingProj.badge || "MATCHED PROJECT";
      synthesizedAnswer = `For "${customQuery}": Aniket engineered ${matchingProj.title} (${matchingProj.metrics || "Production Grade"}). ${matchingProj.description} ${matchingProj.highlights ? "Key highlights: " + matchingProj.highlights.join("; ") : ""}`;
      target = matchingProj.liveUrl && matchingProj.liveUrl.startsWith("http") ? matchingProj.liveUrl : "#work";
    } else if (matchingSrv) {
      tag = matchingSrv.turnaround || "MATCHED SERVICE";
      synthesizedAnswer = `For "${customQuery}": Aniket offers ${matchingSrv.title}. ${matchingSrv.description} Turnaround: ${matchingSrv.turnaround}. Deliverables: ${(matchingSrv.deliverables || []).join(", ")}.`;
      target = "#services";
    } else if (matchingStack) {
      tag = "MATCHED ARCHITECTURE";
      synthesizedAnswer = `For "${customQuery}": Implemented in Aniket's ${matchingStack.title}. ${matchingStack.body} Technologies: ${(matchingStack.techs || []).join(", ")}.`;
      target = "#stack";
    } else if (qLower.includes("price") || qLower.includes("cost") || qLower.includes("rate") || qLower.includes("budget") || qLower.includes("quote")) {
      tag = "PRICING & ESTIMATES";
      synthesizedAnswer = `For "${customQuery}": Freelance sprints operate on transparent milestone pricing. 2–4 Week Production MVPs are fixed-bid with clean handover. Invoices are issued under registered MSME ${PERSONAL_INFO?.udyamRegNo || "UDYAM-UP-03-0065855"} with 100% source code ownership. Check /pricing or contact ${PERSONAL_INFO?.email || "aniketmishra492@gmail.com"}.`;
      target = "/pricing";
    } else if (qLower.includes("timeline") || qLower.includes("fast") || qLower.includes("time") || qLower.includes("speed") || qLower.includes("turnaround")) {
      tag = "SPRINT VELOCITY";
      synthesizedAnswer = `For "${customQuery}": Standard MVP builds launch in 14–28 days. Custom Chrome Extensions (MV3) take 7–14 days. Performance audits & tuning take 5–10 days. Sprints run with live private staging previews and daily async updates.`;
      target = "#services";
    } else if (qLower.includes("student") || qLower.includes("college") || qLower.includes("free") || qLower.includes("intern") || qLower.includes("career")) {
      tag = "STUDENT BUILDERS";
      synthesizedAnswer = `For "${customQuery}": Aniket offers 100% free 1-on-1 career & project guidance sessions, zero-cost GitHub code reviews, open-source production starters, and an 80% subsidized MVP grant for student startup founders. Explore the dedicated hub at /students.`;
      target = "/students";
    } else {
      synthesizedAnswer = `For "${customQuery}": Aniket Mishra engineers end-to-end full-stack web products (Next.js 15, React 19, TypeScript), high-throughput systems (.NET 8, FastAPI, PostgreSQL), and Manifest V3 Chrome extensions with strict typing, sub-100ms response targets, and 100% intellectual property ownership.`;
      target = "#get-access";
    }

    setActiveAnswer({
      q: customQuery,
      tag,
      time: "92ms",
      source: "Universal Dynamic Engine",
      answer: synthesizedAnswer,
      target
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      sound.playClick();
      setSelectedIndex((prev) => (prev + 1) % (flatVisibleResults.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      sound.playClick();
      setSelectedIndex((prev) => (prev - 1 + (flatVisibleResults.length || 1)) % (flatVisibleResults.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      sound.playClick();
      if (displayAnswer && !flatVisibleResults[selectedIndex]) {
        window.location.href = displayAnswer.target;
        onClose();
      } else if (flatVisibleResults[selectedIndex]) {
        const item = flatVisibleResults[selectedIndex];
        if (item.external) {
          window.open(item.href, "_blank", "noopener,noreferrer");
        } else {
          window.location.href = item.href;
        }
        onClose();
      } else if (query.trim()) {
        handleCustomAsk(query);
      }
    }
  };

  const handleSelectQuestion = (qa) => {
    sound.playClick();
    setQuery(qa.q);
    setActiveAnswer(qa);
  };

  return (
    <>
      {/* 1. FIXED FLOATING BOTTOM SEARCH DOCK */}
      <div
        data-bottom-search-dock="true"
        className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-40 -translate-x-1/2 max-w-[calc(100vw-2rem)] transition-[opacity,transform] duration-250 ease-out will-change-[transform,opacity] ${
          isOpen || isMobileMenuOpen
            ? "opacity-0 pointer-events-none scale-95"
            : "opacity-100 pointer-events-auto scale-100"
        }`}
      >
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onOpen();
            setActiveAnswer(null);
          }}
          aria-label="Universal Search across Aniket's projects, services, stack & AI"
          className="inline-flex shrink-0 items-center justify-center whitespace-nowrap border py-2 outline-none transition-all cursor-pointer select-none active:translate-y-px bg-white text-[#4A3B33] border-[#E4D9BC] hover:bg-[#F8F4EE] shadow-[var(--shadow-soft)] h-11 gap-2.5 rounded-lg px-4 sm:px-6 text-xs sm:text-sm font-semibold hover:-translate-y-px"
        >
          <Search className="w-4 h-4 text-[#B45309] shrink-0" />
          <span className="truncate max-w-[240px] sm:max-w-none">
            Universal Search: Projects, Services, Stack, FAQs…
          </span>
          <kbd className="hidden sm:inline-flex ml-2 rounded border border-[#E4D9BC] bg-[#F8F4EE] px-1.5 py-0.5 font-mono text-[11px] text-[#78716C]">
            ⌘ K
          </kbd>
        </button>
      </div>

      {/* 2. THE UNIVERSAL SEARCH MODAL */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 bg-[#1C1917]/60 backdrop-blur-sm z-50 pointer-events-auto will-change-opacity"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
            />

            {/* Modal Flex Container */}
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
              <motion.div
                initial={{ y: 20, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 14, opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.24,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="pointer-events-auto relative w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[86vh] flex flex-col rounded-t-2xl sm:rounded-2xl border-t sm:border border-[#E4D9BC] bg-[#FDFBF7] shadow-[0_24px_64px_-12px_rgba(74,59,51,0.3)] overflow-hidden text-[#4A3B33] will-change-transform"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={handleKeyDown}
              >
                {/* Drag Handle (Mobile) */}
                <div className="pt-2.5 pb-1 flex justify-center sm:hidden shrink-0">
                  <div className="w-10 h-1 rounded-full bg-[#E4D9BC]" />
                </div>

                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-[#E4D9BC]/80 px-4 sm:px-5 py-2.5 shrink-0 bg-[#FAF6EE]/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B45309] animate-pulse" />
                    <h2 className="text-sm font-semibold text-[#4A3B33] font-serif">
                      Universal Portfolio Search
                    </h2>
                    <span className="hidden sm:inline-block font-mono text-[10px] text-[#78716C] bg-white border border-[#E4D9BC] px-1.5 py-0.5 rounded">
                      Live Dynamic Index
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10.5px] text-[#78716C] hidden sm:inline-block">
                      {totalCount} results indexed
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        onClose();
                      }}
                      aria-label="Close search"
                      className="rounded-md p-1.5 text-[#78716C] hover:bg-[#F4EEDB] hover:text-[#4A3B33] transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Modal Input Field */}
                <div className="p-3.5 sm:p-4 pb-2 shrink-0">
                  <div className="flex items-center gap-2.5 rounded-lg border border-[#B45309] bg-white px-3.5 py-2.5 shadow-xs ring-2 ring-[#B45309]/15 transition-all">
                    <Search className="w-4 h-4 text-[#B45309] shrink-0" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setActiveAnswer(null);
                        setSelectedIndex(0);
                      }}
                      placeholder="Search projects, services, stack, FAQs, docs, or ask AI…"
                      className="w-full bg-transparent text-sm text-[#4A3B33] placeholder-[#A8A29E] outline-none font-sans"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => {
                          setQuery("");
                          setActiveAnswer(null);
                          inputRef.current?.focus();
                        }}
                        className="text-[#A8A29E] hover:text-[#4A3B33] p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Category Filter Chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2.5 pb-1">
                    {CATEGORY_TABS.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeCategory === tab.id;
                      const count =
                        tab.id === "all"
                          ? totalCount
                          : searchResults[tab.id]?.length || 0;

                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setActiveCategory(tab.id);
                            setSelectedIndex(0);
                          }}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                            isActive
                              ? "bg-[#B45309] text-white font-semibold shadow-xs"
                              : "bg-white text-[#78716C] border border-[#E4D9BC]/80 hover:bg-[#FAF6EE] hover:text-[#4A3B33]"
                          }`}
                        >
                          <Icon className={`w-3 h-3 ${isActive ? "text-white" : "text-[#B45309]"}`} />
                          <span>{tab.label}</span>
                          <span
                            className={`px-1 py-0.2 rounded text-[9.5px] ${
                              isActive ? "bg-white/20 text-white" : "bg-[#FAF6EE] text-[#78716C]"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Main Scrollable Content Container */}
                <div
                  className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3.5 sm:px-4 py-2 space-y-4 touch-pan-y"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  {/* AI Instant Resolution Card */}
                  {displayAnswer && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-[#B45309]/30 bg-[#FFFDF9] p-3.5 sm:p-4 shadow-xs"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#B45309] bg-[#B45309]/10 px-2 py-0.5 rounded">
                          <Sparkles className="w-3 h-3 text-[#B45309]" />
                          {displayAnswer.tag} · {displayAnswer.time}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setActiveAnswer(null);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-[#78716C] hover:text-[#4A3B33] px-1.5 py-0.5 rounded hover:bg-[#F4EEDB] transition-colors cursor-pointer"
                          title="Dismiss answer"
                        >
                          <span>Dismiss</span>
                          <X className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-[12px] font-mono font-medium text-[#78716C] mb-1.5">
                        Q: {displayAnswer.q}
                      </div>

                      <p className="text-[12.5px] leading-relaxed text-[#4A3B33] mb-3 font-sans">
                        {displayAnswer.answer}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-[#E4D9BC]/60">
                        <span className="font-mono text-[9px] text-[#78716C]">
                          Source: {displayAnswer.source}
                        </span>
                        <a
                          href={displayAnswer.target}
                          onClick={onClose}
                          className="inline-flex items-center gap-1 text-[11.5px] font-mono font-semibold text-[#B45309] hover:underline"
                        >
                          <span>Inspect Section</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {/* Ask Aniket AI one-tap query resolution */}
                  {query.trim() && !displayAnswer && (
                    <button
                      type="button"
                      onClick={() => handleCustomAsk(query)}
                      className="w-full text-left p-2.5 rounded-lg border border-[#B45309]/40 bg-[#B45309]/5 hover:bg-[#B45309]/10 text-[#4A3B33] transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#B45309] shrink-0" />
                        <span className="text-xs font-medium">
                          Ask Aniket AI: &ldquo;{query}&rdquo;
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#B45309] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        <span>Press Enter</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    </button>
                  )}

                  {/* Suggested AI Prompts when no query is typed */}
                  {!query.trim() && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between px-0.5">
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#78716C] flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#B45309]" />
                          Suggested AI Prompts (Instant Answers)
                        </span>
                        <span className="text-[9.5px] font-mono text-[#A8A29E]">Click to resolve</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {dynamicKnowledgeBase.slice(0, 6).map((item, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSelectQuestion(item)}
                            className={`text-left text-xs p-2.5 rounded-lg border transition-all cursor-pointer flex items-start gap-2 ${
                              displayAnswer?.q === item.q
                                ? "border-[#B45309] bg-[#FAF6EE] text-[#B45309] font-medium"
                                : "border-[#E4D9BC]/70 bg-white hover:border-[#B45309] hover:bg-[#FAF6EE] text-[#4A3B33]"
                            }`}
                          >
                            <span className="text-[#B45309] text-[10px] font-mono mt-0.5 font-bold shrink-0">✦</span>
                            <span className="flex-1 line-clamp-2 text-[11.5px] leading-tight font-medium">
                              {item.q}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ========================================================== */}
                  {/* CATEGORIZED RESULTS SECTIONS */}
                  {/* ========================================================== */}

                  {/* 1. PROJECTS & CASE STUDIES */}
                  {(activeCategory === "all" || activeCategory === "projects") &&
                    searchResults.projects.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between px-0.5">
                          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#78716C] flex items-center gap-1.5">
                            <Folder className="w-3.5 h-3.5 text-[#B45309]" />
                            Projects &amp; Case Studies ({searchResults.projects.length})
                          </span>
                          <a
                            href="#work"
                            onClick={onClose}
                            className="text-[10px] font-mono text-[#B45309] hover:underline"
                          >
                            View All #work →
                          </a>
                        </div>
                        <div className="space-y-1.5">
                          {searchResults.projects.map((proj) => {
                            const isSelected =
                              flatVisibleResults[selectedIndex]?.id === proj.id;

                            return (
                              <div
                                key={proj.id}
                                className={`p-2.5 sm:p-3 rounded-lg border transition-all ${
                                  isSelected
                                    ? "border-[#B45309] bg-[#F7F1E5] ring-1 ring-[#B45309]/30"
                                    : "border-[#E4D9BC]/80 bg-white hover:border-[#B45309]/60 hover:bg-[#FAF6EE]"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                      <h4 className="text-xs sm:text-[13px] font-bold text-[#4A3B33] truncate">
                                        {proj.title}
                                      </h4>
                                      <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#FAF6EE] text-[#B45309] border border-[#E4D9BC]">
                                        {proj.badge}
                                      </span>
                                    </div>
                                    <p className="text-[11.5px] text-[#57534E] line-clamp-2 mb-2 leading-relaxed font-sans">
                                      {proj.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                      {proj.tags.slice(0, 4).map((tag, tIdx) => (
                                        <span
                                          key={tIdx}
                                          className="text-[9.5px] font-mono bg-[#F3ECE0]/70 text-[#78716C] px-1.5 py-0.5 rounded"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                                    <a
                                      href={proj.href}
                                      target={proj.external ? "_blank" : undefined}
                                      rel={proj.external ? "noopener noreferrer" : undefined}
                                      onClick={onClose}
                                      className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono font-semibold bg-[#B45309] text-white hover:bg-[#92400E] transition-colors"
                                    >
                                      <span>Open</span>
                                      <ArrowUpRight className="w-3 h-3" />
                                    </a>
                                    {proj.secondaryUrl && (
                                      <a
                                        href={proj.secondaryUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] font-mono text-[#78716C] hover:text-[#B45309] hover:underline"
                                      >
                                        GitHub →
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  {/* 2. SERVICES & SPRINTS */}
                  {(activeCategory === "all" || activeCategory === "services") &&
                    searchResults.services.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between px-0.5">
                          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#78716C] flex items-center gap-1.5">
                            <Rocket className="w-3.5 h-3.5 text-[#B45309]" />
                            Services &amp; Sprints ({searchResults.services.length})
                          </span>
                          <a
                            href="#services"
                            onClick={onClose}
                            className="text-[10px] font-mono text-[#B45309] hover:underline"
                          >
                            Explore Roadmap →
                          </a>
                        </div>
                        <div className="space-y-1.5">
                          {searchResults.services.map((srv) => {
                            const isSelected =
                              flatVisibleResults[selectedIndex]?.id === srv.id;

                            return (
                              <div
                                key={srv.id}
                                className={`p-2.5 sm:p-3 rounded-lg border transition-all ${
                                  isSelected
                                    ? "border-[#B45309] bg-[#F7F1E5] ring-1 ring-[#B45309]/30"
                                    : "border-[#E4D9BC]/80 bg-white hover:border-[#B45309]/60 hover:bg-[#FAF6EE]"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="text-xs sm:text-[13px] font-bold text-[#4A3B33] truncate">
                                        {srv.title}
                                      </h4>
                                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-mono bg-[#B45309]/10 text-[#B45309] font-semibold">
                                        <Clock className="w-2.5 h-2.5" />
                                        {srv.turnaround}
                                      </span>
                                    </div>
                                    <p className="text-[11.5px] text-[#57534E] line-clamp-2 mb-2 font-sans">
                                      {srv.description}
                                    </p>
                                    <div className="space-y-0.5">
                                      {srv.deliverables.slice(0, 2).map((del, dIdx) => (
                                        <div
                                          key={dIdx}
                                          className="text-[10.5px] text-[#78716C] flex items-center gap-1.5 font-sans"
                                        >
                                          <Check className="w-3 h-3 text-[#B45309] shrink-0" />
                                          <span className="truncate">{del}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <a
                                    href="#get-access"
                                    onClick={onClose}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-[#FAF6EE] text-[#B45309] border border-[#E4D9BC] hover:bg-[#B45309] hover:text-white transition-all shrink-0 self-center"
                                  >
                                    <span>Discuss</span>
                                    <ArrowUpRight className="w-3 h-3" />
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  {/* 3. STUDENT INITIATIVES */}
                  {(activeCategory === "all" || activeCategory === "students") &&
                    searchResults.students.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between px-0.5">
                          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#78716C] flex items-center gap-1.5">
                            <GraduationCap className="w-3.5 h-3.5 text-[#B45309]" />
                            Students &amp; Campus Builders ({searchResults.students.length})
                          </span>
                          <a
                            href="/students"
                            onClick={onClose}
                            className="text-[10px] font-mono text-[#B45309] hover:underline"
                          >
                            Students Hub →
                          </a>
                        </div>
                        <div className="space-y-1.5">
                          {searchResults.students.map((st) => {
                            const isSelected =
                              flatVisibleResults[selectedIndex]?.id === st.id;

                            return (
                              <div
                                key={st.id}
                                className={`p-2.5 sm:p-3 rounded-lg border transition-all ${
                                  isSelected
                                    ? "border-[#B45309] bg-[#F7F1E5] ring-1 ring-[#B45309]/30"
                                    : "border-[#E4D9BC]/80 bg-white hover:border-[#B45309]/60 hover:bg-[#FAF6EE]"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="text-xs sm:text-[13px] font-bold text-[#4A3B33] truncate">
                                        {st.title}
                                      </h4>
                                      <span className="px-1.5 py-0.5 rounded text-[9.5px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                                        {st.badge}
                                      </span>
                                    </div>
                                    <p className="text-[11.5px] text-[#57534E] line-clamp-2 font-sans mb-1">
                                      {st.description}
                                    </p>
                                    <span className="text-[10px] font-mono text-[#B45309]">
                                      ★ {st.highlight}
                                    </span>
                                  </div>
                                  <a
                                    href={st.href}
                                    target={st.external ? "_blank" : undefined}
                                    rel={st.external ? "noopener noreferrer" : undefined}
                                    onClick={onClose}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-[#B45309] text-white hover:bg-[#92400E] transition-colors shrink-0 self-center"
                                  >
                                    <span>Apply</span>
                                    <ArrowUpRight className="w-3 h-3" />
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  {/* 4. TECH STACK LAYERS */}
                  {(activeCategory === "all" || activeCategory === "stack") &&
                    searchResults.stack.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between px-0.5">
                          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#78716C] flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-[#B45309]" />
                            Architecture Stack Layers ({searchResults.stack.length})
                          </span>
                          <a
                            href="#stack"
                            onClick={onClose}
                            className="text-[10px] font-mono text-[#B45309] hover:underline"
                          >
                            Explore Stack Diagram →
                          </a>
                        </div>
                        <div className="space-y-1.5">
                          {searchResults.stack.map((stk) => {
                            const isSelected =
                              flatVisibleResults[selectedIndex]?.id === stk.id;

                            return (
                              <a
                                key={stk.id}
                                href={stk.href}
                                onClick={onClose}
                                className={`block p-2.5 sm:p-3 rounded-lg border transition-all ${
                                  isSelected
                                    ? "border-[#B45309] bg-[#F7F1E5] ring-1 ring-[#B45309]/30"
                                    : "border-[#E4D9BC]/80 bg-white hover:border-[#B45309]/60 hover:bg-[#FAF6EE]"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="text-xs sm:text-[13px] font-bold text-[#4A3B33] truncate">
                                        {stk.title}
                                      </h4>
                                    </div>
                                    <p className="text-[11.5px] text-[#57534E] line-clamp-2 font-sans mb-1.5">
                                      {stk.description}
                                    </p>
                                    <div className="text-[10px] font-mono text-[#B45309] bg-[#FAF6EE] px-2 py-0.5 rounded border border-[#E4D9BC] inline-block">
                                      {stk.subtitle}
                                    </div>
                                  </div>
                                  <ArrowUpRight className="w-4 h-4 text-[#A8A29E] shrink-0 self-center" />
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  {/* 5. FAQS & KNOWLEDGE */}
                  {(activeCategory === "all" || activeCategory === "faq") &&
                    searchResults.faq.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between px-0.5">
                          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#78716C] flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-[#B45309]" />
                            Frequently Asked Questions ({searchResults.faq.length})
                          </span>
                          <a
                            href="#faq"
                            onClick={onClose}
                            className="text-[10px] font-mono text-[#B45309] hover:underline"
                          >
                            All FAQs →
                          </a>
                        </div>
                        <div className="space-y-1.5">
                          {searchResults.faq.map((fq) => {
                            const isSelected =
                              flatVisibleResults[selectedIndex]?.id === fq.id;

                            return (
                              <div
                                key={fq.id}
                                className={`p-2.5 sm:p-3 rounded-lg border transition-all ${
                                  isSelected
                                    ? "border-[#B45309] bg-[#F7F1E5] ring-1 ring-[#B45309]/30"
                                    : "border-[#E4D9BC]/80 bg-white hover:border-[#B45309]/60 hover:bg-[#FAF6EE]"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-xs sm:text-[12.5px] font-bold text-[#4A3B33] mb-1 font-serif">
                                      Q: {fq.title}
                                    </h4>
                                    <p className="text-[11.5px] text-[#57534E] leading-relaxed font-sans">
                                      {fq.subtitle}
                                    </p>
                                  </div>
                                  <a
                                    href={fq.href}
                                    onClick={onClose}
                                    className="text-[11px] font-mono text-[#B45309] hover:underline shrink-0 self-center"
                                  >
                                    View →
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  {/* 6. PAGES & DIRECT SHORTCUTS */}
                  {(activeCategory === "all" || activeCategory === "pages") &&
                    searchResults.pages.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between px-0.5">
                          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#78716C] flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-[#B45309]" />
                            Site Pages &amp; Direct Links ({searchResults.pages.length})
                          </span>
                        </div>
                        <div className="space-y-1">
                          {searchResults.pages.map((pg) => {
                            const Icon = pg.icon || FileText;
                            const isSelected =
                              flatVisibleResults[selectedIndex]?.id === pg.id;

                            return (
                              <a
                                key={pg.id}
                                href={pg.href}
                                target={pg.external ? "_blank" : undefined}
                                rel={pg.external ? "noopener noreferrer" : undefined}
                                onClick={onClose}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                                  isSelected
                                    ? "bg-[#F3ECE0] text-[#4A3B33] font-medium"
                                    : "text-[#57534E] hover:bg-[#F3ECE0]/70"
                                }`}
                              >
                                <Icon className="w-4 h-4 text-[#B45309] shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <div className="text-[12.5px] font-medium text-[#4A3B33] truncate">
                                    {pg.title}
                                  </div>
                                  <div className="text-[10.5px] text-[#78716C] truncate">
                                    {pg.subtitle}
                                  </div>
                                </div>
                                <ArrowUpRight className="w-3.5 h-3.5 text-[#A8A29E] shrink-0" />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  {/* EMPTY STATE */}
                  {totalCount === 0 && (
                    <div className="py-8 text-center space-y-3">
                      <div className="w-10 h-10 rounded-full bg-[#FAF6EE] border border-[#E4D9BC] mx-auto flex items-center justify-center text-[#B45309]">
                        <Search className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-semibold text-[#4A3B33]">
                        No direct matches found for &ldquo;{query}&rdquo;
                      </div>
                      <p className="text-[11.5px] text-[#78716C] max-w-[340px] mx-auto">
                        Don&apos;t worry! You can ask Aniket AI directly to synthesize an answer or jump to any section.
                      </p>
                      <button
                        type="button"
                        onClick={() => handleCustomAsk(query)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#B45309] text-white hover:bg-[#92400E] transition-all cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ask AI: &ldquo;{query}&rdquo;</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Keyboard Navigation Bar */}
                <div className="hidden sm:flex items-center justify-between border-t border-[#E4D9BC]/80 px-4 py-2 text-xs font-mono text-[#78716C] bg-[#F8F4EE] shrink-0">
                  <div className="flex items-center gap-3">
                    <span>↑ ↓ navigate</span>
                    <span>Enter select</span>
                    <span>Esc close</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Dynamic Auto-Indexer Active</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
