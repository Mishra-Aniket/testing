"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import DarkCTA from "../components/DarkCTA";
import Footer from "../components/Footer";
import SearchModal from "../components/SearchModal";
import ConstellationCanvas from "../components/ConstellationCanvas";
import { Calendar, Clock, ArrowRight, BookOpen, Layers } from "lucide-react";
import { sound } from "../utils/sound";

function RevealTitle({ text }) {
  const words = text.split(" ");
  return (
    <h1 className="font-serif text-[clamp(2.125rem,4.6vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.035em] text-[#4A3B33] text-balance">
      {words.map((word, idx) => (
        <span 
          key={idx} 
          className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] pr-[0.18em] -mr-[0.08em]"
        >
          <motion.span
            initial={{ y: "115%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.82,
              delay: 0.12 + idx * 0.08,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

const ARTICLES = [
  {
    slug: "scaling-centrix-500-centers",
    tag: "Enterprise Architecture",
    date: "October 2026",
    readTime: "6 min read",
    title: "Scaling Centrix: Edge-First Lecture Ingestion Across 500+ Physical Centers",
    excerpt:
      "How we engineered an automated ingestion engine for Physics Wallah Vidyapeeth centers pairing OBS capture card recordings with interactive flat panel notes, weighted timetable matching, and direct chunked Google Drive uploads.",
    author: "Aniket Mishra"
  },
  {
    slug: "building-manifest-v3-extensions",
    tag: "Browser Engineering",
    date: "September 2026",
    readTime: "7 min read",
    title: "Building Production Chrome Extensions in Manifest V3: OmTabs & OmSpace Case Study",
    excerpt:
      "Navigating background service worker lifecycles, chrome.storage.local synchronization, WebAuthn biometric shields, and fast DOM injection without degrading browser frame rates.",
    author: "Aniket Mishra"
  },
  {
    slug: "zero-ram-video-streaming-pipeline",
    tag: "Cloud Pipelines",
    date: "August 2026",
    readTime: "5 min read",
    title: "Zero-RAM Media Streaming: Piping Multi-Gigabyte Videos from Drive to YouTube via Node Streams",
    excerpt:
      "How Nexus Streamer bypasses server memory bottlenecks using chunk-by-chunk stream transforms and live Server-Sent Events (SSE) telemetry to upload high-res video assets seamlessly.",
    author: "Aniket Mishra"
  },
  {
    slug: "client-side-ai-image-processing",
    tag: "Web Performance & AI",
    date: "July 2026",
    readTime: "6 min read",
    title: "Client-Side AI & Image Processing: Running ONNX & WebAssembly in the Browser",
    excerpt:
      "Architecting privacy-first web tools where user photos never leave their machine. Implementing on-device background removal and batch conversions using WebAssembly and Web ImageDecoder.",
    author: "Aniket Mishra"
  }
];

export default function BlogClientView() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / total)));
      }
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

      <Navbar 
        onOpenSearch={() => setSearchOpen(true)} 
        onOpenAssessment={() => {}} 
      />

      <main className="relative z-10 bg-[#FDFBF7] text-[#4A3B33]">
        <header className="relative overflow-hidden bg-[#FDFBF7]">
          <div aria-hidden="true" className="plate-grid absolute inset-0 opacity-40 pointer-events-none" />

          <div className="relative mx-auto px-6 lg:px-8 pt-32 md:pt-40 pb-12 md:pb-16 max-w-[848px]">
            <motion.nav 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Breadcrumb" 
              className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#A8A29E] mb-7"
            >
              <ol className="flex items-center gap-2 m-0 p-0 list-none">
                <li>
                  <Link 
                    href="/" 
                    onClick={() => sound.playClick()}
                    className="text-[#78716C] no-underline transition-colors hover:text-[#4A3B33]"
                  >
                    Home
                  </Link>
                  <span aria-hidden="true" className="mx-2 text-[#D6D3D1]">/</span>
                </li>
                <li>
                  <span className="text-[#B45309] font-semibold">Engineering Blog</span>
                </li>
              </ol>
            </motion.nav>

            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B45309] bg-[#B45309]/[0.08] border border-[#B45309]/20 rounded-[var(--radius)] px-3 py-1.5">
                <span aria-hidden="true" className="h-[6px] w-[6px] bg-current" />
                Technical Notes &amp; Systems Insights
              </span>
            </motion.div>

            <RevealTitle text="Technical Deep-Dives & Engineering Notes" />

            <motion.p 
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[68ch] text-[1.125rem] leading-[1.75] text-[#57534E]"
            >
              Real-world case studies, architecture blueprints, and lessons learned from engineering production Chrome extensions, automated media pipelines, and scalable full-stack applications.
            </motion.p>

            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.95, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "0% 50%" }}
              aria-hidden="true" 
              className="h-px w-full bg-[#E4D9BC] mt-12 md:mt-16" 
            />
          </div>
        </header>

        {/* Articles List */}
        <section className="relative mx-auto px-6 lg:px-8 pb-24 md:pb-32 max-w-[848px] space-y-10">
          {ARTICLES.map((article, idx) => (
            <motion.article 
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative rounded-xl border border-[#E4D9BC] bg-white p-7 sm:p-9 shadow-xs hover:border-[#B45309] hover:shadow-[var(--shadow-soft-lg)] transition-all duration-300"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono text-[#78716C]">
                <span className="px-2.5 py-1 rounded bg-[#FAF6EE] text-[#B45309] font-semibold border border-[#E4D9BC]">
                  {article.tag}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#4A3B33] mb-3 group-hover:text-[#B45309] transition-colors leading-snug">
                {article.title}
              </h2>

              <p className="text-sm sm:text-[15px] leading-relaxed text-[#57534E] mb-6">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-[#E4D9BC]/60">
                <span className="text-xs font-mono text-[#78716C]">
                  By <strong className="text-[#4A3B33]">{article.author}</strong>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#B45309] group-hover:translate-x-1 transition-transform">
                  Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </section>

        <DarkCTA />
      </main>

      <Footer />

      <SearchModal
        isOpen={searchOpen}
        onOpen={() => setSearchOpen(true)}
        onClose={() => setSearchOpen(false)}
      />
    </div>
  );
}
