"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Rocket, 
  Brain, 
  Cpu, 
  Shield, 
  Clock, 
  Check, 
  ArrowRight, 
  Sparkles,
  Quote,
  CalendarCheck
} from "lucide-react";
import { SERVICES, WORKFLOW_STEPS, CLIENT_TESTIMONIALS, PERSONAL_INFO } from "../data/portfolioData";
import { sound } from "../utils/sound";

const ICON_MAP = {
  Rocket: Rocket,
  Brain: Brain,
  Cpu: Cpu,
  Shield: Shield
};

export default function ServicesWorkflow() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section id="services" className="relative py-20 md:py-28 bg-[#F8F4EE] border-t border-[#E4D9BC]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Section 1: Services Header */}
        <div className="mb-14 md:mb-16">
          <div aria-hidden="true" className="h-px w-full bg-[#E4D9BC] mb-7" />
          <div className="mb-6">
            <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] leading-none text-[#B45309]">
              <span aria-hidden="true" className="h-[7px] w-[7px] bg-[#B45309]" />
              Freelance Offerings &amp; Sprints
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <h2 className="text-[clamp(1.875rem,3.6vw,2.875rem)] leading-[1.14] tracking-[-0.028em] font-bold text-[#4A3B33] text-balance lg:col-span-7">
              High-Velocity Services for{" "}
              <span className="text-[#B45309]">Fast-Moving Teams</span>.
            </h2>
            <div className="lg:col-span-5 lg:pb-1.5">
              <p className="text-[1.0625rem] leading-[1.75] text-[#57534E]">
                Direct 1-on-1 collaboration. No middle managers, no bloated agency fees. You work directly with a senior full-stack engineer who ships reliable code every single week.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {SERVICES.map((srv) => {
            const IconComponent = ICON_MAP[srv.icon] || Rocket;
            return (
              <div
                key={srv.id}
                className="group relative rounded-[var(--radius)] border bg-white border-[#E4D9BC] shadow-[var(--shadow-soft)] p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft-lg)] hover:border-[#E4C090]"
              >
                <div>
                  {/* Card Header: Icon + Badge + Turnaround */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF6EE] border border-[#E4D9BC] text-[#B45309] group-hover:scale-105 group-hover:bg-[#B45309] group-hover:text-white transition-all duration-300">
                        <IconComponent className="w-5 h-5" />
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#B45309] bg-[#B45309]/10 px-2.5 py-1 rounded border border-[#B45309]/20">
                        {srv.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-xs text-[#78716C] bg-[#FAF6EE] px-2.5 py-1 rounded border border-[#E4D9BC]">
                      <Clock className="w-3.5 h-3.5 text-[#B45309]" />
                      <span>{srv.turnaround}</span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A3B33] mb-2 group-hover:text-[#B45309] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="font-mono text-xs text-[#78716C] mb-4">
                    {srv.tagline}
                  </p>

                  <p className="text-[0.9375rem] leading-[1.65] text-[#57534E] mb-6">
                    {srv.description}
                  </p>

                  {/* Deliverables Bullet List */}
                  <div className="mb-6 pt-5 border-t border-[#E4D9BC]/60">
                    <div className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[#78716C] mb-3">
                      Guaranteed Deliverables:
                    </div>
                    <ul className="space-y-2">
                      {srv.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5 text-xs text-[#57534E]">
                          <Check className="w-3.5 h-3.5 text-[#B45309] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 border-t border-[#E4D9BC]/60">
                  <div className="text-xs text-[#78716C] mb-4 italic">
                    <span className="font-semibold text-[#4A3B33] not-italic">Best For: </span>
                    {srv.idealFor}
                  </div>

                  <Link
                    href="#get-access"
                    onClick={() => sound.playClick()}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius)] bg-[#FAF6EE] border border-[#E4D9BC] py-2.5 px-4 font-mono text-xs font-bold text-[#4A3B33] hover:bg-[#B45309] hover:text-white hover:border-[#B45309] transition-all duration-200"
                  >
                    <span>Inquire About Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section 2: 4-Week Client Roadmap & Delivery Process */}
        <div className="mb-20 pt-16 border-t border-[#E4D9BC]">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] leading-none text-[#B45309] mb-4">
              <span aria-hidden="true" className="h-[7px] w-[7px] bg-[#B45309]" />
              The Delivery Protocol
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A3B33]">
              How We Go From Idea to Production in 4 Weeks.
            </h3>
            <p className="mt-2 text-sm text-[#78716C] max-w-2xl">
              Transparent, sprint-based workflow with zero black boxes. You test staging previews every week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {WORKFLOW_STEPS.map((step, sIdx) => (
              <div
                key={step.step}
                className="relative rounded-[var(--radius)] border bg-white border-[#E4D9BC] shadow-[var(--shadow-soft)] p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#E4C090] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-[#B45309]/30">
                      {step.step}
                    </span>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#78716C] bg-[#FAF6EE] px-2 py-0.5 rounded border border-[#E4D9BC]">
                      {step.timeline}
                    </span>
                  </div>

                  <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#B45309] mb-1">
                    {step.phase}
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#4A3B33] mb-3">
                    {step.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-[#57534E]">
                    {step.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E4D9BC]/60 flex items-center gap-2 font-mono text-[10px] text-[#78716C]">
                  <CalendarCheck className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Sprint Milestone {sIdx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Client Testimonials */}
        {CLIENT_TESTIMONIALS && CLIENT_TESTIMONIALS.length > 0 && (
          <div className="pt-16 border-t border-[#E4D9BC]">
            <div className="mb-10 text-center">
              <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] leading-none text-[#B45309] mb-3">
                <span aria-hidden="true" className="h-[7px] w-[7px] bg-[#B45309]" />
                Client Trust &amp; Founder Feedback
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A3B33]">
                What Founders Say About Working Together.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CLIENT_TESTIMONIALS.map((t, idx) => (
                <div
                  key={idx}
                  className="rounded-[var(--radius)] border bg-white border-[#E4D9BC] shadow-[var(--shadow-soft)] p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#E4C090] hover:-translate-y-1"
                >
                  <div>
                    <Quote className="w-6 h-6 text-[#E4C090] mb-4 opacity-80" />
                    <p className="font-serif text-sm leading-[1.7] text-[#4A3B33] italic mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E4D9BC]/60 flex items-center justify-between">
                    <div>
                      <div className="font-serif font-bold text-sm text-[#4A3B33]">
                        {t.author}
                      </div>
                      <div className="font-mono text-[10.5px] text-[#78716C]">
                        {t.role} · {t.company}
                      </div>
                    </div>
                    <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-[#FAF6EE] text-[#B45309] border border-[#E4D9BC]">
                      {t.projectType}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
