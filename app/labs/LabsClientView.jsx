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
import { Search, Play, RefreshCw, Cpu, Layers, Sparkles, Check, ArrowRight, Zap } from "lucide-react";
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

export default function LabsClientView() {
  const [activeModel, setActiveModel] = useState("GPT-4o");
  const [intersectEnabled, setIntersectEnabled] = useState(true);
  const [unionEnabled, setUnionEnabled] = useState(true);
  const [subtractEnabled, setSubtractEnabled] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [swapsCount, setSwapsCount] = useState(1);
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

  // Dynamic token pruning simulation
  let candidateTokens = 12400;
  if (unionEnabled) candidateTokens += 3200;
  if (intersectEnabled) candidateTokens = Math.round(candidateTokens * 0.18);
  if (subtractEnabled) candidateTokens = Math.round(candidateTokens * 0.35);
  const finalDeliveredTokens = Math.max(38, Math.round(candidateTokens * 0.08));

  const handleModelChange = (modelName) => {
    sound.playDock();
    setIsSimulating(true);
    setTimeout(() => {
      setActiveModel(modelName);
      setSwapsCount((prev) => prev + 1);
      setIsSimulating(false);
      sound.playSuccess();
    }, 450);
  };

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
                  <span className="text-[#B45309] font-semibold">Labs</span>
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
                Live Laboratory
              </span>
            </motion.div>

            <RevealTitle text="Aniket AI Labs: Context Arithmetic & Router Simulator" />

            <motion.p 
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[68ch] text-[1.125rem] leading-[1.75] text-[#57534E]"
            >
              Experiment live with query-time set operations (Intersection, Union, Subtraction) and simulate multi-model hot-swapping between frontier providers with 0.0s context reset.
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

        {/* Live Interactive Laboratory Section */}
        <section className="relative mx-auto px-6 lg:px-8 pb-24 md:pb-32 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls: Set Arithmetic Toggles */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl border border-[#E4D9BC] bg-white p-7 shadow-lg space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#4A3B33] mb-1">
                    1. Query-Time Context Arithmetic Set Controls
                  </h3>
                  <p className="text-xs text-[#57534E]">
                    Toggle set operations to see how Aniket prunes token windows before inference.
                  </p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {/* Intersection Toggle */}
                  <div
                    onClick={() => {
                      sound.playClick();
                      setIntersectEnabled(!intersectEnabled);
                    }}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      intersectEnabled
                        ? "bg-[#FAF6EE] border-[#B45309] text-[#4A3B33] shadow-xs"
                        : "bg-white border-[#E4D9BC] text-[#78716C]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-[#B45309]">∩</span>
                      <div>
                        <div className="font-bold">Intersection (Scope & Department Filter)</div>
                        <div className="text-[11px] text-[#A8A29E] font-normal">Narrows scope to team:finance & region:emea</div>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${intersectEnabled ? "bg-[#B45309] text-white" : "bg-black/5 text-[#78716C]"}`}>
                      {intersectEnabled ? "ACTIVE" : "OFF"}
                    </span>
                  </div>

                  {/* Union Toggle */}
                  <div
                    onClick={() => {
                      sound.playClick();
                      setUnionEnabled(!unionEnabled);
                    }}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      unionEnabled
                        ? "bg-[#FAF6EE] border-[#B45309] text-[#4A3B33] shadow-xs"
                        : "bg-white border-[#E4D9BC] text-[#78716C]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-[#B45309]">∪</span>
                      <div>
                        <div className="font-bold">Union (Cross-SaaS Knowledge Graph)</div>
                        <div className="text-[11px] text-[#A8A29E] font-normal">Combines Slack, Salesforce CRM & Notion</div>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${unionEnabled ? "bg-[#B45309] text-white" : "bg-black/5 text-[#78716C]"}`}>
                      {unionEnabled ? "ACTIVE" : "OFF"}
                    </span>
                  </div>

                  {/* Subtraction Toggle */}
                  <div
                    onClick={() => {
                      sound.playClick();
                      setSubtractEnabled(!subtractEnabled);
                    }}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      subtractEnabled
                        ? "bg-[#FAF6EE] border-[#B45309] text-[#4A3B33] shadow-xs"
                        : "bg-white border-[#E4D9BC] text-[#78716C]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-[#B45309]">−</span>
                      <div>
                        <div className="font-bold">Subtraction (Superseded & Invalid Drafts)</div>
                        <div className="text-[11px] text-[#A8A29E] font-normal">Excludes superseded v1 policy drafts & stale contracts</div>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${subtractEnabled ? "bg-[#B45309] text-white" : "bg-black/5 text-[#78716C]"}`}>
                      {subtractEnabled ? "ACTIVE" : "OFF"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Model Hot-Swap Switcher */}
              <div className="rounded-2xl border border-[#E4D9BC] bg-white p-7 shadow-lg space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#4A3B33]">
                  2. Model Sovereignty Hot-Swap Switcher
                </h3>
                <p className="text-xs text-[#57534E]">
                  Dock any frontier model freely. Memory and provenance remain 100% sovereign.
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {["GPT-4o", "Claude 3.5", "Gemini 2.0"].map((model) => (
                    <button
                      key={model}
                      onClick={() => handleModelChange(model)}
                      disabled={isSimulating}
                      className={`p-3.5 rounded-xl border font-mono text-xs font-bold transition-all ${
                        activeModel === model
                          ? "bg-[#1C1917] text-[#E4C090] border-[#1C1917] shadow-md"
                          : "bg-[#FAF6EE] text-[#4A3B33] border-[#E4D9BC] hover:border-[#B45309]"
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Telemetry Dashboard */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-[#E4D9BC] bg-[#1C1917] p-7 text-[#F5F5F4] shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                  <span className="font-mono text-xs font-bold text-[#E4C090] uppercase tracking-wider">
                    Live Telemetry
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Sub-300ms SLA
                  </span>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/[0.04]">
                    <span className="text-[#A8A29E]">Active Model Dock:</span>
                    <span className="text-white font-bold">{activeModel}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/[0.04]">
                    <span className="text-[#A8A29E]">Hot-Swaps Executed:</span>
                    <span className="text-[#E4C090] font-bold">{swapsCount} (0.0s Downtime)</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/[0.04]">
                    <span className="text-[#A8A29E]">Raw Unpruned History:</span>
                    <span className="text-red-400 line-through">12,400 Tokens</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-emerald-300 font-bold">Delivered Pruned Window:</span>
                    <span className="text-emerald-400 font-black text-sm">{finalDeliveredTokens} Tokens</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/[0.04]">
                    <span className="text-[#A8A29E]">Cryptographic Hash:</span>
                    <span className="text-[#E4C090]">#A-4821 Turn Trace</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] text-[11px] font-mono text-[#A8A29E] leading-relaxed">
                  ✓ Token window pruned by {Math.round((1 - finalDeliveredTokens / 12400) * 100)}%. Institutional knowledge stays sovereign.
                </div>
              </div>
            </div>
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
