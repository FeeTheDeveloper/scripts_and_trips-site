"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/* -------------------------------------------------------------------------- */
/*  VanStreak                                                                  */
/*  A van that "bursts" across the hero section once on mount, then fades out. */
/*  Entirely GPU-composited (translate3d + opacity).                           */
/* -------------------------------------------------------------------------- */

interface VanStreakProps {
  /** Which van SVG to use */
  src?: string;
  /** Duration of the streak in seconds (default 1.2) */
  duration?: number;
  /** Van height in px (default 64) */
  height?: number;
  /** Vertical position from top of container (CSS value, default "60%") */
  top?: string;
  /** Extra class names on the wrapper */
  className?: string;
}

export default function VanStreak({
  src = "/images/vehicles/van-side.svg",
  duration = 1.2,
  height = 64,
  top = "60%",
  className = "",
}: VanStreakProps) {
  return (
    <div
      className={`van-streak ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        userSelect: "none",
      }}
      aria-hidden="true"
    >
      <motion.div
        initial={{ x: "-20%", opacity: 0 }}
        animate={{ x: "120vw", opacity: [0, 1, 1, 0] }}
        transition={{
          duration,
          ease: [0.22, 1, 0.36, 1], // custom ease-out
          opacity: {
            duration,
            times: [0, 0.1, 0.7, 1], // fade in fast, hold, fade out
          },
        }}
        style={{
          position: "absolute",
          top,
          left: 0,
          willChange: "transform, opacity",
        }}
      >
        {/* Speed-trail element (faux motion blur — lightweight) */}
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          {/* Trail lines rendered via a pseudo-element-like div */}
          <SpeedTrail height={height} />

          <Image
            src={src}
            alt=""
            width={Math.round(height * 2.2)}
            height={height}
            priority
            draggable={false}
            style={{
              height,
              width: "auto",
              color: "var(--brand-primary, #6B2FA0)",
              position: "relative",
              zIndex: 1,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

/* ── Lightweight speed trail (no blur filters) ────────────────────────── */

function SpeedTrail({ height }: { height: number }) {
  const barWidth = height * 2;

  return (
    <div
      style={{
        position: "absolute",
        right: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        width: barWidth,
        height: height * 0.35,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 3,
        opacity: 0.45,
      }}
    >
      {[0.9, 0.6, 0.75, 0.5].map((w, i) => (
        <div
          key={i}
          style={{
            height: 2,
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
