"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Sparkles,
  ExternalLink,
  Search,
  AlertCircle,
  RefreshCw,
  Gift,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  Bot,
  Code2,
  Cloud,
  Palette,
  Globe,
  Database,
  GraduationCap,
  Film,
  Layers,
  Flame,
  CreditCard,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Clock
} from "lucide-react";
import { getRuntimeBasePath } from "../../lib/utils";
import { sound } from "../utils/sound";

/* ── Category metadata for the 'Browse by Category' grid ── */
const CATEGORY_CONFIG = [
  {
    id: "Productivity",
    label: "Productivity & Ops",
    icon: Zap,
    description: "Notion, Linear, Miro, Airtable & workflows",
  },
  {
    id: "AI & ML",
    label: "AI & Neural Pipelines",
    icon: Bot,
    description: "Copilot, OpenAI, Hugging Face & GPU compute",
  },
  {
    id: "Developer Tools",
    label: "IDEs & Core Tooling",
    icon: Code2,
    description: "JetBrains Suite, GitKraken, Termius, Postman",
  },
  {
    id: "Cloud & Infra",
    label: "Cloud, Edge & Compute",
    icon: Cloud,
    description: "AWS, Azure, DigitalOcean & serverless hosts",
  },
  {
    id: "Design & 3D",
    label: "UI/UX & Creative Suite",
    icon: Palette,
    description: "Figma Pro, Canva Pro, Adobe CC & 3D assets",
  },
  {
    id: "Web & Domains",
    label: "Domains & Public Web",
    icon: Globe,
    description: "Free .me & .tech domains, DNS & SSL certificates",
  },
  {
    id: "Database & Data",
    label: "Databases & Analytics",
    icon: Database,
    description: "MongoDB Atlas, Tableau, Datadog observability",
  },
  {
    id: "Learning",
    label: "Engineering Curricula",
    icon: GraduationCap,
    description: "Frontend Masters, Educative, DataCamp, Boot.dev",
  },
  {
    id: "Security",
    label: "Zero-Trust & Vaults",
    icon: ShieldCheck,
    description: "1Password, Dashlane, Sentry error telemetry",
  },
  {
    id: "Audio & Media",
    label: "Audio & Media Production",
    icon: Film,
    description: "Ableton Live, Logic Pro, DaVinci Studio",
  },
];

/* ── Skeleton card shown while data is loading ── */
function SkeletonCard() {
  return (
    <div className="rounded-[var(--radius)] border border-white/[0.10] bg-[#1C1917] p-7 sm:p-8 animate-pulse flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-white/[0.08]" />
            <div className="h-3 w-20 bg-white/[0.06] rounded" />
          </div>
          <div className="h-4 w-16 bg-white/[0.06] rounded" />
        </div>
        <div className="h-6 w-3/4 bg-white/[0.08] rounded mb-2" />
        <div className="h-4 w-full bg-white/[0.04] rounded mb-6" />
        <div className="rounded-lg bg-white/[0.04] p-4 mb-6 h-20" />
      </div>
      <div className="pt-4 border-t border-white/[0.06]">
        <div className="h-9 w-full bg-white/[0.06] rounded" />
      </div>
    </div>
  );
}

// High value tool IDs
const HIGH_VALUE_KEYWORDS = [
  "jetbrains",
  "digitalocean",
  "datadog",
  "tableau",
  "azure",
  "aws",
  "mongodb",
  "figma",
  "copilot",
  "1password",
  "termius"
];

// Zero credit card keywords
const ZERO_CARD_KEYWORDS = [
  "namecheap",
  "jetbrains",
  "figma",
  "postman",
  "termius",
  "github",
  "notion",
  "gitkraken",
  "bootstrap"
];

const PAGE_SIZE = 18;

