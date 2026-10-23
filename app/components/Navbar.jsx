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
  ShieldCheck,
  Search
} from 'lucide-react';
import { sound } from '../utils/sound';
import MonogramAM from './MonogramAM';

const NAV_PROJECTS = [
  {
    name: "OmTabs",
    tagline: "Custom tab renaming & biometric shield in MV3",
    badge: "Chrome Store",
    href: "https://chromewebstore.google.com/detail/omtabs/innncdapnjlnjdgkdjjajbiebeppieaf",
    external: true,
  },
  {
    name: "OmSpace",
    tagline: "Customizable new-tab productivity studio",
    badge: "Chrome Store",
    href: "https://chromewebstore.google.com/detail/omspace-new-tab-dashboard/hofalojlkckeopheldapdcickcmeihmd?utm_source=ext_app_menu",
    external: true,
  },
  {
    name: "Centrix",
    tagline: "Autonomous ingestion pipeline for 500+ PW centers",
    badge: ".NET 8 Edge",
    href: "https://aniketmishra-0.github.io/Centrix_Demo/",
    external: true,
  },
  {
    name: "Nexus Streamer",
    tagline: "Zero-RAM cloud Drive → YouTube video ingestion",
    badge: "Live Space",
    href: "https://pwvp-drive2youtube.hf.space/",
    external: true,
  },
  {
    name: "ImgWorld.biz",
    tagline: "100% client-side privacy-first image utility suite",
    badge: "Live WebApp",
    href: "https://www.imgworld.biz/",
    external: true,
  },
  {
    name: "RadialMenu",
    tagline: "Circular fuzzy-search launcher HUD for Windows",
    badge: "Win 10/11",
    href: "https://aniketmishra-0.github.io/RedialMenu-releases/",
    external: true,
  },
];

const NAV_SERVICES = [
  {
    title: "2–4 Week Rapid MVP Build",
    tagline: "From wireframe to launched, production-ready product",
    badge: "14–28 Days",
    href: "/#services",
  },
  {
    title: "Custom Chrome Extensions",
    tagline: "Manifest V3 tools, background workers & Web Store setup",
    badge: "7–14 Days",
    href: "/#services",
  },
  {
    title: "High-Scale APIs & Automations",
    tagline: "Robust .NET 8 / Python pipelines with high throughput",
    badge: "Custom Sprint",
    href: "/#services",
  },
  {
    title: "Performance Tuning & Audits",
    tagline: "Eliminate latency, optimize queries & boost Core Web Vitals",
    badge: "3–7 Days",
    href: "/#services",
  },
];

const NAV_LEARN = [
  {
    title: "Documentation & Specs",
    tagline: "Architecture blueprints, schema guides & contracts",
    badge: "Docs",
    href: "/docs",
  },
  {
    title: "Engineering Blog",
    tagline: "Technical writeups, optimizations & teardowns",
    badge: "Articles",
    href: "/blog",
  },
  {
    title: "Interactive Labs",
    tagline: "R&D experiments, prototypes & 3D sandboxes",
    badge: "Sandbox",
    href: "/labs",
  },
  {
    title: "Engineering Thesis",
    tagline: "Philosophy on code longevity & architecture",
    badge: "Thesis",
    href: "/thesis",
  },
  {
    title: "Use Cases & Solutions",
    tagline: "High-concurrency systems & cloud integrations",
    badge: "Case Studies",
    href: "/use-cases",
  },
  // Students section hidden — kept in code, re-enable by uncommenting.
  // {
  //   title: "Student Perks & Grants",
  //   tagline: "Free 1-on-1 mentorship, code reviews & MVP grants",
  //   badge: "100% Free",
  //   href: "/students",
  // },
];

