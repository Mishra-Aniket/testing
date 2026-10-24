"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  { period: "May – Jun 2026", title: "Qpic", note: "OCR exam-paper splitting — a 3-tier detection pipeline (text layer → Tesseract → vision fallback) with a Flutter desktop app.", href: null, hrefLabel: null },
  { period: "Jun – Aug 2026", title: "OmTabs & OmSpace", note: "Both Chrome extensions live on the official Web Store — tab management with a biometric shield, and a new-tab focus dashboard.", href: "/blog/building-manifest-v3-extensions", hrefLabel: "Read the deep-dive" },
  { period: "Sep – Oct 2026", title: "aniket.one", note: "This portfolio rebuilt as a fast static site with live GitHub telemetry.", href: null, hrefLabel: null },
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
        {/* ============ MADISON-STYLE HERO ============ */}
        <header className="relative overflow-hidden bg-[#F1E9D7]">
          <div aria-hidden="true" className="plate-grid absolute inset-0 opacity-30 pointer-events-none" />
          {/* Warm vignette — lighter center, darker edges, like the reference */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 42%, rgba(253,251,247,0.75) 0%, rgba(241,233,215,0) 60%)",
            }}
          />
          <div className="relative mx-auto px-6 lg:px-8 pt-32 md:pt-36 max-w-[1200px]">
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              aria-label="Breadcrumb"
              className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#A8A29E] mb-8"
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

            {/* Hero stage */}
            <div className="relative pt-6 pb-16 md:pb-24">
              {/* Availability pill — top left */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="relative z-20 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white shadow-[var(--shadow-soft)]"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#4A3B33]">
                  Available for new projects
                </span>
              </motion.div>

              {/* Center stage: giant serif greeting BEHIND the photo — bold, full opacity like the reference */}
              <div className="relative mt-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.25 }}
                  aria-hidden="true"
                  className="absolute inset-x-0 top-[34%] -translate-y-1/2 text-center font-serif italic font-bold text-[clamp(3.5rem,10vw,7.5rem)] leading-none text-[#4A3B33] select-none pointer-events-none whitespace-nowrap"
                >
                  Hey, there
                </motion.div>

                {/* Warm radial glow behind the portrait */}
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] sm:w-[620px] sm:h-[620px] rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(233,214,182,0.9) 0%, rgba(228,192,144,0.4) 45%, rgba(241,233,215,0) 72%)",
                  }}
                />

                {/* The portrait — ML cutout with a soft grounding shadow, bottom melts into the page */}
                <motion.div
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 mx-auto w-[320px] sm:w-[430px]"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 76%, transparent 99%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 76%, transparent 99%)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/me-cutout.png"
                    alt="Aniket Mishra"
                    className="w-full h-auto block"
                    style={{ filter: "drop-shadow(34px 30px 34px rgba(74,59,51,0.38))" }}
                    draggable={false}
                  />
                </motion.div>

                {/* Small specialization note — right of the portrait */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.55 }}
                  className="hidden lg:block absolute right-0 top-[30%] max-w-[210px] text-[13px] leading-[1.8] text-[#78716C] m-0"
                >
                  Specialized in production web apps, Chrome extensions, media pipelines and AI integrations —
                  shipped on fixed-scope sprints.
                </motion.p>
              </div>

              {/* Giant name — bottom left, filled */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif font-black uppercase text-[#4A3B33] leading-[0.88] tracking-[-0.02em] text-[clamp(2.8rem,8.5vw,6.5rem)] mt-6 lg:mt-0"
              >
                I am<br />Aniket
              </motion.div>

              {/* Giant role — bottom right, OUTLINE style like the reference */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden="true"
                className="font-serif font-black uppercase leading-[0.88] tracking-[-0.02em] text-[clamp(2.2rem,6.5vw,5rem)] text-right lg:absolute lg:right-8 lg:bottom-24 mt-4 lg:mt-0 select-none pointer-events-none"
                style={{ WebkitTextStroke: "2px #4A3B33", color: "transparent", paintOrder: "stroke fill" }}
              >
                Full-Stack<br />Developer
              </motion.div>

            </div>
          </div>
        </header>

        {/* ============ BIO ============ */}
        <section className="relative border-t border-[#E4D9BC] py-16 md:py-20">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            <div className="lg:col-span-4">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B45309]">
                The short version
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#4A3B33] mt-3 mb-4 m-0 leading-snug">
                Work first.<br />Everything else after.
              </h2>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="https://github.com/aniketmishra-0"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#57534E] bg-white rounded-full px-3.5 py-2 shadow-xs hover:text-[#B45309] transition-colors no-underline"
                >
                  <Github className="w-3 h-3" /> @aniketmishra-0
                </a>
                <a
                  href="https://github.com/Mishra-Aniket"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#57534E] bg-white rounded-full px-3.5 py-2 shadow-xs hover:text-[#B45309] transition-colors no-underline"
                >
                  <Github className="w-3 h-3" /> @Mishra-Aniket
                </a>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65 }}
              className="lg:col-span-8 space-y-5 text-[1.02rem] leading-[1.8] text-[#57534E]"
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
              <div className="pt-2 flex flex-wrap gap-3">
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
                  className="group inline-flex items-center gap-2 rounded-[var(--radius)] font-bold text-sm tracking-wide px-6 py-3 transition-all duration-200 bg-white text-[#57534E] shadow-[var(--shadow-soft)] hover:text-[#4A3B33] hover:-translate-y-px no-underline"
                >
                  Read the Case Studies
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick facts — tiles */}
        <section className="relative mx-auto px-6 lg:px-8 pb-20 max-w-[1200px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FACTS.map((f, idx) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                  className="rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)]"
                >
                  <span className="grid place-items-center w-9 h-9 rounded-lg bg-[#B45309]/10 mb-3">
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
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#4A3B33] mb-3 mt-2">Everything I built this year.</h2>
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
        <section className="relative mx-auto px-6 lg:px-8 py-20 max-w-[1200px]">
          <div className="max-w-[700px] mb-10">
            <span className="font-mono text-xs uppercase tracking-wider text-[#B45309] font-bold">How I Work</span>
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
                  className="rounded-xl bg-white p-5 shadow-xs"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-[#B45309]/10 grid place-items-center">
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
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-white text-[#57534E] hover:text-[#B45309] transition-all no-underline"
            >
              <Github className="w-3.5 h-3.5" />
              @aniketmishra-0
            </a>
            <a
              href="https://github.com/Mishra-Aniket"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-white text-[#57534E] hover:text-[#B45309] transition-all no-underline"
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
