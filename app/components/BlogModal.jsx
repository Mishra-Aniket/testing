"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, ArrowRight, Share2 } from "lucide-react";
import { sound } from "../utils/sound";

export default function BlogModal({ isOpen, onClose }) {
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
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#E4D9BC] bg-[#FDFBF7] p-6 sm:p-10 shadow-2xl text-[#4A3B33] z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E4D9BC]">
            <div className="flex items-center gap-3 font-mono text-[10.5px] text-[#78716C]">
              <span className="flex items-center gap-1.5 text-[#B45309] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#B45309]" />
                ENGINEERING DEEP DIVE
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> March 2026
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> 5 min read
              </span>
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

          {/* Article Body */}
          <article className="py-6 space-y-5">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-[#4A3B33]">
              How do you debug what an AI agent can&apos;t see? Context Tracing with Aniket Sovereign Layer
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-[#57534E]">
              When an autonomous agent fails, 92% of debugging time is wasted inspecting the LLM weights or prompt strings.
              In reality, the model didn&apos;t hallucinate out of incompetence—it hallucinated because the right institutional
              facts were filtered out before turn 1 began.
            </p>

            {/* Callout box */}
            <div className="p-4 rounded-xl border border-[#B45309]/30 bg-[#B45309]/5 font-serif italic text-sm text-[#4A3B33]">
              &ldquo;Models will keep changing every 6 months. Your company&apos;s institutional context is the asset that compounds.&rdquo;
            </div>

            <h3 className="font-serif font-bold text-lg text-[#4A3B33] pt-2">
              The Failure Mode: Diluted Prompt History
            </h3>
            <p className="text-sm leading-relaxed text-[#57534E]">
              Stuffing 64K tokens of raw conversation history into an LLM window dilutes attention weights. Past 32K tokens,
              retrieval accuracy over needle-in-haystack enterprise facts plunges from 92% down to 41%.
            </p>

            <h3 className="font-serif font-bold text-lg text-[#4A3B33] pt-2">
              The Solution: Cryptographic Turn Traces
            </h3>
            <p className="text-sm leading-relaxed text-[#57534E]">
              With Aniket, every token that enters the window is audited through a deterministic pointer:
            </p>

            {/* Code Block */}
            <div className="rounded-xl border border-[#E4D9BC] bg-[#1C1917] p-4 text-[#F5F5F4] font-mono text-xs leading-relaxed overflow-x-auto">
              <pre className="text-amber-100">{`// Inspect what reached the agent on turn #3
const trace = await aniket.trace.get({
  sessionId: "sess_9104",
  turn: 3
});

console.log(trace.decision);
// {
//   query: "What was Q3 revenue in EMEA?",
//   survivingCandidates: 38,
//   pruningRatio: "99.7%",
//   canonicalTermEnforced: "revenue == ARR ($4.2M)",
//   provenancePointer: "#A-4821"
// }`}</pre>
            </div>
          </article>

          {/* Footer Controls */}
          <div className="pt-4 border-t border-[#E4D9BC] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-mono text-xs text-[#78716C]">
              Written by Aniket Engineering Team
            </span>

            <a
              href="#get-access"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#B45309] text-white font-bold text-xs hover:bg-[#A16207] shadow-sm transition-all"
            >
              <span>Request API Access</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
