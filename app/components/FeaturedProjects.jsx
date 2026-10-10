"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Sparkles, CheckCircle2, Layers } from "lucide-react";
import { PROJECTS } from "../data/portfolioData";
import { sound } from "../utils/sound";
import Project3DVisualizer from "./Project3DVisualizer";

export default function FeaturedProjects() {
  const [activeStep, setActiveStep] = useState(0);

  // High-performance IntersectionObserver: updates active step on scroll without thread lag
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexStr = entry.target.getAttribute("data-project-index");
            if (indexStr !== null) {
              setActiveStep(parseInt(indexStr, 10));
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -40% 0px",
        threshold: 0.15
      }
    );

    PROJECTS.forEach((p, idx) => {
      const el = document.getElementById(`project-${p.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToProject = (idx) => {
    sound.playClick();
    setActiveStep(idx);
    const el = document.getElementById(`project-${PROJECTS[idx].id}`);
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
    <section id="work" className="relative py-20 md:py-28 bg-[#FDFBF7] border-t border-[#E4D9BC]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 md:mb-20">
          <div aria-hidden="true" className="h-px w-full bg-[#E4D9BC] mb-7" />
          <div className="mb-6">
            <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] leading-none text-[#B45309]">
              <span aria-hidden="true" className="h-[7px] w-[7px] bg-[#B45309]" />
              Proof of Work &amp; Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <h2 className="text-[clamp(1.875rem,3.6vw,2.875rem)] leading-[1.14] tracking-[-0.028em] font-bold text-[#4A3B33] text-balance lg:col-span-7 font-serif">
              Selected Projects &amp;{" "}
              <span className="text-[#B45309] italic font-normal">Production Systems</span>.
            </h2>
            <div className="lg:col-span-5 lg:pb-1.5">
              <p className="text-[1.0625rem] leading-[1.75] text-[#57534E]">
                A curated selection of production applications, AI agent pipelines, and high-performance primitives built with vector math, edge latency optimizations, and clean architecture.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Horizontal Tabs */}
        <div className="lg:hidden sticky top-14 md:top-20 z-30 -mx-4 px-4 py-2.5 bg-[#FDFBF7]/95 backdrop-blur-md border-y border-[#E4D9BC]/70 mb-8">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
            {PROJECTS.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => scrollToProject(idx)}
                className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  activeStep === idx
                    ? "bg-[#B45309] text-white shadow-xs"
                    : "bg-white text-[#78716C] border border-[#E4D9BC]"
                }`}
              >
                <span>0{idx + 1}</span>
                <span className="max-w-[130px] truncate">{project.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Two Column Layout (Image 3 Style): Sticky Navigation (Left) + Continuous Scrolling Projects (Right) */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-24 md:mb-32">
          {/* Sticky Navigation (Desktop) matching Image 3 */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 md:top-32 w-full">
              {/* Progress Bars */}
              <div className="mb-8 flex gap-1.5" aria-hidden="true">
                {PROJECTS.map((p, idx) => (
                  <div key={p.id} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[#F1E9DA]">
                    <div
                      className="absolute inset-0 origin-left bg-[#B45309] transition-transform duration-300"
                      style={{ transform: idx <= activeStep ? "scaleX(1)" : "scaleX(0)" }}
                    />
                  </div>
                ))}
              </div>

              {/* Step Navigation Buttons matching Image 3 */}
              <nav className="flex flex-col gap-2">
                {PROJECTS.map((project, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={project.id}
                      onClick={() => scrollToProject(idx)}
                      className={`w-full text-left p-3.5 rounded-[var(--radius)] transition-all duration-200 cursor-pointer flex items-start gap-3.5 group border ${
                        isActive
                          ? "bg-[#FAF6EE] border-[#E4D9BC] shadow-xs"
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
                          {project.title}
                        </div>
                        <div className="font-mono text-[10px] text-[#A8A29E] mt-1 flex items-center gap-1.5">
                          <span className="text-[#B45309] font-medium">{project.category}</span>
                          <span>·</span>
                          <span>{project.badge}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Inquiry Mini Card */}
              <div className="mt-8 p-4 rounded-xl border border-[#E4D9BC] bg-white/70 shadow-xs">
                <div className="font-serif font-bold text-xs text-[#4A3B33] mb-1">
                  Need a custom build?
                </div>
                <div className="font-mono text-[10.5px] text-[#78716C] mb-3">
                  I architect &amp; deploy production MVPs in 2–4 weeks.
                </div>
                <Link
                  href="#get-access"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#B45309] hover:text-[#92400E]"
                >
                  Start Project Scope →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: ALL Projects Stacked Continuously (Scroll down to view every project) */}
          <div className="lg:col-span-8 flex flex-col gap-14">
            {PROJECTS.map((project, idx) => (
              <article
                key={project.id}
                id={`project-${project.id}`}
                data-project-index={idx}
                className="scroll-mt-32 group relative rounded-[var(--radius)] border bg-white border-[#E4D9BC] shadow-[var(--shadow-soft)] p-7 sm:p-9 lg:p-10 transition-all duration-300 hover:shadow-[var(--shadow-soft-lg)] hover:border-[#E4C090]"
              >
                {/* Step Index & Badge Header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-[#B45309] bg-[#B45309]/10 px-2.5 py-0.5 rounded border border-[#B45309]/20">
                      0{idx + 1} // {project.category}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#78716C] bg-[#FAF6EE] px-2.5 py-1 rounded border border-[#E4D9BC]">
                    {project.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A3B33] mb-1.5 group-hover:text-[#B45309] transition-colors">
                  {project.title}
                </h3>
                <div className="font-mono text-xs text-[#78716C] mb-5">
                  {project.subtitle}
                </div>

                {/* Metrics Pill */}
                {project.metrics && (
                  <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FAF6EE] border border-[#E4D9BC]/90 font-mono text-[11px] text-[#4A3B33] font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                    <span>{project.metrics}</span>
                  </div>
                )}

                {/* Frameless 3D Telemetry Diagram (Pure floating vector graphic, NO inner box!) */}
                <div className="mb-6">
                  <Project3DVisualizer projectId={project.id} />
                </div>

                {/* Description */}
                <p className="text-[0.9375rem] leading-[1.7] text-[#57534E] mb-6">
                  {project.description}
                </p>

                {/* Highlights List */}
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="mb-6 space-y-2 border-t border-[#E4D9BC]/60 pt-4">
                    {project.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs text-[#78716C] leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B45309] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#E4D9BC]/60 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10.5px] px-2 py-0.5 rounded bg-[#FAF6EE] text-[#57534E] border border-[#E4D9BC]/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <a
                    href={project.liveUrl}
                    onClick={() => sound.playClick()}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#B45309] hover:text-[#92400E] transition-colors"
                  >
                    <span>Interactive Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[#78716C] hover:text-[#4A3B33] transition-colors"
                    title="Inspect Source Code on GitHub"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="p-6 rounded-[var(--radius)] border border-[#E4D9BC] bg-[#FAF6EE] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-[#E4D9BC] text-[#B45309] shrink-0">
              <Layers className="w-4 h-4" />
            </span>
            <div>
              <div className="font-serif font-bold text-sm text-[#4A3B33]">
                Have a bespoke project or need custom architectural advisory?
              </div>
              <div className="font-mono text-xs text-[#78716C]">
                I build and deploy custom MVPs with full source code transfer in 2–4 weeks.
              </div>
            </div>
          </div>
          <Link
            href="#get-access"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-[#B45309] px-4 py-2 font-mono text-xs font-bold text-white shadow-xs hover:bg-[#A16207] transition-all shrink-0"
          >
            Start Project Discussion →
          </Link>
        </div>
      </div>
    </section>
  );
}
