"use client";

import React from "react";

export default function Project3DVisualizer({ projectId }) {
  // 1. AI RAG / Vector Space Visualizer (Warm Editorial Style matching StackDiagram)
  if (projectId === "agentic-rag-engine") {
    const nodes = [
      { id: 0, x: 75, y: 55, label: "BM25 Sparse", val: "0.94 score" },
      { id: 1, x: 190, y: 38, label: "Dense Vector", val: "1536 dim" },
      { id: 2, x: 265, y: 110, label: "Reranker", val: "bge-rerank" },
      { id: 3, x: 155, y: 140, label: "Graph Memory", val: "cross-session" },
      { id: 4, x: 65, y: 120, label: "Semantic Cache", val: "< 12ms hit" },
    ];

    return (
      <div className="relative w-full h-[220px] sm:h-[240px] rounded-xl overflow-hidden bg-[#FAF6EE] border border-[#E4D9BC] flex items-center justify-center select-none">
        {/* Subtle warm isometric grid */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#E4D9BC 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />

        {/* Top Telemetry Header */}
        <div className="absolute top-3 left-4 z-10 flex items-center gap-2 font-mono text-[10px] text-[#78716C]">
          <span className="h-2 w-2 rounded-full bg-[#B45309] animate-pulse" />
          <span className="text-[#B45309] font-bold">VECTOR SPACE // L02_PIPELINE</span>
          <span className="text-[#A8A29E]">·</span>
          <span>HYBRID RETRIEVAL MESH</span>
        </div>

        <svg
          viewBox="0 0 340 180"
          className="w-full h-full max-h-[200px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="warmVectorBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B45309" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E4C090" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Central Query Vector Node */}
          <g transform="translate(170, 90)">
            <ellipse rx="100" ry="42" fill="none" stroke="#E4D9BC" strokeWidth="1" strokeDasharray="3 3" />
            <ellipse rx="68" ry="28" fill="none" stroke="#E4C090" strokeWidth="1" />
            <circle r="7" fill="#B45309" opacity="0.2" className="animate-ping" />
            <circle r="4.5" fill="#B45309" />
            <text y="-10" textAnchor="middle" fill="#B45309" fontSize="8" fontFamily="monospace" fontWeight="bold">
              q_vector(query)
            </text>
          </g>

          {/* Connecting vector rays */}
          {nodes.map((node) => (
            <line
              key={`line-${node.id}`}
              x1="170"
              y1="90"
              x2={node.x}
              y2={node.y}
              stroke="url(#warmVectorBeam)"
              strokeWidth="1.2"
              strokeDasharray="2 3"
            />
          ))}

          {/* Satellite nodes */}
          {nodes.map((node) => (
            <g key={`node-${node.id}`} transform={`translate(${node.x}, ${node.y})`}>
              <circle r="8" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1" />
              <circle r="3.5" fill="#B45309" />
              <text
                x="0"
                y={node.y < 90 ? "-10" : "15"}
                textAnchor="middle"
                fill="#4A3B33"
                fontSize="7.5"
                fontFamily="monospace"
                fontWeight="600"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Bottom Telemetry HUD */}
        <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#78716C] bg-white/80 backdrop-blur-xs px-3 py-1 rounded border border-[#E4D9BC]">
          <span>Retriever: <span className="text-[#B45309] font-bold">Hybrid pgvector + BM25</span></span>
          <span>p95 Latency: <span className="text-emerald-700 font-bold">&lt; 38ms</span></span>
        </div>
      </div>
    );
  }

  // 2. Realtime SaaS / Analytics 3D Isometric Bar Mesh
  if (projectId === "realtime-saas-platform") {
    const bars = [
      { id: 1, x: 40, y: 92, h: 38, label: "Wk 1" },
      { id: 2, x: 86, y: 78, h: 52, label: "Wk 2" },
      { id: 3, x: 132, y: 64, h: 68, label: "Wk 3" },
      { id: 4, x: 178, y: 50, h: 84, label: "Wk 4" },
      { id: 5, x: 224, y: 38, h: 98, label: "Wk 5" },
      { id: 6, x: 270, y: 26, h: 114, label: "Prod" },
    ];

    return (
      <div className="relative w-full h-[220px] sm:h-[240px] rounded-xl overflow-hidden bg-[#FAF6EE] border border-[#E4D9BC] flex items-center justify-center select-none">
        <div className="absolute top-3 left-4 z-10 flex items-center gap-2 font-mono text-[10px] text-[#78716C]">
          <span className="h-2 w-2 rounded-full bg-[#B45309] animate-pulse" />
          <span className="text-[#B45309] font-bold">ISOMETRIC PIPELINE // L03_REALTIME</span>
          <span className="text-[#A8A29E]">·</span>
          <span>THROUGHPUT ENGINE</span>
        </div>

        <svg
          viewBox="0 0 340 180"
          className="w-full h-full max-h-[200px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Base Grid Plane */}
          <g opacity="0.6">
            <line x1="20" y1="135" x2="310" y2="65" stroke="#E4D9BC" strokeWidth="0.8" />
            <line x1="20" y1="155" x2="310" y2="85" stroke="#E4D9BC" strokeWidth="0.8" />
            <line x1="40" y1="165" x2="180" y2="35" stroke="#E4D9BC" strokeWidth="0.8" />
            <line x1="120" y1="165" x2="260" y2="35" stroke="#E4D9BC" strokeWidth="0.8" />
          </g>

          {/* 3D Isometric Warm Bars matching StackDiagram palette */}
          {bars.map((bar, i) => {
            const bx = 26 + i * 44;
            const by = 130 - i * 11;
            const bh = bar.h;
            return (
              <g key={bar.id}>
                {/* Left face */}
                <path
                  d={`M ${bx} ${by} L ${bx} ${by - bh} L ${bx + 18} ${by - bh - 9} L ${bx + 18} ${by - 9} Z`}
                  fill="#D4B895"
                  stroke="#C4A885"
                  strokeWidth="0.5"
                />
                {/* Right face */}
                <path
                  d={`M ${bx + 18} ${by - 9} L ${bx + 18} ${by - bh - 9} L ${bx + 36} ${by - bh} L ${bx + 36} ${by} Z`}
                  fill="#E4C090"
                  stroke="#D4B080"
                  strokeWidth="0.5"
                />
                {/* Top face */}
                <path
                  d={`M ${bx} ${by - bh} L ${bx + 18} ${by - bh + 9} L ${bx + 36} ${by - bh} L ${bx + 18} ${by - bh - 9} Z`}
                  fill="#FFFFFF"
                  stroke="#B45309"
                  strokeWidth="0.8"
                />
                {/* Label */}
                <text
                  x={bx + 18}
                  y={by + 16}
                  fill="#78716C"
                  fontSize="7.5"
                  fontFamily="monospace"
                  textAnchor="middle"
                  fontWeight="600"
                >
                  {bar.label}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#78716C] bg-white/80 backdrop-blur-xs px-3 py-1 rounded border border-[#E4D9BC]">
          <span>Throughput: <span className="text-emerald-700 font-bold">2.4k DAU</span></span>
          <span>WebSocket Sync: <span className="text-[#B45309] font-bold">&lt; 45ms Edge</span></span>
        </div>
      </div>
    );
  }

  // 3. Creative 3D Isometric Prismatic Polyhedron
  if (projectId === "interactive-3d-visualizer") {
    return (
      <div className="relative w-full h-[220px] sm:h-[240px] rounded-xl overflow-hidden bg-[#FAF6EE] border border-[#E4D9BC] flex items-center justify-center select-none">
        <div className="absolute top-3 left-4 z-10 flex items-center gap-2 font-mono text-[10px] text-[#78716C]">
          <span className="h-2 w-2 rounded-full bg-[#B45309] animate-pulse" />
          <span className="text-[#B45309] font-bold">MATHEMATICAL 3D // SVG_PRISM</span>
          <span className="text-[#A8A29E]">·</span>
          <span>HARDWARE ACCELERATED</span>
        </div>

        <svg
          viewBox="0 0 340 180"
          className="w-full h-full max-h-[200px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <g transform="translate(170, 90)">
            {/* Top Isometric Diamond */}
            <polygon
              points="0,-48 62,-16 0,16 -62,-16"
              fill="#FFFFFF"
              stroke="#B45309"
              strokeWidth="1.4"
            />
            {/* Front Left Face */}
            <polygon
              points="-62,-16 0,16 0,66 -62,34"
              fill="#F5EBDC"
              stroke="#E4D9BC"
              strokeWidth="1.2"
            />
            {/* Front Right Face */}
            <polygon
              points="0,16 62,-16 62,34 0,66"
              fill="#EFE2CD"
              stroke="#E4D9BC"
              strokeWidth="1.2"
            />

            {/* Inner Gyroscopic Circles */}
            <ellipse rx="42" ry="42" fill="none" stroke="#E4C090" strokeWidth="1" strokeDasharray="3 3" />
            <ellipse rx="58" ry="24" fill="none" stroke="#B45309" strokeWidth="1" opacity="0.6" />

            {/* Vertices */}
            {[[0,-48], [62,-16], [0,16], [-62,-16], [0,66], [62,34], [-62,34]].map(([vx, vy], idx) => (
              <circle key={idx} cx={vx} cy={vy} r="3" fill="#B45309" />
            ))}
          </g>
        </svg>

        <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#78716C] bg-white/80 backdrop-blur-xs px-3 py-1 rounded border border-[#E4D9BC]">
          <span>Rendering: <span className="text-[#B45309] font-bold">Pure SVG 3D Matrix</span></span>
          <span>Bundle Overhead: <span className="text-emerald-700 font-bold">0 KB Extra JS</span></span>
        </div>
      </div>
    );
  }

  // 4. Backend Gateway / Edge Topology (Default)
  const edgeNodes = [
    { name: "SFO", x: 55, y: 65, ping: "18ms" },
    { name: "LON", x: 130, y: 50, ping: "22ms" },
    { name: "FRA", x: 180, y: 75, ping: "26ms" },
    { name: "BLR", x: 235, y: 110, ping: "12ms" },
    { name: "SIN", x: 285, y: 85, ping: "19ms" },
  ];

  return (
    <div className="relative w-full h-[220px] sm:h-[240px] rounded-xl overflow-hidden bg-[#FAF6EE] border border-[#E4D9BC] flex items-center justify-center select-none">
      <div className="absolute top-3 left-4 z-10 flex items-center gap-2 font-mono text-[10px] text-[#78716C]">
        <span className="h-2 w-2 rounded-full bg-[#B45309] animate-pulse" />
        <span className="text-[#B45309] font-bold">GLOBAL EDGE CLUSTER // TOPOLOGY</span>
        <span className="text-[#A8A29E]">·</span>
        <span>DISTRIBUTED PROXY</span>
      </div>

      <svg
        viewBox="0 0 340 180"
        className="w-full h-full max-h-[200px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M 20 105 Q 170 30 320 105 M 20 135 Q 170 60 320 135"
          fill="none"
          stroke="#E4D9BC"
          strokeWidth="1"
        />

        {edgeNodes.map((n, i) => {
          if (i === edgeNodes.length - 1) return null;
          const next = edgeNodes[i + 1];
          return (
            <line
              key={`conn-${i}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              stroke="#B45309"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.5"
            />
          );
        })}

        {edgeNodes.map((node) => (
          <g key={node.name} transform={`translate(${node.x}, ${node.y})`}>
            <circle r="7" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1" />
            <circle r="3.5" fill="#B45309" />
            <text y="-9" textAnchor="middle" fill="#4A3B33" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
              {node.name}
            </text>
            <text y="14" textAnchor="middle" fill="#B45309" fontSize="6.5" fontFamily="monospace">
              {node.ping}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#78716C] bg-white/80 backdrop-blur-xs px-3 py-1 rounded border border-[#E4D9BC]">
        <span>Cluster: <span className="text-[#B45309] font-bold">Distributed Rate Limiter</span></span>
        <span>Availability: <span className="text-emerald-700 font-bold">12k req/sec · 99.99%</span></span>
      </div>
    </div>
  );
}
