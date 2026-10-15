"use client";

import React from "react";

export default function Service3DVisualizer({ serviceId }) {
  // 1. Rapid MVP: 4-Tier 3D Isometric Rounded Glassmorphic Architecture
  if (serviceId === "mvp-build") {
    const tiers = [
      { id: 4, name: "L04 · NEXT.JS 15 CLIENT", y: 38, fill: "url(#svcGlassTop4)", stroke: "#B45309", sub: "Interactive UI & 3D Web" },
      { id: 3, name: "L03 · API & MICROSERVICES", y: 68, fill: "url(#svcGlassTop3)", stroke: "#E4C090", sub: ".NET 8 · FastAPI · JWT" },
      { id: 2, name: "L02 · STORAGE & CACHE", y: 98, fill: "url(#svcGlassTop2)", stroke: "#E4C090", sub: "PostgreSQL · Redis WAL" },
      { id: 1, name: "L01 · CLOUD & DEVOPS", y: 128, fill: "url(#svcGlassTop1)", stroke: "#C4A885", sub: "Docker · Vercel Edge · CI/CD" },
    ];

    return (
      <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-center select-none overflow-visible">
        <svg
          viewBox="0 0 340 180"
          className="w-full h-full max-h-[220px] overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="svcGlassTop4" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FDFBF7" />
              <stop offset="100%" stopColor="#F5EFE3" />
            </linearGradient>
            <linearGradient id="svcGlassTop3" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#FAF6EE" />
              <stop offset="100%" stopColor="#F2E9DB" />
            </linearGradient>
            <linearGradient id="svcGlassTop2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#F7F1E6" />
              <stop offset="100%" stopColor="#EFE5D4" />
            </linearGradient>
            <linearGradient id="svcGlassTop1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#F4EDE0" />
              <stop offset="100%" stopColor="#EBDDCB" />
            </linearGradient>
            <linearGradient id="svcSide" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E6DCBF" />
              <stop offset="100%" stopColor="#CBBFA3" />
            </linearGradient>
            <filter id="svcGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="svcFloor">
              <stop offset="0%" stopColor="#B45309" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Telemetry Header */}
          <circle cx="16" cy="18" r="2.5" fill="#B45309" />
          <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
            SPRINT ARCHITECTURE // 4_TIER_STACK
          </text>
          <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            14 – 28 DAYS TURNAROUND
          </text>

          {/* Ambient Floor Glow */}
          <ellipse cx="170" cy="146" rx="90" ry="24" fill="url(#svcFloor)" opacity="0.6" />

          {/* 4 Rounded 3D Glassmorphic Slabs */}
          {tiers.map((tier) => {
            const ty = tier.y;
            return (
              <g key={tier.id}>
                {/* 3D Extrusion Side Bevel */}
                <g transform={`matrix(0.894 0.36 -0.894 0.36 170 ${ty + 4})`}>
                  <rect
                    x="-68"
                    y="-68"
                    width="136"
                    height="136"
                    rx="18"
                    fill="url(#svcSide)"
                    stroke="#B45309"
                    strokeWidth="0.8"
                    strokeOpacity="0.3"
                  />
                </g>

                {/* Top Glass Face */}
                <g transform={`matrix(0.894 0.36 -0.894 0.36 170 ${ty})`}>
                  <rect
                    x="-68"
                    y="-68"
                    width="136"
                    height="136"
                    rx="18"
                    fill={tier.fill}
                    stroke={tier.stroke}
                    strokeWidth="1.2"
                  />
                  <rect x="-64" y="-64" width="128" height="128" rx="15" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />

                  {/* Surface micro-circuit etchings */}
                  <circle cx="0" cy="0" r="16" fill="rgba(180,83,9,0.06)" stroke="#B45309" strokeWidth="0.8" strokeDasharray="2 2" />
                  <circle cx="0" cy="0" r="3" fill="#B45309" />
                  <line x1="-38" y1="0" x2="-16" y2="0" stroke="#E4D9BC" strokeWidth="1" />
                  <line x1="16" y1="0" x2="38" y2="0" stroke="#E4D9BC" strokeWidth="1" />
                  <circle cx="-38" cy="0" r="2" fill="#B45309" />
                  <circle cx="38" cy="0" r="2" fill="#B45309" />
                </g>

                {/* Front Label Pill */}
                <g transform={`translate(170, ${ty + 6})`}>
                  <rect x="-65" y="-7" width="130" height="14" rx="3" fill="rgba(255,255,255,0.92)" stroke="#E4D9BC" strokeWidth="0.8" />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill="#4A3B33"
                    fontSize="7"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="700"
                    letterSpacing="0.6"
                  >
                    {tier.name}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Central Vertical Laser Data Spine with Streaming SVG Pulses */}
          <line x1="170" y1="36" x2="170" y2="136" stroke="#B45309" strokeWidth="1" strokeDasharray="2 4" opacity="0.7" />
          <circle cx="170" r="2.5" fill="#B45309" filter="url(#svcGlow)">
            <animate attributeName="cy" values="134;38;134" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2.4s" repeatCount="indefinite" />
          </circle>

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

  // 2. Chrome Extensions & Browser Tools: 3D Isometric Glass Platform
  if (serviceId === "chrome-extensions" || serviceId === "ai-agents-rag") {
    return (
      <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-center select-none overflow-visible">
        <svg
          viewBox="0 0 340 180"
          className="w-full h-full max-h-[220px] overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="extBase" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FDFBF7" />
              <stop offset="100%" stopColor="#FAF5EB" />
            </linearGradient>
            <filter id="extGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Telemetry Header */}
          <circle cx="16" cy="18" r="2.5" fill="#B45309" />
          <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
            EXTENSION ENGINE // MANIFEST_V3
          </text>
          <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            CHROME WEB STORE READY
          </text>

          {/* 3D Isometric Rounded Glass Platform Base */}
          <g transform="matrix(0.894 0.36 -0.894 0.36 170 102)">
            <rect x="-85" y="-85" width="170" height="170" rx="22" fill="#E8DFCC" opacity="0.6" />
          </g>
          <g transform="matrix(0.894 0.36 -0.894 0.36 170 96)">
            <rect x="-85" y="-85" width="170" height="170" rx="22" fill="url(#extBase)" stroke="#B45309" strokeWidth="1.2" />
            <rect x="-80" y="-80" width="160" height="160" rx="18" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="54" fill="none" stroke="#E4D9BC" strokeWidth="1" strokeDasharray="3 3" />
          </g>

          {/* Connecting Laser Beams between pods */}
          <line x1="170" y1="92" x2="170" y2="46" stroke="#B45309" strokeWidth="1.2" strokeDasharray="2 3" />
          <circle cx="170" r="2.2" fill="#B45309" filter="url(#extGlow)">
            <animate attributeName="cy" values="92;46;92" dur="2s" repeatCount="indefinite" />
          </circle>

          <line x1="170" y1="92" x2="236" y2="120" stroke="#059669" strokeWidth="1.2" strokeDasharray="2 3" />
          <circle cx="236" cy="120" r="2.2" fill="#059669" filter="url(#extGlow)">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2.4s" repeatCount="indefinite" />
          </circle>

          <line x1="170" y1="92" x2="104" y2="120" stroke="#B45309" strokeWidth="1.2" strokeDasharray="2 3" />

          {/* Central Service Worker 3D Capsule */}
          <g transform="translate(170, 92)">
            <circle r="18" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.5" />
            <circle r="7" fill="#FAF6EE" stroke="#B45309" strokeWidth="1.2" />
            <circle r="3" fill="#B45309" />
            <text y="28" textAnchor="middle" fill="#4A3B33" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">
              Service Worker (MV3)
            </text>
          </g>

          {/* Top Pod: Persistent Storage */}
          <g transform="translate(170, 46)">
            <rect x="-42" y="-12" width="84" height="22" rx="5" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.2" />
            <circle cx="-32" cy="-1" r="2.5" fill="#10B981" />
            <text x="3" y="2.5" textAnchor="middle" fill="#B45309" fontSize="6.8" fontFamily="JetBrains Mono, monospace" fontWeight="700">
              chrome.storage
            </text>
          </g>

          {/* Right Pod: Content Script */}
          <g transform="translate(236, 120)">
            <rect x="-40" y="-12" width="80" height="22" rx="5" fill="#FFFFFF" stroke="#059669" strokeWidth="1.2" />
            <circle cx="-30" cy="-1" r="2.5" fill="#059669" />
            <text x="2" y="2.5" textAnchor="middle" fill="#059669" fontSize="6.8" fontFamily="JetBrains Mono, monospace" fontWeight="700">
              Content Script
            </text>
          </g>

          {/* Left Pod: Popup & Biometric UI */}
          <g transform="translate(104, 120)">
            <rect x="-42" y="-12" width="84" height="22" rx="5" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.2" />
            <circle cx="-32" cy="-1" r="2.5" fill="#B45309" />
            <text x="2" y="2.5" textAnchor="middle" fill="#4A3B33" fontSize="6.8" fontFamily="JetBrains Mono, monospace" fontWeight="700">
              Popup &amp; WebAuthn
            </text>
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

  // 3. High-Scale APIs & Cloud Automations (Centrix 3D Streaming Conveyor)
  if (serviceId === "api-automation") {
    return (
      <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-center select-none overflow-visible">
        <svg
          viewBox="0 0 340 180"
          className="w-full h-full max-h-[220px] overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="pipeGlass" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#FAF6EE" />
              <stop offset="100%" stopColor="#F5EFE3" />
            </linearGradient>
            <radialGradient id="pipeFloor">
              <stop offset="0%" stopColor="#B45309" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
            </radialGradient>
            <filter id="pipeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="16" cy="18" r="2.5" fill="#B45309" />
          <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
            CLOUD AUTOMATION // STREAM_PIPELINE
          </text>
          <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            500+ NODES · ZERO RAM LEAK
          </text>

          {/* Ambient Floor Glow */}
          <ellipse cx="170" cy="138" rx="130" ry="22" fill="url(#pipeFloor)" opacity="0.6" />

          {/* 3D Isometric Pipeline Stage */}
          <g transform="translate(170, 92)">
            {/* 3D Extrusion Bevel */}
            <rect x="-140" y="-31" width="280" height="72" rx="14" fill="#E6DCBF" opacity="0.6" />
            {/* Base platform */}
            <rect x="-140" y="-36" width="280" height="72" rx="14" fill="url(#pipeGlass)" stroke="#E4D9BC" strokeWidth="1.2" />

            {/* Ingestion Station: Drive API */}
            <g transform="translate(-95, 0)">
              <rect x="-35" y="-22" width="70" height="44" rx="6" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1.2" />
              <circle cx="-25" cy="-12" r="2.5" fill="#10B981" />
              <text x="0" y="-3" textAnchor="middle" fill="#4A3B33" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                Drive API
              </text>
              <text x="0" y="10" textAnchor="middle" fill="#78716C" fontSize="6" fontFamily="JetBrains Mono, monospace">
                500+ Centers
              </text>
            </g>

            {/* Central Transform Worker: .NET 8 Stream */}
            <g transform="translate(0, 0)">
              <rect x="-42" y="-26" width="84" height="52" rx="8" fill="#FAF6EE" stroke="#B45309" strokeWidth="1.5" />
              <circle cx="0" cy="-14" r="3" fill="#B45309" />
              <text x="0" y="-2" textAnchor="middle" fill="#B45309" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                .NET 8 Worker
              </text>
              <text x="0" y="10" textAnchor="middle" fill="#78716C" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
                Zero-RAM Sync
              </text>
            </g>

            {/* Destination Node: YouTube / CDN */}
            <g transform="translate(95, 0)">
              <rect x="-35" y="-22" width="70" height="44" rx="6" fill="#FFFFFF" stroke="#059669" strokeWidth="1.2" />
              <circle cx="-25" cy="-12" r="2.5" fill="#059669" />
              <text x="0" y="-3" textAnchor="middle" fill="#059669" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                Cloud Dest
              </text>
              <text x="0" y="10" textAnchor="middle" fill="#78716C" fontSize="6" fontFamily="JetBrains Mono, monospace">
                Chunked Resumable
              </text>
            </g>

            {/* Flow line 1 */}
            <line x1="-60" y1="0" x2="-42" y2="0" stroke="#B45309" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="-51" cy="0" r="2.5" fill="#B45309" filter="url(#pipeGlow)">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
            </circle>

            {/* Flow line 2 */}
            <line x1="42" y1="0" x2="60" y2="0" stroke="#059669" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="51" cy="0" r="2.5" fill="#059669" filter="url(#pipeGlow)">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
            </circle>
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

  // 4. Performance & Latency Audit: 3D Benchmark Stage
  return (
    <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-center select-none overflow-visible">
      <svg
        viewBox="0 0 340 180"
        className="w-full h-full max-h-[220px] overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="perfFloor">
            <stop offset="0%" stopColor="#B45309" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="16" cy="18" r="2.5" fill="#B45309" />
        <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
          PERFORMANCE AUDIT // LATENCY
        </text>
        <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          26x SPEEDUP · 99+ LIGHTHOUSE
        </text>

        {/* Ambient Floor Glow */}
        <ellipse cx="170" cy="148" rx="130" ry="22" fill="url(#perfFloor)" opacity="0.6" />

        {/* 3D Rounded Glass Benchmark Grid */}
        <g transform="translate(30, 40)">
          {/* 3D Extrusion Bevel */}
          <rect y="5" width="280" height="104" rx="10" fill="#E6DCBF" opacity="0.6" />
          <rect width="280" height="104" rx="10" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1.2" />

          {/* Grid lines */}
          <line x1="20" y1="30" x2="260" y2="30" stroke="#F6F0E4" strokeWidth="0.8" />
          <line x1="20" y1="58" x2="260" y2="58" stroke="#F6F0E4" strokeWidth="0.8" />
          <line x1="20" y1="86" x2="260" y2="86" stroke="#F6F0E4" strokeWidth="0.8" />

          {/* Before Curve: Red High Variance */}
          <path
            d="M 20 40 Q 60 15 100 65 T 180 25 T 260 55"
            fill="none"
            stroke="#EF4444"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            opacity="0.65"
          />
          <text x="260" y="32" textAnchor="end" fill="#EF4444" fontSize="6.8" fontFamily="JetBrains Mono, monospace">
            Before: 840ms p95
          </text>

          {/* After Curve: Green Razor Fast Sub-50ms */}
          <path
            d="M 20 86 Q 80 84 140 85 T 260 85"
            fill="none"
            stroke="#059669"
            strokeWidth="2.2"
          />
          <text x="260" y="78" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">
            After: 32ms p95
          </text>

          {/* Metric Badge */}
          <rect x="20" y="10" width="74" height="15" rx="3" fill="#FAF6EE" stroke="#B45309" strokeWidth="0.8" />
          <text x="57" y="20.5" textAnchor="middle" fill="#B45309" fontSize="6.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">
            26x Faster
          </text>
        </g>

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
