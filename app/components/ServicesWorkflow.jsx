"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Rocket, 
  Brain, 
  Cpu, 
  Shield, 
  Clock, 
  Check, 
  ArrowRight, 
  Quote,
  CalendarCheck
} from "lucide-react";
import { SERVICES, WORKFLOW_STEPS, CLIENT_TESTIMONIALS } from "../data/portfolioData";
import { sound } from "../utils/sound";
import Service3DVisualizer from "./Service3DVisualizer";

const ICON_MAP = {
  Rocket: Rocket,
  Brain: Brain,
  Cpu: Cpu,
  Shield: Shield
};

export default function ServicesWorkflow() {
  const [activeStep, setActiveStep] = useState(0);

  // High-performance IntersectionObserver: updates active service step on scroll with ZERO thread lag
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexStr = entry.target.getAttribute("data-service-index");
            if (indexStr !== null) {
              setActiveStep(parseInt(indexStr, 10));
            }
          }
        });
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: 0.1
      }
    );

    SERVICES.forEach((s, idx) => {
      const el = document.getElementById(`service-${s.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToService = (idx) => {
    sound.playClick();
    setActiveStep(idx);
    const el = document.getElementById(`service-${SERVICES[idx].id}`);
    if (el) {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -120, duration: 1.0 });
      } else {
        const targetY = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    }
  };

  return (
    <section id="services" className="relative py-20 md:py-28 bg-[#F8F4EE] border-t border-[#E4D9BC]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 md:mb-20">
          <div aria-hidden="true" className="h-px w-full bg-[#E4D9BC] mb-7" />
          <div className="mb-6">
            <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] leading-none text-[#B45309]">
              <span aria-hidden="true" className="h-[7px] w-[7px] bg-[#B45309]" />
              Freelance Offerings &amp; Sprints
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <h2 className="text-[clamp(1.875rem,3.6vw,2.875rem)] leading-[1.14] tracking-[-0.028em] font-bold text-[#4A3B33] text-balance lg:col-span-7 font-serif">
              High-Velocity Services for{" "}
              <span className="text-[#B45309] italic font-normal">Fast-Moving Teams</span>.
            </h2>
            <div className="lg:col-span-5 lg:pb-1.5">
              <p className="text-[1.0625rem] leading-[1.75] text-[#57534E]">
                Direct 1-on-1 collaboration. No middle managers, no bloated agency fees. You work directly with a senior full-stack engineer who ships reliable code with complete IP ownership.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Horizontal Tabs */}
        <div className="lg:hidden sticky top-14 md:top-20 z-30 -mx-4 px-4 py-2.5 bg-[#FAF6EE]/95 backdrop-blur-md border-y border-[#E4D9BC]/70 mb-8">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
            {SERVICES.map((srv, idx) => (
              <button
                key={srv.id}
                onClick={() => scrollToService(idx)}
                className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  activeStep === idx
                    ? "bg-[#B45309] text-white shadow-xs"
                    : "bg-white text-[#78716C] border border-[#E4D9BC]"
                }`}
              >
                <span>0{idx + 1}</span>
                <span className="max-w-[130px] truncate">{srv.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Two Column Layout (Image 3 Style): Sticky Navigation (Left) + Sequential Scrolling Services (Right) */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-24 md:mb-32">
          {/* Sticky Navigation (Desktop) matching Image 3 */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 md:top-32 w-full">
              {/* Progress Bars */}
              <div className="mb-8 flex gap-1.5" aria-hidden="true">
                {SERVICES.map((s, idx) => (
                  <div key={s.id} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[#E4D9BC]">
                    <div
                      className="absolute inset-0 origin-left bg-[#B45309] transition-transform duration-300"
                      style={{ transform: idx <= activeStep ? "scaleX(1)" : "scaleX(0)" }}
                    />
                  </div>
                ))}
              </div>

              {/* Step Navigation Buttons */}
              <nav className="flex flex-col gap-2">
                {SERVICES.map((srv, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={srv.id}
                      onClick={() => scrollToService(idx)}
                      className={`w-full text-left p-3.5 rounded-[var(--radius)] transition-all duration-200 cursor-pointer flex items-start gap-3.5 group border ${
                        isActive
                          ? "bg-white border-[#E4D9BC] shadow-xs"
                          : "bg-transparent border-transparent hover:bg-black/[0.02] hover:border-[#E4D9BC]/50"
                      }`}
                    >
                      <span
                        className={`font-mono text-xs font-bold pt-0.5 transition-colors ${
                          isActive ? "text-[#B45309]" : "text-[#78716C] group-hover:text-[#4A3B33]"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-serif text-sm leading-snug transition-colors ${
                            isActive
                              ? "font-bold text-[#4A3B33]"
                              : "font-medium text-[#78716C] group-hover:text-[#4A3B33]"
                          }`}
                        >
                          {srv.title}
                        </div>
                        <div className="font-mono text-[10px] text-[#A8A29E] mt-1 flex items-center gap-1.5">
                          <span className="text-[#B45309] font-medium">{srv.turnaround}</span>
                          <span>·</span>
                          <span>{srv.badge}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Guarantee Box */}
              <div className="mt-8 p-4 rounded-xl border border-[#E4D9BC] bg-white/80 shadow-xs">
                <div className="font-serif font-bold text-xs text-[#4A3B33] mb-1">
                  100% IP &amp; Code Ownership
                </div>
                <div className="font-mono text-[10.5px] text-[#78716C] mb-3">
                  All repositories, environment secrets, and documentation transferred directly to your organization.
                </div>
                <Link
                  href="#get-access"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#B45309] hover:text-[#92400E]"
                >
                  Schedule Scope Call →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: ALL Services Stacked Continuously (Visitors can scroll through every service) */}
          <div className="lg:col-span-8 flex flex-col gap-14">
            {SERVICES.map((srv, idx) => {
              const IconComponent = ICON_MAP[srv.icon] || Rocket;
              return (
                <div
                  key={srv.id}
                  id={`service-${srv.id}`}
                  data-service-index={idx}
                  className="group relative rounded-[var(--radius)] border bg-white border-[#E4D9BC] shadow-[var(--shadow-soft)] p-7 sm:p-9 transition-all duration-300 hover:shadow-[var(--shadow-soft-lg)] hover:border-[#E4C090]"
                >
                  {/* Step Header */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#B45309] bg-[#B45309]/10 px-2.5 py-1 rounded border border-[#B45309]/20">
                        0{idx + 1} // SPRINT
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FAF6EE] border border-[#E4D9BC] text-[#B45309]">
                        <IconComponent className="w-4 h-4" />
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#B45309] bg-[#B45309]/10 px-2 py-0.5 rounded border border-[#B45309]/20">
                        {srv.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-xs text-[#78716C] bg-[#FAF6EE] px-2.5 py-1 rounded border border-[#E4D9BC]">
                      <Clock className="w-3.5 h-3.5 text-[#B45309]" />
                      <span>{srv.turnaround}</span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A3B33] mb-2 group-hover:text-[#B45309] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="font-mono text-xs text-[#78716C] mb-5">
                    {srv.tagline}
                  </p>

                  {/* Frameless 3D Blueprint Diagram (Pure floating vector graphic, NO inner box!) */}
                  <div className="mb-6 pt-2 pb-4 border-y border-[#E4D9BC]/50">
                    <Service3DVisualizer serviceId={srv.id} />
                  </div>

                  {/* Description */}
                  <p className="text-[0.9375rem] leading-[1.7] text-[#57534E] mb-6">
                    {srv.description}
                  </p>

                  {/* Deliverables List */}
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

                  <div className="pt-5 border-t border-[#E4D9BC]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs text-[#78716C] italic">
                      <span className="font-semibold text-[#4A3B33] not-italic">Best For: </span>
                      {srv.idealFor}
                    </div>

                    <Link
                      href="#get-access"
                      onClick={() => sound.playClick()}
                      className="inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-[#B45309] text-white py-2.5 px-5 font-mono text-xs font-bold hover:bg-[#A16207] shadow-xs transition-all duration-200 shrink-0"
                    >
                      <span>Inquire About Scope</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: 4-Week Client Delivery Protocol */}
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

        {/* Section 3: Founder Testimonials */}
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
