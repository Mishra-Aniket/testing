"use client";

import React from "react";

export default function Project3DVisualizer({ projectId }) {
  // 1. OmTabs — Chrome Tab Management & Privacy Shield
  if (projectId === "omtabs") {
    return (
      <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-start sm:justify-center select-none overflow-x-auto overflow-y-hidden sm:overflow-visible">
        <svg viewBox="0 0 340 180" className="w-full h-full max-h-[220px] min-w-[460px] sm:min-w-0 overflow-visible" preserveAspectRatio="xMidYMid meet">
          <circle cx="16" cy="18" r="2.5" fill="#B45309" />
          <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
            CHROME EXTENSION // OMTABS_SHIELD
          </text>
          <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            OFFICIAL WEB STORE · SUB-10MS
          </text>

          {/* Browser Tab Strip Mockup */}
          <g transform="translate(24, 48)">
            <rect width="292" height="84" rx="6" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1.2" />

            {/* Tab 1: Renamed Tab */}
            <g transform="translate(10, 10)">
              <rect width="84" height="26" rx="4" fill="#FAF6EE" stroke="#B45309" strokeWidth="1" />
              <text x="8" y="17" fill="#B45309" fontSize="6.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
                ✏️ Work Session
              </text>
            </g>

            {/* Tab 2: Shield Locked Tab */}
            <g transform="translate(100, 10)">
              <rect width="88" height="26" rx="4" fill="#FAF6EE" stroke="#059669" strokeWidth="1" />
              <text x="8" y="17" fill="#059669" fontSize="6.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
                🔒 Biometric Shield
              </text>
            </g>

            {/* Tab 3: Centrix Tab */}
            <g transform="translate(194, 10)">
              <rect width="84" height="26" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="0.8" />
              <text x="8" y="17" fill="#78716C" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
                Centrix / GitHub
              </text>
            </g>

            {/* Quick Action Description */}
            <text x="14" y="56" fill="#4A3B33" fontSize="6.8" fontFamily="JetBrains Mono, monospace">
              Shortcut: <tspan fill="#B45309" fontWeight="bold">Alt + Shift + R</tspan> instant rename
            </text>
            <text x="14" y="70" fill="#78716C" fontSize="6" fontFamily="JetBrains Mono, monospace">
              Biometric shield lock &amp; persistent Chrome storage sync
            </text>
          </g>

          <line x1="16" y1="168" x2="324" y2="168" stroke="#E4D9BC" strokeWidth="0.8" strokeDasharray="2 4" />
          <text x="16" y="162" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono, monospace">
            ENGINE: CHROME EXTENSION MANIFEST V3 + WEBAUTHN BIOMETRICS
          </text>
          <text x="324" y="162" textAnchor="end" fill="#059669" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            PRIVACY &amp; TAB HYGIENE
          </text>
        </svg>
      </div>
    );
  }

  // 2. OmSpace — New Tab Dashboard & Focus Studio
  if (projectId === "omspace") {
    return (
      <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-start sm:justify-center select-none overflow-x-auto overflow-y-hidden sm:overflow-visible">
        <svg viewBox="0 0 340 180" className="w-full h-full max-h-[220px] min-w-[460px] sm:min-w-0 overflow-visible" preserveAspectRatio="xMidYMid meet">
          <circle cx="16" cy="18" r="2.5" fill="#B45309" />
          <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
            CHROME DASHBOARD // OMSPACE_V2
          </text>
          <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            OFFICIAL WEB STORE · ZERO LAG
          </text>

          {/* New Tab Window Silhouette */}
          <g transform="translate(20, 44)">
            <rect width="300" height="96" rx="6" fill="#FAF6EE" stroke="#E4D9BC" strokeWidth="1.2" />

            {/* Top Search Bar */}
            <rect x="20" y="12" width="160" height="20" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="0.8" />
            <circle cx="30" cy="22" r="3" fill="#B45309" />
            <text x="38" y="25" fill="#78716C" fontSize="6.2" fontFamily="JetBrains Mono, monospace">
              Search web or jump to URL...
            </text>

            {/* Focus Timer Widget */}
            <rect x="190" y="12" width="90" height="20" rx="4" fill="#FFFFFF" stroke="#059669" strokeWidth="0.8" />
            <circle cx="200" cy="22" r="2.5" fill="#059669" />
            <text x="208" y="25" fill="#059669" fontSize="6.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              Focus: 25:00
            </text>

            {/* Quick Access Tiles */}
            {[
              { name: "GitHub", x: 20 },
              { name: "Drive", x: 74 },
              { name: "Centrix", x: 128 },
              { name: "Notion", x: 182 },
              { name: "Mail", x: 236 },
            ].map((tile, i) => (
              <g key={tile.name} transform={`translate(${tile.x}, 40)`}>
                <rect width="44" height="26" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="0.8" />
                <circle cx="12" cy="13" r="2.5" fill="#B45309" />
                <text x="18" y="15" fill="#4A3B33" fontSize="6" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                  {tile.name}
                </text>
              </g>
            ))}

            {/* Bottom Status Ribbon */}
            <text x="20" y="82" fill="#78716C" fontSize="6" fontFamily="JetBrains Mono, monospace">
              Customizable widgets · Daily wallpaper · Zero cloud footprint
            </text>
          </g>

          <line x1="16" y1="168" x2="324" y2="168" stroke="#E4D9BC" strokeWidth="0.8" strokeDasharray="2 4" />
          <text x="16" y="162" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono, monospace">
            ENGINE: CHROME EXTENSION MANIFEST V3 + REACT WIDGETS
          </text>
          <text x="324" y="162" textAnchor="end" fill="#059669" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            INSTANT BOOT ON EVERY NEW TAB
          </text>
        </svg>
      </div>
    );
  }

  // 3. GPS Cam (GPSnap) — Geotagged Media Stamper
  if (projectId === "gps-cam") {
    return (
      <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-start sm:justify-center select-none overflow-x-auto overflow-y-hidden sm:overflow-visible">
        <svg viewBox="0 0 340 180" className="w-full h-full max-h-[220px] min-w-[460px] sm:min-w-0 overflow-visible" preserveAspectRatio="xMidYMid meet">
          <circle cx="16" cy="18" r="2.5" fill="#B45309" />
          <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
            MOBILE CAM // GPSNAP_KOTLIN
          </text>
          <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            NATIVE ANDROID · CAMERAX
          </text>

          {/* Camera Viewport Frame */}
          <g transform="translate(30, 44)">
            <rect width="180" height="98" rx="6" fill="#18181B" stroke="#B45309" strokeWidth="1.2" />

            {/* Camera Viewfinder Crosshair */}
            <line x1="80" y1="36" x2="100" y2="36" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
            <line x1="90" y1="26" x2="90" y2="46" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
            <circle cx="90" cy="36" r="14" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 2" />

            {/* Geotag Stamp Box Overlay (Bottom of Camera) */}
            <rect x="8" y="58" width="164" height="32" rx="3" fill="#000000" opacity="0.85" />
            <rect x="8" y="58" width="164" height="32" rx="3" fill="none" stroke="#E4D9BC" strokeWidth="0.5" />

            <circle cx="16" cy="67" r="2.5" fill="#EF4444" />
            <text x="22" y="69" fill="#FFFFFF" fontSize="5.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              GPS: 18.5204° N, 73.8567° E · 560m
            </text>
            <text x="12" y="77" fill="#E4C090" fontSize="5" fontFamily="JetBrains Mono, monospace">
              🕒 2026-10-14 10:15:02 IST · Center #603
            </text>
            <text x="12" y="85" fill="#A7F3D0" fontSize="5" fontFamily="JetBrains Mono, monospace">
              ✔ Watermarked MP4/JPG → Google Drive Auto-Sync
            </text>
          </g>

          {/* Right: Architecture Pill */}
          <g transform="translate(222, 52)">
            <rect width="90" height="82" rx="6" fill="#FFFFFF" stroke="#059669" strokeWidth="1.2" />
            <text x="8" y="16" fill="#059669" fontSize="6.8" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              Android Pipeline
            </text>
            <text x="8" y="28" fill="#4A3B33" fontSize="6" fontFamily="JetBrains Mono, monospace">
              • Jetpack Compose
            </text>
            <text x="8" y="38" fill="#4A3B33" fontSize="6" fontFamily="JetBrains Mono, monospace">
              • CameraX Engine
            </text>
            <text x="8" y="48" fill="#4A3B33" fontSize="6" fontFamily="JetBrains Mono, monospace">
              • VideoStamper
            </text>
            <text x="8" y="58" fill="#4A3B33" fontSize="6" fontFamily="JetBrains Mono, monospace">
              • FusedLocation
            </text>
            <text x="8" y="70" fill="#B45309" fontSize="6" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              • Drive Uploader
            </text>
          </g>

          <line x1="210" y1="92" x2="222" y2="92" stroke="#059669" strokeWidth="1.2" strokeDasharray="2 2" />

          <line x1="16" y1="168" x2="324" y2="168" stroke="#E4D9BC" strokeWidth="0.8" strokeDasharray="2 4" />
          <text x="16" y="162" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono, monospace">
            ENGINE: KOTLIN + CAMERAX + GOOGLE PLAY LOCATION SERVICES
          </text>
          <text x="324" y="162" textAnchor="end" fill="#059669" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            AUDIT-GRADE GEOTAG STAMPING
          </text>
        </svg>
      </div>
    );
  }

  // 4. Nexus Streamer — Drive to YouTube Ingestion Matrix
  if (projectId === "nexus-streamer") {
    return (
      <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-start sm:justify-center select-none overflow-x-auto overflow-y-hidden sm:overflow-visible">
        <svg viewBox="0 0 340 180" className="w-full h-full max-h-[220px] min-w-[460px] sm:min-w-0 overflow-visible" preserveAspectRatio="xMidYMid meet">
          <circle cx="16" cy="18" r="2.5" fill="#B45309" />
          <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
            ZERO-RAM MATRIX // DRIVE2YOUTUBE
          </text>
          <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            HUGGINGFACE LIVE SPACE · SSE
          </text>

          {/* Cloud Ingestion Flow */}
          <g transform="translate(24, 60)">
            <rect width="80" height="54" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1" />
            <text x="8" y="18" fill="#4A3B33" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              Google Drive
            </text>
            <text x="8" y="30" fill="#78716C" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
              Large MKV / MP4
            </text>
            <text x="8" y="42" fill="#B45309" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
              Chunk Stream
            </text>
          </g>

          {/* Center Node.js Stream Transform */}
          <g transform="translate(130, 52)">
            <rect width="84" height="68" rx="6" fill="#FAF6EE" stroke="#B45309" strokeWidth="1.4" />
            <circle cx="12" cy="14" r="3" fill="#B45309" />
            <text x="20" y="17" fill="#B45309" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              Zero-RAM Pipe
            </text>
            <text x="10" y="32" fill="#4A3B33" fontSize="6" fontFamily="JetBrains Mono, monospace">
              • stream.Transform
            </text>
            <text x="10" y="42" fill="#4A3B33" fontSize="6" fontFamily="JetBrains Mono, monospace">
              • SSE Progress
            </text>
            <text x="10" y="54" fill="#059669" fontSize="6" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              • Constant Buffer
            </text>
          </g>

          <line x1="104" y1="87" x2="130" y2="87" stroke="#B45309" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="214" y1="87" x2="240" y2="87" stroke="#059669" strokeWidth="1.4" />

          {/* Right YouTube Upload */}
          <g transform="translate(240, 60)">
            <rect width="78" height="54" rx="4" fill="#FFFFFF" stroke="#EF4444" strokeWidth="1.2" />
            <text x="8" y="18" fill="#EF4444" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              YouTube API
            </text>
            <text x="8" y="30" fill="#4A3B33" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
              Unlisted Asset
            </text>
            <text x="8" y="42" fill="#059669" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
              SSE Broadcast
            </text>
          </g>

          <line x1="16" y1="168" x2="324" y2="168" stroke="#E4D9BC" strokeWidth="0.8" strokeDasharray="2 4" />
          <text x="16" y="162" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono, monospace">
            DEPLOYED: PWVP-DRIVE2YOUTUBE.HF.SPACE + GOOGLE DOCS RUNBOOK
          </text>
          <text x="324" y="162" textAnchor="end" fill="#059669" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            ZERO-GRAVITY CLOUD PIPELINE
          </text>
        </svg>
      </div>
    );
  }

  // 5. RadialMenu — Windows Radial App Launcher
  if (projectId === "radialmenu") {
    const slots = [
      { num: 1, angle: 0 },
      { num: 2, angle: 45 },
      { num: 3, angle: 90 },
      { num: 4, angle: 135 },
      { num: 5, angle: 180 },
      { num: 6, angle: 225 },
      { num: 7, angle: 270 },
      { num: 8, angle: 315 },
    ];

    return (
      <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-start sm:justify-center select-none overflow-x-auto overflow-y-hidden sm:overflow-visible">
        <svg viewBox="0 0 340 180" className="w-full h-full max-h-[220px] min-w-[460px] sm:min-w-0 overflow-visible" preserveAspectRatio="xMidYMid meet">
          <circle cx="16" cy="18" r="2.5" fill="#B45309" />
          <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
            WINDOWS HUD // RADIAL_WPF_8
          </text>
          <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            GITHUB RELEASES LIVE · SUB-5MS
          </text>

          {/* Central Radial Wheel */}
          <g transform="translate(170, 88)">
            <circle r="52" fill="none" stroke="#E4D9BC" strokeWidth="1" strokeDasharray="3 3" />
            <circle r="42" fill="none" stroke="#E4C090" strokeWidth="1.2" />

            <circle r="20" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.4" />
            <text y="-2" textAnchor="middle" fill="#B45309" fontSize="6.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              Ctrl+Space
            </text>
            <text y="7" textAnchor="middle" fill="#78716C" fontSize="5.5" fontFamily="JetBrains Mono, monospace">
              LAUNCHER
            </text>

            {slots.map((s) => {
              const rad = (s.angle * Math.PI) / 180;
              const sx = Math.cos(rad) * 44;
              const sy = Math.sin(rad) * 44;
              return (
                <g key={s.num} transform={`translate(${sx}, ${sy})`}>
                  <circle r="8" fill="#FAF6EE" stroke="#B45309" strokeWidth="0.8" />
                  <text y="2.5" textAnchor="middle" fill="#4A3B33" fontSize="6" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
                    {s.num}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Left: Power-User Features */}
          <g transform="translate(18, 65)">
            <rect width="78" height="52" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1" />
            <text x="8" y="16" fill="#B45309" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              Features
            </text>
            <text x="8" y="28" fill="#4A3B33" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
              • Fuzzy Search
            </text>
            <text x="8" y="38" fill="#4A3B33" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
              • Glassmorphism
            </text>
            <text x="8" y="47" fill="#059669" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
              • 0% CPU Idle
            </text>
          </g>

          {/* Right: Windows Stack */}
          <g transform="translate(244, 65)">
            <rect width="78" height="52" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1" />
            <text x="8" y="16" fill="#059669" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              Releases Live
            </text>
            <text x="8" y="28" fill="#4A3B33" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
              • .NET 8.0 SDK
            </text>
            <text x="8" y="38" fill="#4A3B33" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
              • Native Win32
            </text>
            <text x="8" y="47" fill="#78716C" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
              • GitHub Releases
            </text>
          </g>

          <line x1="16" y1="168" x2="324" y2="168" stroke="#E4D9BC" strokeWidth="0.8" strokeDasharray="2 4" />
          <text x="16" y="162" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono, monospace">
            LIVE: ANIKETMISHRA-0.GITHUB.IO/REDIALMENU-RELEASES/
          </text>
          <text x="324" y="162" textAnchor="end" fill="#059669" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            HARDWARE-ACCELERATED HUD
          </text>
        </svg>
      </div>
    );
  }

  // 6. ImgWorld.buzz — Client-Side Image Tools Studio
  if (projectId === "imgworld") {
    return (
      <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-start sm:justify-center select-none overflow-x-auto overflow-y-hidden sm:overflow-visible">
        <svg viewBox="0 0 340 180" className="w-full h-full max-h-[220px] min-w-[460px] sm:min-w-0 overflow-visible" preserveAspectRatio="xMidYMid meet">
          <circle cx="16" cy="18" r="2.5" fill="#B45309" />
          <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
            CLIENT RUNTIME // IMWORLD_BUZZ
          </text>
          <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            LIVE: IMWORLD.BUZZ · 100% PRIVATE
          </text>

          <rect x="20" y="42" width="300" height="106" rx="6" fill="#FAF6EE" stroke="#E4D9BC" strokeWidth="1" strokeDasharray="4 3" />
          <text x="28" y="54" fill="#78716C" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            BROWSER MEMORY SANDBOX (ZERO CLOUD UPLOAD)
          </text>

          <g transform="translate(36, 64)">
            <rect width="66" height="66" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1" />
            <rect x="8" y="8" width="50" height="36" rx="2" fill="#E4C090" opacity="0.6" />
            <text x="8" y="56" fill="#4A3B33" fontSize="6" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              Raw Image (JPG)
            </text>
          </g>

          <g transform="translate(132, 60)">
            <rect width="84" height="74" rx="6" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.2" />
            <circle cx="12" cy="14" r="3" fill="#B45309" />
            <text x="20" y="17" fill="#B45309" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              ONNX Web AI
            </text>
            <text x="10" y="32" fill="#4A3B33" fontSize="6" fontFamily="JetBrains Mono, monospace">
              • @imgly bg-remove
            </text>
            <text x="10" y="42" fill="#4A3B33" fontSize="6" fontFamily="JetBrains Mono, monospace">
              • WebAssembly Tensor
            </text>
            <text x="10" y="52" fill="#4A3B33" fontSize="6" fontFamily="JetBrains Mono, monospace">
              • Native Canvas API
            </text>
            <text x="10" y="64" fill="#059669" fontSize="6" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              • 0KB Server Upload
            </text>
          </g>

          <line x1="102" y1="96" x2="132" y2="96" stroke="#B45309" strokeWidth="1.2" strokeDasharray="2 2" />
          <line x1="216" y1="96" x2="242" y2="96" stroke="#059669" strokeWidth="1.2" />

          <g transform="translate(242, 64)">
            <rect width="66" height="66" rx="4" fill="#FFFFFF" stroke="#059669" strokeWidth="1" />
            <rect x="8" y="8" width="25" height="18" fill="#F1E9DA" />
            <rect x="33" y="26" width="25" height="18" fill="#F1E9DA" />
            <circle cx="33" cy="26" r="14" fill="#B45309" opacity="0.8" />
            <text x="8" y="56" fill="#059669" fontSize="6" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              Alpha PNG Cutout
            </text>
          </g>

          <line x1="16" y1="168" x2="324" y2="168" stroke="#E4D9BC" strokeWidth="0.8" strokeDasharray="2 4" />
          <text x="16" y="162" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono, monospace">
            LIVE PRODUCTION: WWW.IMGWORLD.BIZ · REACT 19 + VITE
          </text>
          <text x="324" y="162" textAnchor="end" fill="#059669" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            STRICT ZERO TELEMETRY
          </text>
        </svg>
      </div>
    );
  }

  // 7. Qpic — Smart Exam Paper Splitter & OCR Studio
  if (projectId === "qpic") {
    return (
      <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-start sm:justify-center select-none overflow-x-auto overflow-y-hidden sm:overflow-visible">
        <svg viewBox="0 0 340 180" className="w-full h-full max-h-[220px] min-w-[460px] sm:min-w-0 overflow-visible" preserveAspectRatio="xMidYMid meet">
          <circle cx="16" cy="18" r="2.5" fill="#B45309" />
          <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
            DOC INTELLIGENCE // QPIC_14_STAGE
          </text>
          <text x="325" y="21" textAnchor="end" fill="#B45309" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            DEMO WILL BE PROVIDED SOON
          </text>

          <g transform="translate(18, 48)">
            <g transform="translate(0, 0)">
              <rect width="84" height="24" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1" />
              <circle cx="8" cy="12" r="2.5" fill="#059669" />
              <text x="15" y="15" fill="#4A3B33" fontSize="6.8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                Tier 1: Text Layer
              </text>
            </g>
            <g transform="translate(0, 32)">
              <rect width="84" height="24" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1" />
              <circle cx="8" cy="12" r="2.5" fill="#B45309" />
              <text x="15" y="15" fill="#4A3B33" fontSize="6.8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                Tier 2: Tesseract OCR
              </text>
            </g>
            <g transform="translate(0, 64)">
              <rect width="84" height="24" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1" />
              <circle cx="8" cy="12" r="2.5" fill="#6366F1" />
              <text x="15" y="15" fill="#4A3B33" fontSize="6.8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                Tier 3: Vision AI
              </text>
            </g>
          </g>

          <path d="M 102 60 L 126 92" stroke="#E4D9BC" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M 102 92 L 126 92" stroke="#B45309" strokeWidth="1.2" />
          <path d="M 102 124 L 126 92" stroke="#E4D9BC" strokeWidth="1" strokeDasharray="2 2" />

          <g transform="translate(126, 46)">
            <rect width="102" height="92" rx="4" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.2" />
            <line x1="51" y1="8" x2="51" y2="84" stroke="#E4D9BC" strokeWidth="0.8" strokeDasharray="2 2" />

            <rect x="6" y="12" width="40" height="28" rx="2" fill="#FAF6EE" stroke="#B45309" strokeWidth="0.8" />
            <text x="10" y="22" fill="#B45309" fontSize="6" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              Q.14 (ENG)
            </text>
            <line x1="10" y1="28" x2="40" y2="28" stroke="#D4B895" strokeWidth="1.5" />
            <line x1="10" y1="33" x2="32" y2="33" stroke="#D4B895" strokeWidth="1.5" />

            <rect x="56" y="12" width="40" height="28" rx="2" fill="#FAF6EE" stroke="#059669" strokeWidth="0.8" />
            <text x="60" y="22" fill="#059669" fontSize="6" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              प्रश्न 14 (HIN)
            </text>
            <line x1="60" y1="28" x2="90" y2="28" stroke="#A7F3D0" strokeWidth="1.5" />
            <line x1="60" y1="33" x2="82" y2="33" stroke="#A7F3D0" strokeWidth="1.5" />

            <rect x="6" y="52" width="90" height="30" rx="3" fill="#F5EBDC" stroke="#E4D9BC" strokeWidth="0.8" />
            <text x="10" y="64" fill="#4A3B33" fontSize="6" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              Auto Answer Key Matrix
            </text>
            <text x="10" y="74" fill="#78716C" fontSize="5.5" fontFamily="JetBrains Mono, monospace">
              1-B · 2-D · 3-A · 4-C → answers.csv
            </text>
          </g>

          <line x1="228" y1="92" x2="248" y2="92" stroke="#B45309" strokeWidth="1.2" strokeDasharray="3 2" />

          <g transform="translate(248, 56)">
            <rect width="78" height="72" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1" />
            <text x="8" y="16" fill="#4A3B33" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              Export Bundle
            </text>
            <text x="8" y="30" fill="#B45309" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
              • Q.zip (Crops)
            </text>
            <text x="8" y="42" fill="#059669" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
              • S.zip (Solutions)
            </text>
            <text x="8" y="54" fill="#78716C" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
              • answers.csv
            </text>
            <text x="8" y="64" fill="#6366F1" fontSize="6" fontFamily="JetBrains Mono, monospace">
              Flutter Desktop
            </text>
          </g>

          <line x1="16" y1="168" x2="324" y2="168" stroke="#E4D9BC" strokeWidth="0.8" strokeDasharray="2 4" />
          <text x="16" y="162" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono, monospace">
            ENGINE: FASTAPI + FLUTTER SIDECAR + PYMUPDF
          </text>
          <text x="324" y="162" textAnchor="end" fill="#059669" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            AUTO DESKEW &amp; SNAP-TO-CONTENT
          </text>
        </svg>
      </div>
    );
  }

  // 8. Office Mobile — Google Sheet to Mobile Interface
  if (projectId === "officemobile") {
    return (
      <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-start sm:justify-center select-none overflow-x-auto overflow-y-hidden sm:overflow-visible">
        <svg viewBox="0 0 340 180" className="w-full h-full max-h-[220px] min-w-[460px] sm:min-w-0 overflow-visible" preserveAspectRatio="xMidYMid meet">
          <circle cx="16" cy="18" r="2.5" fill="#B45309" />
          <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
            DYNAMIC SCHEMA // OFFICE_MOBILE
          </text>
          <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            OAUTH 2.0 · LIVE PWA
          </text>

          <g transform="translate(18, 50)">
            <rect width="96" height="80" rx="4" fill="#FFFFFF" stroke="#059669" strokeWidth="1.2" />
            <rect x="0" y="0" width="96" height="18" rx="4" fill="#059669" />
            <text x="8" y="12" fill="#FFFFFF" fontSize="6.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              Google Sheet URL
            </text>

            <line x1="0" y1="36" x2="96" y2="36" stroke="#E4D9BC" strokeWidth="0.8" />
            <line x1="0" y1="52" x2="96" y2="52" stroke="#E4D9BC" strokeWidth="0.8" />
            <line x1="0" y1="66" x2="96" y2="66" stroke="#E4D9BC" strokeWidth="0.8" />
            <line x1="32" y1="18" x2="32" y2="80" stroke="#E4D9BC" strokeWidth="0.8" />
            <line x1="64" y1="18" x2="64" y2="80" stroke="#E4D9BC" strokeWidth="0.8" />

            <text x="6" y="28" fill="#78716C" fontSize="5.5" fontFamily="JetBrains Mono, monospace">Col A</text>
            <text x="38" y="28" fill="#78716C" fontSize="5.5" fontFamily="JetBrains Mono, monospace">Col B</text>
            <text x="70" y="28" fill="#78716C" fontSize="5.5" fontFamily="JetBrains Mono, monospace">Col C</text>
          </g>

          <g transform="translate(122, 78)">
            <line x1="0" y1="6" x2="40" y2="6" stroke="#B45309" strokeWidth="1.4" />
            <line x1="40" y1="18" x2="0" y2="18" stroke="#059669" strokeWidth="1.4" strokeDasharray="3 2" />
            <text x="20" y="0" textAnchor="middle" fill="#B45309" fontSize="6" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              Bi-directional
            </text>
          </g>

          <g transform="translate(176, 44)">
            <rect width="68" height="98" rx="8" fill="#FFFFFF" stroke="#4A3B33" strokeWidth="1.4" />
            <rect x="22" y="4" width="24" height="4" rx="2" fill="#E4D9BC" />

            <text x="8" y="22" fill="#B45309" fontSize="6.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              Dynamic Form
            </text>
            <rect x="8" y="28" width="52" height="12" rx="2" fill="#FAF6EE" stroke="#E4D9BC" strokeWidth="0.8" />
            <text x="12" y="36" fill="#78716C" fontSize="5" fontFamily="JetBrains Mono, monospace">Enter Name...</text>

            <rect x="8" y="44" width="52" height="12" rx="2" fill="#FAF6EE" stroke="#E4D9BC" strokeWidth="0.8" />
            <text x="12" y="52" fill="#78716C" fontSize="5" fontFamily="JetBrains Mono, monospace">Select Status...</text>

            <rect x="8" y="66" width="52" height="14" rx="3" fill="#B45309" />
            <text x="34" y="75" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              1-Tap Sync
            </text>
          </g>

          <g transform="translate(254, 62)">
            <rect width="70" height="58" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1" />
            <text x="8" y="16" fill="#059669" fontSize="6.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              Live App
            </text>
            <text x="8" y="28" fill="#4A3B33" fontSize="6" fontFamily="JetBrains Mono, monospace">
              • Vercel Edge
            </text>
            <text x="8" y="38" fill="#4A3B33" fontSize="6" fontFamily="JetBrains Mono, monospace">
              • Zero DB Setup
            </text>
            <text x="8" y="48" fill="#78716C" fontSize="6" fontFamily="JetBrains Mono, monospace">
              • Next.js App
            </text>
          </g>

          <line x1="16" y1="168" x2="324" y2="168" stroke="#E4D9BC" strokeWidth="0.8" strokeDasharray="2 4" />
          <text x="16" y="162" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono, monospace">
            LIVE: OFFICEMOBILE.VERCEL.APP · NEXT.JS + GOOGLE SHEETS API
          </text>
          <text x="324" y="162" textAnchor="end" fill="#059669" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            ZERO CODE SETUP FOR USERS
          </text>
        </svg>
      </div>
    );
  }

  // 9. Centrix — PW Autonomous Ingestion Pipeline (LAST)
  return (
    <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-start sm:justify-center select-none overflow-x-auto overflow-y-hidden sm:overflow-visible">
      <svg viewBox="0 0 340 180" className="w-full h-full max-h-[220px] min-w-[460px] sm:min-w-0 overflow-visible" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="centrixStreamLast" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B45309" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <circle cx="16" cy="18" r="2.5" fill="#B45309" />
        <text x="25" y="21" fill="#B45309" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="1.2">
          PW CENTRIX // EDGE_INGESTION_V2
        </text>
        <text x="325" y="21" textAnchor="end" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          LIVE DEMO AVAILABLE · EDGE-FIRST
        </text>

        <g transform="translate(18, 52)">
          <rect width="78" height="34" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1" />
          <text x="8" y="15" fill="#4A3B33" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
            Classroom PC
          </text>
          <text x="8" y="26" fill="#78716C" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            OBS .mp4 (4-8 GB)
          </text>
        </g>

        <g transform="translate(18, 98)">
          <rect width="78" height="34" rx="4" fill="#FFFFFF" stroke="#E4D9BC" strokeWidth="1" />
          <text x="8" y="15" fill="#4A3B33" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
            MaxHub Board
          </text>
          <text x="8" y="26" fill="#78716C" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            Notes .pdf (Slides)
          </text>
        </g>

        <path d="M 96 69 C 120 69, 120 92, 138 92" fill="none" stroke="#B45309" strokeWidth="1.2" strokeDasharray="3 3" />
        <path d="M 96 115 C 120 115, 120 92, 138 92" fill="none" stroke="#B45309" strokeWidth="1.2" strokeDasharray="3 3" />

        <g transform="translate(138, 62)">
          <rect width="84" height="60" rx="6" fill="#FAF6EE" stroke="#B45309" strokeWidth="1.4" />
          <circle cx="12" cy="14" r="3" fill="#B45309" />
          <text x="20" y="17" fill="#B45309" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
            Centrix Core
          </text>
          <text x="10" y="32" fill="#4A3B33" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            • SQLite WAL
          </text>
          <text x="10" y="42" fill="#4A3B33" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            • Confidence Match
          </text>
          <text x="10" y="52" fill="#059669" fontSize="6.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            • Conf: 98.4%
          </text>
        </g>

        <line x1="222" y1="92" x2="252" y2="92" stroke="url(#centrixStreamLast)" strokeWidth="2" strokeDasharray="3 2" />

        <g transform="translate(252, 65)">
          <rect width="72" height="54" rx="6" fill="#FFFFFF" stroke="#059669" strokeWidth="1.2" />
          <text x="8" y="16" fill="#059669" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
            Google Drive
          </text>
          <text x="8" y="28" fill="#4A3B33" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            Direct Chunked
          </text>
          <text x="8" y="38" fill="#78716C" fontSize="6.5" fontFamily="JetBrains Mono, monospace">
            Resumable v3
          </text>
          <text x="8" y="47" fill="#059669" fontSize="6.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            10k+ / day
          </text>
        </g>

        <line x1="16" y1="168" x2="324" y2="168" stroke="#E4D9BC" strokeWidth="0.8" strokeDasharray="2 4" />
        <text x="16" y="162" fill="#78716C" fontSize="7" fontFamily="JetBrains Mono, monospace">
          LIVE DEMO: ANIKETMISHRA-0.GITHUB.IO/CENTRIX_DEMO/
        </text>
        <text x="324" y="162" textAnchor="end" fill="#059669" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          AUTO-MATCH RATE: 95%+
        </text>
      </svg>
    </div>
  );
}
