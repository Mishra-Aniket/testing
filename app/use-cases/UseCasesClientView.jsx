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
import { Search, Briefcase, ShieldCheck, HeartPulse, Scale, CheckCircle2, ArrowRight } from "lucide-react";
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

const USE_CASES = [
  {
    id: "finance",
    icon: Briefcase,
    badge: "Financial Operations & Compliance",
    title: "Deterministic ARR Consensus & Ledger Auditing",
    desc: "Autonomous financial agents reconcile conflicting revenue recognition policies across Stripe, NetSuite, and Salesforce before tokens touch any foundation model.",
    metric: "100% Audit Compliance",
    metricSub: "Zero unsupported ARR claims across 4.2M accounting transactions.",
    bullets: [
      "Enforces canonical GAAP definition across sales and finance teams",
      "Cryptographic turn traces (#A-4821) provide complete SEC audit provenance",
      "Dynamic exclusion of outdated contract drafts with set arithmetic (− superseded)"
    ]
  },
  {
    id: "support",
    icon: ShieldCheck,
    badge: "Customer Support & Triage",
    title: "Autonomous Resolution with Zero Stale Policy Leakage",
    desc: "Ground customer triage agents in real-time user history, active SLA commitments, and regional entitlement policies without hallucinating refunds or expired discounts.",
    metric: "74% Autonomous Resolution",
    metricSub: "Sub-290ms retrieval over 1.2M policy pages and ticket histories.",
    bullets: [
      "Restricts resolution scope by customer tier and governing geography",
      "Maintains context across agent handoffs without context window inflation",
      "Prevents prompt injection from malicious customer inputs"
    ]
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    badge: "Healthcare & Clinical Continuity",
    title: "Longitudinal Patient Memory with Strict Boundary Isolation",
    desc: "Maintain clinical continuity across specialist consultations, laboratory reports, and EHR entries with cryptographically enforced cross-patient isolation.",
    metric: "0% Cross-Patient Contamination",
    metricSub: "Strict HIPAA-compliant boundary fencing with sub-300ms latency.",
    bullets: [
      "Separates patient health records into isolated ontological partitions",
      "Retrieves exact contraindications across pharmaceutical databases",
      "Ensures zero LLM training on protected health information (PHI)"
    ]
  },
  {
    id: "legal",
    icon: Scale,
    badge: "Legal & Contract Lifecycle Ops",
    title: "Dynamic Clause Pruning Across Jurisdictions",
    desc: "Autonomous contract review agents parse 200-page MSAs, dynamically exclude superseded amendments, and narrow liability caps to governing legal jurisdictions.",
    metric: "82% Token Window Reduction",
    metricSub: "Prunes 64,000 contract tokens down to 2,100 exact pertinent clauses.",
    bullets: [
      "Subtracts invalidated clauses automatically at query time",
      "Resolves ambiguity in indemnification definitions across legacy MSAs",
      "Generates redlines backed by explicit clause references"
    ]
  }
];

export default function UseCasesClientView() {
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
                  <span className="text-[#B45309] font-semibold">Use Cases</span>
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
                Production Architectures
              </span>
            </motion.div>

            <RevealTitle text="Enterprise Use Cases for Autonomous AI Agents" />

            <motion.p 
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[68ch] text-[1.125rem] leading-[1.75] text-[#57534E]"
            >
              Discover how leading engineering teams ground their autonomous agents in verifiable company truth. Stop hallucinations before tokens reach any LLM.
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

        {/* Use Cases List */}
        <section className="relative mx-auto px-6 lg:px-8 pb-24 md:pb-32 max-w-[1200px] space-y-12">
          {USE_CASES.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-[#E4D9BC] bg-white p-7 sm:p-10 shadow-[var(--shadow-soft)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#FAF6EE] text-[#B45309] border border-[#E4D9BC]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#A16207] font-semibold">
                      {uc.badge}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A3B33]">
                    {uc.title}
                  </h2>

                  <p className="text-[1.0625rem] leading-[1.75] text-[#57534E]">
                    {uc.desc}
                  </p>

                  <ul className="space-y-2.5 pt-2 text-sm text-[#4A3B33] font-medium">
                    {uc.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-4 rounded-xl bg-[#FAF6EE] border border-[#E4D9BC] p-6 text-center">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#78716C]">
                    Proven Benchmark
                  </span>
                  <div className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-[#B45309]">
                    {uc.metric}
                  </div>
                  <p className="mt-2 text-xs text-[#57534E] leading-relaxed">
                    {uc.metricSub}
                  </p>
                  <a
                    href="#get-access"
                    onClick={() => sound.playClick()}
                    className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius)] bg-[#B45309] px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider text-white shadow-soft hover:bg-[#A16207] transition-all"
                  >
                    Deploy Use Case <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
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
