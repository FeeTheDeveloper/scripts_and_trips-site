import React from "react";
import Link from "next/link";
import {
  SITE_NAME,
  SITE_DOMAIN,
  SUPPORT_EMAIL,
  SUPPORT_EMAIL_HREF,
} from "@/lib/site/meta";

/* -------------------------------------------------------------------------- */
/*  SiteFooter                                                                 */
/*  Three-column footer: brand summary · nav links · contact.                  */
/* -------------------------------------------------------------------------- */

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer style={footerStyle}>
      <div style={innerStyle}>
        {/* Col 1 — Brand */}
        <div style={colStyle}>
          <p style={brandStyle}>{SITE_NAME}</p>
          <p style={mutedText}>
            Fast, reliable delivery — powered by {SITE_DOMAIN}
          </p>
        </div>

        {/* Col 2 — Nav links */}
        <nav style={colStyle} aria-label="Footer navigation">
          <p style={colHeading}>Company</p>
          <Link href="/" style={linkStyle}>Home</Link>
          <Link href="/about" style={linkStyle}>About</Link>
          <Link href="/contact" style={linkStyle}>Contact</Link>
        </nav>

        {/* Col 3 — Contact */}
        <div style={colStyle}>
          <p style={colHeading}>Get in touch</p>
          <a href={SUPPORT_EMAIL_HREF} style={emailLinkStyle}>
            {SUPPORT_EMAIL}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={bottomBar}>
        <small style={mutedText}>
          &copy; {year} {SITE_NAME}. All rights reserved.
        </small>
      </div>
    </footer>
  );
}

/* ── Styles ──────────────────────────────────────────────────────────────── */

const footerStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--brand-secondary, #4A1D7A)",
  color: "#fff",
  padding: "3rem 1.5rem 1rem",
};

const innerStyle: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "2rem",
};

const colStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const brandStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: "1.125rem",
  marginBottom: "0.25rem",
};

const colHeading: React.CSSProperties = {
  fontWeight: 600,
  fontSize: "0.875rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  opacity: 0.7,
  marginBottom: "0.25rem",
};

const linkStyle: React.CSSProperties = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "0.9375rem",
  opacity: 0.85,
  transition: "opacity 0.2s",
};

const emailLinkStyle: React.CSSProperties = {
  color: "var(--brand-accent, #FFB400)",
  textDecoration: "none",
  fontSize: "0.9375rem",
  wordBreak: "break-all",
};

const mutedText: React.CSSProperties = {
  fontSize: "0.8125rem",
  opacity: 0.6,
  lineHeight: 1.5,
};

const bottomBar: React.CSSProperties = {
  maxWidth: 1200,
  margin: "2rem auto 0",
  paddingTop: "1rem",
  borderTop: "1px solid rgba(255,255,255,0.12)",
  textAlign: "center",
};
