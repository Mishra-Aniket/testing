"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, RefreshCw, Cpu, Layers, Sparkles, Check, ArrowRight } from "lucide-react";
import { sound } from "../utils/sound";

export default function LabsModal({ isOpen, onClose }) {
  const [activeModel, setActiveModel] = useState("GPT-4o");
  const [intersectEnabled, setIntersectEnabled] = useState(true);
  const [unionEnabled, setUnionEnabled] = useState(true);
  const [subtractEnabled, setSubtractEnabled] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [swapsCount, setSwapsCount] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Compute active tokens based on toggled arithmetic set operations
  let candidateTokens = 12400;
  if (unionEnabled) candidateTokens += 3200;
  if (intersectEnabled) candidateTokens = Math.round(candidateTokens * 0.18);
  if (subtractEnabled) candidateTokens = Math.round(candidateTokens * 0.35);
  const finalDeliveredTokens = Math.max(38, Math.round(candidateTokens * 0.08));

  const handleModelChange = (modelName) => {
    sound.playDock();
    setActiveModel(modelName);
    setSwapsCount((c) => c + 1);
  };

  const handleRunSimulation = () => {
    sound.playSuccess();
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-[#1C1917]/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#E4D9BC] bg-[#FDFBF7] p-6 sm:p-8 shadow-2xl text-[#4A3B33] z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E4D9BC]">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold text-[#B45309] uppercase tracking-[0.2em] mb-1">
                <span className="w-2 h-2 rounded-full bg-[#B45309] animate-pulse" />
                INTERACTIVE CONTEXT ARITHMETIC LABORATORY
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A3B33]">
                Aniket Labs: Live Arithmetic Simulator
              </h2>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-lg text-[#78716C] hover:text-[#4A3B33] hover:bg-black/[0.05] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Playground Grid */}
          <div className="py-6 space-y-6">
            {/* Step 1: Model Hot-Swap Dock */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-[#78716C] uppercase tracking-wider">
                  1. Docked LLM (Zero-Downtime Hot Swap)
                </span>
                <span className="font-mono text-[10px] text-[#B45309]">
                  Hot-Swaps: #{swapsCount} · Memory Reset: 0.0s
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { name: "GPT-4o", vendor: "OpenAI" },
                  { name: "Claude 3.5 Sonnet", vendor: "Anthropic" },
                  { name: "Gemini 1.5 Pro", vendor: "Google" },
                  { name: "DeepSeek V3", vendor: "Open-Weights" }
                ].map((m) => {
                  const isDocked = activeModel === m.name;
                  return (
                    <button
                      key={m.name}
                      onClick={() => handleModelChange(m.name)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isDocked
                          ? "border-[#B45309] bg-white shadow-md ring-2 ring-[#B45309]/20"
                          : "border-[#E4D9BC] bg-white hover:border-[#B45309]/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#A8A29E]">
                          {m.vendor}
                        </span>
                        {isDocked && <span className="w-2 h-2 rounded-full bg-[#B45309] animate-ping" />}
                      </div>
                      <div className="font-serif font-bold text-xs text-[#4A3B33]">
                        {m.name}
                      </div>
                      <div className="font-mono text-[9px] text-[#B45309] mt-1 font-semibold">
                        {isDocked ? "● DOCKED LIVE" : "CLICK TO SWAP"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Context Arithmetic Operators */}
            <div>
              <span className="block font-mono text-xs font-bold text-[#78716C] uppercase tracking-wider mb-2">
                2. Dynamic Set Arithmetic Operators (Toggle to witness pruning)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* ∩ Intersect */}
                <button
                  onClick={() => {
                    sound.playClick();
                    setIntersectEnabled(!intersectEnabled);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    intersectEnabled
                      ? "border-[#B45309] bg-white shadow-sm"
                      : "border-[#E4D9BC] bg-[#FAF6EE]/50 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-base font-bold text-[#B45309]">∩ INTERSECT</span>
                    <span className="font-mono text-[10px] text-[#A8A29E]">{intersectEnabled ? "ON" : "OFF"}</span>
                  </div>
                  <div className="font-serif font-bold text-xs text-[#4A3B33] mb-1">Scope Narrowing</div>
                  <div className="text-[11px] text-[#57534E]">Restricts recall strictly to team &amp; regional boundary (`emea`).</div>
                </button>

                {/* ∪ Union */}
                <button
                  onClick={() => {
                    sound.playClick();
                    setUnionEnabled(!unionEnabled);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    unionEnabled
                      ? "border-[#B45309] bg-white shadow-sm"
                      : "border-[#E4D9BC] bg-[#FAF6EE]/50 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-base font-bold text-[#B45309]">∪ UNION</span>
                    <span className="font-mono text-[10px] text-[#A8A29E]">{unionEnabled ? "ON" : "OFF"}</span>
                  </div>
                  <div className="font-serif font-bold text-xs text-[#4A3B33] mb-1">Cross-Source Recall</div>
                  <div className="text-[11px] text-[#57534E]">Combines raw documents from Jira, Drive, Slack, and CRM simultaneously.</div>
                </button>

                {/* − Subtract */}
                <button
                  onClick={() => {
                    sound.playClick();
                    setSubtractEnabled(!subtractEnabled);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    subtractEnabled
                      ? "border-[#B45309] bg-white shadow-sm"
                      : "border-[#E4D9BC] bg-[#FAF6EE]/50 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-base font-bold text-[#B45309]">− SUBTRACT</span>
                    <span className="font-mono text-[10px] text-[#A8A29E]">{subtractEnabled ? "ON" : "OFF"}</span>
                  </div>
                  <div className="font-serif font-bold text-xs text-[#4A3B33] mb-1">Deprecation Deduction</div>
                  <div className="text-[11px] text-[#57534E]">Eliminates superseded 2024 pricing and stale policies before LLM sees tokens.</div>
                </button>
              </div>
            </div>

            {/* Step 3: Live Output Terminal & Pruning Telemetry */}
            <div className="rounded-xl border border-[#E4D9BC] bg-[#1C1917] p-5 text-[#F5F5F4] font-mono shadow-md">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
                <span className="text-[#E4C090] font-bold">
                  Active Context State · Docked on {activeModel}
                </span>
                <span className="text-[#A8A29E] text-[10px]">
                  Latency: 284ms p95
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center py-2 mb-3 bg-white/5 rounded-lg border border-white/5">
                <div>
                  <div className="text-[9px] uppercase text-[#A8A29E] mb-0.5">Raw Corpus</div>
                  <div className="text-base font-bold text-white">1.2M docs</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase text-[#A8A29E] mb-0.5">Candidate Tokens</div>
                  <div className="text-base font-bold text-amber-200">{candidateTokens.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase text-[#A8A29E] mb-0.5">Surviving Tokens</div>
                  <div className="text-base font-bold text-[#E4C090]">{finalDeliveredTokens} tokens</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase text-[#A8A29E] mb-0.5">Token Pruning Ratio</div>
                  <div className="text-base font-bold text-green-400">
                    {(100 - (finalDeliveredTokens / 12400) * 100).toFixed(1)}% saved
                  </div>
                </div>
              </div>

              <div className="text-xs text-stone-300 space-y-1">
                <div>
                  <span className="text-[#B45309] font-bold">&gt;</span> aniket.context.solve({`{`} scope: &quot;emea&quot;, ontology: &quot;arr&quot; {`}`})
                </div>
                <div className="text-green-300">
                  ✔ Verified deterministic answer: $4.2M ARR (Provenance trace #A-4821 linked)
                </div>
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="pt-4 border-t border-[#E4D9BC] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleRunSimulation}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E4D9BC] bg-white font-mono text-xs font-bold text-[#4A3B33] hover:border-[#B45309] transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin text-[#B45309]" : ""}`} />
              <span>Simulate Context Query Cycle</span>
            </button>

            <a
              href="#get-access"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#B45309] text-white font-bold text-xs hover:bg-[#A16207] shadow-sm transition-all"
            >
              <span>Deploy In Your Stack</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
