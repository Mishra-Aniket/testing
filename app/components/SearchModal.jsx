"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "../utils/sound";
import {
  Search,
  X,
  Home,
  BookOpen,
  Folder,
  Mail,
  ArrowUpRight,
  ExternalLink,
  Layers,
  Cpu,
  Rocket,
  GraduationCap,
  HelpCircle,
  FileText
} from "lucide-react";
import {
  PROJECTS,
  SERVICES,
  STUDENT_OFFERS,
  STUDENT_RESOURCES,
  STACK_LAYERS,
  FAQS,
  SITE_PAGES
} from "../data/portfolioData";

// Icon mapping helper
const ICON_MAP = {
  Home,
  Folder,
  Rocket,
  Layers,
  HelpCircle,
  GraduationCap,
  BookOpen,
  FileText,
  Cpu,
  ExternalLink,
  Mail
};

// Core Quick Navigation links when search input is empty
const QUICK_LINKS = [
  {
    id: "quick-work",
    label: "Featured Projects",
    subtitle: "OmTabs, OmSpace, Centrix, ImgWorld & Open-Source Tools",
    badge: "Work",
    href: "/#work",
    external: false,
    icon: Folder
  },
  {
    id: "quick-services",
    label: "Engineering Services",
    subtitle: "Full-Stack MVP Sprint, Architecture & System Audits",
    badge: "Services",
    href: "/#services",
    external: false,
    icon: Rocket
  },
  {
    id: "quick-stack",
    label: "Core Tech Stack",
    subtitle: "Next.js, React, TypeScript, .NET 8, FastAPI, PostgreSQL",
    badge: "Stack",
    href: "/#stack",
    external: false,
    icon: Layers
  },
  {
    id: "quick-resources",
    label: "Free Student Resources",
    subtitle: "Curated roadmaps, production starters & architecture cheatsheets",
    badge: "Free",
    href: "/students#resources",
    external: false,
    icon: BookOpen
  },
  {
    id: "quick-students",
    label: "Student Perks & Grants",
    subtitle: "1-on-1 mentorship, GitHub code reviews & subsidized MVP grants",
    badge: "Students",
    href: "/students#offers",
    external: false,
    icon: GraduationCap
  },
  {
    id: "quick-contact",
    label: "Contact & Hire Aniket",
    subtitle: "Direct email, calendar invite & MSME registered business details",
    badge: "Contact",
    href: "/#get-access",
    external: false,
    icon: Mail
  }
];

