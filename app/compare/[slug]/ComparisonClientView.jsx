"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import DarkCTA from "../../components/DarkCTA";
import Footer from "../../components/Footer";
import SearchModal from "../../components/SearchModal";
import ContextAssessmentModal from "../../components/ContextAssessmentModal";
import ConstellationCanvas from "../../components/ConstellationCanvas";
import LiveBenchmarkSandbox from "../../components/LiveBenchmarkSandbox";
import { Search } from "lucide-react";
import { sound } from "../../utils/sound";

// Masked kinetic word reveal component matching getalchemystai.com RevealText
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
              ease: [0.16, 1, 0.3, 1] // Ultra-smooth Apple deceleration easing
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

export default function ComparisonClientView({ comp }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll reading progress bar tracking
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
      {/* Top 2px reading scroll progress bar matching original site */}
      <div 
        aria-hidden="true" 
        className="fixed top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#B45309] via-[#A16207] to-[#E4C090] z-[9999] pointer-events-none transition-transform duration-75 ease-out" 
        style={{ transformOrigin: "0%", transform: `scaleX(${scrollProgress})` }} 
      />

      {/* Background Interactive Warm Constellation Particle Canvas */}
      <ConstellationCanvas />

      {/* Floating Pill Header / Navigation */}
      <Navbar 
        onOpenSearch={() => setSearchOpen(true)} 
        onOpenAssessment={() => setAssessmentOpen(true)} 
      />

      <main className="relative z-10 bg-[#FDFBF7] text-[#4A3B33]">
        {/* Header Hero Section */}
        <header className="relative overflow-hidden bg-[#FDFBF7]">
          {/* Subtle grid pattern background */}
          <div aria-hidden="true" className="plate-grid absolute inset-0 opacity-40 pointer-events-none" />

          <div className="relative mx-auto px-6 lg:px-8 pt-32 md:pt-40 pb-12 md:pb-16 max-w-[848px]">
            {/* Breadcrumb Fade In */}
            <motion.nav 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Breadcrumb" 
              className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#A8A29E] mb-7"
            >
              <ol className="flex flex-wrap items-center gap-2 m-0 p-0 list-none">
                <li className="inline-flex items-center gap-2">
                  <Link 
                    href="/" 
                    onClick={() => sound.playClick()}
                    className="text-[#78716C] no-underline transition-colors hover:text-[#4A3B33]"
                  >
                    Home
                  </Link>
                  <span aria-hidden="true" className="text-[#D6D3D1]">/</span>
                </li>
                <li className="inline-flex items-center gap-2">
                  <Link 
                    href="/compare" 
                    onClick={() => sound.playClick()}
                    className="text-[#78716C] no-underline transition-colors hover:text-[#4A3B33]"
                  >
                    Compare
                  </Link>
                  <span aria-hidden="true" className="text-[#D6D3D1]">/</span>
                </li>
                <li className="inline-flex items-center gap-2">
                  <span className="text-[#B45309] font-semibold truncate max-w-[50ch]">
                    {comp.breadcrumbTitle || comp.title}
                  </span>
                </li>
              </ol>
            </motion.nav>

            {/* Title with Word-by-Word Kinetic Reveal Animation */}
            <RevealTitle text={comp.title} />

            {/* Lead text with Silky FadeUp */}
            <motion.p 
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[68ch] text-[1.125rem] leading-[1.75] text-[#57534E]"
            >
              {comp.heroLead}
            </motion.p>

            {/* Last updated badge with FadeUp */}
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#78716C]"
            >
              <span aria-hidden="true" className="h-[6px] w-[6px] bg-[#E4C090] inline-block" />
              Last updated: {comp.lastUpdated}
            </motion.p>

            {/* Horizontal Line Drawing Animation (scaleX 0 -> 1) */}
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

        {/* Content Body: Table + Articles */}
        <div className="relative mx-auto px-6 lg:px-8 pb-24 md:pb-32 max-w-[848px]">
          {/* Comparison Table with Upward Entrance Glide */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="relative my-10 overflow-hidden rounded-[var(--radius)] border border-[#E4D9BC] bg-white shadow-[var(--shadow-soft)] mt-0"
          >
            {/* Mobile horizontal swipe indicator */}
            <div className="md:hidden flex items-center justify-between px-4 py-2 bg-[#FAF6EE] border-b border-[#E4D9BC] font-mono text-[10px] text-[#A8A29E]">
              <span className="text-[#B45309] font-bold">COMPARISON MATRIX</span>
              <span>Swipe table ↔</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] md:min-w-[640px] border-collapse text-left text-[0.85rem] sm:text-[0.9rem] leading-[1.55]">
              <thead>
                <tr>
                  <th 
                    scope="col" 
                    className="border-b px-5 py-4 align-bottom font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] border-b-[#E4D9BC] bg-[#F8F4EE] text-[#78716C]"
                  >
                    Feature
                  </th>
                  <th 
                    scope="col" 
                    className="border-b px-5 py-4 align-bottom font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] border-b-[#B45309] bg-[#FBF4EA] text-[#B45309]"
                  >
                    <span aria-hidden="true" className="mr-2 inline-block h-[6px] w-[6px] -translate-y-px bg-[#B45309]" />
                    Aniket AI
                  </th>
                  <th 
                    scope="col" 
                    className="border-b px-5 py-4 align-bottom font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] border-b-[#E4D9BC] bg-[#F8F4EE] text-[#78716C]"
                  >
                    {comp.competitor}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comp.table.map((row, idx) => (
                  <tr key={idx} className="group/row">
                    <th 
                      scope="row" 
                      className={`px-5 py-4 align-top transition-colors duration-200 font-bold text-[#4A3B33] group-hover/row:bg-[#FDFBF7] ${
                        idx !== comp.table.length - 1 ? "border-b border-[#F1E9DA]" : ""
                      }`}
                    >
                      {row.feature}
                    </th>
                    <td 
                      className={`px-5 py-4 align-top transition-colors duration-200 bg-[#FDF8F0] font-medium text-[#4A3B33] group-hover/row:bg-[#FBF1E4] ${
                        idx !== comp.table.length - 1 ? "border-b border-[#F1E9DA]" : ""
                      }`}
                    >
                      {row.aniket}
                    </td>
                    <td 
                      className={`px-5 py-4 align-top transition-colors duration-200 text-[#57534E] group-hover/row:bg-[#FDFBF7] ${
                        idx !== comp.table.length - 1 ? "border-b border-[#F1E9DA]" : ""
                      }`}
                    >
                      {row.competitor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </motion.div>

          {/* Unique Live Architectural Head-to-Head Benchmark Sandbox */}
          <LiveBenchmarkSandbox comp={comp} />

          {/* Editorial Articles / Sections with whileInView Stagger */}
          <div className="space-y-12 pt-4">
            {comp.sections.map((section, sIdx) => (
              <motion.section 
                key={sIdx} 
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <h2 className="font-serif text-2xl md:text-[1.875rem] font-bold leading-[1.3] tracking-[-0.02em] text-[#4A3B33]">
                  {section.title}
                </h2>
                {section.content.map((para, pIdx) => (
                  <p key={pIdx} className="text-[1.0625rem] leading-[1.8] text-[#57534E]">
                    {para}
                  </p>
                ))}
              </motion.section>
            ))}
          </div>

          {/* Explore other comparisons card list with On-Scroll FadeUp */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 pt-12 border-t border-[#E4D9BC]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#78716C] font-semibold">
                Explore More Comparisons
              </h3>
              <Link 
                href="/compare" 
                onClick={() => sound.playClick()}
                className="font-mono text-xs text-[#B45309] hover:underline font-semibold"
              >
                All Comparisons →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-medium">
              {[
                { title: "Aniket AI vs Mem0", href: "/compare/aniket-vs-mem0" },
                { title: "Aniket AI vs Glean", href: "/compare/aniket-vs-glean" },
                { title: "Aniket AI vs Palantir Foundry", href: "/compare/aniket-vs-palantir" },
                { title: "Aniket AI vs Zep", href: "/compare/aniket-vs-zep" },
                { title: "Aniket AI vs Databricks AI", href: "/compare/aniket-vs-databricks" },
                { title: "Aniket AI vs Claude Memory", href: "/compare/aniket-vs-claude" },
              ].filter(item => !item.href.includes(comp.slug)).slice(0, 4).map((other, oIdx) => (
                <Link
                  key={oIdx}
                  href={other.href}
                  onClick={() => sound.playClick()}
                  className="group p-4 rounded-lg border border-[#E4D9BC] bg-white hover:border-[#B45309] hover:bg-[#FAF6EE] text-[#4A3B33] text-sm flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span className="group-hover:text-[#B45309] transition-colors">{other.title}</span>
                  <span className="text-[#B45309] transition-transform group-hover:translate-x-1">→</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Dark Call To Action */}
        <DarkCTA />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onOpen={() => setSearchOpen(true)}
        onClose={() => setSearchOpen(false)}
      />

      {/* Interactive Context Assessment Modal */}
      <ContextAssessmentModal
        isOpen={assessmentOpen}
        onClose={() => setAssessmentOpen(false)}
      />
    </div>
  );
}
