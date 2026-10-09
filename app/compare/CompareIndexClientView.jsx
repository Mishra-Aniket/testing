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
import { Search, ArrowRight } from "lucide-react";
import { sound } from "../utils/sound";
import { COMPARISONS } from "../data/comparisons";

// Kinetic word reveal for page title
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

export default function CompareIndexClientView() {
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

  const comparisonList = Object.values(COMPARISONS);

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#4A3B33] selection:bg-[#B45309]/20 selection:text-[#B45309]">
      {/* Top scroll progress indicator */}
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
        {/* Header Hero */}
        <header className="relative overflow-hidden bg-[#FDFBF7]">
          <div aria-hidden="true" className="plate-grid absolute inset-0 opacity-40 pointer-events-none" />

          <div className="relative mx-auto px-6 lg:px-8 pt-32 md:pt-40 pb-12 md:pb-16 max-w-[1200px]">
            {/* Breadcrumb Fade In */}
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
                  <span className="text-[#B45309] font-semibold">
                    Compare
                  </span>
                </li>
              </ol>
            </motion.nav>

            {/* Category badge Fade In */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B45309] bg-[#B45309]/[0.08] border border-[#B45309]/20 rounded-[var(--radius)] px-3 py-1.5">
                <span aria-hidden="true" className="h-[6px] w-[6px] bg-current" />
                Platform evaluation
              </span>
            </motion.div>

            {/* Kinetic Word-by-Word Title Reveal */}
            <RevealTitle text="Compare AI context engine companies" />

            {/* Description FadeUp */}
            <motion.p 
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[68ch] text-[1.125rem] leading-[1.75] text-[#57534E]"
            >
              AI context engine companies and AI memory platforms overlap, but cover different parts of an agent workflow. Compare what each system stores, how it retrieves business knowledge, and which operations your team must own. Aniket AI focuses on shared context and traceable retrieval for developers and enterprises.
            </motion.p>

            {/* Divider scaleX draw */}
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

        {/* Evaluation Guide Section */}
        <section className="relative mx-auto px-6 lg:px-8 pb-16 max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[800px] space-y-5"
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#4A3B33]">
              How should you evaluate an AI context engine?
            </h2>
            <p className="text-[1.0625rem] leading-[1.75] text-[#57534E]">
              Use the same small set of company documents and questions for each candidate. Include an updated policy, a question with no supported answer, and a request for restricted information. Review retrieved evidence and the generated answer separately. This makes differences in source handling and integration effort easier to assess.
            </p>
            <ul className="space-y-3 pt-2 text-[0.9375rem] text-[#57534E]">
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#B45309] mt-0.5">•</span>
                <span><strong>Knowledge coverage:</strong> does the service handle shared documents, conversation memory, or both?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#B45309] mt-0.5">•</span>
                <span><strong>Retrieval:</strong> can you constrain results by customer, team, source, and version?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#B45309] mt-0.5">•</span>
                <span><strong>Governance:</strong> how do identity, deletion, retention, and export work in your deployment?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#B45309] mt-0.5">•</span>
                <span><strong>Operations:</strong> what can developers inspect when a source is missing or an answer is unsupported?</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-[#B45309] mt-0.5">•</span>
                <span><strong>Commercial fit:</strong> compare current pricing, deployment terms, and usage limits with each provider.</span>
              </li>
            </ul>
          </motion.div>
        </section>

        {/* Comparisons Cards Grid with Staggered Entrance */}
        <section className="relative w-full bg-[#F8F4EE] border-t border-[#E4D9BC]/70 py-20 md:py-28">
          <div className="relative mx-auto px-6 lg:px-8 max-w-[1200px]">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {comparisonList.map((comp, idx) => (
                <motion.div 
                  key={comp.slug} 
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.65, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <Link
                    href={`/compare/${comp.slug}`}
                    onClick={() => sound.playClick()}
                    className="group relative flex h-full flex-col rounded-[var(--radius)] border border-[#E4D9BC] bg-white p-7 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E4C090] hover:shadow-[var(--shadow-soft-lg)]"
                  >
                    {/* Category pill */}
                    <span className="mb-4 inline-flex items-center gap-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#A16207]">
                      <span aria-hidden="true" className="h-[5px] w-[5px] bg-[#A16207]" />
                      {comp.category}
                    </span>

                    {/* Card Title */}
                    <h2 className="mb-3 font-serif text-[1.375rem] font-bold leading-[1.25] tracking-[-0.02em] text-[#4A3B33] group-hover:text-[#B45309] transition-colors">
                      Aniket <span className="text-[#B45309]">vs {comp.competitor}</span>
                    </h2>

                    {/* Card Description */}
                    <p className="flex-1 text-[0.9375rem] leading-[1.7] text-[#57534E] line-clamp-3">
                      {comp.heroLead}
                    </p>

                    {/* CTA link */}
                    <span className="mt-6 inline-flex items-center gap-2 border-t border-[#F1E9DA] pt-5 text-[0.875rem] font-bold text-[#B45309]">
                      Read the comparison
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dark Call To Action */}
        <DarkCTA />
      </main>

      {/* Global Footer */}
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
