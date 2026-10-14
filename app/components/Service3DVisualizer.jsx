"use client";

import React from "react";

export default function Service3DVisualizer({ serviceId }) {
  // 1. Rapid MVP: 4-Tier 3D Isometric Sprint Architecture
  if (serviceId === "mvp-build") {
    const tiers = [
      { id: 4, name: "L04 Frontend", y: 35, fill: "#FFFFFF", stroke: "#B45309" },
      { id: 3, name: "L03 API Engine", y: 65, fill: "#F5EBDC", stroke: "#E4C090" },
      { id: 2, name: "L02 Database", y: 95, fill: "#EFE2CD", stroke: "#D4B895" },
      { id: 1, name: "L01 Edge Cloud", y: 125, fill: "#E8D8BF", stroke: "#C4A885" },
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
            SPRINT ARCHITECTURE // 4_TIER_STACK
          </text>
          <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            14 – 28 DAYS TURNAROUND
          </text>

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

          {/* Telemetry Footer */}
          <line x1="16" y1="168" x2="324" y2="168" stroke="#E4D9BC" strokeWidth="0.8" strokeDasharray="2 4" />
          <text x="16" y="162" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono, monospace">
            DELIVERY: WEEKLY STAGING RELEASES
          </text>
          <text x="324" y="162" textAnchor="end" fill="#B45309" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            100% IP &amp; SOURCE TRANSFER
          </text>
        </svg>
      </div>
    );
  }

  // 2. Chrome Extensions & Browser Tools: Manifest V3 Architecture
  if (serviceId === "chrome-extensions" || serviceId === "ai-agents-rag") {
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
            EXTENSION ENGINE // MANIFEST_V3
          </text>
          <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            CHROME WEB STORE READY
          </text>

          <g transform="translate(170, 90)">
            <polygon
              points="0,-56 56,-28 56,28 0,56 -56,28 -56,-28"
              fill="none"
              stroke="#E4D9BC"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            <line x1="0" y1="0" x2="0" y2="-56" stroke="#B45309" strokeWidth="1.4" />
            <line x1="0" y1="0" x2="56" y2="28" stroke="#E4C090" strokeWidth="1.4" />
            <line x1="0" y1="0" x2="-56" y2="28" stroke="#E4C090" strokeWidth="1.4" />

            {/* Central Service Worker */}
            <circle r="14" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.5" />
            <circle r="5" fill="#B45309" />
            <text y="-17" textAnchor="middle" fill="#4A3B33" fontSize="8" fontFamily="monospace" fontWeight="bold">
              Service Worker
            </text>

            {/* Top Node: Local Storage */}
            <g transform="translate(0, -56)">
              <circle r="8" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.2" />
              <circle r="3" fill="#B45309" />
              <text y="-11" textAnchor="middle" fill="#B45309" fontSize="7.5" fontFamily="monospace" fontWeight="600">
                chrome.storage
              </text>
            </g>

            {/* Right Node: Content Script */}
            <g transform="translate(56, 28)">
              <circle r="8" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1.2" />
              <circle r="3" fill="#78716C" />
              <text y="18" textAnchor="middle" fill="#78716C" fontSize="7.5" fontFamily="monospace">
                Content Script
              </text>
            </g>

            {/* Left Node: Popup & Tab UI */}
            <g transform="translate(-56, 28)">
              <circle r="8" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1.2" />
              <circle r="3" fill="#78716C" />
              <text y="18" textAnchor="middle" fill="#78716C" fontSize="7.5" fontFamily="monospace">
                Popup / HUD UI
              </text>
            </g>
          </g>

          <line x1="16" y1="168" x2="324" y2="168" stroke="#E4D9BC" strokeWidth="0.8" strokeDasharray="2 4" />
          <text x="16" y="162" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono, monospace">
            PERMISSIONS: MINIMAL SCOPE &amp; ZERO TRACKING
          </text>
          <text x="324" y="162" textAnchor="end" fill="#B45309" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            SUB-10MS TAB ACTIONS
          </text>
        </svg>
      </div>
    );
  }

  // 3. High-Scale APIs & Cloud Automations (Centrix / Nexus Streamer Topology)
  if (serviceId === "api-automation") {
    return (
      <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-center select-none overflow-visible">
        <svg
          viewBox="0 0 340 180"
          className="w-full h-full max-h-[220px] overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle cx="16" cy="18" r="2.5" fill="#B45309" />
          <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
            CLOUD AUTOMATION // STREAM_PIPELINE
          </text>
          <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            500+ NODES · ZERO RAM LEAK
          </text>

          {/* 3 Step Pipeline Graphic */}
          <g transform="translate(40, 85)">
            {/* Step 1: Input source */}
            <rect x="0" y="-20" width="60" height="40" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1.2" />
            <text x="30" y="3" textAnchor="middle" fill="#4A3B33" fontSize="7.5" fontFamily="monospace" fontWeight="bold">Drive / Files</text>

            {/* Arrow 1 */}
            <line x1="65" y1="0" x2="95" y2="0" stroke="#B45309" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Step 2: Core Processing Worker */}
            <rect x="100" y="-25" width="70" height="50" rx="4" fill="#FAF6EE" stroke="#B45309" strokeWidth="1.5" />
            <text x="135" y="-3" textAnchor="middle" fill="#B45309" fontSize="8" fontFamily="monospace" fontWeight="bold">.NET 8 Worker</text>
            <text x="135" y="11" textAnchor="middle" fill="#78716C" fontSize="6.5" fontFamily="monospace">Stream Pipe</text>

            {/* Arrow 2 */}
            <line x1="175" y1="0" x2="205" y2="0" stroke="#B45309" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Step 3: Destination Sync */}
            <rect x="210" y="-20" width="60" height="40" rx="4" fill="#FFFFFF" stroke="#059669" strokeWidth="1.2" />
            <text x="240" y="3" textAnchor="middle" fill="#059669" fontSize="7.5" fontFamily="monospace" fontWeight="bold">Cloud Dest</text>
          </g>

          <line x1="16" y1="168" x2="324" y2="168" stroke="#E4D9BC" strokeWidth="0.8" strokeDasharray="2 4" />
          <text x="16" y="162" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono, monospace">
            CENTRIX ENGINE: 20,000+ LECTURES / DAY
          </text>
          <text x="324" y="162" textAnchor="end" fill="#B45309" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            ZERO EGRESS COST
          </text>
        </svg>
      </div>
    );
  }

  // 4. Performance & Audit: Latency Compressor
  return (
    <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-center select-none overflow-visible">
      <svg
        viewBox="0 0 340 180"
        className="w-full h-full max-h-[220px] overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx="16" cy="18" r="2.5" fill="#B45309" />
        <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
          PERFORMANCE AUDIT // LATENCY
        </text>
        <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          26x SPEEDUP · 99+ LIGHTHOUSE
        </text>

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

        <line x1="16" y1="168" x2="324" y2="168" stroke="#E4D9BC" strokeWidth="0.8" strokeDasharray="2 4" />
        <text x="16" y="162" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono, monospace">
          DATABASE: N+1 QUERY TUNING &amp; INDEXES
        </text>
        <text x="324" y="162" textAnchor="end" fill="#B45309" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          EDGE CACHING OPTIMIZED
        </text>
      </svg>
    </div>
  );
}
