"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "../utils/sound";
import { 
  Search, 
  X, 
  Home, 
  Code2, 
  BookOpen, 
  CreditCard, 
  Folder, 
  Shield, 
  MessageSquare, 
  Mail, 
  ArrowUpRight,
  ArrowUp,
  Sparkles,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "#hero", icon: Home, keywords: ["context layer", "aniket", "hero"] },
  { label: "Developers", href: "#how-it-works", icon: Code2, keywords: ["api", "sdk", "integration", "business knowledge"] },
  { label: "Documentation", href: "#how-it-works", icon: BookOpen, keywords: ["docs", "quickstart", "reference"] },
  { label: "Pricing", href: "#get-access", icon: CreditCard, keywords: ["plans", "cost", "free", "enterprise"] },
  { label: "GitHub (@aniketmishra-0)", href: "https://github.com/aniketmishra-0", icon: ExternalLink, external: true, keywords: ["github", "repo", "source", "author", "aniketmishra-0"] },
  { label: "LinkedIn (@aniketmishra0)", href: "https://www.linkedin.com/in/aniketmishra0", icon: ExternalLink, external: true, keywords: ["linkedin", "founder", "profile", "aniketmishra0"] },
  { label: "X / Twitter (@aniketmishra0)", href: "https://x.com/aniketmishra0", icon: ExternalLink, external: true, keywords: ["x", "twitter", "social", "aniketmishra0"] },
  { label: "Contact", href: "mailto:hello@aniket.one", icon: Mail, keywords: ["demo", "talk", "sales"] }
];

const KNOWLEDGE_BASE = [
  {
    q: "How can Aniket help me with my HR mandates?",
    keywords: ["hr", "mandate", "mandates", "compliance", "policy", "employee", "onboarding", "leave", "pto"],
    tag: "HR & COMPLIANCE",
    time: "284ms",
    source: "HR Policy Graph · v2.4",
    answer: "Aniket AI unifies all company HR knowledge (handbooks, labor law policies, benefits docs, Slack announcements) into a sovereign context layer. When employee agents answer questions about maternity leave, PTO, or regulatory mandates, Aniket resolves conflicting versions and grounds answers in the verified policy—eliminating hallucinations and keeping every turn auditable.",
    target: "#how-it-works"
  },
  {
    q: "What is context arithmetic?",
    keywords: ["arithmetic", "math", "primitive", "set", "intersect", "union", "subtract", "scope", "rank"],
    tag: "CORE PRIMITIVE",
    time: "291ms",
    source: "context_arithmetic.ts",
    answer: "Context arithmetic applies dynamic set algebra over meaning at query time: ∩ intersects scope (team, region, role), ∪ unions recall across multiple repositories, − subtracts superseded or out-of-scope policies, and ranks survivors into the prompt window.",
    target: "#how-it-works"
  },
  {
    q: "Why did my AI agent give a wrong answer?",
    keywords: ["wrong", "answer", "hallucination", "debug", "trace", "failure", "euphony"],
    tag: "CONTEXT TRACES",
    time: "198ms",
    source: "context_trace.ts · OpenAI Euphony",
    answer: "Aniket Context Traces inspect the exact passages, relevance scores, and metadata filtered at runtime. This pinpoints within seconds whether an error was caused by missing source docs, out-of-date information, or LLM hallucination.",
    target: "#how-it-works"
  },
  {
    q: "How does persistent memory survive model swaps?",
    keywords: ["memory", "model", "swap", "sovereign", "gemini", "claude", "gpt"],
    tag: "SOVEREIGN CONTEXT",
    time: "215ms",
    source: "Model Sovereignty Router",
    answer: "Context is stored in an independent, model-agnostic institutional graph layer owned entirely by you. When hot-swapping between Claude, GPT, or Gemini, your company memory, user entities, and task states remain 100% intact with zero migration downtime.",
    target: "#why-context"
  },
  {
    q: "What models does Aniket support?",
    keywords: ["models", "support", "llm", "claude", "gpt-4o", "gemini", "mistral", "deepseek", "llama"],
    tag: "MODEL AGNOSTIC",
    time: "172ms",
    source: "Model Registry · Multi-Provider",
    answer: "Aniket works across all leading foundational models: Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro, DeepSeek, and open-source models via Ollama and vLLM. You swap models with a single environment flag without rebuilding your context index.",
    target: "#how-it-works"
  },
  {
    q: "How do I integrate the Python or Node.js SDK?",
    keywords: ["sdk", "python", "node", "npm", "pip", "install", "integrate", "quickstart"],
    tag: "DEVELOPER QUICKSTART",
    time: "145ms",
    source: "npm @aniket/core · pip aniket-sdk",
    answer: "Install via `npm i @aniket/core` or `pip install aniket-sdk`. Initialize with your sovereign API key, call `ctx.query()` before your LLM completion, and pass the verified context block directly into your prompt.",
    target: "/docs"
  }
];

