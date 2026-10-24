"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { sound } from "../utils/sound";
import { X, ArrowUpRight } from "lucide-react";

// ---- Live GitHub data (client-side; static export has no server) ----
// Contribution calendar via the public jogruber mirror of GitHub's calendar,
// profile stats via the GitHub REST API. Both unauthenticated; silent
// fallback to the curated static numbers below if the network fails.

const GH_USERS = { aniket0: "aniketmishra-0", mishra: "Mishra-Aniket" };
const MONTH_IDX = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

async function fetchCalendar(user, signal) {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, { signal });
  if (!res.ok) throw new Error(`calendar ${res.status}`);
  const json = await res.json();
  return json.contributions || [];
}

async function fetchProfile(user, signal) {
  const res = await fetch(`https://api.github.com/users/${user}`, { signal });
  if (!res.ok) throw new Error(`profile ${res.status}`);
  return res.json();
}

async function fetchLastPush(user, signal) {
  const res = await fetch(`https://api.github.com/users/${user}/events/public?per_page=30`, { signal });
  if (!res.ok) throw new Error(`events ${res.status}`);
  const events = await res.json();
  const push = (events || []).find((e) => e.type === "PushEvent");
  return push ? push.created_at : null;
}

function useLiveContributions() {
  const [live, setLive] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 9000);

    (async () => {
      try {
        const [cal0, calM, prof0, profM, lastPush] = await Promise.all([
          fetchCalendar(GH_USERS.aniket0, ctrl.signal).catch(() => []),
          fetchCalendar(GH_USERS.mishra, ctrl.signal).catch(() => []),
          fetchProfile(GH_USERS.aniket0, ctrl.signal).catch(() => null),
          fetchProfile(GH_USERS.mishra, ctrl.signal).catch(() => null),
          fetchLastPush(GH_USERS.aniket0, ctrl.signal).catch(() => null),
        ]);
        if (!cal0.length && !calM.length) return;

        const byDate0 = new Map(cal0.map((d) => [d.date, d.count]));
        const byDateM = new Map(calM.map((d) => [d.date, d.count]));

        const months = MONTHS.map((mo) => {
          const [mon, yy] = mo.label.split(" ");
          const start = Date.UTC(2000 + Number(yy), MONTH_IDX[mon], 1);
          let a = 0;
          let m = 0;
          for (let i = 0; i < mo.days; i++) {
            const key = new Date(start + i * 86400000).toISOString().slice(0, 10);
            a += byDate0.get(key) || 0;
            m += byDateM.get(key) || 0;
          }
          return { ...mo, aniket0: a, mishra: m, combined: a + m };
        });

        const totals = {
          aniket0: months.reduce((s, x) => s + x.aniket0, 0),
          mishra: months.reduce((s, x) => s + x.mishra, 0),
        };
        totals.combined = totals.aniket0 + totals.mishra;

        const repos = {
          aniket0: prof0?.public_repos ?? null,
          mishra: profM?.public_repos ?? null,
        };
        repos.combined = repos.aniket0 != null && repos.mishra != null ? repos.aniket0 + repos.mishra : null;

        setLive({ months, totals, repos, lastPushAt: lastPush, at: Date.now() });
      } catch {
        /* offline or API down — curated static data stays */
      } finally {
        clearTimeout(timer);
      }
    })();

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, []);

  return live;
}

