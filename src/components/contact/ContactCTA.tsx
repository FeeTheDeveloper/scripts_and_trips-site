import React from "react";
import {
  SUPPORT_EMAIL,
  SUPPORT_EMAIL_HREF,
} from "@/lib/site/meta";

/* -------------------------------------------------------------------------- */
/*  ContactCTA                                                                 */
/*  A prominent call-to-action block for a /contact page (or any section).     */
/* -------------------------------------------------------------------------- */

interface ContactCTAProps {
  /** Heading text above the email link */
  heading?: string;
  /** Subtext below the heading */
  description?: string;
  /** Extra class names */
  className?: string;
}

export default function ContactCTA({
  heading = "Let's work together",
  description = "Have a question or need a delivery quote? Reach out — we'd love to hear from you.",
  className = "",
}: ContactCTAProps) {
  return (
    <section className={className} style={sectionStyle}>
      <h2 style={headingStyle}>{heading}</h2>
      <p style={descStyle}>{description}</p>

      <a href={SUPPORT_EMAIL_HREF} style={buttonStyle}>
        {SUPPORT_EMAIL}
      </a>
    </section>
  );
}

/* ── Styles ──────────────────────────────────────────────────────────────── */

const sectionStyle: React.CSSProperties = {
  maxWidth: 640,
  margin: "0 auto",
  padding: "4rem 1.5rem",
  textAlign: "center",
};

const headingStyle: React.CSSProperties = {
  fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
  fontWeight: 700,
  color: "var(--ink, #1A1A1A)",
  marginBottom: "0.75rem",
};

const descStyle: React.CSSProperties = {
  fontSize: "1rem",
  lineHeight: 1.6,
  color: "var(--muted, #8B8B8B)",
  marginBottom: "2rem",
};

const buttonStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "0.875rem 2rem",
  borderRadius: "0.5rem",
  background: "var(--gradient-button, var(--brand-primary, #6B2FA0))",
  color: "#fff",
  fontWeight: 600,
  fontSize: "1rem",
  textDecoration: "none",
  transition: "opacity 0.2s",
};
