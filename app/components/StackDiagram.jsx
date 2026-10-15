'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { 
  Layers, 
  Cpu, 
  Database, 
  Globe, 
  Radio, 
  ShieldCheck, 
  Terminal, 
  Zap, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

// Bespoke 4-Layer Architecture specifically built for Aniket Mishra
const ARCHITECTURE_LAYERS = [
  {
    id: "l00",
    number: "01",
    tag: "L01 // STORAGE & CACHE",
    title: "Distributed Data & Cache",
    techs: ["PostgreSQL", "Supabase", "Redis", "SQLite WAL"],
    metrics: "Sub-1ms in-memory cache · WAL zero-corruption",
    description: "ACID-compliant relational schemas with Redis caching and SQLite Write-Ahead Logging for high-concurrency offline and edge resilience.",
    stats: [
      { label: "TRANSACTIONS", value: "ACID Compliant" },
      { label: "CACHE HIT", value: "< 2ms Latency" },
      { label: "STORAGE", value: "Postgres + WAL" }
    ],
    code: 'db.wal_mode = "NORMAL"; redis.cache("query_v2");',
    color: "#B45309"
  },
  {
    id: "l01",
    number: "02",
    tag: "L02 // BACKEND CORE",
    title: "High-Throughput Microservices",
    techs: [".NET 8 (C#)", "Python (FastAPI)", "REST", "JWT Auth"],
    metrics: "< 80ms p95 latency · Multi-tenant security",
    description: "High-throughput asynchronous API microservices built with .NET 8 / C# and FastAPI. Strict type safety, connection pooling, and resilient worker threads.",
    stats: [
      { label: "FRAMEWORKS", value: ".NET 8 + FastAPI" },
      { label: "LATENCY", value: "< 80ms p95" },
      { label: "AUTH", value: "JWT + OAuth2" }
    ],
    code: 'services.AddScoped<IPipelineService, Engine>();',
    color: "#D97706"
  },
  {
    id: "l02",
    number: "03",
    tag: "L03 // INGESTION & PIPELINE",
    title: "Centrix Automation & Streaming",
    techs: ["Chunked Uploads", "Google Drive API", "SSE Streams", "OBS Sync"],
    metrics: "Scaled across 500+ centers · 20,000+ lectures/day",
    description: "Real-time edge ingestion engine matching lecture recordings with interactive notes and executing chunked resumable uploads with zero cloud egress cost.",
    stats: [
      { label: "THROUGHPUT", value: "20,000 Lectures/Day" },
      { label: "SCALE", value: "500+ PW Centers" },
      { label: "EGRESS COST", value: "0% (Zero Cloud Bill)" }
    ],
    code: 'pipeline.StreamChunkedUpload(session, driveToken);',
    color: "#059669"
  },
  {
    id: "l03",
    number: "04",
    tag: "L04 // CLIENT & EXTENSIONS",
    title: "Next.js 15 & Chrome Extensions (MV3)",
    techs: ["Next.js 15", "React 19", "OmTabs MV3", "Tailwind CSS"],
    metrics: "Official Chrome Web Store · Biometric Auth · Sub-10ms UI",
    description: "Ultra-responsive client-side web applications and official Chrome extensions with biometric privacy locks, persistent state memory, and zero UI stutter.",
    stats: [
      { label: "WEB STORE", value: "Official Extension" },
      { label: "SPEED", value: "< 10ms Rename" },
      { label: "UI ENGINE", value: "Next.js 15 + React 19" }
    ],
    code: 'chrome.tabs.update(activeTabId, { title: customTitle });',
    color: "#2563EB"
  }
];