export default function Navbar({
  onOpenSearch,
  onOpenAssessment,
  theme
}) {
  const pathname = usePathname() || '';
  const isBlogActive = pathname.startsWith('/blog');
  const isLearnActive = pathname.startsWith('/docs') || pathname.startsWith('/labs') || pathname.startsWith('/thesis') || pathname.startsWith('/use-cases');
  const isStudentsActive = pathname.includes('/students');
  const isAlwaysDark = theme === "dark" || isStudentsActive;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [soundActive, setSoundActive] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  // Dual GitHub Profiles Hover & Direct Open Both State
  const [githubHovered, setGithubHovered] = useState(false);
  const githubTimeoutRef = useRef(null);

  const handleGithubMouseEnter = () => {
    if (githubTimeoutRef.current) clearTimeout(githubTimeoutRef.current);
    setGithubHovered(true);
  };

  const handleGithubMouseLeave = () => {
    githubTimeoutRef.current = setTimeout(() => {
      setGithubHovered(false);
    }, 180);
  };

  const handleOpenBothGithub = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    sound.playClick();
    window.open("https://github.com/aniketmishra-0", "_blank", "noopener,noreferrer");
    window.open("https://github.com/Mishra-Aniket", "_blank", "noopener,noreferrer");
  };

  const lastScrollY = useRef(0);
  const accumulatedDelta = useRef(0);

  const navRef = useRef(null);

  useEffect(() => {
    setSoundActive(sound.isEnabled());
    const onSoundChange = (e) => {
      setSoundActive(e.detail);
    };
    window.addEventListener('aniket_sound_change', onSoundChange);
    return () => window.removeEventListener('aniket_sound_change', onSoundChange);
  }, []);

  // Close desktop dropdown on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isAlwaysDark);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (isAlwaysDark) {
      setIsDarkTheme(true);
    }
  }, [isAlwaysDark]);

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

      if (isAlwaysDark) {
        setIsDarkTheme(true);
        return;
      }

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

  // Lock body scroll, Lenis, and dispatch mobile menu state to window
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('aniket_mobile_menu', { detail: mobileMenuOpen }));
      if (mobileMenuOpen) {
        document.documentElement.setAttribute('data-mobile-nav-open', 'true');
        if (window.__lenis) {
          window.__lenis.stop();
        }
        document.body.style.overflow = 'hidden';
      } else {
        document.documentElement.removeAttribute('data-mobile-nav-open');
        if (window.__lenis) {
          window.__lenis.start();
        }
        document.body.style.overflow = '';
      }
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('aniket_mobile_menu', { detail: false }));
        document.documentElement.removeAttribute('data-mobile-nav-open');
        if (window.__lenis) {
          window.__lenis.start();
        }
        document.body.style.overflow = '';
      }
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
        className="fixed top-0 md:top-4 left-0 right-0 z-50 px-0 md:px-6 flex justify-center pointer-events-none"
        initial={false}
        animate={{
          y: isNavVisible ? 0 : -96,
          opacity: isNavVisible ? 1 : 0
        }}
        transition={{
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        <div 
          ref={navRef}
          data-lenis-prevent="true"
          className={`pointer-events-auto w-full max-w-[1200px] flex flex-col transition-[background-color,border-color,box-shadow,border-radius] duration-250 ${
            mobileMenuOpen 
              ? "bg-[#FDFBF7] border-b border-[#E4D9BC] md:rounded-2xl md:border md:shadow-2xl overflow-hidden" 
              : "overflow-visible"
          }`}
        >
          <nav
            data-site-nav="true"
            data-theme={isDarkTheme ? "dark" : undefined}
            aria-label="Primary"
            className={`w-full shrink-0 flex items-center justify-between gap-4 sm:gap-6 rounded-none md:rounded-[calc(var(--radius)+4px)] border-b md:border pl-4 sm:pl-5 pr-2 py-2 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-300 ${
              isDarkTheme 
                ? "bg-[#141210]/95 md:bg-[#141210]/95 border-white/[0.15] shadow-[0_12px_40px_rgba(0,0,0,0.85)]" 
                : isScrolled
                  ? "bg-[#FDFBF7]/90 md:bg-[#FDFBF7]/85 border-[#E4D9BC]"
                  : "bg-[#FDFBF7]/90 md:bg-[#FDFBF7]/55 border-[#E4D9BC]/70"
            } ${
              isScrolled
                ? isDarkTheme
                  ? "shadow-[0_12px_32px_-16px_rgba(0,0,0,0.9)]"
                  : "shadow-[0_12px_32px_-16px_rgba(74,59,51,0.24)]"
                : ""
            }`}
          >
          {/* Logo */}
          <Link href="/" onClick={() => sound.playClick()} className="relative flex items-center gap-2 group shrink-0">
            <MonogramAM className={`h-8 sm:h-9 w-auto shrink-0 transform transition-transform group-hover:scale-105 duration-200 ${
              isDarkTheme ? "text-[#E4C090]" : "text-[#B45309]"
            }`} />
            <span className="flex items-baseline tracking-tight">
              <span className="font-sans font-bold text-[19px] sm:text-xl tracking-tight nav-brand-text">
                Aniket
              </span>
              <span className={`font-serif italic font-bold text-[22px] sm:text-[24px] ml-1 transition-colors ${
                isDarkTheme ? "text-[#E4C090]" : "text-[#B45309]"
              }`}>
                M
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 text-[0.875rem] font-medium">
            {/* Projects Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('projects')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveDropdown(activeDropdown === 'projects' ? null : 'projects');
                }}
                className={`nav-link relative flex items-center gap-1 px-3 py-1.5 rounded-[var(--radius)] cursor-pointer transition-all hover:bg-black/[0.04] dark:hover:bg-white/[0.06] ${
                  activeDropdown === 'projects' ? (isDarkTheme ? "!text-[#E4C090] font-bold" : "!text-[#4A3B33] font-bold") : ""
                }`}
              >
                <span>Projects</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-300 ${
                  activeDropdown === 'projects' ? 'rotate-180' : ''
                }`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'projects' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.985 }}
                    transition={{ duration: 0.2 }}
                    style={{ transformOrigin: "top left" }}
                    className={`absolute top-full left-0 mt-2 w-80 rounded-[calc(var(--radius)+2px)] border p-2 backdrop-blur-xl shadow-2xl z-50 transition-colors duration-300 ${
                      isDarkTheme 
                        ? "border-white/[0.12] bg-[#1C1917]/95 text-[#F5F5F4]" 
                        : "border-[#E4D9BC] bg-[#FDFBF7]/95 text-[#4A3B33]"
                    }`}
                  >
                    <div className="space-y-0.5">
                      {NAV_PROJECTS.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          onClick={() => {
                            sound.playClick();
                            setActiveDropdown(null);
                          }}
                          className={`w-full text-left flex items-start justify-between p-2 rounded-[var(--radius)] transition-colors group ${
                            isDarkTheme 
                              ? "text-[#D6D3D1] hover:text-[#E4C090] hover:bg-white/[0.05]" 
                              : "text-[#4A3B33] hover:text-[#B45309] hover:bg-black/[0.03]"
                          }`}
                        >
                          <div className="flex flex-col pr-2">
                            <div className="flex items-center gap-1.5 font-semibold text-[0.85rem]">
                              <span>{item.name}</span>
                              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                                isDarkTheme 
                                  ? "border-white/10 text-[#E4C090] bg-white/[0.04]" 
                                  : "border-[#E4D9BC] text-[#B45309] bg-[#B45309]/5"
                              }`}>
                                {item.badge}
                              </span>
                            </div>
                            <span className="text-[11.5px] text-[#78716C] mt-0.5 line-clamp-1">
                              {item.tagline}
                            </span>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0 mt-1 opacity-50 group-hover:opacity-100 group-hover:text-[#B45309] transition-opacity" />
                        </a>
                      ))}
                    </div>
                    <div className={`my-1.5 h-px ${isDarkTheme ? "bg-white/10" : "bg-[#E4D9BC]/70"}`} />
                    <Link
                      href="/#work"
                      onClick={() => {
                        sound.playClick();
                        setActiveDropdown(null);
                      }}
                      className={`w-full text-left flex items-center justify-between px-3 py-1.5 text-[0.8125rem] font-bold rounded-[var(--radius)] transition-colors ${
                        isDarkTheme ? "text-[#E4C090] hover:text-white hover:bg-white/[0.05]" : "text-[#B45309] hover:text-[#A16207] hover:bg-black/[0.03]"
                      }`}
                    >
                      <span>Explore all projects &amp; case studies</span>
                      <span className="text-sm">→</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveDropdown(activeDropdown === 'services' ? null : 'services');
                }}
                className={`nav-link relative flex items-center gap-1 px-3 py-1.5 rounded-[var(--radius)] cursor-pointer transition-all hover:bg-black/[0.04] dark:hover:bg-white/[0.06] ${
                  activeDropdown === 'services' ? (isDarkTheme ? "!text-[#E4C090] font-bold" : "!text-[#4A3B33] font-bold") : ""
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-300 ${
                  activeDropdown === 'services' ? 'rotate-180' : ''
                }`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.985 }}
                    transition={{ duration: 0.2 }}
                    style={{ transformOrigin: "top left" }}
                    className={`absolute top-full left-0 mt-2 w-80 rounded-[calc(var(--radius)+2px)] border p-2 backdrop-blur-xl shadow-2xl z-50 transition-colors duration-300 ${
                      isDarkTheme 
                        ? "border-white/[0.12] bg-[#1C1917]/95 text-[#F5F5F4]" 
                        : "border-[#E4D9BC] bg-[#FDFBF7]/95 text-[#4A3B33]"
                    }`}
                  >
                    <div className="space-y-0.5">
                      {NAV_SERVICES.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => {
                            sound.playClick();
                            setActiveDropdown(null);
                          }}
                          className={`w-full text-left flex items-start justify-between p-2 rounded-[var(--radius)] transition-colors group ${
                            isDarkTheme 
                              ? "text-[#D6D3D1] hover:text-[#E4C090] hover:bg-white/[0.05]" 
                              : "text-[#4A3B33] hover:text-[#B45309] hover:bg-black/[0.03]"
                          }`}
                        >
                          <div className="flex flex-col pr-2">
                            <div className="flex items-center gap-1.5 font-semibold text-[0.85rem]">
                              <span>{item.title}</span>
                              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                                isDarkTheme 
                                  ? "border-white/10 text-[#E4C090] bg-white/[0.04]" 
                                  : "border-[#E4D9BC] text-[#B45309] bg-[#B45309]/5"
                              }`}>
                                {item.badge}
                              </span>
                            </div>
                            <span className="text-[11.5px] text-[#78716C] mt-0.5 line-clamp-1">
                              {item.tagline}
                            </span>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0 mt-1 opacity-50 group-hover:opacity-100 group-hover:text-[#B45309] transition-opacity" />
                        </Link>
                      ))}
                    </div>
                    <div className={`my-1.5 h-px ${isDarkTheme ? "bg-white/10" : "bg-[#E4D9BC]/70"}`} />
                    <Link
                      href="/#services"
                      onClick={() => {
                        sound.playClick();
                        setActiveDropdown(null);
                      }}
                      className={`w-full text-left flex items-center justify-between px-3 py-1.5 text-[0.8125rem] font-bold rounded-[var(--radius)] transition-colors ${
                        isDarkTheme ? "text-[#E4C090] hover:text-white hover:bg-white/[0.05]" : "text-[#B45309] hover:text-[#A16207] hover:bg-black/[0.03]"
                      }`}
                    >
                      <span>View freelance workflow &amp; sprint rates</span>
                      <span className="text-sm">→</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Architecture link */}
            <Link
              href="/#how-it-works"
              onClick={() => sound.playClick()}
              className="nav-link relative px-3 py-1.5 rounded-[var(--radius)] cursor-pointer transition-all hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
            >
              Architecture
            </Link>

            {/* Blog link */}
            <Link
              href="/blog"
              onClick={() => sound.playClick()}
              className={`nav-link relative px-3 py-1.5 rounded-[var(--radius)] cursor-pointer transition-all hover:bg-black/[0.04] dark:hover:bg-white/[0.06] ${
                isBlogActive ? (isDarkTheme ? "!text-[#E4C090] font-bold" : "!text-[#4A3B33] font-bold") : ""
              }`}
            >
              Blog
              {isBlogActive && (
                <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                  isDarkTheme ? "bg-[#E4C090]" : "bg-[#B45309]"
                }`} />
              )}
            </Link>

            {/* Learn & Docs dropdown hidden permanently — kept inactive in code, re-enable by removing the {false && ( ... )} wrapper */}
            {false && (
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('learn')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveDropdown(activeDropdown === 'learn' ? null : 'learn');
                }}
                className={`nav-link relative flex items-center gap-1 px-3 py-1.5 rounded-[var(--radius)] cursor-pointer transition-all hover:bg-black/[0.04] dark:hover:bg-white/[0.06] ${
                  isLearnActive || activeDropdown === 'learn' ? (isDarkTheme ? "!text-[#E4C090] font-bold" : "!text-[#4A3B33] font-bold") : ""
                }`}
              >
                <span>Learn</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-300 ${
                  activeDropdown === 'learn' ? 'rotate-180' : ''
                }`} />
                {isLearnActive && (
                  <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                    isDarkTheme ? "bg-[#E4C090]" : "bg-[#B45309]"
                  }`} />
                )}
              </button>
              <AnimatePresence>
                {activeDropdown === 'learn' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.985 }}
                    transition={{ duration: 0.2 }}
                    style={{ transformOrigin: "top left" }}
                    className={`absolute top-full left-0 mt-2 w-72 rounded-[calc(var(--radius)+2px)] border p-2 backdrop-blur-xl shadow-2xl z-50 transition-colors duration-300 ${
                      isDarkTheme 
                        ? "border-white/[0.12] bg-[#1C1917]/95 text-[#F5F5F4]" 
                        : "border-[#E4D9BC] bg-[#FDFBF7]/95 text-[#4A3B33]"
                    }`}
                  >
                    <div className="space-y-0.5">
                      {/* Refined banner inside dropdown */}
                      <div className={`px-2.5 py-1.5 mb-1.5 rounded-[var(--radius)] border flex items-center justify-between text-[11px] font-mono ${
                        isDarkTheme
                          ? "bg-amber-500/10 border-amber-500/25 text-amber-300"
                          : "bg-amber-500/[0.08] border-amber-500/30 text-amber-800"
                      }`}>
                        <span className="flex items-center gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          <span>Interactive Labs &amp; Guides</span>
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-500/20">
                          Coming Soon
                        </span>
                      </div>
                      {NAV_LEARN.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            sound.playClick();
                            setActiveDropdown(null);
                          }}
                          className={`w-full text-left flex items-start justify-between p-2 rounded-[var(--radius)] transition-colors group ${
                            pathname === item.href
                              ? (isDarkTheme ? "text-[#E4C090] bg-white/[0.08] font-semibold" : "text-[#B45309] bg-[#B45309]/10 font-semibold")
                              : (isDarkTheme ? "text-[#D6D3D1] hover:text-[#E4C090] hover:bg-white/[0.05]" : "text-[#4A3B33] hover:text-[#B45309] hover:bg-black/[0.03]")
                          }`}
                        >
                          <div className="flex flex-col pr-2">
                            <div className="flex items-center gap-1.5 font-semibold text-[0.85rem]">
                              <span>{item.title}</span>
                              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                                isDarkTheme 
                                   ? "border-white/10 text-[#E4C090] bg-white/[0.04]" 
                                   : "border-[#E4D9BC] text-[#B45309] bg-[#B45309]/5"
                              }`}>
                                {item.badge}
                              </span>
                            </div>
                            <span className="text-[11.5px] text-[#78716C] mt-0.5 line-clamp-1">
                              {item.tagline}
                            </span>
                          </div>
                          {pathname === item.href && (
                            <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${isDarkTheme ? "bg-[#E4C090]" : "bg-[#B45309]"}`} />
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            )}

            {/* Students link hidden — kept inactive in code, re-enable by removing the {false && ( ... )} wrapper */}
            {false && (
            <Link
              href="/students"
              onClick={() => sound.playClick()}
              className={`nav-link relative flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius)] cursor-pointer transition-all hover:bg-black/[0.04] dark:hover:bg-white/[0.06] ${
                isStudentsActive ? (isDarkTheme ? "!text-[#E4C090] font-bold" : "!text-[#4A3B33] font-bold") : ""
              }`}
            >
              <span>Students</span>
              <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                isDarkTheme
                  ? "border-emerald-500/30 text-emerald-300 bg-emerald-500/15"
                  : "border-emerald-600/25 text-emerald-700 bg-emerald-600/10"
              }`}>
                Free
              </span>
              {isStudentsActive && (
                <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                  isDarkTheme ? "bg-[#E4C090] shadow-[0_0_8px_#E4C090]" : "bg-[#B45309]"
                }`} />
              )}
            </Link>
            )}

            {/* About — last nav item */}
            <Link
              href="/about"
              onClick={() => sound.playClick()}
              className={`nav-link relative flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius)] cursor-pointer transition-all hover:bg-black/[0.04] dark:hover:bg-white/[0.06] ${
                pathname.startsWith('/about') ? (isDarkTheme ? "!text-[#E4C090] font-bold" : "!text-[#4A3B33] font-bold") : ""
              }`}
            >
              <span>About</span>
              {pathname.startsWith('/about') && (
                <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                  isDarkTheme ? "bg-[#E4C090] shadow-[0_0_8px_#E4C090]" : "bg-[#B45309]"
                }`} />
              )}
            </Link>
          </div>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* GitHub Dual Profiles Pill + Hover Menu */}
            <div
              className="relative"
              onMouseEnter={handleGithubMouseEnter}
              onMouseLeave={handleGithubMouseLeave}
            >
              <button
                type="button"
                onClick={handleOpenBothGithub}
                className="nav-btn-ghost inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[var(--radius)] font-mono text-[11px] font-semibold border shadow-xs transition-all duration-200 cursor-pointer group/ghbtn select-none"
                title="Click to open both GitHub profiles in new tabs (Hover to pick)"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
                <span className={`inline-flex items-center justify-center px-1 rounded text-[9.5px] font-bold leading-tight ${
                  isDarkTheme ? "bg-[#E4C090]/25 text-[#E4C090]" : "bg-[#B45309]/10 text-[#B45309]"
                }`}>
                  2
                </span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 group-hover/ghbtn:rotate-180 ${
                  isDarkTheme ? "text-[#E7E5E4]" : "text-[#78716C]"
                }`} />
              </button>

              {/* Floating Hover Card */}
              <AnimatePresence>
                {githubHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full right-0 pt-2 w-72 z-50 pointer-events-auto"
                    onMouseEnter={handleGithubMouseEnter}
                    onMouseLeave={handleGithubMouseLeave}
                  >
                    <div className="p-2.5 rounded-xl border border-[#E4D9BC] bg-[#FDFBF7] shadow-[0_16px_36px_-6px_rgba(74,59,51,0.22)] text-[#4A3B33]">
                      <div className="flex items-center justify-between px-2 py-1 mb-1.5 border-b border-[#E4D9BC]/60">
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#78716C]">
                          2 GitHub Accounts
                        </span>
                        <span className="font-mono text-[9px] font-bold text-[#B45309] bg-[#B45309]/10 px-1.5 py-0.5 rounded">
                          Click = Both
                        </span>
                      </div>

                      <div className="space-y-1">
                        {/* Profile 1 */}
                        <a
                          href="https://github.com/aniketmishra-0"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playClick();
                          }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-[#FAF6EE] border border-transparent hover:border-[#E4D9BC]/80 transition-all group/item"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-[#FAF6EE] border border-[#E4D9BC] flex items-center justify-center shrink-0 text-[#4A3B33] group-hover/item:text-[#B45309] group-hover/item:border-[#B45309]">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <div className="font-mono text-xs font-bold text-[#4A3B33] group-hover/item:text-[#B45309] truncate">
                                @aniketmishra-0
                              </div>
                              <div className="text-[10px] text-[#78716C] font-mono truncate">
                                Primary · 699+ Commits
                              </div>
                            </div>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#A8A29E] group-hover/item:text-[#B45309] group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform shrink-0" />
                        </a>

                        {/* Profile 2 */}
                        <a
                          href="https://github.com/Mishra-Aniket"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playClick();
                          }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-[#FAF6EE] border border-transparent hover:border-[#E4D9BC]/80 transition-all group/item"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-[#FAF6EE] border border-[#E4D9BC] flex items-center justify-center shrink-0 text-[#4A3B33] group-hover/item:text-[#B45309] group-hover/item:border-[#B45309]">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <div className="font-mono text-xs font-bold text-[#4A3B33] group-hover/item:text-[#B45309] truncate">
                                @Mishra-Aniket
                              </div>
                              <div className="text-[10px] text-[#78716C] font-mono truncate">
                                Enterprise &amp; Systems
                              </div>
                            </div>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#A8A29E] group-hover/item:text-[#B45309] group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform shrink-0" />
                        </a>
                      </div>

                      {/* Action Button: Open Both Tabs */}
                      <div className="mt-2 pt-1.5 border-t border-[#E4D9BC]/60">
                        <button
                          type="button"
                          onClick={handleOpenBothGithub}
                          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#FAF6EE] hover:bg-[#B45309] text-[#B45309] hover:text-white border border-[#E4D9BC] hover:border-[#B45309] text-[11px] font-mono font-semibold transition-all cursor-pointer"
                        >
                          <span>Open Both in Tabs</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
              href={pathname.includes('/pricing') ? '#propose' : '#get-access'}
              onClick={() => sound.playClick()}
              className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-[#B45309] px-5 py-2 text-[0.8125rem] font-bold text-white shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-px hover:bg-[#A16207]"
            >
              Hire Me
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
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className={`p-2 transition-colors ${
                isDarkTheme ? "text-[#F5F5F4] hover:text-[#E4C090]" : "text-[#4A3B33] hover:text-[#B45309]"
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Integrated Clean Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={`lg:hidden border-t overflow-hidden transition-colors ${
                isDarkTheme
                  ? "border-white/[0.08] bg-[#1C1917] text-[#F5F5F4]"
                  : "border-[#E4D9BC] bg-[#FDFBF7] text-[#4A3B33]"
              }`}
              data-lenis-prevent="true"
            >
              <div 
                data-lenis-prevent="true"
                className={`max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain px-6 sm:px-8 pt-4 pb-8 flex flex-col gap-3 touch-pan-y ${
                  isDarkTheme ? "text-[#F5F5F4]" : "text-[#4A3B33]"
                }`}
                style={{ 
                  WebkitOverflowScrolling: "touch", 
                  overscrollBehavior: "contain",
                  touchAction: "pan-y"
                }}
              >
                {/* Header Sub-Label */}
                <div className={`flex items-center justify-between pb-2 border-b ${
                  isDarkTheme ? "border-white/[0.08]" : "border-[#E4D9BC]/60"
                }`}>
                  <span className={`font-mono text-[10.5px] font-semibold tracking-wider uppercase ${
                    isDarkTheme ? "text-[#A8A29E]" : "text-[#78716C]"
                  }`}>
                    Navigation
                  </span>
                  <span className="flex items-center gap-1.5 tracking-tight">
                    <MonogramAM className={`h-6 w-auto shrink-0 ${isDarkTheme ? "text-[#E4C090]" : "text-[#B45309]"}`} />
                    <span className={`font-sans font-bold text-xs tracking-tight ${
                      isDarkTheme ? "text-white" : "text-[#4A3B33]"
                    }`}>
                      Aniket
                    </span>
                    <span className={`font-serif italic font-bold text-[13px] ml-0.5 ${
                      isDarkTheme ? "text-[#E4C090]" : "text-[#B45309]"
                    }`}>
                      M
                    </span>
                  </span>
                </div>

                {/* Modern Editorial Mobile Navigation */}
                <div className={`flex flex-col divide-y ${
                  isDarkTheme ? "divide-white/[0.08]" : "divide-[#E4D9BC]/50"
                }`}>
                  {/* 1. Projects Accordion */}
                  <div className="py-2">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setMobileExpandedSection(prev => prev === 'projects' ? null : 'projects');
                      }}
                      className="w-full flex items-center justify-between py-1.5 text-left cursor-pointer group"
                    >
                      <span className={`text-[17px] font-serif font-medium transition-colors ${
                        isDarkTheme ? "text-[#F5F5F4] group-hover:text-[#E4C090]" : "text-[#4A3B33] group-hover:text-[#B45309]"
                      }`}>
                        Projects
                      </span>
                      <ChevronDown 
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                          isDarkTheme 
                            ? "text-[#A8A29E] group-hover:text-[#E4C090]" 
                            : "text-[#A8A29E] group-hover:text-[#B45309]"
                        } ${
                          mobileExpandedSection === 'projects' 
                            ? (isDarkTheme ? 'rotate-180 text-[#E4C090]' : 'rotate-180 text-[#B45309]') 
                            : ''
                        }`} 
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileExpandedSection === 'projects' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className={`pl-3 mt-2 mb-1 space-y-1 border-l-2 ${
                            isDarkTheme ? "border-[#E4C090]/40" : "border-[#B45309]/30"
                          }`}
                        >
                          {NAV_PROJECTS.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              target={item.external ? "_blank" : undefined}
                              rel={item.external ? "noopener noreferrer" : undefined}
                              onClick={() => {
                                sound.playClick();
                                setMobileMenuOpen(false);
                              }}
                              className={`flex items-center justify-between py-1.5 px-2 rounded-lg text-[14px] transition-colors group ${
                                isDarkTheme 
                                  ? "text-[#D6D3D1] hover:text-[#E4C090] hover:bg-white/[0.06]" 
                                  : "text-[#78716C] hover:text-[#B45309] hover:bg-[#FAF6EE]"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`font-medium ${
                                  isDarkTheme ? "text-[#F5F5F4] group-hover:text-[#E4C090]" : "text-[#4A3B33] group-hover:text-[#B45309]"
                                }`}>{item.name}</span>
                                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                                  isDarkTheme 
                                    ? "border-white/10 text-[#E4C090] bg-white/[0.05]" 
                                    : "border-[#E4D9BC] text-[#B45309] bg-[#B45309]/5"
                                }`}>
                                  {item.badge}
                                </span>
                              </div>
                              <ArrowUpRight className={`w-3.5 h-3.5 transition-colors ${
                                isDarkTheme ? "opacity-70 text-[#A8A29E] group-hover:opacity-100 group-hover:text-[#E4C090]" : "opacity-60 text-[#A8A29E] group-hover:opacity-100 group-hover:text-[#B45309]"
                              }`} />
                            </a>
                          ))}
                          <Link
                            href="/#work"
                            onClick={() => {
                              sound.playClick();
                              setMobileMenuOpen(false);
                            }}
                            className={`flex items-center justify-between py-1.5 px-2 text-[12px] font-mono font-semibold pt-1 ${
                              isDarkTheme ? "text-[#E4C090] hover:underline hover:text-[#F6D8A8]" : "text-[#B45309] hover:underline"
                            }`}
                          >
                            <span>Explore all projects &amp; case studies</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* 2. Services Accordion */}
                  <div className="py-2">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setMobileExpandedSection(prev => prev === 'services' ? null : 'services');
                      }}
                      className="w-full flex items-center justify-between py-1.5 text-left cursor-pointer group"
                    >
                      <span className={`text-[17px] font-serif font-medium transition-colors ${
                        isDarkTheme ? "text-[#F5F5F4] group-hover:text-[#E4C090]" : "text-[#4A3B33] group-hover:text-[#B45309]"
                      }`}>
                        Services
                      </span>
                      <ChevronDown 
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                          isDarkTheme 
                            ? "text-[#A8A29E] group-hover:text-[#E4C090]" 
                            : "text-[#A8A29E] group-hover:text-[#B45309]"
                        } ${
                          mobileExpandedSection === 'services' 
                            ? (isDarkTheme ? 'rotate-180 text-[#E4C090]' : 'rotate-180 text-[#B45309]') 
                            : ''
                        }`} 
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileExpandedSection === 'services' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className={`pl-3 mt-2 mb-1 space-y-1 border-l-2 ${
                            isDarkTheme ? "border-[#E4C090]/40" : "border-[#B45309]/30"
                          }`}
                        >
                          {NAV_SERVICES.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              onClick={() => {
                                sound.playClick();
                                setMobileMenuOpen(false);
                              }}
                              className={`flex items-center justify-between py-1.5 px-2 rounded-lg text-[14px] transition-colors group ${
                                isDarkTheme 
                                  ? "text-[#D6D3D1] hover:text-[#E4C090] hover:bg-white/[0.06]" 
                                  : "text-[#78716C] hover:text-[#B45309] hover:bg-[#FAF6EE]"
                              }`}
                            >
                              <div>
                                <span className={`font-medium ${
                                  isDarkTheme ? "text-[#F5F5F4] group-hover:text-[#E4C090]" : "text-[#4A3B33] group-hover:text-[#B45309]"
                                }`}>{item.title}</span>
                                <span className={`block text-[11px] ${
                                  isDarkTheme ? "text-[#A8A29E]" : "text-[#A8A29E]"
                                }`}>{item.badge}</span>
                              </div>
                              <ArrowRight className={`w-3.5 h-3.5 transition-colors ${
                                isDarkTheme ? "opacity-70 text-[#A8A29E] group-hover:opacity-100 group-hover:text-[#E4C090]" : "opacity-60 text-[#A8A29E] group-hover:opacity-100 group-hover:text-[#B45309]"
                              }`} />
                            </Link>
                          ))}
                          <Link
                            href="/#services"
                            onClick={() => {
                              sound.playClick();
                              setMobileMenuOpen(false);
                            }}
                            className={`flex items-center justify-between py-1.5 px-2 text-[12px] font-mono font-semibold pt-1 ${
                              isDarkTheme ? "text-[#E4C090] hover:underline hover:text-[#F6D8A8]" : "text-[#B45309] hover:underline"
                            }`}
                          >
                            <span>View workflow &amp; sprint guarantees</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* 3. Architecture & Code Walkthrough */}
                  <div className="py-2">
                    <Link
                      href="/#how-it-works"
                      onClick={() => {
                        sound.playClick();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between py-1.5 text-left group"
                    >
                      <span className={`text-[17px] font-serif font-medium transition-colors ${
                        isDarkTheme ? "text-[#F5F5F4] group-hover:text-[#E4C090]" : "text-[#4A3B33] group-hover:text-[#B45309]"
                      }`}>
                        Architecture &amp; Code
                      </span>
                      <ArrowRight className={`w-4 h-4 transition-colors ${
                        isDarkTheme ? "text-[#A8A29E] group-hover:text-[#E4C090]" : "text-[#A8A29E] group-hover:text-[#B45309]"
                      }`} />
                    </Link>
                  </div>

                  {/* 4. Engineering Blog */}
                  <div className="py-2">
                    <Link
                      href="/blog"
                      onClick={() => {
                        sound.playClick();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between py-1.5 text-left group"
                    >
                      <span className={`text-[17px] font-serif font-medium transition-colors ${
                        isDarkTheme ? "text-[#F5F5F4] group-hover:text-[#E4C090]" : "text-[#4A3B33] group-hover:text-[#B45309]"
                      }`}>
                        Engineering Blog
                      </span>
                      <ArrowUpRight className={`w-4 h-4 transition-colors ${
                        isDarkTheme ? "text-[#A8A29E] group-hover:text-[#E4C090]" : "text-[#A8A29E] group-hover:text-[#B45309]"
                      }`} />
                    </Link>
                  </div>

                  {/* 4.5 About Me */}
                  <div className="py-2">
                    <Link
                      href="/about"
                      onClick={() => {
                        sound.playClick();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between py-1.5 text-left group"
                    >
                      <span className={`text-[17px] font-serif font-medium transition-colors ${
                        isDarkTheme ? "text-[#F5F5F4] group-hover:text-[#E4C090]" : "text-[#4A3B33] group-hover:text-[#B45309]"
                      }`}>
                        About Me
                      </span>
                      <ArrowUpRight className={`w-4 h-4 transition-colors ${
                        isDarkTheme ? "text-[#A8A29E] group-hover:text-[#E4C090]" : "text-[#A8A29E] group-hover:text-[#B45309]"
                      }`} />
                    </Link>
                  </div>

                  {/* 5. Student Offers (Free) — hidden, kept inactive in code; re-enable by removing the {false && ( ... )} wrapper */}
                  {false && (
                  <div className="py-2">
                    <Link
                      href="/students"
                      onClick={() => {
                        sound.playClick();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between py-1.5 text-left group"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-[17px] font-serif font-medium transition-colors ${
                          isDarkTheme ? "text-[#F5F5F4] group-hover:text-[#E4C090]" : "text-[#4A3B33] group-hover:text-[#B45309]"
                        }`}>
                          Student Offers
                        </span>
                        <span className="px-1.5 py-0.5 text-[10px] uppercase font-mono font-bold tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full">
                          100% Free
                        </span>
                      </div>
                      <ArrowUpRight className={`w-4 h-4 transition-colors ${
                        isDarkTheme ? "text-[#A8A29E] group-hover:text-[#E4C090]" : "text-[#A8A29E] group-hover:text-[#B45309]"
                      }`} />
                    </Link>
                  </div>
                  )}

                  {/* 6. Learn & Docs Accordion — hidden permanently, kept inactive in code; re-enable by removing the {false && ( ... )} wrapper */}
                  {false && (
                  <div className="py-2">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setMobileExpandedSection(prev => prev === 'learn' ? null : 'learn');
                      }}
                      className="w-full flex items-center justify-between py-1.5 text-left cursor-pointer group"
                    >
                      <span className={`text-[17px] font-serif font-medium transition-colors flex items-center gap-2 ${
                        isDarkTheme ? "text-[#F5F5F4] group-hover:text-[#E4C090]" : "text-[#4A3B33] group-hover:text-[#B45309]"
                      }`}>
                        <span>Learn &amp; Docs</span>
                        <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                          isDarkTheme
                            ? "border-amber-500/30 text-amber-300 bg-amber-500/15"
                            : "border-amber-600/30 text-amber-800 bg-amber-500/10"
                        }`}>
                          Soon
                        </span>
                      </span>
                      <ChevronDown 
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                          isDarkTheme 
                            ? "text-[#A8A29E] group-hover:text-[#E4C090]" 
                            : "text-[#A8A29E] group-hover:text-[#B45309]"
                        } ${
                          mobileExpandedSection === 'learn' 
                            ? (isDarkTheme ? 'rotate-180 text-[#E4C090]' : 'rotate-180 text-[#B45309]') 
                            : ''
                        }`} 
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileExpandedSection === 'learn' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className={`pl-3 mt-2 mb-1 space-y-1 border-l-2 ${
                            isDarkTheme ? "border-[#E4C090]/40" : "border-[#B45309]/30"
                          }`}
                        >
                          {NAV_LEARN.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => {
                                sound.playClick();
                                setMobileMenuOpen(false);
                              }}
                              className={`flex items-center justify-between py-1.5 px-2 rounded-lg text-[14px] transition-colors group ${
                                isDarkTheme 
                                  ? "text-[#D6D3D1] hover:text-[#E4C090] hover:bg-white/[0.06]" 
                                  : "text-[#78716C] hover:text-[#B45309] hover:bg-[#FAF6EE]"
                              }`}
                            >
                              <div>
                                <span className={`font-medium ${
                                  isDarkTheme ? "text-[#F5F5F4] group-hover:text-[#E4C090]" : "text-[#4A3B33] group-hover:text-[#B45309]"
                                }`}>{item.title}</span>
                                <span className={`block text-[11px] ${
                                  isDarkTheme ? "text-[#A8A29E]" : "text-[#A8A29E]"
                                }`}>{item.tagline}</span>
                              </div>
                              <ArrowRight className={`w-3.5 h-3.5 transition-colors ${
                                isDarkTheme ? "opacity-70 text-[#A8A29E] group-hover:opacity-100 group-hover:text-[#E4C090]" : "opacity-60 text-[#A8A29E] group-hover:opacity-100 group-hover:text-[#B45309]"
                              }`} />
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  )}
                </div>

                {/* Bottom Drawer Actions with Social Profiles + CTA */}
                <div className={`pt-3 pb-6 flex flex-col gap-3 shrink-0 border-t ${
                  isDarkTheme ? "border-white/[0.08]" : "border-[#E4D9BC]/60"
                }`}>
                  {/* Social profiles bar */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={handleOpenBothGithub}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border font-mono text-xs shadow-2xs transition-all active:scale-[0.98] cursor-pointer ${
                        isDarkTheme 
                          ? "border-white/[0.12] bg-white/[0.06] text-[#F5F5F4] hover:border-[#E4C090] hover:bg-white/[0.1]" 
                          : "border-[#E4D9BC] bg-white text-[#4A3B33] hover:border-[#B45309] hover:bg-[#FAF6EE]"
                      }`}
                      title="Open both GitHub profiles in new tabs"
                    >
                      <svg className={`w-3.5 h-3.5 fill-current ${isDarkTheme ? "text-[#F5F5F4]" : "text-[#4A3B33]"}`} viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      <span>GitHub (2)</span>
                    </button>
                    <a
                      href="https://www.linkedin.com/in/aniketmishra0"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border font-mono text-xs shadow-2xs transition-all active:scale-[0.98] ${
                        isDarkTheme 
                          ? "border-white/[0.12] bg-white/[0.06] text-[#F5F5F4] hover:border-[#E4C090] hover:bg-white/[0.1]" 
                          : "border-[#E4D9BC] bg-white text-[#4A3B33] hover:border-[#B45309] hover:bg-[#FAF6EE]"
                      }`}
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
                      className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border font-mono text-xs shadow-2xs transition-all active:scale-[0.98] ${
                        isDarkTheme 
                          ? "border-white/[0.12] bg-white/[0.06] text-[#F5F5F4] hover:border-[#E4C090] hover:bg-white/[0.1]" 
                          : "border-[#E4D9BC] bg-white text-[#4A3B33] hover:border-[#B45309] hover:bg-[#FAF6EE]"
                      }`}
                    >
                      <svg className={`w-3.5 h-3.5 fill-current ${isDarkTheme ? "text-[#F5F5F4]" : "text-[#4A3B33]"}`} viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <span>X</span>
                    </a>
                  </div>

                  {/* Primary Call to Action Button */}
                  <Link
                    href={pathname.includes('/pricing') ? '#propose' : '#get-access'}
                    onClick={() => {
                      sound.playClick();
                      setMobileMenuOpen(false);
                    }}
                    className="group relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B45309] to-[#92400E] px-5 py-3 font-sans font-bold text-white shadow-[0_8px_24px_-6px_rgba(180,83,9,0.35)] transition-all duration-200 hover:brightness-105 active:scale-[0.98]"
                  >
                    <span className="tracking-wide">Hire Me / Start Project</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {/* Trust guarantee subtext */}
                  <div className={`text-center font-mono text-[9.5px] tracking-tight ${
                    isDarkTheme ? "text-[#A8A29E]" : "text-[#78716C]"
                  }`}>
                    ✦ 2–4 Week MVP Turnaround · Direct 1-on-1 Access · Full Code Ownership
                  </div>
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
        className="fixed inset-0 bg-[#1C1917]/70 backdrop-blur-md z-40 lg:hidden"
      />
    )}
  </AnimatePresence>
</>
  );
}
