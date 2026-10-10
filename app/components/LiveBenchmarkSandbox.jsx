"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, CheckCircle2, AlertTriangle, Cpu, Terminal, Zap, ShieldCheck } from "lucide-react";
import { sound } from "../utils/sound";

export default function LiveBenchmarkSandbox({ comp }) {
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(true);
  const [activeQuery, setActiveQuery] = useState("q3-revenue");

  const QUERIES = {
    "q3-revenue": {
      label: "Q3 EMEA Enterprise ARR",
      query: "context.search({ query: 'Q3 EMEA ARR', ontology: 'arr_v2', excludeSuperseded: true })",
      competitorOutput: {
        latency: "512ms",
        tokens: "34,200 tokens",
        accuracy: "48% (Drift)",
        status: "Ambiguous Entity Conflict",
        snippet: "Retrieved 3 conflicting Slack excerpts & unverified 2024 spreadsheet. Hallucinated ARR at $3.8M due to missing EMEA carveout rule."
      },
      aniketOutput: {
        latency: "284ms",
        tokens: "42 audited tokens",
        accuracy: "100% Deterministic",
        status: "Cryptographically Verified",
        snippet: "Resolved to canonical definition arr_v2. Excluded superseded contract draft. Exact $4.2M ARR delivered with Provenance Trace #A-4821."
      }
    },
    "contract-jurisdiction": {
      label: "MSA Liability Limitation",
      query: "context.search({ query: 'liability cap SLA', groupName: ['legal', 'enterprise'], scope: 'active_jurisdiction' })",
      competitorOutput: {
        latency: "640ms",
        tokens: "48,150 tokens",
        accuracy: "52% (Diluted)",
        status: "Outdated Clause Leakage",
        snippet: "Returned standard 12-month cap without subtracting Amendment #3 signed in May 2026. High operational legal exposure."
      },
      aniketOutput: {
        latency: "291ms",
        tokens: "64 audited tokens",
        accuracy: "100% Deterministic",
        status: "Cryptographically Verified",
        snippet: "Applied set operation (− superseded_v1). Extracted exact amended 24-month cap with verified signer signatures and audit hash."
      }
    },
    "hr-tier-triage": {
      label: "Leave Carryover Policy",
      query: "context.search({ query: 'maternity sabbatical carryover', groupName: ['hr', 'apac'] })",
      competitorOutput: {
        latency: "485ms",
        tokens: "28,900 tokens",
        accuracy: "61% (Probabilistic)",
        status: "Cross-Region Contamination",
        snippet: "Retrieved North American employee handbook instead of APAC regional addendum. Agent gave incorrect 15-day limit."
      },
      aniketOutput: {
        latency: "278ms",
        tokens: "38 audited tokens",
        accuracy: "100% Deterministic",
        status: "Cryptographically Verified",
        snippet: "Enforced regional boundary intersection (∩ apac). Delivered exact 30-day policy with statutory compliance sign-off."
      }
    }
  };

  const current = QUERIES[activeQuery] || QUERIES["q3-revenue"];

  const handleRun = () => {
    sound.playDock();
    setIsRunning(true);
    setHasRun(false);

    setTimeout(() => {
      sound.playSuccess();
      setIsRunning(false);
      setHasRun(true);
    }, 650);
  };

  return (
    <div className="my-12 rounded-2xl border border-[#E4D9BC] bg-[#FAF6EE] p-6 sm:p-8 shadow-[var(--shadow-soft)]">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4D9BC]">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[10.5px] font-bold text-[#B45309] uppercase tracking-[0.16em] mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#B45309] animate-pulse" />
            LIVE ARCHITECTURAL BENCHMARK SIMULATOR
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A3B33]">
            Watch Query-Time Determinism vs. Probabilistic Drift
          </h3>
        </div>

        {/* Trigger Button */}
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-[#B45309] px-5 py-2.5 text-xs font-bold font-mono uppercase tracking-wider text-white shadow-soft transition-all duration-200 hover:bg-[#A16207] hover:-translate-y-px active:scale-[0.98] disabled:opacity-50 cursor-pointer"
        >
          {isRunning ? (
            <>
              <RotateCcw className="w-3.5 h-3.5 animate-spin" />
              <span>Simulating...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Live Query</span>
            </>
          )}
        </button>
      </div>

      {/* Query Selector Tabs */}
      <div className="flex items-center gap-2 pt-4 pb-4 overflow-x-auto scrollbar-none">
        {Object.keys(QUERIES).map((qKey) => (
          <button
            key={qKey}
            onClick={() => {
              sound.playClick();
              setActiveQuery(qKey);
            }}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold whitespace-nowrap transition-all ${
              activeQuery === qKey
                ? "bg-white text-[#B45309] border border-[#B45309] shadow-xs"
                : "text-[#78716C] hover:text-[#4A3B33] hover:bg-black/[0.04]"
            }`}
          >
            {QUERIES[qKey].label}
          </button>
        ))}
      </div>

      {/* Code Query Inspector Bar */}
      <div className="rounded-lg bg-[#1C1917] p-3 text-xs font-mono text-[#F5F5F4] flex items-center gap-3 overflow-x-auto shadow-inner mb-6">
        <span className="text-[#E4C090] shrink-0 font-bold">$ query:</span>
        <span className="text-[#A8A29E] truncate">{current.query}</span>
      </div>

      {/* Two Column Side-by-Side Comparison Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Competitor Column */}
        <div className="rounded-xl border border-red-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-red-100 mb-3">
              <span className="font-mono text-xs font-bold text-red-700 uppercase tracking-wider">
                {comp.competitor} (Probabilistic)
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                <AlertTriangle className="w-3 h-3" /> Drift Risk
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 mb-4 font-mono text-[11px] text-[#78716C]">
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-[#A8A29E]">Latency</span>
                <span className="font-bold text-[#4A3B33]">{current.competitorOutput.latency}</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-[#A8A29E]">Tokens</span>
                <span className="font-bold text-[#4A3B33]">{current.competitorOutput.tokens}</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-[#A8A29E]">Reliability</span>
                <span className="font-bold text-red-600">{current.competitorOutput.accuracy}</span>
              </div>
            </div>

            {/* Output Snippet */}
            <div className="rounded-lg bg-red-50/60 p-3.5 border border-red-100 text-xs leading-relaxed text-[#57534E]">
              <div className="font-semibold text-red-800 mb-1 text-[11px]">
                {current.competitorOutput.status}
              </div>
              <p>{current.competitorOutput.snippet}</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-red-100 font-mono text-[10px] text-red-700/80">
            ✕ No mathematical set pruning · Opaque vector distances
          </div>
        </div>

        {/* Aniket AI Column */}
        <div className="rounded-xl border border-emerald-200/80 bg-white p-5 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#B45309]/10 to-transparent rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-3 border-b border-emerald-100 mb-3">
              <span className="font-mono text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#B45309]" />
                Aniket AI (Sovereign Context)
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <ShieldCheck className="w-3 h-3" /> Sub-300ms Verified
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 mb-4 font-mono text-[11px] text-[#78716C]">
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-[#A8A29E]">Latency</span>
                <span className="font-bold text-emerald-700">{current.aniketOutput.latency}</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-[#A8A29E]">Tokens</span>
                <span className="font-bold text-[#B45309]">{current.aniketOutput.tokens}</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-[#A8A29E]">Reliability</span>
                <span className="font-bold text-emerald-700">{current.aniketOutput.accuracy}</span>
              </div>
            </div>

            {/* Output Snippet */}
            <div className="rounded-lg bg-emerald-50/60 p-3.5 border border-emerald-100 text-xs leading-relaxed text-[#57534E]">
              <div className="font-semibold text-emerald-800 mb-1 text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {current.aniketOutput.status}
              </div>
              <p>{current.aniketOutput.snippet}</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-100 font-mono text-[10px] text-emerald-700 flex items-center justify-between">
            <span>✓ 82% Token window pruned</span>
            <span className="text-[#B45309] font-bold">#A-4821 Turn Trace</span>
          </div>
        </div>
      </div>
    </div>
  );
}
