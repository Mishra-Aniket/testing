"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "../utils/sound";

const routerData = [
  {
    eyebrow: "L01 · ROUTE",
    title: "Any model",
    body: "Frontier or open-weight, any model docks into the same context. Swap it or route per task without resetting a single memory.",
    stats: [["DOCKED", "GPT"], ["SWAP TIME", "< 1s"], ["MEMORY RESET", "none"]],
    code: 'ctx.route({ model: "gpt" })',
    left: "19%"
  },
  {
    eyebrow: "L02 · PERSIST",
    title: "Sovereign context layer",
    body: "Your institutional context lives here: owned by you, portable, and independent of any model vendor. It survives every swap.",
    stats: [["RETAINED", "100%"], ["OWNER", "you"], ["LOCK-IN", "none"]],
    code: 'ctx.export({ format: "open" })',
    left: "50%"
  },
  {
    eyebrow: "L03 · OPERATE",
    title: "Agents that operate",
    body: "Sales, support, ops and research agents keep running on the same context while the model underneath them changes.",
    stats: [["AGENTS", "4 live"], ["DOWNTIME", "0.0s"], ["TASKS", "6,853"]],
    code: 'agent.run({ context: ctx })',
    left: "81%"
  }
];

export default function ModelSovereignty() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedModel, setSelectedModel] = useState("GPT");
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapCount, setSwapCount] = useState(22);
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
    selectedModel === "Gemini" ? "GOOGLE" : 
    selectedModel === "Claude" ? "ANTHROPIC" : 
    selectedModel === "DeepSeek" ? "DEEPSEEK" : "OPENAI";
  if (hoveredIndex === 2) {
    activeModelName = "Gemini";
    activeProvider = "GOOGLE";
  }

  const dynamicRouterData = [
    {
      eyebrow: "L01 · ROUTE",
      title: "Any model",
      body: "Frontier or open-weight, any model docks into the same context. Swap it or route per task without resetting a single memory.",
      stats: [["DOCKED", selectedModel], ["SWAP TIME", "< 1s"], ["MEMORY RESET", "none"]],
      code: `ctx.route({ model: "${selectedModel.toLowerCase()}" })`,
      left: "16%",
      top: "56%"
    },
    {
      eyebrow: "L02 · PERSIST",
      title: "Sovereign context layer",
      body: "Your institutional context lives here: owned by you, portable, and independent of any model vendor. It survives every swap.",
      stats: [["RETAINED", "100%"], ["OWNER", "you"], ["LOCK-IN", "none"]],
      code: 'ctx.export({ format: "open" })',
      left: "50%",
      top: "60.5%"
    },
    {
      eyebrow: "L03 · OPERATE",
      title: "Agents that operate",
      body: "Sales, support, ops and research agents keep running on the same context while the model underneath them changes.",
      stats: [["AGENTS", "4 live"], ["DOWNTIME", "0.0s"], ["TASKS", "6,853"]],
      code: 'agent.run({ context: ctx })',
      left: "84%",
      top: "57%"
    }
  ];

  const activeData = hoveredIndex !== null ? dynamicRouterData[hoveredIndex] : null;

  return (
    <section className="relative w-full overflow-hidden bg-[#FDFBF7] py-16 md:py-24 text-[#4A3B33]">
      {/* Grid background matching original site */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#E4D9BC 1px, transparent 1px), linear-gradient(90deg, #E4D9BC 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#78716C] font-semibold text-center">
            Multi-model architecture: Any LLM docks seamlessly into your system
          </p>
        </div>

        <div 
          className="relative w-full overflow-x-auto lg:overflow-visible select-none"
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
                  ANIKET // MULTI_MODEL_ENGINE
                </text>
                <text x="24" y="57" fill="#A8A29E" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
                  hot-swaps {swapCount} · memory reset 0 · latency {lastSwapTime}
                </text>
                <circle cx="298" cy="54.5" r="2.4" fill={isSwapping ? "#10B981" : "#B45309"} opacity="0.93" />
                <text x="330" y="57" textAnchor="end" fill={isSwapping ? "#10B981" : "#A8A29E"} fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1" fontWeight={isSwapping ? "700" : "400"}>
                  {isSwapping ? "SWAPPING" : "LIVE"}
                </text>
                <rect x="24" y="67" width="73.5" height="3" rx="1.5" style={{ fill: isSwapping ? "#F59E0B" : "#B45309", transition: "fill 0.3s" }} />
                <rect x="101.5" y="67" width="73.5" height="3" rx="1.5" style={{ fill: isSwapping ? "#F59E0B" : "#E4D9BC", transition: "fill 0.3s" }} />
                <rect x="179" y="67" width="73.5" height="3" rx="1.5" style={{ fill: "#E4D9BC", transition: "fill 0.3s" }} />
                <rect x="256.5" y="67" width="73.5" height="3" rx="1.5" style={{ fill: "#E4D9BC", transition: "fill 0.3s" }} />
                <text x="24" y="88" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6" fontWeight="600" style={{ fill: isSwapping ? "#B45309" : "#B45309", transition: "fill 0.3s" }}>
                  {isSwapping ? `⚡ HOT-SWAP IN PROGRESS: DOCKING ${activeModelName.toUpperCase()}...` : `PHASE · OPERATING ON ${activeModelName.toUpperCase()}`}
                </text>
              </g>

              {/* Top Right Active Model */}
              <g 
                role="button"
                aria-label="Active model switcher"
                data-custom-sound="true"
                style={{ outline: "none" }}
                onClick={() => {
                  const models = ["GPT", "Claude", "Gemini", "DeepSeek"];
                  const nextIdx = (models.indexOf(selectedModel) + 1) % models.length;
                  handleSelectModel(models[nextIdx]);
                }}
                onMouseEnter={() => sound.playClick()}
                className="cursor-pointer group/activemodel outline-none"
              >
                <text x="1176" y="40" textAnchor="end" fill="#A8A29E" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2" fontWeight="600">
                  ACTIVE MODEL
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
                      {activeProvider} · CONTEXT UNCHANGED
                    </text>
                  </motion.g>
                </AnimatePresence>
              </g>

              {/* Connector Beams: L01 <-> L02 */}
              <g pointerEvents="none" opacity={hoveredIndex !== null ? 0.12 : 1} style={{ transition: "opacity 0.3s" }}>
                <text x="379.8" y="216" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4" fontWeight="600" fill={isSwapping ? "#B45309" : "#A16207"}>
                  {isSwapping ? "HOT-SWAP BEAM ⚡" : "CONTEXT ⇄ MODEL"}
                </text>
                {/* Active Hot-Swap Energy Beam Pulse */}
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
                  CONTEXT → AGENTS
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

              {/* L01: Any Model Platform */}
              <g 
                role="button" 
                aria-label="L01 Any model"
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
                      L01 · ROUTE
                    </text>
                    <text x="192" y="354.04" textAnchor="middle" fill="#4A3B33" fontSize="14" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                      Any model
                    </text>
                    <text x="192" y="368.04" textAnchor="middle" fill="#78716C" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4">
                      click or hover chip to dock
                    </text>
                  </g>
                  <rect x="42" y="300.04" width="300" height="76" fill="transparent" />
                </g>

                <g>
                  <ellipse cx="192" cy="262" rx="139.3" ry="39.6" fill="#4A3B33" opacity="0.07" filter="url(#svBlur)" />
                  <ellipse cx="192" cy="240" rx="176.8" ry="73" fill="url(#svHalo)" opacity={hoveredIndex === 0 ? 0.8 : 0.4} />
                  <polygon points="37.2,236 192,291.04 192,300.04 37.2,245" fill="#F1E9DA" />
                  <polygon points="192,291.04 346.8,236 346.8,245 192,300.04" fill="#E4D9BC" />
                  <polygon points="192,180.96 346.8,236 192,291.04 37.2,236" fill="url(#svTop)" strokeWidth="1.4" stroke="#B45309" />
                  <polyline points="37.2,236 192,291.04 346.8,236" fill="none" strokeWidth="1.6" strokeLinejoin="round" stroke="#B45309" opacity="0.9" />
                  
                  {/* Grid Lines on platform surface */}
                  <g transform="matrix(0.9 0.32 -0.9 0.32 192 236)">
                    <rect x="-80" y="-80" width="160" height="160" rx="4" fill="none" stroke="#F1E9DA" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <g stroke="#F6F0E4" strokeWidth="0.8">
                      <line x1="-53.3" y1="-80" x2="-53.3" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="-53.3" x2="80" y2="-53.3" vectorEffect="non-scaling-stroke" />
                      <line x1="-26.7" y1="-80" x2="-26.7" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="-26.7" x2="80" y2="-26.7" vectorEffect="non-scaling-stroke" />
                      <line x1="0" y1="-80" x2="0" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="0" x2="80" y2="0" vectorEffect="non-scaling-stroke" />
                      <line x1="26.7" y1="-80" x2="26.7" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="26.7" x2="80" y2="26.7" vectorEffect="non-scaling-stroke" />
                      <line x1="53.3" y1="-80" x2="53.3" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="53.3" x2="80" y2="53.3" vectorEffect="non-scaling-stroke" />
                    </g>
                    {/* Chip 1: GPT */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); handleSelectModel("GPT"); }}
                      onMouseEnter={() => handleSelectModel("GPT")}
                      className="cursor-pointer group/chip"
                    >
                      <rect 
                        x="-68" 
                        y="-54" 
                        width="60" 
                        height="44" 
                        rx="4" 
                        strokeWidth={selectedModel === "GPT" ? "2" : "1"} 
                        vectorEffect="non-scaling-stroke" 
                        fill={selectedModel === "GPT" ? "rgba(180,83,9,0.22)" : "#FFFFFF"} 
                        stroke={selectedModel === "GPT" ? "#B45309" : "#E4D9BC"} 
                      />
                    </g>
                    {/* Chip 2: Gemini */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); handleSelectModel("Gemini"); }}
                      onMouseEnter={() => handleSelectModel("Gemini")}
                      className="cursor-pointer group/chip"
                    >
                      <rect 
                        x="8" 
                        y="-54" 
                        width="60" 
                        height="44" 
                        rx="4" 
                        strokeWidth={selectedModel === "Gemini" ? "2" : "1"} 
                        vectorEffect="non-scaling-stroke" 
                        fill={selectedModel === "Gemini" ? "rgba(180,83,9,0.22)" : "#FFFFFF"} 
                        stroke={selectedModel === "Gemini" ? "#B45309" : "#E4D9BC"} 
                      />
                    </g>
                    {/* Chip 3: Claude */}
                    <g 
                      onClick={(e) => { e.stopPropagation(); handleSelectModel("Claude"); }}
                      onMouseEnter={() => handleSelectModel("Claude")}
                      className="cursor-pointer group/chip"
                    >
                      <rect 
                        x="-68" 
                        y="10" 
                        width="60" 
                        height="44" 
                        rx="4" 
                        strokeWidth={selectedModel === "Claude" ? "2" : "1"} 
                        vectorEffect="non-scaling-stroke" 
                        fill={selectedModel === "Claude" ? "rgba(180,83,9,0.22)" : "#FFFFFF"} 
                        stroke={selectedModel === "Claude" ? "#B45309" : "#E4D9BC"} 
                      />
                    </g>
                    {/* Chip 4: DeepSeek */}
                    <g
                      onClick={(e) => { e.stopPropagation(); handleSelectModel("DeepSeek"); }}
                      onMouseEnter={() => handleSelectModel("DeepSeek")}
                      className="cursor-pointer group/chip"
                    >
                      <rect 
                        x="8" 
                        y="10" 
                        width="60" 
                        height="44" 
                        rx="4" 
                        strokeWidth={selectedModel === "DeepSeek" ? "2" : "1"} 
                        vectorEffect="non-scaling-stroke" 
                        fill={selectedModel === "DeepSeek" ? "rgba(180,83,9,0.22)" : "#FFFFFF"} 
                        stroke={selectedModel === "DeepSeek" ? "#B45309" : "#E4D9BC"} 
                      />
                    </g>
                    <line x1="43.6" x2="43.6" y1="-80" y2="80" stroke="#B45309" strokeWidth="1.2" vectorEffect="non-scaling-stroke" opacity="0.5" />
                  </g>

                  {/* Model Labels */}
                  <g pointerEvents="none">
                    <text x="186.6" y="213.6" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight={selectedModel === "GPT" ? "800" : "600"} letterSpacing="1" fill={selectedModel === "GPT" ? "#B45309" : "#4A3B33"}>GPT</text>
                    <text x="186.6" y="222.6" textAnchor="middle" fontSize="6.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4" fill={selectedModel === "GPT" ? "#A16207" : "#78716C"}>
                      {selectedModel === "GPT" ? "● docked" : "openai"}
                    </text>
                  </g>
                  <g pointerEvents="none">
                    <text x="255" y="237.9" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight={selectedModel === "Gemini" ? "800" : "600"} letterSpacing="1" fill={selectedModel === "Gemini" ? "#B45309" : "#4A3B33"}>GEMINI</text>
                    <text x="255" y="246.9" textAnchor="middle" fontSize="6.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4" fill={selectedModel === "Gemini" ? "#A16207" : "#78716C"}>
                      {selectedModel === "Gemini" ? "● docked" : "google"}
                    </text>
                  </g>
                  <g pointerEvents="none">
                    <text x="129" y="234.1" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight={selectedModel === "Claude" ? "800" : "600"} letterSpacing="1" fill={selectedModel === "Claude" ? "#B45309" : "#4A3B33"}>CLAUDE</text>
                    <text x="129" y="243.1" textAnchor="middle" fontSize="6.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4" fill={selectedModel === "Claude" ? "#A16207" : "#78716C"}>
                      {selectedModel === "Claude" ? "● docked" : "anthropic"}
                    </text>
                  </g>
                  <g pointerEvents="none">
                    <text x="197.4" y="258.4" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight={selectedModel === "DeepSeek" ? "800" : "600"} letterSpacing="1" fill={selectedModel === "DeepSeek" ? "#B45309" : "#4A3B33"}>DEEPSEEK</text>
                    <text x="197.4" y="267.4" textAnchor="middle" fontSize="6.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4" fill={selectedModel === "DeepSeek" ? "#A16207" : "#78716C"}>
                      {selectedModel === "DeepSeek" ? "● docked" : "open-weights"}
                    </text>
                  </g>
                  <text x="53.2" y="238.5" fontSize="6.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.8" fill="#A8A29E">L01</text>
                </g>
              </g>

              {/* L02: Sovereign Context Layer */}
              <g 
                role="button" 
                aria-label="L02 Sovereign context layer"
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
                      L02 · PERSIST
                    </text>
                    <text x="600" y="367.56" textAnchor="middle" fill="#4A3B33" fontSize="14" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                      Sovereign context layer
                    </text>
                    <text x="600" y="381.56" textAnchor="middle" fill="#78716C" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4">
                      owned by you · model-agnostic
                    </text>
                  </g>
                  <rect x="450" y="313.56" width="300" height="76" fill="transparent" />
                </g>

                <g>
                  <ellipse cx="600" cy="262" rx="168.5" ry="47.9" fill="#4A3B33" opacity="0.07" filter="url(#svBlur)" />
                  <ellipse cx="600" cy="240" rx="209.2" ry="84.5" fill="url(#svHalo)" opacity={hoveredIndex === 1 ? 0.8 : 0.4} />
                  <polygon points="412.8,236 600,302.56 600,313.56 412.8,247" fill="#F1E9DA" />
                  <polygon points="600,302.56 787.2,236 787.2,247 600,313.56" fill="#E4D9BC" />
                  <polygon points="600,169.44 787.2,236 600,302.56 412.8,236" fill="url(#svTop)" strokeWidth="1.4" stroke="#B45309" />
                  <polyline points="412.8,236 600,302.56 787.2,236" fill="none" strokeWidth="1.6" strokeLinejoin="round" stroke="#B45309" opacity="0.9" />

                  {/* Surface Grid & Context Nodes */}
                  <g transform="matrix(0.9 0.32 -0.9 0.32 600 236)">
                    <rect x="-98" y="-98" width="196" height="196" rx="4" fill="none" stroke="#F1E9DA" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <g stroke="#F6F0E4" strokeWidth="0.8">
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
                    <rect x="-73" y="-73" width="42" height="42" rx="4" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="rgba(180,83,9,0.07)" stroke="#E4D9BC" />
                    <rect x="-21" y="-73" width="42" height="42" rx="4" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="rgba(180,83,9,0.07)" stroke="#E4D9BC" />
                    <rect x="31" y="-73" width="42" height="42" rx="4" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="rgba(180,83,9,0.07)" stroke="#E4D9BC" />
                    <rect x="-73" y="-21" width="42" height="42" rx="4" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="rgba(180,83,9,0.07)" stroke="#E4D9BC" />
                    <rect x="-21" y="-21" width="42" height="42" rx="4" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="rgba(180,83,9,0.16)" stroke="#B45309" />
                    <rect x="31" y="-21" width="42" height="42" rx="4" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="rgba(180,83,9,0.07)" stroke="#E4D9BC" />
                    <rect x="-73" y="31" width="42" height="42" rx="4" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="rgba(180,83,9,0.07)" stroke="#E4D9BC" />
                    <rect x="-21" y="31" width="42" height="42" rx="4" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="rgba(180,83,9,0.07)" stroke="#E4D9BC" />
                    <rect x="31" y="31" width="42" height="42" rx="4" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="rgba(180,83,9,0.07)" stroke="#E4D9BC" />
                    <line x1="11.8" x2="11.8" y1="-98" y2="98" stroke="#B45309" strokeWidth="1.2" vectorEffect="non-scaling-stroke" opacity="0.5" />
                  </g>

                  {/* Surface Texts */}
                  <text x="600" y="205.3" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="500" fill="#78716C">accounts</text>
                  <text x="646.8" y="222" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="500" fill="#78716C">deals</text>
                  <text x="693.6" y="238.6" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="500" fill="#78716C">policies</text>
                  <text x="553.2" y="222" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="500" fill="#78716C">people</text>
                  <text x="600" y="238.6" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="700" fill="#B45309">revenue</text>
                  <text x="646.8" y="255.2" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="500" fill="#78716C">tickets</text>
                  <text x="506.4" y="238.6" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="500" fill="#78716C">pricing</text>
                  <text x="553.2" y="255.2" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="500" fill="#78716C">docs</text>
                  <text x="600" y="271.9" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5" fontWeight="500" fill="#78716C">decisions</text>
                  <text x="428.8" y="238.5" fontSize="6.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.8" fill="#A8A29E">L02</text>
                </g>
              </g>

              {/* L03: Agents that operate */}
              <g 
                role="button" 
                aria-label="L03 Agents that operate"
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
                      L03 · OPERATE
                    </text>
                    <text x="1008" y="354.04" textAnchor="middle" fill="#4A3B33" fontSize="14" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                      Agents that operate
                    </text>
                    <text x="1008" y="368.04" textAnchor="middle" fill="#78716C" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4">
                      sales · support · ops · research
                    </text>
                  </g>
                  <rect x="858" y="300.04" width="300" height="76" fill="transparent" />
                </g>

                <g>
                  <ellipse cx="1008" cy="262" rx="139.3" ry="39.6" fill="#4A3B33" opacity="0.07" filter="url(#svBlur)" />
                  <ellipse cx="1008" cy="240" rx="176.8" ry="73" fill="url(#svHalo)" opacity={hoveredIndex === 2 ? 0.8 : 0.4} />
                  <polygon points="853.2,236 1008,291.04 1008,300.04 853.2,245" fill="#F1E9DA" />
                  <polygon points="1008,291.04 1162.8,236 1162.8,245 1008,300.04" fill="#E4D9BC" />
                  <polygon points="1008,180.96 1162.8,236 1008,291.04 853.2,236" fill="url(#svTop)" strokeWidth="1.4" stroke="#B45309" />
                  <polyline points="853.2,236 1008,291.04 1162.8,236" fill="none" strokeWidth="1.6" strokeLinejoin="round" stroke="#B45309" opacity="0.9" />

                  {/* Surface Grid */}
                  <g transform="matrix(0.9 0.32 -0.9 0.32 1008 236)">
                    <rect x="-80" y="-80" width="160" height="160" rx="4" fill="none" stroke="#F1E9DA" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <g stroke="#F6F0E4" strokeWidth="0.8">
                      <line x1="-53.3" y1="-80" x2="-53.3" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="-53.3" x2="80" y2="-53.3" vectorEffect="non-scaling-stroke" />
                      <line x1="-26.7" y1="-80" x2="-26.7" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="-26.7" x2="80" y2="-26.7" vectorEffect="non-scaling-stroke" />
                      <line x1="0" y1="-80" x2="0" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="0" x2="80" y2="0" vectorEffect="non-scaling-stroke" />
                      <line x1="26.7" y1="-80" x2="26.7" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="26.7" x2="80" y2="26.7" vectorEffect="non-scaling-stroke" />
                      <line x1="53.3" y1="-80" x2="53.3" y2="80" vectorEffect="non-scaling-stroke" />
                      <line x1="-80" y1="53.3" x2="80" y2="53.3" vectorEffect="non-scaling-stroke" />
                    </g>
                    <rect x="-68" y="-54" width="60" height="44" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <rect x="-60" y="-20" width="44" height="4" rx="1.5" fill="#F1E9DA" />
                    <rect x="-60" y="-20" height="4" rx="1.5" fill="#B45309" width="34px" />
                    
                    <rect x="8" y="-54" width="60" height="44" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <rect x="16" y="-20" width="44" height="4" rx="1.5" fill="#F1E9DA" />
                    <rect x="16" y="-20" height="4" rx="1.5" fill="#B45309" width="18px" />

                    <rect x="-68" y="10" width="60" height="44" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <rect x="-60" y="44" width="44" height="4" rx="1.5" fill="#F1E9DA" />
                    <rect x="-60" y="44" height="4" rx="1.5" fill="#B45309" width="28px" />

                    <rect x="8" y="10" width="60" height="44" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <rect x="16" y="44" width="44" height="4" rx="1.5" fill="#F1E9DA" />
                    <rect x="16" y="44" height="4" rx="1.5" fill="#B45309" width="40px" />

                    <line x1="-17.1" x2="-17.1" y1="-80" y2="80" stroke="#B45309" strokeWidth="1.2" vectorEffect="non-scaling-stroke" opacity="0.5" />
                    <circle cx="0" cy="0" r="7" fill="#FDFBF7" stroke="#B45309" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                    <circle cx="0" cy="0" r="3" fill="#B45309" />
                  </g>

                  {/* Agent Department Labels */}
                  <g>
                    <text x="1007.1" y="212" textAnchor="middle" fill="#4A3B33" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="700" letterSpacing="1">SALES</text>
                    <text x="1007.1" y="221" textAnchor="middle" fill="#A16207" fontSize="6.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.3">1,284 tasks</text>
                  </g>
                  <g>
                    <text x="1075.5" y="236.3" textAnchor="middle" fill="#4A3B33" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="700" letterSpacing="1">SUPPORT</text>
                    <text x="1075.5" y="245.3" textAnchor="middle" fill="#A16207" fontSize="6.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.3">3,920 tasks</text>
                  </g>
                  <g>
                    <text x="949.5" y="232.5" textAnchor="middle" fill="#4A3B33" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="700" letterSpacing="1">OPS</text>
                    <text x="949.5" y="241.5" textAnchor="middle" fill="#A16207" fontSize="6.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.3">812 tasks</text>
                  </g>
                  <g>
                    <text x="1017.9" y="256.8" textAnchor="middle" fill="#4A3B33" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="700" letterSpacing="1">RESEARCH</text>
                    <text x="1017.9" y="265.8" textAnchor="middle" fill="#A16207" fontSize="6.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.3">356 tasks</text>
                  </g>
                  <text x="869.2" y="238.5" fontSize="6.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.8" fill="#A8A29E">L03</text>
                </g>
              </g>

              {/* Bottom Telemetry Bar */}
              <g pointerEvents="none" opacity={hoveredIndex !== null ? 0.25 : 1} style={{ transition: "opacity 0.3s" }}>
                <g>
                  <text x="24" y="432" fill="#78716C" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.2">MEMORY RETAINED</text>
                  <text x="294" y="432" textAnchor="end" fill="#4A3B33" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">100%</text>
                  <rect x="24" y="442" width="270" height="3" rx="1.5" fill="#F1E9DA" />
                  <rect x="24" y="442" width="270" height="3" rx="1.5" fill="#B45309" />
                </g>
                <g>
                  <text x="318" y="432" fill="#78716C" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.2">AGENT DOWNTIME</text>
                  <text x="588" y="432" textAnchor="end" fill="#4A3B33" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">0.0s</text>
                  <rect x="318" y="442" width="270" height="3" rx="1.5" fill="#F1E9DA" />
                  <rect x="318" y="442" width="0" height="3" rx="1.5" fill="#B45309" />
                </g>
                <g>
                  <text x="612" y="432" fill="#78716C" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.2">HOT-SWAPS</text>
                  <text x="882" y="432" textAnchor="end" fill="#4A3B33" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">22</text>
                  <rect x="612" y="442" width="270" height="3" rx="1.5" fill="#F1E9DA" />
                  <rect x="612" y="442" width="60" height="3" rx="1.5" fill="#B45309" />
                </g>
                <g>
                  <text x="906" y="432" fill="#78716C" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.2">CONTEXT RESETS</text>
                  <text x="1176" y="432" textAnchor="end" fill="#4A3B33" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">never</text>
                  <rect x="906" y="442" width="270" height="3" rx="1.5" fill="#F1E9DA" />
                  <rect x="906" y="442" width="0" height="3" rx="1.5" fill="#B45309" />
                </g>
              </g>

              {/* Bottom Separator & Footer Label */}
              <g pointerEvents="none">
                <line x1="24" y1="484" x2="1176" y2="484" stroke="#E4D9BC" strokeWidth="1" />
                <text x="24" y="504" fill="#A8A29E" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4">
                  context_sovereignty.live · 4 models · 1 context layer · 4 agents
                </text>
                <text x="1176" y="504" textAnchor="end" fill="#A16207" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4" fontWeight="600">
                  HOVER A LAYER OR DOCK A MODEL
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
                    <div className="p-4">
                      {/* Eyebrow & LIVE badge */}
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#B45309]">
                          {activeData.eyebrow}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#A8A29E]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#B45309] animate-pulse" />
                          live
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="mt-2 text-[15px] font-bold leading-snug text-[#4A3B33] font-serif">
                        {activeData.title}
                      </h4>

                      {/* Body */}
                      <p className="mt-1.5 text-[11.5px] leading-[1.6] text-[#57534E]">
                        {activeData.body}
                      </p>

                      {/* Vertical Key-Value Stats */}
                      <dl className="mt-3 space-y-1.5 border-t border-[#F1E9DA] pt-3">
                        {activeData.stats.map(([k, v]) => (
                          <div key={k} className="flex items-baseline justify-between gap-3">
                            <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#A8A29E]">{k}</dt>
                            <dd className="font-mono text-[11px] font-semibold tabular-nums text-[#4A3B33]">{v}</dd>
                          </div>
                        ))}
                      </dl>

                      {/* Code Pill */}
                      {activeData.code && (
                        <div className="mt-3 rounded-md border border-[#F1E9DA] bg-[#F8F4EE] px-2.5 py-1.5 font-mono text-[10px] text-[#57534E]">
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
