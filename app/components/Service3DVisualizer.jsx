"use client";

import React from "react";

export default function Service3DVisualizer({ serviceId }) {
  // 1. Rapid MVP: 4-Tier 3D Isometric Sprint Architecture (Matching StackDiagram Palette)
  if (serviceId === "mvp-build") {
    const tiers = [
      { id: 4, name: "L04 Frontend", desc: "Next.js 15 + Responsive UI", y: 35, fill: "#FFFFFF", stroke: "#B45309" },
      { id: 3, name: "L03 API Engine", desc: "FastAPI / Node.js & Auth", y: 65, fill: "#F5EBDC", stroke: "#E4C090" },
      { id: 2, name: "L02 Database", desc: "Postgres + Supabase + Stripe", y: 95, fill: "#EFE2CD", stroke: "#D4B895" },
      { id: 1, name: "L01 Edge Cloud", desc: "Docker + Vercel / AWS", y: 125, fill: "#E8D8BF", stroke: "#C4A885" },
    ];

    return (
      <div className="relative w-full h-[220px] sm:h-[240px] rounded-xl overflow-hidden bg-[#FAF6EE] border border-[#E4D9BC] flex items-center justify-center select-none">
        <div className="absolute top-3 left-4 z-10 flex items-center gap-2 font-mono text-[10px] text-[#78716C]">
          <span className="h-2 w-2 rounded-full bg-[#B45309] animate-pulse" />
          <span className="text-[#B45309] font-bold">SPRINT ARCHITECTURE // 4_TIER_STACK</span>
          <span className="text-[#A8A29E]">·</span>
          <span>RAPID MVP BLUEPRINT</span>
        </div>

        <svg
          viewBox="0 0 340 180"
          className="w-full h-full max-h-[200px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Isometric Floating Tier Slabs matching StackDiagram */}
          {tiers.map((tier) => {
            const ty = tier.y;
            return (
              <g key={tier.id}>
                {/* Isometric Slab Base */}
                <polygon
                  points={`170,${ty - 15} 275,${ty} 170,${ty + 15} 65,${ty}`}
                  fill={tier.fill}
                  stroke={tier.stroke}
                  strokeWidth="1.2"
                />
                {/* Slab Thickness */}
                <polygon
                  points={`65,${ty} 170,${ty + 15} 170,${ty + 20} 65,${ty + 5}`}
                  fill="#D4B895"
                  opacity="0.8"
                />
                <polygon
                  points={`170,${ty + 15} 275,${ty} 275,${ty + 5} 170,${ty + 20}`}
                  fill="#C4A885"
                  opacity="0.9"
                />

                {/* Tier Label */}
                <text
                  x="170"
                  y={ty + 4}
                  textAnchor="middle"
                  fill="#4A3B33"
                  fontSize="8.5"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {tier.name}
                </text>
              </g>
            );
          })}

          {/* Central Alignment Axis */}
          <line x1="170" y1="18" x2="170" y2="152" stroke="#E4D9BC" strokeWidth="1" strokeDasharray="3 3" />
        </svg>

        <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#78716C] bg-white/80 backdrop-blur-xs px-3 py-1 rounded border border-[#E4D9BC]">
          <span>Delivery Timeline: <span className="text-emerald-700 font-bold">14 – 28 Days</span></span>
          <span>IP Handover: <span className="text-[#B45309] font-bold">100% Full Ownership</span></span>
        </div>
      </div>
    );
  }

  // 2. AI Agents & RAG: 3D Autonomous Dispatch Topology
  if (serviceId === "ai-agents-rag") {
    return (
      <div className="relative w-full h-[220px] sm:h-[240px] rounded-xl overflow-hidden bg-[#FAF6EE] border border-[#E4D9BC] flex items-center justify-center select-none">
        <div className="absolute top-3 left-4 z-10 flex items-center gap-2 font-mono text-[10px] text-[#78716C]">
          <span className="h-2 w-2 rounded-full bg-[#B45309] animate-pulse" />
          <span className="text-[#B45309] font-bold">AGENT DISPATCH // TOPOLOGY</span>
          <span className="text-[#A8A29E]">·</span>
          <span>AUTONOMOUS WORKFLOW</span>
        </div>

        <svg
          viewBox="0 0 340 180"
          className="w-full h-full max-h-[200px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <g transform="translate(170, 90)">
            {/* Hexagon Orbit */}
            <polygon
              points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30"
              fill="none"
              stroke="#E4D9BC"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* Connecting Dispatch Beams */}
            <line x1="0" y1="0" x2="0" y2="-60" stroke="#B45309" strokeWidth="1.4" />
            <line x1="0" y1="0" x2="52" y2="30" stroke="#E4C090" strokeWidth="1.4" />
            <line x1="0" y1="0" x2="-52" y2="30" stroke="#E4C090" strokeWidth="1.4" />

            {/* Central Orchestrator Core */}
            <circle r="12" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.5" />
            <circle r="4.5" fill="#B45309" />
            <text y="-14" textAnchor="middle" fill="#4A3B33" fontSize="8" fontFamily="monospace" fontWeight="bold">
              ORCHESTRATOR
            </text>

            {/* Outer Nodes */}
            <g transform="translate(0, -60)">
              <circle r="7" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.2" />
              <circle r="3" fill="#B45309" />
              <text y="-10" textAnchor="middle" fill="#B45309" fontSize="7.5" fontFamily="monospace" fontWeight="600">
                Vector RAG
              </text>
            </g>
            <g transform="translate(52, 30)">
              <circle r="7" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1.2" />
              <circle r="3" fill="#78716C" />
              <text y="16" textAnchor="middle" fill="#78716C" fontSize="7.5" fontFamily="monospace">
                API Tools
              </text>
            </g>
            <g transform="translate(-52, 30)">
              <circle r="7" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1.2" />
              <circle r="3" fill="#78716C" />
              <text y="16" textAnchor="middle" fill="#78716C" fontSize="7.5" fontFamily="monospace">
                Memory
              </text>
            </g>
          </g>
        </svg>

        <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#78716C] bg-white/80 backdrop-blur-xs px-3 py-1 rounded border border-[#E4D9BC]">
          <span>Routing: <span className="text-[#B45309] font-bold">Claude 3.5 · GPT-4o · DeepSeek</span></span>
          <span>Hallucinations: <span className="text-emerald-700 font-bold">0.0% Grounded</span></span>
        </div>
      </div>
    );
  }

  // 3. Performance & Audit: Latency Compressor
  if (serviceId === "perf-refactor") {
    return (
      <div className="relative w-full h-[220px] sm:h-[240px] rounded-xl overflow-hidden bg-[#FAF6EE] border border-[#E4D9BC] flex items-center justify-center select-none">
        <div className="absolute top-3 left-4 z-10 flex items-center gap-2 font-mono text-[10px] text-[#78716C]">
          <span className="h-2 w-2 rounded-full bg-[#B45309] animate-pulse" />
          <span className="text-[#B45309] font-bold">PERFORMANCE AUDIT // LATENCY</span>
          <span className="text-[#A8A29E]">·</span>
          <span>QUERY TUNING</span>
        </div>

        <svg
          viewBox="0 0 340 180"
          className="w-full h-full max-h-[200px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Before: Red jagged curve */}
          <path
            d="M 30 75 Q 80 20 130 90 T 230 45 T 310 85"
            fill="none"
            stroke="#DC2626"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.6"
          />
          <text x="310" y="75" fill="#DC2626" fontSize="7" fontFamily="monospace">
            Before: 840ms
          </text>

          {/* After: Green razor-sharp line */}
          <path
            d="M 30 120 Q 80 115 130 118 T 230 116 T 310 117"
            fill="none"
            stroke="#059669"
            strokeWidth="2.5"
          />
          <text x="310" y="115" fill="#059669" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            After: 32ms
          </text>

          {/* Grid axes */}
          <line x1="30" y1="135" x2="310" y2="135" stroke="#E4D9BC" strokeWidth="1" />
          <line x1="30" y1="35" x2="30" y2="135" stroke="#E4D9BC" strokeWidth="1" />
        </svg>

        <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#78716C] bg-white/80 backdrop-blur-xs px-3 py-1 rounded border border-[#E4D9BC]">
          <span>Speedup: <span className="text-emerald-700 font-bold">26x Faster (p95)</span></span>
          <span>Lighthouse: <span className="text-[#B45309] font-bold">99+ Green Score</span></span>
        </div>
      </div>
    );
  }

  // 4. Fractional Lead: Sprint Velocity Compass
  return (
    <div className="relative w-full h-[220px] sm:h-[240px] rounded-xl overflow-hidden bg-[#FAF6EE] border border-[#E4D9BC] flex items-center justify-center select-none">
      <div className="absolute top-3 left-4 z-10 flex items-center gap-2 font-mono text-[10px] text-[#78716C]">
        <span className="h-2 w-2 rounded-full bg-[#B45309] animate-pulse" />
        <span className="text-[#B45309] font-bold">FRACTIONAL LEAD // CADENCE</span>
        <span className="text-[#A8A29E]">·</span>
        <span>WEEKLY ROADMAP</span>
      </div>

      <svg
        viewBox="0 0 340 180"
        className="w-full h-full max-h-[200px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(170, 90)">
          <circle r="52" fill="none" stroke="#E4D9BC" strokeWidth="1" strokeDasharray="3 3" />
          <circle r="36" fill="none" stroke="#E4C090" strokeWidth="1" />
          <polygon
            points="0,-46 32,0 0,46 -32,0"
            fill="#FFFFFF"
            stroke="#B45309"
            strokeWidth="1.2"
          />
          <circle r="5" fill="#B45309" />
          <text y="-52" textAnchor="middle" fill="#4A3B33" fontSize="7" fontFamily="monospace" fontWeight="600">
            Architecture Review
          </text>
          <text y="56" textAnchor="middle" fill="#4A3B33" fontSize="7" fontFamily="monospace" fontWeight="600">
            PR &amp; Feature Ship
          </text>
          <text x="48" y="3" textAnchor="start" fill="#B45309" fontSize="7" fontFamily="monospace">
            Sync
          </text>
          <text x="-48" y="3" textAnchor="end" fill="#78716C" fontSize="7" fontFamily="monospace">
            Evals
          </text>
        </g>
      </svg>

      <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#78716C] bg-white/80 backdrop-blur-xs px-3 py-1 rounded border border-[#E4D9BC]">
        <span>Model: <span className="text-[#B45309] font-bold">Direct 1-on-1 Embedded</span></span>
        <span>Commitment: <span className="text-emerald-700 font-bold">Flexible Month-to-Month</span></span>
      </div>
    </div>
  );
}
