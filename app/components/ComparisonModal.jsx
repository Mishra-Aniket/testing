"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Minus, ArrowRight, Shield, Zap, Database, GitBranch, Terminal, Copy } from "lucide-react";
import { sound } from "../utils/sound";

export const COMPARISONS_DATA = {
  mem0: {
    id: "mem0",
    title: "Aniket vs Mem0",
    competitor: "Mem0",
    subtitle: "Knowledge Graph Arithmetic vs. Flat Vector Embeddings",
    summary:
      "While Mem0 stores flat vector embeddings that suffer from high drift and hallucinated entity joins, Aniket structures institutional memory into a versioned knowledge graph with query-time set arithmetic (∩ ∪ − rank).",
    winnerVerdict: "Aniket delivers 4.3x higher multi-turn accuracy and sub-290ms deterministic recall.",
    specs: [
      { feature: "Memory Architecture", aniket: "Ontological Knowledge Graph", competitor: "Flat Vector Store (Cosine)" },
      { feature: "Query-Time Pruning", aniket: "Set Arithmetic (∩ ∪ − rank)", competitor: "Naïve Top-K Cosine Similarity" },
      { feature: "Model Agnostic Hot-Swaps", aniket: "100% Retained (0.0s reset)", competitor: "Prone to prompt drift on swap" },
      { feature: "Auditability & Tracing", aniket: "Cryptographic Turn Pointer (#A-4821)", competitor: "Black-box embedding match" },
      { feature: "Token Window Overhead", aniket: "Pruned 2.1K exact tokens", competitor: "Inflated 32K+ raw history" },
      { feature: "Retrieval Latency (p95)", aniket: "< 291ms p95", competitor: "380ms - 520ms" }
    ],
    codeCompare: {
      competitor: `// Mem0: Fragile flat text similarity
await mem0.add(userPrompt, { userId: "u_42" });
const mems = await mem0.search("Q3 revenue EMEA");
// Returns disjointed text chunks, misses ARR definition`,
      aniket: `// Aniket: Deterministic graph arithmetic
const ctx = await aniket.context.search({
  query: "Q3 revenue EMEA",
  groupName: ["finance", "emea"], // ∩ narrow scope
  excludeSuperseded: true,         // − subtract outdated
  ontology: "arr_v2"              // enforce canonical term
});
// Exact verified $4.2M ARR delivered with 100% provenance`
    }
  },

  glean: {
    id: "glean",
    title: "Aniket vs Glean",
    competitor: "Glean",
    subtitle: "Deterministic Agent Memory Layer vs. Enterprise Search Engine",
    summary:
      "Glean is designed for human workplace search in a browser tab. Aniket is built ground-up as an ultra-low-latency sovereign API for autonomous AI agents that run operations across live tools.",
    winnerVerdict: "Aniket is 10x faster for agent loops and gives developers full model sovereignty.",
    specs: [
      { feature: "Target Consumer", aniket: "Autonomous AI Agents & Developers", competitor: "Human Workplace Search UI" },
      { feature: "API Latency", aniket: "< 291ms programmatically", competitor: "800ms - 1,400ms UI-oriented" },
      { feature: "Multi-Model Sovereignty", aniket: "Any model docks freely via API", competitor: "Vendor-managed proprietary stack" },
      { feature: "Deployment Cost", aniket: "Zero infra, single unified SDK", competitor: "High six-figure enterprise contracts" },
      { feature: "Agent Memory Feedback Loop", aniket: "Continuous state updates via L02", competitor: "Read-only enterprise indexing" },
      { feature: "Developer Control", aniket: "Direct TypeScript & Python primitives", competitor: "Restricted enterprise portal" }
    ],
    codeCompare: {
      competitor: `// Enterprise search requires heavy manual query construction
// and returns verbose document excerpts meant for human eyes
const results = await gleanSearch.query({ text: "Q3 deals" });`,
      aniket: `// Aniket feeds agents machine-optimized state tokens
const agentSession = await aniket.agents.run({
  model: "claude-3-5-sonnet",
  context: ctx,
  task: "reconcile_sales_pipeline"
});`
    }
  },

  palantir: {
    id: "palantir",
    title: "Aniket vs Palantir",
    competitor: "Palantir Foundry / AIP",
    subtitle: "Lightweight Developer API vs. Heavy Multi-Month Deployment",
    summary:
      "Palantir requires massive Forward Deployed Engineering teams, months of bespoke data piping, and multimillion-dollar contracts. Aniket deploys in under 5 minutes with npm install @aniket/sdk while providing institutional ontology enforcement.",
    winnerVerdict: "Aniket gives modern engineering teams Palantir-grade semantic consensus without the FDE overhead.",
    specs: [
      { feature: "Time to First Agent", aniket: "< 5 minutes (npm / pip)", competitor: "3 to 9 months integration" },
      { feature: "FDE Requirement", aniket: "None: clean developer API", competitor: "Requires dedicated on-site FDEs" },
      { feature: "Architecture", aniket: "Zero-copy connector layer", competitor: "Heavy data replication silo" },
      { feature: "Pricing Model", aniket: "Predictable API usage tier", competitor: "Multimillion-dollar lock-in contracts" },
      { feature: "Portability", aniket: "Exportable in open formats", competitor: "Proprietary ontology silo" },
      { feature: "Tool Integrations", aniket: "Slack, Drive, Jira, CRM native", competitor: "Custom ETL pipelines required" }
    ],
    codeCompare: {
      competitor: `// Palantir: Requires complex ontology schema deployments
// and dedicated Foundry backend synchronizations`,
      aniket: `// Aniket: 3-line quick start
import { Aniket } from "@aniket/sdk";
const aniket = new Aniket({ apiKey: process.env.ANIKET_KEY });
await aniket.sources.connect("crm");`
    }
  },

  claude: {
    id: "claude",
    title: "Claude Memory vs Aniket",
    competitor: "Claude Memory",
    subtitle: "Vendor-Neutral Context Sovereignty vs. Anthropic Silo",
    summary:
      "Claude Memory traps your company context inside Anthropic's ecosystem. When OpenAI releases a superior model or DeepSeek offers 10x cost savings, migrating out resets your agents to zero. Aniket keeps context sovereign outside the model.",
    winnerVerdict: "Aniket guarantees zero migration downtime when hot-swapping between Claude, GPT, and Gemini.",
    specs: [
      { feature: "Model Portability", aniket: "Dock GPT, Claude, Gemini, DeepSeek", competitor: "Locked strictly to Anthropic" },
      { feature: "Context Reset On Swap", aniket: "0.0s (Context stays persistent)", competitor: "100% Context Lost on Swap" },
      { feature: "Cross-Enterprise Connectors", aniket: "Native connectors to 6+ data sources", competitor: "Manual prompt attachment" },
      { feature: "Ontology Definitions", aniket: "Canonical semantic consensus", competitor: "Heuristic prompt memory" },
      { feature: "Token Retention Rate", aniket: "100% institutional memory retained", competitor: "Single vendor session memory" },
      { feature: "Data Ownership", aniket: "Sovereign, client-owned export", competitor: "Tied to Claude workspace" }
    ],
    codeCompare: {
      competitor: `// Claude Memory: Trapped in Anthropic API
// Switch to OpenAI? Start over from scratch!`,
      aniket: `// Aniket: Hot-swap models in 1 line with zero memory loss
await aniket.route({
  from: "claude-3-5-sonnet",
  to: "gpt-4o",
  preserveContext: true // All deals, people, policies intact
});`
    }
  },

  langchain: {
    id: "langchain",
    title: "LangChain Memory vs Aniket",
    competitor: "LangChain Memory",
    subtitle: "Production Institutional Graph vs. Client-Side In-Memory Buffers",
    summary:
      "LangChain memory abstractions (ConversationBuffer, VectorStoreRetriever) run client-side, lack persistent provenance, and break down under complex enterprise workflows. Aniket provides a cloud-native institutional context fabric.",
    winnerVerdict: "Aniket delivers enterprise SOC 2 auditability and true multi-agent synchronization.",
    specs: [
      { feature: "Persistence", aniket: "Distributed multi-agent institutional graph", competitor: "Local process memory / Redis buffer" },
      { feature: "Multi-Agent Sync", aniket: "Sales, ops, support share 1 source", competitor: "Isolated agent instances" },
      { feature: "Context Arithmetic", aniket: "Scope narrowing + deprecation subtraction", competitor: "Raw prompt concatenation" },
      { feature: "Token Pruning", aniket: "Sub-300ms ranker eliminates noise", competitor: "Exceeds prompt limits rapidly" },
      { feature: "Security & Auditing", aniket: "Full cryptographic turn traces", competitor: "No built-in compliance logs" },
      { feature: "Maintenance Overhead", aniket: "Zero maintenance cloud layer", competitor: "Constant pipeline debugging" }
    ],
    codeCompare: {
      competitor: `// LangChain: Unruly memory buffer that balloons tokens
const memory = new BufferMemory();
await memory.saveContext({ input }, { output });
// Exceeds window limits and dilutes LLM focus`,
      aniket: `// Aniket: Clean, audited tokens that compound
const trace = await aniket.trace.get(session, turn);
console.log(trace.provenance); // Exact source documents & rules`
    }
  }
};

