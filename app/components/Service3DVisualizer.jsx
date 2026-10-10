"use client";

import React, { useState, useRef } from "react";

export default function Service3DVisualizer({ serviceId }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // 1. Rapid MVP: 4-Tier 3D Isometric Sprint Architecture
  if (serviceId === "mvp-build") {
    const tiers = [
      { id: 4, name: "L04 Frontend", desc: "Next.js 15 + Responsive UI", y: 35, color: "#E4C090" },
      { id: 3, name: "L03 API Engine", desc: "FastAPI / Node.js & Auth", y: 65, color: "#B45309" },
      { id: 2, name: "L02 Database", desc: "Postgres + Supabase + Stripe", y: 95, color: "#92400E" },
      { id: 1, name: "L01 Edge Cloud", desc: "Docker + Vercel / AWS", y: 125, color: "#78350F" },
    ];

    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[220px] sm:h-[250px] rounded-xl overflow-hidden bg-[#1C1917] border border-white/[0.1] flex items-center justify-center select-none"
      >
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 font-mono text-[10px] text-[#A8A29E]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-ping" />
          <span className="text-[#E4C090] font-semibold">3D SPRINT BLUEPRINT</span>
          <span className="text-white/40">·</span>
          <span>RAPID MVP STACK</span>
        </div>

        <svg
          viewBox="0 0 340 180"
          className="w-full h-full max-h-[210px]"
          style={{
            transform: `perspective(600px) rotateX(${mousePos.y * -16}deg) rotateY(${mousePos.x * 16}deg)`,
            transition: "transform 0.12s ease-out"
          }}
        >
          {/* 4 Isometric Floating Tier Slabs */}
          {tiers.map((tier, idx) => {
            const ty = tier.y;
            return (
              <g key={tier.id} className="cursor-pointer group">
                {/* Isometric Slab Base */}
                <polygon
                  points={`170,${ty - 16} 275,${ty} 170,${ty + 16} 65,${ty}`}
                  fill={tier.color}
                  fillOpacity="0.35"
                  stroke={tier.color}
                  strokeWidth="1.2"
                />
                {/* Slab Thickness */}
                <polygon
                  points={`65,${ty} 170,${ty + 16} 170,${ty + 22} 65,${ty + 6}`}
                  fill={tier.color}
                  fillOpacity="0.6"
                />
                <polygon
                  points={`170,${ty + 16} 275,${ty} 275,${ty + 6} 170,${ty + 22}`}
                  fill={tier.color}
                  fillOpacity="0.8"
                />

                {/* Tier Label */}
                <text
                  x="170"
                  y={ty + 4}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="8.5"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {tier.name}
                </text>
              </g>
            );
          })}

          {/* Central Alignment Laser Axis */}
          <line x1="170" y1="15" x2="170" y2="155" stroke="rgba(228,192,144,0.3)" strokeWidth="1" strokeDasharray="3 3" />
        </svg>

        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#A8A29E] bg-[#1C1917]/80 backdrop-blur-xs px-2.5 py-1 rounded border border-white/[0.08]">
          <span>Delivery Timeline: <span className="text-[#10B981] font-bold">14 – 28 Days</span></span>
          <span>IP Handover: <span className="text-[#E4C090] font-semibold">100% Full Ownership</span></span>
        </div>
      </div>
    );
  }

  // 2. AI Agents & RAG: 3D Autonomous Dispatch Topology
  if (serviceId === "ai-agents-rag") {
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[220px] sm:h-[250px] rounded-xl overflow-hidden bg-[#1C1917] border border-white/[0.1] flex items-center justify-center select-none"
      >
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 font-mono text-[10px] text-[#A8A29E]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6] animate-ping" />
          <span className="text-[#E4C090] font-semibold">3D AGENT DISPATCH MESH</span>
          <span className="text-white/40">·</span>
          <span>TOOL-CALLING TOPOLOGY</span>
        </div>

        <svg
          viewBox="0 0 340 180"
          className="w-full h-full max-h-[210px]"
          style={{
            transform: `perspective(600px) rotateX(${mousePos.y * -18}deg) rotateY(${mousePos.x * 18}deg)`,
            transition: "transform 0.12s ease-out"
          }}
        >
          {/* Triangular Agent Coordinate Matrix */}
          <g transform="translate(170, 90)">
            {/* Outer Hexagon Orbit */}
            <polygon
              points="0,-65 56,-32 56,32 0,65 -56,32 -56,-32"
              fill="none"
              stroke="rgba(228,192,144,0.2)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* Connecting Dispatch Beams */}
            <line x1="0" y1="0" x2="0" y2="-65" stroke="#E4C090" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="56" y2="32" stroke="#B45309" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="-56" y2="32" stroke="#B45309" strokeWidth="1.5" />

            {/* Central Orchestrator Core */}
            <circle r="14" fill="#B45309" opacity="0.3" className="animate-ping" />
            <circle r="9" fill="#E4C090" />
            <text y="-14" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">
              ORCHESTRATOR
            </text>

            {/* Outer Tool Nodes */}
            <g transform="translate(0, -65)">
              <circle r="6" fill="#8B5CF6" />
              <text y="-9" textAnchor="middle" fill="#E4C090" fontSize="7.5" fontFamily="monospace">
                Vector Retrieval
              </text>
            </g>
            <g transform="translate(56, 32)">
              <circle r="6" fill="#10B981" />
              <text y="16" textAnchor="middle" fill="#A8A29E" fontSize="7.5" fontFamily="monospace">
                API Tools
              </text>
            </g>
            <g transform="translate(-56, 32)">
              <circle r="6" fill="#3B82F6" />
              <text y="16" textAnchor="middle" fill="#A8A29E" fontSize="7.5" fontFamily="monospace">
                Graph Memory
              </text>
            </g>
          </g>
        </svg>

        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#A8A29E] bg-[#1C1917]/80 backdrop-blur-xs px-2.5 py-1 rounded border border-white/[0.08]">
          <span>Routing: <span className="text-[#E4C090] font-semibold">Claude 3.5 · GPT-4o · DeepSeek</span></span>
          <span>Hallucination Rate: <span className="text-[#10B981] font-bold">0.0% Grounded</span></span>
        </div>
      </div>
    );
  }

  // 3. Performance & Audit: 3D Flamegraph Latency Reducer
  if (serviceId === "perf-refactor") {
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[220px] sm:h-[250px] rounded-xl overflow-hidden bg-[#1C1917] border border-white/[0.1] flex items-center justify-center select-none"
      >
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 font-mono text-[10px] text-[#A8A29E]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] animate-ping" />
          <span className="text-[#E4C090] font-semibold">3D LATENCY COMPRESSOR</span>
          <span className="text-white/40">·</span>
          <span>PERFORMANCE BENCHMARK</span>
        </div>

        <svg
          viewBox="0 0 340 180"
          className="w-full h-full max-h-[210px]"
          style={{
            transform: `perspective(600px) rotateX(${mousePos.y * -15}deg) rotateY(${mousePos.x * 15}deg)`,
            transition: "transform 0.12s ease-out"
          }}
        >
          {/* Comparison Waves */}
          {/* Before: Red jagged line */}
          <path
            d="M 30 75 Q 80 20 130 90 T 230 45 T 310 85"
            fill="none"
            stroke="#EF4444"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.6"
          />
          <text x="310" y="75" fill="#EF4444" fontSize="7" fontFamily="monospace">
            Before: 840ms
          </text>

          {/* After: Green razor-flat line */}
          <path
            d="M 30 120 Q 80 115 130 118 T 230 116 T 310 117"
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
          />
          <text x="310" y="115" fill="#10B981" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            After: 32ms
          </text>

          {/* Grid axes */}
          <line x1="30" y1="140" x2="310" y2="140" stroke="rgba(228,192,144,0.3)" strokeWidth="1" />
          <line x1="30" y1="35" x2="30" y2="140" stroke="rgba(228,192,144,0.3)" strokeWidth="1" />
        </svg>

        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#A8A29E] bg-[#1C1917]/80 backdrop-blur-xs px-2.5 py-1 rounded border border-white/[0.08]">
          <span>Query Acceleration: <span className="text-[#10B981] font-bold">26x Faster (p95)</span></span>
          <span>Lighthouse: <span className="text-[#E4C090] font-semibold">99+ Green Score</span></span>
        </div>
      </div>
    );
  }

  // 4. Fractional Lead: 3D Sprint Velocity Compass
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[220px] sm:h-[250px] rounded-xl overflow-hidden bg-[#1C1917] border border-white/[0.1] flex items-center justify-center select-none"
    >
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 font-mono text-[10px] text-[#A8A29E]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4] animate-ping" />
        <span className="text-[#E4C090] font-semibold">FRACTIONAL LEAD CADENCE</span>
        <span className="text-white/40">·</span>
        <span>SPRINT COMPASS</span>
      </div>

      <svg
        viewBox="0 0 340 180"
        className="w-full h-full max-h-[210px]"
        style={{
          transform: `perspective(600px) rotateX(${mousePos.y * -18}deg) rotateY(${mousePos.x * 18}deg)`,
          transition: "transform 0.12s ease-out"
        }}
      >
        <g transform="translate(170, 95)">
          <circle r="55" fill="none" stroke="rgba(228,192,144,0.15)" strokeWidth="1" strokeDasharray="3 3" />
          <circle r="38" fill="none" stroke="rgba(180,83,9,0.3)" strokeWidth="1" />
          <polygon
            points="0,-48 35,0 0,48 -35,0"
            fill="rgba(228,192,144,0.12)"
            stroke="#E4C090"
            strokeWidth="1.2"
          />
          <circle r="6" fill="#B45309" />
          <text y="-54" textAnchor="middle" fill="#E4C090" fontSize="7" fontFamily="monospace">
            Architecture Review
          </text>
          <text y="58" textAnchor="middle" fill="#E4C090" fontSize="7" fontFamily="monospace">
            PR &amp; Feature Ship
          </text>
          <text x="52" y="3" textAnchor="start" fill="#10B981" fontSize="7" fontFamily="monospace">
            Sync
          </text>
          <text x="-52" y="3" textAnchor="end" fill="#3B82F6" fontSize="7" fontFamily="monospace">
            Evals
          </text>
        </g>
      </svg>

      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#A8A29E] bg-[#1C1917]/80 backdrop-blur-xs px-2.5 py-1 rounded border border-white/[0.08]">
        <span>Model: <span className="text-[#E4C090] font-semibold">Direct 1-on-1 Embedded</span></span>
        <span>Commitment: <span className="text-[#10B981] font-bold">Month-to-Month Flexibility</span></span>
      </div>
    </div>
  );
}
