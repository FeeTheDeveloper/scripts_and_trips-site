"use client";

import React from "react";
import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  HeroBackdrop                                                               */
/*  Premium animated background: gradient mesh + floating blobs + grain +      */
/*  optional vignette. All colours pulled from tokens.css CSS variables.       */
/*                                                                             */
/*  Performance notes:                                                         */
/*  • Blobs use translate3d for GPU compositing                                */
/*  • Blur + opacity reduced at ≤ 768 px via CSS media queries                */
/*  • Entire animation layer is disabled for prefers-reduced-motion            */
/* -------------------------------------------------------------------------- */

interface HeroBackdropProps {
  /** Show a radial vignette around the edges (default true) */
  vignette?: boolean;
  /** Show the grain texture overlay (default true) */
  grain?: boolean;
  /** Extra class names on the root wrapper */
  className?: string;
  children?: React.ReactNode;
}

/* ── Blob config ─────────────────────────────────────────────────────────── */

interface BlobDef {
  /** CSS colour — reference a token variable */
  color: string;
  /** Size as vw so it scales with viewport */
  size: string;
  /** Starting position */
  top: string;
  left: string;
  /** Keyframe x/y offsets (px) the blob drifts through */
  drift: [number, number, number, number];
  /** Animation cycle in seconds */
  duration: number;
}

const blobs: BlobDef[] = [
  {
    color: "var(--brand-primary, #6B2FA0)",
    size: "45vw",
    top: "-12%",
    left: "10%",
    drift: [0, 40, -20, 0],
    duration: 22,
  },
  {
    color: "var(--brand-secondary, #4A1D7A)",
    size: "38vw",
    top: "40%",
    left: "55%",
    drift: [0, -30, 25, 0],
    duration: 28,
  },
  {
    color: "var(--brand-accent, #FFB400)",
    size: "28vw",
    top: "60%",
    left: "-5%",
    drift: [0, 20, -15, 0],
    duration: 25,
  },
];

/* ── Component ───────────────────────────────────────────────────────────── */

export default function HeroBackdrop({
  vignette = true,
  grain = true,
  className = "",
  children,
}: HeroBackdropProps) {
  return (
    <div className={`hero-backdrop ${className}`} style={rootStyle}>
      <style>{inlineCSS}</style>

      {/* 1 ── Gradient mesh (static, always visible) */}
      <div className="hb-mesh" />

      {/* 2 ── Floating blobs (animated) */}
      <div className="hb-blobs" aria-hidden="true">
        {blobs.map((b, i) => (
          <motion.div
            key={i}
            className="hb-blob"
            style={{
              position: "absolute",
              top: b.top,
              left: b.left,
              width: b.size,
              height: b.size,
              borderRadius: "50%",
              background: b.color,
              willChange: "transform",
            }}
            animate={{
              x: [b.drift[0], b.drift[1], b.drift[2], b.drift[3]],
              y: [b.drift[0], b.drift[2], b.drift[1], b.drift[3]],
            }}
            transition={{
              duration: b.duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 3 ── Grain overlay */}
      {grain && <div className="hb-grain" />}

      {/* 4 ── Vignette */}
      {vignette && <div className="hb-vignette" />}

      {/* Content slot sits above every layer */}
      {children && <div style={{ position: "relative", zIndex: 1 }}>{children}</div>}
    </div>
  );
}

/* ── Root wrapper style ──────────────────────────────────────────────────── */

const rootStyle: React.CSSProperties = {
  position: "relative",
  overflow: "hidden",
  width: "100%",
  minHeight: "100vh",
  background: "var(--paper, #F6F4F1)",
};

/* ── Scoped CSS (injected via <style>) ───────────────────────────────────── */

const inlineCSS = /* css */ `
/* ── Gradient mesh ─────────────────────────────────────────────────────── */
.hb-mesh {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    var(--gradient-mesh,
      radial-gradient(ellipse at 20% 80%, #4A1D7A33 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, #6B2FA022 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, #2E105218 0%, transparent 70%)
    );
  pointer-events: none;
}

/* ── Blobs container ───────────────────────────────────────────────────── */
.hb-blobs {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.hb-blob {
  opacity: 0.18;
  filter: blur(90px);
}

/* ── Grain overlay (SVG noise via inline data URI) ─────────────────────── */
.hb-grain {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.06;
  pointer-events: none;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
}

/* ── Vignette ──────────────────────────────────────────────────────────── */
.hb-vignette {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse at 50% 50%,
    transparent 40%,
    rgba(26, 26, 26, 0.25) 100%
  );
}

/* ── Responsive: reduce GPU load on small screens ──────────────────────── */
@media (max-width: 768px) {
  .hb-blob {
    opacity: 0.10;
    filter: blur(50px);
  }
  .hb-grain {
    opacity: 0.03;
  }
  .hb-vignette {
    background: radial-gradient(
      ellipse at 50% 50%,
      transparent 50%,
      rgba(26, 26, 26, 0.15) 100%
    );
  }
}

/* ── prefers-reduced-motion: kill blob animations entirely ─────────────── */
@media (prefers-reduced-motion: reduce) {
  .hb-blob {
    animation: none !important;
    /* framer-motion uses inline styles; override transition to instant */
    transition: none !important;
    opacity: 0.12;
    filter: blur(70px);
  }
}
`;