export default function ComparisonModal({ isOpen, onClose, initialTab = "mem0" }) {
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialTab && COMPARISONS_DATA[initialTab]) {
      setSelectedTab(initialTab);
    }
  }, [initialTab]);

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

  const current = COMPARISONS_DATA[selectedTab] || COMPARISONS_DATA.mem0;

  const handleCopyLink = () => {
    sound.playClick();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/#compare-${current.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E4D9BC]">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold text-[#B45309] uppercase tracking-[0.2em] mb-1">
                <span className="w-2 h-2 rounded-full bg-[#B45309] animate-pulse" />
                ARCHITECTURE BENCHMARK & COMPARISON
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A3B33]">
                Why Aniket Outperforms The Rest
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

          {/* Competitor Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-4 border-b border-[#E4D9BC] scrollbar-none">
            {Object.keys(COMPARISONS_DATA).map((tabKey) => {
              const comp = COMPARISONS_DATA[tabKey];
              const isSelected = selectedTab === tabKey;
              return (
                <button
                  key={tabKey}
                  onClick={() => {
                    sound.playClick();
                    setSelectedTab(tabKey);
                  }}
                  className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-[#B45309] text-white shadow-sm"
                      : "bg-white border border-[#E4D9BC] text-[#78716C] hover:text-[#4A3B33] hover:border-[#B45309]/50"
                  }`}
                >
                  vs {comp.competitor}
                </button>
              );
            })}
          </div>

          {/* Active Comparison Content */}
          <div className="py-6 space-y-6">
            {/* Verdict Card */}
            <div className="relative overflow-hidden rounded-xl border border-[#B45309]/30 bg-[#B45309]/5 p-5">
              <div className="absolute inset-y-0 left-0 w-1 bg-[#B45309]" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <span className="font-serif font-bold text-lg text-[#4A3B33]">
                  {current.title}: {current.subtitle}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#B45309] uppercase tracking-wider bg-white px-2.5 py-1 rounded-md border border-[#B45309]/30 shrink-0">
                  <Check className="w-3.5 h-3.5" /> Verdict: Superior Sovereignty
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#57534E] mb-3">
                {current.summary}
              </p>
              <div className="font-mono text-xs font-bold text-[#B45309]">
                ▸ {current.winnerVerdict}
              </div>
            </div>

            {/* Feature Matrix Table */}
            <div className="overflow-hidden rounded-xl border border-[#E4D9BC] bg-white">
              <div className="grid grid-cols-12 bg-[#FAF6EE] px-4 py-3 font-mono text-[10.5px] font-bold text-[#78716C] uppercase tracking-wider border-b border-[#E4D9BC]">
                <div className="col-span-4 sm:col-span-5">Feature & Capability</div>
                <div className="col-span-4 sm:col-span-4 text-[#B45309]">Aniket AI Context Layer</div>
                <div className="col-span-4 sm:col-span-3 text-[#78716C]">{current.competitor}</div>
              </div>
              <div className="divide-y divide-[#E4D9BC]/60">
                {current.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="grid grid-cols-12 px-4 py-3 text-xs items-center hover:bg-[#FAF6EE]/40 transition-colors">
                    <div className="col-span-4 sm:col-span-5 font-semibold text-[#4A3B33]">
                      {spec.feature}
                    </div>
                    <div className="col-span-4 sm:col-span-4 font-mono font-bold text-[#B45309] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B45309] shrink-0" />
                      {spec.aniket}
                    </div>
                    <div className="col-span-4 sm:col-span-3 font-mono text-[#78716C]">
                      {spec.competitor}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side-by-side Code Comparison */}
            <div className="space-y-2">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#78716C]">
                Implementation Comparison
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Competitor Code */}
                <div className="rounded-xl border border-[#E4D9BC] bg-[#1C1917] p-4 text-[#F5F5F4] font-mono text-[11px] leading-relaxed overflow-x-auto">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-[#A8A29E] uppercase tracking-wider">
                    <span>{current.competitor} Approach</span>
                    <span className="text-red-400 font-bold">Fragile / Locked</span>
                  </div>
                  <pre className="text-stone-300">{current.codeCompare.competitor}</pre>
                </div>

                {/* Aniket Code */}
                <div className="rounded-xl border border-[#B45309] bg-[#1C1917] p-4 text-[#F5F5F4] font-mono text-[11px] leading-relaxed overflow-x-auto shadow-md">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-[#E4C090] uppercase tracking-wider font-bold">
                    <span>Aniket Sovereign Context</span>
                    <span className="text-[#E4C090]">Verified &amp; Deterministic</span>
                  </div>
                  <pre className="text-amber-200">{current.codeCompare.aniket}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="pt-4 border-t border-[#E4D9BC] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 font-mono text-xs text-[#78716C] hover:text-[#B45309] transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              {copied ? "Link Copied to Clipboard!" : `Share ${current.title}`}
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href="#get-access"
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#B45309] text-white font-bold text-xs hover:bg-[#A16207] shadow-sm transition-all"
              >
                <span>Request API Access</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
