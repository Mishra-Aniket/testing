"use client";

import React, { useState, useRef, useMemo } from "react";

// Checkpoint data from getalchemystai.com
const CHECKPOINTS = [8, 32, 64, 96, 115];

const SERIES = [
  {
    key: "aniket",
    label: "Aniket",
    color: "#B45309",
    v: 0,
    width: 3,
    points: [92, 92.5, 91.8, 92.2, 92],
    panel: {
      eyebrow: "SERIES · ANIKET",
      title: "Deterministic context",
      body: "Accuracy holds near 92% at every length because only in-scope, current context ever reaches the model.",
      code: "ctx.search({ scope, recall, rank })"
    }
  },
  {
    key: "vectordb",
    label: "Vector DB",
    color: "#A16207",
    v: 70,
    width: 2.2,
    points: [88, 85, 78, 70, 63],
    panel: {
      eyebrow: "SERIES · VECTOR DB",
      title: "Top-K similarity",
      body: "Nearest-neighbour recall keeps pulling stale and off-scope chunks as the conversation grows, so accuracy decays steadily.",
      code: "index.query({ topK: 10 })"
    }
  },
  {
    key: "fullctx",
    label: "Full-context GPT-4o",
    color: "#A8A29E",
    v: 140,
    width: 2.2,
    points: [90, 88, 72, 55, 41],
    panel: {
      eyebrow: "SERIES · FULL CONTEXT",
      title: "Stuff the window",
      body: "Pasting the entire history into the prompt dilutes attention. Past 64K tokens the model loses the thread.",
      code: "messages: [...history]"
    }
  }
];

// Exact isometric matrix transformation from getalchemystai.com
// IA = 0.9, IB = 0.32
const IA = 0.9;
const IB = 0.32;
const u = (e, t, n = 0) => ({
  x: 220 + IA * (e - t),
  y: 354 + IB * (e + t) - n
});

const m = (pts) => pts.map((p) => `${p.x},${p.y}`).join(" ");

const p = (e) =>
  ((e - CHECKPOINTS[0]) / (CHECKPOINTS[CHECKPOINTS.length - 1] - CHECKPOINTS[0])) * 520;

function interpolateSeries(points, N) {
  for (let n = 0; n < CHECKPOINTS.length - 1; n++) {
    const i = p(CHECKPOINTS[n]);
    const s = p(CHECKPOINTS[n + 1]);
    if (N <= s) {
      const a = Math.max(0, Math.min(1, (N - i) / (s - i)));
      return points[n] + (points[n + 1] - points[n]) * a;
    }
  }
  return points[points.length - 1];
}

const Y_TICKS = [40, 55, 70, 85, 100];

