"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, ShieldCheck, AlertTriangle, Sparkles, Copy, RotateCcw } from "lucide-react";
import { sound } from "../utils/sound";

const QUESTIONS = [
  {
    id: 1,
    title: "How many models or agent frameworks are active in your stack?",
    subtitle: "Select the configuration that best matches your engineering setup.",
    options: [
      { text: "Single frontier vendor (e.g., GPT-4o only, prompts hardcoded)", score: 40, tag: "Vendor Lock-in" },
      { text: "Multi-model mix (OpenAI + Claude + open-weight Llama/DeepSeek)", score: 75, tag: "Hybrid Router" },
      { text: "Multi-agent framework (LangGraph, CrewAI, MCP, AutoGen)", score: 90, tag: "Autonomous Ops" },
    ]
  },
  {
    id: 2,
    title: "Where does institutional company context and agent memory live?",
    subtitle: "How is persistent state retained between user turns and workflow runs?",
    options: [
      { text: "Ephemeral sessions & basic top-K vector DB similarity search", score: 35, tag: "High Hallucination" },
      { text: "Siloed SaaS databases and custom Redis cache layers", score: 65, tag: "Fragmented" },
      { text: "Centralized graph/arithmetic context layer owned by our team", score: 95, tag: "Sovereign" },
    ]
  },
  {
    id: 3,
    title: "What happens when you swap an underlying LLM vendor?",
    subtitle: "When a new frontier model drops or vendor prices adjust.",
    options: [
      { text: "Context resets, prompts break, engineering weeks spent re-indexing", score: 20, tag: "Zero Portability" },
      { text: "2 to 3 weeks of manual validation and re-prompting per agent", score: 55, tag: "Moderate Penalty" },
      { text: "Sub-1s hot swap with 100% memory and context retained", score: 100, tag: "Full Sovereignty" },
    ]
  }
];

