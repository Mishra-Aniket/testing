"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Project3DVisualizer({ projectId }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeVector, setActiveVector] = useState(1);
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

  // 1. AI RAG / Vector Space Visualizer
  if (projectId === "agentic-rag-engine") {
    const nodes = [
      { id: 0, x: 80, y: 55, z: 20, label: "BM25 Sparse", val: "0.94 score" },
      { id: 1, x: 190, y: 40, z: -10, label: "Dense Vector", val: "1536 dim" },
      { id: 2, x: 260, y: 110, z: 30, label: "Reranker", val: "bge-reranker" },
      { id: 3, x: 150, y: 140, z: 50, label: "Graph Memory", val: "cross-session" },
      { id: 4, x: 70, y: 120, z: -20, label: "Semantic Cache", val: "< 12ms hit" },
    ];

    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[240px] sm:h-[270px] rounded-xl overflow-hidden bg-[#1C1917] border border-white/[0.1] flex items-center justify-center select-none"
      >
        {/* Subtle background coordinate grid */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#E4C090 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }}
        />

        {/* Status watermark */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 font-mono text-[10px] text-[#A8A29E]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-ping" />
          <span className="text-[#E4C090] font-semibold">3D VECTOR SPACE</span>
          <span className="text-white/40">·</span>
          <span>HYBRID RETRIEVAL SIMULATOR</span>
        </div>

        <svg
          viewBox="0 0 340 190"
          className="w-full h-full max-h-[220px]"
          style={{
            transform: `perspective(600px) rotateX(${mousePos.y * -14}deg) rotateY(${mousePos.x * 18}deg)`,
            transition: "transform 0.15s ease-out"
          }}
        >
          <defs>
            <linearGradient id="vectorBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B45309" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E4C090" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E4C090" stopOpacity="1" />
              <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Central Query Vector Centerpiece */}
          <g transform="translate(170, 95)">
            {/* Outer orbital rings */}
            <ellipse rx="110" ry="45" fill="none" stroke="rgba(228,192,144,0.15)" strokeWidth="1" strokeDasharray="3 3" />
            <ellipse rx="75" ry="32" fill="none" stroke="rgba(228,192,144,0.25)" strokeWidth="1" />
            
            {/* Center query pulse */}
            <circle r="8" fill="#B45309" opacity="0.4" className="animate-ping" />
            <circle r="5" fill="#E4C090" />
            <text y="-12" textAnchor="middle" fill="#E4C090" fontSize="8" fontFamily="monospace" fontWeight="bold">
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
              stroke="url(#vectorBeam)"
              strokeWidth={activeVector === node.id ? "2" : "1"}
              strokeDasharray={activeVector === node.id ? "none" : "2 2"}
              opacity={activeVector === node.id ? "1" : "0.5"}
            />
          ))}

          {/* Satellite nodes */}
          {nodes.map((node) => {
            const isHovered = activeVector === node.id;
            return (
              <g
                key={`node-${node.id}`}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer"
                onMouseEnter={() => setActiveVector(node.id)}
              >
                <circle r={isHovered ? "14" : "9"} fill="url(#nodeGlow)" opacity={isHovered ? "0.6" : "0.2"} />
                <circle r={isHovered ? "6" : "4"} fill={isHovered ? "#E4C090" : "#B45309"} />
                <text
                  x="0"
                  y={node.y < 95 ? "-10" : "16"}
                  textAnchor="middle"
                  fill={isHovered ? "#FFFFFF" : "#A8A29E"}
                  fontSize="7.5"
                  fontFamily="monospace"
                  fontWeight={isHovered ? "bold" : "normal"}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Bottom Telemetry HUD */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#A8A29E] bg-[#1C1917]/80 backdrop-blur-xs px-2.5 py-1 rounded border border-white/[0.08]">
          <span>Active Node: <span className="text-[#E4C090] font-semibold">{nodes[activeVector].label}</span></span>
          <span>Cosine Sim: <span className="text-[#10B981] font-bold">0.962 (p95 &lt; 28ms)</span></span>
        </div>
      </div>
    );
  }

  // 2. Realtime SaaS / Analytics 3D Bar Mesh
  if (projectId === "realtime-saas-platform") {
    const bars = [
      { id: 1, x: 45, y: 90, h: 42, label: "Wk 1" },
      { id: 2, x: 90, y: 75, h: 58, label: "Wk 2" },
      { id: 3, x: 135, y: 60, h: 72, label: "Wk 3" },
      { id: 4, x: 180, y: 45, h: 90, label: "Wk 4" },
      { id: 5, x: 225, y: 35, h: 105, label: "Wk 5" },
      { id: 6, x: 270, y: 22, h: 120, label: "Prod" },
    ];

    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[240px] sm:h-[270px] rounded-xl overflow-hidden bg-[#1C1917] border border-white/[0.1] flex items-center justify-center select-none"
      >
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 font-mono text-[10px] text-[#A8A29E]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6] animate-ping" />
          <span className="text-[#E4C090] font-semibold">ISOMETRIC SAAS ENGINE</span>
          <span className="text-white/40">·</span>
          <span>HIGH-THROUGHPUT PIPELINE</span>
        </div>

        <svg
          viewBox="0 0 340 190"
          className="w-full h-full max-h-[220px]"
          style={{
            transform: `perspective(600px) rotateX(${22 + mousePos.y * -12}deg) rotateY(${-18 + mousePos.x * 15}deg)`,
            transition: "transform 0.15s ease-out"
          }}
        >
          {/* Base Grid Plane */}
          <g opacity="0.35">
            <line x1="20" y1="140" x2="310" y2="70" stroke="#E4D9BC" strokeWidth="0.8" />
            <line x1="20" y1="160" x2="310" y2="90" stroke="#E4D9BC" strokeWidth="0.8" />
            <line x1="40" y1="170" x2="180" y2="40" stroke="#E4D9BC" strokeWidth="0.8" />
            <line x1="120" y1="170" x2="260" y2="40" stroke="#E4D9BC" strokeWidth="0.8" />
          </g>

          {/* 3D Isometric Bars */}
          {bars.map((bar, i) => {
            const bx = 30 + i * 44;
            const by = 130 - i * 12;
            const bh = bar.h;
            return (
              <g key={bar.id} className="cursor-pointer group">
                {/* Left face */}
                <path
                  d={`M ${bx} ${by} L ${bx} ${by - bh} L ${bx + 18} ${by - bh - 9} L ${bx + 18} ${by - 9} Z`}
                  fill="#92400E"
                  opacity="0.85"
                />
                {/* Right face */}
                <path
                  d={`M ${bx + 18} ${by - 9} L ${bx + 18} ${by - bh - 9} L ${bx + 36} ${by - bh} L ${bx + 36} ${by} Z`}
                  fill="#B45309"
                  opacity="0.95"
                />
                {/* Top face */}
                <path
                  d={`M ${bx} ${by - bh} L ${bx + 18} ${by - bh + 9} L ${bx + 36} ${by - bh} L ${bx + 18} ${by - bh - 9} Z`}
                  fill="#E4C090"
                />
                {/* Label */}
                <text
                  x={bx + 18}
                  y={by + 16}
                  fill="#A8A29E"
                  fontSize="7"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {bar.label}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#A8A29E] bg-[#1C1917]/80 backdrop-blur-xs px-2.5 py-1 rounded border border-white/[0.08]">
          <span>Throughput: <span className="text-[#10B981] font-bold">2.4k DAU</span></span>
          <span>Edge Sync: <span className="text-[#E4C090] font-semibold">&lt; 45ms WebSocket</span></span>
        </div>
      </div>
    );
  }

  // 3. Creative 3D Isometric Prismatic Polyhedron
  if (projectId === "interactive-3d-visualizer") {
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[240px] sm:h-[270px] rounded-xl overflow-hidden bg-[#1C1917] border border-white/[0.1] flex items-center justify-center select-none"
      >
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 font-mono text-[10px] text-[#A8A29E]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#EC4899] animate-ping" />
          <span className="text-[#E4C090] font-semibold">ISOMETRIC 3D GEOMETRY</span>
          <span className="text-white/40">·</span>
          <span>MATHEMATICAL SVG ENGINE</span>
        </div>

        <svg
          viewBox="0 0 340 190"
          className="w-full h-full max-h-[220px]"
          style={{
            transform: `perspective(600px) rotateX(${mousePos.y * -25}deg) rotateY(${mousePos.x * 25}deg)`,
            transition: "transform 0.1s ease-out"
          }}
        >
          {/* Wireframe Rotating Cube / Prism */}
          <g transform="translate(170, 95)">
            {/* Top Isometric Diamond */}
            <polygon
              points="0,-48 62,-16 0,16 -62,-16"
              fill="rgba(228,192,144,0.12)"
              stroke="#E4C090"
              strokeWidth="1.5"
            />
            {/* Front Left Face */}
            <polygon
              points="-62,-16 0,16 0,68 -62,36"
              fill="rgba(180,83,9,0.22)"
              stroke="#B45309"
              strokeWidth="1.5"
            />
            {/* Front Right Face */}
            <polygon
              points="0,16 62,-16 62,36 0,68"
              fill="rgba(146,64,14,0.3)"
              stroke="#E4C090"
              strokeWidth="1.5"
            />

            {/* Inner Gyroscopic Rings */}
            <ellipse rx="42" ry="42" fill="none" stroke="rgba(228,192,144,0.3)" strokeWidth="1" strokeDasharray="4 4" />
            <ellipse rx="58" ry="24" fill="none" stroke="rgba(180,83,9,0.4)" strokeWidth="1" />

            {/* Vertices */}
            {[[0,-48], [62,-16], [0,16], [-62,-16], [0,68], [62,36], [-62,36]].map(([vx, vy], idx) => (
              <circle key={idx} cx={vx} cy={vy} r="3.5" fill="#E4C090" />
            ))}
          </g>
        </svg>

        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#A8A29E] bg-[#1C1917]/80 backdrop-blur-xs px-2.5 py-1 rounded border border-white/[0.08]">
          <span>Render Mode: <span className="text-[#E4C090] font-semibold">SVG 3D Matrices</span></span>
          <span>Bundle Overhead: <span className="text-[#10B981] font-bold">~0 KB Three.js</span></span>
        </div>
      </div>
    );
  }

  // 4. Backend Gateway / Edge Topology (Default)
  const edgeNodes = [
    { name: "SFO", x: 60, y: 65, ping: "18ms" },
    { name: "LON", x: 135, y: 50, ping: "22ms" },
    { name: "FRA", x: 185, y: 75, ping: "26ms" },
    { name: "BLR", x: 235, y: 110, ping: "12ms" },
    { name: "SIN", x: 285, y: 85, ping: "19ms" },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[240px] sm:h-[270px] rounded-xl overflow-hidden bg-[#1C1917] border border-white/[0.1] flex items-center justify-center select-none"
    >
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 font-mono text-[10px] text-[#A8A29E]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-ping" />
        <span className="text-[#E4C090] font-semibold">GLOBAL EDGE TOPOLOGY</span>
        <span className="text-white/40">·</span>
        <span>DISTRIBUTED GATEWAY</span>
      </div>

      <svg
        viewBox="0 0 340 190"
        className="w-full h-full max-h-[220px]"
        style={{
          transform: `perspective(600px) rotateX(${mousePos.y * -15}deg) rotateY(${mousePos.x * 15}deg)`,
          transition: "transform 0.15s ease-out"
        }}
      >
        {/* World Grid Mesh lines */}
        <path
          d="M 20 110 Q 170 30 320 110 M 20 140 Q 170 60 320 140"
          fill="none"
          stroke="rgba(228,192,144,0.12)"
          strokeWidth="1"
        />

        {/* Node connections */}
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
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity="0.6"
            />
          );
        })}

        {/* Global Edge Nodes */}
        {edgeNodes.map((node) => (
          <g key={node.name} transform={`translate(${node.x}, ${node.y})`}>
            <circle r="7" fill="none" stroke="#E4C090" strokeWidth="1" opacity="0.4" className="animate-ping" />
            <circle r="4" fill="#E4C090" />
            <text y="-8" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
              {node.name}
            </text>
            <text y="14" textAnchor="middle" fill="#10B981" fontSize="6.5" fontFamily="monospace">
              {node.ping}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#A8A29E] bg-[#1C1917]/80 backdrop-blur-xs px-2.5 py-1 rounded border border-white/[0.08]">
        <span>Cluster: <span className="text-[#E4C090] font-semibold">Distributed Rate Limiter</span></span>
        <span>Availability: <span className="text-[#10B981] font-bold">12k req/sec · 99.99%</span></span>
      </div>
    </div>
  );
}