export default function SearchModal({ isOpen, onOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const inputRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Sync with mobile menu state to prevent overlapping
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

  // Handle open/close: stop Lenis so modal scrolls natively, resume on close
  useEffect(() => {
    if (isOpen) {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.stop();
      }
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
      document.body.style.overflow = "";
      setQuery("");
      setSelectedIndex(0);
    }

    return () => {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Build the complete search index dynamically with exact element destinations
  const allSearchItems = useMemo(() => {
    const list = [];

    // 1. Projects -> Exact project cards (#project-${p.id})
    (PROJECTS || []).forEach((p) => {
      list.push({
        id: `proj-${p.id}`,
        label: p.title,
        subtitle: p.subtitle || p.metrics || "Project",
        badge: "Project",
        href: `/#project-${p.id}`,
        external: false,
        icon: Folder,
        keywords: `${p.title} ${p.subtitle} ${p.category} ${p.tags?.join(" ")} ${p.description} ${p.metrics}`.toLowerCase()
      });
    });

    // 2. Services -> Exact service cards (#service-${s.id})
    (SERVICES || []).forEach((s) => {
      list.push({
        id: `srv-${s.id}`,
        label: s.title,
        subtitle: s.tagline || s.turnaround || "Service",
        badge: "Service",
        href: `/#service-${s.id}`,
        external: false,
        icon: Rocket,
        keywords: `${s.title} ${s.tagline} ${s.deliverables?.join(" ")} ${s.description} ${s.turnaround}`.toLowerCase()
      });
    });

    // 3. Tech Stack Layers -> Exact layer in 3D Stack Diagram (#stack-${sl.id})
    (STACK_LAYERS || []).forEach((sl) => {
      list.push({
        id: `stack-${sl.id || sl.idx}`,
        label: sl.title,
        subtitle: (sl.techs || []).slice(0, 4).join(" · "),
        badge: "Stack",
        href: `/#stack-${sl.id || "stack"}`,
        external: false,
        icon: Layers,
        keywords: `${sl.title} ${sl.techs?.join(" ")} ${sl.body} ${sl.keywords?.join(" ")}`.toLowerCase()
      });
    });

    // 4. Student Resources -> Exact resource cards on /students (#resource-${r.id})
    (STUDENT_RESOURCES || []).forEach((r) => {
      list.push({
        id: `res-${r.id}`,
        label: r.title,
        subtitle: `${r.category} · ${r.tagline || r.badge}`,
        badge: "Free Resource",
        href: `/students#resource-${r.id}`,
        external: false,
        icon: BookOpen,
        keywords: `${r.title} ${r.category} ${r.tagline} ${r.description} ${r.tags?.join(" ")}`.toLowerCase()
      });
    });

    // 5. Student Offers & Perks -> Exact offer cards on /students (#student-${st.id})
    (STUDENT_OFFERS || []).forEach((st) => {
      list.push({
        id: `student-${st.id}`,
        label: st.title,
        subtitle: st.highlight || st.tagline || "Free",
        badge: "Student Perk",
        href: `/students#student-${st.id}`,
        external: false,
        icon: GraduationCap,
        keywords: `${st.title} ${st.highlight} ${st.tagline} ${st.description}`.toLowerCase()
      });
    });

    // 6. Frequently Asked Questions -> Exact FAQ item (#faq-${idx})
    (FAQS || []).forEach((f, idx) => {
      list.push({
        id: `faq-${idx}`,
        label: f.q,
        subtitle: f.a,
        badge: "FAQ",
        href: `/#faq-${idx}`,
        external: false,
        icon: HelpCircle,
        keywords: `${f.q} ${f.a} ${f.keywords?.join(" ")}`.toLowerCase()
      });
    });

    // 7. Navigation Routes & Profiles
    (SITE_PAGES || []).forEach((pg) => {
      let IconCmp = FileText;
      if (pg.icon) {
        IconCmp = typeof pg.icon === "string" ? (ICON_MAP[pg.icon] || FileText) : pg.icon;
      }
      list.push({
        id: `page-${pg.label}`,
        label: pg.label,
        subtitle: pg.desc,
        badge: pg.external ? "External" : "Page",
        href: pg.href,
        external: pg.external,
        icon: IconCmp,
        keywords: `${pg.label} ${pg.desc} ${pg.keywords?.join(" ")} ${pg.href}`.toLowerCase()
      });
    });

    return list;
  }, []);

  // Filter items when query is present; otherwise show QUICK_LINKS
  const displayedItems = useMemo(() => {
    const cleanQ = query.trim().toLowerCase();
    if (!cleanQ) {
      return QUICK_LINKS;
    }

    const terms = cleanQ.split(/\s+/).filter(Boolean);
    return allSearchItems.filter((item) =>
      terms.every((term) => item.keywords.includes(term))
    );
  }, [query, allSearchItems]);

  const handleItemClick = (item) => {
    sound.playClick();
    onClose();

    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    const url = item.href;
    const hashIdx = url.indexOf("#");
    const targetHash = hashIdx !== -1 ? url.substring(hashIdx) : null;
    const targetId = targetHash ? targetHash.slice(1) : null;
    const targetPath = hashIdx !== -1 ? url.substring(0, hashIdx) : url;

    const currentPath = typeof window !== "undefined" ? window.location.pathname.replace(/\/+$/, "") || "/" : "/";
    const normalizedTargetPath = targetPath.replace(/\/+$/, "") || "/";

    const isSamePage =
      targetPath === "" ||
      (targetPath === "/" && (currentPath === "/" || currentPath.endsWith("/testing"))) ||
      currentPath === normalizedTargetPath ||
      currentPath.endsWith(normalizedTargetPath);

    if (isSamePage && targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          if (typeof window !== "undefined" && window.__lenis) {
            window.__lenis.start();
            window.__lenis.scrollTo(el, { offset: -96, duration: 1.0 });
          } else {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }

          // Pulse highlight ring
          el.classList.add("ring-2", "ring-[#B45309]", "ring-offset-4", "transition-all", "duration-500");
          setTimeout(() => {
            el.classList.remove("ring-2", "ring-[#B45309]", "ring-offset-4");
          }, 2500);
        }, 80);

        window.history.pushState(null, "", targetHash);
        return;
      }
    }

    // Navigate to destination route with hash
    window.location.href = url;
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      sound.playClick();
      setSelectedIndex((prev) => (prev + 1) % (displayedItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      sound.playClick();
      setSelectedIndex((prev) => (prev - 1 + (displayedItems.length || 1)) % (displayedItems.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (displayedItems[selectedIndex]) {
        handleItemClick(displayedItems[selectedIndex]);
      }
    }
  };

  return (
    <>
      {/* 1. FLOATING BOTTOM SEARCH DOCK TRIGGER BUTTON */}
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
          }}
          aria-label="Search portfolio"
          className="inline-flex shrink-0 items-center justify-center whitespace-nowrap border py-2 outline-none transition-all cursor-pointer select-none active:translate-y-px bg-white text-[#4A3B33] border-[#E4D9BC] hover:bg-[#F8F4EE] shadow-[var(--shadow-soft)] h-11 gap-2.5 rounded-lg px-4 sm:px-6 text-xs sm:text-sm font-semibold hover:-translate-y-px"
        >
          <Search className="w-4 h-4 text-[#B45309] shrink-0" />
          <span className="truncate max-w-[240px] sm:max-w-none">
            Search projects, stack, resources…
          </span>
          <kbd className="hidden sm:inline-flex ml-2 rounded border border-[#E4D9BC] bg-[#F8F4EE] px-1.5 py-0.5 font-mono text-[11px] text-[#78716C]">
            ⌘ K
          </kbd>
        </button>
      </div>

      {/* 2. SPOTLIGHT COMMAND PALETTE SEARCH MODAL */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="fixed inset-0 bg-[#1C1917]/60 backdrop-blur-xs z-50 pointer-events-auto"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
            />

            {/* Modal Flex Container */}
            <div 
              className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 pt-16 sm:pt-4 pointer-events-none"
              data-lenis-prevent="true"
            >
              <motion.div
                initial={{ y: -10, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -6, opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto relative w-full sm:max-w-xl flex flex-col rounded-xl sm:rounded-2xl border border-[#E4D9BC] bg-[#FDFBF7] shadow-[0_24px_64px_-12px_rgba(74,59,51,0.3)] overflow-hidden text-[#4A3B33]"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={handleKeyDown}
                data-lenis-prevent="true"
              >
                {/* Search Input Bar */}
                <div className="flex items-center gap-3 border-b border-[#E4D9BC]/80 px-4 py-3 bg-white shrink-0">
                  <Search className="w-4 h-4 text-[#B45309] shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    placeholder="Search projects, stack, resources, offers, FAQs…"
                    className="w-full bg-transparent text-sm text-[#4A3B33] placeholder-[#A8A29E] outline-none font-sans"
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        inputRef.current?.focus();
                      }}
                      className="text-[#A8A29E] hover:text-[#4A3B33] p-1 cursor-pointer"
                      title="Clear"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        onClose();
                      }}
                      className="text-[#A8A29E] hover:text-[#4A3B33] p-1 cursor-pointer"
                      title="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Section Header */}
                <div className="px-4 py-1.5 border-b border-[#E4D9BC]/50 bg-[#FAF6EE] text-[10.5px] font-mono font-semibold uppercase tracking-wider text-[#78716C] shrink-0 flex items-center justify-between">
                  <span>{query.trim() ? "Search Results" : "Quick Navigation"}</span>
                  <span className="text-[10px] text-[#A8A29E]">{displayedItems.length} items</span>
                </div>

                {/* Main Scrollable Results Container */}
                <div
                  ref={scrollContainerRef}
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                  data-lenis-prevent="true"
                  data-lenis-prevent-wheel="true"
                  data-lenis-prevent-touch="true"
                  className="max-h-[55vh] sm:max-h-[420px] overflow-y-auto overscroll-contain p-2 space-y-1 touch-pan-y"
                  style={{
                    WebkitOverflowScrolling: "touch",
                    overscrollBehavior: "contain",
                    scrollbarWidth: "thin"
                  }}
                >
                  {displayedItems.length === 0 ? (
                    <div className="py-10 text-center text-xs text-[#78716C] font-mono">
                      No matching results found for &ldquo;{query}&rdquo;
                    </div>
                  ) : (
                    displayedItems.map((item, idx) => {
                      const Icon = item.icon || FileText;
                      const isSelected = selectedIndex === idx;

                      return (
                        <div
                          key={item.id}
                          onClick={() => handleItemClick(item)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer select-none ${
                            isSelected
                              ? "bg-[#F3ECE0] text-[#4A3B33] font-medium"
                              : "text-[#57534E] hover:bg-[#F3ECE0]/70"
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#B45309]" : "text-[#78716C]"}`} />
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] text-[#4A3B33] font-medium truncate">
                              {item.label}
                            </div>
                            <div className="text-[11px] text-[#78716C] truncate font-sans">
                              {item.subtitle}
                            </div>
                          </div>
                          <span className="text-[9.5px] font-mono text-[#78716C] bg-white border border-[#E4D9BC] px-1.5 py-0.5 rounded shrink-0">
                            {item.badge}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#A8A29E] shrink-0" />
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Bottom Navigation Hint Bar */}
                <div className="flex items-center justify-between border-t border-[#E4D9BC]/80 px-4 py-2 text-[11px] font-mono text-[#78716C] bg-[#F8F4EE] shrink-0">
                  <div className="flex items-center gap-3">
                    <span>↑ ↓ navigate</span>
                    <span>↵ select</span>
                    <span>esc close</span>
                  </div>
                  <span className="text-[10px] text-[#78716C]">
                    Click row to jump directly
                  </span>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
