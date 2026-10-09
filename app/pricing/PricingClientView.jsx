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
import { Search, Check, Zap, Sparkles, Building2, ArrowRight } from "lucide-react";
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

export default function PricingClientView() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Interactive ROI Calculator State
  const [tokensMillions, setTokensMillions] = useState(15);
  const [activeAgents, setActiveAgents] = useState(4);
  const [billingCycle, setBillingCycle] = useState("annual"); // "annual" | "monthly"

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

  const rawTokenCostEstimate = (tokensMillions * 10).toFixed(0);
  const aniketCostEstimate = (tokensMillions * 1.8).toFixed(0);
  const estimatedSavings = Math.max(0, rawTokenCostEstimate - aniketCostEstimate);

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
        {/* Header Hero */}
        <header className="relative overflow-hidden bg-[#FDFBF7]">
          <div aria-hidden="true" className="plate-grid absolute inset-0 opacity-40 pointer-events-none" />

          <div className="relative mx-auto px-6 lg:px-8 pt-32 md:pt-40 pb-12 md:pb-16 max-w-[1200px]">
            {/* Breadcrumb */}
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
                  <span className="text-[#B45309] font-semibold">Pricing</span>
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
                Transparent Infrastructure
              </span>
            </motion.div>

            <RevealTitle text="Transparent Pricing for Autonomous Systems" />

            <motion.p 
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[68ch] text-[1.125rem] leading-[1.75] text-[#57534E]"
            >
              Choose the plan that works best for your needs. All plans include core features to build context-aware AI with persistent memory, sub-300ms retrieval, and multi-model sovereignty.
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

        {/* Pricing Tier Cards */}
        <section className="relative mx-auto px-6 lg:px-8 pb-20 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {/* Free Tier */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.55 }}
              className="rounded-2xl border border-[#E4D9BC] bg-white p-6 sm:p-7 shadow-[var(--shadow-soft)] flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-[#78716C] uppercase tracking-wider">Free</span>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-serif text-4xl font-black text-[#4A3B33]">$0</span>
                  <span className="text-xs text-[#78716C]">/ forever</span>
                </div>
                <p className="mt-2 text-sm text-[#57534E]">
                  Perfect for testing, experiments, and hackathon prototypes.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-[#4A3B33] font-medium border-t border-[#E4D9BC]/60 pt-5">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span><strong>50,000</strong> requests per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span><strong>500MB</strong> Context Storage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Standard Context Traces</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>1 Active Workspace</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Community Discord & Slack Support</span>
                  </li>
                </ul>
              </div>

              <a
                href="#get-access"
                onClick={() => sound.playClick()}
                className="mt-8 block text-center rounded-[var(--radius)] border border-[#E4D9BC] bg-[#FAF6EE] py-2.5 text-xs font-bold font-mono uppercase tracking-wider text-[#4A3B33] hover:border-[#B45309] hover:text-[#B45309] transition-all"
              >
                Start For Free
              </a>
            </motion.div>

            {/* Pro Tier (Featured) */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.65 }}
              className="rounded-2xl border-2 border-[#B45309] bg-white p-6 sm:p-7 shadow-xl flex flex-col justify-between relative"
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#B45309] text-white px-3.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest shadow-sm">
                Most Popular
              </div>

              <div>
                <span className="font-mono text-xs font-bold text-[#B45309] uppercase tracking-wider">Pro</span>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-serif text-4xl font-black text-[#4A3B33]">$249</span>
                  <span className="text-xs text-[#78716C]">/ month</span>
                </div>
                <p className="mt-2 text-sm text-[#57534E]">
                  For high-growth startups and autonomous production agent pipelines.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-[#4A3B33] font-medium border-t border-[#E4D9BC]/60 pt-5">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span><strong>1,000,000</strong> requests per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span><strong>50GB</strong> Context Storage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Advanced Context Traces & Audit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>5 Workspaces & Team Roles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Custom Ontologies & Canonical Rules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Priority SLA Support & Private Channel</span>
                  </li>
                </ul>
              </div>

              <a
                href="#get-access"
                onClick={() => sound.playClick()}
                className="mt-8 block text-center rounded-[var(--radius)] bg-[#B45309] py-2.5 text-xs font-bold font-mono uppercase tracking-wider text-white shadow-soft hover:bg-[#A16207] transition-all"
              >
                Get Pro Access →
              </a>
            </motion.div>

            {/* Enterprise Tier */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.75 }}
              className="rounded-2xl border border-[#E4D9BC] bg-white p-6 sm:p-7 shadow-[var(--shadow-soft)] flex flex-col justify-between md:col-span-2 lg:col-span-1"
            >
              <div>
                <span className="font-mono text-xs font-bold text-[#78716C] uppercase tracking-wider">Enterprise</span>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-serif text-4xl font-black text-[#4A3B33]">Custom</span>
                </div>
                <p className="mt-2 text-sm text-[#57534E]">
                  For regulated enterprises scaling mission-critical autonomous workloads.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-[#4A3B33] font-medium border-t border-[#E4D9BC]/60 pt-5">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span><strong>Unlimited</strong> requests & dynamic scale</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>VPC Peering & Dedicated Tenant Clusters</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>SSO, SAML & Granular RBAC Permissions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Custom SLA & 24/7 Dedicated Architect</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Zero Model Training & SOC 2 Audits</span>
                  </li>
                </ul>
              </div>

              <a
                href="mailto:hello@aniket.one"
                onClick={() => sound.playClick()}
                className="mt-8 block text-center rounded-[var(--radius)] border border-[#E4D9BC] bg-[#FAF6EE] py-2.5 text-xs font-bold font-mono uppercase tracking-wider text-[#4A3B33] hover:border-[#B45309] hover:text-[#B45309] transition-all"
              >
                Talk to Architects
              </a>
            </motion.div>
          </div>
        </section>

        {/* Interactive ROI & Token Pruning Savings Calculator */}
        <section className="relative w-full bg-[#F8F4EE] border-t border-[#E4D9BC]/70 py-20">
          <div className="relative mx-auto px-6 lg:px-8 max-w-[1200px]">
            <div className="max-w-[700px] mb-10">
              <span className="font-mono text-xs uppercase tracking-wider text-[#B45309] font-bold">
                ROI & Cost Reduction Calculator
              </span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#4A3B33]">
                See How Much Context Pruning Saves Your Team
              </h2>
              <p className="mt-2 text-sm text-[#57534E]">
                Raw LLM token injection balloons costs. Aniket's query-time set arithmetic prunes up to 82% of irrelevant tokens before reaching LLMs.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E4D9BC] bg-white p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-mono font-semibold text-[#4A3B33] mb-2">
                    <span>Monthly Token Volume:</span>
                    <span className="text-[#B45309]">{tokensMillions} Million Tokens</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={tokensMillions}
                    onChange={(e) => {
                      sound.playClick();
                      setTokensMillions(Number(e.target.value));
                    }}
                    className="w-full accent-[#B45309] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#A8A29E] mt-1">
                    <span>1M</span>
                    <span>50M</span>
                    <span>100M Tokens</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono font-semibold text-[#4A3B33] mb-2">
                    <span>Active Autonomous Agents:</span>
                    <span className="text-[#B45309]">{activeAgents} Agents</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={activeAgents}
                    onChange={(e) => {
                      sound.playClick();
                      setActiveAgents(Number(e.target.value));
                    }}
                    className="w-full accent-[#B45309] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#A8A29E] mt-1">
                    <span>1 Agent</span>
                    <span>10 Agents</span>
                    <span>20 Agents</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-xl bg-[#FAF6EE] border border-[#E4D9BC] p-6 text-center">
                <span className="font-mono text-xs uppercase tracking-wider text-[#78716C]">
                  Estimated Monthly Savings
                </span>
                <div className="mt-3 font-serif text-5xl font-black text-emerald-700">
                  ${estimatedSavings}
                </div>
                <div className="mt-2 text-xs font-mono text-[#B45309] font-bold">
                  ~82% LLM inference bill pruned
                </div>
                <div className="mt-4 pt-4 border-t border-[#E4D9BC]/60 text-xs text-[#78716C] leading-relaxed">
                  Calculated against raw GPT-4o window stuffing vs. Aniket audited semantic graph pruning.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing FAQs */}
        <section className="relative mx-auto px-6 lg:px-8 py-20 max-w-[848px]">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#4A3B33] mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="rounded-xl border border-[#E4D9BC] bg-white p-6 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-[#4A3B33] mb-2">
                What is the Aniket AI pricing model?
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                Aniket AI uses straightforward tiered pricing based on request volume and active storage. You can start completely free, and upgrade to Pro as your request volume or storage needs increase. For massive scale, our Enterprise tier offers custom limits and VPC options.
              </p>
            </div>

            <div className="rounded-xl border border-[#E4D9BC] bg-white p-6 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-[#4A3B33] mb-2">
                How much does an enterprise context layer cost?
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                Enterprise pricing is custom-built based on your organization's needs. We work with you to determine the right configuration for your scale, with custom network bandwidth, storage, and dedicated architecture support.
              </p>
            </div>

            <div className="rounded-xl border border-[#E4D9BC] bg-white p-6 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-[#4A3B33] mb-2">
                Is there a free tier available?
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                Yes. The Free tier starts at $0 with 50,000 requests included when you sign up. This is ideal for testing Aniket AI's context layer and SDK before committing to a paid plan.
              </p>
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