export default function StudentPerks({ onCountReady, onOpenSubmit }) {
  const [data, setData] = useState(null);
  const [communityOffers, setCommunityOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'expiring' | 'recent' | 'high_value' | 'zero_card'

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("paginated"); // 'paginated' | 'all'

  // Load verified community submissions from localStorage
  const loadCommunityOffers = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const storedStr = localStorage.getItem("aniket_verified_offers");
      if (!storedStr) {
        const initialManualDeals = [
          {
            id: "verified_1",
            name: "AWS Cloud Credit Fellowship",
            link: "https://aws.amazon.com/education/awseducate/",
            offer: "$100 in free cloud compute & container credits for active semester projects (Limited Cohort).",
            category: "Cloud & Infra",
            domain: "aws.amazon.com",
            requiresCard: false,
            recentlyAdded: true,
            expiringSoon: true,
            daysLeft: 12,
            submittedBy: "Aniket Mishra (Admin)",
            submittedAt: new Date().toISOString(),
            status: "verified"
          },
          {
            id: "verified_2",
            name: "Cursor AI Student Grant",
            link: "https://cursor.com/",
            offer: "Free monthly AI agent credits & fast code generation tokens for students with campus ID.",
            category: "AI & ML",
            domain: "cursor.com",
            requiresCard: false,
            recentlyAdded: true,
            expiringSoon: true,
            daysLeft: 18,
            submittedBy: "Aniket Mishra (Admin)",
            submittedAt: new Date().toISOString(),
            status: "verified"
          }
        ];
        localStorage.setItem("aniket_verified_offers", JSON.stringify(initialManualDeals));
        setCommunityOffers(initialManualDeals);
      } else {
        setCommunityOffers(JSON.parse(storedStr));
      }
    } catch {}
  }, []);

  const fetchOffers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const basePath = getRuntimeBasePath();
      const res = await fetch(`${basePath}/data/pack-offers.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);

      loadCommunityOffers();

      const totalCount = (json.count ?? json.offers?.length ?? 0) + communityOffers.length;
      if (onCountReady) onCountReady(totalCount);
    } catch (err) {
      setError(err.message || "Failed to load offers");
    } finally {
      setLoading(false);
    }
  }, [onCountReady, loadCommunityOffers, communityOffers.length]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  // Listen for deal approval events from Admin Moderation Queue
  useEffect(() => {
    const handleApprovedOffer = (e) => {
      const approved = e.detail;
      if (approved) {
        setCommunityOffers((prev) => [approved, ...prev.filter((p) => p.id !== approved.id)]);
        if (approved.expiringSoon) {
          setStatusFilter("expiring");
        }
        const listEl = document.getElementById("offers-list");
        if (listEl) listEl.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("aniket_offer_approved", handleApprovedOffer);
    return () => window.removeEventListener("aniket_offer_approved", handleApprovedOffer);
  }, []);

  // Listen for filter events triggered externally
  useEffect(() => {
    const handleFilterEvent = (e) => {
      const { category, search: searchQ } = e.detail || {};
      if (category !== undefined) setSelectedCategory(category);
      if (searchQ !== undefined) setSearch(searchQ);
      setCurrentPage(1);
      const listEl = document.getElementById("offers-list");
      if (listEl) {
        listEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    const handleStatusEvent = (e) => {
      const { filterType } = e.detail || {};
      if (filterType) {
        setStatusFilter(filterType);
        setCurrentPage(1);
      }
    };

    window.addEventListener("aniket_filter_perks", handleFilterEvent);
    window.addEventListener("aniket_filter_status", handleStatusEvent);
    return () => {
      window.removeEventListener("aniket_filter_perks", handleFilterEvent);
      window.removeEventListener("aniket_filter_status", handleStatusEvent);
    };
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, statusFilter]);

  /* ── Merge Official Offers with Manually Added Community Submissions ── */
  const allOffers = useMemo(() => {
    // Official GitHub Student Pack Deals: Ongoing verified grants, NEVER marked as expiring!
    const official = (data?.offers || []).map((o, idx) => {
      const nameLower = (o.name || "").toLowerCase();
      const offerLower = (o.offer || "").toLowerCase();

      const isHighValue = HIGH_VALUE_KEYWORDS.some(
        (kw) => nameLower.includes(kw) || offerLower.includes(kw)
      );
      const isZeroCard = ZERO_CARD_KEYWORDS.some(
        (kw) => nameLower.includes(kw)
      );
      const isRecent = idx < 6;

      return {
        ...o,
        isHighValue,
        isExpiring: false, // Strict: Official deals are NOT expiring!
        isZeroCard,
        isRecent,
        isCommunity: false
      };
    });

    // Manually posted deals: ONLY these can have isExpiring = true
    const community = communityOffers.map((c) => ({
      ...c,
      isHighValue: true,
      isExpiring: Boolean(c.expiringSoon),
      daysLeft: c.daysLeft || null,
      isZeroCard: !c.requiresCard,
      isRecent: true,
      isCommunity: true
    }));

    return [...community, ...official];
  }, [data, communityOffers]);

  /* ── Dynamic Expiring and Recent counts ── */
  const expiringCount = useMemo(() => {
    return allOffers.filter((o) => o.isExpiring).length;
  }, [allOffers]);

  const recentCount = useMemo(() => {
    return allOffers.filter((o) => o.isRecent || o.isCommunity).length;
  }, [allOffers]);

  /* ── Category counts ── */
  const categoryCounts = useMemo(() => {
    const counts = {};
    allOffers.forEach((o) => {
      if (o.category) {
        counts[o.category] = (counts[o.category] || 0) + 1;
      }
    });
    return counts;
  }, [allOffers]);

  /* ── Filter offers by Category, Status, and Search query ── */
  const filtered = useMemo(() => {
    let list = allOffers;

    // Category filter
    if (selectedCategory !== "All") {
      list = list.filter((o) => o.category === selectedCategory);
    }

    // Status filter
    if (statusFilter === "expiring") {
      list = list.filter((o) => o.isExpiring);
    } else if (statusFilter === "recent") {
      list = list.filter((o) => o.isRecent || o.isCommunity);
    } else if (statusFilter === "high_value") {
      list = list.filter((o) => o.isHighValue);
    } else if (statusFilter === "zero_card") {
      list = list.filter((o) => o.isZeroCard);
    }

    // Search query
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(
      (o) =>
        o.name?.toLowerCase().includes(q) ||
        o.offer?.toLowerCase().includes(q) ||
        o.domain?.toLowerCase().includes(q) ||
        o.category?.toLowerCase().includes(q)
    );
  }, [allOffers, search, selectedCategory, statusFilter]);

  // Pagination calculation
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 1;

  const displayedOffers = useMemo(() => {
    if (viewMode === "all") {
      return filtered;
    }
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage, viewMode]);

  const handlePageChange = (page) => {
    try {
      sound.playClick();
    } catch {}
    setCurrentPage(page);
    const listEl = document.getElementById("offers-list");
    if (listEl) listEl.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleToggleViewAll = () => {
    try {
      sound.playClick();
    } catch {}
    setViewMode((prev) => (prev === "all" ? "paginated" : "all"));
    if (viewMode === "all") setCurrentPage(1);
  };

  return (
    <section
      id="perks"
      className="py-20 md:py-28 bg-[#141210] border-b border-white/[0.08]"
      style={{ scrollMarginTop: "6rem" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
        {/* ────────────────────────────────────────────────────────── */}
        {/* SECTION 1: BROWSE BY CATEGORY                             */}
        {/* ────────────────────────────────────────────────────────── */}
        <div className="mb-14 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#E4C090]">
              <Gift className="w-3.5 h-3.5" />
              // ARCHITECTURE & STACK EXPLORER
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Equip Your Stack Without Spending A Dime.
          </h2>
          <p className="mt-3 text-[1rem] text-[#D6D3D1] max-w-2xl mx-auto leading-relaxed">
            Over 140+ verified student software grants, cloud credits, and developer tools indexed by engineering discipline — straight from official partners.
          </p>

          {/* Category Cards Grid */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 text-left">
            {CATEGORY_CONFIG.map((cat) => {
              const Icon = cat.icon;
              const count = categoryCounts[cat.id] || 0;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    try {
                      sound.playClick();
                    } catch {}
                    setSelectedCategory(isSelected ? "All" : cat.id);
                    const listEl = document.getElementById("offers-list");
                    if (listEl) {
                      listEl.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className={`group relative rounded-xl p-4 sm:p-5 transition-all duration-200 cursor-pointer border flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#25201C] border-[#E4C090] shadow-[0_8px_30px_rgba(228,192,144,0.18)] ring-1 ring-[#E4C090]"
                      : "bg-[#1C1917] border-white/[0.10] hover:border-[#E4C090]/60 hover:bg-[#221E1B]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 w-full">
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isSelected
                          ? "bg-[#B45309]/30 text-[#E4C090]"
                          : "bg-white/[0.06] text-[#D6D3D1] group-hover:text-white group-hover:bg-white/[0.1]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-white/[0.08] text-[#E7E5E4] font-bold">
                      {count}
                    </span>
                  </div>

                  <div>
                    <div className="font-serif text-sm sm:text-base font-bold text-white group-hover:text-[#E4C090] transition-colors leading-snug">
                      {cat.label}
                    </div>
                    <p className="text-[11px] text-[#A8A29E] mt-1 line-clamp-1 group-hover:text-[#D6D3D1] transition-colors font-sans">
                      {cat.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* SECTION 2: GITHUB STUDENT PACK FEATURE BANNER (COMPACT)   */}
        {/* ────────────────────────────────────────────────────────── */}
        <div className="rounded-xl sm:rounded-2xl border border-white/[0.14] bg-gradient-to-r from-[#1A1F26] via-[#14181F] to-[#0F1217] p-4 sm:p-7 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] mb-8 sm:mb-14">
          <div className="flex items-center sm:items-start gap-3 sm:gap-5 w-full">
            <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-lg sm:rounded-xl bg-white/[0.08] border border-white/[0.14] p-2 sm:p-2.5 flex items-center justify-center shrink-0">
              <svg className="w-full h-full text-white fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </div>

            <div className="min-w-0">
              <h3 className="font-serif text-base sm:text-2xl font-bold text-white mb-0.5 sm:mb-1 truncate sm:whitespace-normal">
                GitHub Student Developer Pack
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-mono text-[#D6D3D1]">
                <span>80+ Free Tools</span>
                <span className="text-[#A8A29E]">•</span>
                <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Academic Verification
                </span>
                <span className="hidden sm:inline text-[#A8A29E]">•</span>
                <span className="hidden sm:inline text-[#E4C090] font-semibold">$50K+ in grants</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center gap-2.5 w-full lg:w-auto shrink-0 pt-1 lg:pt-0">
            <button
              onClick={() => {
                try {
                  sound.playClick();
                } catch {}
                setSelectedCategory("Developer Tools");
                const listEl = document.getElementById("offers-list");
                if (listEl) listEl.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-1.5 rounded-[var(--radius)] bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.18] px-3 sm:px-5 py-2 sm:py-2.5 font-mono text-[11px] sm:text-xs font-bold text-white transition-all cursor-pointer flex-1 lg:flex-initial"
            >
              <span>Explore Tools</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <a
              href="https://education.github.com/pack"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                try {
                  sound.playClick();
                } catch {}
              }}
              className="inline-flex items-center justify-center gap-1.5 rounded-[var(--radius)] bg-[#1F6FEB] hover:bg-[#388BFD] px-3 sm:px-5 py-2 sm:py-2.5 font-mono text-[11px] sm:text-xs font-bold text-white shadow-md transition-all cursor-pointer flex-1 lg:flex-initial"
            >
              <span>Claim Pack ↗</span>
            </a>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* SECTION 3: OFFERS SEARCH, SMART TABS & GRID               */}
        {/* ────────────────────────────────────────────────────────── */}
        <div id="offers-list" className="scroll-mt-28">
          {/* ── SMART STATUS PILLS (Hidden on Mobile as requested) ── */}
          <div className="hidden sm:flex flex-wrap items-center gap-2 mb-6 border-b border-white/[0.08] pb-4">
            <span className="font-mono text-xs text-[#A8A29E] mr-2 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#E4C090]" />
              Filter by:
            </span>

            {[
              { id: "all", label: `All Deals (${allOffers.length})` },
              { id: "expiring", label: `🔥 Expiring Soon (${expiringCount})` },
              { id: "recent", label: `✨ Recently Added (${recentCount})` },
              { id: "high_value", label: "💎 High Value ($200+)" },
              { id: "zero_card", label: "💳 No Credit Card Needed" }
            ].map((tab) => {
              const isCurrent = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    try {
                      sound.playClick();
                    } catch {}
                    setStatusFilter(tab.id);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer border ${
                    isCurrent
                      ? "bg-[#B45309] border-[#B45309] text-white shadow-md shadow-[#B45309]/30"
                      : "bg-[#1C1917] border-white/[0.12] text-[#D6D3D1] hover:border-[#E4C090]/50 hover:bg-[#24201D]"
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}

            {/* Post A Deal Button */}
            <button
              onClick={() => {
                try {
                  sound.playClick();
                } catch {}
                if (onOpenSubmit) onOpenSubmit();
              }}
              className="ml-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold text-[#E4C090] bg-[#E4C090]/15 hover:bg-[#E4C090]/25 border border-[#E4C090]/40 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Post A Deal</span>
            </button>
          </div>

          {/* Search bar + Active Category Indicator */}
          {!loading && !error && (
            <div className="flex flex-row items-center justify-between gap-3 mb-6 sm:mb-8">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E] pointer-events-none" />
                <input
                  id="perks-search"
                  type="text"
                  placeholder="Search 140+ software deals..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 sm:py-2.5 rounded-[var(--radius)] bg-[#1C1917] border border-white/[0.18] text-xs sm:text-sm text-white placeholder:text-[#78716C] focus:border-[#E4C090] focus:outline-none focus:ring-1 focus:ring-[#E4C090]/50 transition-colors"
                />
              </div>

              {/* Mobile Post A Deal button */}
              <button
                onClick={() => {
                  try {
                    sound.playClick();
                  } catch {}
                  if (onOpenSubmit) onOpenSubmit();
                }}
                className="sm:hidden inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-[#E4C090]/15 border border-[#E4C090]/40 font-mono text-xs font-bold text-[#E4C090] shrink-0 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>

              {/* Active category pill & count (Desktop) */}
              <div className="hidden sm:flex items-center gap-3">
                <span className="font-mono text-xs text-[#A8A29E]">
                  Showing <span className="text-white font-bold">{filtered.length}</span> active grants
                  {selectedCategory !== "All" && ` in ${selectedCategory}`}
                  {statusFilter !== "all" && ` (${statusFilter.replace("_", " ")})`}
                </span>
                {(selectedCategory !== "All" || statusFilter !== "all" || search) && (
                  <button
                    onClick={() => {
                      try {
                        sound.playClick();
                      } catch {}
                      setSelectedCategory("All");
                      setStatusFilter("all");
                      setSearch("");
                    }}
                    className="font-mono text-xs text-[#E4C090] hover:underline cursor-pointer"
                  >
                    (Reset filters)
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── Loading skeleton ── */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* ── Error state ── */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
              <AlertCircle className="w-10 h-10 text-red-400" />
              <p className="text-sm text-[#D6D3D1]">
                Could not load student perks and grants.
              </p>
              <button
                onClick={fetchOffers}
                className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-[#24201D] border border-white/[0.18] px-5 py-2.5 font-mono text-xs font-bold text-white hover:border-[#E4C090] hover:bg-white/[0.14] transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry
              </button>
            </div>
          )}

          {/* ── Deals Cards Grid / Empty State ── */}
          {!loading && !error && (
            <>
              {filtered.length === 0 ? (
                <div className="text-center py-16 border border-white/[0.08] rounded-2xl bg-[#1A1816] p-8 max-w-lg mx-auto">
                  {statusFilter === "expiring" ? (
                    <>
                      <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                        <Flame className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-white mb-2">
                        No Expiring Deals Right Now
                      </h3>
                      <p className="text-xs text-[#A8A29E] leading-relaxed mb-5">
                        Official student developer packs stay active year-round. Only manual limited-time grants or cohort deadlines appear under this filter.
                      </p>
                      <button
                        onClick={() => {
                          try {
                            sound.playClick();
                          } catch {}
                          if (onOpenSubmit) onOpenSubmit();
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#B45309] hover:bg-[#A16207] font-mono text-xs font-bold text-white transition-colors cursor-pointer"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Post An Expiring Deal</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-base text-[#D6D3D1] mb-2">
                        No perks found matching your current filter.
                      </p>
                      <button
                        onClick={() => {
                          setSearch("");
                          setSelectedCategory("All");
                          setStatusFilter("all");
                        }}
                        className="font-mono text-xs text-[#E4C090] hover:underline cursor-pointer"
                      >
                        Clear all filters
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8">
                  {displayedOffers.map((offer, idx) => {
                    const iconSrc = offer.favicon || offer.logo;
                    return (
                      <div
                        key={offer.name || idx}
                        className="group relative rounded-xl sm:rounded-[var(--radius)] border border-white/[0.12] bg-[#1C1917] p-3 sm:p-7 shadow-[0_12px_30px_rgba(0,0,0,0.5)] sm:shadow-[0_16px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(228,192,144,0.12)] hover:border-[#E4C090]/70 hover:bg-[#211E1B] transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          {/* ── Top Header Row ── */}
                          <div className="flex items-center justify-between gap-1.5 sm:gap-3 mb-2 sm:mb-4">
                            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                              {iconSrc && (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                  src={iconSrc}
                                  alt=""
                                  className="w-4 h-4 sm:w-6 sm:h-6 rounded object-contain shrink-0"
                                  loading="lazy"
                                  onError={(e) => {
                                    if (offer.favicon && e.currentTarget.src !== offer.favicon) {
                                      e.currentTarget.src = offer.favicon;
                                    } else {
                                      e.currentTarget.style.display = "none";
                                    }
                                  }}
                                />
                              )}
                              <span className="font-mono text-[10px] sm:text-xs text-[#A8A29E] truncate">
                                {offer.domain || offer.name}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              {offer.category && (
                                <span className="hidden sm:inline-block font-mono text-[10px] font-bold uppercase tracking-wider text-[#E4C090] bg-[#E4C090]/15 px-2 py-0.5 rounded border border-[#E4C090]/30">
                                  {offer.category}
                                </span>
                              )}
                              <span className="inline-flex items-center gap-1 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 sm:px-2 py-0.5 rounded border border-emerald-500/20">
                                <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
                                <span className="hidden sm:inline">Verified</span>
                              </span>
                            </div>
                          </div>

                          {/* ── Urgency & Feature Badges ── */}
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                            {offer.isExpiring && (
                              <span className="inline-flex items-center gap-1 font-mono text-[9px] sm:text-[10px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/40 px-1.5 sm:px-2 py-0.5 rounded animate-pulse">
                                <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
                                <span>{offer.daysLeft ? `${offer.daysLeft}d left` : "Expiring"}</span>
                              </span>
                            )}
                            {offer.isCommunity && (
                              <span className="inline-flex items-center gap-1 font-mono text-[9px] sm:text-[10px] font-bold text-[#E4C090] bg-[#E4C090]/15 border border-[#E4C090]/30 px-1.5 sm:px-2 py-0.5 rounded">
                                <span>🛡️ Aniket Verified</span>
                              </span>
                            )}
                            {offer.isRecent && !offer.isCommunity && (
                              <span className="inline-flex items-center gap-1 font-mono text-[9px] sm:text-[10px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-1.5 sm:px-2 py-0.5 rounded">
                                <span>✨ New</span>
                              </span>
                            )}
                            {offer.isZeroCard && (
                              <span className="inline-flex items-center gap-1 font-mono text-[9px] sm:text-[10px] font-bold text-[#D6D3D1] bg-white/[0.06] border border-white/[0.1] px-1.5 sm:px-2 py-0.5 rounded">
                                <span>💳 No Card</span>
                              </span>
                            )}
                          </div>

                          {/* ── Title ── */}
                          <h3 className="font-serif text-sm sm:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-[#E4C090] transition-colors leading-tight sm:leading-snug line-clamp-1">
                            {offer.name}
                          </h3>

                          {/* ── About summary ── */}
                          {offer.about && (
                            <p className="text-[10.5px] sm:text-[0.875rem] leading-[1.45] sm:leading-[1.65] text-[#A8A29E] mb-2 sm:mb-5 line-clamp-2">
                              {offer.about}
                            </p>
                          )}

                          {/* ── Offer Highlight Box ── */}
                          <div className="rounded-md sm:rounded-lg bg-white/[0.035] border border-white/[0.08] p-2 sm:p-4 mb-2.5 sm:mb-6 group-hover:border-[#E4C090]/35 transition-colors">
                            <div className="flex items-center gap-1 font-mono text-[8.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#E4C090] mb-0.5 sm:mb-1.5">
                              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#E4C090]" />
                              <span>Perk</span>
                            </div>
                            <p className="text-[10.5px] sm:text-[0.9375rem] leading-[1.45] sm:leading-[1.65] text-[#F5F5F4] font-medium line-clamp-2">
                              {offer.offer}
                            </p>
                          </div>
                        </div>

                        {/* ── Action Button ── */}
                        <div className="pt-2 sm:pt-4 border-t border-white/[0.1] mt-auto">
                          <a
                            href={offer.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              try {
                                sound.playClick();
                              } catch {}
                            }}
                            className="inline-flex w-full items-center justify-center gap-1.5 rounded-[var(--radius)] bg-[#24201D] border border-white/[0.18] py-1.5 sm:py-2.5 px-2 sm:px-4 font-mono text-[10.5px] sm:text-xs font-bold text-white group-hover:bg-[#B45309] group-hover:border-[#B45309] shadow-sm transition-all cursor-pointer"
                          >
                            <span className="truncate">Claim Grant ↗</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ────────────────────────────────────────────────────────── */}
              {/* SECTION 4: PAGINATION CONTROLS & "SHOW ALL" TOGGLE        */}
              {/* ────────────────────────────────────────────────────────── */}
              {totalPages > 1 && (
                <div className="mt-14 pt-8 border-t border-white/[0.1] flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Status Indicator */}
                  <div className="font-mono text-xs text-[#A8A29E]">
                    {viewMode === "all" ? (
                      <span>
                        Showing all <span className="text-white font-bold">{totalItems}</span> offers
                      </span>
                    ) : (
                      <span>
                        Showing page <span className="text-white font-bold">{currentPage}</span> of{" "}
                        <span className="text-white font-bold">{totalPages}</span> ({displayedOffers.length} of {totalItems} items)
                      </span>
                    )}
                  </div>

                  {/* Pagination Buttons */}
                  <div className="flex items-center gap-2">
                    {viewMode === "paginated" && (
                      <>
                        {/* Prev Page Button */}
                        <button
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}
                          className={`p-2 rounded-lg border font-mono text-xs font-bold transition-all cursor-pointer ${
                            currentPage === 1
                              ? "opacity-35 cursor-not-allowed border-white/[0.06] text-[#78716C]"
                              : "border-white/[0.14] text-white hover:border-[#E4C090] hover:bg-white/[0.08]"
                          }`}
                          aria-label="Previous page"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }).map((_, pIdx) => {
                          const pageNum = pIdx + 1;
                          if (
                            pageNum === 1 ||
                            pageNum === totalPages ||
                            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                          ) {
                            const isCurrent = currentPage === pageNum;
                            return (
                              <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer border ${
                                  isCurrent
                                    ? "bg-[#B45309] border-[#B45309] text-white shadow-md shadow-[#B45309]/30"
                                    : "bg-[#1C1917] border-white/[0.12] text-[#D6D3D1] hover:border-[#E4C090] hover:bg-white/[0.08]"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                          if (
                            (pageNum === 2 && currentPage > 3) ||
                            (pageNum === totalPages - 1 && currentPage < totalPages - 2)
                          ) {
                            return (
                              <span key={pageNum} className="font-mono text-xs text-[#78716C] px-1">
                                …
                              </span>
                            );
                          }
                          return null;
                        })}

                        {/* Next Page Button */}
                        <button
                          disabled={currentPage === totalPages}
                          onClick={() => handlePageChange(currentPage + 1)}
                          className={`p-2 rounded-lg border font-mono text-xs font-bold transition-all cursor-pointer ${
                            currentPage === totalPages
                              ? "opacity-35 cursor-not-allowed border-white/[0.06] text-[#78716C]"
                              : "border-white/[0.14] text-white hover:border-[#E4C090] hover:bg-white/[0.08]"
                          }`}
                          aria-label="Next page"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {/* View All / Paginated Toggle */}
                    <button
                      onClick={handleToggleViewAll}
                      className="ml-3 px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.14] font-mono text-xs font-bold text-[#E4C090] transition-colors cursor-pointer"
                    >
                      {viewMode === "all" ? "Show Paginated" : `Show All (${totalItems})`}
                    </button>
                  </div>
                </div>
              )}

              {/* ── Disclaimer ── */}
              <p className="mt-12 text-center font-mono text-[11px] text-[#78716C] leading-relaxed max-w-xl mx-auto">
                Grant availability, educational eligibility, and renewal criteria are maintained directly by each vendor. Always verify credentials on the official partner portal or{" "}
                <a
                  href="https://education.github.com/pack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E4C090] hover:underline"
                >
                  GitHub Education
                </a>{" "}
                before signing up.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
