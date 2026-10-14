"use client";

import React, { useState, useRef, useMemo } from "react";
import { sound } from "../utils/sound";
import { X, ArrowUpRight } from "lucide-react";

// 12 Months of real GitHub contribution timeline across both accounts
const MONTHS = [
  { label: "Nov 25", month: "November 2025", aniket0: 5, mishra: 20, combined: 25 },
  { label: "Dec 25", month: "December 2025", aniket0: 65, mishra: 6, combined: 71 },
  { label: "Jan 26", month: "January 2026", aniket0: 138, mishra: 35, combined: 173 },
  { label: "Feb 26", month: "February 2026", aniket0: 30, mishra: 0, combined: 30 },
  { label: "Mar 26", month: "March 2026", aniket0: 44, mishra: 0, combined: 44 },
  { label: "Apr 26", month: "April 2026", aniket0: 20, mishra: 2, combined: 22 },
  { label: "May 26", month: "May 2026", aniket0: 173, mishra: 0, combined: 173 },
  { label: "Jun 26", month: "June 2026", aniket0: 114, mishra: 1, combined: 115 },
  { label: "Jul 26", month: "July 2026", aniket0: 0, mishra: 0, combined: 0 },
  { label: "Aug 26", month: "August 2026", aniket0: 2, mishra: 1, combined: 3 },
  { label: "Sep 26", month: "September 2026", aniket0: 9, mishra: 5, combined: 14 },
  { label: "Oct 26", month: "October 2026", aniket0: 1, mishra: 28, combined: 29 },
];

const SERIES = [
  {
    key: "combined",
    label: "Combined Velocity",
    badge: "All Commits",
    color: "#B45309",
    v: 0, // Frontmost 3D ribbon
    width: 3.4,
    total: 699,
    repos: 64,
    peak: "173 / mo",
    peakMonth: "May 2026",
    tag: "Unified Metrics",
    points: MONTHS.map((m) => m.combined),
    url: "https://github.com/aniketmishra-0",
    panel: {
      eyebrow: "CROSS-PROFILE AGGREGATE",
      title: "Consolidated Engineering Velocity",
      body: "Combined output across @aniketmishra-0 and @Mishra-Aniket. Encompasses enterprise lecture pipelines, document intelligence, Chrome extensions, and full-stack web applications.",
      code: "git.aggregate({ accounts: 2, repos: 64, contributions: 699 })",
      highlight: "Peak velocity: 173 commits in a single month"
    }
  },
  {
    key: "aniket0",
    label: "aniketmishra-0",
    badge: "Primary / Systems",
    color: "#059669",
    v: 70, // Middle 3D ribbon
    width: 2.5,
    total: 601,
    repos: 35,
    peak: "173 / mo",
    peakMonth: "May 2026",
    tag: "Production Systems",
    points: MONTHS.map((m) => m.aniket0),
    url: "https://github.com/aniketmishra-0",
    panel: {
      eyebrow: "PRIMARY PROFILE · PRODUCTION & OPS",
      title: "Enterprise Systems & Public Releases",
      body: "Houses Centrix (.NET 8/Drive API for 500+ PW centers), Qpic (Python/FastAPI/Flutter), OmTabs & OmSpace extensions, ImgWorld, and RadialMenu releases.",
      code: "https://github.com/aniketmishra-0",
      highlight: "601 verified contributions · 35 public repositories"
    }
  },
  {
    key: "mishra",
    label: "Mishra-Aniket",
    badge: "OSS / R&D",
    color: "#6366F1",
    v: 140, // Backmost 3D ribbon
    width: 2.2,
    total: 98,
    repos: 29,
    peak: "35 / mo",
    peakMonth: "Jan 2026",
    tag: "OSS Architecture",
    points: MONTHS.map((m) => m.mishra),
    url: "https://github.com/Mishra-Aniket",
    panel: {
      eyebrow: "SECONDARY PROFILE · OSS & ARCHITECTURE",
      title: "Core Web, R&D & Explorations",
      body: "Houses foundational experiments, architecture blueprints, TypeScript utilities, and independent open-source web systems.",
      code: "https://github.com/Mishra-Aniket",
      highlight: "98 verified contributions · 29 public repositories"
    }
  }
];

