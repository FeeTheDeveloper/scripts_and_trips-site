"use client";

import React from "react";
import { motion } from "framer-motion";
import HeroBackdrop from "@/components/visuals/HeroBackdrop";
import VanMarquee from "@/components/vehicles/VanMarquee";
import { SUPPORT_EMAIL_HREF } from "@/lib/site/meta";

/* -------------------------------------------------------------------------- */
/*  MedicalHero                                                                */
/*  Full-viewport hero for the medical courier service line.                   */
/*  Layers: gradient mesh backdrop → van marquee → content card.               */
/* -------------------------------------------------------------------------- */

/* ── Bullet data ─────────────────────────────────────────────────────────── */

const bullets = [
  { icon: BoltIcon,      text: "STAT & scheduled medical deliveries" },
  { icon: FlaskIcon,     text: "Labs, specimens, pharmaceuticals" },
  { icon: ShieldIcon,    text: "HIPAA-aware handling procedures" },
  { icon: ClockIcon,     text: "Same-day & routed services" },
  { icon: FlagIcon,      text: "Veteran-owned & operated" },
] as const;

/* ── Stagger animation ───────────────────────────────────────────────────── */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

/* ── Component ───────────────────────────────────────────────────────────── */

export default function MedicalHero() {
  return (
    <HeroBackdrop vignette grain className="mh-root">
      <style>{scopedCSS}</style>

      {/* Van marquee — sits behind the content at low opacity */}
      <div className="mh-marquee-layer" aria-hidden="true">
        <VanMarquee count={5} baseDuration={26} />
      </div>

      {/* Content */}
      <motion.div
        className="mh-content"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Headline */}
        <motion.h1 className="mh-headline" variants={fadeUp}>
          Trusted Medical Courier Services&nbsp;— Delivered&nbsp;With&nbsp;Precision
        </motion.h1>

        {/* Sub-headline */}
        <motion.p className="mh-sub" variants={fadeUp}>
          Veteran-owned medical delivery specialists serving Dallas with
          HIPAA-conscious, time-critical transport.
        </motion.p>

        {/* Bullet list */}
        <motion.ul className="mh-bullets" variants={stagger}>
          {bullets.map(({ icon: Icon, text }) => (
            <motion.li key={text} className="mh-bullet" variants={fadeUp}>
              <span className="mh-bullet-icon"><Icon /></span>
              <span>{text}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTAs */}
        <motion.div className="mh-ctas" variants={fadeUp}>
          <a href="/contact" className="mh-btn mh-btn--primary">
            Request a Medical Courier
          </a>
          <a href={SUPPORT_EMAIL_HREF} className="mh-btn mh-btn--secondary">
            Speak With Dispatch
          </a>
        </motion.div>
      </motion.div>
    </HeroBackdrop>
  );
}

/* ── Inline SVG icons (small, purpose-built) ─────────────────────────────── */

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}

function FlaskIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M9 3h6M10 3v6.5L4 20h16l-6-10.5V3"/>
      <line x1="8" y1="15" x2="16" y2="15"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
      <line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  );
}

/* ── Scoped CSS ──────────────────────────────────────────────────────────── */

const scopedCSS = /* css */ `
/* Override HeroBackdrop's min-height for the hero */
.mh-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* ── Van marquee layer ─────────────────────────────────────────────────── */
.mh-marquee-layer {
  position: absolute;
  bottom: 8%;
  left: 0;
  right: 0;
  opacity: 0.12;
  pointer-events: none;
  z-index: 0;
}

/* ── Content card ──────────────────────────────────────────────────────── */
.mh-content {
  position: relative;
  z-index: 2;
  max-width: 740px;
  padding: 3.5rem 2rem;
  margin: 0 auto;
  text-align: center;
}

/* ── Headline ──────────────────────────────────────────────────────────── */
.mh-headline {
  font-size: clamp(1.75rem, 4.5vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0 0 1.25rem;
}

/* ── Sub-headline ──────────────────────────────────────────────────────── */
.mh-sub {
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.78);
  margin: 0 0 2.25rem;
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
}

/* ── Bullet list ───────────────────────────────────────────────────────── */
.mh-bullets {
  list-style: none;
  padding: 0;
  margin: 0 auto 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  max-width: 420px;
  text-align: left;
}

.mh-bullet {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.88);
}

.mh-bullet-icon {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--brand-accent, #FFB400);
}

/* ── CTA buttons ───────────────────────────────────────────────────────── */
.mh-ctas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.mh-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.75rem;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
  will-change: transform;
  cursor: pointer;
}

.mh-btn:hover  { opacity: 0.9; transform: translateY(-1px); }
.mh-btn:active { transform: translateY(0); }

.mh-btn--primary {
  background: var(--gradient-button, var(--brand-primary, #6B2FA0));
  color: #fff;
}

.mh-btn--secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

/* ── Mobile tweaks ─────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .mh-content { padding: 2.5rem 1.25rem; }
  .mh-bullets { max-width: 100%; }
  .mh-btn     { width: 100%; }
  .mh-marquee-layer { opacity: 0.08; }
}

/* ── Reduced motion ────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .mh-marquee-layer { display: none; }
}
`;