// 12 Months of real GitHub contribution timeline with verified project releases & dates
const MONTHS = [
  {
    label: "Nov 25",
    month: "November 2025",
    dateRange: "Nov 1 – Nov 30, 2025",
    days: 30,
    aniket0: 5,
    mishra: 20,
    combined: 25,
    project: "ImgWorld.biz — Privacy Media Studio",
    category: "WebAssembly & Client-Side AI",
    body: "Engineered a zero-server client-side image processing suite running entirely on user hardware with WebAssembly, Canvas API, and on-device ONNX Web background removal models with zero telemetry.",
    repo: "aniketmishra-0/imgWorld.biz",
    repoUrl: "https://github.com/aniketmishra-0/imgWorld.biz",
    liveUrl: "https://www.imgworld.biz/",
    liveLabel: "Launch ImgWorld.biz",
    stack: ["React 19", "ONNX Web", "Canvas API", "Wasm"],
    milestone: "On-device AI background removal & zero-cloud egress media suite",
    deliverables: [
      "On-device ONNX Web background removal running 100% in-browser",
      "Native Canvas API & Web ImageDecoder batch image conversion pipeline",
      "Zero telemetry & zero egress cost privacy architecture"
    ]
  },
  {
    label: "Dec 25",
    month: "December 2025",
    dateRange: "Dec 1 – Dec 31, 2025",
    days: 31,
    aniket0: 65,
    mishra: 6,
    combined: 71,
    project: "RadialMenu — Windows App Launcher & HUD",
    category: "Desktop Systems & Windows API",
    body: "Modern circular power-user application launcher and fuzzy search HUD for Windows 10/11 built with C# and WPF. Brings macOS-style radial aesthetics with global hotkeys and instant keyboard navigation.",
    repo: "aniketmishra-0/RedialWin",
    repoUrl: "https://github.com/aniketmishra-0/RedialWin",
    liveUrl: "https://aniketmishra-0.github.io/RedialMenu-releases/",
    liveLabel: "Download Release (.exe)",
    stack: [".NET 8", "C#", "WPF", "Windows API"],
    milestone: "Sub-5ms global hotkey launcher & circular HUD for Windows 10/11",
    deliverables: [
      "Global hotkey hook with GPU-accelerated WPF circular interface",
      "Fuzzy search indexing across all installed Windows applications",
      "Official signed installer releases & low-RAM system tray integration"
    ]
  },
  {
    label: "Jan 26",
    month: "January 2026",
    dateRange: "Jan 1 – Jan 31, 2026",
    days: 31,
    aniket0: 138,
    mishra: 35,
    combined: 173,
    isPeakSprint: true,
    project: "Centrix — Autonomous Lecture Ingestion Pipeline",
    category: "Enterprise Operations & Cloud Sync",
    body: "Edge-first automated ingestion engine built for large coaching networks. Automatically pairs OBS/capture card recordings with MaxHub notes, matches timetables using confidence scoring, and uploads chunked files to Google Drive.",
    repo: "aniketmishra-0/Centrix",
    repoUrl: "https://github.com/aniketmishra-0/Centrix",
    liveUrl: "https://aniketmishra-0.github.io/Centrix_Demo/",
    liveLabel: "Launch Centrix Demo",
    stack: [".NET 8 (C#)", "SQLite WAL", "Google Drive API", "OBS Bridge"],
    milestone: "Edge-first pipeline built for heavy daily lecture volume",
    deliverables: [
      "Automated timetable matching with multi-factor confidence scoring",
      "Resumable chunked upload engine directly to Google Drive (zero egress cost)",
      "Crash-resilient SQLite WAL telemetry & center-wide hardware sync"
    ]
  },
  {
    label: "Feb 26",
    month: "February 2026",
    dateRange: "Feb 1 – Feb 28, 2026",
    days: 28,
    aniket0: 30,
    mishra: 0,
    combined: 30,
    project: "GPS Cam (GPSnap) — Geotagged Media Stamper",
    category: "Native Android & Geocoding",
    body: "Native Android application built with Kotlin and Jetpack Compose for field operations and academic audits. Captures high-res photos and videos with real-time dynamic overlays of GPS coordinates, elevation, and timestamp.",
    repo: "aniketmishra-0",
    repoUrl: "https://github.com/aniketmishra-0",
    liveUrl: null,
    liveLabel: null,
    stack: ["Kotlin", "Jetpack Compose", "CameraX", "Location Services"],
    milestone: "Sub-100ms real-time GPS coordinate & video watermarking engine",
    deliverables: [
      "Dynamic canvas coordinate, elevation, and timestamp stamping on photo/video",
      "CameraX pipeline optimized for low-end field audit smartphones",
      "Direct background upload pipeline to central Google Drive audit folders"
    ]
  },
  {
    label: "Mar 26",
    month: "March 2026",
    dateRange: "Mar 1 – Mar 31, 2026",
    days: 31,
    aniket0: 44,
    mishra: 0,
    combined: 44,
    project: "Nexus Streamer — Drive to YouTube Ingestion Matrix",
    category: "Cloud Media & Stream Pipelines",
    body: "Autonomous cloud pipeline bridging Google Drive and YouTube. Streams multi-gigabyte video files directly to YouTube as Unlisted assets with chunk-by-chunk Node.js stream transforms and live SSE progress without filling server RAM.",
    repo: "aniketmishra-0",
    repoUrl: "https://github.com/aniketmishra-0",
    liveUrl: "https://pwvp-drive2youtube.hf.space/",
    liveLabel: "Launch Streamer (HuggingFace)",
    stack: ["Node.js", "Express", "YouTube API v3", "SSE", "Docker"],
    milestone: "Zero-RAM cloud-to-cloud stream pipeline with real-time SSE",
    deliverables: [
      "Chunk-by-chunk stream transforms bypassing local server disk and RAM",
      "Real-time Server-Sent Events (SSE) live progress broadcasting",
      "Automated video provisioning with unlisted privacy safeguards"
    ]
  },
  {
    label: "Apr 26",
    month: "April 2026",
    dateRange: "Apr 1 – Apr 30, 2026",
    days: 30,
    aniket0: 20,
    mishra: 2,
    combined: 22,
    project: "Office Mobile — Google Sheet to Mobile Interface",
    category: "Cloud Productivity & Instant PWA",
    body: "Transforms any Google Spreadsheet into an intuitive, mobile-first data entry and viewing PWA. Authenticates via Google OAuth 2.0, parses column schemas, and generates instant entry forms without requiring code or third-party database setups.",
    repo: "aniketmishra-0",
    repoUrl: "https://github.com/aniketmishra-0",
    liveUrl: "https://officemobile.vercel.app/",
    liveLabel: "Launch officemobile.vercel.app",
    stack: ["Next.js 15", "Google Sheets API", "OAuth 2.0", "Tailwind CSS"],
    milestone: "Instant dynamic forms & real-time bidirectional spreadsheet sync",
    deliverables: [
      "Automatic column schema detection & instantaneous mobile form builder",
      "Bi-directional real-time row reading/writing via Google OAuth 2.0",
      "Zero-latency PWA interface designed for on-the-go data collection"
    ]
  },
  {
    label: "May 26",
    month: "May 2026",
    dateRange: "May 1 – May 31, 2026",
    days: 31,
    aniket0: 173,
    mishra: 0,
    combined: 173,
    isPeakSprint: true,
    project: "Qpic — Smart Exam Paper Splitter & OCR Studio",
    category: "AI & Document Intelligence",
    body: "FastAPI and Flutter desktop app that parses complex MCQ exam PDFs, detects questions via a 3-tier pipeline (native text layer → Tesseract OCR → Claude vision fallback), crops/stitches multi-page questions, and exports answer keys to CSV/JSON.",
    repo: "aniketmishra-0/Qpic",
    repoUrl: "https://github.com/aniketmishra-0/Qpic",
    liveUrl: null,
    liveLabel: null,
    stack: ["FastAPI (Python)", "Flutter Desktop", "OpenCV", "Tesseract", "Claude Vision"],
    milestone: "All-Time Velocity Record: 173 commits · 14-stage document processor",
    deliverables: [
      "14-stage document processing pipeline with deskew, denoise, and auto-binarization",
      "Bilingual side-by-side Hindi & English column detection and auto-stitching",
      "Automated answer key table parsing with JSON/CSV schema export"
    ]
  },
  {
    label: "Jun 26",
    month: "June 2026",
    dateRange: "Jun 1 – Jun 30, 2026",
    days: 30,
    aniket0: 114,
    mishra: 1,
    combined: 115,
    project: "OmTabs — Chrome Tab Management & Privacy Shield",
    category: "Chrome Extension & Web Security",
    body: "Chrome extension that enables power users to rename open browser tabs with custom titles, protect sensitive tabs with biometric/passcode shields, and organize work sessions with zero browser memory overhead.",
    repo: "aniketmishra-0",
    repoUrl: "https://github.com/aniketmishra-0",
    liveUrl: "https://chromewebstore.google.com/detail/omtabs/innncdapnjlnjdgkdjjajbiebeppieaf",
    liveLabel: "Add to Chrome (Web Store)",
    stack: ["Chrome MV3", "WebAuthn / Biometrics", "Chrome Storage", "JavaScript"],
    milestone: "Official Chrome Web Store launch with biometric security lock",
    deliverables: [
      "Instant tab title customization with keyboard shortcuts (Alt+Shift+R)",
      "Biometric & passcode shield lock to protect confidential browser tabs",
      "Zero-latency persistent session storage with zero background battery drain"
    ]
  },
  {
    label: "Jul 26",
    month: "July 2026",
    dateRange: "Jul 1 – Jul 31, 2026",
    days: 31,
    aniket0: 0,
    mishra: 0,
    combined: 0,
    project: "Centrix Hardening & Load Testing",
    category: "Enterprise Operations & Scale",
    body: "Load testing and hardening of the ingestion engine — simulated multi-center upload bursts, failure-recovery drills, and timetable-sync edge cases across the pipeline.",
    repo: "aniketmishra-0/Centrix",
    repoUrl: "https://github.com/aniketmishra-0/Centrix",
    liveUrl: "https://aniketmishra-0.github.io/Centrix_Demo/",
    liveLabel: "Launch Centrix Demo",
    stack: ["Production Ops", "Load Testing", "System Architecture", "Security Audits"],
    milestone: "Failure-recovery drills & simulated scale testing",
    deliverables: [
      "Simulated multi-center edge deployments in test environments",
      "Load and stress testing of chunked uploads under burst traffic",
      "Operational playbook verification and automated failure recovery runs"
    ]
  },
  {
    label: "Aug 26",
    month: "August 2026",
    dateRange: "Aug 1 – Aug 31, 2026",
    days: 31,
    aniket0: 2,
    mishra: 1,
    combined: 3,
    project: "OmSpace — New Tab Dashboard & Focus Studio",
    category: "Chrome Extension & Productivity",
    body: "Customizable new tab dashboard with browser-default search, focus tools, widgets, and quick-access surfaces for power users who want an organized, distraction-free browser workspace every time a new tab is opened.",
    repo: "aniketmishra-0",
    repoUrl: "https://github.com/aniketmishra-0",
    liveUrl: "https://chromewebstore.google.com/detail/omspace-new-tab-dashboard/hofalojlkckeopheldapdcickcmeihmd?utm_source=ext_app_menu",
    liveLabel: "Add to Chrome (Web Store)",
    stack: ["Chrome MV3", "React", "Chrome Storage", "Tailwind CSS"],
    milestone: "Official Chrome Web Store release of modern focus dashboard",
    deliverables: [
      "Customizable new tab dashboard with built-in search and quick access pins",
      "Integrated focus mode widgets and distraction-free workspace layouts",
      "Ultra-lightweight memory footprint with zero browser lag"
    ]
  },
  {
    label: "Sep 26",
    month: "September 2026",
    dateRange: "Sep 1 – Sep 30, 2026",
    days: 30,
    aniket0: 9,
    mishra: 5,
    combined: 14,
    project: "Context Sovereignty & Multi-Agent Architecture",
    category: "AI Architecture & System Design",
    body: "Modular specification contracts and architectural abstraction layer decoupling foundation AI models from autonomous agent workflows with sub-100ms contract evaluation.",
    repo: "Mishra-Aniket",
    repoUrl: "https://github.com/Mishra-Aniket",
    liveUrl: null,
    liveLabel: null,
    stack: ["TypeScript", "FastAPI", "PostgreSQL", "Next.js 15"],
    milestone: "Hot-swappable AI context routing & modular specification engine",
    deliverables: [
      "Pluggable AI architecture layer decoupling models from agent execution",
      "Fast API contracts for database schemas and state synchronization",
      "Telemetry assessment matrices with sub-100ms latency validation"
    ]
  },
  {
    label: "Oct 26",
    month: "October 2026",
    dateRange: "Oct 1 – Oct 31, 2026",
    days: 31,
    aniket0: 1,
    mishra: 28,
    combined: 29,
    project: "Interactive Portfolio Website",
    category: "High-Performance Web & 3D Visualizers",
    body: "Engineered an interactive 3D glassmorphic portfolio featuring custom SVG isometric hardware architectures, time-scrubbed contribution terrain, and real-time model spec evaluators.",
    repo: "aniket-one",
    repoUrl: "https://github.com/Mishra-Aniket/aniket-one",
    liveUrl: "https://aniket.one/",
    liveLabel: "View Live Portfolio",
    stack: ["Next.js 15", "React 19", "Framer Motion", "Tailwind CSS", "SVG 3D"],
    milestone: "Interactive 3D glassmorphic hardware stack & live contribution terrain",
    deliverables: [
      "5-tier 3D glassmorphic stack diagram with interactive hardware popout cards",
      "3-phase Engineering Protocol with real-time model spec hot-swapping",
      "GitHub Velocity Terrain with time-scrubbing and project milestone telemetry"
    ]
  }
];

