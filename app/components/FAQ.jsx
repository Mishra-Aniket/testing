"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "../utils/sound";

import { FAQS } from "../data/portfolioData";

const FAQ_ITEMS = FAQS;

export default function FAQ() {
  // All items collapsed by default until user clicks
  const [openIndex, setOpenIndex] = useState(null);

  // Auto-open FAQ when targeted by URL hash (e.g. #faq-2)
  useEffect(() => {
    const handleHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (hash && hash.startsWith("#faq-")) {
        const idx = parseInt(hash.replace("#faq-", ""), 10);
        if (!isNaN(idx) && idx >= 0 && idx < FAQ_ITEMS.length) {
          setOpenIndex(idx);
        }
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const toggleItem = (idx) => {
    sound.playClick();
    setOpenIndex(prev => prev === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative w-full bg-[#FDFBF7] py-20 md:py-28 border-t border-[#E4D9BC]">
      <div className="relative mx-auto px-6 lg:px-8 max-w-[1000px]">
        {/* Section Eyebrow & Header */}
        <div className="mb-12 md:mb-16">
          <div aria-hidden="true" className="h-px w-full bg-[#E4D9BC] mb-7" />
          <div className="mb-4">
            <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] leading-none text-[#B45309]">
              <span aria-hidden="true" className="h-[7px] w-[7px] bg-[#B45309]" />
              Clear Answers · Zero Ambiguity
            </span>
          </div>

          <h2 className="text-[clamp(1.875rem,3.2vw,2.75rem)] leading-[1.18] tracking-[-0.025em] font-bold text-[#4A3B33] font-serif">
            Frequently Asked Questions{" "}
            <span className="text-[#B45309] italic font-normal">(Freelance &amp; Engineering)</span>.
          </h2>
          <p className="mt-3 text-[1rem] leading-[1.7] text-[#57534E] max-w-[650px]">
            Everything you need to know about sprint turnaround times, code ownership, milestone contracts, and how we work together.
          </p>
        </div>

        {/* Collapsible Accordion List */}
        <div className="divide-y divide-[#E4D9BC] border-y border-[#E4D9BC]">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                id={`faq-${idx}`}
                className={`scroll-mt-32 transition-colors duration-200 ${
                  isOpen ? "bg-[#FAF6EE]/70" : "bg-transparent hover:bg-black/[0.015]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 md:py-6 px-4 sm:px-6 text-left cursor-pointer group select-none"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="font-mono text-xs font-bold text-[#B45309] pt-1 shrink-0">
                      0{idx + 1}
                    </span>
                    <h3 className={`font-serif text-[1.0625rem] sm:text-[1.1875rem] font-bold leading-snug transition-colors ${
                      isOpen ? "text-[#B45309]" : "text-[#4A3B33] group-hover:text-[#B45309]"
                    }`}>
                      {item.q}
                    </h3>
                  </div>

                  <span className={`shrink-0 flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen 
                      ? "bg-[#B45309] border-[#B45309] text-white rotate-180" 
                      : "border-[#E4D9BC] text-[#78716C] bg-white group-hover:border-[#B45309] group-hover:text-[#B45309]"
                  }`}>
                    <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pt-1 px-4 sm:px-6 pl-11 sm:pl-14 text-[#57534E]">
                        <p className="text-[0.9375rem] leading-[1.75] mb-4">
                          {item.a}
                        </p>
                        {item.linkText && item.href && (
                          <a
                            href={item.href}
                            onClick={() => sound.playClick()}
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#B45309] hover:text-[#92400E] transition-colors"
                          >
                            <span>{item.linkText}</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support Note */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#78716C]">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#B45309]" />
            <span>Have a specific question not covered here?</span>
          </div>
          <a
            href="mailto:aniketmishra492@gmail.com"
            onClick={() => sound.playClick()}
            className="font-bold text-[#B45309] hover:underline"
          >
            Email me directly: aniketmishra492@gmail.com →
          </a>
        </div>
      </div>
    </section>
  );
}
