"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "../utils/sound";

const routerData = [
  {
    eyebrow: "01 · ARCHITECT",
    title: "Discovery & Architecture",
    body: "Translating business requirements into structured database schemas, modular system designs, and clear API contracts before building.",
    stats: [["ACTIVE SPEC", "SCHEMA"], ["TIMELINE", "Days 1–3"], ["DELIVERABLE", "System Spec"]],
    code: 'system.plan({ spec: "schema", db: "postgres" })',
    left: "19%"
  },
  {
    eyebrow: "02 · ENGINEER",
    title: "Full-Stack Development",
    body: "Writing clean, type-safe, maintainable code across frontend and backend. Developing fast APIs, resilient background workers, and fluid responsive interfaces.",
    stats: [["CODEBASE", "Clean & Typed"], ["LATENCY", "< 100ms"], ["STACK", "Full-Stack"]],
    code: 'pipeline.build({ frontend: "nextjs", backend: "fastapi" })',
    left: "50%"
  },
  {
    eyebrow: "03 · SHIP & SCALE",
    title: "Deployment & Production Scale",
    body: "Rigorous automated testing, CI/CD pipelines, containerized deployment, and live cloud hosting with zero downtime and high availability.",
    stats: [["DEPLOY", "Automated"], ["UPTIME", "99.9%"], ["RELEASE", "Zero Downtime"]],
    code: 'release.deploy({ env: "production", status: "live" })',
    left: "81%"
  }
];

