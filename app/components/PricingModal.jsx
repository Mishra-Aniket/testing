"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Zap, Sparkles, Building2, ArrowRight } from "lucide-react";
import { sound } from "../utils/sound";

export default function PricingModal({ isOpen, onClose }) {
  const [tokensMillions, setTokensMillions] = useState(15);
  const [activeAgents, setActiveAgents] = useState(4);
  const [billingCycle, setBillingCycle] = useState("annual"); // "annual" or "monthly"

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

  // Approximate unpruned raw token bill vs Aniket pruned bill savings calculation
  const rawTokenCostEstimate = (tokensMillions * 10).toFixed(0); // ~$10 per M tokens on GPT-4o
  const aniketCostEstimate = (tokensMillions * 1.8).toFixed(0); // 82% pruned
  const estimatedSavings = Math.max(0, rawTokenCostEstimate - aniketCostEstimate);

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
                TRANSPARENT VALUE-BASED PRICING
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A3B33]">
                Predictable Costs. Zero Infra Silos.
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

          {/* Interactive ROI Calculator Slider */}
          <div className="my-6 p-5 rounded-xl border border-[#B45309]/30 bg-[#B45309]/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#B45309] uppercase tracking-wider">
                  Interactive Context Pruning &amp; Savings Calculator
                </span>
                <p className="text-xs text-[#57534E]">
                  Calculate how much LLM prompt token waste Aniket arithmetic eliminates each month.
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xl font-bold text-[#B45309]">
                  ~${estimatedSavings}/mo
                </span>
                <span className="block font-mono text-[10px] text-[#78716C]">Estimated Token Savings</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-mono font-semibold mb-1 text-[#78716C]">
                  <span>Monthly Agent Prompt Tokens</span>
                  <span className="text-[#B45309] font-bold">{tokensMillions}M tokens</span>
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
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono font-semibold mb-1 text-[#78716C]">
                  <span>Active Operating Agents</span>
                  <span className="text-[#B45309] font-bold">{activeAgents} agents</span>
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
              </div>
            </div>
          </div>

          {/* Tiers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6">
            {/* Developer Tier */}
            <div className="rounded-xl border border-[#E4D9BC] bg-white p-5 flex flex-col justify-between hover:border-[#B45309]/50 transition-all">
              <div>
                <div className="font-mono text-[10px] font-bold text-[#78716C] uppercase tracking-wider mb-2">
                  Developer Tier
                </div>
                <div className="font-serif text-3xl font-bold text-[#4A3B33] mb-1">
                  $0
                  <span className="text-xs font-normal text-[#78716C]"> / forever</span>
                </div>
                <p className="text-xs text-[#57534E] mb-4">
                  Everything you need to experiment, prototype and test sovereign multi-model routing.
                </p>

                <ul className="space-y-2 text-xs text-[#57534E] mb-6 border-t border-[#F1E9DA] pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>500K tokens / month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>1 Active Data Source (Slack / CRM)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Sub-300ms query arithmetic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Python &amp; TypeScript SDKs</span>
                  </li>
                </ul>
              </div>

              <a
                href="#get-access"
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="w-full text-center py-2.5 rounded-lg border border-[#E4D9BC] text-xs font-mono font-bold text-[#4A3B33] hover:border-[#B45309] hover:bg-[#FDFBF7] transition-all"
              >
                Start Free Tier
              </a>
            </div>

            {/* Scale Tier (Popular) */}
            <div className="relative rounded-xl border-2 border-[#B45309] bg-white p-5 flex flex-col justify-between shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#B45309] text-white font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-sm">
                MOST POPULAR FOR TEAMS
              </div>
              <div>
                <div className="font-mono text-[10px] font-bold text-[#B45309] uppercase tracking-wider mb-2">
                  Scale Production
                </div>
                <div className="font-serif text-3xl font-bold text-[#4A3B33] mb-1">
                  $149
                  <span className="text-xs font-normal text-[#78716C]"> / month</span>
                </div>
                <p className="text-xs text-[#57534E] mb-4">
                  For growing engineering teams powering production autonomous agents.
                </p>

                <ul className="space-y-2 text-xs text-[#57534E] mb-6 border-t border-[#F1E9DA] pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span className="font-semibold text-[#4A3B33]">15M tokens included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Up to 6 Live Data Sources</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Zero-downtime hot-swap router</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Cryptographic turn provenance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Priority developer Discord &amp; Slack</span>
                  </li>
                </ul>
              </div>

              <a
                href="#get-access"
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="w-full text-center py-2.5 rounded-lg bg-[#B45309] text-white text-xs font-mono font-bold hover:bg-[#A16207] shadow-sm transition-all"
              >
                Get Scale Access
              </a>
            </div>

            {/* Enterprise Tier */}
            <div className="rounded-xl border border-[#E4D9BC] bg-white p-5 flex flex-col justify-between hover:border-[#B45309]/50 transition-all">
              <div>
                <div className="font-mono text-[10px] font-bold text-[#78716C] uppercase tracking-wider mb-2">
                  Enterprise Sovereign
                </div>
                <div className="font-serif text-3xl font-bold text-[#4A3B33] mb-1">
                  Custom
                </div>
                <p className="text-xs text-[#57534E] mb-4">
                  Full sovereignty with VPC deployment, custom ontology, and 99.9% SLA guarantees.
                </p>

                <ul className="space-y-2 text-xs text-[#57534E] mb-6 border-t border-[#F1E9DA] pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Unlimited monthly tokens</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>VPC or on-premises deployment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>SOC 2 Type II compliance SLA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B45309] shrink-0" />
                    <span>Dedicated Forward-Engineering partner</span>
                  </li>
                </ul>
              </div>

              <a
                href="mailto:hello@aniket.one?subject=Enterprise%20Inquiry"
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="w-full text-center py-2.5 rounded-lg border border-[#E4D9BC] text-xs font-mono font-bold text-[#4A3B33] hover:border-[#B45309] hover:bg-[#FDFBF7] transition-all"
              >
                Talk to Engineering
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
