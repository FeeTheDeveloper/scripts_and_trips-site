"use client";

import React from "react";
import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  ComplianceStrip                                                            */
/*  Horizontal trust bar — sits directly under the hero to reinforce           */
/*  compliance credibility before the user scrolls into services.              */
/* -------------------------------------------------------------------------- */

const items = [
  { icon: ShieldCheckIcon, label: "HIPAA-conscious handling" },
  { icon: ChainIcon,       label: "Chain-of-custody procedures" },
  { icon: LockIcon,        label: "Secure transport protocols" },
  { icon: BadgeIcon,       label: "Trained medical couriers" },
  { icon: FlagIcon,        label: "Veteran-owned accountability" },
] as const;

/* ── Animation ───────────────────────────────────────────────────────────── */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

/* ── Component ───────────────────────────────────────────────────────────── */

export default function ComplianceStrip() {
  return (
    <section className="cs-strip" aria-label="Compliance credentials">
      <style>{scopedCSS}</style>

      {/* Top accent line */}
      <div className="cs-accent-line" aria-hidden="true" />

      <motion.div
        className="cs-inner"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        {items.map(({ icon: Icon, label }) => (
          <motion.div key={label} className="cs-item" variants={fadeUp}>
            <span className="cs-icon"><Icon /></span>
            <span className="cs-label">{label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ── Inline SVG icons (18 × 18, stroke-only) ─────────────────────────────── */

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  );
}

function ChainIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M12 15l-3 3 1-4-3-2h4L12 8l1 4h4l-3 2 1 4z"/>
      <circle cx="12" cy="12" r="10"/>
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
      <line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  );
}

/* ── Scoped CSS ──────────────────────────────────────────────────────────── */

const scopedCSS = /* css */ `
.cs-strip {
  position: relative;
  width: 100%;
  background: #EDEBE8;              /* slightly darker than paper */
  overflow: hidden;
}

/* Brand accent gradient line at the top */
.cs-accent-line {
  height: 3px;
  background: linear-gradient(
    90deg,
    var(--brand-primary, #6B2FA0) 0%,
    var(--brand-accent, #FFB400) 50%,
    var(--brand-secondary, #4A1D7A) 100%
  );
}

.cs-inner {
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem 2.5rem;
  padding: 1.35rem 1.5rem;
}

/* ── Individual trust item ─────────────────────────────────────────────── */
.cs-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.cs-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--brand-primary, #6B2FA0);
  opacity: 0.8;
  flex: none;
}

.cs-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--ink, #1A1A1A);
  letter-spacing: 0.01em;
  opacity: 0.75;
}

/* ── Mobile: allow wrapping, slightly tighter ──────────────────────────── */
@media (max-width: 740px) {
  .cs-inner {
    gap: 0.75rem 1.5rem;
    padding: 1rem 1rem;
    justify-content: flex-start;
  }
  .cs-label {
    font-size: 0.75rem;
  }
}

/* ── Reduced motion ────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .cs-item { transition: none; }
}
`;
