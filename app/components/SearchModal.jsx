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
  Mail
};

// 1:1 Clean Quick links matching getalchemystai.com (Image 2)
const QUICK_LINKS = [
  {
    id: "quick-home",
    label: "Home",
    href: "/#hero",
    icon: Home
  },
  {
    id: "quick-work",
    label: "Projects",
    href: "/#work",
    icon: Folder
  },
  {
    id: "quick-services",
    label: "Services",
    href: "/#services",
    icon: Rocket
  },
  {
    id: "quick-stack",
    label: "Tech Stack",
    href: "/#stack",
    icon: Layers
  },
  {
    id: "quick-students",
    label: "Students",
    href: "/students",
    icon: GraduationCap
  },
  {
    id: "quick-walkthrough",
    label: "Architecture",
    href: "/#how-it-works",
    icon: Cpu
  },
  {
    id: "quick-faq",
    label: "FAQ",
    href: "/#faq",
    icon: HelpCircle
  },
  {
    id: "quick-contact",
    label: "Contact",
    href: "/#get-access",
    icon: Mail
  }
];

export default function SearchModal({ isOpen, onOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Sync with mobile menu state to avoid overlapping
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

  // Click outside to close (without darkening the screen)
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        const dockEl = document.querySelector('[data-bottom-search-dock="true"]');
        if (dockEl && dockEl.contains(e.target)) return;
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle open/close: stop Lenis for smooth modal scrolling, focus input
  useEffect(() => {
    if (isOpen) {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.stop();
      }

      // Only auto-focus on desktop with fine pointer.
      // On mobile/touch devices, avoid auto-focusing so the on-screen virtual keyboard
      // does not block the screen until the user explicitly taps the search input.
      const isMobileOrTouch =
        typeof window !== "undefined" &&
        (window.innerWidth < 768 ||
          window.matchMedia("(pointer: coarse)").matches ||
          "ontouchstart" in window ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

      if (!isMobileOrTouch) {
        setTimeout(() => inputRef.current?.focus(), 60);
      }
    } else {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
      setQuery("");
      setSelectedIndex(0);
    }

    return () => {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [isOpen]);

  // Build the complete search index dynamically with clean single-line labels
  const allSearchItems = useMemo(() => {
    const list = [];

    // 1. Projects -> Exact project cards (#project-${p.id})
    (PROJECTS || []).forEach((p) => {
      list.push({
        id: `proj-${p.id}`,
        label: p.title,
        href: `/#project-${p.id}`,
        icon: Folder,
        keywords: `${p.title} ${p.subtitle} ${p.category} ${p.tags?.join(" ")} ${p.description} ${p.metrics}`.toLowerCase()
      });
    });

    // 2. Services -> Exact service cards (#service-${s.id})
    (SERVICES || []).forEach((s) => {
      list.push({
        id: `srv-${s.id}`,
        label: s.title,
        href: `/#service-${s.id}`,
        icon: Rocket,
        keywords: `${s.title} ${s.tagline} ${s.deliverables?.join(" ")} ${s.description} ${s.turnaround}`.toLowerCase()
      });
    });

    // 3. Tech Stack Layers -> Exact layer in 3D Stack Diagram (#stack-${sl.id})
    (STACK_LAYERS || []).forEach((sl) => {
      list.push({
        id: `stack-${sl.id || sl.idx}`,
        label: `${sl.title} (${(sl.techs || []).slice(0, 3).join(", ")})`,
        href: `/#stack-${sl.id || "stack"}`,
        icon: Layers,
        keywords: `${sl.title} ${sl.techs?.join(" ")} ${sl.body} ${sl.keywords?.join(" ")}`.toLowerCase()
      });
    });

    // 4. Student Resources -> Exact resource cards on /students (#resource-${r.id})
    (STUDENT_RESOURCES || []).forEach((r) => {
      list.push({
        id: `res-${r.id}`,
        label: `${r.title} · ${r.category}`,
        href: `/students#resource-${r.id}`,
        icon: BookOpen,
        keywords: `${r.title} ${r.category} ${r.tagline} ${r.description} ${r.tags?.join(" ")}`.toLowerCase()
      });
    });

    // 5. Student Offers & Perks -> Exact offer cards on /students (#student-${st.id})
    (STUDENT_OFFERS || []).forEach((st) => {
      list.push({
        id: `student-${st.id}`,
        label: `${st.title} (${st.badge})`,
        href: `/students#student-${st.id}`,
        icon: GraduationCap,
        keywords: `${st.title} ${st.highlight} ${st.tagline} ${st.description}`.toLowerCase()
      });
    });

    // 6. Frequently Asked Questions -> Exact FAQ item (#faq-${idx})
    (FAQS || []).forEach((f, idx) => {
      list.push({
        id: `faq-${idx}`,
        label: f.q,
        href: `/#faq-${idx}`,
        icon: HelpCircle,
        keywords: `${f.q} ${f.a} ${f.keywords?.join(" ")}`.toLowerCase()
      });
    });

    // 7. Site Navigation Pages
    (SITE_PAGES || []).forEach((pg) => {
      let IconCmp = FileText;
      if (pg.icon) {
        IconCmp = typeof pg.icon === "string" ? (ICON_MAP[pg.icon] || FileText) : pg.icon;
      }
      list.push({
        id: `page-${pg.label}`,
        label: pg.label,
        href: pg.href,
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
          isMobileMenuOpen
            ? "opacity-0 pointer-events-none scale-95"
            : "opacity-100 pointer-events-auto scale-100"
        }`}
      >
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            if (isOpen) {
              onClose();
            } else {
              onOpen();
            }
          }}
          aria-label="Search pages or ask Aniket"
          className="inline-flex shrink-0 items-center justify-center whitespace-nowrap border py-2 outline-none transition-all cursor-pointer select-none active:translate-y-px h-11 gap-2.5 rounded-lg px-4 sm:px-6 text-xs sm:text-sm font-semibold shadow-[var(--shadow-soft)] hover:-translate-y-px bg-white text-[#4A3B33] border-[#E4D9BC] hover:bg-[#F8F4EE]"
        >
          <Search className="w-4 h-4 text-[#B45309] shrink-0" />
          <span className="truncate max-w-[240px] sm:max-w-none">
            Search or Ask &ldquo;What projects has Aniket built?&rdquo;
          </span>
          <kbd className="hidden sm:inline-flex ml-2 rounded border border-[#E4D9BC] bg-[#F8F4EE] px-1.5 py-0.5 font-mono text-[11px] text-[#78716C]">
            ⌘ K
          </kbd>
        </button>
      </div>

      {/* 2. EXACT 1:1 POPOVER SEARCH MODAL (Matching Image 2 getalchemystai.com) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Transparent click-outside dismiss backdrop (Zero dark overlay, background remains 100% visible) */}
            <div
              className="fixed inset-0 z-40 bg-transparent cursor-default"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
            />

            {/* Centered flex wrapper anchored directly above the bottom dock */}
            <div
              className="fixed inset-x-0 bottom-[calc(max(1rem,env(safe-area-inset-bottom))+3.5rem)] z-50 flex justify-center px-3 sm:px-4 pointer-events-none"
              data-lenis-prevent="true"
            >
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, y: 8, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.99 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto w-full max-w-[490px] overflow-hidden rounded-xl border border-[#E4D9BC] bg-[#FDFBF7] shadow-[0_16px_40px_rgba(74,59,51,0.14)] text-[#4A3B33] flex flex-col"
                onKeyDown={handleKeyDown}
                data-lenis-prevent="true"
              >
                {/* Header Row: Title & Close Button matching Image 2 */}
                <div className="flex items-center justify-between gap-3 border-b border-[#E4D9BC]/60 px-4 py-2.5 bg-transparent shrink-0">
                  <h2 className="text-sm font-medium text-[#4A3B33]">
                    Explore Aniket
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onClose();
                    }}
                    className="rounded p-1 text-[#78716C] hover:bg-black/5 hover:text-[#4A3B33] transition-colors cursor-pointer"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Input Group: Exact orange/amber border input matching Image 2 */}
                <div className="p-3 pb-1 shrink-0">
                  <div
                    onClick={() => inputRef.current?.focus()}
                    className="flex items-center gap-2.5 rounded-lg border border-[#B45309] bg-white px-3 py-2 shadow-2xs transition-all cursor-text"
                  >
                    <Search className="w-4 h-4 text-[#78716C] shrink-0 opacity-70" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setSelectedIndex(0);
                      }}
                      placeholder="Find a page or ask a question…"
                      className="w-full bg-transparent text-[13.5px] text-[#4A3B33] placeholder-[#A8A29E] outline-none font-sans"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => {
                          setQuery("");
                          inputRef.current?.focus();
                        }}
                        className="text-[#A8A29E] hover:text-[#4A3B33] p-0.5 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Sub-heading Label: Quick links / Search results */}
                <div className="px-4 pt-2 pb-1 text-xs font-mono font-medium text-[#78716C] shrink-0">
                  {query.trim() ? "Search results" : "Quick links"}
                </div>

                {/* Scrollable Items List: Clean single-line rows with Home selected by default */}
                <div
                  ref={scrollContainerRef}
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                  data-lenis-prevent="true"
                  data-lenis-prevent-wheel="true"
                  data-lenis-prevent-touch="true"
                  className="max-h-[min(22rem,calc(100dvh-14rem))] overflow-y-auto overscroll-contain px-2 py-1 space-y-0.5 touch-pan-y"
                  style={{
                    WebkitOverflowScrolling: "touch",
                    overscrollBehavior: "contain",
                    scrollbarWidth: "none"
                  }}
                >
                  {displayedItems.length === 0 ? (
                    <div className="py-8 text-center text-xs text-[#78716C] font-mono">
                      No results found for &ldquo;{query}&rdquo;
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
                          className={`group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors cursor-pointer select-none ${
                            isSelected
                              ? "bg-[#F3ECE0] text-[#4A3B33] font-medium"
                              : "text-[#57534E] hover:bg-[#F3ECE0]/70"
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                            isSelected ? "text-[#B45309]" : "text-[#78716C]"
                          }`} />
                          <span className="flex-1 truncate text-[13.5px]">
                            {item.label}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#A8A29E] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer Row: Keyboard navigation hints */}
                <div className="flex items-center justify-between border-t border-[#E4D9BC]/60 px-4 py-2 text-xs text-[#78716C] font-mono shrink-0 bg-transparent">
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
