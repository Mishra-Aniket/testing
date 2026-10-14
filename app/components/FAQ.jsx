"use client";

import React, { useState } from "react";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "../utils/sound";

const FAQ_ITEMS = [
  {
    q: "What services do you offer for freelance clients and startups?",
    a: "I provide end-to-end full-stack web engineering (Next.js 15, React 19, TypeScript, Node.js, FastAPI), custom Chrome extension development (Manifest V3 with background workers & Web Store packaging), high-scale APIs, automated data ingestion pipelines (.NET 8 & Python), and performance audits for fast-moving startups.",
    linkText: "Discuss your project requirements →",
    href: "#get-access"
  },
  {
    q: "What does your typical project workflow look like?",
    a: "We start with a quick technical discovery call to define clear scope and milestone deliverables. Projects run in agile 1-week sprints with live preview deployments on staging, transparent async communication (Slack, Discord, or WhatsApp), and clean git commits pushed directly to your private repository.",
    linkText: "Explore our delivery roadmap & workflow →",
    href: "#services"
  },
  {
    q: "How fast can you build and launch a production-ready MVP?",
    a: "Most production MVPs are delivered in 2 to 4 weeks. You receive a fully deployed, high-speed application with clean database schemas (PostgreSQL / Supabase), user authentication, payment processing (Stripe / Razorpay), automated error tracking, responsive styling, and complete documentation.",
    linkText: "Estimate your MVP turnaround timeline →",
    href: "#get-access"
  },
  {
    q: "Do I own 100% of the source code and intellectual property?",
    a: "Yes, absolutely. You retain 100% full ownership of all source code, database architectures, documentation, and digital assets from day one. I work under strict bilateral Non-Disclosure Agreements (NDAs), and complete repository ownership is handed over to your organization upon project completion.",
    linkText: "Read our security & client IP sovereignty terms →",
    href: "/security"
  },
  {
    q: "Can you build or upgrade Chrome extensions to Manifest V3?",
    a: "Yes. I have shipped official Chrome Web Store extensions like OmTabs and OmSpace. I architect modern Manifest V3 extensions with local storage persistence, biometric shields, custom new-tab surfaces, and automated background service workers compliant with Google's latest Web Store policies.",
    linkText: "Review Chrome extension offerings →",
    href: "#services"
  },
  {
    q: "How do contracts, milestones, and payments work?",
    a: "All projects operate under transparent milestone-based contracts with invoices issued through my Govt. of India registered MSME enterprise (UDYAM-UP-03-0065855). Payments can be handled via bank wire, Stripe, or escrow milestones with clear sign-offs before any stage begins.",
    linkText: "Discuss milestone scope & contract terms →",
    href: "#get-access"
  }
];

export default function FAQ() {
  // First item open by default for immediate context
  const [openIndex, setOpenIndex] = useState(0);

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
                className={`transition-colors duration-200 ${
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