export default function StackDiagram() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Auto-highlight layer when navigated via hash (e.g. #stack-l01)
  useEffect(() => {
    const handleHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("l00") || hash.includes("data") || hash.includes("database")) setHoveredIdx(0);
      else if (hash.includes("l01") || hash.includes("backend") || hash.includes("engine")) setHoveredIdx(1);
      else if (hash.includes("l02") || hash.includes("pipeline") || hash.includes("centrix")) setHoveredIdx(2);
      else if (hash.includes("l03") || hash.includes("client") || hash.includes("omtabs")) setHoveredIdx(3);
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const activeData = hoveredIdx !== null ? ARCHITECTURE_LAYERS[hoveredIdx] : null;

  return (
    <div className="relative w-full select-none">
      {/* 1. TOP ENGINEERING COCKPIT TELEMETRY BAR */}
      <div className="mb-4 rounded-xl border border-[#E4D9BC] bg-white p-3.5 sm:p-4 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#FAF6EE] border border-[#E4D9BC] text-[#B45309]">
              <Cpu className="w-3.5 h-3.5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#B45309]">
                  ANIKET // FULL-STACK SYSTEM ENGINE
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="font-mono text-[11px] text-[#78716C] mt-0.5">
                4-Layer Production Architecture · High Concurrency
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10.5px]">
            <span className="bg-[#FAF6EE] text-[#4A3B33] border border-[#E4D9BC] px-2 py-0.5 rounded">
              p95: &lt;80ms
            </span>
            <span className="bg-[#059669]/10 text-[#059669] border border-[#059669]/20 px-2 py-0.5 rounded font-bold">
              20K+ Ops/Day
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN 3D ARCHITECTURAL STACK CONTAINER */}
      <div className="relative rounded-2xl border border-[#E4D9BC] bg-gradient-to-b from-[#FDFBF7] to-[#FAF6EE] p-4 sm:p-6 shadow-[0_20px_50px_rgba(74,59,51,0.08)] overflow-hidden">
        {/* Subtle engineering grid backdrop */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(228, 217, 188, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(228, 217, 188, 0.4) 1px, transparent 1px)",
            backgroundSize: "28px 28px"
          }}
        />

        {/* 4 Interactive Vertical Slices / Layers */}
        <div className="relative z-10 flex flex-col gap-3">
          {ARCHITECTURE_LAYERS.map((layer, idx) => {
            const isHovered = hoveredIdx === idx;
            const isAnyHovered = hoveredIdx !== null;

            return (
              <div
                key={layer.id}
                id={`stack-${layer.id}`}
                onMouseEnter={() => {
                  sound.playClick();
                  setHoveredIdx(idx);
                }}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => {
                  sound.playClick();
                  setHoveredIdx(hoveredIdx === idx ? null : idx);
                }}
                className={`group relative rounded-xl border p-4 transition-all duration-300 cursor-pointer select-none ${
                  isHovered
                    ? "bg-white border-[#B45309] shadow-[0_12px_28px_-8px_rgba(180,83,9,0.22)] -translate-y-1 scale-[1.01]"
                    : isAnyHovered
                    ? "bg-white/70 border-[#E4D9BC]/80 opacity-60 hover:opacity-100"
                    : "bg-white/90 border-[#E4D9BC] hover:border-[#B45309]/60 hover:shadow-sm"
                }`}
              >
                {/* Accent border highlight */}
                <div 
                  className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl transition-colors ${
                    isHovered ? "bg-[#B45309]" : "bg-[#E4D9BC]"
                  }`} 
                />

                <div className="pl-2">
                  {/* Top Bar of Layer */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10.5px] font-bold text-[#B45309]">
                        {layer.tag}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-[#E4D9BC]" />
                      <span className="font-mono text-[10px] text-[#78716C]">
                        {layer.metrics}
                      </span>
                    </div>

                    <ArrowUpRight className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isHovered ? "text-[#B45309] translate-x-0.5 -translate-y-0.5" : "text-[#A8A29E]"
                    }`} />
                  </div>

                  {/* Layer Title */}
                  <h3 className="font-serif text-[1.0625rem] sm:text-[1.125rem] font-bold text-[#4A3B33] mb-2 group-hover:text-[#B45309] transition-colors">
                    {layer.title}
                  </h3>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {layer.techs.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className={`font-mono text-[10.5px] px-2 py-0.5 rounded border transition-colors ${
                          isHovered
                            ? "bg-[#FAF6EE] text-[#B45309] border-[#B45309]/30 font-medium"
                            : "bg-[#FDFBF7] text-[#57534E] border-[#E4D9BC]"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expanded Telemetry Preview when hovered */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-[#E4D9BC]/60 space-y-2">
                          <p className="text-xs leading-relaxed text-[#57534E]">
                            {layer.description}
                          </p>
                          <div className="grid grid-cols-3 gap-2 pt-1 font-mono">
                            {layer.stats.map((s, sIdx) => (
                              <div key={sIdx} className="bg-[#FAF6EE] p-1.5 rounded border border-[#E4D9BC]/60">
                                <div className="text-[9px] text-[#78716C] uppercase">{s.label}</div>
                                <div className="text-[10.5px] font-bold text-[#4A3B33] truncate mt-0.5">{s.value}</div>
                              </div>
                            ))}
                          </div>
                          <div className="rounded bg-[#1C1917] px-2.5 py-1.5 font-mono text-[10px] text-[#E4C090] flex items-center gap-2">
                            <span className="text-[#B45309]">▸</span>
                            <span className="truncate">{layer.code}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Rail Hints */}
        <div className="mt-4 pt-3 border-t border-[#E4D9BC]/70 flex items-center justify-between text-[10.5px] font-mono text-[#78716C] relative z-10">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B45309]" />
            Live System Layers · Ready for Production
          </span>
          <span className="text-[#B45309] font-medium hidden sm:inline">
            Click or hover to inspect specs
          </span>
        </div>
      </div>
    </div>
  );
}
