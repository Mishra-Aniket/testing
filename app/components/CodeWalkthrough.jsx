"use client";
import React, { useState, useEffect } from "react";
import { Check, Copy, ArrowRight, Play, Terminal, XCircle, RotateCcw } from "lucide-react";
import { sound } from "../utils/sound";
import AccuracyTerrain from "./AccuracyTerrain";

const SIMULATION_OUTPUTS = {
  0: [
    { text: "$ aniket.context.search({ query: 'pricing update EMEA', groupName: ['sales', 'emea'] })", color: "text-[#B45309]" },
    { text: "[12ms] ∩ Intersecting tag space: ['sales', 'emea'] (2,410 candidates matched)", color: "text-[#059669]" },
    { text: "[34ms] ∩ Applying metadata constraint: version == 'v2' (480 stale dropped)", color: "text-[#059669]" },
    { text: "[78ms] − Subtracting superseded checkpoints (18 duplicates pruned)", color: "text-[#2563EB]" },
    { text: "[112ms] ★ Set rank: top 4 sovereign contexts selected (Recall: 99.8%)", color: "text-[#7C3AED]" },
    { text: "✓ Window prepared: 1,840 tokens (< 300ms SLA · 0 hallucinations)", color: "text-[#10B981] font-bold" }
  ],
  1: [
    { text: "$ ctx.search({ metadata: { groupName: [session_id] } })", color: "text-[#B45309]" },
    { text: "[15ms] Graph traversal: Walking institutional knowledge graph (3 layers)", color: "text-[#059669]" },
    { text: "[42ms] Derived memory: Context checkpoint #2 loaded seamlessly", color: "text-[#2563EB]" },
    { text: "[89ms] CXO query resolved against team-segregated namespace", color: "text-[#7C3AED]" },
    { text: "✓ Memory resolved: 100% auditable provenance, zero vendor lock-in", color: "text-[#10B981] font-bold" }
  ],
  2: [
    { text: "$ aniket.trace.get('sess_984', 'turn_14')", color: "text-[#B45309]" },
    { text: "[8ms] Trace telemetry retrieved: sources: 3, scores: [0.98, 0.94, 0.91]", color: "text-[#059669]" },
    { text: "[24ms] Rules applied: ['emea_gtm_v2', 'revenue_canonical_2026']", color: "text-[#2563EB]" },
    { text: "[48ms] OpenAI Euphony paired: Visual graph debug frame attached", color: "text-[#7C3AED]" },
    { text: "✓ Root cause isolated in 48ms: Retrieval score 100% verified", color: "text-[#10B981] font-bold" }
  ],
  3: [
    { text: "$ aniket.context.search({ query: 'revenue Q2', groupName: ['revenue'] })", color: "text-[#B45309]" },
    { text: "[10ms] Canonical resolution: GTM definition ∩ Finance definitions isolated", color: "text-[#059669]" },
    { text: "[35ms] Disambiguation rules evaluated: CXO perspective prioritized", color: "text-[#2563EB]" },
    { text: "✓ Ambiguity resolved: Zero semantic collisions between teams", color: "text-[#10B981] font-bold" }
  ]
};

