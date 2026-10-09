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
import { Search, Copy, Check, Terminal, Code2, BookOpen, Layers } from "lucide-react";
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

const SNIPPETS = {
  ts: `import { Aniket } from "@aniket/sdk";

// Initialize sovereign client
const aniket = new Aniket({
  apiKey: process.env.ANIKET_API_KEY
});

// 1. Connect data sources with zero copy
await aniket.sources.connect("crm", { sync: "real-time" });

// 2. Perform dynamic context arithmetic at query time
const context = await aniket.context.search({
  query: "What is our Q3 EMEA ARR?",
  groupName: ["finance", "emea"], // ∩ intersect scope
  excludeSuperseded: true,         // − subtract outdated drafts
  ontology: "arr_v2"              // enforce canonical definition
});

// 3. Inspect cryptographic turn trace
console.log(context.traceId);     // "#A-4821"
console.log(context.tokensUsed);  // 38 tokens (82% pruned)`,

  py: `from aniket import Aniket

# Initialize sovereign client
client = Aniket(api_key="ak_live_8f92...")

# 1. Add institutional knowledge node
node = client.knowledge.add(
    entity="Q3_ARR",
    definition="Gross contracted recurring revenue excluding professional services",
    domain="finance",
    version="2.0"
)

# 2. Search with query-time set arithmetic
results = client.context.search(
    query="Enterprise license terms",
    group_name=["legal", "na"],
    exclude_superseded=True
)

# Print cryptographic provenance
print(f"Trace ID: {results.trace_id}")
print(f"Verified source: {results.sources[0].title}")`,

  curl: `# Authenticate and execute Context Search API
curl -X POST https://api.aniket.one/v1/context/search \\
  -H "Authorization: Bearer ak_live_8f92..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "Q3 EMEA ARR",
    "groupName": ["finance", "emea"],
    "excludeSuperseded": true,
    "ontology": "arr_v2"
  }'`
};

export default function DocsClientView() {
  const [lang, setLang] = useState("ts");
  const [copied, setCopied] = useState(false);
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

  const handleCopy = () => {
    sound.playClick();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(SNIPPETS[lang]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
                  <span className="text-[#B45309] font-semibold">Documentation</span>
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
                Developer SDK v2.4.0
              </span>
            </motion.div>

            <RevealTitle text="Aniket AI SDK & Quickstart Documentation" />

            <motion.p 
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[68ch] text-[1.125rem] leading-[1.75] text-[#57534E]"
            >
              Connect your data sources, execute query-time set arithmetic, and inspect cryptographic turn traces in under 5 minutes with our official SDKs.
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

        {/* Quickstart Code Explorer Section */}
        <section className="relative mx-auto px-6 lg:px-8 pb-24 md:pb-32 max-w-[1200px]">
          {/* Quick Install Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-[800px]">
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#E4D9BC] bg-white font-mono text-xs shadow-xs">
              <span className="text-[#78716C]">npm install @aniket/sdk</span>
              <button
                onClick={() => {
                  sound.playClick();
                  navigator.clipboard.writeText("npm install @aniket/sdk");
                }}
                className="text-[#B45309] hover:underline text-[11px] font-bold"
              >
                Copy
              </button>
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#E4D9BC] bg-white font-mono text-xs shadow-xs">
              <span className="text-[#78716C]">pip install aniket</span>
              <button
                onClick={() => {
                  sound.playClick();
                  navigator.clipboard.writeText("pip install aniket");
                }}
                className="text-[#B45309] hover:underline text-[11px] font-bold"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Interactive Code Window */}
          <div className="rounded-2xl border border-[#E4D9BC] bg-[#1C1917] shadow-2xl overflow-hidden">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-[#232020]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 font-mono text-xs text-[#A8A29E]">quickstart-agent.{lang === "curl" ? "sh" : lang}</span>
              </div>

              {/* Language Switcher Tabs */}
              <div className="flex items-center gap-1.5 bg-[#1C1917] p-1 rounded-lg border border-white/[0.08]">
                {[
                  { id: "ts", label: "TypeScript" },
                  { id: "py", label: "Python" },
                  { id: "curl", label: "cURL" }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      sound.playClick();
                      setLang(t.id);
                    }}
                    className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                      lang === t.id
                        ? "bg-[#B45309] text-white shadow-xs"
                        : "text-[#A8A29E] hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}

                <button
                  onClick={handleCopy}
                  className="ml-2 px-2.5 py-1 rounded text-xs font-mono text-[#E4C090] hover:text-white flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Code Body */}
            <pre className="p-6 overflow-x-auto font-mono text-[13px] leading-relaxed text-[#F5F5F4] bg-[#1C1917]">
              <code>{SNIPPETS[lang]}</code>
            </pre>
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