export default function ContextAssessmentModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [copiedBlueprint, setCopiedBlueprint] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.stop();
      }
      document.body.style.overflow = "hidden";
    } else {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
      document.body.style.overflow = "";
    }
    return () => {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        sound.playClick();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelectOption = (qIdx, optIdx) => {
    sound.playClick();
    const nextAnswers = { ...selectedAnswers, [qIdx]: optIdx };
    setSelectedAnswers(nextAnswers);

    if (qIdx < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep(qIdx + 1);
      }, 250);
    } else {
      setTimeout(() => {
        sound.playSuccess();
        setCurrentStep(QUESTIONS.length); // Results step
      }, 350);
    }
  };

  const handleReset = () => {
    sound.playClick();
    setSelectedAnswers({});
    setCurrentStep(0);
  };

  // Calculate Sovereignty Score
  const totalScore = Object.entries(selectedAnswers).reduce((acc, [qIdx, optIdx]) => {
    return acc + QUESTIONS[qIdx].options[optIdx].score;
  }, 0);
  const normalizedScore = Math.round(totalScore / QUESTIONS.length) || 45;

  const handleCopyBlueprint = () => {
    sound.playClick();
    const blueprint = {
      assessment: "Aniket Context Sovereignty Diagnostic",
      score: `${normalizedScore}/100`,
      classification: normalizedScore > 75 ? "Sovereign AI Ready" : "High Vendor Lock-in Risk",
      p95_latency_target: "< 300ms",
      recommended_layer: "L02 Sovereign Context Layer",
      arithmetic_primitives: ["Intersection (Narrow Scope)", "Union (Expand Recall)", "Subtraction (Dedupe & Deprecate)"],
      evaluated_at: new Date().toISOString()
    };
    navigator.clipboard.writeText(JSON.stringify(blueprint, null, 2));
    setCopiedBlueprint(true);
    setTimeout(() => setCopiedBlueprint(false), 2200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain">
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

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="relative w-full max-w-xl rounded-xl border border-[#E4D9BC] bg-[#FDFBF7] shadow-[0_25px_60px_-15px_rgba(74,59,51,0.25)] text-[#4A3B33] p-6 sm:p-8 z-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="assessment-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E4D9BC]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B45309]">
              ANIKET ARCHITECTURE ASSESSMENT
            </span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded-md text-[#78716C] hover:text-[#4A3B33] hover:bg-[#F1E9DA] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Steps */}
        {currentStep < QUESTIONS.length ? (
          <div>
            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-4 font-mono text-[11px] text-[#78716C]">
              <span>QUESTION {currentStep + 1} OF {QUESTIONS.length}</span>
              <div className="flex gap-1.5">
                {QUESTIONS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                      idx === currentStep ? "bg-[#B45309]" : idx < currentStep ? "bg-[#B45309]/40" : "bg-[#E4D9BC]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Title */}
            <h3 id="assessment-modal-title" className="font-serif text-xl sm:text-2xl font-bold leading-snug text-[#4A3B33] mb-2">
              {QUESTIONS[currentStep].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#78716C] mb-6 font-sans">
              {QUESTIONS[currentStep].subtitle}
            </p>

            {/* Options */}
            <div className="space-y-3">
              {QUESTIONS[currentStep].options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentStep] === optIdx;
                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(currentStep, optIdx)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-start justify-between gap-3 ${
                      isSelected
                        ? "border-[#B45309] bg-[#FAF6EE] shadow-sm"
                        : "border-[#E4D9BC] bg-white hover:border-[#B45309]/50 hover:bg-[#FAF6EE]/50"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="text-sm font-medium leading-relaxed text-[#4A3B33]">
                        {opt.text}
                      </div>
                      <span className="inline-block font-mono text-[10px] text-[#A8A29E] uppercase tracking-wider">
                        {opt.tag}
                      </span>
                    </div>
                    <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? "border-[#B45309] bg-[#B45309] text-white" : "border-[#E4D9BC]"
                    }`}>
                      {isSelected && <Check className="w-2.5 h-2.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Step 4: Results & Architecture Blueprint */
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#B45309] uppercase tracking-widest bg-[#B45309]/10 px-3 py-1 rounded-full border border-[#B45309]/20">
                <Sparkles className="w-3.5 h-3.5" /> DIAGNOSTIC COMPLETE
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#4A3B33]">
                Your Context Sovereignty Score
              </h3>
            </div>

            {/* Score Card */}
            <div className="p-6 rounded-xl bg-white border border-[#E4D9BC] text-center shadow-sm">
              <div className="font-mono text-5xl font-black text-[#B45309] tracking-tight mb-2">
                {normalizedScore}<span className="text-xl text-[#A8A29E] font-normal">/100</span>
              </div>
              <div className="font-serif font-bold text-base text-[#4A3B33] mb-1">
                {normalizedScore >= 75 ? "Sovereignty Ready (Low Lock-In)" : "High Vendor Lock-in & Knowledge Fragmentation Risk"}
              </div>
              <p className="text-xs text-[#78716C] max-w-sm mx-auto">
                {normalizedScore >= 75
                  ? "Your engineering team has great modularity. Aniket L02 context arithmetic will drop your retrieval latency below 300ms."
                  : "Your persistent context is dangerously coupled to specific model APIs. A vendor migration could cost weeks of downtime."}
              </p>
            </div>

            {/* Architecture Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 font-mono text-center">
              <div className="p-3 bg-[#FAF6EE] rounded-lg border border-[#E4D9BC]/80">
                <div className="text-[10px] uppercase text-[#78716C] mb-1">Swap Penalty</div>
                <div className="text-sm font-bold text-[#B45309]">&lt; 0.4s</div>
              </div>
              <div className="p-3 bg-[#FAF6EE] rounded-lg border border-[#E4D9BC]/80">
                <div className="text-[10px] uppercase text-[#78716C] mb-1">Memory Reset</div>
                <div className="text-sm font-bold text-[#10B981]">0.0%</div>
              </div>
              <div className="p-3 bg-[#FAF6EE] rounded-lg border border-[#E4D9BC]/80">
                <div className="text-[10px] uppercase text-[#78716C] mb-1">p95 Retrieval</div>
                <div className="text-sm font-bold text-[#4A3B33]">&lt; 300ms</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopyBlueprint}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-[#E4D9BC] bg-white px-4 py-2.5 font-mono text-xs font-bold text-[#4A3B33] hover:border-[#B45309] transition-all"
              >
                {copiedBlueprint ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span>Copied Blueprint!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Architecture Blueprint</span>
                  </>
                )}
              </button>

              <a
                href="#get-access"
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#B45309] px-4 py-2.5 font-bold text-xs text-white hover:bg-[#A16207] shadow-sm transition-all"
              >
                <span>Request API Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="text-center">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#78716C] hover:text-[#B45309] transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retake Assessment</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
