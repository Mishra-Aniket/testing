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
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  PlusCircle
} from "lucide-react";
import { sound } from "../utils/sound";
import StudentPerks from "../components/StudentPerks";
import StudentBuilderPass3D from "../components/StudentBuilderPass3D";
import SubmitOfferModal from "../components/SubmitOfferModal";

function RevealTitle({ text }) {
  const words = text.split(" ");
  return (
    <h1 className="font-serif text-[clamp(2.125rem,4.6vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.035em] text-white text-balance">
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

export default function StudentsClientView() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [perksCount, setPerksCount] = useState(null);

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

  // Handle auto-scroll and highlight on hash navigation
  useEffect(() => {
    const handleHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        const targetId = hash.slice(1);
        const el = document.getElementById(targetId);
        if (el) {
          setTimeout(() => {
            if (window.__lenis) {
              window.__lenis.scrollTo(el, { offset: -100, duration: 1.0 });
            } else {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            el.classList.add("ring-2", "ring-[#E4C090]", "ring-offset-4", "transition-all", "duration-500");
            setTimeout(() => {
              el.classList.remove("ring-2", "ring-[#E4C090]", "ring-offset-4");
            }, 2500);
          }, 120);
        }
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div data-theme="dark" className="relative min-h-screen bg-[#141210] text-[#F5F5F4] selection:bg-[#E4C090]/25 selection:text-[#E4C090]">
      {/* Scroll indicator bar */}
      <div 
        aria-hidden="true" 
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#B45309] via-[#E4C090] to-[#B45309] origin-left z-50 pointer-events-none transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Navbar with forced dark mode */}
      <Navbar 
        theme="dark"
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAssessment={() => setAssessmentOpen(true)}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden border-b border-white/[0.08] bg-[#141210]">
          {/* Subtle dark grid background */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)",
              backgroundSize: "140px 140px",
              maskImage: "radial-gradient(ellipse 90% 75% at 50% 50%, #000 30%, transparent 95%)",
              WebkitMaskImage: "radial-gradient(ellipse 90% 75% at 50% 50%, #000 30%, transparent 95%)"
            }}
          />

          <ConstellationCanvas />

          <div className="relative max-w-[1240px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Headline, Description & CTAs */}
              <div className="lg:col-span-6 space-y-6">

                {/* Title */}
                <RevealTitle text="Ship Real Software On A College Budget — 100% Free." />

                {/* Subtitle */}
                <p className="text-[1.05rem] leading-[1.75] text-[#D6D3D1] font-normal">
                  Stop paying out-of-pocket while learning and shipping side projects. From free GPU compute and serverless backends to professional IDE suites, AI credits, and zero-dollar domain names — every verified developer perk worth claiming before graduation.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-1">
                  <a
                    href="#perks"
                    onClick={() => {
                      try {
                        sound.playClick();
                      } catch {}
                    }}
                    className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-[#B45309] px-6 py-3.5 font-mono text-xs font-bold text-white shadow-md hover:bg-[#A16207] transition-all cursor-pointer group"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#E4C090]" />
                    <span>Explore 140+ Deals{perksCount != null ? ` (${perksCount})` : ' (148)'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>

                  {/* Post A Deal Button */}
                  <button
                    onClick={() => {
                      try {
                        sound.playClick();
                      } catch {}
                      setSubmitModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-[#E4C090]/15 hover:bg-[#E4C090]/25 border border-[#E4C090]/40 px-5 py-3.5 font-mono text-xs font-bold text-[#E4C090] shadow-sm transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>+ Post A Deal</span>
                  </button>

                  <a
                    href="https://education.github.com/pack"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      try {
                        sound.playClick();
                      } catch {}
                    }}
                    className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-white/[0.08] px-5 py-3.5 font-mono text-xs font-bold text-white border border-white/[0.18] shadow-sm hover:border-[#E4C090] hover:bg-white/[0.14] transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#E4C090]" />
                    <span>GitHub Pack ↗</span>
                  </a>
                </div>

                {/* Trust Badges Trio */}
                <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-[#A8A29E] pt-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-[#E7E5E4]">
                    <Sparkles className="w-3.5 h-3.5 text-[#E4C090]" />
                    <span>$100K+ combined software value</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-[#E7E5E4]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>100% official direct vendor links</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-[#E7E5E4]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>Community submissions open</span>
                  </div>
                </div>

                {/* Quick Trust Counters */}
                <div className="pt-6 border-t border-white/[0.1] grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white">100% Free</div>
                    <div className="text-[10px] text-[#A8A29E] uppercase tracking-wider mt-0.5">Verified Deals</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#E4C090]">140+</div>
                    <div className="text-[10px] text-[#A8A29E] uppercase tracking-wider mt-0.5">Software Grants</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white">Instant</div>
                    <div className="text-[10px] text-[#A8A29E] uppercase tracking-wider mt-0.5">Official Access</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">Zero Cost</div>
                    <div className="text-[10px] text-[#A8A29E] uppercase tracking-wider mt-0.5">For Students</div>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Interactive Student Builder Pass (Physical Black Card) */}
              <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-end">
                <StudentBuilderPass3D onOpenSubmit={() => setSubmitModalOpen(true)} />
              </div>
            </div>
          </div>
        </section>

        {/* GITHUB STUDENT DEVELOPER PACK OFFERS & COMMUNITY SUBMISSIONS */}
        <StudentPerks
          onCountReady={setPerksCount}
          onOpenSubmit={() => setSubmitModalOpen(true)}
        />

        {/* Bottom CTA */}
        <DarkCTA />
      </main>

      <Footer />

      {/* Community Submit Deal Modal */}
      <SubmitOfferModal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
      />

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
