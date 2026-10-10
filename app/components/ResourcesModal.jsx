"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Briefcase, FileText, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { sound } from "../utils/sound";

export const RESOURCES_DATA = {
  "use-cases": {
    id: "use-cases",
    title: "Enterprise Use Cases",
    subtitle: "Ground AI Agents in Institutional Knowledge Across Departments",
    icon: Briefcase,
    content: [
      {
        title: "Customer Support & Triage",
        desc: "Autonomous agents resolve complex customer tickets using complete history, SLA policies, and verified documentation without hallucinations.",
        metric: "74% autonomous resolution rate with 0% stale policy leakage."
      },
      {
        title: "Financial Operations & Compliance",
        desc: "Revenue recognition, ARR definition consensus, and auditable accounting traces enforced before tokens reach any LLM.",
        metric: "100% audit compliance with cryptographic #A-4821 turn traces."
      },
      {
        title: "Healthcare Longitudinal Continuity",
        desc: "Maintains clinical context across specialist consultations, treatment protocols, and EHR records with zero cross-patient contamination.",
        metric: "Sub-300ms retrieval over 1.2M medical guideline documents."
      },
      {
        title: "Legal & Contract Lifecycle Ops",
        desc: "Dynamically subtracts superseded contract clauses and narrows scope to specific governing jurisdictions.",
        metric: "Prunes 64K contract tokens down to 2.1K exact relevant clauses."
      }
    ]
  },

  "case-study": {
    id: "case-study",
    title: "Customer Case Studies",
    subtitle: "Real Production ROI From World-Class Engineering Teams",
    icon: FileText,
    content: [
      {
        title: "CIEL HR Tech",
        desc: "Migrated 2.4M employee and candidate records into an Aniket knowledge graph. Reduced token inference bills by 82% through dynamic set arithmetic pruning.",
        metric: "82% Token Cost Savings · 99.4% Memory Retained across Model Swaps."
      },
      {
        title: "Razorpay Fintech Ops",
        desc: "Hot-swapped payment triage agents from OpenAI GPT-4o to Anthropic Claude 3.5 Sonnet with zero downtime, zero context reset, and zero customer memory loss.",
        metric: "0.0s Agent Downtime · 291ms p95 Retrieval Latency."
      },
      {
        title: "Veranda Learning",
        desc: "Connected Slack, Google Drive, and curriculum databases into an ontological consensus layer powering 4 distinct autonomous educational agents.",
        metric: "4.8M Entities Linked · 0 Knowledge Conflicts across Teams."
      }
    ]
  },

  "security": {
    id: "security",
    title: "Security & Sovereignty",
    subtitle: "Enterprise-Grade Protections for Institutional Context",
    icon: ShieldCheck,
    content: [
      {
        title: "Zero-Data Retention Guarantee",
        desc: "Enterprise zero-retention agreements enforced across all docked model vendors. Your proprietary institutional graph is never used for foundation training.",
        metric: "Zero Model Training Retention."
      },
      {
        title: "Encryption in Transit & at Rest",
        desc: "All context arithmetic calculations execute in isolated secure enclaves encrypted with AES-256 GCM and TLS 1.3.",
        metric: "AES-256 GCM · FIPS 140-2 Compliant."
      },
      {
        title: "Cryptographic Turn Auditability",
        desc: "Every token delivered to an agent carries an immutable pointer (#A-4821) back to the exact source document, author, and timestamp.",
        metric: "100% Deterministic Provenance."
      },
      {
        title: "SOC 2 Type II Certified Pipeline",
        desc: "Comprehensive annual third-party audits verifying access controls, tenant isolation, and cryptographic integrity.",
        metric: "Continuous Compliance Monitoring."
      }
    ]
  },

  "creators-program": {
    id: "creators-program",
    title: "Creators & Developer Grants",
    subtitle: "Fueling the Next Generation of Autonomous Agent Products",
    icon: Sparkles,
    content: [
      {
        title: "$5,000 in API Credits",
        desc: "Direct infrastructure grants for developers building public AI agent products, open-source context tooling, and multi-agent workflows.",
        metric: "Full scale access with zero credit card required."
      },
      {
        title: "Direct Slack Engineering Access",
        desc: "Collaborate directly with the core DeepMind & Aniket engineering teams on ontology modeling, custom connectors, and arithmetic optimization.",
        metric: "Dedicated private Slack channel & 24/7 priority response."
      },
      {
        title: "Featured Showcase & Co-Marketing",
        desc: "Get your agent showcased to thousands of enterprise engineering leaders, CTOs, and AI founders across our community ecosystem.",
        metric: "Product feature spotlight & developer newsletter reach."
      }
    ]
  }
};

export default function ResourcesModal({ isOpen, onClose, initialTab = "use-cases" }) {
  const [selectedTab, setSelectedTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab && RESOURCES_DATA[initialTab]) {
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

  const current = RESOURCES_DATA[selectedTab] || RESOURCES_DATA["use-cases"];

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
                ENTERPRISE RESOURCES &amp; VERIFICATION
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A3B33]">
                {current.title}
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

          {/* Tab Selector */}
          <div className="flex items-center gap-2 overflow-x-auto py-4 border-b border-[#E4D9BC] scrollbar-none">
            {Object.keys(RESOURCES_DATA).map((tabKey) => {
              const res = RESOURCES_DATA[tabKey];
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
                  {res.title}
                </button>
              );
            })}
          </div>

          {/* Subtitle */}
          <div className="py-4">
            <p className="text-sm font-serif italic text-[#78716C]">
              {current.subtitle}
            </p>
          </div>

          {/* Grid Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
            {current.content.map((item, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-xl border border-[#E4D9BC] bg-white p-5 hover:border-[#B45309]/50 hover:shadow-md transition-all group"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-[#E4D9BC] group-hover:bg-[#B45309] transition-colors" />
                <h3 className="font-serif font-bold text-base text-[#4A3B33] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#57534E] mb-4">
                  {item.desc}
                </p>
                <div className="pt-2 border-t border-[#F1E9DA] flex items-center gap-2 font-mono text-[10.5px] font-bold text-[#B45309]">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.metric}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="pt-4 border-t border-[#E4D9BC] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-mono text-xs text-[#78716C]">
              Need a customized implementation architecture?
            </span>
            <a
              href="#get-access"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#B45309] text-white font-bold text-xs hover:bg-[#A16207] shadow-sm transition-all"
            >
              <span>Explore In Sandbox</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