// Isometric matrix transformation constants
const IA = 0.9;
const IB = 0.32;
const u = (e, t, n = 0) => ({
  x: 220 + IA * (e - t),
  y: 354 + IB * (e + t) - n
});

const m = (pts) => pts.map((p) => `${p.x},${p.y}`).join(" ");

// Map month index (0 to 11) to X distance (0 to 520) along isometric axis
const p = (idx) => (idx / (MONTHS.length - 1)) * 520;

// Continuous interpolation across months
function interpolateSeries(points, N) {
  const step = 520 / (MONTHS.length - 1);
  const idx = Math.min(Math.floor(N / step), MONTHS.length - 2);
  const frac = Math.max(0, Math.min(1, (N - idx * step) / step));
  return points[idx] + (points[idx + 1] - points[idx]) * frac;
}

const Y_TICKS = [0, 50, 100, 150, 200];

export default function AccuracyTerrain() {
  const svgRef = useRef(null);

  // Default resting scrub position: May 2026 (index 6, where peak 173 contributions occurred)
  const defaultParked = (6 / (MONTHS.length - 1)) * 520;
  const [parked, setParked] = useState(defaultParked);
  const [scrub, setScrub] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null); // null or 0, 1, 2 (pinned open)
  const [hoveredSeries, setHoveredSeries] = useState(null); // null or 0, 1, 2 (transient hover)
  const [filterAccount, setFilterAccount] = useState("all"); // "all", "aniket0", "mishra"

  // Active series index for inspection panel and isolation
  const activeIdx = hoveredSeries !== null ? hoveredSeries : selectedSeries;
  const activeSeries = activeIdx !== null ? SERIES[activeIdx] : null;

  // Current position N along isometric axis (0 to 520)
  const N = scrub !== null ? scrub : parked;
  const monthFloat = (N / 520) * (MONTHS.length - 1);
  const nearestMonthIdx = Math.round(monthFloat);
  const currentMonthData = MONTHS[Math.max(0, Math.min(MONTHS.length - 1, nearestMonthIdx))];

  // Live interpolated values
  const interpolatedValues = useMemo(() => {
    return SERIES.map((s) => interpolateSeries(s.points, N));
  }, [N]);

  // Pointer move handler using SVG CTM inverse projection
  const handlePointerMove = (e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;

    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());

    // Bounds of the isometric chart area in SVG space
    if (pt.x > 745 || pt.y < 120 || pt.y > 620) {
      if (scrub !== null) setScrub(null);
      return;
    }

    const s = Math.max(0, Math.min(520, (pt.x - 220) / IA + 70));
    setScrub(s);
  };

  const handlePointerLeave = () => {
    setScrub(null);
  };

  return (
    <div id="accuracy-terrain" className="relative w-full select-none">
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] pb-20 md:pb-28">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E4D9BC] bg-white text-[#B45309] font-mono text-[11px] font-bold tracking-wider uppercase mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#B45309] animate-pulse" />
            <span>Real GitHub Contribution Terrain · 2 Active Profiles</span>
          </div>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight font-serif font-bold text-[#4A3B33] text-balance">
            699+ Contributions &amp;{" "}
            <span className="text-[#B45309] italic font-normal">64 Repositories</span>.
          </h2>
          <p className="mt-2 text-sm text-[#78716C] max-w-2xl mx-auto font-sans">
            Live 3D telemetry visualized across both GitHub accounts:{" "}
            <a
              href="https://github.com/aniketmishra-0"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-semibold text-[#059669] hover:underline"
            >
              @aniketmishra-0
            </a>{" "}
            (Production Systems) and{" "}
            <a
              href="https://github.com/Mishra-Aniket"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-semibold text-[#6366F1] hover:underline"
            >
              @Mishra-Aniket
            </a>{" "}
            (OSS &amp; Core).
          </p>

          {/* Quick Profile Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <button
              onClick={() => {
                sound.playClick();
                setFilterAccount("all");
                setSelectedSeries(null);
                setHoveredSeries(null);
              }}
              className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                filterAccount === "all"
                  ? "bg-[#B45309] text-white shadow-xs"
                  : "bg-white text-[#78716C] border border-[#E4D9BC] hover:text-[#4A3B33]"
              }`}
            >
              All Activity (699 Total)
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilterAccount("aniket0");
                setSelectedSeries(1);
                setHoveredSeries(null);
              }}
              className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                filterAccount === "aniket0"
                  ? "bg-[#059669] text-white shadow-xs"
                  : "bg-white text-[#78716C] border border-[#E4D9BC] hover:text-[#059669]"
              }`}
            >
              @aniketmishra-0 (601 Commits · 35 Repos)
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilterAccount("mishra");
                setSelectedSeries(2);
                setHoveredSeries(null);
              }}
              className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                filterAccount === "mishra"
                  ? "bg-[#6366F1] text-white shadow-xs"
                  : "bg-white text-[#78716C] border border-[#E4D9BC] hover:text-[#6366F1]"
              }`}
            >
              @Mishra-Aniket (98 Commits · 29 Repos)
            </button>
          </div>
        </div>

        {/* 3D Terrain Container */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[240/171] select-none">
          <svg
            ref={svgRef}
            viewBox="0 0 960 684"
            className="w-full h-full block overflow-visible"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Isometric 3D chart of real GitHub contributions across two accounts."
            onPointerMove={handlePointerMove}
            onMouseMove={handlePointerMove}
            onTouchMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onMouseLeave={handlePointerLeave}
            style={{ cursor: scrub !== null ? "ew-resize" : "crosshair", touchAction: "none" }}
          >
            <defs>
              <linearGradient id="bmTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FBF6EE" />
              </linearGradient>
              <filter id="bmGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="2.6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {SERIES.map((s) => (
                <linearGradient key={s.key} id={`bmWall-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.color} stopOpacity={s.key === "combined" ? 0.36 : 0.28} />
                  <stop offset="100%" stopColor={s.color} stopOpacity="0.04" />
                </linearGradient>
              ))}
            </defs>

            {/* Top-Right HUD Header */}
            <g pointerEvents="none">
              <rect x="744" y="28" width="7" height="7" fill="#B45309" />
              <text x="757" y="35" fill="#78716C" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6" fontWeight="600">
                GITHUB // VELOCITY_TERRAIN
              </text>
              <text x="744" y="52" fill="#A8A29E" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
                {currentMonthData.month.toUpperCase()} · {currentMonthData.combined} COMMITS
              </text>
              <text x="936" y="52" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1" fontWeight="700">
                VERIFIED
              </text>
              <circle cx="882" cy="49.5" r="2.4" fill="#059669" opacity="0.95" />

              {/* Progress Checkpoint Segments along months */}
              {MONTHS.map((mObj, idx) => {
                const fill = p(idx) <= N + 0.5 ? "#B45309" : "#E4D9BC";
                return (
                  <rect
                    key={mObj.label}
                    x={744 + idx * 16}
                    y="62"
                    width="13"
                    height="3"
                    rx="1.5"
                    style={{ fill, transition: "fill 0.25s" }}
                  />
                );
              })}

              <text x="744" y="82" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4" fontWeight="600" style={{ fill: "#B45309" }}>
                {activeIdx !== null
                  ? `ISOLATING: ${SERIES[activeIdx].label.toUpperCase()}`
                  : scrub !== null
                  ? `SCRUBBING: ${currentMonthData.month.toUpperCase()}`
                  : "RESTING AT MAY 2026 PEAK SPRINT (173 COMMITS)"}
              </text>
            </g>

            {/* Top-Left series hint */}
            <g pointerEvents="none" opacity={activeIdx === null ? 1 : 0} style={{ transition: "opacity 0.25s" }}>
              <rect x="24" y="32" width="7" height="7" fill="none" stroke="#E4C090" strokeWidth="1" />
              <text x="38" y="39" fill="#A8A29E" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6" fontWeight="600">
                HOVER TO SCRUB TIMELINE · CLICK SERIES TO INSPECT
              </text>
            </g>

            {/* 3D Back Walls & Y-Grid (Contributions Count: 0 to 200) */}
            <g pointerEvents="none">
              <polygon
                points={m([u(-24, -24), u(544, -24), u(544, -24, 180), u(-24, -24, 180)])}
                fill="#FFFFFF"
                fillOpacity="0.6"
                stroke="#E4D9BC"
                strokeWidth="1"
              />
              <polygon
                points={m([u(-24, -24), u(-24, 164), u(-24, 164, 180), u(-24, -24, 180)])}
                fill="#FBF6EE"
                fillOpacity="0.7"
                stroke="#E4D9BC"
                strokeWidth="1"
              />

              {/* Grid Lines */}
              {Y_TICKS.slice(1).map((val) => {
                const n = (val / 200) * 180;
                return (
                  <g key={val} stroke="#E4D9BC" strokeWidth="1" strokeDasharray="3 4">
                    <line x1={u(-24, -24, n).x} y1={u(-24, -24, n).y} x2={u(544, -24, n).x} y2={u(544, -24, n).y} />
                    <line x1={u(-24, -24, n).x} y1={u(-24, -24, n).y} x2={u(-24, 164, n).x} y2={u(-24, 164, n).y} />
                  </g>
                );
              })}

              {/* Y-axis Labels */}
              {Y_TICKS.map((val) => {
                const pt = u(-24, 164, (val / 200) * 180);
                return (
                  <text key={val} x={pt.x - 7} y={pt.y + 3} textAnchor="end" fill="#78716C" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="500">
                    {val}
                  </text>
                );
              })}

              {(() => {
                const pt = u(-24, 164, 90);
                return (
                  <text x={pt.x - 38} y={pt.y} textAnchor="middle" fill="#57534E" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2" fontWeight="600" transform={`rotate(-90 ${pt.x - 38} ${pt.y})`}>
                    COMMITS / MO
                  </text>
                );
              })()}
            </g>

            {/* 3D Isometric Ground Plane & Monthly Timeline Grid */}
            <g pointerEvents="none">
              <polygon
                points={`${u(-24, 164).x},${u(-24, 164).y} ${u(544, 164).x},${u(544, 164).y} ${u(544, 164).x},${u(544, 164).y + 10} ${u(-24, 164).x},${u(-24, 164).y + 10}`}
                fill="#F1E9DA"
              />
              <polygon
                points={`${u(544, -24).x},${u(544, -24).y} ${u(544, 164).x},${u(544, 164).y} ${u(544, 164).x},${u(544, 164).y + 10} ${u(544, -24).x},${u(544, -24).y + 10}`}
                fill="#E4C090"
              />
              <polygon
                points={m([u(-24, -24), u(544, -24), u(544, 164), u(-24, 164)])}
                fill="url(#bmTop)"
                stroke="#E4D9BC"
                strokeWidth="1"
              />

              {/* Monthly grid lines on ground */}
              {MONTHS.map((mObj, idx) => {
                const n = p(idx);
                return (
                  <line
                    key={mObj.label}
                    x1={u(n, -24).x}
                    y1={u(n, -24).y}
                    x2={u(n, 164).x}
                    y2={u(n, 164).y}
                    stroke="#EFE6D6"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                  />
                );
              })}

              {/* Series baseline tracks */}
              {SERIES.map((s) => (
                <line
                  key={s.key}
                  x1={u(-24, s.v).x}
                  y1={u(-24, s.v).y}
                  x2={u(544, s.v).x}
                  y2={u(544, s.v).y}
                  stroke="#EFE6D6"
                  strokeWidth="1"
                />
              ))}

              {/* Monthly labels along bottom edge */}
              {MONTHS.map((mObj, idx) => {
                const pt = u(p(idx), 164);
                return (
                  <text key={mObj.label} x={pt.x - 6} y={pt.y + 22} textAnchor="middle" fill="#78716C" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="500">
                    {mObj.label}
                  </text>
                );
              })}

              {(() => {
                const pt = u(260, 164);
                return (
                  <text x={pt.x - 18} y={pt.y + 44} textAnchor="middle" fill="#57534E" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2" fontWeight="600" transform={`rotate(19.6 ${pt.x - 18} ${pt.y + 44})`}>
                    CONTRIBUTION TIMELINE (2025–2026)
                  </text>
                );
              })()}
            </g>

            {/* 3D Wall Series Curves */}
            {SERIES.map((s, sIdx) => {
              const pts = s.points.map((val, idx) => u(p(idx), s.v, (val / 200) * 180));
              const wallPts = [...pts, u(520, s.v), u(0, s.v)];
              const pathD = `M${pts.map((pt) => `${pt.x},${pt.y}`).join(" L")}`;
              const isDimmed = (activeIdx !== null && activeIdx !== sIdx) || (filterAccount !== "all" && filterAccount !== s.key && s.key !== "combined");

              return (
                <g
                  key={s.key}
                  opacity={isDimmed ? 0.15 : 1}
                  style={{ transition: "opacity 0.3s", cursor: "pointer" }}
                  onClick={() => {
                    sound.playClick();
                    setSelectedSeries(selectedSeries === sIdx ? null : sIdx);
                  }}
                >
                  {/* Extruded gradient wall */}
                  <polygon
                    points={m(wallPts)}
                    fill={`url(#bmWall-${s.key})`}
                    stroke={s.color}
                    strokeOpacity="0.3"
                    strokeWidth="1"
                  />
                  {/* Curved stroke */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={s.width}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Monthly Checkpoint Dots */}
                  {pts.map((pt, cIdx) => (
                    <circle
                      key={cIdx}
                      cx={pt.x}
                      cy={pt.y}
                      r={s.key === "combined" ? 3.6 : 3}
                      fill="#FFFFFF"
                      stroke={s.color}
                      strokeWidth="1.8"
                    />
                  ))}
                </g>
              );
            })}

            {/* DYNAMIC REAL-TIME SLICE PLANE AT CURRENT POSITION N */}
            <g pointerEvents="none">
              <polygon
                points={m([u(N, -24), u(N, 164), u(N, 164, 180), u(N, -24, 180)])}
                fill="#B45309"
                fillOpacity="0.06"
                stroke="#B45309"
                strokeOpacity="0.4"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              <line
                x1={u(N, -24).x}
                y1={u(N, -24).y}
                x2={u(N, 164).x}
                y2={u(N, 164).y}
                stroke="#B45309"
                strokeWidth="1.4"
              />

              {/* Tag at top of slice plane */}
              {(() => {
                const pt = u(N, -24, 192);
                return (
                  <text x={pt.x} y={pt.y} textAnchor="middle" fill="#B45309" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="700" letterSpacing="1">
                    {currentMonthData.label} ({Math.round(interpolatedValues[0])} COMMITS)
                  </text>
                );
              })()}

              {/* 3 Live Indicator Dots on the curves */}
              {SERIES.map((s, sIdx) => {
                const val = interpolatedValues[sIdx];
                const pt = u(N, s.v, (val / 200) * 180);
                const isDimmed = (activeIdx !== null && activeIdx !== sIdx) || (filterAccount !== "all" && filterAccount !== s.key && s.key !== "combined");
                return (
                  <g key={s.key} opacity={isDimmed ? 0.15 : 1} style={{ transition: "opacity 0.3s" }}>
                    <circle cx={pt.x} cy={pt.y} r="4.8" fill={s.color} stroke="#FFFFFF" strokeWidth="1.5" filter="url(#bmGlow)" />
                    <text
                      x={pt.x + 9}
                      y={pt.y - 6}
                      fill={s.color}
                      fontSize="8.5"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="700"
                      stroke="#FDFBF7"
                      strokeWidth="3"
                      paintOrder="stroke"
                    >
                      {Math.round(val)} commits
                    </text>
                  </g>
                );
              })}
            </g>

            {/* LIVE READOUT SIDEBAR ON RIGHT */}
            <g>
              <text x="744" y="118" fill="#A8A29E" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2" fontWeight="600">
                LIVE READOUT // {currentMonthData.month.toUpperCase()}
              </text>
              <text x="936" y="118" textAnchor="end" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1" fontWeight="700">
                {Math.round(interpolatedValues[0])} TOTAL
              </text>

              {/* Series Rows */}
              {SERIES.map((s, sIdx) => {
                const yPos = 146 + 54 * sIdx;
                const isDimmed = (activeIdx !== null && activeIdx !== sIdx) || (filterAccount !== "all" && filterAccount !== s.key && s.key !== "combined");
                const isSelected = activeIdx === sIdx;
                const currentVal = Math.round(interpolatedValues[sIdx]);

                return (
                  <g
                    key={s.key}
                    onMouseEnter={() => setHoveredSeries(sIdx)}
                    onMouseLeave={() => setHoveredSeries(null)}
                    onClick={() => {
                      sound.playClick();
                      setSelectedSeries(selectedSeries === sIdx ? null : sIdx);
                    }}
                    opacity={isDimmed ? 0.35 : 1}
                    style={{ cursor: "pointer", outline: "none", transition: "opacity 0.3s" }}
                    role="button"
                    tabIndex={0}
                  >
                    <rect
                      x="736"
                      y={yPos - 16}
                      width="208"
                      height="46"
                      rx="6"
                      fill={isSelected ? "#FFFBF5" : "transparent"}
                      stroke={isSelected ? "#E4C090" : "transparent"}
                    />
                    <line x1="744" y1={yPos - 4} x2="756" y2={yPos - 4} stroke={s.color} strokeWidth={s.width} strokeLinecap="round" />
                    <text x="764" y={yPos} fill="#4A3B33" fontSize="11" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight={sIdx === 0 ? 700 : 600}>
                      {s.label}
                    </text>
                    <text x="936" y={yPos} textAnchor="end" fill={s.color} fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                      {currentVal}
                    </text>

                    {/* Progress Bar for the month */}
                    <rect x="744" y={yPos + 10} width="192" height="3" rx="1.5" fill="#F1E9DA" />
                    <rect x="744" y={yPos + 10} width={Math.max(0, Math.min(192, (currentVal / 180) * 192))} height="3" rx="1.5" fill={s.color} />
                  </g>
                );
              })}

              {/* Total Aggregate Summary Box */}
              <g pointerEvents="none">
                <line x1="744" y1="316" x2="936" y2="316" stroke="#F1E9DA" strokeWidth="1" />

                <text x="744" y="336" fill="#A8A29E" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6" fontWeight="600">
                  TOTAL VERIFIED OUTPUT
                </text>
                <text x="744" y="366" fill="#B45309" fontSize="24" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                  699+ Commits
                </text>
                <text x="744" y="384" fill="#059669" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                  64 Repositories Across Both Accounts
                </text>

                <text x="744" y="408" fill="#78716C" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.6">
                  Peak Month: 173 contributions (May 2026)
                </text>
                <text x="744" y="420" fill="#78716C" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.6">
                  Sustained Sprint: 138 commits (Jan 2026)
                </text>
              </g>
            </g>

            {/* Bottom Telemetry Strip */}
            <g pointerEvents="none">
              <line x1="16" y1="646" x2="936" y2="646" stroke="#E4D9BC" strokeWidth="1" />
              <text x="16" y="666" fill="#A8A29E" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4">
                github_velocity_terrain.live · 2 profiles (@aniketmishra-0 &amp; @Mishra-Aniket) · verified data
              </text>
              <text x="936" y="666" textAnchor="end" fill="#B45309" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4" fontWeight="600">
                MOVE POINTER ACROSS TERRAIN TO SCRUB TIMELINE
              </text>
            </g>
          </svg>

          {/* Floating Detail Inspection Modal when series is active */}
          {activeSeries && (
            <div
              className="absolute top-2 left-2 right-2 sm:right-auto sm:top-4 sm:left-4 z-30 max-w-[420px] sm:w-[400px] pointer-events-auto transition-all duration-200 animate-in fade-in"
              onMouseEnter={() => setHoveredSeries(activeIdx)}
              onMouseLeave={() => setHoveredSeries(null)}
              role="dialog"
              aria-label={`${activeSeries.label} telemetry details`}
            >
              <div className="relative overflow-hidden rounded-xl border border-[#E4D9BC] bg-[#FDFBF7]/95 backdrop-blur-md shadow-[0_20px_40px_-15px_rgba(74,59,51,0.22)] p-4 sm:p-4.5">
                {/* Accent indicator on left edge */}
                <div
                  className="absolute inset-y-0 left-0 w-[4px]"
                  style={{ background: activeSeries.color }}
                />

                {/* Top Row: Eyebrow + Verified Badge + Close Button */}
                <div className="flex items-center justify-between gap-2 pl-1.5">
                  <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                    <span
                      className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded bg-white border border-[#E4D9BC] truncate"
                      style={{ color: activeSeries.color }}
                    >
                      {activeSeries.panel.eyebrow}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[8.5px] uppercase tracking-wider text-[#059669] font-bold bg-[#ECFDF5] px-1.5 py-0.5 rounded border border-[#A7F3D0]">
                      <span
                        className="h-1.5 w-1.5 rounded-full animate-pulse"
                        style={{ background: activeSeries.color }}
                      />
                      VERIFIED DATA
                    </span>
                  </div>

                  {/* Dismiss / Close button */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setSelectedSeries(null);
                      setHoveredSeries(null);
                    }}
                    className="p-1 rounded-md text-[#78716C] hover:text-[#4A3B33] hover:bg-[#F1E9DA] transition-colors cursor-pointer shrink-0"
                    title="Close details"
                    aria-label="Close details"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Title and Description */}
                <div className="mt-2.5 pl-1.5">
                  <h4 className="text-[14.5px] sm:text-[15.5px] font-bold leading-snug text-[#4A3B33] font-serif">
                    {activeSeries.panel.title}
                  </h4>
                  <p className="mt-1 text-[11px] leading-[1.6] text-[#57534E] font-sans">
                    {activeSeries.panel.body}
                  </p>
                </div>

                {/* Horizontal 3-Stat Metric Grid - Zero Clipping & Balanced Layout */}
                <div className="mt-3.5 grid grid-cols-3 divide-x divide-[#E4D9BC] rounded-lg border border-[#E4D9BC] bg-white/90 py-2.5 px-1 text-center font-mono shadow-2xs">
                  <div className="px-1">
                    <span className="block text-[8px] uppercase tracking-wider text-[#A8A29E] font-bold">
                      Total Commits
                    </span>
                    <span className="block text-[13px] font-extrabold tabular-nums text-[#4A3B33] mt-0.5">
                      {activeSeries.total}+
                    </span>
                    <span className="block text-[8px] text-[#78716C] font-sans">Verified</span>
                  </div>
                  <div className="px-1">
                    <span className="block text-[8px] uppercase tracking-wider text-[#A8A29E] font-bold">
                      Repositories
                    </span>
                    <span className="block text-[13px] font-extrabold tabular-nums text-[#059669] mt-0.5">
                      {activeSeries.repos} Repos
                    </span>
                    <span className="block text-[8px] text-[#78716C] font-sans">Public</span>
                  </div>
                  <div className="px-1">
                    <span className="block text-[8px] uppercase tracking-wider text-[#A8A29E] font-bold">
                      Peak Sprint
                    </span>
                    <span className="block text-[13px] font-extrabold tabular-nums text-[#B45309] mt-0.5">
                      {activeSeries.peak}
                    </span>
                    <span className="block text-[8px] text-[#78716C] font-sans">
                      {activeSeries.peakMonth}
                    </span>
                  </div>
                </div>

                {/* Footer Strip */}
                <div className="mt-3 pt-2.5 border-t border-[#F1E9DA] flex items-center justify-between gap-2 pl-1.5">
                  <a
                    href={activeSeries.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="inline-flex items-center gap-1 font-mono text-[10.5px] font-bold text-[#B45309] hover:text-[#92400E] hover:underline"
                  >
                    <span>Open {activeSeries.label} on GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <span className="font-mono text-[9px] font-semibold text-[#78716C] bg-[#F4EFE6] px-2 py-0.5 rounded border border-[#E4D9BC]/70 truncate">
                    {activeSeries.tag}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons to open both profiles */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="https://github.com/aniketmishra-0"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius)] bg-white border border-[#E4D9BC] font-mono text-xs font-semibold text-[#4A3B33] shadow-xs hover:border-[#059669] hover:text-[#059669] transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-[#059669]" />
            <span>Open @aniketmishra-0 Profile (35 Repos · 601 Commits) ↗</span>
          </a>
          <a
            href="https://github.com/Mishra-Aniket"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius)] bg-white border border-[#E4D9BC] font-mono text-xs font-semibold text-[#4A3B33] shadow-xs hover:border-[#6366F1] hover:text-[#6366F1] transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
            <span>Open @Mishra-Aniket Profile (29 Repos · 98 Commits) ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