export default function AccuracyTerrain() {
  const svgRef = useRef(null);

  // Parked default: matches the original site's resting scrub position (60K tokens)
  const [parked, setParked] = useState(253);
  const [scrub, setScrub] = useState(null);
  const [hovered, setHovered] = useState(null); // null or series index 0, 1, 2

  // Current token position N along isometric axis (0 to 520)
  const N = scrub !== null ? scrub : parked;
  const currentTokens = Math.round(
    CHECKPOINTS[0] + (N / 520) * (CHECKPOINTS[CHECKPOINTS.length - 1] - CHECKPOINTS[0])
  );

  // Live interpolated accuracy values
  const accuracies = useMemo(() => {
    return SERIES.map((s) => interpolateSeries(s.points, N));
  }, [N]);

  const lead = (accuracies[0] - Math.max(accuracies[1], accuracies[2])).toFixed(1);

  // Active series for the inspection panel
  const activeSeries = hovered !== null ? SERIES[hovered] : null;

  // Exact pointer move handler from getalchemystai.com using SVG CTM inverse projection
  const handlePointerMove = (e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;

    // Project client coordinate into exact SVG viewBox coordinate (0-960, 0-684)
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());

    // Bounds of the isometric chart area in SVG space
    if (pt.x > 745 || pt.y < 120 || pt.y > 620) {
      if (scrub !== null) setScrub(null);
      return;
    }

    // Inverse projection along center axis
    const s = Math.max(0, Math.min(520, (pt.x - 220) / IA + 70));
    setScrub(s);
  };

  const handlePointerLeave = () => {
    setScrub(null);
  };

  return (
    <div id="accuracy-terrain" className="relative w-full select-none">
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] pb-24 md:pb-32">
        {/* Section Eyebrow */}
        <div className="text-center mb-8 md:mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#78716C] font-semibold">
            Illustrative · accuracy vs conversation context
          </p>
        </div>

        {/* 3D Terrain Container (Borderless & seamless on page, exactly like getalchemystai.com) */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[240/171] select-none">
          {/* SVG 3D Isometric Projection */}
          <svg
            ref={svgRef}
            viewBox="0 0 960 684"
            className="w-full h-full block overflow-visible"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Isometric chart of accuracy vs conversation context tokens."
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
                  <stop offset="0%" stopColor={s.color} stopOpacity={s.key === "aniket" ? 0.34 : 0.26} />
                  <stop offset="100%" stopColor={s.color} stopOpacity="0.04" />
                </linearGradient>
              ))}
            </defs>

            {/* Top-Right HUD Header */}
            <g pointerEvents="none">
              <rect x="752" y="33" width="7" height="7" fill="#B45309" />
              <text x="765" y="40" fill="#78716C" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6" fontWeight="600">
                ANIKET // ACCURACY_TERRAIN
              </text>
              <text x="752" y="57" fill="#A8A29E" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
                {currentTokens}K tokens · illustrative
              </text>
              <text x="936" y="57" textAnchor="end" fill="#A8A29E" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
                LIVE
              </text>
              <circle cx="904" cy="54.5" r="2.4" fill="#B45309" opacity="0.95" />

              {/* Progress Checkpoint Segments */}
              {CHECKPOINTS.map((cp, idx) => {
                const fill = p(cp) <= N + 0.5 ? "#B45309" : "#E4D9BC";
                return (
                  <rect
                    key={cp}
                    x={752 + idx * 37.6}
                    y="67"
                    width="33.6"
                    height="3"
                    rx="1.5"
                    style={{ fill, transition: "fill 0.3s" }}
                  />
                );
              })}

              <text x="752" y="88" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6" fontWeight="600" style={{ fill: "#B45309", transition: "fill 0.3s" }}>
                {hovered !== null
                  ? `PHASE · ISOLATING ${SERIES[hovered].label.toUpperCase()}`
                  : scrub !== null
                  ? `PHASE · SCRUBBING · ${currentTokens}K`
                  : "PHASE · PARKED · HOVER TO SCRUB"}
              </text>
            </g>

            {/* Top-Left series hint (shows when not inspecting) */}
            <g pointerEvents="none" opacity={hovered === null ? 1 : 0} style={{ transition: "opacity 0.25s" }}>
              <rect x="24" y="32" width="7" height="7" fill="none" stroke="#E4C090" strokeWidth="1" />
              <text x="38" y="39" fill="#A8A29E" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6" fontWeight="600">
                HOVER A SERIES TO INSPECT IT
              </text>
            </g>

            {/* 3D Back Walls & Accuracy Y-Grid */}
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
                const n = (val - 40) * 3;
                return (
                  <g key={val} stroke="#E4D9BC" strokeWidth="1" strokeDasharray="3 4">
                    <line x1={u(-24, -24, n).x} y1={u(-24, -24, n).y} x2={u(544, -24, n).x} y2={u(544, -24, n).y} />
                    <line x1={u(-24, -24, n).x} y1={u(-24, -24, n).y} x2={u(-24, 164, n).x} y2={u(-24, 164, n).y} />
                  </g>
                );
              })}

              {/* Y-axis Labels */}
              {Y_TICKS.map((val) => {
                const pt = u(-24, 164, (val - 40) * 3);
                return (
                  <text key={val} x={pt.x - 7} y={pt.y + 3} textAnchor="end" fill="#78716C" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="500">
                    {val}%
                  </text>
                );
              })}

              {(() => {
                const pt = u(-24, 164, 90);
                return (
                  <text x={pt.x - 40} y={pt.y} textAnchor="middle" fill="#57534E" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2" fontWeight="600" transform={`rotate(-90 ${pt.x - 40} ${pt.y})`}>
                    ACCURACY
                  </text>
                );
              })()}
            </g>

            {/* 3D Isometric Ground Plane & Token X-Grid */}
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

              {/* Checkpoint grid lines on ground */}
              {CHECKPOINTS.map((cp) => {
                const n = p(cp);
                return (
                  <line
                    key={cp}
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

              {/* Token labels along bottom edge */}
              {CHECKPOINTS.map((cp) => {
                const pt = u(p(cp), 164);
                return (
                  <text key={cp} x={pt.x - 6} y={pt.y + 24} textAnchor="middle" fill="#78716C" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="500">
                    {cp}K
                  </text>
                );
              })}

              {(() => {
                const pt = u(260, 164);
                return (
                  <text x={pt.x - 18} y={pt.y + 46} textAnchor="middle" fill="#57534E" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2" fontWeight="600" transform={`rotate(19.6 ${pt.x - 18} ${pt.y + 46})`}>
                    CONVERSATION TOKENS
                  </text>
                );
              })()}
            </g>

            {/* 3D Wall Series Curves */}
            {SERIES.map((s, sIdx) => {
              const pts = s.points.map((t, idx) => u(p(CHECKPOINTS[idx]), s.v, (t - 40) * 3));
              const wallPts = [...pts, u(520, s.v), u(0, s.v)];
              const pathD = `M${pts.map((pt) => `${pt.x},${pt.y}`).join(" L")}`;
              const isDimmed = hovered !== null && hovered !== sIdx;

              return (
                <g
                  key={s.key}
                  opacity={isDimmed ? 0.15 : 1}
                  style={{ transition: "opacity 0.3s", cursor: "pointer" }}
                  onMouseEnter={() => setHovered(sIdx)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Extruded gradient wall */}
                  <polygon
                    points={m(wallPts)}
                    fill={`url(#bmWall-${s.key})`}
                    stroke={s.color}
                    strokeOpacity="0.25"
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
                  {/* Checkpoint Circles */}
                  {pts.map((pt, cIdx) => (
                    <circle
                      key={cIdx}
                      cx={pt.x}
                      cy={pt.y}
                      r={s.key === "aniket" ? 3.6 : 3}
                      fill="#FFFFFF"
                      stroke={s.color}
                      strokeWidth="1.8"
                    />
                  ))}
                </g>
              );
            })}

            {/* DYNAMIC REAL-TIME SLICE PLANE AT CURRENT TOKEN POSITION N */}
            <g pointerEvents="none">
              {/* Vertical plane */}
              <polygon
                points={m([u(N, -24), u(N, 164), u(N, 164, 180), u(N, -24, 180)])}
                fill="#B45309"
                fillOpacity="0.05"
                stroke="#B45309"
                strokeOpacity="0.35"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              {/* Ground slice line */}
              <line
                x1={u(N, -24).x}
                y1={u(N, -24).y}
                x2={u(N, 164).x}
                y2={u(N, 164).y}
                stroke="#B45309"
                strokeWidth="1.4"
              />
              {/* Token tag at top */}
              {(() => {
                const pt = u(N, -24, 192);
                return (
                  <text x={pt.x} y={pt.y} textAnchor="middle" fill="#B45309" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="700" letterSpacing="1">
                    {currentTokens}K
                  </text>
                );
              })()}

              {/* 3 Live Indicator Dots & Percentages on the curves */}
              {SERIES.map((s, sIdx) => {
                const pt = u(N, s.v, (accuracies[sIdx] - 40) * 3);
                const isDimmed = hovered !== null && hovered !== sIdx;
                return (
                  <g key={s.key} opacity={isDimmed ? 0.15 : 1} style={{ transition: "opacity 0.3s" }}>
                    <circle cx={pt.x} cy={pt.y} r="4.6" fill={s.color} stroke="#FFFFFF" strokeWidth="1.5" filter="url(#bmGlow)" />
                    <text
                      x={pt.x + 9}
                      y={pt.y - 6}
                      fill={s.key === "fullctx" ? "#57534E" : s.color}
                      fontSize="8.5"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="700"
                      stroke="#FDFBF7"
                      strokeWidth="3"
                      paintOrder="stroke"
                    >
                      {accuracies[sIdx].toFixed(1)}%
                    </text>
                  </g>
                );
              })}
            </g>

            {/* LIVE READOUT SIDEBAR ON RIGHT */}
            <g>
              <text x="752" y="132" fill="#A8A29E" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2" fontWeight="600">
                LIVE READOUT
              </text>
              <text x="936" y="132" textAnchor="end" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1" fontWeight="700">
                {currentTokens}K TOKENS
              </text>

              {/* Series rows */}
              {SERIES.map((s, sIdx) => {
                const yPos = 160 + 52 * sIdx;
                const isDimmed = hovered !== null && hovered !== sIdx;
                const isSelected = hovered === sIdx;

                return (
                  <g
                    key={s.key}
                    onMouseEnter={() => setHovered(sIdx)}
                    onMouseLeave={() => setHovered(null)}
                    opacity={isDimmed ? 0.35 : 1}
                    style={{ cursor: "pointer", outline: "none", transition: "opacity 0.3s" }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${s.label}: ${s.panel.body}`}
                  >
                    <rect
                      x="744"
                      y={yPos - 16}
                      width="200"
                      height="44"
                      rx="6"
                      fill={isSelected ? "#FFFBF5" : "transparent"}
                      stroke={isSelected ? "#E4C090" : "transparent"}
                    />
                    <line x1="752" y1={yPos - 4} x2="764" y2={yPos - 4} stroke={s.color} strokeWidth={s.width} strokeLinecap="round" />
                    <text x="772" y={yPos} fill="#4A3B33" fontSize="11.5" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight={sIdx === 0 ? 700 : 600}>
                      {s.label}
                    </text>
                    <text x="936" y={yPos} textAnchor="end" fill={sIdx === 2 ? "#57534E" : s.color} fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                      {accuracies[sIdx].toFixed(1)}%
                    </text>
                    <rect x="752" y={yPos + 10} width="184" height="3" rx="1.5" fill="#F1E9DA" />
                    <rect x="752" y={yPos + 10} width={Math.max(0, ((accuracies[sIdx] - 40) / 60) * 184)} height="3" rx="1.5" fill={s.color} />
                  </g>
                );
              })}

              {/* Lead counter */}
              <g pointerEvents="none">
                <line x1="752" y1="318" x2="936" y2="318" stroke="#F1E9DA" strokeWidth="1" />
                <text x="752" y="340" fill="#A8A29E" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.6" fontWeight="600">
                  ANIKET LEAD
                </text>
                <text x="752" y="370" fill="#B45309" fontSize="24" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                  +{lead}pt
                </text>
                <text x="752" y="388" fill="#78716C" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.6">
                  vs best baseline at {currentTokens}K tokens
                </text>
              </g>
            </g>

            {/* Bottom Strip */}
            <g pointerEvents="none">
              <line x1="16" y1="646" x2="936" y2="646" stroke="#E4D9BC" strokeWidth="1" />
              <text x="16" y="666" fill="#A8A29E" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4">
                accuracy_terrain.live · 3 series · 5 checkpoints · illustrative
              </text>
              <text x="936" y="666" textAnchor="end" fill="#B45309" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4" fontWeight="600">
                HOVER THE TERRAIN TO SCRUB
              </text>
            </g>
          </svg>

          {/* Floating Detail Inspection Card (hidden on mobile touch to prevent stuck overlap, visible on md+) */}
          {activeSeries && (
            <div
              className="hidden md:block absolute left-[25.4%] top-[1.2%] -translate-x-1/2 w-[46%] min-w-[400px] z-30 pointer-events-auto transition-all duration-200"
              onMouseEnter={() => setHovered(SERIES.findIndex((s) => s.key === activeSeries.key))}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative overflow-hidden rounded-lg border border-[#E4D9BC] bg-white/95 backdrop-blur-sm shadow-[0_12px_32px_-16px_rgba(74,59,51,0.28)]">
                <div className="absolute inset-y-0 left-0 w-[2px]" style={{ background: activeSeries.color }} />
                <div className="grid grid-cols-[1.25fr_1fr] gap-4 p-4">
                  {/* Left Column: Eyebrow, Title, Description */}
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em]" style={{ color: activeSeries.color }}>
                        {activeSeries.panel.eyebrow}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#A8A29E]">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: activeSeries.color }} />
                        ILLUSTRATIVE
                      </span>
                    </div>
                    <h4 className="mt-1.5 text-[14px] font-bold leading-snug text-[#4A3B33] font-serif">
                      {activeSeries.panel.title}
                    </h4>
                    <p className="mt-1 text-[11px] leading-[1.55] text-[#57534E]">
                      {activeSeries.panel.body}
                    </p>
                  </div>

                  {/* Right Column: Key-Value Stats and Code */}
                  <div className="border-l border-[#F1E9DA] pl-4">
                    <dl className="space-y-1 font-mono">
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-[9px] uppercase tracking-[0.14em] text-[#A8A29E]">AT 8K</dt>
                        <dd className="text-[11px] font-semibold tabular-nums text-[#4A3B33]">{activeSeries.points[0].toFixed(1)}%</dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-[9px] uppercase tracking-[0.14em] text-[#A8A29E]">AT 115K</dt>
                        <dd className="text-[11px] font-semibold tabular-nums text-[#4A3B33]">{activeSeries.points[4].toFixed(1)}%</dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-[9px] uppercase tracking-[0.14em] text-[#A8A29E]">CHANGE</dt>
                        <dd className="text-[11px] font-semibold tabular-nums text-[#B45309]">
                          {activeSeries.points[4] - activeSeries.points[0] >= 0 ? "+" : "−"}
                          {Math.abs(activeSeries.points[4] - activeSeries.points[0]).toFixed(0)}pt
                        </dd>
                      </div>
                    </dl>
                    {activeSeries.panel.code && (
                      <div className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap rounded-md border border-[#F1E9DA] bg-[#F8F4EE] px-2 py-1 font-mono text-[9px] text-[#57534E]">
                        <span style={{ color: activeSeries.color }}>▸</span> {activeSeries.panel.code}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
