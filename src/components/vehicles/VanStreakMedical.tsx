"use client";

import React from "react";
import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  VanStreakMedical                                                            */
/*  A medical-accented van glides across the hero once on load.                */
/*  Slower and more composed than the standard VanStreak — professional        */
/*  urgency, not chaos. GPU-safe: translate3d + opacity only.                  */
/* -------------------------------------------------------------------------- */

interface VanStreakMedicalProps {
  /** Duration of the streak in seconds (default 2.4 — deliberately measured) */
  duration?: number;
  /** Van height in px (default 56) */
  height?: number;
  /** Vertical position from top of container (CSS value) */
  top?: string;
  className?: string;
}

export default function VanStreakMedical({
  duration = 2.4,
  height = 56,
  top = "62%",
  className = "",
}: VanStreakMedicalProps) {
  return (
    <div
      className={`vsm-root ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        userSelect: "none",
      }}
      aria-hidden="true"
    >
      <style>{scopedCSS}</style>

      <motion.div
        initial={{ x: "-15%", opacity: 0 }}
        animate={{ x: "110vw", opacity: [0, 0.9, 0.9, 0] }}
        transition={{
          duration,
          ease: [0.33, 1, 0.68, 1],       // smooth ease-out, no snap
          opacity: {
            duration,
            times: [0, 0.08, 0.72, 1],
          },
        }}
        style={{
          position: "absolute",
          top,
          left: 0,
          willChange: "transform, opacity",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Sterile trail lines */}
        <SterileTrail height={height} />

        {/* Medical van inline SVG */}
        <MedicalVanSvg height={height} />
      </motion.div>
    </div>
  );
}

/* ── Medical van SVG (side-profile with cross + sterile stripe) ──────────── */

function MedicalVanSvg({ height }: { height: number }) {
  const width = Math.round(height * 2.2);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 480 220"
      fill="none"
      width={width}
      height={height}
      style={{ color: "var(--brand-primary, #6B2FA0)", position: "relative", zIndex: 1 }}
    >
      {/* Body */}
      <rect x="40" y="72" width="320" height="108" rx="10"
            fill="#F4F2F8" stroke="currentColor" strokeWidth="2.5" />

      {/* Sterile accent stripe */}
      <rect x="40" y="134" width="320" height="3" rx="1.5"
            fill="currentColor" opacity=".3" />

      {/* Medical cross */}
      <rect x="176" y="92"  width="8"  height="30" rx="2"
            fill="currentColor" opacity=".55" />
      <rect x="165" y="101" width="30" height="8"  rx="2"
            fill="currentColor" opacity=".55" />

      {/* Cab */}
      <path d="M365 78 L390 78 Q396 78 400 86 L414 126 Q416 130 412 132 L365 132 Z"
            fill="#DDDAF0" stroke="currentColor" strokeWidth="1.5" />
      <path d="M360 72 L400 72 Q424 72 432 96 L440 130"
            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

      {/* Headlight */}
      <rect x="432" y="118" width="14" height="10" rx="3"
            fill="#FFB400" opacity=".9" />

      {/* Wheels */}
      <circle cx="120" cy="186" r="24" fill="#2E1052" />
      <circle cx="120" cy="186" r="14" fill="#4A1D7A" />
      <circle cx="120" cy="186" r="6"  fill="#DDDAF0" />
      <circle cx="380" cy="186" r="24" fill="#2E1052" />
      <circle cx="380" cy="186" r="14" fill="#4A1D7A" />
      <circle cx="380" cy="186" r="6"  fill="#DDDAF0" />

      {/* Subtle motion lines */}
      <line x1="8"  y1="110" x2="26" y2="110"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".22" />
      <line x1="14" y1="130" x2="28" y2="130"
            stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".16" />
    </svg>
  );
}

/* ── Sterile trail — thin, clean lines (no blur) ─────────────────────────── */

function SterileTrail({ height }: { height: number }) {
  const trailW = height * 2.5;

  return (
    <div
      style={{
        position: "relative",
        zIndex: 0,
        width: trailW,
        height: height * 0.28,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 3,
        opacity: 0.32,
        marginRight: -4,
      }}
    >
      {[0.95, 0.55, 0.75].map((w, i) => (
        <div
          key={i}
          style={{
            height: 1.5,
            width: `${w * 100}%`,
            marginLeft: `${(1 - w) * 100}%`,
            borderRadius: 1,
            background: "var(--brand-primary, #6B2FA0)",
          }}
        />
      ))}
    </div>
  );
}

/* ── Scoped CSS ──────────────────────────────────────────────────────────── */

const scopedCSS = /* css */ `
@media (prefers-reduced-motion: reduce) {
  .vsm-root { display: none; }
}
`;
