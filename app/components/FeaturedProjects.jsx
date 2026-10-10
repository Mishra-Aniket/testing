"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Sparkles, CheckCircle2, Layers, Filter } from "lucide-react";
import { PROJECTS } from "../data/portfolioData";
import { sound } from "../utils/sound";

export default function FeaturedProjects() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="work" className="relative py-20 md:py-28 bg-[#FDFBF7] border-t border-[#E4D9BC]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Header Eyebrow & Title */}
        <div className="mb-14 md:mb-16">
          <div aria-hidden="true" className="h-px w-full bg-[#E4D9BC] mb-7" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] leading-none text-[#B45309]">
              <span aria-hidden="true" className="h-[7px] w-[7px] bg-[#B45309]" />
              Proof of Work &amp; Case Studies
            </span>

            {/* Category Filter Pills */}
            <div className="flex items-center flex-wrap gap-1.5 p-1 bg-[#FAF6EE] rounded-lg border border-[#E4D9BC]/80">
              <span className="hidden sm:inline-flex items-center gap-1 px-2 font-mono text-[10px] uppercase text-[#78716C] tracking-wider">
                <Filter className="w-3 h-3 text-[#A8A29E]" /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#B45309] text-white font-bold shadow-xs"
                      : "text-[#78716C] hover:text-[#4A3B33] hover:bg-[#F0EAE1]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <h2 className="text-[clamp(1.875rem,3.6vw,2.875rem)] leading-[1.14] tracking-[-0.028em] font-bold text-[#4A3B33] text-balance lg:col-span-7">
              Selected Projects &amp;{" "}
              <span className="text-[#B45309]">Production Systems</span>.
            </h2>
            <div className="lg:col-span-5 lg:pb-1.5">
              <p className="text-[1.0625rem] leading-[1.75] text-[#57534E]">
                A curated selection of production applications, AI agent pipelines, and high-performance primitives built for founders, engineering teams, and client contracts.
              </p>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className="group relative rounded-[var(--radius)] border bg-white border-[#E4D9BC] shadow-[var(--shadow-soft)] p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft-lg)] hover:border-[#E4C090]"
              >
                <div>
                  {/* Top Bar: Badge & Category */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#B45309] bg-[#B45309]/10 px-2.5 py-1 rounded border border-[#B45309]/20">
                      {project.category}
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#78716C] bg-[#FAF6EE] px-2 py-0.5 rounded border border-[#E4D9BC]">
                      {project.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A3B33] mb-1.5 group-hover:text-[#B45309] transition-colors">
                    {project.title}
                  </h3>
                  <div className="font-mono text-xs text-[#78716C] mb-4">
                    {project.subtitle}
                  </div>

                  {/* Metrics Highlight Pill */}
                  {project.metrics && (
                    <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FAF6EE] border border-[#E4D9BC]/90 font-mono text-[11px] text-[#4A3B33] font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                      <span>{project.metrics}</span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-[0.9375rem] leading-[1.65] text-[#57534E] mb-6">
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
                </div>

                <div>
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

                  {/* Bottom Actions */}
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
                      <span>Source</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Banner for Custom Inquiries */}
        <div className="mt-12 p-6 rounded-[var(--radius)] border border-[#E4D9BC] bg-[#FAF6EE] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
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