export default function SearchModal({ isOpen, onOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeAnswer, setActiveAnswer] = useState(null);
  const inputRef = useRef(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync with mobile menu open state to prevent overlapping
  useEffect(() => {
    const handleMobileMenuChange = (e) => {
      setIsMobileMenuOpen(Boolean(e.detail));
    };
    if (typeof document !== 'undefined') {
      setIsMobileMenuOpen(document.documentElement.getAttribute('data-mobile-nav-open') === 'true');
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

  // Scroll lock effect: freeze Lenis and prevent body scroll when modal is open
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
    } else {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
      document.body.style.overflow = "";
      setQuery("");
      setActiveAnswer(null);
    }

    return () => {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Track scroll position for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Find matching knowledge base question
  const matchedQA = query.trim()
    ? KNOWLEDGE_BASE.find(item => 
        item.q.toLowerCase().includes(query.toLowerCase()) ||
        item.keywords.some(k => query.toLowerCase().includes(k))
      )
    : null;

  const displayAnswer = activeAnswer || matchedQA;

  const filteredLinks = query.trim()
    ? QUICK_LINKS.filter(item => 
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
      )
    : QUICK_LINKS;

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      sound.playClick();
      setSelectedIndex((prev) => (prev + 1) % filteredLinks.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      sound.playClick();
      setSelectedIndex((prev) => (prev - 1 + filteredLinks.length) % filteredLinks.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      sound.playClick();
      if (displayAnswer) {
        window.location.href = displayAnswer.target;
        onClose();
      } else if (filteredLinks[selectedIndex]) {
        window.location.href = filteredLinks[selectedIndex].href;
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

  const handleCustomAsk = (customQuery) => {
    sound.playClick();
    const fallbackAnswer = {
      q: customQuery,
      tag: "ANIKET CONTEXT GRAPH",
      time: "212ms",
      source: "Institutional Knowledge Base",
      answer: `Aniket processes queries across your enterprise knowledge sources in real time. For "${customQuery}", Aniket dynamically routes and verifies context vectors to ensure your LLMs receive accurate, conflict-free memory.`,
      target: "#how-it-works"
    };
    setActiveAnswer(fallbackAnswer);
  };

  return (
    <>
      {/* 1. FIXED FLOATING BOTTOM DOCK: Exact 1:1 match with getalchemystai.com */}
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
          aria-label="Search pages or ask Aniket"
          className="inline-flex shrink-0 items-center justify-center whitespace-nowrap border py-2 outline-none transition-all cursor-pointer select-none active:translate-y-px bg-white text-[#4A3B33] border-[#E4D9BC] hover:bg-[#F8F4EE] shadow-[var(--shadow-soft)] h-11 gap-2.5 rounded-lg px-5 sm:px-6 text-xs sm:text-sm font-semibold hover:-translate-y-px"
        >
          <Search className="w-4 h-4 text-[#78716C] shrink-0" />
          <span className="truncate max-w-[260px] sm:max-w-none">
            Search or Ask &ldquo;How can Aniket help me with my HR mandates?&rdquo;
          </span>
          <kbd className="hidden sm:inline-flex ml-3 rounded border border-[#E4D9BC] bg-[#F8F4EE] px-1.5 py-0.5 font-mono text-xs text-[#78716C]">
            ⌘ K
          </kbd>
        </button>
      </div>

      {/* 2. THE SEARCH MODAL: Rock-solid flex centering on desktop, smooth bottom sheet on mobile */}
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

            {/* Modal Flex Container: Guarantees 100% true centering on desktop and bottom sheet on mobile */}
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
              <motion.div
                initial={{ y: 20, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 14, opacity: 0, scale: 0.98 }}
                transition={{ 
                  duration: 0.24,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="pointer-events-auto relative w-full sm:max-w-xl max-h-[88dvh] sm:max-h-[82vh] flex flex-col rounded-t-2xl sm:rounded-2xl border-t sm:border border-[#E4D9BC] bg-[#FDFBF7] shadow-[0_24px_64px_-12px_rgba(74,59,51,0.3)] overflow-hidden text-[#4A3B33] will-change-transform"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={handleKeyDown}
              >
              {/* Drag Handle Pill (Mobile) */}
              <div className="pt-2.5 pb-1 flex justify-center sm:hidden shrink-0">
                <div className="w-10 h-1 rounded-full bg-[#E4D9BC]" />
              </div>

              {/* Modal Header: Title + Close Button */}
              <div className="flex items-center justify-between border-b border-[#E4D9BC]/80 px-4 sm:px-5 py-2.5 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B45309]" />
                  <h2 className="text-sm font-semibold text-[#4A3B33]">
                    Search or Ask Aniket
                  </h2>
                </div>
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

              {/* Modal Input Container */}
              <div className="p-3.5 sm:p-4 pb-2 shrink-0">
                <div className="flex items-center gap-2.5 rounded-lg border border-[#B45309] bg-white px-3.5 py-2.5 shadow-xs ring-2 ring-[#B45309]/20 transition-all">
                  <Search className="w-4 h-4 text-[#78716C] shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setActiveAnswer(null);
                      setSelectedIndex(0);
                    }}
                    placeholder="Ask a question or find a page…"
                    className="w-full bg-transparent text-sm text-[#4A3B33] placeholder-[#A8A29E] outline-none font-sans"
                  />
                  {query && (
                    <button 
                      type="button"
                      onClick={() => { setQuery(""); setActiveAnswer(null); }}
                      className="text-[#A8A29E] hover:text-[#4A3B33] p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Unified Scroll Container (All dynamic content scrolls together smoothly) */}
              <div 
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3.5 sm:px-4 py-2 space-y-4 touch-pan-y"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {/* Simulated Live Context Resolution (Dismissable answer card) */}
                {displayAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-[#B45309]/30 bg-[#FFFDF9] p-3.5 shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#B45309] bg-[#B45309]/10 px-2 py-0.5 rounded">
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
                        <span>Close</span>
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-[11.5px] font-mono font-medium text-[#78716C] mb-1">
                      Q: {displayAnswer.q}
                    </div>

                    <p className="text-[12px] leading-relaxed text-[#4A3B33] mb-2.5 font-sans">
                      {displayAnswer.answer}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E4D9BC]/60">
                      <span className="font-mono text-[8.5px] text-[#78716C]">
                        Source: {displayAnswer.source}
                      </span>
                      <a
                        href={displayAnswer.target}
                        onClick={onClose}
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#B45309] hover:underline"
                      >
                        <span>Inspect in Docs</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* If user typed a custom query and no answer is active, offer one-tap ask */}
                {query.trim() && !displayAnswer && (
                  <button
                    type="button"
                    onClick={() => handleCustomAsk(query)}
                    className="w-full text-left p-2.5 rounded-lg border border-[#B45309]/40 bg-[#B45309]/5 hover:bg-[#B45309]/10 text-[#4A3B33] transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
                      <span className="text-xs font-medium">Ask Aniket AI: &ldquo;{query}&rdquo;</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#B45309] group-hover:translate-x-0.5 transition-transform">Press Enter →</span>
                  </button>
                )}

                {/* Suggested Questions Section */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-0.5">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#78716C] flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#B45309]" />
                      Ask Aniket AI (Instant Answers)
                    </span>
                    <span className="text-[9.5px] font-mono text-[#A8A29E]">Tap to resolve</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {KNOWLEDGE_BASE.map((item, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectQuestion(item)}
                        className={`text-left text-xs p-2 rounded-lg border transition-all cursor-pointer flex items-start gap-2 ${
                          displayAnswer?.q === item.q
                            ? "border-[#B45309] bg-[#FAF6EE] text-[#B45309] font-medium"
                            : "border-[#E4D9BC]/70 bg-white hover:border-[#B45309] hover:bg-[#FAF6EE] text-[#4A3B33]"
                        }`}
                      >
                        <span className="text-[#B45309] text-[10px] font-mono mt-0.5 font-bold shrink-0">✦</span>
                        <span className="flex-1 line-clamp-2 text-[11.5px] leading-tight">{item.q}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Navigation Links */}
                <div className="space-y-1 pt-1">
                  <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#78716C] px-0.5">
                    Quick Links
                  </div>
                  <div className="space-y-0.5">
                    {filteredLinks.length === 0 ? (
                      <div className="py-4 text-center text-xs text-[#78716C]">
                        No matching links found for &ldquo;{query}&rdquo;
                      </div>
                    ) : (
                      filteredLinks.map((item, idx) => {
                        const Icon = item.icon;
                        const isSelected = selectedIndex === idx;

                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            onClick={onClose}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                              isSelected
                                ? "bg-[#F3ECE0] text-[#4A3B33] font-medium"
                                : "text-[#57534E] hover:bg-[#F3ECE0]/70"
                            }`}
                          >
                            <Icon className="w-4 h-4 text-[#78716C] shrink-0" />
                            <span className="flex-1 text-[13px]">{item.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#A8A29E] shrink-0" />
                          </a>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Keyboard Navigation Bar (Hidden on Mobile) */}
              <div className="hidden sm:flex items-center justify-between border-t border-[#E4D9BC]/80 px-4 py-2 text-xs font-mono text-[#78716C] bg-[#F8F4EE] shrink-0">
                <span>↑ ↓ navigate · Enter select</span>
                <span>Esc close</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
