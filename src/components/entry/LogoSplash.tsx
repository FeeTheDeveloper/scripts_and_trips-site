"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

/* -------------------------------------------------------------------------- */
/*  LogoSplash                                                                 */
/*  Full-screen cinematic brand entry overlay.                                 */
/*                                                                             */
/*  Gate logic lives in EntryGate — this component is purely presentational.   */
/*  The parent passes `onComplete` which fires when the splash is done.        */
/*                                                                             */
/*  SEO safety: `children` are always rendered in the DOM (behind the fixed    */
/*  overlay) so crawlers see the full page content.                            */
/* -------------------------------------------------------------------------- */

const SPLASH_HOLD_MS = 2200; // time the logo stays visible before exit anim

/* ── Cinematic easings ───────────────────────────────────────────────────── */
type Ease4 = [number, number, number, number];
const easeIn: Ease4 = [0.55, 0, 1, 0.45];
const easeOut: Ease4 = [0, 0.55, 0.45, 1];
const easeCine: Ease4 = [0.76, 0, 0.24, 1];

/* ── Props ───────────────────────────────────────────────────────────────── */

interface LogoSplashProps {
  /** Public-relative path to the logo asset */
  logoSrc?: string;
  /** Enable sound hook placeholder (default false) */
  enableSound?: boolean;
  /** Called when the splash animation finishes or is skipped */
  onComplete?: () => void;
  children: React.ReactNode;
}

/* ── Component ───────────────────────────────────────────────────────────── */

export default function LogoSplash({
  logoSrc = "/logo.PNG",
  enableSound = false,
  onComplete,
  children,
}: LogoSplashProps) {
  const prefersReduced = useReducedMotion();
  const [showOverlay, setShowOverlay] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  /* ── Reduced-motion: skip immediately ─────────────────────────────────── */
  useEffect(() => {
    if (prefersReduced) dismiss();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReduced]);

  /* ── Auto-dismiss timer ───────────────────────────────────────────────── */
  useEffect(() => {
    if (!showOverlay) return;
    timerRef.current = setTimeout(() => dismiss(), SPLASH_HOLD_MS);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showOverlay]);

  const dismiss = useCallback(() => {
    setShowOverlay(false);
    onComplete?.();
  }, [onComplete]);

  /* ── Sound hook placeholder ───────────────────────────────────────────── */
  useEffect(() => {
    if (!enableSound || !showOverlay) return;
    // Uncomment when a sound file is available:
    // const audio = new Audio("/brand/sfx/splash.mp3");
    // audio.volume = 0.3;
    // audio.play().catch(() => {});
  }, [enableSound, showOverlay]);

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="splash"
            style={backdropStyle}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
            aria-hidden="true"
            onClick={dismiss}          /* tap/click to skip */
            role="presentation"
          >
            <style>{scopedCSS}</style>

            {/* Glow behind logo */}
            <motion.div
              className="ls-glow"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 1.4, ease: easeCine }}
            />

            {/* Logo */}
            <motion.div
              className="ls-logo-wrap"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{
                opacity:  { duration: 0.9, ease: easeIn },
                scale:    { duration: 1.4, ease: easeCine },
              }}
            >
              <Image
                src={logoSrc}
                alt="Scripts and Trips Delivery"
                width={900}
                height={900}
                sizes="(max-width: 768px) 85vw, 70vw"
                priority
                draggable={false}
                className="ls-logo-img"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main site content — always in the DOM for SEO, fades in as splash exits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showOverlay ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
      >
        {children}
      </motion.div>
    </>
  );
}

/* ── Backdrop inline style ───────────────────────────────────────────────── */

const backdropStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  /* Dark → brand purple gradient using token fallback values */
  background:
    "linear-gradient(160deg, #0D0716 0%, var(--brand-secondary, #4A1D7A) 45%, var(--brand-primary, #6B2FA0) 100%)",
};

/* ── Scoped CSS ──────────────────────────────────────────────────────────── */

const scopedCSS = /* css */ `
/* Glow disc behind logo */
.ls-glow {
  position: absolute;
  width: 65vw;
  height: 65vw;
  max-width: 560px;
  max-height: 560px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--brand-primary, #6B2FA0) 0%,
    rgba(107, 47, 160, 0.35) 40%,
    transparent 70%
  );
  filter: blur(60px);
  will-change: transform, opacity;
  pointer-events: none;
}

/* Logo wrapper — controls the sizing (≈ 70 vw desktop) */
.ls-logo-wrap {
  position: relative;
  z-index: 1;
  width: 70vw;
  max-width: 900px;
  will-change: transform, opacity;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ls-logo-img {
  width: 100%;
  height: auto;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
}

/* ── Mobile ─────────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .ls-logo-wrap {
    width: 85vw;
    max-width: 420px;
  }
  .ls-glow {
    width: 95vw;
    height: 95vw;
    max-width: 420px;
    max-height: 420px;
    filter: blur(40px);
  }
}

/* ── Reduced motion: hide splash entirely (JS also skips, this is safety) */
@media (prefers-reduced-motion: reduce) {
  .ls-glow,
  .ls-logo-wrap {
    animation: none !important;
    transition: none !important;
  }
}
`;