const SERIES = [
  {
    key: "combined",
    label: "Combined Velocity",
    badge: "All Commits",
    color: "#B45309",
    v: 0, // Frontmost 3D ribbon
    width: 3.4,
    total: 699,
    repos: 64,
    peak: "173 / mo",
    peakMonth: "May 2026",
    tag: "Unified Metrics",
    points: MONTHS.map((m) => m.combined),
    url: "https://github.com/aniketmishra-0"
  },
  {
    key: "aniket0",
    label: "aniketmishra-0",
    badge: "Primary / Systems",
    color: "#059669",
    v: 70, // Middle 3D ribbon
    width: 2.5,
    total: 601,
    repos: 35,
    peak: "173 / mo",
    peakMonth: "May 2026",
    tag: "Production Systems",
    points: MONTHS.map((m) => m.aniket0),
    url: "https://github.com/aniketmishra-0"
  },
  {
    key: "mishra",
    label: "Mishra-Aniket",
    badge: "OSS / R&D",
    color: "#6366F1",
    v: 140, // Backmost 3D ribbon
    width: 2.2,
    total: 98,
    repos: 29,
    peak: "35 / mo",
    peakMonth: "Jan 2026",
    tag: "OSS Architecture",
    points: MONTHS.map((m) => m.mishra),
    url: "https://github.com/Mishra-Aniket"
  }
];

