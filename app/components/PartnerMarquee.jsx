"use client";

import React from "react";
import Link from "next/link";
import { PROJECTS } from "../data/portfolioData";
import { sound } from "../utils/sound";
import { ArrowUpRight } from "lucide-react";

export default function PartnerMarquee() {
  const projects = PROJECTS || [];

  const renderProjectItem = (project, keyPrefix, idx) => {
    const rawTitle = project.title ? project.title.split("—")[0].trim() : project.id;
    const badgeText = project.badge ? project.badge.split("(")[0].trim() : project.category || "Project";
    const href = project.liveUrl && project.liveUrl !== "Live Demo Will Be Provided Soon"
      ? project.liveUrl
      : (project.githubUrl || "#projects");
    const isExternal = href.startsWith("http");

    return (
      <li key={`${keyPrefix}-${project.id || idx}`} className="flex items-center shrink-0">
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          onClick={() => sound.playClick()}
          className="group flex items-center gap-3.5 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer text-[#4A3B33] hover:text-[#B45309] hover:bg-[#B45309]/[0.06] select-none"
        >
          {/* Subtle live indicator dot */}
          <span className="h-1.5 w-1.5 rounded-full bg-[#B45309]/60 group-hover:bg-[#B45309] group-hover:scale-125 transition-all duration-200 shrink-0" />
          
          {/* Project Name */}
          <span className="font-serif font-bold text-sm sm:text-[15px] tracking-tight group-hover:text-[#B45309] transition-colors whitespace-nowrap">
            {rawTitle}
          </span>

          {/* Clean Sub-Badge */}
          <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#78716C] bg-[#F4EEDB] group-hover:bg-white group-hover:text-[#B45309] group-hover:border-[#B45309]/40 px-2 py-0.5 rounded border border-[#E4D9BC] transition-all whitespace-nowrap">
            {badgeText}
          </span>

          {/* External arrow indicator on hover */}
          <ArrowUpRight className="w-3.5 h-3.5 text-[#A8A29E] opacity-40 group-hover:opacity-100 group-hover:text-[#B45309] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
        </a>

        {/* Separator between items */}
        <span aria-hidden="true" className="mx-6 sm:mx-8 text-[#D6D3D1] select-none font-mono text-xs">
          /
        </span>
      </li>
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#FDFBF7] pt-8 pb-14 border-b border-[#E4D9BC]/40">
      <div className="mx-auto mb-7 flex max-w-[1200px] items-center gap-6 px-6 lg:px-8">
        <div className="h-px w-full bg-[#E4D9BC] flex-1" />
        <span className="shrink-0 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#78716C] flex items-center gap-2">
          <span className="h-[6px] w-[6px] bg-[#B45309]" />
          Featured Projects &amp; Production Systems
        </span>
        <div className="h-px w-full bg-[#E4D9BC] flex-1" />
      </div>

      <div
        className="marquee group relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max items-center">
          {/* Track 1: Dynamically mapped from portfolioData.js */}
          <ul className="flex shrink-0 items-center pl-4">
            {projects.map((project, idx) => renderProjectItem(project, "p1", idx))}
          </ul>
          {/* Track 2: Seamless loop clone */}
          <ul aria-hidden="true" className="flex shrink-0 items-center pl-4">
            {projects.map((project, idx) => renderProjectItem(project, "p2", idx))}
          </ul>
        </div>
      </div>
    </section>
  );
}
