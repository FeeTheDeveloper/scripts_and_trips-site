"use client";

import React from "react";

/* -------------------------------------------------------------------------- */
/*  VanMarquee                                                                 */
/*  Infinite horizontal loop of cargo vans at staggered speeds.                */
/*  Pure CSS keyframes — no JS animation runtime needed.                       */
/* -------------------------------------------------------------------------- */

interface VanMarqueeProps {
  /** Number of van instances per lane (default 4) */
  count?: number;
  /** Base duration in seconds for the slowest lane (default 18) */
  baseDuration?: number;
  /** Extra class names on the outer wrapper */
  className?: string;
}

/**
 * Renders 2 "lanes" of vans scrolling left-to-right at different speeds.
 * Each lane duplicates its children so the loop is seamless.
 */
export default function VanMarquee({
  count = 4,
  baseDuration = 18,
  className = "",
}: VanMarqueeProps) {
  return (
    <div
      className={`van-marquee ${className}`}
      aria-hidden="true"
      style={{ overflow: "hidden", width: "100%", position: "relative" }}
    >
      <style>{marqueeCSS(baseDuration)}</style>

      {/* Lane 1 — slower, larger vans */}
      <Lane count={count} duration={baseDuration} size={72} opacity={0.55} />

      {/* Lane 2 — faster, smaller vans */}
      <Lane count={count} duration={baseDuration * 0.6} size={48} opacity={0.3} />
    </div>
  );
}

/* ── Lane sub-component ──────────────────────────────────────────────────── */

function Lane({
  count,
  duration,
  size,
  opacity,
}: {
  count: number;
  duration: number;
  size: number;
  opacity: number;
}) {
  const vans = Array.from({ length: count });

  return (
    <div
      style={{
        display: "flex",
        width: "max-content",
        willChange: "transform",
        animation: `vanMarquee ${duration}s linear infinite`,
        opacity,
      }}
    >
      {/* Two copies for seamless wrap */}
      {[0, 1].map((copy) =>
        vans.map((_, i) => (
          <div
            key={`${copy}-${i}`}
            style={{
              flex: "none",
              width: `${100 / count}vw`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5rem 1rem",
            }}
          >
            <VanSvg width={size} />
          </div>
        ))
      )}
    </div>
  );
}

/* ── Inline van SVG (side profile, slimmed down) ──────────────────────── */

function VanSvg({ width }: { width: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 480 220"
      fill="none"
      width={width}
      style={{ color: "var(--brand-primary, #6B2FA0)" }}
    >
      <rect x="40" y="72" width="320" height="108" rx="10" fill="#F4F2F8" stroke="currentColor" strokeWidth="2.5" />
      <rect x="40" y="140" width="320" height="4" rx="2" fill="currentColor" opacity=".6" />
      <path d="M365 78 L390 78 Q396 78 400 86 L414 126 Q416 130 412 132 L365 132 Z" fill="#DDDAF0" stroke="currentColor" strokeWidth="1.5" />
      <path d="M360 72 L400 72 Q424 72 432 96 L440 130" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="432" y="118" width="14" height="10" rx="3" fill="#FFB400" opacity=".9" />
      <circle cx="120" cy="186" r="24" fill="#2E1052" />
      <circle cx="120" cy="186" r="14" fill="#4A1D7A" />
      <circle cx="120" cy="186" r="6" fill="#DDDAF0" />
      <circle cx="380" cy="186" r="24" fill="#2E1052" />
      <circle cx="380" cy="186" r="14" fill="#4A1D7A" />
      <circle cx="380" cy="186" r="6" fill="#DDDAF0" />
      {/* Speed lines */}
      <line x1="4" y1="100" x2="30" y2="100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".35" />
      <line x1="10" y1="120" x2="34" y2="120" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".25" />
      <line x1="6" y1="140" x2="28" y2="140" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".3" />
    </svg>
  );
}

/* ── Keyframes (injected as a <style> tag) ────────────────────────────── */

function marqueeCSS(baseDuration: number) {
  return `
@keyframes vanMarquee {
  0%   { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

.van-marquee {
  pointer-events: none;
  user-select: none;
}
`;
}
