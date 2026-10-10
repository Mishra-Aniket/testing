"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Sparkles, CheckCircle2, Layers } from "lucide-react";
import { PROJECTS } from "../data/portfolioData";
import { sound } from "../utils/sound";
import Project3DVisualizer from "./Project3DVisualizer";

export default function FeaturedProjects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeProject = PROJECTS[activeIdx] || PROJECTS[0];

  const handleSelect = (idx) => {
    sound.playClick();
    setActiveIdx(idx);
  };

  return (
    <section id="work" className="relative py-20 md:py-28 bg-[#FDFBF7] border-t border-[#E4D9BC]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Section Eyebrow & Title */}
        <div className="mb-12 md:mb-16">
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

        {/* Interactive Project Selector Tabs (Lightweight, 60fps, No Scroll Lag) */}
        <div className="mb-8 flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {PROJECTS.map((project, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={project.id}
                onClick={() => handleSelect(idx)}
                className={`shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-[var(--radius)] text-xs font-mono transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? "bg-[#FAF6EE] text-[#B45309] border-[#B45309]/40 font-bold shadow-xs"
                    : "bg-white text-[#78716C] border-[#E4D9BC] hover:border-[#B45309]/30 hover:text-[#4A3B33]"
                }`}
              >
                <span className={isActive ? "text-[#B45309]" : "text-[#A8A29E]"}>
                  0{idx + 1}
                </span>
                <span className="font-serif font-bold text-sm text-[#4A3B33]">{project.title}</span>
                <span className="hidden sm:inline-block text-[10px] text-[#A8A29E] uppercase font-mono">
                  ({project.category})
                </span>
              </button>
            );
          })}
        </div>

        {/* Featured Showcase Card (Clean 2-Column Layout: Warm 3D Diagram on Left, Project Spec on Right) */}
        <div className="rounded-[var(--radius)] border bg-white border-[#E4D9BC] shadow-[var(--shadow-soft)] p-7 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Warm 3D Vector Visualizer (Matching StackDiagram Aesthetic) */}
            <div className="lg:col-span-6 w-full">
              <Project3DVisualizer projectId={activeProject.id} />
            </div>

            {/* Right Column: Project Specification & Proof of Work */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Header Tag & Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5 font-mono text-xs">
                    <span className="font-bold text-[#B45309] bg-[#B45309]/10 px-2.5 py-0.5 rounded border border-[#B45309]/20">
                      0{activeIdx + 1} // {activeProject.category}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#78716C] bg-[#FAF6EE] px-2.5 py-1 rounded border border-[#E4D9BC]">
                    {activeProject.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A3B33] mb-1.5">
                  {activeProject.title}
                </h3>
                <div className="font-mono text-xs text-[#78716C] mb-4">
                  {activeProject.subtitle}
                </div>

                {/* Metrics Pill */}
                {activeProject.metrics && (
                  <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FAF6EE] border border-[#E4D9BC]/90 font-mono text-[11px] text-[#4A3B33] font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                    <span>{activeProject.metrics}</span>
                  </div>
                )}

                {/* Description */}
                <p className="text-[0.9375rem] leading-[1.7] text-[#57534E] mb-5">
                  {activeProject.description}
                </p>

                {/* Highlights List */}
                {activeProject.highlights && activeProject.highlights.length > 0 && (
                  <ul className="mb-6 space-y-2 border-t border-[#E4D9BC]/60 pt-4">
                    {activeProject.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs text-[#78716C] leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B45309] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#E4D9BC]/60 mb-6">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10.5px] px-2 py-0.5 rounded bg-[#FAF6EE] text-[#57534E] border border-[#E4D9BC]/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-4 pt-2">
                <a
                  href={activeProject.liveUrl}
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-[#B45309] px-4 py-2 font-mono text-xs font-bold text-white hover:bg-[#A16207] shadow-xs transition-all"
                >
                  <span>Interactive Demo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#78716C] hover:text-[#4A3B33] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Inspect Source</span>
                </a>
              </div>
            </div>
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
