"use client";

import React from "react";

/* -------------------------------------------------------------------------- */
/*  VanMarqueeMedical                                                          */
/*  Slow, continuous horizontal loop of medical-accented cargo vans.           */
/*  Based on the standard VanMarquee but with:                                 */
/*    • Purple medical cross on the van body                                   */
/*    • Sterile accent stripe                                                  */
/*    • Deliberately slower cadence — professional, not aggressive             */
/*  Pure CSS keyframes. GPU-safe translate3d only.                             */
/* -------------------------------------------------------------------------- */

interface VanMarqueeMedicalProps {
  count?: number;
  baseDuration?: number;
  className?: string;
}

export default function VanMarqueeMedical({
  count = 4,
  baseDuration = 32,          // noticeably slower than the standard marquee
  className = "",
}: VanMarqueeMedicalProps) {
  return (
    <div
      className={`vmm-root ${className}`}
      aria-hidden="true"
      style={{ overflow: "hidden", width: "100%", position: "relative" }}
    >
      <style>{keyframes}</style>

      {/* Single lane — calm, uniform rhythm */}
      <div
        style={{
          display: "flex",
          width: "max-content",
          willChange: "transform",
          animation: `vmmSlide ${baseDuration}s linear infinite`,
          opacity: 0.45,
        }}
      >
        {[0, 1].map((copy) =>
          Array.from({ length: count }).map((_, i) => (
            <div
              key={`${copy}-${i}`}
              style={{
                flex: "none",
                width: `${100 / count}vw`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.5rem 1.5rem",
              }}
            >
              <MedicalVanSvg width={80} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ── Medical-accented van SVG ────────────────────────────────────────────── */

function MedicalVanSvg({ width }: { width: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 480 220"
      fill="none"
      width={width}
      style={{ color: "var(--brand-primary, #6B2FA0)" }}
    >
      {/* Body */}
      <rect x="40" y="72" width="320" height="108" rx="10"
            fill="#F4F2F8" stroke="currentColor" strokeWidth="2.5" />

      {/* Sterile accent stripe — thin, clinical white-purple fade */}
      <rect x="40" y="134" width="320" height="3" rx="1.5"
            fill="currentColor" opacity=".3" />

      {/* Medical cross — purple, centred on cargo area */}
      <rect x="176" y="92"  width="8" height="30" rx="2"
            fill="currentColor" opacity=".55" />
      <rect x="165" y="101" width="30" height="8"  rx="2"
            fill="currentColor" opacity=".55" />

      {/* Cab windshield */}
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

      {/* Subtle motion lines — fewer, lighter */}
      <line x1="8"  y1="110" x2="26" y2="110"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".2" />
      <line x1="12" y1="130" x2="28" y2="130"
            stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".15" />
    </svg>
  );
}

/* ── Keyframes ───────────────────────────────────────────────────────────── */

const keyframes = /* css */ `
@keyframes vmmSlide {
  0%   { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

.vmm-root {
  pointer-events: none;
  user-select: none;
}

@media (prefers-reduced-motion: reduce) {
  .vmm-root * { animation: none !important; }
}
`;