function HighlightedCode({ code }) {
  const lines = code.split("\n");
  return (
    <div>
      {lines.map((line, lineIdx) => {
        if (line.trim().startsWith("//")) {
          return (
            <div key={lineIdx} className="text-[#8C827A] italic leading-relaxed">
              {line}
            </div>
          );
        }

        const parts = line.split(/(\/\/[^\n]*|".*?"|'.*?'|`.*?`|\bconst\b|\bawait\b|\blet\b|\bfunction\b|\breturn\b|\baniket\b|\bctx\b|\btrace\b|\bcontext\b|\bDate\b)/g);

        return (
          <div key={lineIdx} className="leading-relaxed">
            {parts.map((part, pIdx) => {
              if (!part) return null;
              if (part.startsWith("//")) {
                return <span key={pIdx} className="text-[#8C827A] italic">{part}</span>;
              }
              if (part.startsWith('"') || part.startsWith("'") || part.startsWith("`")) {
                return <span key={pIdx} className="text-[#059669] font-medium">{part}</span>;
              }
              if (["const", "await", "let", "function", "return"].includes(part)) {
                return <span key={pIdx} className="text-[#B45309] font-semibold">{part}</span>;
              }
              if (["aniket", "ctx", "trace", "context"].includes(part)) {
                return <span key={pIdx} className="text-[#2563EB] font-semibold">{part}</span>;
              }
              if (part === "Date") {
                return <span key={pIdx} className="text-[#7C3AED] font-semibold">{part}</span>;
              }
              return <span key={pIdx} className="text-[#4A3B33]">{part}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
}

const STEPS = [
  {
    id: "01",
    title: "How does knowledge retrieval for AI agents work?",
    desc: "Context arithmetic is the foundational primitive: dynamic set algebra over meaning, computed at query time. Instead of naïve top-K similarity, Aniket intersects to narrow scope, unions to widen recall, subtracts superseded or out-of-scope content, and ranks what remains, so only the right context survives into the window.",
    file: "context_arithmetic.ts",
    code: `// Set algebra over meaning, at query time
const window = aniket.context.search({
  query: userMessage,
  groupName: ["sales", "emea"],   // ∩ narrow scope
  metadata: { version: "v2" },     // ∩ filter
});

// − superseded / deduped  → rank → top-K`
  },
  {
    id: "02",
    title: "How does an enterprise knowledge graph support memory?",
    desc: "What you store is an institutional knowledge graph of your organization's context, fully traceable. Memory isn't three hard-coded layers. By applying context arithmetic over the graph you can derive the behaviors people expect from memory: recall what happened, resolve what it means, and inform how to act. The memory types are outcomes of the primitive, not separate modules.",
    file: "memory_graph.ts",
    code: `// One graph + arithmetic → derived "memories"
const captureTime1 = "end-date-" + Date.now();

// Represents what should be added when your session is first saved.
const storeInformationOfSessionAtFirstInstance = await ctx.add({
  documents: [ ],
  metadata: {
    groupName: [session_id, captureTime1]
  }
});

// Now resume from where you left off, or let someone resume from there.
const whatHappened = await ctx.search({
  query: term,
  metadata {
    groupName: [session_id, captureTime1]
  }
});

// Second checkpoint
const storeInformationOfSessionAtSecondInstance = await ctx.add({
  documents: [...],
  metadata: {
    groupName: [session_id, captureTime2]
  }
});

// Now team lead / CXO looks up about the information
const whatItMeans = ctx.search({
  query: term,
  metadata: {
    groupName: [session_id]
  }
})

// "how to act" falls out of scope over the global context`
  },
  {
    id: "03",
    title: "Why did my AI agent give a wrong answer?",
    desc: "When an AI agent gives wrong answers about internal data, inspect what it retrieved before changing the prompt. Aniket Context Traces expose the sources, scores, and rules used to assemble context. Developers can investigate retrieval failures, while enterprise teams can review which business information supported an answer.",
    file: "context_trace.ts",
    code: `const trace = await aniket.trace.get(
  session_id, turn_id
);

// Returns: sources[], scores[], rules_applied[]
// Pairs with Euphony for visual debugging`
  },
  {
    id: "04",
    title: "How do agents use consistent business definitions?",
    desc: "Define canonical term definitions at the org level. When \"revenue\" means different things to different teams, Aniket resolves the ambiguity before it reaches the model.",
    file: "domain_namespaces.ts",
    code: `const gtmTeamResponse = await aniket.context.add({
  documents: [...], // Data here
  metadata: {
    groupName: ["gtm", "revenue"] // The term "revenue" defined by GTM team
  }
})

const financeTeamResponse = await aniket.context.add({
  documents: [...], // Data here
  metadata: {
    groupName: ["finance", "revenue"] // The term "revenue" defined by Finances team.
  }
})

const cxoResponse = await aniket.context.search({
  query: "What's the revenue for Q2 2026?",
  metadata: {
    groupName: ["revenue"]
    // The term "revenue" defined for CXO, with clear segregation between the resources by GTM team and Finances team.
  }
})`
  }
];

export default function CodeWalkthrough() {
  const [activeStep, setActiveStep] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [simulatingStep, setSimulatingStep] = useState(null);

  // Setup scroll listener so as the user naturally scrolls, the left sticky indicator updates
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 240;
      let active = 0;
      STEPS.forEach((step, idx) => {
        const el = document.getElementById(`step-${step.id}`);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            active = idx;
          }
        }
      });
      setActiveStep(active);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = (code, index) => {
    sound.playClick();
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleRunQuery = (idx) => {
    if (simulatingStep === idx) {
      sound.playClick();
      setSimulatingStep(null);
    } else {
      sound.playSuccess();
      setSimulatingStep(idx);
    }
  };

  const scrollToStep = (idx) => {
    sound.playClick();
    setActiveStep(idx);
    const el = document.getElementById(`step-${STEPS[idx].id}`);
    if (el) {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -120, duration: 1.0 });
      } else {
        const targetY = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    }
  };

  return (
    <section id="how-it-works" className="relative w-full bg-white py-20 md:py-28">
      <div className="relative mx-auto px-6 lg:px-8 max-w-[1200px]">
        {/* Section Divider & Eyebrow */}
        <div className="mb-14 md:mb-20">
          <div aria-hidden="true" className="h-px w-full bg-[#E4D9BC] mb-7" />
          <div className="mb-6">
            <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] leading-none text-[#B45309]">
              <span aria-hidden="true" className="h-[7px] w-[7px] bg-[#B45309]" />
              What does Aniket do?
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <h2 id="fixes-heading" className="text-[clamp(1.875rem,3.6vw,2.875rem)] leading-[1.14] tracking-[-0.028em] font-bold text-[#4A3B33] text-balance lg:col-span-7 font-serif">
              A context layer that keeps your AI{" "}
              <span className="text-[#B45309] italic font-normal">current, traceable,</span>{" "}
              and semantically consistent.
            </h2>
            <div className="lg:col-span-5 lg:pb-1.5">
              <p className="text-[1.0625rem] leading-[1.75] text-[#57534E]">
                Aniket AI is an AI context management platform for storing and retrieving business knowledge. Use context arithmetic to select relevant information from your institutional knowledge graph, then inspect the sources behind retrieval without operating your own vector database or graph store.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Sticky Horizontal Tabs */}
        <div className="lg:hidden sticky top-14 md:top-20 z-30 -mx-4 px-4 py-2.5 bg-[#FDFBF7]/95 backdrop-blur-md border-y border-[#E4D9BC]/70 mb-8">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
            {STEPS.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => scrollToStep(idx)}
                className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  activeStep === idx
                    ? "bg-[#B45309] text-white shadow-xs"
                    : "bg-white text-[#78716C] border border-[#E4D9BC]"
                }`}
              >
                <span>{step.id}</span>
                <span className="max-w-[140px] truncate">{step.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Two Column: Sticky Step Navigation + Cards */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-24 md:mb-32">
          {/* Sticky Navigation (Desktop) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 md:top-32 w-full">
              {/* Progress Bars */}
              <div className="mb-8 flex gap-1.5" aria-hidden="true">
                {STEPS.map((step, idx) => (
                  <div key={step.id} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[#F1E9DA]">
                    <div 
                      className="absolute inset-0 origin-left bg-[#B45309] transition-transform duration-300" 
                      style={{ transform: idx <= activeStep ? "scaleX(1)" : "scaleX(0)" }}
                    />
                  </div>
                ))}
              </div>

              {/* Step Buttons */}
              <ol className="space-y-2">
                {STEPS.map((step, idx) => {
                  const isCurrent = activeStep === idx;
                  return (
                    <li key={step.id}>
                      <button
                        type="button"
                        onClick={() => scrollToStep(idx)}
                        className={`group flex w-full items-start gap-4 rounded-[6px] py-3 px-3 text-left transition-all duration-200 ${
                          isCurrent ? "bg-[#FAF6EE] shadow-sm" : "hover:bg-[#FAF6EE]/50"
                        }`}
                      >
                        <span className={`mt-[2px] font-mono text-[11px] font-semibold tracking-[0.14em] transition-colors duration-200 ${
                          isCurrent ? "text-[#B45309] font-bold" : "text-[#A8A29E] group-hover:text-[#78716C]"
                        }`}>
                          {step.id}
                        </span>
                        <span className={`text-[0.9375rem] font-bold leading-snug transition-colors duration-200 ${
                          isCurrent ? "text-[#4A3B33]" : "text-[#78716C] group-hover:text-[#4A3B33]"
                        }`}>
                          {step.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-8 flex flex-col gap-10 md:gap-14">
            {STEPS.map((step, idx) => (
              <div 
                key={step.id} 
                id={`step-${step.id}`}
                className="scroll-mt-32"
              >
                <div className="group relative rounded-[6px] border bg-white border-[#E4D9BC] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] p-7 sm:p-9 lg:p-10 transition-all duration-300 hover:border-[#E4C090] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                  {/* Header */}
                  <div className="mb-5 flex items-center gap-3">
                    <span className="font-mono text-[12px] font-semibold tracking-[0.14em] text-[#B45309]">
                      {step.id}
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-[#F1E9DA]" />
                  </div>

                  <h3 className="mb-4 text-[1.375rem] font-bold leading-snug tracking-[-0.015em] text-[#4A3B33]">
                    {step.title}
                  </h3>

                  <p className="mb-8 text-[0.9375rem] leading-[1.75] text-[#57534E] max-w-[62ch]">
                    {step.desc}
                  </p>

                  {/* Code Box */}
                  <div className="group/code relative overflow-hidden rounded-[6px] border bg-[#FBF8F2] border-[#E4D9BC] shadow-sm">
                    <div className="flex items-center justify-between gap-3 border-b border-[#E4D9BC] bg-[#F4EEDB] px-4 py-2 font-mono text-[11.5px] text-[#78716C]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#B45309]" />
                        <span className="font-semibold text-[#4A3B33]">{step.file}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Interactive Run Query Simulation Button */}
                        <button
                          type="button"
                          data-custom-sound="true"
                          onClick={() => handleRunQuery(idx)}
                          className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-mono font-bold transition-all duration-200 active:scale-95 ${
                            simulatingStep === idx
                              ? "bg-[#1C1917] text-white shadow-sm"
                              : "bg-[#B45309] text-white hover:bg-[#A16207] shadow-sm hover:-translate-y-px"
                          }`}
                          title="Simulate context query runtime"
                        >
                          {simulatingStep === idx ? (
                            <>
                              <RotateCcw className="w-3 h-3 text-[#E4C090] animate-spin" />
                              <span>Output Active</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 fill-current text-[#FDFBF7]" />
                              <span>Run Query</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopy(step.code, idx)}
                          className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-[11px] font-medium text-[#78716C] hover:bg-[#EAE1CB] hover:text-[#4A3B33] transition-colors"
                          title="Copy code"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-600" />
                              <span className="text-green-700">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Syntax Highlighted Code Block */}
                    <div className="overflow-x-auto p-4 text-[12.5px] font-mono select-text bg-[#FDFBF7]">
                      <HighlightedCode code={step.code} />
                    </div>

                    {/* Interactive Animated Terminal Simulator Drawer */}
                    {simulatingStep === idx && (
                      <div className="border-t border-[#E4D9BC] bg-[#1C1917] p-4 font-mono text-[11.5px] text-[#F5F5F4] transition-all animate-fadeIn">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-[#A8A29E]">
                          <span className="flex items-center gap-1.5">
                            <Terminal className="w-3.5 h-3.5 text-[#B45309]" />
                            <span className="font-semibold text-white">ANIKET CONTEXT ENGINE</span>
                            <span className="text-[#78716C]">·</span>
                            <span>QUERY RUNTIME: 28ms</span>
                          </span>
                          <button 
                            onClick={() => {
                              sound.playClick();
                              setSimulatingStep(null);
                            }}
                            className="text-[#A8A29E] hover:text-white px-1 transition-colors"
                            title="Close output"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="space-y-1.5 leading-relaxed pt-1">
                          {SIMULATION_OUTPUTS[idx].map((line, lIdx) => (
                            <div key={lIdx} className={`${line.color} flex items-start gap-2`}>
                              <span className="select-all">{line.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full-Width 3D Accuracy Terrain Benchmark (between steps and the use-case banner, as on the original site) */}
        <AccuracyTerrain />

        {/* Context Tracing with OpenAI Euphony Walkthrough Banner */}
        <div className="relative rounded-[6px] border bg-[#F8F4EE] border-[#E4D9BC] p-8 sm:p-10 md:p-14 overflow-hidden transition-all duration-300 hover:border-[#E4C090] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 items-end gap-10">
            <div className="lg:col-span-8">
              <p className="mb-5 inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B45309]">
                <span aria-hidden="true" className="h-[6px] w-[6px] bg-[#B45309]" />
                Example Use Case
              </p>
              <h3 className="mb-5 text-[1.5rem] md:text-[1.875rem] font-bold leading-[1.2] tracking-[-0.02em] text-[#4A3B33] text-balance">
                How do you debug what an agent can't see? Context Tracing with OpenAI Euphony
              </h3>
              <p className="max-w-[62ch] text-[0.9375rem] leading-[1.75] text-[#57534E]">
                Pairing Aniket's Context Traces with Euphony, OpenAI's open-source conversation visualizer, creates an end-to-end debugging workflow. Every agent failure is now diagnosable in minutes: was it a retrieval problem, a configuration problem, or a model problem?
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end w-full lg:w-auto">
              <a
                href="#"
                className="group inline-flex items-center justify-center gap-2 rounded-[6px] bg-[#B45309] px-7 py-3.5 text-sm font-bold tracking-wide text-white shadow-sm transition-all hover:bg-[#A16207] hover:-translate-y-px w-full lg:w-auto text-center"
              >
                <span>Read the walkthrough</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
