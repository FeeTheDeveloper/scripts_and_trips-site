import React from "react";
import Link from "next/link";
import {
  SITE_NAME,
  SUPPORT_EMAIL,
  SUPPORT_EMAIL_HREF,
} from "@/lib/site/meta";

/* -------------------------------------------------------------------------- */
/*  SiteHeader                                                                 */
/*  Minimal top bar — logo/name on the left, contact email on the right.       */
/* -------------------------------------------------------------------------- */

export default function SiteHeader() {
  return (
    <header style={headerStyle}>
      <div style={innerStyle}>
        {/* Left — brand name / logo */}
        <Link href="/" style={brandLinkStyle}>
          {SITE_NAME}
        </Link>

        {/* Right — clickable email */}
        <a href={SUPPORT_EMAIL_HREF} style={emailStyle}>
          {SUPPORT_EMAIL}
        </a>
      </div>
    </header>
  );
}

/* ── Styles ──────────────────────────────────────────────────────────────── */

const headerStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 50,
  width: "100%",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  background: "rgba(246, 244, 241, 0.85)", /* paper @ 85 % */
  borderBottom: "1px solid rgba(107, 47, 160, 0.1)",
};

const innerStyle: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "0.75rem 1.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  flexWrap: "wrap",
};

const brandLinkStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: "1.125rem",
  color: "var(--brand-primary, #6B2FA0)",
  textDecoration: "none",
};

const emailStyle: React.CSSProperties = {
  fontSize: "0.875rem",
  color: "var(--brand-primary, #6B2FA0)",
  textDecoration: "none",
  borderBottom: "1px solid transparent",
  transition: "border-color 0.2s",
};
