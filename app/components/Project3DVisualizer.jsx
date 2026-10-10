"use client";

import React from "react";

export default function Project3DVisualizer({ projectId }) {
  // 1. AI RAG / Vector Space Visualizer (Frameless Floating 3D Vector Mesh)
  if (projectId === "agentic-rag-engine") {
    const nodes = [
      { id: 0, x: 75, y: 55, label: "BM25 Sparse" },
      { id: 1, x: 190, y: 38, label: "Dense Vector" },
      { id: 2, x: 265, y: 110, label: "Reranker" },
      { id: 3, x: 155, y: 140, label: "Graph Memory" },
      { id: 4, x: 65, y: 120, label: "Semantic Cache" },
    ];

    return (
      <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-center select-none overflow-visible">
        <svg
          viewBox="0 0 340 180"
          className="w-full h-full max-h-[220px] overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="framelessVectorBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B45309" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#E4C090" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Telemetry Header Text in SVG */}
          <circle cx="16" cy="18" r="2.5" fill="#B45309" />
          <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
            VECTOR SPACE // L02_HYBRID_RAG
          </text>
          <text x="325" y="21" textAnchor="end" fill="#78716C" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.8">
            p95 &lt; 38ms
          </text>

          {/* Central Query Vector Node */}
          <g transform="translate(170, 95)">
            <ellipse rx="100" ry="42" fill="none" stroke="#E4D9BC" strokeWidth="1" strokeDasharray="3 3" />
            <ellipse rx="68" ry="28" fill="none" stroke="#E4C090" strokeWidth="1" />
            <circle r="7" fill="#B45309" opacity="0.18" className="animate-ping" />
            <circle r="4.5" fill="#B45309" />
            <text y="-10" textAnchor="middle" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              q_vector(query)
            </text>
          </g>

          {/* Connecting vector rays */}
          {nodes.map((node) => (
            <line
              key={`line-${node.id}`}
              x1="170"
              y1="95"
              x2={node.x}
              y2={node.y}
              stroke="url(#framelessVectorBeam)"
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
                y={node.y < 95 ? "-10" : "15"}
                textAnchor="middle"
                fill="#4A3B33"
                fontSize="7.5"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
              >
                {node.label}
              </text>
            </g>
          ))}

          {/* Bottom Telemetry Baseline */}
          <line x1="16" y1="168" x2="324" y2="168" stroke="#E4D9BC" strokeWidth="0.8" strokeDasharray="2 4" />
          <text x="16" y="162" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono, monospace">
            RETRIEVER: pgvector + BM25
          </text>
          <text x="324" y="162" textAnchor="end" fill="#059669" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            COSINE SIM: 0.962
          </text>
        </svg>
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
      <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-center select-none overflow-visible">
        <svg
          viewBox="0 0 340 180"
          className="w-full h-full max-h-[220px] overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Telemetry Header */}
          <circle cx="16" cy="18" r="2.5" fill="#B45309" />
          <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
            ISOMETRIC PIPELINE // L03_THROUGHPUT
          </text>
          <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            2.4k DAU · &lt; 45ms
          </text>

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
                  fontFamily="JetBrains Mono, monospace"
                  textAnchor="middle"
                  fontWeight="600"
                >
                  {bar.label}
                </text>
              </g>
            );
          })}

          <line x1="16" y1="168" x2="324" y2="168" stroke="#E4D9BC" strokeWidth="0.8" strokeDasharray="2 4" />
          <text x="16" y="162" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono, monospace">
            ENGINE: NEXT.JS 15 + WEBSOCKETS
          </text>
          <text x="324" y="162" textAnchor="end" fill="#B45309" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            60 FPS CANVAS SYNC
          </text>
        </svg>
      </div>
    );
  }

  // 3. Creative 3D Isometric Prismatic Polyhedron
  if (projectId === "interactive-3d-visualizer") {
    return (
      <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-center select-none overflow-visible">
        <svg
          viewBox="0 0 340 180"
          className="w-full h-full max-h-[220px] overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Telemetry Header */}
          <circle cx="16" cy="18" r="2.5" fill="#B45309" />
          <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
            MATHEMATICAL 3D // SVG_PRISM
          </text>
          <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            60 FPS · 0 KB THREE.JS
          </text>

          <g transform="translate(170, 95)">
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

          <line x1="16" y1="168" x2="324" y2="168" stroke="#E4D9BC" strokeWidth="0.8" strokeDasharray="2 4" />
          <text x="16" y="162" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono, monospace">
            ENGINE: HARDWARE SVG MATRICES
          </text>
          <text x="324" y="162" textAnchor="end" fill="#B45309" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            ZERO THREE.JS OVERHEAD
          </text>
        </svg>
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
    <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-center select-none overflow-visible">
      <svg
        viewBox="0 0 340 180"
        className="w-full h-full max-h-[220px] overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Telemetry Header */}
        <circle cx="16" cy="18" r="2.5" fill="#B45309" />
        <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
          GLOBAL EDGE TOPOLOGY // PROXY
        </text>
        <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          12k req/sec · 99.99%
        </text>

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
            <text y="-9" textAnchor="middle" fill="#4A3B33" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              {node.name}
            </text>
            <text y="14" textAnchor="middle" fill="#B45309" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
              {node.ping}
            </text>
          </g>
        ))}

        <line x1="16" y1="168" x2="324" y2="168" stroke="#E4D9BC" strokeWidth="0.8" strokeDasharray="2 4" />
        <text x="16" y="162" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono, monospace">
          GATEWAY: DISTRIBUTED RATE LIMITER
        </text>
        <text x="324" y="162" textAnchor="end" fill="#B45309" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          CLOUDFLARE + REDIS
        </text>
      </svg>
    </div>
  );
}