// Isometric matrix transformation constants
const IA = 0.9;
const IB = 0.32;
const u = (e, t, n = 0) => ({
  x: 220 + IA * (e - t),
  y: 354 + IB * (e + t) - n
});

const m = (pts) => pts.map((p) => `${p.x},${p.y}`).join(" ");

const p = (idx) => (idx / (MONTHS.length - 1)) * 520;

function interpolateSeries(points, n) {
  const step = 520 / (points.length - 1);
  const idx = Math.min(Math.floor(n / step), points.length - 2);
  const frac = (n - idx * step) / step;
  return points[idx] + (points[idx + 1] - points[idx]) * frac;
}

const Y_TICKS = [0, 50, 100, 150, 200];

export default function AccuracyTerrain() {
  const svgRef = useRef(null);
  const live = useLiveContributions();

  // Live months/series when GitHub data arrived; curated static otherwise
  const months = live ? live.months : MONTHS;
  const series = useMemo(
    () =>
      SERIES.map((s) =>
        live
          ? {
              ...s,
              points: live.months.map((mo) => mo[s.key]),
              total: live.totals[s.key] ?? s.total,
              repos: live.repos[s.key] ?? s.repos,
            }
          : s
      ),
    [live]
  );
  const totals = live ? live.totals : { combined: 699, aniket0: 601, mishra: 98 };
  const repos = live && live.repos.combined != null ? live.repos : { combined: 64, aniket0: 35, mishra: 29 };
  const peakMonth = useMemo(() => months.reduce((best, mo) => (mo.combined > best.combined ? mo : best), months[0]), [months]);

  // Relative time for the last-push activity chip
  const lastPushLabel = useMemo(() => {
    if (!live?.lastPushAt) return null;
    const mins = Math.max(0, Math.round((live.at - new Date(live.lastPushAt).getTime()) / 60000));
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.round(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.round(hrs / 24)}d ago`;
  }, [live]);

  // Default resting scrub position: peak sprint month
  const defaultParked = (6 / (MONTHS.length - 1)) * 520;
  const [parked, setParked] = useState(defaultParked);
  const [scrub, setScrub] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [hoveredSeries, setHoveredSeries] = useState(null);
  const [filterAccount, setFilterAccount] = useState("all"); // "all", "aniket0", "mishra"
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const isHoveringCardRef = useRef(false);
  const cardTimeoutRef = useRef(null);

  const handleCardMouseEnter = () => {
    if (cardTimeoutRef.current) {
      clearTimeout(cardTimeoutRef.current);
      cardTimeoutRef.current = null;
    }
    isHoveringCardRef.current = true;
    setIsCardVisible(true);
  };

  const handleCardMouseLeave = () => {
    isHoveringCardRef.current = false;
    if (cardTimeoutRef.current) clearTimeout(cardTimeoutRef.current);
    if (!isPinned) {
      cardTimeoutRef.current = setTimeout(() => {
        if (!isHoveringCardRef.current) {
          setIsCardVisible(false);
        }
      }, 250);
    }
  };

  // Active series index for isolation
  const activeIdx = hoveredSeries !== null ? hoveredSeries : selectedSeries;

  // Current position N along isometric axis (0 to 520)
  const N = scrub !== null ? scrub : parked;
  const monthFloat = (N / 520) * (MONTHS.length - 1);
  const nearestMonthIdx = Math.round(monthFloat);
  const clampedMonthIdx = Math.max(0, Math.min(months.length - 1, nearestMonthIdx));
  const currentMonthData = months[clampedMonthIdx];

  // Live interpolated values
  const interpolatedValues = useMemo(() => {
    return series.map((s) => interpolateSeries(s.points, N));
  }, [N, series]);

  // Pointer move handler using SVG CTM inverse projection
  const handlePointerMove = (e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;

    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());

    // Bounds of the isometric chart area in SVG space
    if (pt.x > 745 || pt.y < 120 || pt.y > 620) {
      if (scrub !== null) setScrub(null);
      return;
    }

    if (cardTimeoutRef.current) {
      clearTimeout(cardTimeoutRef.current);
      cardTimeoutRef.current = null;
    }
    setIsCardVisible(true);

    const s = Math.max(0, Math.min(520, (pt.x - 220) / IA + 70));
    setScrub(s);
  };

  const handlePointerLeave = () => {
    setScrub(null);
    if (!isPinned) {
      if (cardTimeoutRef.current) clearTimeout(cardTimeoutRef.current);
      cardTimeoutRef.current = setTimeout(() => {
        if (!isHoveringCardRef.current) {
          setIsCardVisible(false);
        }
      }, 300);
    }
  };

  return (
    <div id="accuracy-terrain" className="relative w-full select-none">
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] pb-20 md:pb-28">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E4D9BC] bg-white text-[#B45309] font-mono text-[11px] font-bold tracking-wider uppercase mb-3 shadow-2xs">
            <span className={`w-2 h-2 rounded-full ${live ? "bg-emerald-600" : "bg-[#B45309]"} animate-pulse`} />
            <span>{live ? "Live GitHub Contribution Terrain · Real-Time Sync" : "Real GitHub Contribution Terrain · 2 Active Profiles"}</span>
            {lastPushLabel && (
              <span className="ml-1 pl-2 border-l border-[#E4D9BC] text-emerald-700 normal-case tracking-normal">
                last push {lastPushLabel}
              </span>
            )}
          </div>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight font-serif font-bold text-[#4A3B33] text-balance">
            Two GitHub profiles.{" "}
            <span className="text-[#B45309] italic font-normal">One public build log.</span>
          </h2>
          <p className="mt-2 text-sm text-[#78716C] max-w-2xl mx-auto font-sans">
            Live 3D telemetry visualized across both GitHub accounts:{" "}
            <a
              href="https://github.com/aniketmishra-0"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-semibold text-[#059669] hover:underline"
            >
              @aniketmishra-0
            </a>{" "}
            (Production Systems) and{" "}
            <a
              href="https://github.com/Mishra-Aniket"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-semibold text-[#6366F1] hover:underline"
            >
              @Mishra-Aniket
            </a>{" "}
            (OSS &amp; Core).
          </p>

          {/* Quick Profile Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <button
              onClick={() => {
                sound.playClick();
                setFilterAccount("all");
                setSelectedSeries(null);
                setHoveredSeries(null);
              }}
              className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                filterAccount === "all"
                  ? "bg-[#B45309] text-white shadow-xs"
                  : "bg-white text-[#78716C] border border-[#E4D9BC] hover:text-[#4A3B33]"
              }`}
            >
              All Activity
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilterAccount(filterAccount === "aniket0" ? "all" : "aniket0");
              }}
              className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                filterAccount === "aniket0"
                  ? "bg-[#059669] text-white shadow-xs"
                  : "bg-white text-[#78716C] border border-[#E4D9BC] hover:text-[#059669]"
              }`}
            >
              @aniketmishra-0 · Production
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilterAccount(filterAccount === "mishra" ? "all" : "mishra");
              }}
              className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                filterAccount === "mishra"
                  ? "bg-[#6366F1] text-white shadow-xs"
                  : "bg-white text-[#78716C] border border-[#E4D9BC] hover:text-[#6366F1]"
              }`}
            >
              @Mishra-Aniket · OSS &amp; Core
            </button>
          </div>
        </div>

        {/* 3D Terrain Container */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[240/171] select-none">
          <svg
            ref={svgRef}
            viewBox="0 0 960 684"
            className="w-full h-full block overflow-visible"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Isometric 3D chart of real GitHub contributions across two accounts."
            onPointerMove={handlePointerMove}
            onMouseMove={handlePointerMove}
            onTouchMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onMouseLeave={handlePointerLeave}
            style={{ cursor: scrub !== null ? "ew-resize" : "crosshair", touchAction: "none" }}
          >
            <defs>
              <linearGradient id="bmGlassTop" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#FDFBF7" stopOpacity="0.92" />
                <stop offset="100%" stopColor="#F5EFE3" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="bmSideBevel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E6DCBF" />
                <stop offset="100%" stopColor="#CFBFA0" />
              </linearGradient>
              <radialGradient id="bmFloorGlow">
                <stop offset="0%" stopColor="#B45309" stopOpacity="0.18" />
                <stop offset="65%" stopColor="#B45309" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
              </radialGradient>
              <filter id="bmBlur" x="-30%" y="-60%" width="160%" height="220%">
                <feGaussianBlur stdDeviation="9" />
              </filter>
              <linearGradient id="bmTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FBF6EE" />
              </linearGradient>
              <filter id="bmGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {series.map((s) => (
                <linearGradient key={s.key} id={`bmWall-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.color} stopOpacity={s.key === "combined" ? 0.36 : 0.28} />
                  <stop offset="100%" stopColor={s.color} stopOpacity="0.04" />
                </linearGradient>
              ))}
            </defs>

            {/* Top-Right HUD Header */}
            <g pointerEvents="none">
              <rect x="744" y="28" width="7" height="7" fill="#B45309" />
              <text x="757" y="35" fill="#78716C" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6" fontWeight="600">
                GITHUB // VELOCITY_TERRAIN
              </text>
              
              {/* Prominent Date Range */}
              <text x="744" y="52" fill="#B45309" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1" fontWeight="700">
                {currentMonthData.dateRange.toUpperCase()}
              </text>
              <text x="936" y="52" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1" fontWeight="700">
                VERIFIED
              </text>
              <circle cx="882" cy="49.5" r="2.4" fill="#059669" opacity="0.95" />

              {/* Progress Checkpoint Segments along months */}
              {MONTHS.map((mObj, idx) => {
                const fill = p(idx) <= N + 0.5 ? "#B45309" : "#E4D9BC";
                return (
                  <rect
                    key={mObj.label}
                    x={744 + idx * 16}
                    y="63"
                    width="13"
                    height="3"
                    rx="1.5"
                    style={{ fill, transition: "fill 0.25s" }}
                  />
                );
              })}

              <text x="744" y="81" fontSize="7.2" fontFamily="JetBrains Mono, monospace" letterSpacing="1.2" fontWeight="600" style={{ fill: "#B45309" }}>
                {`PROJECT: ${currentMonthData.project.toUpperCase()}`}
              </text>
            </g>

            {/* Top-Left series hint */}
            <g pointerEvents="none" opacity={isCardVisible ? 0 : 1} style={{ transition: "opacity 0.25s" }}>
              <rect x="24" y="32" width="7" height="7" fill="none" stroke="#E4C090" strokeWidth="1" />
              <text x="38" y="39" fill="#A8A29E" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6" fontWeight="600">
                HOVER THE TERRAIN TO SCRUB TIMELINE
              </text>
            </g>

            {/* 3D Back Walls & Y-Grid (Contributions Count: 0 to 200) */}
            <g pointerEvents="none">
              <polygon
                points={m([u(-24, -24), u(544, -24), u(544, -24, 180), u(-24, -24, 180)])}
                fill="#FFFFFF"
                fillOpacity="0.6"
                stroke="#E4D9BC"
                strokeWidth="1"
              />
              <polygon
                points={m([u(-24, -24), u(-24, 164), u(-24, 164, 180), u(-24, -24, 180)])}
                fill="#FBF6EE"
                fillOpacity="0.7"
                stroke="#E4D9BC"
                strokeWidth="1"
              />

              {/* Grid Lines */}
              {Y_TICKS.slice(1).map((val) => {
                const n = (val / 200) * 180;
                return (
                  <g key={val} stroke="#E4D9BC" strokeWidth="1" strokeDasharray="3 4">
                    <line x1={u(-24, -24, n).x} y1={u(-24, -24, n).y} x2={u(544, -24, n).x} y2={u(544, -24, n).y} />
                    <line x1={u(-24, -24, n).x} y1={u(-24, -24, n).y} x2={u(-24, 164, n).x} y2={u(-24, 164, n).y} />
                  </g>
                );
              })}

              {/* Y-axis Labels */}
              {Y_TICKS.map((val) => {
                const pt = u(-24, 164, (val / 200) * 180);
                return (
                  <text key={val} x={pt.x - 7} y={pt.y + 3} textAnchor="end" fill="#78716C" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="500">
                    {val}
                  </text>
                );
              })}

              {(() => {
                const pt = u(-24, 164, 90);
                return (
                  <text x={pt.x - 38} y={pt.y} textAnchor="middle" fill="#57534E" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2" fontWeight="600" transform={`rotate(-90 ${pt.x - 38} ${pt.y})`}>
                    COMMITS / MO
                  </text>
                );
              })()}
            </g>

            {/* 3D Isometric Ground Plane & Monthly Timeline Grid */}
            <g pointerEvents="none">
              <ellipse cx="480" cy="530" rx="360" ry="70" fill="url(#bmFloorGlow)" filter="url(#bmBlur)" opacity="0.65" />
              <polygon
                points={`${u(-24, 164).x},${u(-24, 164).y} ${u(544, 164).x},${u(544, 164).y} ${u(544, 164).x},${u(544, 164).y + 10} ${u(-24, 164).x},${u(-24, 164).y + 10}`}
                fill="url(#bmSideBevel)"
              />
              <polygon
                points={`${u(544, -24).x},${u(544, -24).y} ${u(544, 164).x},${u(544, 164).y} ${u(544, 164).x},${u(544, 164).y + 10} ${u(544, -24).x},${u(544, -24).y + 10}`}
                fill="#E4C090"
              />
              <polygon
                points={m([u(-24, -24), u(544, -24), u(544, 164), u(-24, 164)])}
                fill="url(#bmGlassTop)"
                stroke="#E4D9BC"
                strokeWidth="1"
              />

              {/* Monthly grid lines on ground */}
              {MONTHS.map((mObj, idx) => {
                const n = p(idx);
                return (
                  <line
                    key={mObj.label}
                    x1={u(n, -24).x}
                    y1={u(n, -24).y}
                    x2={u(n, 164).x}
                    y2={u(n, 164).y}
                    stroke="#EFE6D6"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                  />
                );
              })}

              {/* Series baseline tracks */}
              {series.map((s) => (
                <line
                  key={s.key}
                  x1={u(-24, s.v).x}
                  y1={u(-24, s.v).y}
                  x2={u(544, s.v).x}
                  y2={u(544, s.v).y}
                  stroke="#EFE6D6"
                  strokeWidth="1"
                />
              ))}

              {/* Monthly labels along bottom edge */}
              {MONTHS.map((mObj, idx) => {
                const pt = u(p(idx), 164);
                const isSelected = idx === clampedMonthIdx;
                return (
                  <g key={mObj.label}>
                    {isSelected && (
                      <circle cx={pt.x - 6} cy={pt.y + 18} r="11" fill="#FEF3C7" stroke="#B45309" strokeWidth="1" />
                    )}
                    <text
                      x={pt.x - 6}
                      y={pt.y + 22}
                      textAnchor="middle"
                      fill={isSelected ? "#B45309" : "#78716C"}
                      fontSize={isSelected ? "8" : "7.5"}
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight={isSelected ? "700" : "500"}
                    >
                      {mObj.label}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* 3D Contribution Ribbons & Extrusion Walls */}
            {series.map((s, sIdx) => {
              const isDimmed =
                (activeIdx !== null && activeIdx !== sIdx) ||
                (filterAccount !== "all" && filterAccount !== s.key && s.key !== "combined");

              // Upper polygon points (3D wave)
              const topPts = s.points.map((val, idx) => u(p(idx), s.v, (val / 200) * 180));
              // Ground baseline points
              const basePts = s.points.map((_, idx) => u(p(idx), s.v, 0));
              const wallPoly = [...topPts, ...[...basePts].reverse()];

              return (
                <g
                  key={s.key}
                  opacity={isDimmed ? 0.18 : 1}
                  style={{ transition: "opacity 0.3s ease-out" }}
                  onClick={() => {
                    sound.playClick();
                    setSelectedSeries(selectedSeries === sIdx ? null : sIdx);
                  }}
                  className="cursor-pointer"
                >
                  {/* Extrusion Wall below line */}
                  <polygon points={m(wallPoly)} fill={`url(#bmWall-${s.key})`} stroke="none" />

                  {/* Top Polyline (The 3D Line Path) */}
                  <polyline
                    points={m(topPts)}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={s.width}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Monthly Data Nodes */}
                  {topPts.map((pt, idx) => {
                    const val = s.points[idx];
                    if (val === 0) return null;
                    const isHoveredCol = idx === clampedMonthIdx;
                    return (
                      <g key={idx}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isHoveredCol ? 4.5 : 2.5}
                          fill={s.color}
                          stroke="#FFFFFF"
                          strokeWidth={isHoveredCol ? 2 : 1}
                        />
                      </g>
                    );
                  })}
                </g>
              );
            })}

            {/* Interactive Timeline Scrubbing Slice Plane */}
            <g pointerEvents="none">
              {/* Vertical plane at current scrub position N */}
              <polygon
                points={m([u(N, -24, 0), u(N, 164, 0), u(N, 164, 185), u(N, -24, 185)])}
                fill="#B45309"
                fillOpacity="0.04"
                stroke="#B45309"
                strokeWidth="1"
                strokeDasharray="2 3"
              />

              {/* Floor Guideline at N */}
              <line
                x1={u(N, -24).x}
                y1={u(N, -24).y}
                x2={u(N, 164).x}
                y2={u(N, 164).y}
                stroke="#B45309"
                strokeWidth="1.4"
              />

              {/* Tag at top of slice plane showing Month */}
              {(() => {
                const pt = u(N, -24, 192);
                return (
                  <g pointerEvents="none">
                    <rect
                      x={pt.x - 26}
                      y={pt.y - 11}
                      width="52"
                      height="16"
                      rx="3"
                      fill="#FFFFFF"
                      stroke="#B45309"
                      strokeWidth="1"
                      filter="url(#bmGlow)"
                    />
                    <text
                      x={pt.x}
                      y={pt.y + 1}
                      textAnchor="middle"
                      fill="#B45309"
                      fontSize="8"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="700"
                      letterSpacing="0.6"
                    >
                      {currentMonthData.label}
                    </text>
                  </g>
                );
              })()}

              {/* 3 Live Indicator Dots on the curves */}
              {series.map((s, sIdx) => {
                const val = interpolatedValues[sIdx];
                const pt = u(N, s.v, (val / 200) * 180);
                const isDimmed =
                  (activeIdx !== null && activeIdx !== sIdx) ||
                  (filterAccount !== "all" && filterAccount !== s.key && s.key !== "combined");
                return (
                  <g key={s.key} opacity={isDimmed ? 0.15 : 1} style={{ transition: "opacity 0.3s" }}>
                    <circle cx={pt.x} cy={pt.y} r="4.8" fill={s.color} stroke="#FFFFFF" strokeWidth="1.5" filter="url(#bmGlow)" />
                    <text
                      x={pt.x + 9}
                      y={pt.y - 6}
                      fill={s.color}
                      fontSize="8.5"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="700"
                      stroke="#FDFBF7"
                      strokeWidth="3"
                      paintOrder="stroke"
                    >
                      {Math.round(val)} commits
                    </text>
                  </g>
                );
              })}
            </g>

            {/* LIVE READOUT SIDEBAR ON RIGHT */}
            <g>
              <text x="744" y="108" fill="#A8A29E" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.8" fontWeight="600">
                LIVE VELOCITY // {currentMonthData.month.toUpperCase()}
              </text>
              <text x="936" y="108" textAnchor="end" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1" fontWeight="700">
                {Math.round(interpolatedValues[0])} TOTAL
              </text>

              {/* Series Rows */}
              {series.map((s, sIdx) => {
                const yPos = 132 + 46 * sIdx;
                const isDimmed =
                  (activeIdx !== null && activeIdx !== sIdx) ||
                  (filterAccount !== "all" && filterAccount !== s.key && s.key !== "combined");
                const isSelected = activeIdx === sIdx;
                const currentVal = Math.round(interpolatedValues[sIdx]);

                return (
                  <g
                    key={s.key}
                    onMouseEnter={() => setHoveredSeries(sIdx)}
                    onMouseLeave={() => setHoveredSeries(null)}
                    onClick={() => {
                      sound.playClick();
                      setSelectedSeries(selectedSeries === sIdx ? null : sIdx);
                    }}
                    opacity={isDimmed ? 0.35 : 1}
                    style={{ cursor: "pointer", outline: "none", transition: "opacity 0.3s" }}
                    role="button"
                    tabIndex={0}
                  >
                    <rect
                      x="736"
                      y={yPos - 14}
                      width="208"
                      height="40"
                      rx="6"
                      fill={isSelected ? "#FFFBF5" : "transparent"}
                      stroke={isSelected ? "#E4C090" : "transparent"}
                    />
                    <line x1="744" y1={yPos - 4} x2="756" y2={yPos - 4} stroke={s.color} strokeWidth={s.width} strokeLinecap="round" />
                    <text x="764" y={yPos} fill="#4A3B33" fontSize="10.5" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight={sIdx === 0 ? 700 : 600}>
                      {s.label}
                    </text>
                    <text x="936" y={yPos} textAnchor="end" fill={s.color} fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                      {currentVal}
                    </text>

                    {/* Progress Bar for the month */}
                    <rect x="744" y={yPos + 8} width="192" height="2.5" rx="1.5" fill="#F1E9DA" />
                    <rect x="744" y={yPos + 8} width={Math.max(0, Math.min(192, (currentVal / 180) * 192))} height="2.5" rx="1.5" fill={s.color} />
                  </g>
                );
              })}

              {/* Lifetime output summary */}
              <g pointerEvents="none">
                <line x1="744" y1="288" x2="936" y2="288" stroke="#F1E9DA" strokeWidth="1" />

                <text x="744" y="318" fill="#A8A29E" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4" fontWeight="600">
                  LIVE GITHUB TELEMETRY
                </text>
                <text x="744" y="344" fill="#B45309" fontSize="20" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                  Two Profiles
                </text>
                <text x="744" y="362" fill="#059669" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                  12-Month Rolling Window · Both Accounts
                </text>

                <text x="744" y="380" fill="#78716C" fontSize="7.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4">
                  {live ? "Verified live at view time" : "Verified contribution timeline"}
                </text>
              </g>
            </g>

            {/* Bottom Telemetry Strip */}
            <g pointerEvents="none">
              <line x1="16" y1="646" x2="936" y2="646" stroke="#E4D9BC" strokeWidth="1" />
              <text x="16" y="666" fill="#A8A29E" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4">
                github_velocity_terrain.live · 2 profiles (@aniketmishra-0 &amp; @Mishra-Aniket) · verified data
              </text>
              <text x="936" y="666" textAnchor="end" fill="#B45309" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4" fontWeight="600">
                MOVE POINTER ACROSS TERRAIN TO SCRUB TIMELINE
              </text>
            </g>
          </svg>

          {/* INSPECTOR CARD (Styled horizontally like 2nd image benchmark) */}
          {isCardVisible && (
            <div
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              className="absolute top-2 left-2 right-2 sm:right-auto sm:top-3 sm:left-3 z-30 max-w-[450px] sm:w-[430px] pointer-events-auto transition-all duration-200 animate-in fade-in"
              role="dialog"
              aria-label={`${currentMonthData.project} project details`}
            >
              <div className="relative overflow-hidden rounded-[8px] border border-[#D4C3A3] bg-[#FAF8F5]/98 backdrop-blur-md shadow-sm p-3 sm:p-3.5">
                {/* Accent line on left edge */}
                <div className="absolute inset-y-0 left-0 w-[3px] bg-[#B45309]" />

                <div className="grid grid-cols-12 gap-3 pl-1.5 items-start">
                  {/* Left Column (7 cols): Eyebrow, Title, Body, Action link */}
                  <div className="col-span-7 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.14em] text-[#B45309]">
                        TIMELINE · {currentMonthData.label.toUpperCase()} · VERIFIED
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-[13px] leading-tight text-[#4A3B33] line-clamp-1">
                      {currentMonthData.project}
                    </h4>

                    <p className="text-[10px] leading-[1.45] text-[#78716C] line-clamp-2">
                      {currentMonthData.body}
                    </p>

                    <div className="pt-1 flex items-center gap-2">
                      {currentMonthData.liveUrl ? (
                        <a
                          href={currentMonthData.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.playClick()}
                          className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-[#B45309] hover:underline"
                        >
                          <span>{currentMonthData.liveLabel || "Launch Live Project"}</span>
                          <ArrowUpRight className="w-2.5 h-2.5" />
                        </a>
                      ) : currentMonthData.repoUrl ? (
                        <a
                          href={currentMonthData.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.playClick()}
                          className="inline-flex items-center gap-1 font-mono text-[9px] font-semibold text-[#78716C] hover:text-[#4A3B33] hover:underline"
                        >
                          <span>View Code Repository</span>
                          <ArrowUpRight className="w-2.5 h-2.5" />
                        </a>
                      ) : null}
                    </div>
                  </div>

                  {/* Right Column (5 cols): Table + Snippet Pill (Identical to 2nd image) */}
                  <div className="col-span-5 border-l border-[#EFE6D6] pl-2.5 flex flex-col justify-between h-full space-y-2">
                    <div className="flex items-start justify-between">
                      <dl className="w-full space-y-1 font-mono text-[9px]">
                        <div className="flex justify-between items-center text-[#78716C]">
                          <dt className="uppercase tracking-wider text-[7.5px] text-[#A8A29E]">Output</dt>
                          <dd className="font-bold text-[#B45309] tabular-nums">{currentMonthData.combined} commits</dd>
                        </div>
                        <div className="flex justify-between items-center text-[#78716C]">
                          <dt className="uppercase tracking-wider text-[7.5px] text-[#A8A29E]">@aniket0</dt>
                          <dd className="font-bold text-[#059669] tabular-nums">{currentMonthData.aniket0}</dd>
                        </div>
                        <div className="flex justify-between items-center text-[#78716C]">
                          <dt className="uppercase tracking-wider text-[7.5px] text-[#A8A29E]">@mishra</dt>
                          <dd className="font-bold text-[#6366F1] tabular-nums">{currentMonthData.mishra}</dd>
                        </div>
                      </dl>

                      <button
                        onClick={() => {
                          sound.playClick();
                          setIsPinned(false);
                          setIsCardVisible(false);
                        }}
                        className="ml-1 p-0.5 rounded text-[#A8A29E] hover:text-[#4A3B33] hover:bg-[#F1E9DA] transition-colors cursor-pointer shrink-0"
                        title="Dismiss"
                        aria-label="Dismiss card"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Code Snippet Box (just like Image 2: • index.query({ topK: 10 })) */}
                    <div className="rounded bg-[#F4EFE6] border border-[#E4D9BC] px-1.5 py-1 font-mono text-[8px] text-[#4A3B33] truncate">
                      • {currentMonthData.stack.slice(0, 2).join(" · ")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons to open both profiles */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="https://github.com/aniketmishra-0"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius)] bg-white border border-[#E4D9BC] font-mono text-xs font-semibold text-[#4A3B33] shadow-xs hover:border-[#059669] hover:text-[#059669] transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-[#059669]" />
            <span>Open @aniketmishra-0 Profile ({repos.aniket0} Repos · {totals.aniket0} Commits) ↗</span>
          </a>
          <a
            href="https://github.com/Mishra-Aniket"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius)] bg-white border border-[#E4D9BC] font-mono text-xs font-semibold text-[#4A3B33] shadow-xs hover:border-[#6366F1] hover:text-[#6366F1] transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
            <span>Open @Mishra-Aniket Profile ({repos.mishra} Repos · {totals.mishra} Commits) ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
