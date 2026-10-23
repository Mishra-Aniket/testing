'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';
import { STACK_LAYERS } from '../data/portfolioData';

const LAYERS = STACK_LAYERS;

export default function StackDiagram() {
  const [hoveredLayer, setHoveredLayer] = useState(null);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const isHoveringCardRef = useRef(false);
  const closeTimerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const containerRef = useRef(null);

  const handleCardMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    isHoveringCardRef.current = true;
    setIsHoveringCard(true);
  };

  const handleCardMouseLeave = () => {
    isHoveringCardRef.current = false;
    setIsHoveringCard(false);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setHoveredLayer(null);
    }, 200);
  };

  const handleLayerMouseEnter = (layerIdx) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (hoveredLayer !== layerIdx) {
      sound.playClick();
      setHoveredLayer(layerIdx);
    }
  };

  // Auto-highlight layer when navigated via hash (e.g. #stack-l01)
  useEffect(() => {
    const handleHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("l00") || hash.includes("data") || hash.includes("database")) setHoveredLayer(0);
      else if (hash.includes("l01") || hash.includes("engine") || hash.includes("backend")) setHoveredLayer(1);
      else if (hash.includes("l02") || hash.includes("automation") || hash.includes("pipeline")) setHoveredLayer(2);
      else if (hash.includes("l03") || hash.includes("ui") || hash.includes("frontend")) setHoveredLayer(3);
      else if (hash.includes("l04") || hash.includes("edge") || hash.includes("agent")) setHoveredLayer(4);
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    // Ultra-subtle, rock-solid micro-tilt (no aggressive skew)
    setTilt({
      x: -normY * 1.0,
      y: normX * 1.0,
    });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.06,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      if (!isHoveringCardRef.current) {
        setHoveredLayer(null);
      }
    }, 260);
  };

  const getOffsetY = (idx) => {
    if (hoveredLayer === null) return 0;
    if (idx > hoveredLayer) return -24;
    if (idx < hoveredLayer) return 24;
    return -6;
  };

  const LAYER_Y = [584, 474, 372, 270, 168];
  const cardTopPercent = hoveredLayer !== null
    ? Math.min(82, Math.max(18, (LAYER_Y[hoveredLayer] + getOffsetY(hoveredLayer)) / 720 * 100))
    : 50;

  const activeData = hoveredLayer !== null ? LAYERS[hoveredLayer] : null;

  return (
    <div style={{ perspective: 1200 }} className="w-full">
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 25, mass: 0.5 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full aspect-[8/9] select-none"
      >
        {/* Dynamic Light Glare Reflection */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-20"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 320px at ${glare.x}% ${glare.y}%, rgba(180, 83, 9, 0.14), transparent 75%)`,
            mixBlendMode: 'multiply',
          }}
        />

        <svg
          viewBox="0 0 640 720"
          className="w-full h-full block overflow-visible"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Aniket engineering architecture stack"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="glassTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#FDFBF7" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#F5EFE3" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="glassTopActive" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#FEF3C7" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="glassBorder" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#E4D9BC" />
              <stop offset="100%" stopColor="#CBBFA3" />
            </linearGradient>

            <linearGradient id="glassBorderActive" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            <linearGradient id="extrusionSide" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E6DCBF" />
              <stop offset="100%" stopColor="#CFBFA0" />
            </linearGradient>

            <linearGradient id="extrusionSideActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E4C090" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            <radialGradient id="slabGlow">
              <stop offset="0%" stopColor="#B45309" stopOpacity="0.24" />
              <stop offset="60%" stopColor="#B45309" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
            </radialGradient>

            <filter id="ksGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="ksShadow" x="-20%" y="-20%" width="140%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="rgba(74,59,51,0.14)" />
            </filter>

            <filter id="ksFloorBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>

          {/* Top Header Live Console Box */}
          <g pointerEvents="none">
            <g filter="url(#ksShadow)">
              <rect
                x="60"
                y="22"
                width="310"
                height="76"
                rx="10"
                fill="#FFFFFF"
                stroke="#B45309"
                strokeWidth="1.4"
              />
            </g>
            <rect
              x="72"
              y="34"
              width="54"
              height="18"
              rx="4"
              fill="rgba(180,83,9,0.08)"
              stroke="rgba(180,83,9,0.25)"
              strokeWidth="1"
            />
            <circle cx="80" cy="43" r="2.2" fill="#10B981">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
            <text
              x="103"
              y="46.5"
              textAnchor="middle"
              fill="#B45309"
              fontSize="7"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="700"
              letterSpacing="1.2"
            >
              LIVE
            </text>
            <text
              x="134"
              y="47"
              fill="#4A3B33"
              fontSize="11"
              fontFamily="var(--font-merriweather), Georgia, serif"
              fontWeight="700"
            >
              Full-Stack Architecture
            </text>
            <line x1="72" y1="59" x2="354" y2="59" stroke="#F1E9DA" strokeWidth="1" />
            <g>
              <text
                x="72"
                y="81"
                fill="#B45309"
                fontSize="11.5"
                fontFamily="var(--font-merriweather), Georgia, serif"
                fontWeight="700"
              >
                CENTRIX &amp; OMTABS
              </text>
              <text
                x="190"
                y="80"
                fill="#78716C"
                fontSize="7"
                fontFamily="JetBrains Mono, monospace"
                letterSpacing="0.2"
              >
                500+ Centers · 20K Lectures/Day · Production
              </text>
              <circle cx="348" cy="77" r="6.5" fill="#B45309" />
              <path
                d="M344.5,77 l2.2,2.2 l4.4,-4.4"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>

          {/* Top-Right Telemetry Strip */}
          <g pointerEvents="none">
            <rect x="395" y="32" width="7" height="7" fill="#B45309" />
            <text
              x="408"
              y="39"
              fill="#78716C"
              fontSize="8"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="1.6"
              fontWeight="600"
            >
              ANIKET // SYSTEM_CORE
            </text>
            <text
              x="395"
              y="55"
              fill="#A8A29E"
              fontSize="7.5"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="1"
            >
              build #2026 · web apps &amp; software
            </text>
            <text
              x="626"
              y="55"
              textAnchor="end"
              fill="#A8A29E"
              fontSize="7.5"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="1"
            >
              LIVE
            </text>
            <circle cx="594" cy="52.5" r="2.4" fill="#B45309">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
            </circle>
            {/* 7 Progress segments */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <rect
                key={i}
                x={395 + i * 33}
                y="64"
                width="29"
                height="3"
                rx="1.5"
                fill="#B45309"
                opacity={i < 5 ? 1 : 0.4}
              />
            ))}
            <text
              x="395"
              y="84"
              fill="#B45309"
              fontSize="7.5"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="1.6"
              fontWeight="600"
            >
              PHASE · PRODUCTION
            </text>
          </g>

          {/* Left Vertical Annotation Brackets */}
          <g pointerEvents="none" opacity={hoveredLayer !== null ? 0.3 : 1} style={{ transition: 'opacity 0.3s' }}>
            <path d="M58,128 H48 V528 H58" fill="none" stroke="#B45309" strokeWidth="1" opacity="0.55" />
            <text
              x="38"
              y="328"
              textAnchor="middle"
              transform="rotate(-90 38 328)"
              fill="#B45309"
              fontSize="8"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="3"
              fontWeight="600"
            >
              FULL-STACK &amp; AI ENGINE
            </text>
            <path d="M58,536 H48 V640 H58" fill="none" stroke="#A8A29E" strokeWidth="1" opacity="0.7" />
            <text
              x="38"
              y="588"
              textAnchor="middle"
              transform="rotate(-90 38 588)"
              fill="#A8A29E"
              fontSize="8"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="3"
              fontWeight="600"
            >
              STORAGE FOUNDATION
            </text>
          </g>

          {/* ========================================================================= */}
          {/* LAYER 00: STORAGE & DATABASE (Y = 584) */}
          {/* ========================================================================= */}
          <g
            tabIndex="0"
            role="button"
            aria-label="L00 Database and storage"
            style={{
              outline: 'none',
              transform: `translateY(${getOffsetY(0)}px)`,
              filter: hoveredLayer === 0 ? 'drop-shadow(0 10px 22px rgba(180, 83, 9, 0.28))' : 'none',
              opacity: hoveredLayer === null ? 1 : hoveredLayer === 0 ? 1 : 0.38,
              transition: 'transform 0.38s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1), filter 0.35s',
            }}
          >
            {/* Right Side Annotation Label */}
            <g pointerEvents="none">
              <line x1="365" y1="584" x2="390" y2="584" stroke="#E4C090" strokeWidth="1" />
              <circle cx="365" cy="584" r="2.5" fill="#B45309" />
              <g opacity={hoveredLayer === 0 ? 0 : 1} style={{ transition: 'opacity 0.2s' }}>
                <text x="398" y="571" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5" fontWeight="600" fill="#B45309">
                  L00 · STORAGE
                </text>
                <text x="398" y="588" fill="#4A3B33" fontSize="14" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                  Database &amp; Cache Layer
                </text>
                <text x="398" y="602" fill="#78716C" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4">
                  postgresql · redis · supabase · wal
                </text>
              </g>
            </g>

            {/* 3D Rounded Glassmorphic Slab */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => handleLayerMouseEnter(0)}
              onClick={() => handleLayerMouseEnter(0)}
            >
              {/* Floor Ambient Glow */}
              <ellipse cx="218" cy="616" rx="140" ry="42" fill="url(#slabGlow)" filter="url(#ksFloorBlur)" opacity={hoveredLayer === 0 ? 0.9 : 0.45} />

              {/* 3D Extrusion Thickness (Lower Bevel) */}
              <g transform="matrix(0.894 0.36 -0.894 0.36 218 592)">
                <rect
                  x="-84"
                  y="-84"
                  width="168"
                  height="168"
                  rx="24"
                  fill={hoveredLayer === 0 ? 'url(#extrusionSideActive)' : 'url(#extrusionSide)'}
                  stroke="#B45309"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
              </g>

              {/* Top Glassmorphic Surface */}
              <g transform="matrix(0.894 0.36 -0.894 0.36 218 584)">
                <rect
                  x="-84"
                  y="-84"
                  width="168"
                  height="168"
                  rx="24"
                  fill={hoveredLayer === 0 ? 'url(#glassTopActive)' : 'url(#glassTop)'}
                  stroke={hoveredLayer === 0 ? 'url(#glassBorderActive)' : 'url(#glassBorder)'}
                  strokeWidth={hoveredLayer === 0 ? 1.8 : 1.4}
                />
                <rect x="-78" y="-78" width="156" height="156" rx="20" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />

                {/* Internal Architecture: Dual Database Platter Rings + Memory Cells */}
                <circle cx="-28" cy="0" r="36" fill="none" stroke="#E4D9BC" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="-28" cy="0" r="24" fill="rgba(180,83,9,0.06)" stroke="#B45309" strokeWidth="1.2" />
                <circle cx="-28" cy="0" r="10" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.4" />
                <circle cx="-28" cy="0" r="3" fill="#B45309" />

                <circle cx="36" cy="-24" r="22" fill="none" stroke="#E4D9BC" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="36" cy="-24" r="14" fill="rgba(180,83,9,0.08)" stroke="#B45309" strokeWidth="1.2" />
                <circle cx="36" cy="-24" r="3" fill="#B45309" />

                {/* Redis Key-Value Array */}
                <g stroke="#B45309" strokeWidth="0.9" fill="#FFFFFF">
                  <rect x="18" y="16" width="14" height="12" rx="2" />
                  <rect x="36" y="16" width="14" height="12" rx="2" />
                  <rect x="54" y="16" width="14" height="12" rx="2" />
                  <rect x="18" y="32" width="14" height="12" rx="2" />
                  <rect x="36" y="32" width="14" height="12" rx="2" />
                  <rect x="54" y="32" width="14" height="12" rx="2" />
                </g>

                {/* Laser WAL Replication Stream Line */}
                <line x1="-28" y1="36" x2="18" y2="38" stroke="#B45309" strokeWidth="1.4" strokeDasharray="2 2" />

                {/* Monospace Tech Tags on Slab Surface */}
                <text x="-28" y="-44" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="700" fill="#B45309" letterSpacing="1">
                  POSTGRES
                </text>
                <text x="36" y="-50" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="700" fill="#78716C" letterSpacing="1">
                  REDIS
                </text>
                <text x="36" y="56" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600" fill="#B45309" letterSpacing="0.8">
                  ACID_WAL
                </text>
              </g>

              {/* Tier badge on left edge */}
              <text x="96" y="586" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="1" fill="#A8A29E" fontWeight="700">
                L00
              </text>
            </g>
          </g>

          {/* Connectors: L00 -> L01 with animated live streaming pulses */}
          <g pointerEvents="none" opacity={hoveredLayer !== null ? 0.2 : 1} style={{ transition: 'opacity 0.3s' }}>
            <line x1="218" y1="584" x2="218" y2="474" stroke="#E4C090" strokeWidth="1" strokeDasharray="2 5" />
            <circle cx="218" r="2.8" fill="#B45309" filter="url(#ksGlow)">
              <animate attributeName="cy" values="584;474;584" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;1;0.2" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <g>
              <line x1="152" y1="579" x2="152" y2="469" stroke="rgba(180, 83, 9, 0.45)" strokeWidth="1" />
              <circle cx="152" r="2.2" fill="#E4C090" filter="url(#ksGlow)">
                <animate attributeName="cy" values="579;469;579" dur="2.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.8s" repeatCount="indefinite" />
              </circle>
            </g>
            <g>
              <line x1="284" y1="589" x2="284" y2="479" stroke="rgba(180, 83, 9, 0.45)" strokeWidth="1" />
              <circle cx="284" r="2.2" fill="#B45309" filter="url(#ksGlow)">
                <animate attributeName="cy" values="479;589;479" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* LAYER 01: BACKEND ENGINE (.NET 8 & FASTAPI) (Y = 474) */}
          {/* ========================================================================= */}
          <g
            tabIndex="0"
            role="button"
            aria-label="L01 Backend & Services"
            style={{
              outline: 'none',
              transform: `translateY(${getOffsetY(1)}px)`,
              filter: hoveredLayer === 1 ? 'drop-shadow(0 10px 22px rgba(180, 83, 9, 0.28))' : 'none',
              opacity: hoveredLayer === null ? 1 : hoveredLayer === 1 ? 1 : 0.38,
              transition: 'transform 0.38s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1), filter 0.35s',
            }}
          >
            {/* Right Side Annotation Label */}
            <g pointerEvents="none">
              <line x1="365" y1="474" x2="390" y2="474" stroke="#E4C090" strokeWidth="1" />
              <circle cx="365" cy="474" r="2.5" fill="#B45309" />
              <g opacity={hoveredLayer === 1 ? 0 : 1} style={{ transition: 'opacity 0.2s' }}>
                <text x="398" y="461" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5" fontWeight="600" fill="#B45309">
                  L01 · CORE ENGINE
                </text>
                <text x="398" y="478" fill="#4A3B33" fontSize="14" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                  Backend APIs &amp; Services
                </text>
                <text x="398" y="492" fill="#78716C" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4">
                  .net 8 (c#) · fastapi · node · jwt
                </text>
              </g>
            </g>

            {/* 3D Rounded Glassmorphic Slab */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => handleLayerMouseEnter(1)}
              onClick={() => handleLayerMouseEnter(1)}
            >
              <ellipse cx="218" cy="506" rx="140" ry="42" fill="url(#slabGlow)" filter="url(#ksFloorBlur)" opacity={hoveredLayer === 1 ? 0.9 : 0.45} />

              <g transform="matrix(0.894 0.36 -0.894 0.36 218 482)">
                <rect
                  x="-84"
                  y="-84"
                  width="168"
                  height="168"
                  rx="24"
                  fill={hoveredLayer === 1 ? 'url(#extrusionSideActive)' : 'url(#extrusionSide)'}
                  stroke="#B45309"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
              </g>

              <g transform="matrix(0.894 0.36 -0.894 0.36 218 474)">
                <rect
                  x="-84"
                  y="-84"
                  width="168"
                  height="168"
                  rx="24"
                  fill={hoveredLayer === 1 ? 'url(#glassTopActive)' : 'url(#glassTop)'}
                  stroke={hoveredLayer === 1 ? 'url(#glassBorderActive)' : 'url(#glassBorder)'}
                  strokeWidth={hoveredLayer === 1 ? 1.8 : 1.4}
                />
                <rect x="-78" y="-78" width="156" height="156" rx="20" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />

                {/* Center High-Performance Microprocessor Die */}
                <rect x="-28" y="-28" width="56" height="56" rx="8" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.5" />
                <rect x="-22" y="-22" width="44" height="44" rx="5" fill="rgba(180,83,9,0.08)" stroke="#E4C090" strokeWidth="1" />
                <circle cx="0" cy="0" r="8" fill="#B45309" />
                <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />

                {/* 8 Bus Connector Lines radiating out to microservices */}
                <line x1="-28" y1="-14" x2="-64" y2="-14" stroke="#B45309" strokeWidth="1.2" />
                <circle cx="-64" cy="-14" r="3" fill="#FFFFFF" stroke="#B45309" strokeWidth="1" />

                <line x1="-28" y1="14" x2="-64" y2="14" stroke="#B45309" strokeWidth="1.2" />
                <circle cx="-64" cy="14" r="3" fill="#FFFFFF" stroke="#B45309" strokeWidth="1" />

                <line x1="28" y1="-14" x2="64" y2="-14" stroke="#B45309" strokeWidth="1.2" />
                <circle cx="64" cy="-14" r="3" fill="#FFFFFF" stroke="#B45309" strokeWidth="1" />

                <line x1="28" y1="14" x2="64" y2="14" stroke="#B45309" strokeWidth="1.2" />
                <circle cx="64" cy="14" r="3" fill="#FFFFFF" stroke="#B45309" strokeWidth="1" />

                <line x1="-14" y1="-28" x2="-14" y2="-64" stroke="#B45309" strokeWidth="1.2" />
                <circle cx="-14" cy="-64" r="3" fill="#FFFFFF" stroke="#B45309" strokeWidth="1" />

                <line x1="14" y1="-28" x2="14" y2="-64" stroke="#B45309" strokeWidth="1.2" />
                <circle cx="14" cy="-64" r="3" fill="#FFFFFF" stroke="#B45309" strokeWidth="1" />

                <line x1="-14" y1="28" x2="-14" y2="64" stroke="#B45309" strokeWidth="1.2" />
                <circle cx="-14" cy="64" r="3" fill="#FFFFFF" stroke="#B45309" strokeWidth="1" />

                <line x1="14" y1="28" x2="14" y2="64" stroke="#B45309" strokeWidth="1.2" />
                <circle cx="14" cy="64" r="3" fill="#FFFFFF" stroke="#B45309" strokeWidth="1" />

                {/* Surface Labels */}
                <text x="0" y="-40" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="700" fill="#B45309" letterSpacing="1">
                  .NET 8 (C#)
                </text>
                <text x="0" y="46" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600" fill="#78716C" letterSpacing="0.8">
                  FASTAPI // REST
                </text>
              </g>

              <text x="96" y="476" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="1" fill="#A8A29E" fontWeight="700">
                L01
              </text>
            </g>
          </g>

          {/* Connectors: L01 -> L02 with animated live streaming pulses */}
          <g pointerEvents="none" opacity={hoveredLayer !== null ? 0.2 : 1} style={{ transition: 'opacity 0.3s' }}>
            <line x1="218" y1="474" x2="218" y2="372" stroke="#E4C090" strokeWidth="1" strokeDasharray="2 5" />
            <circle cx="218" r="2.8" fill="#B45309" filter="url(#ksGlow)">
              <animate attributeName="cy" values="474;372;474" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;1;0.2" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <g>
              <line x1="152" y1="469" x2="152" y2="367" stroke="rgba(180, 83, 9, 0.45)" strokeWidth="1" />
              <circle cx="152" r="2.2" fill="#E4C090" filter="url(#ksGlow)">
                <animate attributeName="cy" values="367;469;367" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </g>
            <g>
              <line x1="284" y1="479" x2="284" y2="377" stroke="rgba(180, 83, 9, 0.45)" strokeWidth="1" />
              <circle cx="284" r="2.2" fill="#B45309" filter="url(#ksGlow)">
                <animate attributeName="cy" values="479;377;479" dur="2.9s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.9s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* LAYER 02: INGESTION & CENTRIX AUTOMATION (Y = 372) */}
          {/* ========================================================================= */}
          <g
            tabIndex="0"
            role="button"
            aria-label="L02 Automation & Pipelines"
            style={{
              outline: 'none',
              transform: `translateY(${getOffsetY(2)}px)`,
              filter: hoveredLayer === 2 ? 'drop-shadow(0 10px 22px rgba(180, 83, 9, 0.28))' : 'none',
              opacity: hoveredLayer === null ? 1 : hoveredLayer === 2 ? 1 : 0.38,
              transition: 'transform 0.38s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1), filter 0.35s',
            }}
          >
            {/* Right Side Annotation Label */}
            <g pointerEvents="none">
              <line x1="365" y1="372" x2="390" y2="372" stroke="#E4C090" strokeWidth="1" />
              <circle cx="365" cy="372" r="2.5" fill="#B45309" />
              <g opacity={hoveredLayer === 2 ? 0 : 1} style={{ transition: 'opacity 0.2s' }}>
                <text x="398" y="359" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5" fontWeight="600" fill="#B45309">
                  L02 · PIPELINES
                </text>
                <text x="398" y="376" fill="#4A3B33" fontSize="14" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                  Centrix Automation Engine
                </text>
                <text x="398" y="390" fill="#78716C" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4">
                  500+ centers · drive sync · streaming
                </text>
              </g>
            </g>

            {/* 3D Rounded Glassmorphic Slab */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => handleLayerMouseEnter(2)}
              onClick={() => handleLayerMouseEnter(2)}
            >
              <ellipse cx="218" cy="404" rx="140" ry="42" fill="url(#slabGlow)" filter="url(#ksFloorBlur)" opacity={hoveredLayer === 2 ? 0.9 : 0.45} />

              <g transform="matrix(0.894 0.36 -0.894 0.36 218 380)">
                <rect
                  x="-84"
                  y="-84"
                  width="168"
                  height="168"
                  rx="24"
                  fill={hoveredLayer === 2 ? 'url(#extrusionSideActive)' : 'url(#extrusionSide)'}
                  stroke="#B45309"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
              </g>

              <g transform="matrix(0.894 0.36 -0.894 0.36 218 372)">
                <rect
                  x="-84"
                  y="-84"
                  width="168"
                  height="168"
                  rx="24"
                  fill={hoveredLayer === 2 ? 'url(#glassTopActive)' : 'url(#glassTop)'}
                  stroke={hoveredLayer === 2 ? 'url(#glassBorderActive)' : 'url(#glassBorder)'}
                  strokeWidth={hoveredLayer === 2 ? 1.8 : 1.4}
                />
                <rect x="-78" y="-78" width="156" height="156" rx="20" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />

                {/* Dual Streaming Conveyor Pipeline Channels */}
                <rect x="-68" y="-28" width="136" height="22" rx="6" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1.2" />
                <line x1="-60" y1="-17" x2="60" y2="-17" stroke="#B45309" strokeWidth="1.4" strokeDasharray="3 3" />

                <rect x="-68" y="6" width="136" height="22" rx="6" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1.2" />
                <line x1="-60" y1="17" x2="60" y2="17" stroke="#B45309" strokeWidth="1.4" strokeDasharray="3 3" />

                {/* Streaming Node Stations */}
                <circle cx="-42" cy="-17" r="6" fill="#FAF6EE" stroke="#B45309" strokeWidth="1.4" />
                <circle cx="-42" cy="-17" r="2.5" fill="#B45309" />

                <circle cx="0" cy="-17" r="6" fill="#FAF6EE" stroke="#B45309" strokeWidth="1.4" />
                <circle cx="0" cy="-17" r="2.5" fill="#B45309" />

                <circle cx="42" cy="-17" r="6" fill="#FAF6EE" stroke="#B45309" strokeWidth="1.4" />
                <circle cx="42" cy="-17" r="2.5" fill="#B45309" />

                <circle cx="-24" cy="17" r="6" fill="#FAF6EE" stroke="#B45309" strokeWidth="1.4" />
                <circle cx="-24" cy="17" r="2.5" fill="#B45309" />

                <circle cx="24" cy="17" r="6" fill="#FAF6EE" stroke="#B45309" strokeWidth="1.4" />
                <circle cx="24" cy="17" r="2.5" fill="#B45309" />

                {/* Surface Labels */}
                <text x="0" y="-42" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="700" fill="#B45309" letterSpacing="1">
                  CENTRIX // DRIVE SYNC
                </text>
                <text x="0" y="46" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600" fill="#78716C" letterSpacing="0.8">
                  20K OPS/DAY · 0 EGRESS
                </text>
              </g>

              <text x="96" y="374" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="1" fill="#A8A29E" fontWeight="700">
                L02
              </text>
            </g>
          </g>

          {/* Connectors: L02 -> L03 with animated live streaming pulses */}
          <g pointerEvents="none" opacity={hoveredLayer !== null ? 0.2 : 1} style={{ transition: 'opacity 0.3s' }}>
            <line x1="218" y1="372" x2="218" y2="270" stroke="#E4C090" strokeWidth="1" strokeDasharray="2 5" />
            <circle cx="218" r="2.8" fill="#B45309" filter="url(#ksGlow)">
              <animate attributeName="cy" values="372;270;372" dur="2.0s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;1;0.2" dur="2.0s" repeatCount="indefinite" />
            </circle>
            <g>
              <line x1="152" y1="367" x2="152" y2="265" stroke="rgba(180, 83, 9, 0.45)" strokeWidth="1" />
              <circle cx="152" r="2.2" fill="#E4C090" filter="url(#ksGlow)">
                <animate attributeName="cy" values="367;265;367" dur="2.3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.3s" repeatCount="indefinite" />
              </circle>
            </g>
            <g>
              <line x1="284" y1="377" x2="284" y2="275" stroke="rgba(180, 83, 9, 0.45)" strokeWidth="1" />
              <circle cx="284" r="2.2" fill="#B45309" filter="url(#ksGlow)">
                <animate attributeName="cy" values="275;377;275" dur="2.7s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.3;1" dur="2.7s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* LAYER 03: CLIENT UI & OMTABS EXTENSION (Y = 270) */}
          {/* ========================================================================= */}
          <g
            tabIndex="0"
            role="button"
            aria-label="L03 Interactive UI"
            style={{
              outline: 'none',
              transform: `translateY(${getOffsetY(3)}px)`,
              filter: hoveredLayer === 3 ? 'drop-shadow(0 10px 22px rgba(180, 83, 9, 0.28))' : 'none',
              opacity: hoveredLayer === null ? 1 : hoveredLayer === 3 ? 1 : 0.38,
              transition: 'transform 0.38s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1), filter 0.35s',
            }}
          >
            {/* Right Side Annotation Label */}
            <g pointerEvents="none">
              <line x1="365" y1="270" x2="390" y2="270" stroke="#E4C090" strokeWidth="1" />
              <circle cx="365" cy="270" r="2.5" fill="#B45309" />
              <g opacity={hoveredLayer === 3 ? 0 : 1} style={{ transition: 'opacity 0.2s' }}>
                <text x="398" y="257" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5" fontWeight="600" fill="#B45309">
                  L03 · CLIENT &amp; UI
                </text>
                <text x="398" y="274" fill="#4A3B33" fontSize="14" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                  Modern UI &amp; Extensions
                </text>
                <text x="398" y="288" fill="#78716C" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4">
                  next.js 15 · react · chrome mv3 · omtabs
                </text>
              </g>
            </g>

            {/* 3D Rounded Glassmorphic Slab */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => handleLayerMouseEnter(3)}
              onClick={() => handleLayerMouseEnter(3)}
            >
              <ellipse cx="218" cy="302" rx="140" ry="42" fill="url(#slabGlow)" filter="url(#ksFloorBlur)" opacity={hoveredLayer === 3 ? 0.9 : 0.45} />

              <g transform="matrix(0.894 0.36 -0.894 0.36 218 278)">
                <rect
                  x="-84"
                  y="-84"
                  width="168"
                  height="168"
                  rx="24"
                  fill={hoveredLayer === 3 ? 'url(#extrusionSideActive)' : 'url(#extrusionSide)'}
                  stroke="#B45309"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
              </g>

              <g transform="matrix(0.894 0.36 -0.894 0.36 218 270)">
                <rect
                  x="-84"
                  y="-84"
                  width="168"
                  height="168"
                  rx="24"
                  fill={hoveredLayer === 3 ? 'url(#glassTopActive)' : 'url(#glassTop)'}
                  stroke={hoveredLayer === 3 ? 'url(#glassBorderActive)' : 'url(#glassBorder)'}
                  strokeWidth={hoveredLayer === 3 ? 1.8 : 1.4}
                />
                <rect x="-78" y="-78" width="156" height="156" rx="20" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />

                {/* Miniature Browser Viewport & Tab Strip Wireframe */}
                <rect x="-66" y="-48" width="132" height="96" rx="8" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1.2" />

                {/* Window top bar */}
                <line x1="-66" y1="-30" x2="66" y2="-30" stroke="#F1E9DA" strokeWidth="1" />
                <circle cx="-56" cy="-39" r="2.5" fill="#EF4444" opacity="0.7" />
                <circle cx="-48" cy="-39" r="2.5" fill="#F59E0B" opacity="0.7" />
                <circle cx="-40" cy="-39" r="2.5" fill="#10B981" opacity="0.7" />

                {/* 3 Active OmTabs Pills */}
                <rect x="-26" y="-44" width="28" height="10" rx="3" fill="#FAF6EE" stroke="#B45309" strokeWidth="0.8" />
                <text x="-12" y="-37" textAnchor="middle" fontSize="5.5" fontFamily="JetBrains Mono, monospace" fill="#B45309" fontWeight="700">
                  OMTABS
                </text>

                <rect x="6" y="-44" width="24" height="10" rx="3" fill="#F5EFE3" stroke="#E4D9BC" strokeWidth="0.8" />
                <text x="18" y="-37" textAnchor="middle" fontSize="5.5" fontFamily="JetBrains Mono, monospace" fill="#78716C">
                  REACT
                </text>

                {/* Fuzzy Search Bar */}
                <rect x="-54" y="-20" width="108" height="14" rx="4" fill="#FAF6EE" stroke="#E4D9BC" strokeWidth="0.8" />
                <text x="-46" y="-10.5" fontSize="6" fontFamily="JetBrains Mono, monospace" fill="#A8A29E">
                  &gt; search workspace...
                </text>

                {/* UI Grid Cards */}
                <rect x="-54" y="2" width="50" height="36" rx="4" fill="rgba(180,83,9,0.06)" stroke="#B45309" strokeWidth="0.8" />
                <line x1="-48" y1="10" x2="-14" y2="10" stroke="#B45309" strokeWidth="1" />
                <line x1="-48" y1="18" x2="-22" y2="18" stroke="#E4D9BC" strokeWidth="1" />
                <line x1="-48" y1="26" x2="-30" y2="26" stroke="#E4D9BC" strokeWidth="1" />

                <rect x="4" y="2" width="50" height="36" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="0.8" />
                <circle cx="29" cy="20" r="9" fill="none" stroke="#B45309" strokeWidth="1.2" strokeDasharray="3 2" />
                <circle cx="29" cy="20" r="3" fill="#B45309" />
              </g>

              <text x="96" y="272" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="1" fill="#A8A29E" fontWeight="700">
                L03
              </text>
            </g>
          </g>

          {/* Connectors: L03 -> L04 with animated live streaming pulses */}
          <g pointerEvents="none" opacity={hoveredLayer !== null ? 0.2 : 1} style={{ transition: 'opacity 0.3s' }}>
            <line x1="218" y1="270" x2="218" y2="168" stroke="#E4C090" strokeWidth="1" strokeDasharray="2 5" />
            <circle cx="218" r="2.8" fill="#B45309" filter="url(#ksGlow)">
              <animate attributeName="cy" values="270;168;270" dur="2.1s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;1;0.2" dur="2.1s" repeatCount="indefinite" />
            </circle>
            <g>
              <line x1="152" y1="265" x2="152" y2="163" stroke="rgba(180, 83, 9, 0.45)" strokeWidth="1" />
              <circle cx="152" r="2.2" fill="#E4C090" filter="url(#ksGlow)">
                <animate attributeName="cy" values="265;163;265" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.6s" repeatCount="indefinite" />
              </circle>
            </g>
            <g>
              <line x1="284" y1="275" x2="284" y2="173" stroke="rgba(180, 83, 9, 0.45)" strokeWidth="1" />
              <circle cx="284" r="2.2" fill="#B45309" filter="url(#ksGlow)">
                <animate attributeName="cy" values="173;275;173" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.3;1" dur="2.4s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* LAYER 04: CLOUD & DEVOPS SCALE (Y = 168) */}
          {/* ========================================================================= */}
          <g
            tabIndex="0"
            role="button"
            aria-label="L04 DevOps and Cloud Scale"
            style={{
              outline: 'none',
              transform: `translateY(${getOffsetY(4)}px)`,
              filter: hoveredLayer === 4 ? 'drop-shadow(0 10px 22px rgba(180, 83, 9, 0.28))' : 'none',
              opacity: hoveredLayer === null ? 1 : hoveredLayer === 4 ? 1 : 0.38,
              transition: 'transform 0.38s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1), filter 0.35s',
            }}
          >
            {/* Right Side Annotation Label */}
            <g pointerEvents="none">
              <line x1="365" y1="168" x2="390" y2="168" stroke="#E4C090" strokeWidth="1" />
              <circle cx="365" cy="168" r="2.5" fill="#B45309" />
              <g opacity={hoveredLayer === 4 ? 0 : 1} style={{ transition: 'opacity 0.2s' }}>
                <text x="398" y="155" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5" fontWeight="600" fill="#B45309">
                  L04 · PRODUCTION
                </text>
                <text x="398" y="172" fill="#4A3B33" fontSize="14" fontFamily="var(--font-merriweather), Georgia, serif" fontWeight="700">
                  Cloud &amp; Fast Deployment
                </text>
                <text x="398" y="186" fill="#78716C" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4">
                  ci/cd · docker · edge · vercel
                </text>
              </g>
            </g>

            {/* 3D Rounded Glassmorphic Slab */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => handleLayerMouseEnter(4)}
              onClick={() => handleLayerMouseEnter(4)}
            >
              <ellipse cx="218" cy="200" rx="140" ry="42" fill="url(#slabGlow)" filter="url(#ksFloorBlur)" opacity={hoveredLayer === 4 ? 0.9 : 0.45} />

              <g transform="matrix(0.894 0.36 -0.894 0.36 218 176)">
                <rect
                  x="-84"
                  y="-84"
                  width="168"
                  height="168"
                  rx="24"
                  fill={hoveredLayer === 4 ? 'url(#extrusionSideActive)' : 'url(#extrusionSide)'}
                  stroke="#B45309"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
              </g>

              <g transform="matrix(0.894 0.36 -0.894 0.36 218 168)">
                <rect
                  x="-84"
                  y="-84"
                  width="168"
                  height="168"
                  rx="24"
                  fill={hoveredLayer === 4 ? 'url(#glassTopActive)' : 'url(#glassTop)'}
                  stroke={hoveredLayer === 4 ? 'url(#glassBorderActive)' : 'url(#glassBorder)'}
                  strokeWidth={hoveredLayer === 4 ? 1.8 : 1.4}
                />
                <rect x="-78" y="-78" width="156" height="156" rx="20" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />

                {/* Concentric Edge Radar & Distributed Nodes */}
                <circle cx="0" cy="0" r="52" fill="none" stroke="#E4D9BC" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="0" cy="0" r="34" fill="none" stroke="#E4D9BC" strokeWidth="1" />
                <circle cx="0" cy="0" r="16" fill="rgba(180,83,9,0.08)" stroke="#B45309" strokeWidth="1.4" />
                <circle cx="0" cy="0" r="4" fill="#B45309" />

                {/* 4 Distributed Edge Nodes */}
                <circle cx="-34" cy="0" r="5" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.4" />
                <circle cx="-34" cy="0" r="2" fill="#10B981" />

                <circle cx="34" cy="0" r="5" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.4" />
                <circle cx="34" cy="0" r="2" fill="#10B981" />

                <circle cx="0" cy="-34" r="5" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.4" />
                <circle cx="0" cy="-34" r="2" fill="#10B981" />

                <circle cx="0" cy="34" r="5" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.4" />
                <circle cx="0" cy="34" r="2" fill="#10B981" />

                {/* Surface Labels */}
                <text x="0" y="-54" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="700" fill="#B45309" letterSpacing="1">
                  VERCEL // DOCKER EDGE
                </text>
                <text x="0" y="58" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600" fill="#78716C" letterSpacing="0.8">
                  ZERO-DOWNTIME CI/CD
                </text>
              </g>

              <text x="96" y="170" fontSize="7" fontFamily="JetBrains Mono, monospace" letterSpacing="1" fill="#A8A29E" fontWeight="700">
                L04
              </text>
            </g>
          </g>

          {/* Vertical Bus from L04 to Top HUD */}
          <g pointerEvents="none" opacity={hoveredLayer !== null ? 0.2 : 1} style={{ transition: 'opacity 0.3s' }}>
            <line x1="218" y1="168" x2="218" y2="98" stroke="#B45309" strokeWidth="1" strokeDasharray="2 5" />
            <circle cx="218" r="3" fill="#B45309" filter="url(#ksGlow)">
              <animate attributeName="cy" values="168;98;168" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.4s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Bottom Rail Guide */}
          <g pointerEvents="none">
            <line x1="16" y1="678" x2="626" y2="678" stroke="#E4D9BC" strokeWidth="1" />
            <text x="16" y="698" fill="#A8A29E" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4">
              aniket_stack.live · 5 rounded glass layers · production architecture
            </text>
            <text x="626" y="698" textAnchor="end" fill="#A16207" fontSize="7.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4" fontWeight="600">
              HOVER OR CLICK A LAYER TO INSPECT
            </text>
          </g>
        </svg>

        {/* Interactive Telemetry Popout Card (Slides in on layer hover) */}
        <AnimatePresence>
          {activeData && (
            <motion.div
              key={activeData.idx}
              initial={{ opacity: 0, x: 14, y: '-50%' }}
              animate={{ opacity: 1, x: 0, y: '-50%' }}
              exit={{ opacity: 0, x: 8, y: '-50%' }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              style={{ top: `${cardTopPercent}%`, right: 0 }}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              className="absolute right-0 z-30 pointer-events-auto w-[42%] min-w-[216px] cursor-default"
            >
              <div className="relative overflow-hidden rounded-xl border border-[#E4D9BC] bg-white/95 backdrop-blur-md shadow-[0_16px_36px_-12px_rgba(74,59,51,0.25)]">
                <div className="absolute inset-y-0 left-0 w-[3px] bg-[#B45309]" />
                <div className="p-4">
                  {/* Eyebrow & LIVE indicator */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#B45309]">
                      {activeData.idx}
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

                  {/* Key-Value Stats */}
                  <dl className="mt-3 space-y-1.5 border-t border-[#F1E9DA] pt-3">
                    {activeData.stats.map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-3">
                        <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#A8A29E]">{k}</dt>
                        <dd className="font-mono text-[11px] font-semibold tabular-nums text-[#4A3B33]">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  {/* Code snippet pill */}
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
      </motion.div>
    </div>
  );
}
