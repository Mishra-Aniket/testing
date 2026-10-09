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
import { Search, BookOpen, Clock, ArrowRight } from "lucide-react";
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

export default function ThesisClientView() {
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
                  <span className="text-[#B45309] font-semibold">Context Thesis</span>
                </li>
              </ol>
            </motion.nav>

            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7 flex items-center gap-4 text-xs font-mono text-[#78716C]"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B45309] bg-[#B45309]/[0.08] border border-[#B45309]/20 rounded-[var(--radius)] px-3 py-1.5">
                <span aria-hidden="true" className="h-[6px] w-[6px] bg-current" />
                Engineering Philosophy
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B45309]" /> 7 min read
              </span>
            </motion.div>

            <RevealTitle text="The Context Thesis: Why Intelligence Needs Sovereignty" />

            <motion.p 
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[68ch] text-[1.125rem] leading-[1.75] text-[#57534E]"
            >
              Every year, base foundation models get faster, cheaper, and smarter. But models are fleeting commodities. The enterprise asset that compounds indefinitely is your proprietary institutional context.
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

        {/* Essay Content */}
        <article className="relative mx-auto px-6 lg:px-8 pb-24 md:pb-32 max-w-[848px] space-y-12">
          {/* Pull Quote */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border-l-4 border-[#B45309] bg-[#FAF6EE] p-6 sm:p-8 italic font-serif text-xl sm:text-2xl text-[#4A3B33] leading-relaxed shadow-xs"
          >
            “The greatest mistake in modern AI systems architecture is conflating the reasoning engine with the memory bank. Keep them decoupled, or surrender your company’s sovereign truth.”
          </motion.div>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A3B33]">
              1. The Commodity Trap of Foundation Models
            </h2>
            <p className="text-[1.0625rem] leading-[1.8] text-[#57534E]">
              From GPT-3 to GPT-4o, Claude 3.5 Sonnet to Gemini 2.0 Flash, frontier models displace each other on benchmark leaderboards every ninety days. If your engineering architecture couples persistent institutional state to a single model provider's proprietary memory store, you are fundamentally locked in.
            </p>
            <p className="text-[1.0625rem] leading-[1.8] text-[#57534E]">
              When Anthropic releases a cheaper model, or Google offers 1M token contexts for a fraction of the cost, switching models should take milliseconds, not an architectural rewrite.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A3B33]">
              2. Semantic Drift and the Flaw of Cosine Similarity
            </h2>
            <p className="text-[1.0625rem] leading-[1.8] text-[#57534E]">
              Naïve RAG and flat vector databases were built for consumer document search. They rely on cosine distance over opaque vector embeddings. But enterprise truth is not about "which words sound similar."
            </p>
            <p className="text-[1.0625rem] leading-[1.8] text-[#57534E]">
              If Sales defines "ARR" as total committed contract value, while Finance defines "ARR" as GAAP-recognized recurring revenue, vector search retrieves both chunks with equal confidence. The agent hallucinates. Aniket AI solves this through <strong>Semantic Consensus</strong>: ontological governance that reconciles contested definitions at write time.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A3B33]">
              3. Context Arithmetic: The Mathematical Primitive
            </h2>
            <p className="text-[1.0625rem] leading-[1.8] text-[#57534E]">
              Instead of stuffing 100,000 raw conversational tokens into an LLM window, Aniket executes query-time Set Arithmetic:
            </p>
            <div className="rounded-xl bg-[#1C1917] p-5 font-mono text-xs text-[#E4C090] space-y-1.5 shadow-inner">
              <div>// Query-time set operations over institutional graph:</div>
              <div className="text-white">context = (source_sales ∩ region_emea) ∪ canonical_arr − superseded_clauses</div>
              <div className="text-[#A8A29E] pt-2">// Delivered: 42 verified tokens with cryptographic Turn Trace #A-4821</div>
            </div>
            <p className="text-[1.0625rem] leading-[1.8] text-[#57534E]">
              This reduces inference latency below 291ms, prunes over 82% of raw token expenditure, and ensures zero policy leakage across departments.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A3B33]">
              Conclusion: Sovereign Infrastructure
            </h2>
            <p className="text-[1.0625rem] leading-[1.8] text-[#57534E]">
              Aniket AI is built as the sovereign layer for the next decade of autonomous systems. Connect your systems of record once, retain full provenance over every decision, and let your agents operate with mathematical certainty.
            </p>
          </section>
        </article>

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
