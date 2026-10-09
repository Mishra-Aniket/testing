"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Terminal, ExternalLink, ArrowRight } from "lucide-react";
import { sound } from "../utils/sound";

export default function DocsModal({ isOpen, onClose }) {
  const [lang, setLang] = useState("ts"); // "ts", "py", "curl"
  const [copied, setCopied] = useState(false);

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

  const CODE_SNIPPETS = {
    ts: `import { Aniket } from "@aniket/sdk";

// Initialize sovereign client
const aniket = new Aniket({
  apiKey: process.env.ANIKET_API_KEY
});

// 1. Connect data sources with zero copy
await aniket.sources.connect("crm", { sync: "real-time" });

// 2. Perform dynamic context arithmetic at query time
const context = await aniket.context.search({
  query: "What was Q3 revenue in EMEA?",
  groupName: ["finance", "emea"],   // ∩ narrow scope
  excludeSuperseded: true,           // − subtract outdated
  ontology: "arr_consensus"         // enforce business definition
});

// 3. Dock into any frontier model without memory reset
const response = await aniket.agents.run({
  model: "claude-3-5-sonnet", // Or "gpt-4o", "gemini-1.5-pro"
  context: context,
  task: "Generate executive board briefing"
});

console.log(response.output); // "$4.2M ARR" with verified trace #A-4821`,

    py: `from aniket import Aniket, SetArithmetic

# Initialize sovereign client
client = Aniket(api_key="ak_live_...")

# 1. Connect enterprise sources
client.sources.connect("slack", channel="ops-pipeline")

# 2. Query sovereign context arithmetic
ctx = client.context.search(
    query="What was Q3 revenue in EMEA?",
    scope=["finance", "emea"],      # ∩ narrow scope
    subtract_deprecated=True,       # − exclude stale records
    ontology="revenue_v2"           # canonical ARR
)

# 3. Deliver to operating agent
agent_result = client.agents.run(
    model="gpt-4o",                 # freely swappable to claude or gemini
    context=ctx,
    prompt="Summarize pipeline performance"
)

print(agent_result.provenance) # Full turn trace pointer`,

    curl: `# 1. Perform Context Arithmetic Search
curl -X POST https://api.aniket.one/v1/context/search \\
  -H "Authorization: Bearer $ANIKET_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "What was Q3 revenue in EMEA?",
    "groups": ["finance", "emea"],
    "operations": ["intersect", "subtract_stale"],
    "ontology": "arr"
  }'

# 2. Retrieve Cryptographic Trace
curl -X GET https://api.aniket.one/v1/trace/session_8142/turn_3 \\
  -H "Authorization: Bearer $ANIKET_API_KEY"`
  };

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard.writeText(CODE_SNIPPETS[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
                DEVELOPER SDK &amp; API QUICKSTART
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A3B33]">
                Integrate In Under 3 Minutes
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

          {/* Quick Package Install Pills */}
          <div className="my-5 flex flex-wrap gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#E4D9BC] bg-white">
              <span className="text-[#B45309] font-bold">$</span>
              <span>npm install @aniket/sdk</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#E4D9BC] bg-white">
              <span className="text-[#B45309] font-bold">$</span>
              <span>pip install aniket</span>
            </div>
            <a
              href="/llms.txt"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#E4D9BC] bg-[#FAF6EE] text-[#B45309] font-bold hover:border-[#B45309] transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Read llms.txt</span>
            </a>
          </div>

          {/* Code Viewer */}
          <div className="rounded-xl border border-[#E4D9BC] bg-[#1C1917] overflow-hidden text-[#F5F5F4] shadow-md">
            {/* Language Switcher Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/10 font-mono text-xs">
              <div className="flex items-center gap-2">
                {[
                  { id: "ts", label: "TypeScript / Node" },
                  { id: "py", label: "Python" },
                  { id: "curl", label: "cURL / REST" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playClick();
                      setLang(item.id);
                    }}
                    className={`px-3 py-1 rounded text-xs transition-colors ${
                      lang === item.id
                        ? "bg-[#B45309] text-white font-bold"
                        : "text-[#A8A29E] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs text-stone-300 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Code"}</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="p-4 sm:p-5 font-mono text-[11.5px] leading-relaxed overflow-x-auto max-h-[380px]">
              <pre className="text-amber-100">{CODE_SNIPPETS[lang]}</pre>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="pt-5 mt-5 border-t border-[#E4D9BC] flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
            <span className="text-[#78716C]">
              REST API SLA 99.9% · Sub-300ms p95 Global Retrieval
            </span>
            <a
              href="#get-access"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#B45309] text-white font-bold hover:bg-[#A16207] shadow-sm transition-all"
            >
              <span>Get API Key</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
