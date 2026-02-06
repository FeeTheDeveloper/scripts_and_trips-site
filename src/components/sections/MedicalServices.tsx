"use client";

import React from "react";
import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  MedicalServices                                                            */
/*  Card grid showcasing core medical courier service lines.                   */
/*  Each card has a gradient-border glow, icon, and fade-up on scroll.         */
/* -------------------------------------------------------------------------- */

/* ── Service data ────────────────────────────────────────────────────────── */

interface ServiceDef {
  icon: React.FC;
  title: string;
  description: string;
}

const services: ServiceDef[] = [
  {
    icon: SpecimenIcon,
    title: "Laboratory Specimen Transport",
    description:
      "Temperature-controlled pickup and delivery of blood draws, tissue samples, and cultures — maintaining strict chain-of-custody protocols.",
  },
  {
    icon: PharmacyIcon,
    title: "Pharmacy & Prescription Delivery",
    description:
      "Secure transport of controlled substances, compounded medications, and retail prescriptions directly to facilities or patients.",
  },
  {
    icon: EquipmentIcon,
    title: "Medical Equipment & Supplies",
    description:
      "On-demand and scheduled delivery of surgical instruments, DME, implants, and clinical consumables across the Dallas-Fort Worth metro.",
  },
  {
    icon: StatIcon,
    title: "STAT / Time-Critical Runs",
    description:
      "Priority dispatched within minutes. Real-time GPS tracking ensures your urgent specimens and supplies arrive within the committed window.",
  },
  {
    icon: RouteIcon,
    title: "Route-Based Clinic Deliveries",
    description:
      "Recurring scheduled routes connecting labs, clinics, hospitals, and long-term care facilities — reliable daily or multi-stop loops.",
  },
];

/* ── Animation variants ──────────────────────────────────────────────────── */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

/* ── Component ───────────────────────────────────────────────────────────── */

export default function MedicalServices() {
  return (
    <section className="ms-section" aria-labelledby="ms-heading">
      <style>{scopedCSS}</style>

      <div className="ms-inner">
        <motion.div
          className="ms-header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="ms-heading" className="ms-title">
            Medical Courier Services
          </h2>
          <p className="ms-subtitle">
            Purpose-built logistics for healthcare — every handoff documented,
            every delivery on time.
          </p>
        </motion.div>

        <motion.div
          className="ms-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((s) => (
            <motion.article key={s.title} className="ms-card" variants={cardVariant}>
              {/* Gradient glow border (pseudo-element driven in CSS) */}
              <div className="ms-card-inner">
                <span className="ms-icon"><s.icon /></span>
                <h3 className="ms-card-title">{s.title}</h3>
                <p className="ms-card-desc">{s.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Inline SVG icons ────────────────────────────────────────────────────── */

function SpecimenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
      {/* Test tube */}
      <path d="M14.5 2v9.5L19 20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2l4.5-8.5V2" />
      <line x1="9" y1="2" x2="15" y2="2" />
      <line x1="7" y1="16" x2="17" y2="16" />
    </svg>
  );
}

function PharmacyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
      {/* Pill capsule + cross */}
      <rect x="3" y="8" width="18" height="12" rx="3" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <line x1="9" y1="14" x2="15" y2="14" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
    </svg>
  );
}

function EquipmentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
      {/* Box / package */}
      <path d="M21 8V21H3V8" />
      <rect x="1" y="3" width="22" height="5" rx="1" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  );
}

function StatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
      {/* Bolt / urgency */}
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function RouteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
      {/* Route / map pins connected */}
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M6 9v1a5 5 0 0 0 5 5h2a5 5 0 0 0 5-5V9" />
    </svg>
  );
}

/* ── Scoped CSS ──────────────────────────────────────────────────────────── */

const scopedCSS = /* css */ `
/* ── Section ───────────────────────────────────────────────────────────── */
.ms-section {
  width: 100%;
  padding: 5rem 1.5rem;
  background: var(--paper, #F6F4F1);
}

.ms-inner {
  max-width: 1120px;
  margin: 0 auto;
}

/* ── Header ────────────────────────────────────────────────────────────── */
.ms-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.ms-title {
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  font-weight: 800;
  color: var(--ink, #1A1A1A);
  letter-spacing: -0.02em;
  margin: 0 0 0.75rem;
}

.ms-subtitle {
  font-size: clamp(0.95rem, 1.6vw, 1.1rem);
  line-height: 1.6;
  color: var(--muted, #8B8B8B);
  max-width: 520px;
  margin: 0 auto;
}

/* ── Card grid ─────────────────────────────────────────────────────────── */
.ms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* ── Card — outer (carries the gradient border glow) ───────────────────── */
.ms-card {
  position: relative;
  border-radius: 14px;
  padding: 1.5px;                       /* "border" thickness */
  background: linear-gradient(
    135deg,
    var(--brand-primary, #6B2FA0) 0%,
    var(--brand-accent, #FFB400) 50%,
    var(--brand-secondary, #4A1D7A) 100%
  );
  opacity: 0.99;                        /* trigger compositing layer */
  transition: box-shadow 0.3s;
}

.ms-card:hover {
  box-shadow: 0 0 28px rgba(107, 47, 160, 0.18),
              0 0 8px  rgba(255, 180, 0, 0.10);
}

/* ── Card — inner (solid background sits inside the gradient border) ──── */
.ms-card-inner {
  background: var(--paper, #F6F4F1);
  border-radius: 12.5px;               /* slightly < outer to avoid sub-px gap */
  padding: 2rem 1.75rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

/* ── Icon chip ─────────────────────────────────────────────────────────── */
.ms-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    rgba(107, 47, 160, 0.08),
    rgba(74, 29, 122, 0.05)
  );
  color: var(--brand-primary, #6B2FA0);
  flex: none;
}

/* ── Typography ────────────────────────────────────────────────────────── */
.ms-card-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--ink, #1A1A1A);
  margin: 0;
  line-height: 1.3;
}

.ms-card-desc {
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--muted, #8B8B8B);
  margin: 0;
}

/* ── Mobile ────────────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .ms-section { padding: 3.5rem 1rem; }
  .ms-grid    { grid-template-columns: 1fr; }
}

/* ── Reduced motion ────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .ms-card { transition: none; }
}
`;
