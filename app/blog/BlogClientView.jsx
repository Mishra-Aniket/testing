"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import DarkCTA from "../components/DarkCTA";
import Footer from "../components/Footer";
import SearchModal from "../components/SearchModal";
import ContextAssessmentModal from "../components/ContextAssessmentModal";
import ConstellationCanvas from "../components/ConstellationCanvas";
import { Search, Calendar, Clock, ArrowRight, Terminal } from "lucide-react";
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
    slug: "context-tracing-walkthrough",
    tag: "Walkthrough",
    date: "June 2026",
    readTime: "8 min read",
    title: "How do you debug what an agent can't see? Context Tracing with Aniket Sovereign Layer",
    excerpt:
      "When an agent hallucinates or makes a bad operational call, teams struggle to determine whether the model failed or the retrieval pipeline withheld critical context. Here is how cryptographic turn tracing solves the opacity problem.",
    author: "Aniket Systems Architecture Team"
  },
  {
    slug: "context-arithmetic-set-theory",
    tag: "Architecture",
    date: "May 2026",
    readTime: "6 min read",
    title: "Context Arithmetic: Query-Time Set Operations over Enterprise Knowledge",
    excerpt:
      "Why cosine similarity over flat embeddings fails on real-world contracts and accounting rules, and how set operations (∩ ∪ − rank) prune 82% of tokens with zero drift.",
    author: "Deep Learning Research Lab"
  },
  {
    slug: "multi-model-hot-swap-guide",
    tag: "Production Guide",
    date: "April 2026",
    readTime: "5 min read",
    title: "Zero-Downtime Model Swaps: Decoupling LLM Reasoning from Institutional State",
    excerpt:
      "A hands-on walkthrough hot-swapping from OpenAI GPT-4o to Anthropic Claude 3.5 Sonnet across 50 live production customer agents without wiping state.",
    author: "Platform Infrastructure Team"
  }
];

export default function BlogClientView() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
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
        className="fixed top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#B45309] via-[#A16207] to-[#E4C090] z-[9999] pointer-events-none transition-transform duration-75 ease-out" 
        style={{ transformOrigin: "0%", transform: `scaleX(${scrollProgress})` }} 
      />

      <ConstellationCanvas />

      <Navbar 
        onOpenSearch={() => setSearchOpen(true)} 
        onOpenAssessment={() => setAssessmentOpen(true)} 
      />

      <main className="relative z-10 bg-[#FDFBF7] text-[#4A3B33]">
        <header className="relative overflow-hidden bg-[#FDFBF7]">
          <div aria-hidden="true" className="plate-grid absolute inset-0 opacity-40 pointer-events-none" />

          <div className="relative mx-auto px-6 lg:px-8 pt-32 md:pt-40 pb-12 md:pb-16 max-w-[1200px]">
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
                  <span className="text-[#B45309] font-semibold">Blog</span>
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
                Engineering & Architecture
              </span>
            </motion.div>

            <RevealTitle text="Engineering Blog & Technical Deep Dives" />

            <motion.p 
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[68ch] text-[1.125rem] leading-[1.75] text-[#57534E]"
            >
              Deep technical breakdowns of autonomous agent state management, Context Tracing, ontological set arithmetic, and sovereign enterprise infrastructure.
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
        <section className="relative mx-auto px-6 lg:px-8 pb-24 md:pb-32 max-w-[1200px] space-y-8">
          {ARTICLES.map((art, idx) => (
            <motion.article
              key={art.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-[#E4D9BC] bg-white p-7 sm:p-10 shadow-[var(--shadow-soft)] transition-all hover:border-[#E4C090] hover:shadow-[var(--shadow-soft-lg)]"
            >
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#78716C] mb-4">
                <span className="px-2.5 py-1 rounded bg-[#FAF6EE] text-[#B45309] border border-[#E4D9BC] font-semibold">
                  {art.tag}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#A8A29E]" /> {art.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#A8A29E]" /> {art.readTime}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A3B33] mb-4 hover:text-[#B45309] transition-colors">
                {art.title}
              </h2>

              <p className="text-[1.0625rem] leading-[1.75] text-[#57534E] mb-6">
                {art.excerpt}
              </p>

              {/* Interactive Code Snippet Preview in First Article */}
              {idx === 0 && (
                <div className="mb-6 rounded-xl bg-[#1C1917] p-4 text-xs font-mono text-[#E4C090] space-y-1.5 shadow-inner">
                  <div className="text-[#78716C]">// Inspecting Cryptographic Provenance Trace #A-4821</div>
                  <div className="text-emerald-400">const trace = await aniket.trace.get(sessionId, turnIndex);</div>
                  <div className="text-[#A8A29E]">console.log(trace.rulesApplied); // [&quot;arr_v2&quot;, &quot;exclude_superseded&quot;]</div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-[#E4D9BC]/50 font-mono text-xs">
                <span className="text-[#78716C]">By {art.author}</span>
                <span className="text-[#B45309] font-bold flex items-center gap-1.5 group cursor-pointer">
                  Read Walkthrough <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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

      <ContextAssessmentModal
        isOpen={assessmentOpen}
        onClose={() => setAssessmentOpen(false)}
      />
    </div>
  );
}
