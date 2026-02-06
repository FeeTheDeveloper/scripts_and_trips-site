"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

/* -------------------------------------------------------------------------- */
/*  VanParallax                                                                */
/*  A van that drifts horizontally as the user scrolls.                        */
/*  Uses framer-motion's useScroll + useTransform for GPU-accelerated          */
/*  parallax — no layout thrashing you'd get with raw scroll listeners.        */
/* -------------------------------------------------------------------------- */

interface VanParallaxProps {
  /** Which van SVG to render (path relative to /public) */
  src?: string;
  /** Pixel range the van travels horizontally (default 220) */
  travel?: number;
  /** Height of the van in px (default 80) */
  height?: number;
  /** Extra class names */
  className?: string;
}

export default function VanParallax({
  src = "/images/vehicles/van-side.svg",
  travel = 220,
  height = 80,
  className = "",
}: VanParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track this element's visibility within the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // 0 when top enters, 1 when bottom leaves
  });

  // Map scroll progress → horizontal translate
  const x = useTransform(scrollYProgress, [0, 1], [-travel, travel]);

  return (
    <div
      ref={containerRef}
      className={`van-parallax ${className}`}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        userSelect: "none",
      }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          x,
          willChange: "transform",
        }}
      >
        <Image
          src={src}
          alt=""
          width={Math.round(height * 2.2)}
          height={height}
          priority={false}
          draggable={false}
          style={{ height, width: "auto", color: "var(--brand-primary, #6B2FA0)" }}
        />
      </motion.div>
    </div>
  );
}
