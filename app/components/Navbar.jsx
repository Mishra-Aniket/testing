'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ArrowRight, 
  Menu, 
  X, 
  Volume2, 
  VolumeX,
  Scale,
  BookOpen,
  FileText,
  Code2,
  CreditCard,
  FlaskConical,
  ArrowUpRight,
  Sparkles,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function Navbar({
  onOpenSearch,
  onOpenAssessment,
  onOpenCompare,
  onOpenResources,
  onOpenPricing,
  onOpenDocs,
  onOpenLabs,
  onOpenBlog
}) {
  const pathname = usePathname() || '';
  const isCompareActive = pathname.startsWith('/compare');
  const isResourcesActive = pathname.startsWith('/use-cases') || pathname === '/security' || pathname === '/creators-program';
  const isBlogActive = pathname.startsWith('/blog');
  const isDocsActive = pathname.startsWith('/docs');
  const isPricingActive = pathname === '/pricing';
  const isLabsActive = pathname === '/labs';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [soundActive, setSoundActive] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);
  const accumulatedDelta = useRef(0);

  useEffect(() => {
    setSoundActive(sound.isEnabled());
    const onSoundChange = (e) => {
      setSoundActive(e.detail);
    };
    window.addEventListener('aniket_sound_change', onSoundChange);
    return () => window.removeEventListener('aniket_sound_change', onSoundChange);
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Exact 1:1 implementation from getalchemystai.com:
  // r < 120 ? F(!1) : s > 6 ? F(!0) : s < -4 && F(!1)
  // document.elementsFromPoint(window.innerWidth/2, 44) for pixel-perfect dark theme detection
  useEffect(() => {
    let lastY = window.scrollY;
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const currentY = window.scrollY;
      setIsScrolled(currentY > 12);

      const diff = currentY - lastY;
      if (currentY < 120) {
        setIsHidden(false);
      } else if (diff > 6) {
        setIsHidden(true);
      } else if (diff < -4) {
        setIsHidden(false);
      }
      lastY = currentY;

      // Pixel-perfect dark theme detection when navbar overlaps dark sections (DarkCTA, Footer, etc.)
      if (typeof document !== 'undefined') {
        const navY = 56;
        const darkElements = document.querySelectorAll('[data-theme="dark"], #dark-cta-section, footer');
        let darkFound = false;
        for (let i = 0; i < darkElements.length; i++) {
          const el = darkElements[i];
          if (el.closest('nav[data-site-nav]')) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= navY && rect.bottom >= navY) {
            darkFound = true;
            break;
          }
        }
        setIsDarkTheme(darkFound);
      }
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  // Lock body scroll and Lenis when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.stop();
      }
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Automatically close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileExpandedSection(null);
  }, [pathname]);

  const handleToggleSound = (e) => {
    e.stopPropagation();
    const next = sound.toggle();
    setSoundActive(next);
  };

  const isNavVisible = !isHidden || !!activeDropdown || mobileMenuOpen;

  return (
    <>
      <motion.header
        className="fixed top-3 md:top-4 left-0 right-0 z-50 px-3 md:px-6 flex justify-center pointer-events-none"
        initial={false}
        animate={{
          y: isNavVisible ? 0 : -96,
          opacity: isNavVisible ? 1 : 0
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        <div className="pointer-events-auto w-full max-w-[1200px] flex flex-col overflow-hidden max-h-[calc(100dvh-0.5rem)]">
          <nav
            data-site-nav="true"
            data-theme={isDarkTheme ? "dark" : undefined}
            aria-label="Primary"
            className={`w-full flex items-center justify-between gap-4 sm:gap-6 rounded-[calc(var(--radius)+4px)] border pl-4 sm:pl-5 pr-2 py-2 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-300 ${
              isDarkTheme 
                ? "bg-[#1C1917]/75 border-white/[0.08]" 
                : isScrolled
                  ? "bg-[#FDFBF7]/85 border-[#E4D9BC]"
                  : "bg-[#FDFBF7]/55 border-[#E4D9BC]/70"
            } ${
              isScrolled
                ? isDarkTheme
                  ? "shadow-[0_12px_32px_-16px_rgba(0,0,0,0.6)]"
                  : "shadow-[0_12px_32px_-16px_rgba(74,59,51,0.24)]"
                : ""
            }`}
          >
          {/* Logo */}
          <Link href="/" onClick={() => sound.playClick()} className="relative flex items-center gap-1.5 sm:gap-2 group shrink-0">
            <span className={`text-2xl font-black leading-none transform transition-transform group-hover:scale-110 ${
              isDarkTheme ? "text-[#E4C090]" : "text-[#B45309]"
            }`}>
              ▲
            </span>
            <span className="font-serif font-black text-xl tracking-tight nav-brand-text">
              ANIKET
            </span>
            <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded tracking-widest border nav-brand-tag">
              .ONE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 text-[0.875rem] font-medium">
            {/* Compare Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('compare')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                href="/compare"
                onClick={() => sound.playClick()}
                className={`nav-link relative flex items-center gap-1 px-3 py-2 ${
                  isCompareActive ? "!text-[color:var(--ink)] font-bold" : ""
                }`}
              >
                <span>Compare</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-300 ${
                  activeDropdown === 'compare' ? 'rotate-180' : ''
                }`} />
                {isCompareActive && (
                  <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                    isDarkTheme ? "bg-[#E4C090]" : "bg-[#B45309]"
                  }`} />
                )}
              </Link>
              <AnimatePresence>
                {activeDropdown === 'compare' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.985 }}
                    transition={{ duration: 0.2 }}
                    style={{ transformOrigin: "top left" }}
                    className={`absolute top-full left-0 mt-2 w-72 rounded-[calc(var(--radius)+2px)] border p-1.5 backdrop-blur-xl shadow-2xl z-50 transition-colors duration-300 ${
                      isDarkTheme 
                        ? "border-white/[0.12] bg-[#1C1917]/95 text-[#F5F5F4]" 
                        : "border-[#E4D9BC] bg-[#FDFBF7]/95 text-[#4A3B33]"
                    }`}
                  >
                    {[
                      { label: "Aniket vs Mem0", href: "/compare/aniket-vs-mem0" },
                      { label: "Aniket vs Glean", href: "/compare/aniket-vs-glean" },
                      { label: "Aniket vs Palantir", href: "/compare/aniket-vs-palantir" },
                      { label: "Claude Memory vs Aniket", href: "/compare/aniket-vs-claude" },
                      { label: "LangChain Memory vs Aniket", href: "/compare/aniket-vs-langchain" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          sound.playClick();
                          setActiveDropdown(null);
                        }}
                        className={`w-full text-left flex items-center justify-between px-3.5 py-2 text-[0.875rem] rounded-[var(--radius)] transition-colors ${
                          pathname === item.href 
                            ? (isDarkTheme ? "text-[#E4C090] bg-white/[0.08] font-semibold" : "text-[#B45309] bg-[#B45309]/10 font-semibold") 
                            : (isDarkTheme ? "text-[#D6D3D1] hover:text-[#E4C090] hover:bg-white/[0.05]" : "text-[#4A3B33] hover:text-[#B45309] hover:bg-black/[0.03]")
                        }`}
                      >
                        <span>{item.label}</span>
                        {pathname === item.href && (
                          <span className={`w-1.5 h-1.5 rounded-full ${isDarkTheme ? "bg-[#E4C090]" : "bg-[#B45309]"}`} />
                        )}
                      </Link>
                    ))}
                    <div className={`my-1.5 h-px ${isDarkTheme ? "bg-white/10" : "bg-[#E4D9BC]/70"}`} />
                    <Link
                      href="/compare"
                      onClick={() => {
                        sound.playClick();
                        setActiveDropdown(null);
                      }}
                      className={`w-full text-left flex items-center justify-between px-3.5 py-2 text-[0.875rem] font-bold rounded-[var(--radius)] transition-colors ${
                        isDarkTheme ? "text-[#E4C090] hover:text-white hover:bg-white/[0.05]" : "text-[#B45309] hover:text-[#A16207] hover:bg-black/[0.03]"
                      }`}
                    >
                      <span>See all comparisons</span>
                      <span className="text-sm">→</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/use-cases"
                onClick={() => sound.playClick()}
                className={`nav-link relative flex items-center gap-1 px-3 py-2 ${
                  isResourcesActive ? "!text-[color:var(--ink)] font-bold" : ""
                }`}
              >
                <span>Resources</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-300 ${
                  activeDropdown === 'resources' ? 'rotate-180' : ''
                }`} />
                {isResourcesActive && (
                  <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                    isDarkTheme ? "bg-[#E4C090]" : "bg-[#B45309]"
                  }`} />
                )}
              </Link>
              <AnimatePresence>
                {activeDropdown === 'resources' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.985 }}
                    transition={{ duration: 0.2 }}
                    style={{ transformOrigin: "top left" }}
                    className={`absolute top-full left-0 mt-2 w-56 rounded-[calc(var(--radius)+2px)] border p-1.5 backdrop-blur-xl shadow-2xl z-50 transition-colors duration-300 ${
                      isDarkTheme 
                        ? "border-white/[0.12] bg-[#1C1917]/95 text-[#F5F5F4]" 
                        : "border-[#E4D9BC] bg-[#FDFBF7]/95 text-[#4A3B33]"
                    }`}
                  >
                    {[
                      { label: "Use Cases", href: "/use-cases" },
                      { label: "Case Studies", href: "/use-cases" },
                      { label: "Security & Trust", href: "/security" },
                      { label: "Creators Program", href: "/creators-program" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          sound.playClick();
                          setActiveDropdown(null);
                        }}
                        className={`w-full text-left flex items-center justify-between px-3.5 py-2 text-[0.875rem] rounded-[var(--radius)] transition-colors ${
                          pathname === item.href 
                            ? (isDarkTheme ? "text-[#E4C090] bg-white/[0.08] font-semibold" : "text-[#B45309] bg-[#B45309]/10 font-semibold") 
                            : (isDarkTheme ? "text-[#D6D3D1] hover:text-[#E4C090] hover:bg-white/[0.05]" : "text-[#4A3B33] hover:text-[#B45309] hover:bg-black/[0.03]")
                        }`}
                      >
                        <span>{item.label}</span>
                        {pathname === item.href && (
                          <span className={`w-1.5 h-1.5 rounded-full ${isDarkTheme ? "bg-[#E4C090]" : "bg-[#B45309]"}`} />
                        )}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/blog"
              onClick={() => sound.playClick()}
              className={`nav-link relative px-3 py-2 ${
                isBlogActive ? "!text-[color:var(--ink)] font-bold" : ""
              }`}
            >
              Blog
              {isBlogActive && (
                <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                  isDarkTheme ? "bg-[#E4C090]" : "bg-[#B45309]"
                }`} />
              )}
            </Link>

            <Link
              href="/docs"
              onClick={() => sound.playClick()}
              className={`nav-link relative px-3 py-2 ${
                isDocsActive ? "!text-[color:var(--ink)] font-bold" : ""
              }`}
            >
              Docs
              {isDocsActive && (
                <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                  isDarkTheme ? "bg-[#E4C090]" : "bg-[#B45309]"
                }`} />
              )}
            </Link>

            <Link
              href="/pricing"
              onClick={() => sound.playClick()}
              className={`nav-link relative px-3 py-2 ${
                isPricingActive ? "!text-[color:var(--ink)] font-bold" : ""
              }`}
            >
              Pricing
              {isPricingActive && (
                <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                  isDarkTheme ? "bg-[#E4C090]" : "bg-[#B45309]"
                }`} />
              )}
            </Link>

            <Link
              href="/labs"
              onClick={() => sound.playClick()}
              className={`nav-link relative px-3 py-2 ${
                isLabsActive ? "!text-[color:var(--ink)] font-bold" : ""
              }`}
            >
              Labs
              {isLabsActive && (
                <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                  isDarkTheme ? "bg-[#E4C090]" : "bg-[#B45309]"
                }`} />
              )}
            </Link>
          </div>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* GitHub Star / Profile Pill */}
            <a
              href="https://github.com/aniketmishra-0"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="nav-btn-ghost inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[var(--radius)] font-mono text-[11px] font-semibold border shadow-xs transition-all duration-200"
              title="GitHub: @aniketmishra-0"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </a>

            {/* Audio Toggle Button */}
            <button
              onClick={handleToggleSound}
              type="button"
              data-custom-sound="true"
              className={`nav-btn-ghost inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[var(--radius)] font-mono text-[11px] font-semibold border transition-all duration-200 ${
                soundActive ? (isDarkTheme ? "!text-[#E4C090] !border-[#E4C090]/40" : "!text-[#B45309] !border-[#B45309]/40") : ""
              }`}
              title={soundActive ? "Mute interface sound" : "Enable interface sound"}
            >
              {soundActive ? <Volume2 className={`w-3.5 h-3.5 ${isDarkTheme ? "text-[#E4C090]" : "text-[#B45309]"}`} /> : <VolumeX className="w-3.5 h-3.5 text-[#A8A29E]" />}
              <span className="tracking-wide">{soundActive ? "SFX ON" : "SFX OFF"}</span>
            </button>

            <Link
              href="#get-access"
              onClick={() => sound.playClick()}
              className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-[#B45309] px-5 py-2 text-[0.8125rem] font-bold text-white shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-px hover:bg-[#A16207]"
            >
              Sign In
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={handleToggleSound}
              type="button"
              data-custom-sound="true"
              className={`p-1.5 rounded-lg border transition-colors ${
                isDarkTheme ? "border-white/15 text-[#D6D3D1]" : "border-[#E4D9BC] text-[#78716C]"
              }`}
              aria-label="Toggle sound"
            >
              {soundActive ? <Volume2 className={`w-4 h-4 ${isDarkTheme ? "text-[#E4C090]" : "text-[#B45309]"}`} /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className={`p-2 transition-colors ${
                isDarkTheme ? "text-[#F5F5F4] hover:text-[#E4C090]" : "text-[#4A3B33] hover:text-[#B45309]"
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Integrated In-Navbar Mobile Drawer (unfolds directly from inside navbar) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden border-t border-[#E4D9BC] px-3.5 py-3 sm:px-6 sm:py-5 overflow-y-auto overscroll-contain bg-[#FDFBF7] flex flex-col gap-3 max-h-[calc(100dvh-4.25rem)] touch-pan-y"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {/* Header Label inside Drawer */}
              <div className="flex items-center justify-between px-2 pb-1.5 border-b border-[#E4D9BC]/50">
                <span className="font-mono text-[10px] font-semibold tracking-wider text-[#78716C] uppercase">
                  Navigation
                </span>
                <span className="font-mono text-[9.5px] text-[#A8A29E] tracking-tight">
                  aniket.one
                </span>
              </div>

              {/* UNIFIED LUXURY PANEL: Clean, spacious cards matching the app design system */}
              <div className="rounded-2xl border border-[#E4D9BC] bg-white shadow-[0_4px_24px_-8px_rgba(74,59,51,0.06)] overflow-hidden divide-y divide-[#E4D9BC]/50">
                {/* 1. Compare Accordion Popup */}
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setMobileExpandedSection(prev => prev === 'compare' ? null : 'compare');
                    }}
                    className={`w-full flex items-center justify-between p-4 sm:p-4.5 text-left transition-all cursor-pointer ${
                      mobileExpandedSection === 'compare' ? 'bg-[#FAF6EE]/90' : 'hover:bg-[#FAF6EE]/50 active:bg-[#FAF6EE]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        mobileExpandedSection === 'compare' 
                          ? 'bg-[#B45309] text-white shadow-xs' 
                          : 'bg-[#FAF6EE] text-[#B45309] border border-[#E4D9BC]/70'
                      }`}>
                        <Scale className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[15px] sm:text-base font-serif font-bold text-[#4A3B33] tracking-tight">
                          Compare
                        </div>
                        <div className="text-[12px] font-sans text-[#A8A29E] truncate font-normal mt-0.5">
                          Benchmarks vs Mem0, Glean, Palantir &amp; more
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <ChevronDown 
                        className={`w-4 h-4 text-[#A8A29E] transition-transform duration-200 ${
                          mobileExpandedSection === 'compare' ? 'rotate-180 text-[#B45309]' : ''
                        }`} 
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileExpandedSection === 'compare' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="border-t border-[#E4D9BC]/50 bg-[#FAF6EE]/40 px-3 py-2.5 space-y-1"
                      >
                        {[
                          { label: "Aniket vs Mem0", desc: "Vector Memory vs Sovereign Layer", href: "/compare/aniket-vs-mem0" },
                          { label: "Aniket vs Glean", desc: "Enterprise Search vs Sovereign Graph", href: "/compare/aniket-vs-glean" },
                          { label: "Aniket vs Palantir", desc: "Heavyweight Foundry vs 1-Line API", href: "/compare/aniket-vs-palantir" },
                          { label: "Claude Memory vs Aniket", desc: "Siloed Cache vs Cross-Model", href: "/compare/aniket-vs-claude" },
                          { label: "LangChain Memory vs Aniket", desc: "Manual State vs Autonomous Engine", href: "/compare/aniket-vs-langchain" },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              sound.playClick();
                              setMobileMenuOpen(false);
                            }}
                            className="flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-white hover:shadow-xs transition-all group"
                          >
                            <div className="min-w-0 pr-2">
                              <div className="text-[13px] font-semibold text-[#4A3B33] group-hover:text-[#B45309] transition-colors">
                                {item.label}
                              </div>
                              <div className="text-[11px] text-[#A8A29E] font-mono truncate">
                                {item.desc}
                              </div>
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#A8A29E] group-hover:text-[#B45309] shrink-0 transition-colors" />
                          </Link>
                        ))}

                        <Link
                          href="/compare"
                          onClick={() => {
                            sound.playClick();
                            setMobileMenuOpen(false);
                          }}
                          className="flex items-center justify-between p-2.5 text-[11.5px] font-mono font-bold text-[#B45309] bg-[#B45309]/10 hover:bg-[#B45309]/15 rounded-xl transition-colors mt-1"
                        >
                          <span>Explore full benchmark matrix</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Resources Accordion Popup */}
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setMobileExpandedSection(prev => prev === 'resources' ? null : 'resources');
                    }}
                    className={`w-full flex items-center justify-between p-4 sm:p-4.5 text-left transition-all cursor-pointer ${
                      mobileExpandedSection === 'resources' ? 'bg-[#FAF6EE]/90' : 'hover:bg-[#FAF6EE]/50 active:bg-[#FAF6EE]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        mobileExpandedSection === 'resources'
                          ? 'bg-[#B45309] text-white shadow-xs'
                          : 'bg-[#FAF6EE] text-[#B45309] border border-[#E4D9BC]/70'
                      }`}>
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[15px] sm:text-base font-serif font-bold text-[#4A3B33] tracking-tight">
                          Resources
                        </div>
                        <div className="text-[12px] font-sans text-[#A8A29E] truncate font-normal mt-0.5">
                          Use cases, case studies, security &amp; creators
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <ChevronDown 
                        className={`w-4 h-4 text-[#A8A29E] transition-transform duration-200 ${
                          mobileExpandedSection === 'resources' ? 'rotate-180 text-[#B45309]' : ''
                        }`} 
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileExpandedSection === 'resources' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="border-t border-[#E4D9BC]/50 bg-[#FAF6EE]/40 px-3 py-2.5 space-y-1"
                      >
                        {[
                          { label: "Use Cases", desc: "Finance, Customer Ops, HR & Health", href: "/use-cases" },
                          { label: "Case Studies", desc: "Production sub-300ms agent deployments", href: "/use-cases" },
                          { label: "Security & Sovereignty", desc: "SOC 2, zero retention & sovereign VPC", href: "/security" },
                          { label: "Creators Program", desc: "Early API access & research grants", href: "/creators-program" },
                        ].map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => {
                              sound.playClick();
                              setMobileMenuOpen(false);
                            }}
                            className="flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-white hover:shadow-xs transition-all group"
                          >
                            <div className="min-w-0 pr-2">
                              <div className="text-[13px] font-semibold text-[#4A3B33] group-hover:text-[#B45309] transition-colors">
                                {item.label}
                              </div>
                              <div className="text-[11px] text-[#A8A29E] font-mono truncate">
                                {item.desc}
                              </div>
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#A8A29E] group-hover:text-[#B45309] shrink-0 transition-colors" />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Blog */}
                <Link
                  href="/blog"
                  onClick={() => {
                    sound.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-4 sm:p-4.5 text-left hover:bg-[#FAF6EE]/50 active:bg-[#FAF6EE] transition-all group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] text-[#B45309] border border-[#E4D9BC]/70 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[15px] sm:text-base font-serif font-bold text-[#4A3B33] tracking-tight group-hover:text-[#B45309] transition-colors">
                        Blog
                      </div>
                      <div className="text-[12px] font-sans text-[#A8A29E] truncate font-normal mt-0.5">
                        Context Tracing with OpenAI Euphony
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <ArrowUpRight className="w-4 h-4 text-[#A8A29E] group-hover:text-[#B45309] transition-colors" />
                  </div>
                </Link>

                {/* 4. Docs Accordion Popup */}
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setMobileExpandedSection(prev => prev === 'docs' ? null : 'docs');
                    }}
                    className={`w-full flex items-center justify-between p-4 sm:p-4.5 text-left transition-all cursor-pointer ${
                      mobileExpandedSection === 'docs' ? 'bg-[#FAF6EE]/90' : 'hover:bg-[#FAF6EE]/50 active:bg-[#FAF6EE]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        mobileExpandedSection === 'docs'
                          ? 'bg-[#B45309] text-white shadow-xs'
                          : 'bg-[#FAF6EE] text-[#B45309] border border-[#E4D9BC]/70'
                      }`}>
                        <Code2 className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[15px] sm:text-base font-serif font-bold text-[#4A3B33] tracking-tight">
                          Docs
                        </div>
                        <div className="text-[12px] font-sans text-[#A8A29E] truncate font-normal mt-0.5">
                          Quickstarts, SDKs &amp; context thesis
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <ChevronDown 
                        className={`w-4 h-4 text-[#A8A29E] transition-transform duration-200 ${
                          mobileExpandedSection === 'docs' ? 'rotate-180 text-[#B45309]' : ''
                        }`} 
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileExpandedSection === 'docs' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="border-t border-[#E4D9BC]/50 bg-[#FAF6EE]/40 px-3 py-2.5 space-y-1"
                      >
                        {[
                          { label: "Overview & Quickstart", desc: "Install & instantiate in under 3 mins", href: "/docs" },
                          { label: "Python SDK (aniket-sdk)", desc: "pip install aniket-sdk", href: "/docs" },
                          { label: "Node.js SDK (@aniket/core)", desc: "npm i @aniket/core", href: "/docs" },
                          { label: "Context Thesis", desc: "Why institutional context compounds", href: "/thesis" },
                        ].map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => {
                              sound.playClick();
                              setMobileMenuOpen(false);
                            }}
                            className="flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-white hover:shadow-xs transition-all group"
                          >
                            <div className="min-w-0 pr-2">
                              <div className="text-[13px] font-semibold text-[#4A3B33] group-hover:text-[#B45309] transition-colors">
                                {item.label}
                              </div>
                              <div className="text-[11px] text-[#A8A29E] font-mono truncate">
                                {item.desc}
                              </div>
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#A8A29E] group-hover:text-[#B45309] shrink-0 transition-colors" />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 5. Pricing */}
                <Link
                  href="/pricing"
                  onClick={() => {
                    sound.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-4 sm:p-4.5 text-left hover:bg-[#FAF6EE]/50 active:bg-[#FAF6EE] transition-all group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] text-[#B45309] border border-[#E4D9BC]/70 flex items-center justify-center shrink-0">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[15px] sm:text-base font-serif font-bold text-[#4A3B33] tracking-tight group-hover:text-[#B45309] transition-colors">
                        Pricing
                      </div>
                      <div className="text-[12px] font-sans text-[#A8A29E] truncate font-normal mt-0.5">
                        Free developer tier to sovereign enterprise
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <ArrowUpRight className="w-4 h-4 text-[#A8A29E] group-hover:text-[#B45309] transition-colors" />
                  </div>
                </Link>

                {/* 6. Labs */}
                <Link
                  href="/labs"
                  onClick={() => {
                    sound.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-4 sm:p-4.5 text-left hover:bg-[#FAF6EE]/50 active:bg-[#FAF6EE] transition-all group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] text-[#B45309] border border-[#E4D9BC]/70 flex items-center justify-center shrink-0">
                      <FlaskConical className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[15px] sm:text-base font-serif font-bold text-[#4A3B33] tracking-tight group-hover:text-[#B45309] transition-colors">
                        Labs
                      </div>
                      <div className="text-[12px] font-sans text-[#A8A29E] truncate font-normal mt-0.5">
                        Interactive multi-model sovereignty sandbox
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <ArrowUpRight className="w-4 h-4 text-[#A8A29E] group-hover:text-[#B45309] transition-colors" />
                  </div>
                </Link>
              </div>

              {/* Bottom Drawer Actions with Authentic Social SVGs + High-End CTA */}
              <div className="pt-2 flex flex-col gap-3">
                {/* Social profiles bar with authentic SVG icons */}
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href="https://github.com/aniketmishra-0"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border border-[#E4D9BC] bg-white hover:border-[#B45309] hover:bg-[#FAF6EE] text-[#4A3B33] font-mono text-xs shadow-2xs transition-all active:scale-[0.98]"
                  >
                    <svg className="w-3.5 h-3.5 fill-current text-[#4A3B33]" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aniketmishra0"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border border-[#E4D9BC] bg-white hover:border-[#B45309] hover:bg-[#FAF6EE] text-[#4A3B33] font-mono text-xs shadow-2xs transition-all active:scale-[0.98]"
                  >
                    <svg className="w-3.5 h-3.5 fill-current text-[#0A66C2]" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://x.com/aniketmishra0"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border border-[#E4D9BC] bg-white hover:border-[#B45309] hover:bg-[#FAF6EE] text-[#4A3B33] font-mono text-xs shadow-2xs transition-all active:scale-[0.98]"
                  >
                    <svg className="w-3.5 h-3.5 fill-current text-[#4A3B33]" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>X</span>
                  </a>
                </div>

                {/* Primary Call to Action Button */}
                <Link
                  href="#get-access"
                  onClick={() => {
                    sound.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="group relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B45309] to-[#92400E] px-5 py-3 font-sans font-bold text-white shadow-[0_8px_24px_-6px_rgba(180,83,9,0.35)] transition-all duration-200 hover:brightness-105 active:scale-[0.98]"
                >
                  <span className="tracking-wide">Request API Access</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                {/* Trust guarantee subtext */}
                <div className="text-center font-mono text-[9.5px] text-[#A8A29E] tracking-tight">
                  ✦ Instant Sandbox · Python &amp; Node.js SDKs · No Credit Card Required
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  </motion.header>

  {/* Soft Backdrop Overlay outside header */}
  <AnimatePresence>
    {mobileMenuOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => setMobileMenuOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden"
      />
    )}
  </AnimatePresence>
</>
  );
}
