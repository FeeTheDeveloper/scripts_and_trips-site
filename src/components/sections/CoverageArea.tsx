"use client";

import React from "react";
import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  CoverageArea                                                               */
/*  Dallas-focused service area section with a map-style visual and            */
/*  neighbourhood/area list. Neutral, clinical design.                         */
/* -------------------------------------------------------------------------- */

const regions = [
  { name: "Downtown Dallas",        tag: "Core" },
  { name: "Uptown & Oak Lawn",      tag: "Core" },
  { name: "Deep Ellum & Fair Park", tag: "Core" },
  { name: "Medical District",       tag: "Core" },
  { name: "North Dallas & Addison", tag: "Extended" },
  { name: "Richardson & Plano",     tag: "Extended" },
  { name: "Irving & Las Colinas",   tag: "Extended" },
  { name: "Mesquite & Garland",     tag: "Extended" },
  { name: "Fort Worth & Arlington", tag: "Metro-Wide" },
  { name: "Denton & Frisco",        tag: "Metro-Wide" },
];

/* ── Animations ──────────────────────────────────────────────────────────── */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

/* ── Component ───────────────────────────────────────────────────────────── */

export default function CoverageArea() {
  return (
    <section className="ca-section" aria-labelledby="ca-heading">
      <style>{scopedCSS}</style>

      <div className="ca-inner">
        {/* Left — copy */}
        <motion.div
          className="ca-copy"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="ca-heading" className="ca-title">
            Serving the Dallas–Fort&nbsp;Worth Metroplex
          </h2>
          <p className="ca-desc">
            Our courier network blankets the DFW metro — from the Medical
            District to suburban clinics. Same-day STAT coverage across every
            major healthcare corridor.
          </p>
        </motion.div>

        {/* Right — area grid */}
        <motion.ul
          className="ca-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {regions.map((r) => (
            <motion.li key={r.name} className="ca-chip" variants={fadeUp}>
              <MapPinIcon />
              <span className="ca-chip-name">{r.name}</span>
              <span className={`ca-tag ca-tag--${r.tag.toLowerCase().replace("-", "")}`}>
                {r.tag}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* ── Icon ─────────────────────────────────────────────────────────────────── */

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" className="ca-pin">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* ── Scoped CSS ──────────────────────────────────────────────────────────── */

const scopedCSS = /* css */ `
.ca-section {
  width: 100%;
  padding: 5.5rem 1.5rem;
  background: var(--paper, #F6F4F1);
}

.ca-inner {
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 3rem;
  align-items: start;
}

/* ── Copy column ───────────────────────────────────────────────────────── */
.ca-copy {
  position: sticky;
  top: 6rem;
}

.ca-title {
  font-size: clamp(1.5rem, 3.5vw, 2.1rem);
  font-weight: 800;
  color: var(--ink, #1A1A1A);
  letter-spacing: -0.02em;
  margin: 0 0 1rem;
  line-height: 1.2;
}

.ca-desc {
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  line-height: 1.65;
  color: var(--muted, #8B8B8B);
  max-width: 400px;
}

/* ── Area chips grid ───────────────────────────────────────────────────── */
.ca-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.ca-chip {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  background: #fff;
  border: 1px solid rgba(107, 47, 160, 0.07);
  transition: box-shadow 0.25s;
}

.ca-chip:hover {
  box-shadow: 0 2px 12px rgba(107, 47, 160, 0.08);
}

.ca-pin {
  flex: none;
  color: var(--brand-primary, #6B2FA0);
  opacity: 0.7;
}

.ca-chip-name {
  flex: 1;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--ink, #1A1A1A);
}

.ca-tag {
  flex: none;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
}

.ca-tag--core {
  background: rgba(107, 47, 160, 0.1);
  color: var(--brand-primary, #6B2FA0);
}

.ca-tag--extended {
  background: rgba(255, 180, 0, 0.12);
  color: #996B00;
}

.ca-tag--metrowide {
  background: rgba(74, 29, 122, 0.08);
  color: var(--brand-secondary, #4A1D7A);
}

/* ── Mobile ────────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .ca-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .ca-copy {
    position: static;
    text-align: center;
  }
  .ca-desc { margin: 0 auto; }
  .ca-section { padding: 3.5rem 1rem; }
}

@media (prefers-reduced-motion: reduce) {
  .ca-chip { transition: none; }
}
`;
