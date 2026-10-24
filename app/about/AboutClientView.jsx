"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import Navbar from "../components/Navbar";
import DarkCTA from "../components/DarkCTA";
import Footer from "../components/Footer";
import SearchModal from "../components/SearchModal";
import ConstellationCanvas from "../components/ConstellationCanvas";
import {
  MapPin,
  Github,
  Mail,
  ArrowRight,
  Briefcase,
  Layers,
  Clock,
  MessageSquare,
  FileText,
  Code2,
  ShieldCheck,
} from "lucide-react";
import { sound } from "../utils/sound";

/* ---------- Photo card: dual-photo crossfade with subtle 3D tilt ---------- */
const PHOTOS = ["/me-1.jpg", "/me-2.jpg"];

function PhotoCard() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  // Auto-rotate photos
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % PHOTOS.length), 4200);
    return () => clearInterval(t);
  }, []);

  // 3D tilt: pointer-driven with a resting tilt so the card reads as 3D even untouched
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [11, -3]), { stiffness: 150, damping: 16 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-11, 3]), { stiffness: 150, damping: 16 });

  // Glare highlight that follows the pointer across the glass
  const glareX = useTransform(mx, [0, 1], [15, 85]);
  const glareY = useTransform(my, [0, 1], [15, 85]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.10) 28%, transparent 55%)`;

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div className="relative w-fit mx-auto lg:mx-0 select-none py-6" style={{ perspective: 1100 }}>
      {/* Borderless depth: soft colored glow panels behind the card */}
      <div aria-hidden="true" className="absolute top-9 left-[-20px] w-[248px] sm:w-[286px] h-[78%] rounded-[2rem] bg-[#B45309]/20 blur-2xl rotate-[-7deg]" />
      <div aria-hidden="true" className="absolute top-9 right-[-20px] w-[248px] sm:w-[286px] h-[78%] rounded-[2rem] bg-[#E4C090]/60 blur-2xl rotate-[6deg]" />
      {/* Ambient floor shadow */}
      <div aria-hidden="true" className="absolute inset-x-8 -bottom-1 h-12 rounded-[50%] bg-[#4A3B33]/25 blur-2xl" />

      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[248px] sm:w-[286px] rounded-[1.4rem] overflow-hidden bg-[#F3EBDD] shadow-[0_36px_70px_-24px_rgba(74,59,51,0.5)]"
      >
        <div className="relative aspect-[4/5]" style={{ transformStyle: "preserve-3d" }}>
          {PHOTOS.map((src, i) => (
            <motion.img
              key={src}
              /* eslint-disable-next-line @next/next/no-img-element */
              src={src}
              alt="Aniket Mishra"
              initial={false}
              animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.05 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ))}

          {/* Cinematic bottom gradient with identity — no border, part of the photo */}
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#1C1917]/85 via-[#1C1917]/35 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 px-5 pb-5">
            <div className="font-serif text-white text-xl font-bold leading-tight">Aniket Mishra</div>
            <div className="flex items-center gap-2 mt-1.5">
              <MapPin className="w-3 h-3 text-[#E4C090] shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#E7E5E4]">Prayagraj, India</span>
            </div>
          </div>

          {/* Pointer-following glass glare */}
          <motion.div
            aria-hidden="true"
            style={{ background: glare, mixBlendMode: "overlay" }}
            className="absolute inset-0 pointer-events-none"
          />

          {/* Available badge — solid pill, floats above the photo in 3D */}
          <div style={{ transform: "translateZ(55px)" }} className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-600 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-white">Available</span>
          </div>

          {/* Photo switcher dots */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Photo ${i + 1}`}
                onClick={() => setActive(i)}
                className={`w-1.5 rounded-full cursor-pointer transition-all ${
                  active === i ? "bg-[#E4C090] h-4" : "h-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Data ---------- */
const FACTS = [
  { icon: MapPin, label: "Based in", value: "Prayagraj, India" },
  { icon: Briefcase, label: "Working as", value: "Freelance full-stack developer" },
  { icon: Layers, label: "Shipped", value: "9 projects, all real" },
  { icon: Clock, label: "Response time", value: "Within 24 hours" },
];

const TIMELINE = [
  { period: "Nov – Dec 2025", title: "ImgWorld.biz & RadialMenu", note: "Browser-only image tools with on-device AI; a Windows radial launcher shipped with signed installers.", href: "/blog/client-side-ai-image-processing", hrefLabel: "Read the deep-dive" },
  { period: "Jan – Feb 2026", title: "Centrix, built end to end", note: "The edge-first lecture ingestion engine — weighted timetable matching, resumable chunked uploads, zero central bandwidth. January was a 173-commit month.", href: "/blog/building-centrix-edge-ingestion", hrefLabel: "Read the deep-dive" },
  { period: "Mar – Apr 2026", title: "Nexus Streamer & Office Mobile", note: "Drive-to-YouTube streaming with flat memory; spreadsheets turned into mobile data-entry PWAs.", href: "/blog/zero-ram-video-streaming-pipeline", hrefLabel: "Read the deep-dive" },
  { period: "May – Jun 2026", title: "Qpic & OmTabs", note: "OCR exam-paper splitting; first Chrome extension live on the official Web Store with a biometric shield.", href: "/blog/building-manifest-v3-extensions", hrefLabel: "Read the deep-dive" },
  { period: "Jul – Oct 2026", title: "OmSpace & aniket.one", note: "Second extension on the Web Store; this portfolio rebuilt as a fast static site with live GitHub telemetry.", href: "/blog/building-manifest-v3-extensions", hrefLabel: "Read the deep-dive" },
];

const WORK_STEPS = [
  { icon: MessageSquare, step: "01", title: "Discovery Call", body: "30 minutes, free. We both check the fit." },
  { icon: FileText, step: "02", title: "Written Proposal", body: "Fixed scope, timeline and milestone payments — within 48 hours." },
  { icon: Code2, step: "03", title: "Weekly Demos", body: "A deployed build every week you can click through yourself." },
  { icon: ShieldCheck, step: "04", title: "Handover", body: "Full source, docs and a walkthrough. NDA if you need it." },
];

/* ---------- Page ---------- */
export default function AboutClientView() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setScrollProgress(Math.min(1, Math.max(0, window.scrollY / total)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#4A3B33] selection:bg-[#B45309]/20 selection:text-[#B45309]">
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#B45309] via-[#A16207] to-[#E4D9BC] z-[9999] pointer-events-none transition-transform duration-75 ease-out"
        style={{ transformOrigin: "0%", transform: `scaleX(${scrollProgress})` }}
      />

      <ConstellationCanvas />

      <Navbar onOpenSearch={() => setSearchOpen(true)} onOpenAssessment={() => {}} />

      <main className="relative z-10 bg-[#FDFBF7] text-[#4A3B33]">
        {/* Hero: photo + bio */}
        <header className="relative overflow-hidden bg-[#FDFBF7]">
          <div aria-hidden="true" className="plate-grid absolute inset-0 opacity-40 pointer-events-none" />
          <div className="relative mx-auto px-6 lg:px-8 pt-32 md:pt-40 pb-14 md:pb-20 max-w-[1200px]">
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              aria-label="Breadcrumb"
              className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#A8A29E] mb-10"
            >
              <ol className="flex items-center gap-2 m-0 p-0 list-none">
                <li>
                  <Link href="/" onClick={() => sound.playClick()} className="text-[#78716C] no-underline transition-colors hover:text-[#4A3B33]">
                    Home
                  </Link>
                  <span aria-hidden="true" className="mx-2 text-[#D6D3D1]">/</span>
                </li>
                <li><span className="text-[#B45309] font-semibold">About</span></li>
              </ol>
            </motion.nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="lg:col-span-5"
              >
                <PhotoCard />
              </motion.div>

              <div className="lg:col-span-7">
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] leading-none text-[#B45309] mb-6"
                >
                  <span aria-hidden="true" className="h-[7px] w-[7px] bg-[#B45309]" />
                  About Me
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.12] tracking-[-0.03em] font-bold text-[#4A3B33] text-balance m-0 mb-7"
                >
                  I build software that ships, and I stick around{" "}
                  <span className="text-[#B45309] italic font-normal">when it breaks.</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="space-y-5 text-[1.02rem] leading-[1.8] text-[#57534E]"
                >
                  <p className="m-0">
                    The last year went into things people can open and use: two extensions on the
                    official Chrome Web Store (OmTabs and OmSpace), an edge-first lecture ingestion
                    engine (Centrix), an image tool that edits photos entirely inside the browser
                    (ImgWorld.biz), and a pipeline that moves multi-gigabyte videos between cloud
                    services without filling a single server's RAM (Nexus Streamer).
                  </p>
                  <p className="m-0">
                    I work freelance, and I keep it boring on purpose: written scope before we start,
                    a fixed price, a deployed build you can click through every week, and the full
                    source handed over at the end. You will never sit through a "trust me, it's 90%
                    done" call with me.
                  </p>
                  <p className="m-0">
                    Everything on this site is real work, live or having run in production — no
                    tutorial clones, no numbers I can't defend in a call. Look at the work, talk to
                    me, decide.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-9 flex flex-wrap gap-3"
                >
                  <Link
                    href="/#get-access"
                    onClick={() => sound.playClick()}
                    className="group inline-flex items-center gap-2 rounded-[var(--radius)] font-bold text-sm tracking-wide px-6 py-3 transition-all duration-200 bg-[#B45309] text-white shadow-[var(--shadow-soft)] hover:bg-[#A16207] hover:-translate-y-px no-underline"
                  >
                    Work With Me
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => sound.playClick()}
                    className="group inline-flex items-center gap-2 rounded-[var(--radius)] font-bold text-sm tracking-wide px-6 py-3 transition-all duration-200 bg-white text-[#57534E] border border-[#E4D9BC] shadow-[var(--shadow-soft)] hover:text-[#4A3B33] hover:border-[#B45309]/50 hover:-translate-y-px no-underline"
                  >
                    Read the Case Studies
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </header>

        {/* Quick facts — 3D glass tiles */}
        <section className="relative mx-auto px-6 lg:px-8 pb-20 max-w-[1200px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FACTS.map((f, idx) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 22, rotateX: 8 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                  whileHover={{ y: -6, rotateX: 4, rotateY: -3 }}
                  style={{ transformStyle: "preserve-3d", perspective: 700 }}
                  className="rounded-2xl border border-[#E4D9BC] bg-white p-5 shadow-[0_18px_36px_-18px_rgba(74,59,51,0.25)]"
                >
                  <span className="grid place-items-center w-9 h-9 rounded-lg bg-[#B45309]/10 border border-[#B45309]/25 mb-3">
                    <Icon className="w-4 h-4 text-[#B45309]" />
                  </span>
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#A8A29E]">{f.label}</div>
                  <div className="text-[14px] font-semibold text-[#4A3B33] mt-1 leading-snug">{f.value}</div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Timeline — the work so far */}
        <section className="relative w-full bg-[#F8F4EE] border-t border-[#E4D9BC]/70 py-20">
          <div className="relative mx-auto px-6 lg:px-8 max-w-[848px]">
            <span className="font-mono text-xs uppercase tracking-wider text-[#B45309] font-bold">The Work So Far</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#4A3B33] mb-3 mt-2">What I built, and when.</h2>
            <p className="text-sm text-[#57534E] mb-12">
              The last year of projects in order — what each one is and what it does.
            </p>

            <div className="relative pl-8 sm:pl-10">
              <div aria-hidden="true" className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-[#B45309] via-[#E4D9BC] to-transparent" />
              {TIMELINE.map((t, idx) => (
                <motion.div
                  key={t.period}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className="relative pb-10 last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-8 sm:-left-10 top-1.5 w-[15px] h-[15px] rotate-45 rounded-[3px] bg-[#FDFBF7] border-2 border-[#B45309]"
                  />
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#B45309]">{t.period}</div>
                  <h3 className="font-serif text-xl font-bold text-[#4A3B33] mt-1.5 mb-1.5 m-0">{t.title}</h3>
                  <p className="text-[14px] leading-relaxed text-[#57534E] m-0">{t.note}</p>
                  {t.href && (
                    <Link
                      href={t.href}
                      onClick={() => sound.playClick()}
                      className="group/link inline-flex items-center gap-1.5 mt-2.5 font-mono text-[11px] font-bold text-[#B45309] hover:text-[#92400E] transition-colors no-underline"
                    >
                      {t.hrefLabel}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How I work — 4 tiles */}
        <section className="relative mx-auto px-6 lg:px-8 pb-20 max-w-[1200px]">
          <div className="max-w-[700px] mb-10">
            <span className="font-mono text-xs uppercase tracking-wider text-[#B45309] font-bold">How I Work</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#4A3B33] m-0">Boring on purpose.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WORK_STEPS.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="rounded-xl border border-[#E4D9BC] bg-white p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-[#B45309]/10 border border-[#B45309]/20 grid place-items-center">
                      <Icon className="w-4 h-4 text-[#B45309]" />
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#A8A29E] tracking-widest">{s.step}</span>
                  </div>
                  <h3 className="font-serif text-[1.05rem] font-bold text-[#4A3B33] m-0">{s.title}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#57534E] m-0">{s.body}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Contact chips */}
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#A8A29E] mr-1">Reach me directly</span>
            <a
              href="mailto:hello@aniket.one"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-[#B45309] text-white hover:bg-[#A16207] transition-all no-underline"
            >
              <Mail className="w-3.5 h-3.5" />
              hello@aniket.one
            </a>
            <a
              href="https://github.com/aniketmishra-0"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-white border border-[#E4D9BC] text-[#57534E] hover:border-[#B45309] hover:text-[#B45309] transition-all no-underline"
            >
              <Github className="w-3.5 h-3.5" />
              @aniketmishra-0
            </a>
            <a
              href="https://github.com/Mishra-Aniket"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-white border border-[#E4D9BC] text-[#57534E] hover:border-[#B45309] hover:text-[#B45309] transition-all no-underline"
            >
              <Github className="w-3.5 h-3.5" />
              @Mishra-Aniket
            </a>
          </div>
        </section>

        <DarkCTA />
      </main>

      <Footer />

      <SearchModal isOpen={searchOpen} onOpen={() => setSearchOpen(true)} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