export default function ModelSovereignty() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedModel, setSelectedModel] = useState("SCHEMA");
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapCount, setSwapCount] = useState(24);
  const [lastSwapTime, setLastSwapTime] = useState("0.28s");

  const handleSelectModel = (model) => {
    if (selectedModel === model) return;
    sound.playDock();
    setSelectedModel(model);
    setIsSwapping(true);
    setSwapCount((prev) => prev + 1);
    setLastSwapTime((0.2 + Math.random() * 0.15).toFixed(2) + "s");
    setTimeout(() => {
      setIsSwapping(false);
    }, 1200);
  };

  // Determine active model display
  let activeModelName = selectedModel;
  let activeProvider = 
    selectedModel === "FIGMA" ? "UI WIREFRAMES" : 
    selectedModel === "APIS" ? "API CONTRACTS" : 
    selectedModel === "STACK" ? "NEXT.JS & .NET" : "DB ARCHITECTURE";
  if (hoveredIndex === 2) {
    activeModelName = "DEPLOY";
    activeProvider = "PRODUCTION SCALE";
  } else if (hoveredIndex === 1) {
    activeModelName = "BUILD";
    activeProvider = "FULL-STACK CODE";
  }

  const dynamicRouterData = [
    {
      eyebrow: "01 · ARCHITECT",
      title: "Discovery & Architecture",
      body: "Translating business requirements into structured database schemas, modular system designs, and clear API contracts before building.",
      stats: [["ACTIVE SPEC", selectedModel], ["TIMELINE", "Days 1–3"], ["DELIVERABLE", "System Spec"]],
      code: `system.plan({ spec: "${selectedModel.toLowerCase()}", db: "postgres" })`,
      left: "16%",
      top: "48%"
    },
    {
      eyebrow: "02 · ENGINEER",
      title: "Full-Stack Development",
      body: "Writing clean, type-safe, maintainable code across frontend and backend. Developing fast APIs, resilient background workers, and fluid responsive interfaces.",
      stats: [["CODEBASE", "Clean & Typed"], ["LATENCY", "< 100ms"], ["STACK", "Full-Stack"]],
      code: 'pipeline.build({ frontend: "nextjs", backend: "fastapi" })',
      left: "50%",
      top: "48%"
    },
    {
      eyebrow: "03 · SHIP & SCALE",
      title: "Deployment & Production Scale",
      body: "Rigorous automated testing, CI/CD pipelines, containerized deployment, and live cloud hosting with zero downtime and high availability.",
      stats: [["DEPLOY", "Automated"], ["UPTIME", "99.9%"], ["RELEASE", "Zero Downtime"]],
      code: 'release.deploy({ env: "production", status: "live" })',
      left: "84%",
      top: "48%"
    }
  ];

  const activeData = hoveredIndex !== null ? dynamicRouterData[hoveredIndex] : null;

  return (
    <section className="relative w-full overflow-visible bg-[#FDFBF7] py-16 md:py-24 text-[#4A3B33]">
      {/* Grid background matching original site */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(228, 217, 188, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(228, 217, 188, 0.4) 1px, transparent 1px)",
          backgroundSize: "140px 140px",
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, #000 30%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, #000 30%, transparent 95%)"
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#78716C] font-semibold text-center">
            Engineering Protocol: From Initial Spec to Scalable Production Software
          </p>
        </div>

        <div 
          className="relative w-full overflow-x-auto lg:overflow-visible select-none pb-6 md:pb-10"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative w-full min-w-[860px] aspect-[20/9]">
            <svg 
              id="router-svg" 
              viewBox="0 0 1200 540" 
              className="w-full h-full block overflow-visible" 
              preserveAspectRatio="xMidYMid meet" 
              role="img" 
              aria-label="Any model plugs into one sovereign architecture layer, which feeds agents that run operations."
            >
              <defs>
                {/* 3D Glassmorphic Slabs Gradients */}
                <linearGradient id="svGlassTop" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#FDFBF7" stopOpacity="0.92" />
                  <stop offset="100%" stopColor="#F5EFE3" stopOpacity="0.9" />
                </linearGradient>

                <linearGradient id="svGlassTopActive" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#FEF3C7" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.9" />
                </linearGradient>

                <linearGradient id="svGlassBorder" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#E4D9BC" />
                  <stop offset="100%" stopColor="#CBBFA3" />
                </linearGradient>

                <linearGradient id="svGlassBorderActive" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#B45309" />
                  <stop offset="100%" stopColor="#78350F" />
                </linearGradient>

                <linearGradient id="svExtrusionSide" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E6DCBF" />
                  <stop offset="100%" stopColor="#CFBFA0" />
                </linearGradient>

                <linearGradient id="svExtrusionSideActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E4C090" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>

                <radialGradient id="svFloorGlow">
                  <stop offset="0%" stopColor="#B45309" stopOpacity="0.25" />
                  <stop offset="65%" stopColor="#B45309" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
                </radialGradient>

                <linearGradient id="svTop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#FBF6EE" />
                </linearGradient>
                <radialGradient id="svHalo">
                  <stop offset="0%" stopColor="#B45309" stopOpacity="0.22" />
                  <stop offset="60%" stopColor="#B45309" stopOpacity="0.07" />
                  <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="svHaloRed">
                  <stop offset="0%" stopColor="#991B1B" stopOpacity="0.2" />
                  <stop offset="60%" stopColor="#991B1B" stopOpacity="0.06" />
                  <stop offset="100%" stopColor="#991B1B" stopOpacity="0" />
                </radialGradient>
                <filter id="svGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="2.6" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="svBlur" x="-30%" y="-60%" width="160%" height="220%">
                  <feGaussianBlur stdDeviation="9" />
                </filter>
                <filter id="svShadow" x="-10%" y="-20%" width="120%" height="160%">
                  <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="hsl(28 18% 25%)" floodOpacity="0.14" />
                </filter>
              </defs>

              {/* Top Left Telemetry */}
              <g pointerEvents="none">
                <rect x="24" y="33" width="7" height="7" fill={isSwapping ? "#F59E0B" : "#B45309"} className={isSwapping ? "animate-ping" : ""} />
                <text x="37" y="40" fill="#78716C" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6" fontWeight="600">
                  ANIKET // ENGINEERING_PROTOCOL
                </text>
                <text x="24" y="57" fill="#A8A29E" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
                  specs 4 · phases 3 · speed 2-4w · 0s downtime
                </text>
                <circle cx="298" cy="54.5" r="2.4" fill={isSwapping ? "#10B981" : "#B45309"} opacity="0.93" />
                <text x="330" y="57" textAnchor="end" fill={isSwapping ? "#10B981" : "#A8A29E"} fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1" fontWeight={isSwapping ? "700" : "400"}>
                  {isSwapping ? "SWITCHING" : "LIVE"}
                </text>
                <rect x="24" y="67" width="73.5" height="3" rx="1.5" style={{ fill: isSwapping ? "#F59E0B" : "#B45309", transition: "fill 0.3s" }} />
                <rect x="101.5" y="67" width="73.5" height="3" rx="1.5" style={{ fill: isSwapping ? "#F59E0B" : "#E4D9BC", transition: "fill 0.3s" }} />
                <rect x="179" y="67" width="73.5" height="3" rx="1.5" style={{ fill: "#E4D9BC", transition: "fill 0.3s" }} />
                <rect x="256.5" y="67" width="73.5" height="3" rx="1.5" style={{ fill: "#E4D9BC", transition: "fill 0.3s" }} />
                <text x="24" y="88" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6" fontWeight="600" style={{ fill: isSwapping ? "#B45309" : "#B45309", transition: "fill 0.3s" }}>
                  {isSwapping ? `⚡ SPEC UPDATED: FOCUSING ON ${activeModelName.toUpperCase()}...` : `PHASE · ACTIVE ON ${activeModelName.toUpperCase()}`}
                </text>
              </g>

              {/* Top Right Active Focus */}
              <g 
                role="button"
                aria-label="Active focus switcher"
                data-custom-sound="true"
                style={{ outline: "none" }}
                onClick={() => {
                  const specs = ["SCHEMA", "FIGMA", "APIS", "STACK"];
                  const nextIdx = (specs.indexOf(selectedModel) + 1) % specs.length;
                  handleSelectModel(specs[nextIdx]);
                }}
                onMouseEnter={() => sound.playClick()}
                className="cursor-pointer group/activemodel outline-none"
              >
                <text x="1176" y="40" textAnchor="end" fill="#A8A29E" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2" fontWeight="600">
                  ACTIVE FOCUS
                </text>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.g
                    key={activeModelName}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <text x="1176" y="68" textAnchor="end" fill="#4A3B33" fontSize="20" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                      {activeModelName}
                    </text>
                    <text x="1176" y="84" textAnchor="end" fill="#B45309" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4">
                      {activeProvider} · SYSTEM SPEC
                    </text>
                  </motion.g>
                </AnimatePresence>
              </g>

              {/* Connector Beams: L01 <-> L02 */}
              <g pointerEvents="none" opacity={hoveredIndex !== null ? 0.12 : 1} style={{ transition: "opacity 0.3s" }}>
                <text x="379.8" y="216" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4" fontWeight="600" fill={isSwapping ? "#B45309" : "#A16207"}>
                  {isSwapping ? "SPEC SYNC ⚡" : "SPEC → BUILD"}
                </text>
                {/* Active Energy Beam Pulse */}
                {isSwapping && (
                  <line 
                    x1="346.8" 
                    y1="236" 
                    x2="412.8" 
                    y2="236" 
                    stroke="#F59E0B" 
                    strokeWidth="6" 
                    strokeLinecap="round" 
                    opacity="0.85" 
                    filter="url(#svGlow)" 
                  />
                )}
                <line x1="346.8" y1="229" x2="412.8" y2="229" strokeWidth={isSwapping ? "2" : "1.2"} stroke={isSwapping ? "#B45309" : "rgba(180,83,9,0.5)"} />
                <line x1="346.8" y1="243" x2="412.8" y2="243" strokeWidth={isSwapping ? "2" : "1.2"} stroke={isSwapping ? "#B45309" : "rgba(180,83,9,0.5)"} />
                <line x1="346.8" y1="236" x2="412.8" y2="236" stroke="#E4C090" strokeWidth="1" strokeDasharray="2 5" />
                <rect x="343.8" y="224" width="6" height="24" rx="2" fill="#FDFBF7" stroke="#B45309" strokeWidth="1" />
                <rect x="409.8" y="224" width="6" height="24" rx="2" fill="#FDFBF7" stroke="#B45309" strokeWidth="1" />
                <g>
                  <circle cy="229" r={isSwapping ? "3.5" : "2.4"} fill={isSwapping ? "#F59E0B" : "#B45309"} filter="url(#svGlow)" cx="412.7" opacity="0.9">
                    <animate attributeName="cx" values="346.8;412.8;346.8" dur={isSwapping ? "0.6s" : "3s"} repeatCount="indefinite" />
                  </circle>
                  <circle cy="243" r={isSwapping ? "3" : "2"} fill="#E4C090" cx="374" opacity="0.9">
                    <animate attributeName="cx" values="412.8;346.8;412.8" dur={isSwapping ? "0.5s" : "2.6s"} repeatCount="indefinite" />
                  </circle>
                  {isSwapping && (
                    <circle cy="236" r="4" fill="#B45309" filter="url(#svGlow)">
                      <animate attributeName="cx" values="346.8;412.8" dur="0.35s" repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              </g>

              {/* Connector Beams: L02 -> L03 */}
              <g pointerEvents="none" opacity={hoveredIndex !== null ? 0.12 : 1} style={{ transition: "opacity 0.3s" }}>
                <text x="820.2" y="216" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4" fontWeight="600" fill="#A16207">
                  BUILD → SHIP
                </text>
                <line x1="787.2" y1="229" x2="853.2" y2="229" strokeWidth="1.2" stroke="rgba(180,83,9,0.5)" />
                <line x1="787.2" y1="243" x2="853.2" y2="243" strokeWidth="1.2" stroke="rgba(180,83,9,0.5)" />
                <line x1="787.2" y1="236" x2="853.2" y2="236" stroke="#E4C090" strokeWidth="1" strokeDasharray="2 5" />
                <rect x="784.2" y="224" width="6" height="24" rx="2" fill="#FDFBF7" stroke="#B45309" strokeWidth="1" />
                <rect x="850.2" y="224" width="6" height="24" rx="2" fill="#FDFBF7" stroke="#B45309" strokeWidth="1" />
                <g>
                  <circle cy="229" r="2.4" fill="#B45309" filter="url(#svGlow)" cx="787.2" opacity="0.7">
                    <animate attributeName="cx" values="787.2;853.2;787.2" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cy="243" r="2" fill="#E4C090" cx="820" opacity="0.8">
                    <animate attributeName="cx" values="853.2;787.2;853.2" dur="3.2s" repeatCount="indefinite" />
                  </circle>
                </g>
              </g>

              {/* 01: System Architect Platform */}
              <g 
                role="button" 
                aria-label="01 Discovery and System Architecture"
                onMouseEnter={() => {
                  sound.playClick();
                  setHoveredIndex(0);
                }}
                onClick={() => {
                  sound.playClick();
                  setHoveredIndex(0);
                }}
                className="cursor-pointer transition-all duration-300 outline-none"
                style={{
                  outline: "none",
                  transformOrigin: "50% 50%", 
                  transformBox: "fill-box",
                  transform: hoveredIndex === 0 ? "scale(1.03) translateY(-4px)" : "none",
                  opacity: hoveredIndex !== null && hoveredIndex !== 0 ? 0.35 : 1,
                  filter: hoveredIndex === 0 ? "drop-shadow(0 10px 20px rgba(180,83,9,0.22))" : "none"
                }}
              >
                <g>
                  <line x1="192" y1="306.04" x2="192" y2="320.04" strokeWidth="1" stroke="#E4D9BC" />
                  <circle cx="192" cy="306.04" r="2.2" fill="#B45309" />
                  <g opacity={hoveredIndex === 0 ? 0 : 1} style={{ transition: "opacity 0.2s" }}>
                    <text x="192" y="336.04" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5" fontWeight="600" fill="#B45309">
                      01 · ARCHITECT
                    </text>
                    <text x="192" y="354.04" textAnchor="middle" fill="#4A3B33" fontSize="14" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                      Discovery &amp; Design
                    </text>
                    <text x="192" y="368.04" textAnchor="middle" fill="#78716C" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4">
                      schema · wireframes · stack
                    </text>
                  </g>
                  <rect x="42" y="300.04" width="300" height="76" fill="transparent" />
                </g>

                <g>
                  {/* Floor Ambient Glow */}
                  <ellipse cx="192" cy="268" rx="150" ry="44" fill="url(#svFloorGlow)" filter="url(#svBlur)" opacity={hoveredIndex === 0 ? 0.95 : 0.45} />

                  {/* 3D Extrusion Bevel */}
                  <g transform="matrix(0.894 0.36 -0.894 0.36 192 244)">
                    <rect
                      x="-85"
                      y="-85"
                      width="170"
                      height="170"
                      rx="24"
                      fill={hoveredIndex === 0 ? "url(#svExtrusionSideActive)" : "url(#svExtrusionSide)"}
                      stroke="#B45309"
                      strokeWidth="1"
                      strokeOpacity="0.4"
                    />
                  </g>

                  {/* Top Glassmorphic Surface */}
                  <g transform="matrix(0.894 0.36 -0.894 0.36 192 236)">
                    <rect
                      x="-85"
                      y="-85"
                      width="170"
                      height="170"
                      rx="24"
                      fill={hoveredIndex === 0 ? "url(#svGlassTopActive)" : "url(#svGlassTop)"}
                      stroke={hoveredIndex === 0 ? "url(#svGlassBorderActive)" : "url(#svGlassBorder)"}
                      strokeWidth={hoveredIndex === 0 ? 1.8 : 1.4}
                    />
                    <rect x="-80" y="-80" width="160" height="160" rx="20" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />

                    {/* Subtle grid lines on surface */}
                    <g stroke="#F2E8D5" strokeWidth="0.8">
                      <line x1="-56.6" y1="-85" x2="-56.6" y2="85" vectorEffect="non-scaling-stroke" />
                      <line x1="-85" y1="-56.6" x2="85" y2="-56.6" vectorEffect="non-scaling-stroke" />
                      <line x1="-28.3" y1="-85" x2="-28.3" y2="85" vectorEffect="non-scaling-stroke" />
                      <line x1="-85" y1="-28.3" x2="85" y2="-28.3" vectorEffect="non-scaling-stroke" />
                      <line x1="0" y1="-85" x2="0" y2="85" vectorEffect="non-scaling-stroke" />
                      <line x1="-85" y1="0" x2="85" y2="0" vectorEffect="non-scaling-stroke" />
                      <line x1="28.3" y1="-85" x2="28.3" y2="85" vectorEffect="non-scaling-stroke" />
                      <line x1="-85" y1="28.3" x2="85" y2="28.3" vectorEffect="non-scaling-stroke" />
                      <line x1="56.6" y1="-85" x2="56.6" y2="85" vectorEffect="non-scaling-stroke" />
                      <line x1="-85" y1="56.6" x2="85" y2="56.6" vectorEffect="non-scaling-stroke" />
                    </g>
                    {/* Chip 1: SCHEMA */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); handleSelectModel("SCHEMA"); }}
                      onMouseEnter={() => handleSelectModel("SCHEMA")}
                      className="cursor-pointer group/chip"
                    >
                      <rect 
                        x="-70" 
                        y="-56" 
                        width="62" 
                        height="44" 
                        rx="7" 
                        strokeWidth={selectedModel === "SCHEMA" ? "2" : "1"} 
                        vectorEffect="non-scaling-stroke" 
                        fill={selectedModel === "SCHEMA" ? "rgba(180,83,9,0.22)" : "rgba(255,255,255,0.92)"} 
                        stroke={selectedModel === "SCHEMA" ? "#B45309" : "#E4D9BC"} 
                      />
                    </g>
                    {/* Chip 2: FIGMA */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); handleSelectModel("FIGMA"); }}
                      onMouseEnter={() => handleSelectModel("FIGMA")}
                      className="cursor-pointer group/chip"
                    >
                      <rect 
                        x="8" 
                        y="-56" 
                        width="62" 
                        height="44" 
                        rx="7" 
                        strokeWidth={selectedModel === "FIGMA" ? "2" : "1"} 
                        vectorEffect="non-scaling-stroke" 
                        fill={selectedModel === "FIGMA" ? "rgba(180,83,9,0.22)" : "rgba(255,255,255,0.92)"} 
                        stroke={selectedModel === "FIGMA" ? "#B45309" : "#E4D9BC"} 
                      />
                    </g>
                    {/* Chip 3: APIS */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); handleSelectModel("APIS"); }}
                      onMouseEnter={() => handleSelectModel("APIS")}
                      className="cursor-pointer group/chip"
                    >
                      <rect 
                        x="-70" 
                        y="12" 
                        width="62" 
                        height="44" 
                        rx="7" 
                        strokeWidth={selectedModel === "APIS" ? "2" : "1"} 
                        vectorEffect="non-scaling-stroke" 
                        fill={selectedModel === "APIS" ? "rgba(180,83,9,0.22)" : "rgba(255,255,255,0.92)"} 
                        stroke={selectedModel === "APIS" ? "#B45309" : "#E4D9BC"} 
                      />
                    </g>
                    {/* Chip 4: STACK */}
                    <g
                      onClick={(e) => { e.stopPropagation(); handleSelectModel("STACK"); }}
                      onMouseEnter={() => handleSelectModel("STACK")}
                      className="cursor-pointer group/chip"
                    >
                      <rect 
                        x="8" 
                        y="12" 
                        width="62" 
                        height="44" 
                        rx="7" 
                        strokeWidth={selectedModel === "STACK" ? "2" : "1"} 
                        vectorEffect="non-scaling-stroke" 
                        fill={selectedModel === "STACK" ? "rgba(180,83,9,0.22)" : "rgba(255,255,255,0.92)"} 
                        stroke={selectedModel === "STACK" ? "#B45309" : "#E4D9BC"} 
                      />
                    </g>
                    <line x1="43.6" x2="43.6" y1="-85" y2="85" stroke="#B45309" strokeWidth="1.2" vectorEffect="non-scaling-stroke" opacity="0.4" />
                  </g>

                  {/* Spec Labels */}
                  <g pointerEvents="none">
                    <text x="186.6" y="213.6" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight={selectedModel === "SCHEMA" ? "800" : "600"} letterSpacing="1" fill={selectedModel === "SCHEMA" ? "#B45309" : "#4A3B33"}>SCHEMA</text>
                    <text x="186.6" y="222.6" textAnchor="middle" fontSize="6.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4" fill={selectedModel === "SCHEMA" ? "#A16207" : "#78716C"}>
                      {selectedModel === "SCHEMA" ? "● active" : "database"}
                    </text>
                  </g>
                  <g pointerEvents="none">
                    <text x="255" y="237.9" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight={selectedModel === "FIGMA" ? "800" : "600"} letterSpacing="1" fill={selectedModel === "FIGMA" ? "#B45309" : "#4A3B33"}>FIGMA</text>
                    <text x="255" y="246.9" textAnchor="middle" fontSize="6.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4" fill={selectedModel === "FIGMA" ? "#A16207" : "#78716C"}>
                      {selectedModel === "FIGMA" ? "● active" : "wireframes"}
                    </text>
                  </g>
                  <g pointerEvents="none">
                    <text x="129" y="234.1" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight={selectedModel === "APIS" ? "800" : "600"} letterSpacing="1" fill={selectedModel === "APIS" ? "#B45309" : "#4A3B33"}>APIS</text>
                    <text x="129" y="243.1" textAnchor="middle" fontSize="6.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4" fill={selectedModel === "APIS" ? "#A16207" : "#78716C"}>
                      {selectedModel === "APIS" ? "● active" : "contracts"}
                    </text>
                  </g>
                  <g pointerEvents="none">
                    <text x="197.4" y="258.4" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight={selectedModel === "STACK" ? "800" : "600"} letterSpacing="1" fill={selectedModel === "STACK" ? "#B45309" : "#4A3B33"}>STACK</text>
                    <text x="197.4" y="267.4" textAnchor="middle" fontSize="6.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4" fill={selectedModel === "STACK" ? "#A16207" : "#78716C"}>
                      {selectedModel === "STACK" ? "● active" : "frameworks"}
                    </text>
                  </g>
                  <text x="53.2" y="238.5" fontSize="6.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.8" fill="#A8A29E">01</text>
                </g>
              </g>

              {/* 02: Full-Stack Development Platform */}
              <g 
                role="button" 
                aria-label="02 Full-Stack Development"
                onMouseEnter={() => {
                  sound.playClick();
                  setHoveredIndex(1);
                }}
                onClick={() => {
                  sound.playClick();
                  setHoveredIndex(1);
                }}
                className="cursor-pointer transition-all duration-300 outline-none"
                style={{
                  outline: "none",
                  transformOrigin: "50% 50%", 
                  transformBox: "fill-box",
                  transform: hoveredIndex === 1 ? "scale(1.03) translateY(-4px)" : "none",
                  opacity: hoveredIndex !== null && hoveredIndex !== 1 ? 0.35 : 1,
                  filter: hoveredIndex === 1 ? "drop-shadow(0 10px 20px rgba(180,83,9,0.22))" : "none"
                }}
              >
                <g>
                  <line x1="600" y1="319.56" x2="600" y2="333.56" strokeWidth="1" stroke="#E4D9BC" />
                  <circle cx="600" cy="319.56" r="2.2" fill="#B45309" />
                  <g opacity={hoveredIndex === 1 ? 0 : 1} style={{ transition: "opacity 0.2s" }}>
                    <text x="600" y="349.56" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5" fontWeight="600" fill="#B45309">
                      02 · ENGINEER
                    </text>
                    <text x="600" y="367.56" textAnchor="middle" fill="#4A3B33" fontSize="14" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                      Full-Stack Development
                    </text>
                    <text x="600" y="381.56" textAnchor="middle" fill="#78716C" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4">
                      clean code · resilient services · testing
                    </text>
                  </g>
                  <rect x="450" y="313.56" width="300" height="76" fill="transparent" />
                </g>

                <g>
                  {/* Floor Ambient Glow */}
                  <ellipse cx="600" cy="270" rx="172" ry="48" fill="url(#svFloorGlow)" filter="url(#svBlur)" opacity={hoveredIndex === 1 ? 0.95 : 0.45} />

                  {/* 3D Extrusion Bevel */}
                  <g transform="matrix(0.894 0.36 -0.894 0.36 600 245)">
                    <rect
                      x="-98"
                      y="-98"
                      width="196"
                      height="196"
                      rx="26"
                      fill={hoveredIndex === 1 ? "url(#svExtrusionSideActive)" : "url(#svExtrusionSide)"}
                      stroke="#B45309"
                      strokeWidth="1"
                      strokeOpacity="0.4"
                    />
                  </g>

                  {/* Top Glassmorphic Surface */}
                  <g transform="matrix(0.894 0.36 -0.894 0.36 600 236)">
                    <rect
                      x="-98"
                      y="-98"
                      width="196"
                      height="196"
                      rx="26"
                      fill={hoveredIndex === 1 ? "url(#svGlassTopActive)" : "url(#svGlassTop)"}
                      stroke={hoveredIndex === 1 ? "url(#svGlassBorderActive)" : "url(#svGlassBorder)"}
                      strokeWidth={hoveredIndex === 1 ? 1.8 : 1.4}
                    />
                    <rect x="-92" y="-92" width="184" height="184" rx="22" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />

                    {/* Micro Grid Lines */}
                    <g stroke="#F2E8D5" strokeWidth="0.8">
                      <line x1="-65.3" y1="-98" x2="-65.3" y2="98" vectorEffect="non-scaling-stroke" />
                      <line x1="-98" y1="-65.3" x2="98" y2="-65.3" vectorEffect="non-scaling-stroke" />
                      <line x1="-32.7" y1="-98" x2="-32.7" y2="98" vectorEffect="non-scaling-stroke" />
                      <line x1="-98" y1="-32.7" x2="98" y2="-32.7" vectorEffect="non-scaling-stroke" />
                      <line x1="0" y1="-98" x2="0" y2="98" vectorEffect="non-scaling-stroke" />
                      <line x1="-98" y1="0" x2="98" y2="0" vectorEffect="non-scaling-stroke" />
                      <line x1="32.7" y1="-98" x2="32.7" y2="98" vectorEffect="non-scaling-stroke" />
                      <line x1="-98" y1="32.7" x2="98" y2="32.7" vectorEffect="non-scaling-stroke" />
                      <line x1="65.3" y1="-98" x2="65.3" y2="98" vectorEffect="non-scaling-stroke" />
                      <line x1="-98" y1="65.3" x2="98" y2="65.3" vectorEffect="non-scaling-stroke" />
                    </g>

                    {/* 3x3 Architectural Micro-Nodes */}
                    <rect x="-74" y="-74" width="44" height="44" rx="6" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="rgba(255,255,255,0.88)" stroke="#E4D9BC" />
                    <rect x="-22" y="-74" width="44" height="44" rx="6" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="rgba(255,255,255,0.88)" stroke="#E4D9BC" />
                    <rect x="30" y="-74" width="44" height="44" rx="6" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="rgba(255,255,255,0.88)" stroke="#E4D9BC" />
                    
                    <rect x="-74" y="-22" width="44" height="44" rx="6" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="rgba(255,255,255,0.88)" stroke="#E4D9BC" />
                    <rect x="-22" y="-22" width="44" height="44" rx="6" strokeWidth="1.5" vectorEffect="non-scaling-stroke" fill="rgba(180,83,9,0.18)" stroke="#B45309" />
                    <rect x="30" y="-22" width="44" height="44" rx="6" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="rgba(255,255,255,0.88)" stroke="#E4D9BC" />
                    
                    <rect x="-74" y="30" width="44" height="44" rx="6" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="rgba(255,255,255,0.88)" stroke="#E4D9BC" />
                    <rect x="-22" y="30" width="44" height="44" rx="6" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="rgba(255,255,255,0.88)" stroke="#E4D9BC" />
                    <rect x="30" y="30" width="44" height="44" rx="6" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="rgba(255,255,255,0.88)" stroke="#E4D9BC" />
                    
                    <line x1="11.8" x2="11.8" y1="-98" y2="98" stroke="#B45309" strokeWidth="1.2" vectorEffect="non-scaling-stroke" opacity="0.4" />
                  </g>

                  {/* Surface Texts */}
                  <text x="600" y="205.3" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="500" fill="#78716C">frontend</text>
                  <text x="646.8" y="222" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="500" fill="#78716C">apis</text>
                  <text x="693.6" y="238.6" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="500" fill="#78716C">logic</text>
                  <text x="553.2" y="222" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="500" fill="#78716C">auth</text>
                  <text x="600" y="238.6" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="700" fill="#B45309">backend</text>
                  <text x="646.8" y="255.2" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="500" fill="#78716C">caching</text>
                  <text x="506.4" y="238.6" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="500" fill="#78716C">workers</text>
                  <text x="553.2" y="255.2" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="500" fill="#78716C">pipelines</text>
                  <text x="600" y="271.9" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="500" fill="#78716C">tests</text>
                  <text x="428.8" y="238.5" fontSize="6.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.8" fill="#A8A29E">02</text>
                </g>
              </g>

              {/* 03: Deployment & Production Scale Platform */}
              <g 
                role="button" 
                aria-label="03 Deployment and Production Scale"
                onMouseEnter={() => {
                  sound.playClick();
                  setHoveredIndex(2);
                }}
                onClick={() => {
                  sound.playClick();
                  setHoveredIndex(2);
                }}
                className="cursor-pointer transition-all duration-300 outline-none"
                style={{
                  outline: "none",
                  transformOrigin: "50% 50%", 
                  transformBox: "fill-box",
                  transform: hoveredIndex === 2 ? "scale(1.03) translateY(-4px)" : "none",
                  opacity: hoveredIndex !== null && hoveredIndex !== 2 ? 0.35 : 1,
                  filter: hoveredIndex === 2 ? "drop-shadow(0 10px 20px rgba(180,83,9,0.22))" : "none"
                }}
              >
                <g>
                  <line x1="1008" y1="306.04" x2="1008" y2="320.04" strokeWidth="1" stroke="#E4D9BC" />
                  <circle cx="1008" cy="306.04" r="2.2" fill="#B45309" />
                  <g opacity={hoveredIndex === 2 ? 0 : 1} style={{ transition: "opacity 0.2s" }}>
                    <text x="1008" y="336.04" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5" fontWeight="600" fill="#B45309">
                      03 · SHIP &amp; SCALE
                    </text>
                    <text x="1008" y="354.04" textAnchor="middle" fill="#4A3B33" fontSize="14" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                      Deployment &amp; Scale
                    </text>
                    <text x="1008" y="368.04" textAnchor="middle" fill="#78716C" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4">
                      cloud deploy · zero downtime · scale
                    </text>
                  </g>
                  <rect x="858" y="300.04" width="300" height="76" fill="transparent" />
                </g>

                <g>
                  {/* Floor Ambient Glow */}
                  <ellipse cx="1008" cy="268" rx="150" ry="44" fill="url(#svFloorGlow)" filter="url(#svBlur)" opacity={hoveredIndex === 2 ? 0.95 : 0.45} />

                  {/* 3D Extrusion Bevel */}
                  <g transform="matrix(0.894 0.36 -0.894 0.36 1008 244)">
                    <rect
                      x="-85"
                      y="-85"
                      width="170"
                      height="170"
                      rx="24"
                      fill={hoveredIndex === 2 ? "url(#svExtrusionSideActive)" : "url(#svExtrusionSide)"}
                      stroke="#B45309"
                      strokeWidth="1"
                      strokeOpacity="0.4"
                    />
                  </g>

                  {/* Top Glassmorphic Surface */}
                  <g transform="matrix(0.894 0.36 -0.894 0.36 1008 236)">
                    <rect
                      x="-85"
                      y="-85"
                      width="170"
                      height="170"
                      rx="24"
                      fill={hoveredIndex === 2 ? "url(#svGlassTopActive)" : "url(#svGlassTop)"}
                      stroke={hoveredIndex === 2 ? "url(#svGlassBorderActive)" : "url(#svGlassBorder)"}
                      strokeWidth={hoveredIndex === 2 ? 1.8 : 1.4}
                    />
                    <rect x="-80" y="-80" width="160" height="160" rx="20" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />

                    {/* Micro Grid Lines */}
                    <g stroke="#F2E8D5" strokeWidth="0.8">
                      <line x1="-56.6" y1="-85" x2="-56.6" y2="85" vectorEffect="non-scaling-stroke" />
                      <line x1="-85" y1="-56.6" x2="85" y2="-56.6" vectorEffect="non-scaling-stroke" />
                      <line x1="-28.3" y1="-85" x2="-28.3" y2="85" vectorEffect="non-scaling-stroke" />
                      <line x1="-85" y1="-28.3" x2="85" y2="-28.3" vectorEffect="non-scaling-stroke" />
                      <line x1="0" y1="-85" x2="0" y2="85" vectorEffect="non-scaling-stroke" />
                      <line x1="-85" y1="0" x2="85" y2="0" vectorEffect="non-scaling-stroke" />
                      <line x1="28.3" y1="-85" x2="28.3" y2="85" vectorEffect="non-scaling-stroke" />
                      <line x1="-85" y1="28.3" x2="85" y2="28.3" vectorEffect="non-scaling-stroke" />
                      <line x1="56.6" y1="-85" x2="56.6" y2="85" vectorEffect="non-scaling-stroke" />
                      <line x1="-85" y1="56.6" x2="85" y2="56.6" vectorEffect="non-scaling-stroke" />
                    </g>

                    {/* 4 Telemetry Monitor Cards */}
                    <rect x="-70" y="-56" width="62" height="44" rx="7" fill="rgba(255,255,255,0.92)" stroke="#E4D9BC" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <rect x="-62" y="-22" width="46" height="4" rx="1.5" fill="#F1E9DA" />
                    <rect x="-62" y="-22" height="4" rx="1.5" fill="#B45309" width="36" />
                    
                    <rect x="8" y="-56" width="62" height="44" rx="7" fill="rgba(255,255,255,0.92)" stroke="#E4D9BC" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <rect x="16" y="-22" width="46" height="4" rx="1.5" fill="#F1E9DA" />
                    <rect x="16" y="-22" height="4" rx="1.5" fill="#B45309" width="22" />

                    <rect x="-70" y="12" width="62" height="44" rx="7" fill="rgba(255,255,255,0.92)" stroke="#E4D9BC" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <rect x="-62" y="46" width="46" height="4" rx="1.5" fill="#F1E9DA" />
                    <rect x="-62" y="46" height="4" rx="1.5" fill="#B45309" width="30" />

                    <rect x="8" y="12" width="62" height="44" rx="7" fill="rgba(255,255,255,0.92)" stroke="#E4D9BC" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <rect x="16" y="46" width="46" height="4" rx="1.5" fill="#F1E9DA" />
                    <rect x="16" y="46" height="4" rx="1.5" fill="#B45309" width="42" />

                    <line x1="-17.1" x2="-17.1" y1="-85" y2="85" stroke="#B45309" strokeWidth="1.2" vectorEffect="non-scaling-stroke" opacity="0.4" />
                    <circle cx="0" cy="0" r="8" fill="#FDFBF7" stroke="#B45309" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                    <circle cx="0" cy="0" r="3.5" fill="#B45309" />
                  </g>

                  {/* Surface Labels */}
                  <g>
                    <text x="1007.1" y="212" textAnchor="middle" fill="#4A3B33" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="700" letterSpacing="1">DEPLOY</text>
                    <text x="1007.1" y="221" textAnchor="middle" fill="#A16207" fontSize="6.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.3">ci / cd live</text>
                  </g>
                  <g>
                    <text x="1075.5" y="236.3" textAnchor="middle" fill="#4A3B33" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="700" letterSpacing="1">CLOUD</text>
                    <text x="1075.5" y="245.3" textAnchor="middle" fill="#A16207" fontSize="6.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.3">edge hosting</text>
                  </g>
                  <g>
                    <text x="949.5" y="232.5" textAnchor="middle" fill="#4A3B33" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="700" letterSpacing="1">UPTIME</text>
                    <text x="949.5" y="241.5" textAnchor="middle" fill="#A16207" fontSize="6.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.3">99.9% sla</text>
                  </g>
                  <g>
                    <text x="1017.9" y="256.8" textAnchor="middle" fill="#4A3B33" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="700" letterSpacing="1">MONITOR</text>
                    <text x="1017.9" y="265.8" textAnchor="middle" fill="#A16207" fontSize="6.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.3">telemetry</text>
                  </g>
                  <text x="869.2" y="238.5" fontSize="6.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.8" fill="#A8A29E">03</text>
                </g>
              </g>

              {/* Bottom Telemetry Bar */}
              <g pointerEvents="none" opacity={hoveredIndex !== null ? 0.25 : 1} style={{ transition: "opacity 0.3s" }}>
                <g>
                  <text x="24" y="432" fill="#78716C" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.2">CODE INTEGRITY</text>
                  <text x="294" y="432" textAnchor="end" fill="#4A3B33" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">100%</text>
                  <rect x="24" y="442" width="270" height="3" rx="1.5" fill="#F1E9DA" />
                  <rect x="24" y="442" width="270" height="3" rx="1.5" fill="#B45309" />
                </g>
                <g>
                  <text x="318" y="432" fill="#78716C" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.2">SYSTEM LATENCY</text>
                  <text x="588" y="432" textAnchor="end" fill="#4A3B33" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">&lt; 100ms</text>
                  <rect x="318" y="442" width="270" height="3" rx="1.5" fill="#F1E9DA" />
                  <rect x="318" y="442" width="40" height="3" rx="1.5" fill="#B45309" />
                </g>
                <g>
                  <text x="612" y="432" fill="#78716C" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.2">VERIFIED COMMITS</text>
                  <text x="882" y="432" textAnchor="end" fill="#4A3B33" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">699+</text>
                  <rect x="612" y="442" width="270" height="3" rx="1.5" fill="#F1E9DA" />
                  <rect x="612" y="442" width="270" height="3" rx="1.5" fill="#B45309" />
                </g>
                <g>
                  <text x="906" y="432" fill="#78716C" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.2">PRODUCTION DOWNTIME</text>
                  <text x="1176" y="432" textAnchor="end" fill="#4A3B33" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">0.0s</text>
                  <rect x="906" y="442" width="270" height="3" rx="1.5" fill="#F1E9DA" />
                  <rect x="906" y="442" width="0" height="3" rx="1.5" fill="#B45309" />
                </g>
              </g>

              {/* Bottom Separator & Footer Label */}
              <g pointerEvents="none">
                <line x1="24" y1="484" x2="1176" y2="484" stroke="#E4D9BC" strokeWidth="1" />
                <text x="24" y="504" fill="#A8A29E" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4">
                  engineering_protocol.live · 3 phases · full-stack delivery · production grade
                </text>
                <text x="1176" y="504" textAnchor="end" fill="#A16207" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4" fontWeight="600">
                  HOVER A PHASE OR CLICK SPEC TO INSPECT
                </text>
              </g>
            </svg>

            {/* Inspection Detail Panel - Anchored directly below the hovered layer */}
            <AnimatePresence>
              {activeData && (
                <motion.div
                  key={activeData.eyebrow}
                  initial={{ opacity: 0, x: "-50%", y: 10 }}
                  animate={{ opacity: 1, x: "-50%", y: 0 }}
                  exit={{ opacity: 0, x: "-50%", y: 6 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className="hidden md:block absolute z-20 pointer-events-none w-[25%] min-w-[250px] max-w-[295px]"
                  style={{
                    top: activeData.top,
                    left: activeData.left
                  }}
                >
                  <div className="relative overflow-hidden rounded-lg border border-[#E4D9BC] bg-white/95 backdrop-blur-sm shadow-[0_12px_32px_-16px_rgba(74,59,51,0.28)]">
                    <div className="absolute inset-y-0 left-0 w-[2px] bg-[#B45309]" />
                    <div className="p-3 sm:p-3.5">
                      {/* Eyebrow & LIVE badge */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#B45309]">
                          {activeData.eyebrow}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-[#A8A29E]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#B45309] animate-pulse" />
                          live
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="mt-1 text-[13px] font-bold leading-tight text-[#4A3B33] font-serif">
                        {activeData.title}
                      </h4>

                      {/* Body */}
                      <p className="mt-1 text-[11px] leading-[1.45] text-[#57534E] line-clamp-2">
                        {activeData.body}
                      </p>

                      {/* Horizontal Key-Value Stats */}
                      <div className="mt-2.5 grid grid-cols-3 gap-1.5 border-t border-[#F1E9DA] pt-2">
                        {activeData.stats.map(([k, v]) => (
                          <div key={k}>
                            <div className="font-mono text-[8px] uppercase tracking-wider text-[#A8A29E] truncate">{k}</div>
                            <div className="font-mono text-[10.5px] font-bold tabular-nums text-[#4A3B33] truncate">{v}</div>
                          </div>
                        ))}
                      </div>

                      {/* Code Pill */}
                      {activeData.code && (
                        <div className="mt-2 rounded border border-[#F1E9DA] bg-[#F8F4EE] px-2 py-1 font-mono text-[9px] text-[#57534E] truncate">
                          <span className="text-[#B45309]">▸</span> {activeData.code}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
