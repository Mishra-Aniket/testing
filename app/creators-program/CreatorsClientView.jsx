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
import { Search, Sparkles, Gift, MessageSquare, Megaphone, ArrowRight } from "lucide-react";
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

export default function CreatorsClientView() {
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
                  <span className="text-[#B45309] font-semibold">Creators Program</span>
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
                Builder Grants
              </span>
            </motion.div>

            <RevealTitle text="Aniket AI Creators & Builder Grants Program" />

            <motion.p 
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[68ch] text-[1.125rem] leading-[1.75] text-[#57534E]"
            >
              We support ambitious developers, open-source researchers, and founders building autonomous multi-agent products. Get direct access to our core architects and generous token grants.
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

        {/* Benefits Cards */}
        <section className="relative mx-auto px-6 lg:px-8 pb-24 md:pb-32 max-w-[848px] space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-[#E4D9BC] bg-white p-6 shadow-xs space-y-3">
              <div className="p-2.5 rounded-lg bg-[#FAF6EE] text-[#B45309] w-fit border border-[#E4D9BC]">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#4A3B33]">
                10M Free Tokens / Mo
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                Full API access with 10,000,000 free tokens every month for 12 months. Zero credit card required to start.
              </p>
            </div>

            <div className="rounded-xl border border-[#E4D9BC] bg-white p-6 shadow-xs space-y-3">
              <div className="p-2.5 rounded-lg bg-[#FAF6EE] text-[#B45309] w-fit border border-[#E4D9BC]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#4A3B33]">
                Direct Slack Channel
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                Private engineering Slack channel with our core systems team for ontology design and latency debugging.
              </p>
            </div>

            <div className="rounded-xl border border-[#E4D9BC] bg-white p-6 shadow-xs space-y-3">
              <div className="p-2.5 rounded-lg bg-[#FAF6EE] text-[#B45309] w-fit border border-[#E4D9BC]">
                <Megaphone className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#4A3B33]">
                Community Spotlight
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                Featured product showcase across our developer blog, newsletter, and social channels reaching thousands of CTOs.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E4D9BC] bg-[#FAF6EE] p-8 text-center space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#4A3B33]">
              Apply For The Creators Program
            </h3>
            <p className="text-sm text-[#57534E] max-w-[500px] mx-auto">
              Tell us about your project or agentic architecture. We review applications within 24 hours.
            </p>
            <a
              href="mailto:creators@aniket.one"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-[#B45309] px-6 py-2.5 text-xs font-bold font-mono uppercase tracking-wider text-white shadow-soft hover:bg-[#A16207] transition-all"
            >
              Submit Application →
            </a>
          </div>
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
